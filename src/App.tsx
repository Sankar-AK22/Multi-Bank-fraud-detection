import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react'; // Added Suspense, lazy
import { DetectionProvider } from './context/DetectionContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BanksPage from './pages/BanksPage';
import TransactionsPage from './pages/TransactionsPage';
import IntelligencePage from './pages/IntelligencePage';
import RiskPage from './pages/RiskPage';
import WorkflowPage from './pages/WorkflowPage';

// Lazy load the heavy investigation graph component
const InvestigationPage = lazy(() => import('./pages/InvestigationPage'));

function App() {
  return (
    <BrowserRouter>
      <DetectionProvider>
        <div className="min-h-screen bg-[#0a0e1a]">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/banks" element={<BanksPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/intelligence" element={<IntelligencePage />} />
            <Route path="/risk" element={<RiskPage />} />
            <Route path="/workflow" element={<WorkflowPage />} />
            {/* Wrap in Suspense for safety */}
            <Route path="/investigation" element={
              <Suspense fallback={
                <div className="h-screen w-full flex items-center justify-center bg-[#0a0e1a] text-blue-400">
                  Loading Forensic Engine...
                </div>
              }>
                <InvestigationPage />
              </Suspense>
            } />
          </Routes>
          <Footer />
        </div>
      </DetectionProvider>
    </BrowserRouter>
  );
}

export default App;
