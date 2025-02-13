// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 페이지 이동을 위한 `useNavigate` 추가
import Navbar from './Navbar';
import '../style/SDashboard.css';

const contractList = [
  {
    id: 'DKI30857',
    route: '[KRPUS] Busan - [USLGB] Long Beach',
    date: '25.02.04',
  },
  {
    id: 'ABC12345',
    route: '[KRPUS] Incheon - [USLGB] Long Beach',
    date: '25.03.10',
  },
  {
    id: 'XYZ98765',
    route: '[KRPUS] Busan - [USLGB] Los Angeles',
    date: '25.04.20',
  },
];

const SDashboard = () => {
  const navigate = useNavigate();

  // ✅ 클릭 시 `CargoStatus` 페이지로 이동
  const handleCargoClick = (cargo) => {
    navigate('/cargo-status', { state: { cargo } }); // ✅ 선택한 화물 정보를 `state`로 전달
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="page-title">대시보드</h1>
        <h2 className="sub-title">계약 화물 리스트</h2>
        <div className="contract-list-container">
          {contractList.map((cargo, index) => (
            <button
              key={index}
              className="contract-item"
              onClick={() => handleCargoClick(cargo)} // ✅ 클릭 시 이동
            >
              화물번호 {cargo.id} ㅣ {cargo.route} ㅣ {cargo.date}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SDashboard;
