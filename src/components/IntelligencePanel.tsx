import { intelligenceData } from '../data/mockData';
import {
    Globe,
    Fingerprint,
    Link2,
    AlertTriangle,
    Network,
    Shield
} from 'lucide-react';

/**
 * IP & Device Intelligence Panel
 * Shows shared IP/Device analysis and linked accounts
 */
const IntelligencePanel = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#0d1221] to-transparent">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        IP & Device <span className="text-[#00d4ff]">Intelligence</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Advanced fingerprinting technology to detect coordinated fraudulent activities
                    </p>
                </div>

                {/* Intelligence Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                    {/* Shared IP Card */}
                    <div className="glass-card p-6 border-t-4 border-t-[#ff3b5c]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#ff3b5c]/20 flex items-center justify-center">
                                <Globe className="w-6 h-6 text-[#ff3b5c]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Shared IP Address</h3>
                                <p className="text-sm text-white/50">Network Analysis</p>
                            </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-4 mb-4">
                            <code className="text-lg font-mono text-[#ff3b5c]">{intelligenceData.sharedIP}</code>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Link2 className="w-4 h-4 text-white/50" />
                                <span className="text-sm text-white/70">Linked Accounts</span>
                            </div>
                            <span className="text-2xl font-bold text-[#ff3b5c]">{intelligenceData.linkedAccounts}</span>
                        </div>
                    </div>

                    {/* Shared Device Card */}
                    <div className="glass-card p-6 border-t-4 border-t-[#ff9500]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#ff9500]/20 flex items-center justify-center">
                                <Fingerprint className="w-6 h-6 text-[#ff9500]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Shared Device ID</h3>
                                <p className="text-sm text-white/50">Device Fingerprint</p>
                            </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-4 mb-4">
                            <code className="text-lg font-mono text-[#ff9500]">{intelligenceData.sharedDevice}</code>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Link2 className="w-4 h-4 text-white/50" />
                                <span className="text-sm text-white/70">Device Accounts</span>
                            </div>
                            <span className="text-2xl font-bold text-[#ff9500]">{intelligenceData.deviceAccounts}</span>
                        </div>
                    </div>

                    {/* Network Graph Card */}
                    <div className="glass-card p-6 border-t-4 border-t-[#00d4ff] md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/20 flex items-center justify-center">
                                <Network className="w-6 h-6 text-[#00d4ff]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Network Topology</h3>
                                <p className="text-sm text-white/50">Connection Map</p>
                            </div>
                        </div>

                        {/* Mini Network Visualization */}
                        <div className="relative h-32 bg-black/20 rounded-lg overflow-hidden">
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                                {/* Center node (IP) */}
                                <circle cx="100" cy="50" r="15" fill="#ff3b5c" opacity="0.8" className="pulse-dot" />
                                <text x="100" y="54" textAnchor="middle" fill="white" fontSize="8">IP</text>

                                {/* Connected nodes */}
                                <circle cx="40" cy="30" r="10" fill="#00d4ff" opacity="0.6" />
                                <circle cx="40" cy="70" r="10" fill="#00d4ff" opacity="0.6" />
                                <circle cx="160" cy="30" r="10" fill="#ff9500" opacity="0.6" />
                                <circle cx="160" cy="70" r="10" fill="#ff9500" opacity="0.6" />
                                <circle cx="100" cy="15" r="8" fill="#a855f7" opacity="0.6" />
                                <circle cx="100" cy="85" r="8" fill="#a855f7" opacity="0.6" />

                                {/* Connection lines */}
                                <line x1="100" y1="50" x2="40" y2="30" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                                <line x1="100" y1="50" x2="40" y2="70" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                                <line x1="100" y1="50" x2="160" y2="30" stroke="#ff9500" strokeWidth="1" opacity="0.5" />
                                <line x1="100" y1="50" x2="160" y2="70" stroke="#ff9500" strokeWidth="1" opacity="0.5" />
                                <line x1="100" y1="50" x2="100" y2="15" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
                                <line x1="100" y1="50" x2="100" y2="85" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
                            </svg>
                        </div>

                        <div className="mt-3 text-center">
                            <span className="text-sm text-[#00d4ff]">6 nodes connected via single IP</span>
                        </div>
                    </div>
                </div>

                {/* Warning Banner */}
                <div className="glass-card p-6 max-w-4xl mx-auto border border-[#ff3b5c]/30 bg-[#ff3b5c]/5">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ff3b5c]/20 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-6 h-6 text-[#ff3b5c]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#ff3b5c] mb-2">
                                ⚠️ Critical Alert: Coordinated Fraud Activity Detected
                            </h3>
                            <p className="text-white/70 mb-4">
                                Multiple accounts accessed from the same IP address and device fingerprint indicates
                                a coordinated mule network operation.
                            </p>

                            {/* Risk Indicators */}
                            <div className="grid md:grid-cols-2 gap-3">
                                {intelligenceData.riskIndicators.map((indicator, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <Shield className="w-4 h-4 text-[#ff9500] shrink-0" />
                                        <span className="text-white/80">{indicator}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntelligencePanel;
