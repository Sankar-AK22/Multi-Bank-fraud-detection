// import { v4 as uuidv4 } from 'uuid'; // REMOVED dependency

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// ================================
// 1. DATA MODELS
// ================================

export interface AccountHolder {
    accountId: string;
    name: string;
    age: number;
    kycLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    riskScore: number; // 0-100
    creationDate: string;
    role: 'NORMAL' | 'MULE' | 'KINGPIN' | 'VICTIM';
    deviceId: string;
}

export interface Transaction {
    transactionId: string;
    globalTraceId: string; // The persistent ID that tracks money across hops
    sourceId: string;
    targetId: string;
    amount: number;
    timestamp: string;
    type: 'P2P' | 'MERCHANT' | 'REFUND';
    status: 'SUCCESS' | 'PENDING' | 'FROZEN';
    riskScore: number;
}

// ================================
// 2. GENERATOR CONFIG
// ================================

const NAMES = [
    'Aarav', 'Vihaan', 'Aditya', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya',
    'Ananya', 'Diya', 'Saanvi', 'Amaya', 'Kiara', 'Pari', 'Riya', 'Anika', 'Navya', 'Myra'
];

const LAST_NAMES = [
    'Sharma', 'Verma', 'Gupta', 'Malhotra', 'Bhatia', 'Saxena', 'Mehta', 'Joshi', 'Singh', 'Patel'
];

// ================================
// 3. GENERATOR LOGIC
// ================================

export const generateScamDataset = () => {
    const accounts: AccountHolder[] = [];
    const transactions: Transaction[] = [];

    // --- A. Generate 100 Accounts ---

    // 1. One Kingpin (The Mastermind)
    const kingpinId = uuidv4();
    accounts.push({
        accountId: kingpinId,
        name: 'Vikram Malhotra', // The boss
        age: 45,
        kycLevel: 'HIGH', // Hides in plain sight
        riskScore: 10, // Looks clean initially
        creationDate: '2020-01-15T10:00:00Z',
        role: 'KINGPIN',
        deviceId: 'DEV_KINGPIN_01'
    });

    // 2. Ten Mules (The Layering Crew)
    const muleIds: string[] = [];
    for (let i = 0; i < 10; i++) {
        const id = uuidv4();
        muleIds.push(id);
        accounts.push({
            accountId: id,
            name: `Mule ${NAMES[i % NAMES.length]}`,
            age: 20 + Math.floor(Math.random() * 5), // Young
            kycLevel: 'LOW',
            riskScore: 60,
            creationDate: '2025-01-01T10:00:00Z', // New accounts
            role: 'MULE',
            deviceId: `DEV_MULE_${i}`
        });
    }

    // 3. 89 Normal Users / Victims
    const normalIds: string[] = [];
    for (let i = 0; i < 89; i++) {
        const id = uuidv4();
        normalIds.push(id);
        accounts.push({
            accountId: id,
            name: `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
            age: 25 + Math.floor(Math.random() * 40),
            kycLevel: 'MEDIUM',
            riskScore: Math.floor(Math.random() * 20),
            creationDate: '2023-05-20T10:00:00Z',
            role: 'NORMAL',
            deviceId: `DEV_USER_${i}`
        });
    }

    // --- B. Generate 1000 Transactions ---

    let currentTime = new Date('2026-02-06T10:00:00Z').getTime();

    // Helper to add txn
    const addTxn = (source: string, target: string, amount: number, traceId?: string) => {
        const txnId = uuidv4();
        // Inherit trace ID or create new one
        const finalTraceId = traceId || uuidv4();

        // Risk Logic: High amount + Mule = High Risk
        let risk = 10;
        if (muleIds.includes(target) || muleIds.includes(source)) risk += 40;
        if (amount > 50000) risk += 30;

        transactions.push({
            transactionId: txnId,
            globalTraceId: finalTraceId,
            sourceId: source,
            targetId: target,
            amount,
            timestamp: new Date(currentTime).toISOString(),
            type: 'P2P',
            status: 'SUCCESS',
            riskScore: risk
        });

        // Advance time slightly
        currentTime += Math.floor(Math.random() * 60000) + 1000; // +1-60 seconds
        return { txnId, traceId: finalTraceId };
    };

    // 1. Scam Pattern: "The Smurf Attack" (One -> Many -> One)
    // Kingpin sends to Mules, Mules send to Laundromat

    // A. Victim -> Mules (Theft Phase)
    const victims = normalIds.slice(0, 5); // 5 Victims
    victims.forEach((victim) => {
        // Each victim sends to 2 mules
        const selectedMules = [muleIds[0], muleIds[1]];
        const traceId = uuidv4(); // Unique trace for this theft chain

        selectedMules.forEach(mule => {
            addTxn(victim, mule, 50000, traceId); // Theft
        });
    });

    // B. Mules -> Aggregator (Layering Phase)
    // All mules send to Kingpin eventually, but hops in between
    muleIds.forEach((mule) => {
        // Mule -> Random Normal -> Kingpin (Layering)
        const midPoint = normalIds[50]; // Complicit user?
        const { traceId } = addTxn(mule, midPoint, 45000); // Pass most funds
        addTxn(midPoint, kingpinId, 40000, traceId); // Money reaches boss
    });

    // 2. Scam Pattern: "Circular Walking" (A -> B -> C -> A)
    // Confuses simple algorithms
    const circleGroup = normalIds.slice(10, 15);
    let circleTrace = uuidv4();
    addTxn(circleGroup[0], circleGroup[1], 10000, circleTrace);
    addTxn(circleGroup[1], circleGroup[2], 10000, circleTrace);
    addTxn(circleGroup[2], circleGroup[3], 10000, circleTrace);
    addTxn(circleGroup[3], circleGroup[0], 10000, circleTrace); // Loop closed!

    // 3. Noise: Normal Transactions (Background traffic)
    for (let i = 0; i < 800; i++) {
        const src = normalIds[Math.floor(Math.random() * normalIds.length)];
        const tgt = normalIds[Math.floor(Math.random() * normalIds.length)];
        if (src !== tgt) {
            addTxn(src, tgt, Math.floor(Math.random() * 5000) + 100);
        }
    }

    return { accounts, transactions };
};
