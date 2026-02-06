import { agentSteps } from '../data/mockData';
import { Database, Brain, Network, Gauge, Shield, CheckCircle, Loader2, Circle } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    database: Database, brain: Brain, network: Network, gauge: Gauge, shield: Shield
};

const AgentWorkflow = () => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-5 h-5 text-[#00ff88]" />;
            case 'active': return <Loader2 className="w-5 h-5 text-[#00d4ff] animate-spin" />;
            default: return <Circle className="w-5 h-5 text-white/30" />;
        }
    };

    const getCardStyle = (status: string) => {
        switch (status) {
            case 'completed': return 'border-[#00ff88]/30 bg-[#00ff88]/5';
            case 'active': return 'border-[#00d4ff]/50 bg-[#00d4ff]/10 glow-box-blue';
            default: return 'border-white/10 bg-white/5';
        }
    };

    return (
        <section id="agent-workflow" className="py-20 px-4 bg-gradient-to-b from-transparent via-[#0d1221] to-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Agentic AI <span className="text-[#a855f7]">Workflow Pipeline</span></h2>
                    <p className="text-white/60 max-w-2xl mx-auto">Multi-agent system orchestrating fraud detection in real-time</p>
                </div>

                <div className="overflow-x-auto pb-4">
                    <div className="flex items-stretch gap-4 min-w-max px-4">
                        {agentSteps.map((step, index) => {
                            const Icon = iconMap[step.icon] || Brain;
                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className={`glass-card p-6 w-56 border ${getCardStyle(step.status)} transition-all duration-300`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-[#a855f7]" />
                                            </div>
                                            {getStatusIcon(step.status)}
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-xs text-white/40 uppercase tracking-wider">Step {step.id}</span>
                                            <h3 className="font-semibold text-white text-sm mt-1">{step.name}</h3>
                                        </div>
                                        <p className="text-xs text-white/60 leading-relaxed">{step.description}</p>
                                        <div className="mt-4 pt-3 border-t border-white/10">
                                            <span className={`text-xs font-medium uppercase tracking-wider ${step.status === 'completed' ? 'text-[#00ff88]' : step.status === 'active' ? 'text-[#00d4ff]' : 'text-white/40'
                                                }`}>{step.status}</span>
                                        </div>
                                    </div>
                                    {index < agentSteps.length - 1 && (
                                        <div className="flex items-center px-2">
                                            <div className={`w-8 h-0.5 ${step.status === 'completed' ? 'bg-[#00ff88]' : 'bg-white/20'}`} />
                                            <div className={`w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent ${step.status === 'completed' ? 'border-l-[#00ff88]' : 'border-l-white/20'
                                                }`} style={{ borderLeftWidth: '6px' }} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <div className="glass px-6 py-3 rounded-full inline-flex items-center gap-6">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00ff88]" /><span className="text-sm text-white/60">Completed</span></div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" /><span className="text-sm text-white/60">Active</span></div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/30" /><span className="text-sm text-white/60">Pending</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgentWorkflow;
