import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DocumentProvider } from './context/DocumentContext';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import EWasteManagement from './pages/EWasteManagement';
import BatteryRules from './pages/BatteryRules';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <DocumentProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/e-waste" element={<EWasteManagement />} />
              <Route path="/battery-rules" element={<BatteryRules />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </DocumentProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
