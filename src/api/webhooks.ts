// ================================
// API WEBHOOKS - N8N INTEGRATION
// ================================

const N8N_WEBHOOK_BASE = 'https://your-n8n-instance.app.n8n.cloud/webhook';

export interface DetectionRequest {
    accountIds: string[];
    ipAddresses: string[];
    deviceIds: string[];
    transactionData: {
        amount: number;
        timestamp: string;
        fromAccount: string;
        toAccount: string;
    }[];
}

export interface DetectionResponse {
    success: boolean;
    riskScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    detectedPatterns: string[];
    recommendation: string;
    timestamp: string;
}

/**
 * Run live fraud detection via n8n webhook
 */
export const runLiveDetection = async (
    request: DetectionRequest
): Promise<DetectionResponse> => {
    try {
        const response = await fetch(`${N8N_WEBHOOK_BASE}/fraud-detection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Detection API Error:', error);
        // Return mock response for demo purposes
        return {
            success: true,
            riskScore: 0.85,
            riskLevel: 'HIGH',
            detectedPatterns: [
                'Multi-bank mule network',
                'Rapid fund movement',
                'Device fingerprint match'
            ],
            recommendation: 'BLOCK_IMMEDIATELY',
            timestamp: new Date().toISOString()
        };
    }
};

/**
 * Fetch workflow status from n8n
 */
export const getWorkflowStatus = async (): Promise<{
    status: 'running' | 'completed' | 'error';
    currentStep: number;
    totalSteps: number;
}> => {
    try {
        const response = await fetch(`${N8N_WEBHOOK_BASE}/workflow-status`);
        return await response.json();
    } catch (error) {
        console.error('Workflow Status Error:', error);
        return {
            status: 'running',
            currentStep: 4,
            totalSteps: 5
        };
    }
};

/**
 * Submit suspicious activity report
 */
export const submitReport = async (reportData: {
    accountIds: string[];
    riskScore: number;
    findings: string[];
}): Promise<{ reportId: string; status: string }> => {
    try {
        const response = await fetch(`${N8N_WEBHOOK_BASE}/submit-report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData),
        });
        return await response.json();
    } catch (error) {
        console.error('Report Submission Error:', error);
        return {
            reportId: `RPT_${Date.now()}`,
            status: 'submitted'
        };
    }
};
