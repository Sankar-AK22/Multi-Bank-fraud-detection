import { createContext, useContext, useState, ReactNode } from 'react';
import { detectMuleNetwork, getSampleRequestData, type MuleDetectionResponse, type MuleDetectionRequest } from '../api/webhooks';

interface DetectionContextType {
    // State
    isLoading: boolean;
    result: MuleDetectionResponse | null;
    error: string | null;
    lastRequest: MuleDetectionRequest | null;

    // Actions
    runDetection: (data?: MuleDetectionRequest) => Promise<MuleDetectionResponse | null>;
    clearResult: () => void;
}

const DetectionContext = createContext<DetectionContextType | null>(null);

export const DetectionProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<MuleDetectionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastRequest, setLastRequest] = useState<MuleDetectionRequest | null>(null);

    const runDetection = async (data?: MuleDetectionRequest): Promise<MuleDetectionResponse | null> => {
        setIsLoading(true);
        setError(null);

        const requestData = data || getSampleRequestData();
        setLastRequest(requestData);

        console.log('🔍 [DetectionContext] Calling n8n webhook...');
        console.log('📦 Request:', requestData);

        try {
            const response = await detectMuleNetwork(requestData);
            console.log('✅ [DetectionContext] Response received:', response);
            setResult(response);
            return response;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Detection failed';
            console.error('❌ [DetectionContext] Error:', errorMsg);
            setError(errorMsg);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const clearResult = () => {
        setResult(null);
        setError(null);
        setLastRequest(null);
    };

    return (
        <DetectionContext.Provider value={{ isLoading, result, error, lastRequest, runDetection, clearResult }}>
            {children}
        </DetectionContext.Provider>
    );
};

export const useDetection = (): DetectionContextType => {
    const context = useContext(DetectionContext);
    if (!context) {
        throw new Error('useDetection must be used within DetectionProvider');
    }
    return context;
};
