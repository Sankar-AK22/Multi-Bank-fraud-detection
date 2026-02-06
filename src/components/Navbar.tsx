import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, GitBranch, Shield, Brain, Wifi, Activity, Search } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';

const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/banks', label: 'Bank Access', icon: CreditCard },
    { path: '/transactions', label: 'Flow Analysis', icon: GitBranch },
    { path: '/investigation', label: 'Investigator', icon: Search }, // New Link
    { path: '/risk', label: 'Risk Assessment', icon: Shield },
    { path: '/workflow', label: 'AI Pipeline', icon: Brain },
];

const Navbar = () => {
    const location = useLocation();
    const { result, isLoading } = useDetection();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-white text-lg tracking-tight">FraudShield</span>
                            <span className="text-xs text-blue-400 block -mt-1">Enterprise Security</span>
                        </div>
                    </Link>

                    {/* Nav Links */}
                    <div className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-blue-500/15 text-blue-400 shadow-lg shadow-blue-500/10'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden lg:block">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-4">
                        {isLoading ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                                <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                                <span className="text-xs font-medium text-blue-400">Analyzing...</span>
                            </div>
                        ) : result ? (
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${result.isMuleNetwork
                                    ? 'bg-red-500/10 border border-red-500/20'
                                    : 'bg-green-500/10 border border-green-500/20'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${result.isMuleNetwork ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                                <span className={`text-xs font-medium ${result.isMuleNetwork ? 'text-red-400' : 'text-green-400'}`}>
                                    {result.isMuleNetwork ? 'Threat Detected' : 'Secure'}
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20">
                                <div className="w-2 h-2 rounded-full bg-slate-500" />
                                <span className="text-xs font-medium text-slate-400">Standby</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
