import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BanksPage from './pages/BanksPage';
import TransactionsPage from './pages/TransactionsPage';
import IntelligencePage from './pages/IntelligencePage';
import RiskPage from './pages/RiskPage';
import WorkflowPage from './pages/WorkflowPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0e1a]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/banks" element={<BanksPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/risk" element={<RiskPage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
