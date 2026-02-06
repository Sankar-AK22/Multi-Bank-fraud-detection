import { useEffect, useState } from 'react';
import { riskAssessment } from '../data/mockData';
import { AlertOctagon, XCircle, ShieldAlert, Brain, TrendingUp, CheckCircle2 } from 'lucide-react';

const RiskScore = () => {
    const [animatedScore, setAnimatedScore] = useState(0);
    const [showReasons, setShowReasons] = useState(false);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = riskAssessment.score / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= riskAssessment.score) {
                setAnimatedScore(riskAssessment.score);
                clearInterval(timer);
                setTimeout(() => setShowReasons(true), 500);
            } else {
                setAnimatedScore(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, []);

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (animatedScore * circumference);
    const getRiskColor = () => riskAssessment.score >= 0.7 ? '#ff3b5c' : riskAssessment.score >= 0.4 ? '#ff9500' : '#00ff88';

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Mule Network <span className="text-[#ff3b5c]">Detection Result</span></h2>
                    <p className="text-white/60 max-w-2xl mx-auto">AI-powered risk assessment with explainable decision factors</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="glass-card p-8 flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-6">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke={getRiskColor()} strokeWidth="8" strokeLinecap="round"
                                    strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-500 ease-out"
                                    style={{ filter: `drop-shadow(0 0 10px ${getRiskColor()})` }} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold" style={{ color: getRiskColor() }}>{(animatedScore * 100).toFixed(0)}%</span>
                                <span className="text-sm text-white/50 uppercase tracking-wider">Risk Score</span>
                            </div>
                        </div>

                        <div className="px-6 py-3 rounded-xl flex items-center gap-3 mb-4" style={{ backgroundColor: `${getRiskColor()}20`, border: `1px solid ${getRiskColor()}50` }}>
                            <AlertOctagon className="w-6 h-6" style={{ color: getRiskColor() }} />
                            <span className="font-bold text-lg" style={{ color: getRiskColor() }}>{riskAssessment.level} RISK</span>
                        </div>

                        <div className="flex items-center gap-2 text-[#ff3b5c]">
                            <ShieldAlert className="w-5 h-5" /><span className="font-semibold">🚨 {riskAssessment.status}</span>
                        </div>

                        <div className="mt-6 w-full">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-white/50">AI Confidence</span>
                                <span className="text-[#00d4ff] font-semibold">{riskAssessment.confidence}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full transition-all duration-1000" style={{ width: `${riskAssessment.confidence}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center"><Brain className="w-5 h-5 text-[#a855f7]" /></div>
                            <div><h3 className="font-semibold text-white">Explainable AI</h3><p className="text-sm text-white/50">Why this score?</p></div>
                        </div>

                        <div className="space-y-4">
                            {riskAssessment.reasons.map((reason, index) => (
                                <div key={index} className={`flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 transition-all duration-500 ${showReasons ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <XCircle className="w-5 h-5 text-[#ff3b5c] shrink-0 mt-0.5" /><span className="text-sm text-white/80">{reason}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-[#ff3b5c]/10 border border-[#ff3b5c]/30">
                            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-[#ff3b5c]" /><span className="text-sm font-semibold text-[#ff3b5c]">AI Recommendation</span></div>
                            <p className="text-white font-mono text-sm">{riskAssessment.recommendation.replace('_', ' ')}</p>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button className="btn-primary flex-1 flex items-center justify-center gap-2"><ShieldAlert className="w-4 h-4" />Block Accounts</button>
                            <button className="btn-secondary flex items-center justify-center gap-2 px-4"><CheckCircle2 className="w-4 h-4" />Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RiskScore;
