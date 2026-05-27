import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioV2 from './pages/PortfolioV2';
import CVPage from './pages/CVPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioV2 />} />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </BrowserRouter>
  );
}
