import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignupComplete from './pages/SignupComplete';
import SignupSelectionPage from './pages/SignupSelectionPage';
import LoginPage from './pages/LoginPage';
import ShipperSignup from './components/ShipperSignup';
import ForwarderSignup from './components/ForwarderSignup';
import ForwarderDashboard from './components/ForwarderDashboard';
import CargoList from './components/CargoList';
import ContractManagement from './components/ContractManagement';
import ForwarderMonitoring from './components/ForwarderMonitoring';
import ForwarderDetailPage from './components/ForwarderDetail';
import ScrollToTop from './components/ScrollToTop';
import ChatPage from './pages/ChatPage';
import Space from './components/Space';
import Navbar from './components/Navbar';
import CargoStatusPage from './components/CargoStatus';

import './App.css';
import './styles/SignupSelectionPage.css';
import './styles/SignupComplete.css';
import './styles/CargoList.css';
import './styles/ContractManagement.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/forwarding-platform"
            element={<ForwarderDetailPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup-selection" element={<SignupSelectionPage />} />
          <Route path="/signup-complete" element={<SignupComplete />} />
          <Route path="/signup-shipper" element={<ShipperSignup />} />
          <Route path="/signup-forwarder" element={<ForwarderSignup />} />
          <Route path="/cargo-status" element={<CargoStatusPage />} />
          <Route path="/forwarder-dashboard" element={<ForwarderDashboard />} />
          <Route path="/forwarder-dashboard/cargo" element={<CargoList />} />
          <Route
            path="/forwarder-dashboard/contract"
            element={<ContractManagement />}
          />
          <Route
            path="/forwarder-dashboard/ForwarderMonitoring"
            element={<ForwarderMonitoring />}
          />
          <Route path="/dashboard" element={<ForwarderDashboard />} />
          <Route
            path="/forwarder-dashboard/contract-management"
            element={<ContractManagement />}
          />
          <Route path="/space-registration" element={<Space />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
