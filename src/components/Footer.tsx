import { Shield, Github, Linkedin, ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-16 px-6 border-t border-white/5 bg-[#020617]">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="font-bold text-xl text-white">FraudShield</span>
                                <span className="text-xs text-blue-400 block">Enterprise Security Platform</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                            AI-powered multi-bank fraud detection system. Identify coordinated money laundering networks and mule accounts in real-time across multiple financial institutions.
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Technology</h4>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Tailwind', 'n8n', 'Agentic AI'].map((tech) => (
                                <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-800/50 text-xs text-slate-400 border border-slate-700/50 font-medium">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h4>
                        <div className="flex gap-3">
                            <a href="https://github.com/Sankar-AK22/Multi-Bank-fraud-detection" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 transition-all border border-slate-700/50">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-11 h-11 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 transition-all border border-slate-700/50">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-11 h-11 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 transition-all border border-slate-700/50">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Built with</span>
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>for Hackathon 2026</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">Powered by</span>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20">
                            <span className="text-sm font-semibold text-blue-400">n8n</span>
                            <span className="text-slate-600">+</span>
                            <span className="text-sm font-semibold text-violet-400">Agentic AI</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
