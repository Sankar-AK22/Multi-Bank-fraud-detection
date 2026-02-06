import { Github, Linkedin, ExternalLink, Zap, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 px-4 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-lg">MuleDetect AI</span>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Agentic AI-powered fraud detection system for identifying multi-bank mule account networks in real-time.
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Built With</h4>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Tailwind CSS', 'n8n', 'Agentic AI'].map((tech) => (
                                <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/70 border border-white/10">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:bg-white/10 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:bg-white/10 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:bg-white/10 transition-all">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-white/50">
                        <span>Built with</span><Heart className="w-4 h-4 text-[#ff3b5c]" /><span>for Hackathon 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-white/50">Powered by</span>
                        <span className="px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] text-sm font-medium border border-[#00d4ff]/30">n8n + Agentic AI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
