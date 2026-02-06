// ================================
// API WEBHOOKS - N8N INTEGRATION
// Your n8n webhook for mule detection
// ================================

const N8N_WEBHOOK_URL = 'https://nithiya.app.n8n.cloud/webhook/detect-mule';

export interface MuleDetectionRequest {
    // Bank login data
    bankLogins?: {
        bankName: string;
        userId: string;
        ipAddress: string;
        deviceId: string;
        location: string;
    }[];

    // Transaction data
    transactions?: {
        fromAccount: string;
        toAccount: string;
        amount: number;
        timestamp: string;
        bankName: string;
    }[];

    // IP/Device data
    ipAddresses?: string[];
    deviceIds?: string[];
}

export interface MuleDetectionResponse {
    success: boolean;
    riskScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    isMuleNetwork: boolean;
    detectedPatterns: string[];
    linkedAccounts: number;
    recommendation: string;
    reasons: string[];
    timestamp: string;
}

/**
 * Run mule detection via n8n webhook
 * POST to: https://nithiya.app.n8n.cloud/webhook/detect-mule
 */
export const detectMuleNetwork = async (
    request: MuleDetectionRequest
): Promise<MuleDetectionResponse> => {
    try {
        console.log('🔍 Calling n8n webhook:', N8N_WEBHOOK_URL);
        console.log('📦 Request data:', request);

        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ n8n response:', data);
        return data;
    } catch (error) {
        console.error('❌ Detection API Error:', error);

        // Return mock response for demo/fallback
        return {
            success: false,
            riskScore: 0.85,
            riskLevel: 'HIGH',
            isMuleNetwork: true,
            detectedPatterns: [
                'Multi-bank mule network detected',
                'Same IP across multiple banks',
                'Rapid fund movement pattern'
            ],
            linkedAccounts: 6,
            recommendation: 'BLOCK_IMMEDIATELY',
            reasons: [
                'Same IP (192.168.45.102) used across 6 accounts',
                'Device fingerprint matches known fraud ring',
                'Transaction velocity exceeds normal patterns'
            ],
            timestamp: new Date().toISOString()
        };
    }
};

/**
 * Test the webhook connection
 */
export const testWebhookConnection = async (): Promise<boolean> => {
    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: true, ping: 'connection-test' }),
        });
        return response.ok;
    } catch {
        return false;
    }
};

/**
 * Get sample request data for testing
 */
export const getSampleRequestData = (): MuleDetectionRequest => ({
    bankLogins: [
        {
            bankName: 'HDFC Bank',
            userId: 'USR_8847291',
            ipAddress: '192.168.45.102',
            deviceId: 'DEV_A7X92M',
            location: 'Mumbai, India'
        },
        {
            bankName: 'ICICI Bank',
            userId: 'USR_3372891',
            ipAddress: '192.168.45.102', // Same IP!
            deviceId: 'DEV_A7X92M', // Same device!
            location: 'Mumbai, India'
        },
        {
            bankName: 'SBI',
            userId: 'USR_9912847',
            ipAddress: '192.168.45.102', // Same IP!
            deviceId: 'DEV_A7X92M',
            location: 'Mumbai, India'
        }
    ],
    transactions: [
        {
            fromAccount: 'ACC_VICTIM_001',
            toAccount: 'ACC_THEFT_001',
            amount: 500000,
            timestamp: new Date().toISOString(),
            bankName: 'HDFC'
        },
        {
            fromAccount: 'ACC_THEFT_001',
            toAccount: 'ACC_MULE_001',
            amount: 150000,
            timestamp: new Date().toISOString(),
            bankName: 'ICICI'
        }
    ],
    ipAddresses: ['192.168.45.102'],
    deviceIds: ['DEV_A7X92M']
});
