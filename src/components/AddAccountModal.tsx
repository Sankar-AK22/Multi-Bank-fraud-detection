import { useState } from 'react';
import { X, Upload, Plus, FileText, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import Papa from 'papaparse';
import { fraudEngine } from '../services/FraudEngine';

interface AddAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddAccountModal = ({ isOpen, onClose }: AddAccountModalProps) => {
    const [activeTab, setActiveTab] = useState<'SINGLE' | 'CSV'>('SINGLE');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        riskScore: '10',
        role: 'NORMAL'
    });
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'IDLE' | 'PARSING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [statusMsg, setStatusMsg] = useState('');

    if (!isOpen) return null;

    const handleSingleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate push to DB + Local Engine update
        fraudEngine.addAccount({
            accountId: crypto.randomUUID(),
            name: formData.name,
            age: parseInt(formData.age),
            kycLevel: 'MEDIUM',
            riskScore: parseInt(formData.riskScore),
            creationDate: new Date().toISOString(),
            role: formData.role as any,
            deviceId: `DEV_${Math.random().toString(36).substr(2, 9)}`
        });
        setUploadStatus('SUCCESS');
        setStatusMsg(`Account for ${formData.name} added successfully!`);
        setTimeout(() => {
            onClose();
            setUploadStatus('IDLE');
            setStatusMsg('');
        }, 1500);
    };

    const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setCsvFile(file);
    };

    const parseCsv = () => {
        if (!csvFile) return;
        setUploadStatus('PARSING');

        Papa.parse(csvFile, {
            header: true,
            complete: (results) => {
                console.log('Parsed CSV:', results.data);
                let count = 0;
                // @ts-ignore
                results.data.forEach((row: any) => {
                    if (row.name) { // Basic validation
                        fraudEngine.addAccount({
                            accountId: crypto.randomUUID(),
                            name: row.name,
                            age: parseInt(row.age) || 30,
                            kycLevel: (row.kyc || 'MEDIUM').toUpperCase() as any,
                            riskScore: parseInt(row.riskScore) || 10,
                            creationDate: new Date().toISOString(),
                            role: (row.role || 'NORMAL').toUpperCase() as any,
                            deviceId: `DEV_CSV_${Math.random().toString(36).substr(2, 9)}`
                        });
                        count++;
                    }
                });
                setUploadStatus('SUCCESS');
                setStatusMsg(`Successfully imported ${count} accounts.`);
                setTimeout(() => {
                    onClose();
                    setUploadStatus('IDLE');
                }, 2000);
            },
            error: (error) => {
                setUploadStatus('ERROR');
                setStatusMsg('Failed to parse CSV: ' + error.message);
            }
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden scale-100 animate-scale-up">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-blue-400" /> Add New Accounts
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex p-4 gap-2">
                    <button
                        onClick={() => setActiveTab('SINGLE')}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'SINGLE' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        Single Entry
                    </button>
                    <button
                        onClick={() => setActiveTab('CSV')}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'CSV' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        Bulk Upload (CSV)
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === 'SINGLE' ? (
                        <form onSubmit={handleSingleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Account Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="e.g. Rahul Sharma"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Age</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        value={formData.age}
                                        onChange={e => setFormData({ ...formData, age: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Risk Score (0-100)</label>
                                    <input
                                        type="number"
                                        max="100"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        value={formData.riskScore}
                                        onChange={e => setFormData({ ...formData, riskScore: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Account Role</label>
                                <select
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="NORMAL">Normal User</option>
                                    <option value="MULE">Potential Mule (High Risk)</option>
                                    <option value="KINGPIN">Kingpin / Target</option>
                                    <option value="VICTIM">Victim</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-white shadow-lg shadow-blue-600/20 hover:scale-[1.02] transition-transform">
                                Add Account
                            </button>

                            {uploadStatus === 'SUCCESS' && (
                                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 p-3 rounded-lg animate-fade-in">
                                    <CheckCircle className="w-4 h-4" /> {statusMsg}
                                </div>
                            )}
                        </form>
                    ) : (
                        <div className="space-y-6 text-center">
                            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-colors bg-slate-900/50 relative">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="p-4 rounded-full bg-blue-500/10 text-blue-400">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Click to upload CSV</p>
                                        <p className="text-xs text-slate-500 mt-1">Columns: name, age, role, riskScore</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleCsvUpload}
                                        className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                                    />
                                </div>
                            </div>

                            {csvFile && (
                                <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-emerald-400" />
                                        <span className="text-sm text-slate-300">{csvFile.name}</span>
                                    </div>
                                    <button onClick={() => setCsvFile(null)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
                                </div>
                            )}

                            <button
                                onClick={parseCsv}
                                disabled={!csvFile || uploadStatus === 'PARSING'}
                                className="w-full py-3 bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl font-bold text-white shadow-lg shadow-blue-600/20 transition-all"
                            >
                                {uploadStatus === 'PARSING' ? 'Processing...' : 'Import Data'}
                            </button>

                            {uploadStatus === 'SUCCESS' && (
                                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 p-3 rounded-lg animate-fade-in justify-center">
                                    <CheckCircle className="w-4 h-4" /> {statusMsg}
                                </div>
                            )}
                            {uploadStatus === 'ERROR' && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg animate-fade-in justify-center">
                                    <AlertCircle className="w-4 h-4" /> {statusMsg}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddAccountModal;
