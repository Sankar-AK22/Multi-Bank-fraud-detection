import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Shield, Loader2, CheckCircle, AlertTriangle, Building2, Wifi, Fingerprint } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';

const HeroSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();
    const { isLoading, result, runDetection } = useDetection();
    const [showResult, setShowResult] = useState(false);

    // Premium animated background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = 800; };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 1
            });
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                particles.forEach((p2, j) => {
                    if (i === j) return;
                    const dist = Math.sqrt((p2.x - p.x) ** 2 + (p2.y - p.y) ** 2);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.1 * (1 - dist / 120)})`);
                        gradient.addColorStop(1, `rgba(139, 92, 246, ${0.1 * (1 - dist / 120)})`);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };
        animate();
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const handleRunDetection = async () => {
        setShowResult(false);
        const res = await runDetection();
        if (res) {
            setShowResult(true);
            setTimeout(() => navigate('/risk'), 3000);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />
            <div className="animated-grid z-[1]" />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] z-[2]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] z-0" />

            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-20">
                {/* Live Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-blue-500/20 mb-10">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                    <span className="text-sm text-slate-300 font-medium">Real-Time Fraud Detection System</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold">LIVE</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight">
                    <span className="text-white">Enterprise</span>
                    <br />
                    <span className="gradient-text">Mule Detection</span>
                    <br />
                    <span className="text-white">Platform</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                    AI-powered fraud detection across <span className="text-blue-400 font-semibold">multiple banking institutions</span>.
                    Identify coordinated money laundering networks in real-time using advanced IP intelligence and behavioral analysis.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                        <Building2 className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-300">Multi-Bank Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                        <Wifi className="w-4 h-4 text-violet-400" />
                        <span className="text-sm text-slate-300">IP Intelligence</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                        <Fingerprint className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-300">Device Fingerprinting</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">AI Risk Scoring</span>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <button onClick={handleRunDetection} disabled={isLoading} className="btn-primary flex items-center gap-3 text-base px-8 py-4 disabled:opacity-60">
                        {isLoading ? (
                            <><Loader2 className="w-5 h-5 animate-spin" />Processing via n8n...</>
                        ) : (
                            <><Play className="w-5 h-5" />Run Live Detection</>
                        )}
                    </button>
                    <button onClick={() => navigate('/workflow')} className="btn-secondary flex items-center gap-3 text-base px-8 py-4">
                        View AI Workflow <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Detection Result */}
                {showResult && result && (
                    <div className={`max-w-lg mx-auto p-8 rounded-2xl glass-card border-2 ${result.isMuleNetwork ? 'border-red-500/50 glow-red' : 'border-green-500/50 glow-green'
                        }`}>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            {result.isMuleNetwork ? (
                                <AlertTriangle className="w-10 h-10 text-red-500" />
                            ) : (
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            )}
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${result.isMuleNetwork ? 'text-red-400' : 'text-green-400'}`}>
                            {result.isMuleNetwork ? '⚠️ MULE NETWORK DETECTED' : '✅ SYSTEM SECURE'}
                        </h3>
                        <div className="text-5xl font-bold text-white mb-4">{Math.round(result.riskScore * 100)}%</div>
                        <p className="text-slate-400 text-sm">Risk Level: <span className={`font-bold ${result.riskScore >= 0.7 ? 'text-red-400' : 'text-yellow-400'}`}>{result.riskLevel}</span></p>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs text-slate-500">Redirecting to full analysis...</p>
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
                    <div className="data-card text-center">
                        <div className="stat-value text-green-400">{result?.linkedAccounts || 3}</div>
                        <div className="stat-label">Banks Monitored</div>
                    </div>
                    <div className="data-card text-center">
                        <div className="stat-value text-red-400">{result?.linkedAccounts || 6}</div>
                        <div className="stat-label">Linked Accounts</div>
                    </div>
                    <div className="data-card text-center">
                        <div className="stat-value text-amber-400">{result ? Math.round(result.riskScore * 100) : 85}%</div>
                        <div className="stat-label">Risk Score</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
