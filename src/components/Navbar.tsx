import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, GitBranch, Shield, Brain, Wifi, Zap } from 'lucide-react';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/banks', label: 'Bank Logins', icon: CreditCard },
    { path: '/transactions', label: 'Transaction Flow', icon: GitBranch },
    { path: '/intelligence', label: 'Intelligence', icon: Wifi },
    { path: '/risk', label: 'Risk Score', icon: Shield },
    { path: '/workflow', label: 'AI Workflow', icon: Brain },
];

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white hidden sm:block">MuleDetect AI</span>
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
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                            ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden md:block">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
