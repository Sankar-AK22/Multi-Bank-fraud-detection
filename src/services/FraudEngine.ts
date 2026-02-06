import { generateScamDataset, type AccountHolder, type Transaction } from '../utils/scamGenerator';
import { type Node, type Edge } from '@reactflow/core';

// ================================
// FRAUD LOGIC ENGINE (Simulated Backend)
// ================================

class FraudEngineService {
    private accounts: Map<string, AccountHolder> = new Map();
    private transactions: Transaction[] = [];
    private isInitialized = false;

    initialize() {
        if (this.isInitialized) return;
        const data = generateScamDataset();
        data.accounts.forEach(acc => this.accounts.set(acc.accountId, acc));
        this.transactions = data.transactions;
        this.isInitialized = true;
        console.log(`✅ Fraud Engine Initialized: ${this.accounts.size} Accounts, ${this.transactions.length} Txns`);
    }

    /**
     * Add a new account dynamically (e.g. via Single Entry or CSV)
     */
    addAccount(account: AccountHolder) {
        this.accounts.set(account.accountId, account);
        console.log(`✅ Account Added: ${account.name} (${account.role})`);
    }

    // --- 1. Graph Generation --

    /**
     * Get the full transaction graph for ReactFlow
     * @param limit Limit nodes for performance
     */
    getGraphData(limit = 200): { nodes: Node[], edges: Edge[] } {
        const nodes: Node[] = [];
        const edges: Edge[] = [];
        const addedNodes = new Set<string>();

        // 1. Prioritize High Risk Nodes (Kingpin, Mules)
        const priorityTxns = this.transactions
            .filter(t => t.riskScore > 50)
            .slice(0, limit);

        priorityTxns.forEach(txn => {
            const source = this.accounts.get(txn.sourceId);
            const target = this.accounts.get(txn.targetId);
            if (!source || !target) return;

            // Add Nodes
            if (!addedNodes.has(source.accountId)) {
                nodes.push(this.mapAccountToNode(source));
                addedNodes.add(source.accountId);
            }
            if (!addedNodes.has(target.accountId)) {
                nodes.push(this.mapAccountToNode(target));
                addedNodes.add(target.accountId);
            }

            // Add Edge
            edges.push({
                id: txn.transactionId,
                source: txn.sourceId,
                target: txn.targetId,
                animated: true,
                label: `₹${txn.amount.toLocaleString()}`,
                style: { stroke: txn.riskScore > 80 ? '#ef4444' : '#3b82f6', strokeWidth: 2 },
                data: { ...txn }
            });
        });

        return { nodes, edges };
    }

    private mapAccountToNode(acc: AccountHolder): Node {
        let color = '#64748b'; // Normal
        if (acc.role === 'KINGPIN') color = '#dc2626'; // Red
        if (acc.role === 'MULE') color = '#f59e0b'; // Amber
        if (acc.role === 'VICTIM') color = '#22c55e'; // Green

        return {
            id: acc.accountId,
            type: 'default', // or custom
            position: { x: Math.random() * 500, y: Math.random() * 500 }, // Initial random pos
            data: { label: acc.name, role: acc.role, riskScore: acc.riskScore },
            style: {
                background: '#0f172a',
                color: '#fff',
                border: `2px solid ${color}`,
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                textAlign: 'center'
            }
        };
    }

    // --- 2. Advanced Trace Logic ---

    /**
     * Traces money flow starting from a specific Account ID
     * @param startAccountId The account to trace from
     * @param direction 'UPSTREAM' (Where money came from) or 'DOWNSTREAM' (Where money went)
     */
    traceAccountFlow(startAccountId: string, direction: 'UPSTREAM' | 'DOWNSTREAM' = 'UPSTREAM'): { nodes: Node[], edges: Edge[] } {
        const visitedNodes = new Set<string>();
        const visitedEdges = new Set<string>();
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        const queue = [startAccountId];
        visitedNodes.add(startAccountId);

        // Add start node
        const startNode = this.accounts.get(startAccountId);
        if (startNode) nodes.push(this.mapAccountToNode(startNode));

        let depth = 0;
        const MAX_DEPTH = 6; // Trace up to 6 hops

        while (queue.length > 0 && depth < MAX_DEPTH) {
            const levelSize = queue.length; // Process level by level

            for (let i = 0; i < levelSize; i++) {
                const currentId = queue.shift()!;

                // Find relevant transactions
                let relevantTxns: Transaction[] = [];

                if (direction === 'UPSTREAM') {
                    // Find INBOUND transactions (Who sent money TO currentId?)
                    relevantTxns = this.transactions.filter(t => t.targetId === currentId);
                } else {
                    // Find OUTBOUND transactions (Who did currentId send money TO?)
                    relevantTxns = this.transactions.filter(t => t.sourceId === currentId);
                }

                relevantTxns.forEach(txn => {
                    const nextAccountId = direction === 'UPSTREAM' ? txn.sourceId : txn.targetId;

                    // Add Edge
                    if (!visitedEdges.has(txn.transactionId)) {
                        edges.push({
                            id: txn.transactionId,
                            source: txn.sourceId,
                            target: txn.targetId,
                            animated: true,
                            label: `₹${txn.amount.toLocaleString()}`,
                            style: {
                                stroke: direction === 'UPSTREAM' ? '#ef4444' : '#3b82f6', // Red for upstream (Source), Blue for downstream
                                strokeWidth: 3
                            },
                            data: { ...txn }
                        });
                        visitedEdges.add(txn.transactionId);
                    }

                    // Add Node if not visited
                    if (!visitedNodes.has(nextAccountId)) {
                        const nextNode = this.accounts.get(nextAccountId);
                        if (nextNode) {
                            nodes.push(this.mapAccountToNode(nextNode));
                            visitedNodes.add(nextAccountId);
                            queue.push(nextAccountId);
                        }
                    }
                });
            }
            depth++;
        }

        return { nodes, edges };
    }

    /**
     * Get overall stats
     */
    getStats() {
        return {
            totalAccounts: this.accounts.size,
            totalTxns: this.transactions.length,
            highRiskCount: this.transactions.filter(t => t.riskScore > 80).length,
            muleCount: Array.from(this.accounts.values()).filter(a => a.role === 'MULE').length
        };
    }
}

export const fraudEngine = new FraudEngineService();
