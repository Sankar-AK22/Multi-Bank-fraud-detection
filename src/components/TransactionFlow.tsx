import { useEffect, useState } from 'react';
import { transactionFlow, formatCurrency } from '../data/mockData';
import {
    User,
    Skull,
    Users,
    Banknote,
    ArrowRight,
    Clock,
    Wifi
} from 'lucide-react';

/**
 * Transaction Flow Visualization
 * Shows money flow from victims → theft → mules → cashout
 */
const TransactionFlow = () => {
    const [activeFlow, setActiveFlow] = useState(0);

    // Animate through the flow
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFlow((prev) => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const customers = transactionFlow.filter(n => n.type === 'customer');
    const theft = transactionFlow.filter(n => n.type === 'theft')[0];
    const mules = transactionFlow.filter(n => n.type === 'mule');
    const cashout = transactionFlow.filter(n => n.type === 'cashout')[0];

    const NodeCard = ({
        node,
        icon: Icon,
        color,
        isActive
    }: {
        node: typeof transactionFlow[0];
        icon: React.ElementType;
        color: string;
        isActive: boolean;
    }) => (
        <div
            className={`glass-card p-4 min-w-[200px] transition-all duration-500 ${isActive ? `glow-box-${color === '#ff3b5c' ? 'red' : color === '#00ff88' ? 'green' : 'blue'} scale-105` : ''
                }`}
        >
            <div className="flex items-center gap-2 mb-3">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${color}20` }}
                >
                    <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color }}
                >
                    {node.type}
                </span>
            </div>

            <div className="space-y-2">
                <div>
                    <p className="text-[10px] text-white/40 uppercase">Account</p>
                    <p className="text-xs font-mono text-white truncate">{node.accountId}</p>
                </div>
                <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-white/40" />
                    <p className="text-[10px] font-mono text-white/60">{node.ipAddress}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color }}>
                        {formatCurrency(node.amount)}
                    </span>
                    <div className="flex items-center gap-1 text-white/50">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px]">{node.timeDelay}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const FlowArrow = ({ isActive, delay }: { isActive: boolean; delay: number }) => (
        <div className="flex items-center justify-center px-2">
            <div className="relative">
                <ArrowRight
                    className={`w-8 h-8 transition-all duration-300 ${isActive ? 'text-[#00d4ff] scale-125' : 'text-white/30'
                        }`}
                />
                {isActive && (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ animationDelay: `${delay}ms` }}
                    >
                        <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section id="transaction-flow" className="py-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Transaction <span className="text-[#00d4ff]">Flow Visualization</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Track the movement of funds from victim accounts through the mule network
                    </p>
                </div>

                {/* Flow Legend */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#00ff88]" />
                        <span className="text-sm text-white/60">Legitimate Accounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff3b5c]" />
                        <span className="text-sm text-white/60">Theft Account</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff9500]" />
                        <span className="text-sm text-white/60">Mule Accounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#a855f7]" />
                        <span className="text-sm text-white/60">Cash Out</span>
                    </div>
                </div>

                {/* Flow Diagram */}
                <div className="overflow-x-auto pb-4">
                    <div className="flex items-center justify-start min-w-max gap-2 px-4">
                        {/* Customer Accounts Column */}
                        <div className="flex flex-col gap-4">
                            {customers.map((customer) => (
                                <NodeCard
                                    key={customer.id}
                                    node={customer}
                                    icon={User}
                                    color="#00ff88"
                                    isActive={activeFlow === 0}
                                />
                            ))}
                        </div>

                        <FlowArrow isActive={activeFlow === 0} delay={0} />

                        {/* Theft Account */}
                        <div className="flex flex-col justify-center">
                            <NodeCard
                                node={theft}
                                icon={Skull}
                                color="#ff3b5c"
                                isActive={activeFlow === 1}
                            />
                            <div className="text-center mt-2">
                                <span className="text-xs text-[#ff3b5c] font-medium">
                                    ⚡ Fast Aggregation
                                </span>
                            </div>
                        </div>

                        <FlowArrow isActive={activeFlow === 1} delay={200} />

                        {/* Mule Accounts Column */}
                        <div className="flex flex-col gap-4">
                            {mules.map((mule) => (
                                <NodeCard
                                    key={mule.id}
                                    node={mule}
                                    icon={Users}
                                    color="#ff9500"
                                    isActive={activeFlow === 2}
                                />
                            ))}
                            <div className="text-center">
                                <span className="text-xs text-[#ff9500] font-medium">
                                    🔀 One-to-Many Split
                                </span>
                            </div>
                        </div>

                        <FlowArrow isActive={activeFlow === 2} delay={400} />

                        {/* Cash Out */}
                        <div className="flex flex-col justify-center">
                            <NodeCard
                                node={cashout}
                                icon={Banknote}
                                color="#a855f7"
                                isActive={activeFlow === 3}
                            />
                            <div className="text-center mt-2">
                                <span className="text-xs text-[#a855f7] font-medium">
                                    💸 ATM Withdrawals
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flow Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
                    <div className="glass-card p-4 text-center">
                        <p className="text-2xl font-bold text-[#ff3b5c]">₹12.5L</p>
                        <p className="text-xs text-white/50 mt-1">Total Stolen</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <p className="text-2xl font-bold text-[#ff9500]">&lt; 15 min</p>
                        <p className="text-xs text-white/50 mt-1">Total Time</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <p className="text-2xl font-bold text-[#00d4ff]">3</p>
                        <p className="text-xs text-white/50 mt-1">Mule Accounts</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <p className="text-2xl font-bold text-[#a855f7]">4</p>
                        <p className="text-xs text-white/50 mt-1">Hop Count</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TransactionFlow;
