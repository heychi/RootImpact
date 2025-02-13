import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import './App.css';
import Home from './pages/Home';
import IndexPage from './pages/Index';
import ForwarderRecommendation from "./components/ForwarderRecommendation";
import SmartContractInfo from "./components/SmartContractInfo";
import SmartContractDocument from "./components/SmartContractDocument";
import SmartContractPayment from "./components/SmartContractPayment";
import SmartContractComplete from "./components/SmartContractComplete";
import Dashboard from "./components/Dashboard";
import CargoStatus from "./components/CargoStatus";
import MonitoringDashboard from "./components/MonitoringDashboard";
import ContractManagement from "./components/DocumentDashboard";
import ForwarderDashboard from "./components/ForwarderDashboard";
import ForwarderDetailPage from './components/ForwarderDetail';
import ForwarderContractList from './components/ForwarderContractList';
import ShipperSignup from './components/ShipperSignup';
import ForwarderSignup from './components/ForwarderSignup';
import SignupSelectionPage from './pages/SignupSelectionPage';
import SignupComplete from './pages/SignupComplete';
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage';
import ForwarderMonitoring from './components/ForwarderMonitoring';
import Space from './components/Space';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content"></div>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/enroll" element={<SignupSelectionPage />} />
        <Route path="/account/enroll/owner" element={<ShipperSignup />} />
        <Route path="/account/enroll/forwarder" element={<ForwarderSignup />} />
        <Route path="/account/enroll/complete" element={<SignupComplete />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommendation" element={<ForwarderRecommendation />} />
        <Route path="/contract/info" element={<SmartContractInfo />} />
        <Route path="/contract/document" element={<SmartContractDocument />} />
        <Route path="/contract/payment" element={<SmartContractPayment />} />
        <Route path="/contract/complete" element={<SmartContractComplete />} />
        <Route path="/dashboard/owner" element={<Dashboard />} />
        <Route path="/dashboard/owner/status" element={<CargoStatus />} />
        <Route path="/dashboard/owner/status/monitoring" element={<MonitoringDashboard />} />
        <Route path="/dashboard/owner/status/document" element={<ContractManagement />} />
        <Route path="/dashboard/owner/status/chat" element={<ChatPage />} />
        <Route path="/dashboard/forwarder" element={<ForwarderDashboard />} />
        <Route path="/dashboard/forwarder/monitoring" element={<ForwarderMonitoring />} />
        <Route path="/dashboard/forwarder/document" element={<ForwarderContractList />} />
        <Route path="/dashboard/forwarder/spaceenroll" element={<Space />} />
        <Route path="/forwarder" element={<ForwarderDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
