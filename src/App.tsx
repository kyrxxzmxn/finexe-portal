import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerPortal from './pages/CustomerPortal';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg', '#0A0A0A');
    root.style.setProperty('--card', '#191919');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerPortal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
