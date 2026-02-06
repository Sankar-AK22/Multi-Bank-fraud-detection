import { useState } from 'react';
import { bankLogins, type BankLogin } from '../data/mockData';
import {
    Monitor,
    MapPin,
    Clock,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Wifi,
    Fingerprint
} from 'lucide-react';

/**
 * Multi-Bank Login Access Panel
 * Shows login cards for multiple banks with status indicators
 */
const MultiBankPanel = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const getStatusBadge = (status: BankLogin['status']) => {
        switch (status) {
            case 'normal':
                return (
                    <div className="badge badge-safe">
                        <CheckCircle className="w-3 h-3" />
                        Normal
                    </div>
                );
            case 'suspicious':
                return (
                    <div className="badge badge-suspicious">
                        <AlertTriangle className="w-3 h-3" />
                        Suspicious
                    </div>
                );
            case 'fraud':
                return (
                    <div className="badge badge-fraud">
                        <XCircle className="w-3 h-3" />
                        Fraud Detected
                    </div>
                );
        }
    };

    const getBorderColor = (status: BankLogin['status']) => {
        switch (status) {
            case 'normal': return 'border-l-[#00ff88]';
            case 'suspicious': return 'border-l-[#ff9500]';
            case 'fraud': return 'border-l-[#ff3b5c]';
        }
    };

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Multi-Bank Login <span className="text-[#00d4ff]">Access Panel</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Real-time monitoring of user logins across multiple banking institutions
                    </p>
                </div>

                {/* Warning Banner */}
                <div className="glass-card p-4 mb-8 border-l-4 border-l-[#ff9500] max-w-4xl mx-auto">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#ff9500] shrink-0" />
                        <div>
                            <span className="text-[#ff9500] font-semibold">⚠️ Alert: </span>
                            <span className="text-white/80">
                                Same IP address <code className="bg-white/10 px-2 py-0.5 rounded text-[#00d4ff]">192.168.45.102</code> detected across all 3 banks
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bank Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {bankLogins.map((bank) => (
                        <div
                            key={bank.bankCode}
                            className={`glass-card glass-card-hover p-6 transition-all duration-300 border-l-4 ${getBorderColor(bank.status)}`}
                            onMouseEnter={() => setHoveredCard(bank.bankCode)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Bank Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                                        style={{ backgroundColor: bank.color }}
                                    >
                                        {bank.bankCode.substring(0, 2)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{bank.bankName}</h3>
                                        <p className="text-sm text-white/50">{bank.bankCode}</p>
                                    </div>
                                </div>
                                {getStatusBadge(bank.status)}
                            </div>

                            {/* Login Details */}
                            <div className="space-y-4">
                                {/* User ID */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Monitor className="w-4 h-4 text-white/60" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-white/40 uppercase tracking-wider">User ID</p>
                                        <p className="text-sm font-mono text-white">{bank.userId}</p>
                                    </div>
                                </div>

                                {/* IP Address */}
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bank.status !== 'normal' ? 'bg-[#ff3b5c]/20' : 'bg-white/5'
                                        }`}>
                                        <Wifi className={`w-4 h-4 ${bank.status !== 'normal' ? 'text-[#ff3b5c]' : 'text-white/60'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-white/40 uppercase tracking-wider">IP Address</p>
                                        <p className={`text-sm font-mono ${bank.status !== 'normal' ? 'text-[#ff3b5c]' : 'text-white'}`}>
                                            {bank.ipAddress}
                                        </p>
                                    </div>
                                </div>

                                {/* Device ID */}
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bank.status !== 'normal' ? 'bg-[#ff9500]/20' : 'bg-white/5'
                                        }`}>
                                        <Fingerprint className={`w-4 h-4 ${bank.status !== 'normal' ? 'text-[#ff9500]' : 'text-white/60'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-white/40 uppercase tracking-wider">Device ID</p>
                                        <p className={`text-sm font-mono ${bank.status !== 'normal' ? 'text-[#ff9500]' : 'text-white'}`}>
                                            {bank.deviceId}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-white/60" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-white/40 uppercase tracking-wider">Location</p>
                                        <p className="text-sm text-white">{bank.location}</p>
                                    </div>
                                </div>

                                {/* Last Login */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-white/60" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-white/40 uppercase tracking-wider">Last Login</p>
                                        <p className="text-sm text-white">{bank.lastLogin}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tooltip on hover for suspicious cards */}
                            {hoveredCard === bank.bankCode && bank.status !== 'normal' && (
                                <div className="mt-4 p-3 rounded-lg bg-[#ff3b5c]/10 border border-[#ff3b5c]/30">
                                    <p className="text-xs text-[#ff3b5c]">
                                        ⚠️ Same IP and device used across multiple banks - potential mule network activity
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Connection Indicator */}
                <div className="flex justify-center mt-8">
                    <div className="glass px-6 py-3 rounded-full inline-flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#ff3b5c] animate-pulse" />
                            <span className="text-sm text-white/70">Shared IP Detected</span>
                        </div>
                        <div className="w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#ff9500] animate-pulse" />
                            <span className="text-sm text-white/70">Shared Device ID</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MultiBankPanel;
