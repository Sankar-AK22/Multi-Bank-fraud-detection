import { useEffect, useState } from 'react';
import { ReactFlow, type Node, type Edge, useNodesState, useEdgesState } from '@reactflow/core';
import { Controls } from '@reactflow/controls';
import { Background } from '@reactflow/background';
import '@reactflow/core/dist/style.css';
import '@reactflow/controls/dist/style.css';

import { fraudEngine } from '../services/FraudEngine';
import { RotateCcw, Search, ShieldAlert, Radio, Plus } from 'lucide-react';
import AddAccountModal from '../components/AddAccountModal';

const InvestigationPage = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [isRetracking, setIsRetracking] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [stats, setStats] = useState({ totalAccounts: 0, totalTxns: 0, highRiskCount: 0, muleCount: 0 });

    // Initialize Data
    useEffect(() => {
        fraudEngine.initialize();
        loadGraph();
        setStats(fraudEngine.getStats());
    }, []);

    const loadGraph = () => {
        const data = fraudEngine.getGraphData(500); // Load 500 nodes
        setNodes(data.nodes);
        setEdges(data.edges);
    };

    const handleNodeClick = (_: any, node: Node) => {
        setSelectedNode(node);

        if (isRetracking) {
            // Smart Trace Logic:
            // If KINGPIN -> Trace Upstream (Where did money come from?)
            // If VICTIM -> Trace Downstream (Where did money go?)
            const direction = node.data.role === 'KINGPIN' ? 'UPSTREAM' : 'DOWNSTREAM';
            const trace = fraudEngine.traceAccountFlow(node.id, direction);

            // Highlighting logic:
            setNodes((nds) =>
                nds.map((n) => ({
                    ...n,
                    style: {
                        ...n.style,
                        opacity: trace.nodes.find(tn => tn.id === n.id) ? 1 : 0.2
                    }
                }))
            );
            setEdges((eds) =>
                eds.map((e) => ({
                    ...e,
                    style: {
                        ...e.style,
                        opacity: trace.edges.find(te => te.id === e.id) ? 1 : 0.1,
                        stroke: trace.edges.find(te => te.id === e.id)
                            ? (direction === 'UPSTREAM' ? '#ef4444' : '#3b82f6')
                            : '#333'
                    }
                }))
            );
        }
    };

    const resetView = () => {
        loadGraph();
        setIsRetracking(false);
        setSelectedNode(null);
    };

    const handleAccountSuccess = () => {
        loadGraph(); // Reload graph to show new node
        setStats(fraudEngine.getStats());
    };

    return (
        <div className="h-screen w-full bg-[#020617] relative flex pt-16">

            {/* LEFT SIDEBAR - CONTROLS */}
            <div className="w-80 h-full glass border-r border-white/10 p-6 flex flex-col z-10">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <ShieldAlert className="text-blue-500" /> Investigation Board
                </h2>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-xs text-blue-400">Total Users</div>
                        <div className="text-2xl font-bold text-white">{stats.totalAccounts}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-xs text-red-400">High Risk</div>
                        <div className="text-2xl font-bold text-white">{stats.highRiskCount}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <div className="text-xs text-amber-400">Mules Detected</div>
                        <div className="text-2xl font-bold text-white">{stats.muleCount}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-xs text-green-400">Transactions</div>
                        <div className="text-2xl font-bold text-white">{stats.totalTxns}</div>
                    </div>
                </div>

                {/* Tools */}
                <div className="space-y-4">
                    <button onClick={() => { fraudEngine.initialize(); loadGraph(); }} className="w-full btn-secondary flex items-center justify-center gap-2">
                        <Radio className="w-4 h-4" /> Live Data Feed
                    </button>

                    <button
                        onClick={() => setIsRetracking(!isRetracking)}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${isRetracking ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        <Search className="w-4 h-4" /> {isRetracking ? 'Retracking Active' : 'Start Retracking'}
                    </button>

                    <button onClick={resetView} className="w-full btn-secondary flex items-center justify-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Reset View
                    </button>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="w-full py-3 bg-blue-600 rounded-xl font-bold text-white shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Account (CSV)
                    </button>
                </div>

                {/* Selected Node Details */}
                {selectedNode && (
                    <div className="mt-8 p-4 rounded-xl glass border border-white/10 animate-fade-in">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Selected Entity</h3>
                        <div className="text-lg font-bold text-white mb-1">{selectedNode.data.label}</div>
                        <div className={`text-xs font-mono px-2 py-1 rounded inline-block mb-3 ${selectedNode.data.role === 'KINGPIN' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {selectedNode.data.role}
                        </div>
                        <div className="space-y-2 text-sm text-slate-400">
                            <div className="flex justify-between">
                                <span>Risk Score:</span>
                                <span className={selectedNode.data.riskScore > 50 ? 'text-red-400' : 'text-green-400'}>{selectedNode.data.riskScore}/100</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ID:</span>
                                <span className="font-mono text-xs">{selectedNode.id.substring(0, 8)}...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT - GRAPH CANVAS */}
            <div className="flex-1 h-full relative">
                <div className="absolute top-4 right-4 z-10 glass px-4 py-2 rounded-full flex items-center gap-3">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-600"></div><span className="text-xs text-white">Kingpin</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span className="text-xs text-white">Mule</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-xs text-white">Normal</span></div>
                </div>

                {/* Floating Add Button */}
                <div className="absolute bottom-6 right-6 z-20">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="p-4 bg-blue-600 rounded-full text-white shadow-xl shadow-blue-600/30 hover:scale-110 transition-transform group"
                        title="Add Account / Import CSV"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={handleNodeClick}
                    fitView
                    className="bg-slate-950"
                >
                    <Background color="#1e293b" gap={20} />
                    <Controls className="bg-slate-800 border-slate-700 text-white" />
                </ReactFlow>
            </div>

            <AddAccountModal
                isOpen={showAddModal}
                onClose={() => { setShowAddModal(false); handleAccountSuccess(); }}
            />
        </div>
    );
};

export default InvestigationPage;
