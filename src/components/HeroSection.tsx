import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, GitBranch, Zap, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';

const HeroSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();
    const { isLoading, result, runDetection } = useDetection();
    const [showResult, setShowResult] = useState(false);

    // Canvas animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = 700; };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
        for (let i = 0; i < 50; i++) {
            nodes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 });
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 14, 26, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            nodes.forEach((node, i) => {
                node.x += node.vx; node.y += node.vy;
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                nodes.forEach((other, j) => {
                    if (i === j) return;
                    const dist = Math.sqrt((other.x - node.x) ** 2 + (other.y - node.y) ** 2);
                    if (dist < 150) {
                        ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 150)})`; ctx.lineWidth = 1; ctx.stroke();
                    }
                });
                ctx.beginPath(); ctx.arc(node.x, node.y, 2, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0, 212, 255, 0.6)'; ctx.fill();
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
            setTimeout(() => navigate('/risk'), 2500);
        }
    };

    return (
        <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden pt-16">
            <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1221 50%, #0a0e1a 100%)' }} />
            <div className="animated-grid z-[1]" />

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-pulse">
                    <Zap className="w-4 h-4 text-[#00d4ff]" />
                    <span className="text-sm text-[#00d4ff] font-medium">Powered by n8n + Agentic AI</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="gradient-text">Agentic AI</span><br />
                    <span className="text-white">for Multi-Bank</span><br />
                    <span className="text-white">Mule Account Detection</span>
                </h1>

                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
                    Real-time detection via <span className="text-[#00d4ff]">n8n webhook</span> - IP intelligence, device fingerprinting, behavioral analysis
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button onClick={handleRunDetection} disabled={isLoading} className="btn-primary flex items-center gap-2 group disabled:opacity-50">
                        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Calling n8n...</> : <><Play className="w-5 h-5" />Run Live Detection</>}
                    </button>
                    <button onClick={() => navigate('/workflow')} className="btn-secondary flex items-center gap-2">
                        <GitBranch className="w-5 h-5" />View Workflow
                    </button>
                </div>

                {showResult && result && (
                    <div className={`mt-8 p-6 rounded-xl glass-card border-2 max-w-md mx-auto ${result.isMuleNetwork ? 'border-[#ff3b5c] bg-[#ff3b5c]/10' : 'border-[#00ff88] bg-[#00ff88]/10'}`}>
                        <div className="flex items-center justify-center gap-3 mb-3">
                            {result.isMuleNetwork ? <XCircle className="w-8 h-8 text-[#ff3b5c]" /> : <CheckCircle className="w-8 h-8 text-[#00ff88]" />}
                            <span className={`text-xl font-bold ${result.isMuleNetwork ? 'text-[#ff3b5c]' : 'text-[#00ff88]'}`}>
                                {result.isMuleNetwork ? '🚨 MULE NETWORK DETECTED' : '✅ SAFE'}
                            </span>
                        </div>
                        <div className="text-center">
                            <span className="text-4xl font-bold text-white">{Math.round(result.riskScore * 100)}%</span>
                            <span className="text-white/60 ml-2">Risk Score</span>
                        </div>
                        <p className="text-sm text-white/50 mt-3">Redirecting to full analysis...</p>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                    <div className="text-center"><div className="text-3xl font-bold text-[#00ff88]">{result?.linkedAccounts || 3}</div><div className="text-sm text-white/50">Banks Monitored</div></div>
                    <div className="text-center"><div className="text-3xl font-bold text-[#ff3b5c]">{result?.linkedAccounts || 6}</div><div className="text-sm text-white/50">Linked Accounts</div></div>
                    <div className="text-center"><div className="text-3xl font-bold text-[#ff9500]">{result ? Math.round(result.riskScore * 100) : 85}%</div><div className="text-sm text-white/50">Risk Score</div></div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent z-[2]" />
        </section>
    );
};

export default HeroSection;
