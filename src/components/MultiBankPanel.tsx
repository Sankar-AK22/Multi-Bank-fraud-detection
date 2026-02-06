import { useState } from 'react';
import { bankLogins, type BankLogin } from '../data/mockData';
import { Monitor, MapPin, Clock, AlertTriangle, CheckCircle, XCircle, Wifi, Fingerprint, Building2 } from 'lucide-react';

const bankColors: Record<string, { primary: string; gradient: string }> = {
    'HDFC': { primary: '#004C8F', gradient: 'from-blue-600 to-blue-800' },
    'ICICI': { primary: '#F58220', gradient: 'from-orange-500 to-orange-700' },
    'SBI': { primary: '#22409A', gradient: 'from-indigo-600 to-indigo-800' }
};

const MultiBankPanel = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const getStatusBadge = (status: BankLogin['status']) => {
        switch (status) {
            case 'normal':
                return <div className="badge badge-safe"><CheckCircle className="w-3 h-3" />Verified</div>;
            case 'suspicious':
                return <div className="badge badge-suspicious"><AlertTriangle className="w-3 h-3" />Suspicious</div>;
            case 'fraud':
                return <div className="badge badge-fraud"><XCircle className="w-3 h-3" />High Risk</div>;
        }
    };

    return (
        <section className="py-24 px-6 pt-28">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="section-header">
                    <h2 className="section-title">Multi-Bank <span className="gradient-text">Access Monitoring</span></h2>
                    <p className="section-subtitle">Real-time login activity tracking across partnered financial institutions</p>
                </div>

                {/* Alert Banner */}
                <div className="alert-banner max-w-4xl mx-auto mb-12 flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                        <span className="text-red-400 font-semibold">Security Alert: </span>
                        <span className="text-slate-300">Identical IP address <code className="px-2 py-1 rounded bg-red-500/10 text-red-400 font-mono text-sm ml-1">192.168.45.102</code> detected across multiple banking institutions</span>
                    </div>
                </div>

                {/* Bank Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {bankLogins.map((bank) => {
                        const colors = bankColors[bank.bankCode] || { primary: '#3b82f6', gradient: 'from-blue-500 to-blue-700' };
                        const isHovered = hoveredCard === bank.bankCode;
                        const isRisky = bank.status !== 'normal';

                        return (
                            <div
                                key={bank.bankCode}
                                className={`glass-card glass-card-hover p-6 transition-all duration-300 ${isRisky ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-green-500'}`}
                                onMouseEnter={() => setHoveredCard(bank.bankCode)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Bank Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                                            <Building2 className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{bank.bankName}</h3>
                                            <p className="text-sm text-slate-500 font-mono">{bank.bankCode}</p>
                                        </div>
                                    </div>
                                    {getStatusBadge(bank.status)}
                                </div>

                                {/* Login Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/30">
                                        <Monitor className="w-5 h-5 text-slate-500" />
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">User ID</p>
                                            <p className="text-sm font-mono text-white">{bank.userId}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-4 p-3 rounded-xl ${isRisky ? 'bg-red-500/10 border border-red-500/20' : 'bg-slate-800/30'}`}>
                                        <Wifi className={`w-5 h-5 ${isRisky ? 'text-red-500' : 'text-slate-500'}`} />
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">IP Address</p>
                                            <p className={`text-sm font-mono ${isRisky ? 'text-red-400' : 'text-white'}`}>{bank.ipAddress}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-4 p-3 rounded-xl ${isRisky ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-slate-800/30'}`}>
                                        <Fingerprint className={`w-5 h-5 ${isRisky ? 'text-amber-500' : 'text-slate-500'}`} />
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Device ID</p>
                                            <p className={`text-sm font-mono ${isRisky ? 'text-amber-400' : 'text-white'}`}>{bank.deviceId}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/30">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Location</p>
                                            <p className="text-sm text-white">{bank.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/30">
                                        <Clock className="w-5 h-5 text-slate-500" />
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Last Activity</p>
                                            <p className="text-sm text-white">{bank.lastLogin}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Warning */}
                                {isHovered && isRisky && (
                                    <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                        <p className="text-xs text-red-400 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            Cross-bank access pattern detected - potential mule network activity
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex justify-center mt-12">
                    <div className="glass px-6 py-3 rounded-2xl inline-flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-sm text-slate-400">Shared IP Detected</span>
                        </div>
                        <div className="w-px h-4 bg-slate-700" />
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <span className="text-sm text-slate-400">Shared Device ID</span>
                        </div>
                        <div className="w-px h-4 bg-slate-700" />
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-sm text-slate-400">Verified Access</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MultiBankPanel;
