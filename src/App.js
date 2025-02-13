import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import SignupComplete from './pages/SignupComplete';
import SignupSelectionPage from './pages/SignupSelectionPage';
import LoginPage from './auth/LoginPage';
import ShipperSignup from './auth/ShipperSignup/ShipperSignup';
import ForwarderSignup from './auth/ForwarderSignup/ForwarderSignup';
import ForwarderDashboard from './components/ForwarderDashboard/ForwarderDashboard';
import CargoList from './components/ForwarderDashboard/CargoList';
import ContractManagement from './components/ForwarderDashboard/ContractManagement';
import ForwarderMonitoring from './components/ForwarderDashboard/ForwarderMonitoring';
import ForwarderDetailPage from './components/Forwarder/ForwarderDetail';
import ScrollToTop from './components/ScrollToTop';
import ChatPage from './pages/ChatPage';
import Space from './components/Space';
import SDashboard from './components/SDashboard';
import Navbar from './components/Navbar';
import CargoStatusPage from './components/CargoStatus';

import './App.css'; // ✅ App.css를 불러오기
import './style/SignupSelectionPage.css';
import './style/SignupComplete.css';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop /> {/* ✅ 모든 페이지에서 스크롤 초기화 적용 */}
        {/* ✅ Navbar를 BrowserRouter 내부, Routes 바깥에서 렌더링 */}
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/forwarding-platform"
              element={<ForwarderDetailPage />}
            />{' '}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup-selection" element={<SignupSelectionPage />} />
            <Route path="/signup-complete" element={<SignupComplete />} />
            <Route path="/signup-shipper" element={<ShipperSignup />} />
            <Route path="/forwarder-signup" element={<ForwarderSignup />} />
            <Route path="/signup-forwarder" element={<ForwarderSignup />} />
            <Route path="/cargo-status" element={<CargoStatusPage />} />
            <Route path="/s_dashboard" element={<SDashboard />} />
            <Route
              path="/forwarder-dashboard"
              element={<ForwarderDashboard />}
            />
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
            <Route path="/space-registration" element={<Space />} />{' '}
            
            <Route path="/chat" element={<ChatPage />} />
            {/* 추가된 라우트 */}
            {/* 대시보드는 로그인 후만 접근하도록 수정 가능 */}
            {/* <Route path="/dashboard" element={userType === 'forwarder' ? <ForwarderDashboard /> : <ShipperDashboard />} /> */}
            {/* 기존 자동 이동을 제거 */}
            {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
