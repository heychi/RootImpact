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
import ForwarderDetailPage from './components/ForwarderDetail';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommendation" element={<ForwarderRecommendation />} />
        <Route path="/contract/info" element={<SmartContractInfo />} />
        <Route path="/contract/document" element={<SmartContractDocument />} />
        <Route path="/contract/payment" element={<SmartContractPayment />} />
        <Route path="/contract/complete" element={<SmartContractComplete />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/status" element={<CargoStatus />} />
        <Route path="/dashboard/status/monitoring" element={<MonitoringDashboard />} />
        <Route path="/dashboard/status/document" element={<ContractManagement />} />
        <Route path="/forwarderdetail" element={<ForwarderDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
