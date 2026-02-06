import { useEffect, useRef } from 'react';
import { Play, GitBranch, Zap } from 'lucide-react';

/**
 * Hero Section Component
 * Large animated title with grid background and CTAs
 */
const HeroSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Animated network lines background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = 700;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Network nodes
        const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
        for (let i = 0; i < 50; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 14, 26, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Draw connections
                nodes.forEach((other, j) => {
                    if (i === j) return;
                    const dx = other.x - node.x;
                    const dy = other.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const handleRunDetection = () => {
        // Scroll to transaction flow section
        document.getElementById('transaction-flow')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleViewWorkflow = () => {
        // Scroll to workflow section
        document.getElementById('agent-workflow')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Animated Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
                style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1221 50%, #0a0e1a 100%)' }}
            />

            {/* Grid Overlay */}
            <div className="animated-grid z-[1]" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-pulse">
                    <Zap className="w-4 h-4 text-[#00d4ff]" />
                    <span className="text-sm text-[#00d4ff] font-medium">Powered by Agentic AI</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="gradient-text">Agentic AI</span>
                    <br />
                    <span className="text-white">for Multi-Bank</span>
                    <br />
                    <span className="text-white">Mule Account Detection</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Real-time detection of coordinated money laundering networks using
                    <span className="text-[#00d4ff]"> IP intelligence</span>,
                    <span className="text-[#00d4ff]"> device fingerprinting</span>, and
                    <span className="text-[#00d4ff]"> behavioral analysis</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleRunDetection}
                        className="btn-primary flex items-center gap-2 group"
                    >
                        <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Run Live Detection
                    </button>
                    <button
                        onClick={handleViewWorkflow}
                        className="btn-secondary flex items-center gap-2 group"
                    >
                        <GitBranch className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        View Workflow
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#00ff88]">3</div>
                        <div className="text-sm text-white/50 mt-1">Banks Monitored</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#ff3b5c]">6</div>
                        <div className="text-sm text-white/50 mt-1">Linked Accounts</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#ff9500]">85%</div>
                        <div className="text-sm text-white/50 mt-1">Risk Score</div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent z-[2]" />
        </section>
    );
};

export default HeroSection;
