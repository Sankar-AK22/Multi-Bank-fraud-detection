// ================================
// MOCK DATA FOR FRAUD DETECTION DASHBOARD
// ================================

export interface BankLogin {
    bankName: string;
    bankCode: string;
    userId: string;
    ipAddress: string;
    deviceId: string;
    location: string;
    status: 'normal' | 'suspicious' | 'fraud';
    lastLogin: string;
    color: string;
}

export interface TransactionNode {
    id: string;
    type: 'customer' | 'theft' | 'mule' | 'cashout';
    accountId: string;
    ipAddress: string;
    amount: number;
    timeDelay: string;
    bankName: string;
}

export interface IntelligenceData {
    sharedIP: string;
    linkedAccounts: number;
    sharedDevice: string;
    deviceAccounts: number;
    riskIndicators: string[];
}

export interface AgentStep {
    id: number;
    name: string;
    description: string;
    status: 'completed' | 'active' | 'pending';
    icon: string;
}

// Bank Login Data with unique styling per bank
export const bankLogins: BankLogin[] = [
    {
        bankName: 'HDFC Bank',
        bankCode: 'HDFC',
        userId: 'USR_8847291',
        ipAddress: '192.168.45.102',
        deviceId: 'DEV_A7X92M',
        location: 'Mumbai, India',
        status: 'normal',
        lastLogin: '2 mins ago',
        color: '#004C8F' // HDFC Blue
    },
    {
        bankName: 'ICICI Bank',
        bankCode: 'ICICI',
        userId: 'USR_3372891',
        ipAddress: '192.168.45.102', // Same IP as HDFC - suspicious!
        deviceId: 'DEV_A7X92M', // Same device - suspicious!
        location: 'Mumbai, India',
        status: 'suspicious',
        lastLogin: '5 mins ago',
        color: '#F58220' // ICICI Orange
    },
    {
        bankName: 'State Bank of India',
        bankCode: 'SBI',
        userId: 'USR_9912847',
        ipAddress: '192.168.45.102', // Same IP again!
        deviceId: 'DEV_A7X92M',
        location: 'Mumbai, India',
        status: 'fraud',
        lastLogin: '8 mins ago',
        color: '#22409A' // SBI Blue
    }
];

// Transaction Flow Data
export const transactionFlow: TransactionNode[] = [
    {
        id: '1',
        type: 'customer',
        accountId: 'ACC_VICTIM_001',
        ipAddress: '203.45.67.89',
        amount: 500000,
        timeDelay: 'T+0',
        bankName: 'HDFC'
    },
    {
        id: '2',
        type: 'customer',
        accountId: 'ACC_VICTIM_002',
        ipAddress: '203.45.67.90',
        amount: 750000,
        timeDelay: 'T+0',
        bankName: 'ICICI'
    },
    {
        id: '3',
        type: 'theft',
        accountId: 'ACC_THEFT_001',
        ipAddress: '192.168.45.102',
        amount: 1250000,
        timeDelay: 'T+2min',
        bankName: 'SBI'
    },
    {
        id: '4',
        type: 'mule',
        accountId: 'ACC_MULE_001',
        ipAddress: '192.168.45.102',
        amount: 400000,
        timeDelay: 'T+5min',
        bankName: 'HDFC'
    },
    {
        id: '5',
        type: 'mule',
        accountId: 'ACC_MULE_002',
        ipAddress: '192.168.45.102',
        amount: 450000,
        timeDelay: 'T+6min',
        bankName: 'ICICI'
    },
    {
        id: '6',
        type: 'mule',
        accountId: 'ACC_MULE_003',
        ipAddress: '192.168.45.102',
        amount: 400000,
        timeDelay: 'T+7min',
        bankName: 'SBI'
    },
    {
        id: '7',
        type: 'cashout',
        accountId: 'ATM_WITHDRAW',
        ipAddress: 'Multiple',
        amount: 1200000,
        timeDelay: 'T+15min',
        bankName: 'Multiple'
    }
];

// IP & Device Intelligence Data
export const intelligenceData: IntelligenceData = {
    sharedIP: '192.168.45.102',
    linkedAccounts: 6,
    sharedDevice: 'DEV_A7X92M',
    deviceAccounts: 6,
    riskIndicators: [
        'Same IP address across 3 different banks',
        'Same device ID used for all transactions',
        'Rapid fund movement (< 15 minutes)',
        'Multi-hop transfer pattern detected',
        'Geolocation mismatch with registered address',
        'First-time high-value transactions'
    ]
};

// Risk Assessment Result
export const riskAssessment = {
    score: 0.85,
    level: 'HIGH',
    status: 'Mule Network Detected',
    reasons: [
        'Same IP (192.168.45.102) used across 6 accounts in 3 banks',
        'Rapid fund movement: ₹12.5L moved in under 15 minutes',
        'One-to-many distribution pattern (1 → 3 mule accounts)',
        'Device fingerprint DEV_A7X92M linked to known fraud ring',
        'Circular money movement detected'
    ],
    confidence: 94,
    recommendation: 'BLOCK_IMMEDIATELY'
};

// Agentic AI Workflow Steps
export const agentSteps: AgentStep[] = [
    {
        id: 1,
        name: 'Data Parsing Agent',
        description: 'Ingests transaction data from multiple bank APIs and normalizes formats',
        status: 'completed',
        icon: 'database'
    },
    {
        id: 2,
        name: 'Behavior Analysis Agent',
        description: 'Analyzes spending patterns, login times, and device fingerprints',
        status: 'completed',
        icon: 'brain'
    },
    {
        id: 3,
        name: 'Network Analysis Agent',
        description: 'Maps relationships between accounts, IPs, and devices',
        status: 'completed',
        icon: 'network'
    },
    {
        id: 4,
        name: 'Risk Scoring Agent',
        description: 'Calculates fraud probability using ML ensemble models',
        status: 'active',
        icon: 'gauge'
    },
    {
        id: 5,
        name: 'Decision Agent',
        description: 'Executes actions: block, alert, or escalate to human review',
        status: 'pending',
        icon: 'shield'
    }
];

// Format currency in Indian Rupees
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};
