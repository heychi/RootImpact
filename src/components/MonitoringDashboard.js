// src/components/MonitoringDash
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import Navbar from './Navbar';
import ForwarderContractList from './ForwarderContractList'; // 실시간 계약 모달 (추후 구현)
import '../styles/ForwarderDashboard.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const MonitoringDashboard = () => {
  const navigate = useNavigate();
  const shipCoordinates = [129.0, 37.5];

  const processSteps = [
    '선적준비',
    '항해중',
    '입항 및 통관',
    '도착지 운송',
    '운송 완료',
  ];
  const currentStage = 3;

  const cargoInfo = {
    cargoNumber: 'DKI30857',
    departure: '[KRPUS] Busan',
    destination: '[USLGB] Long Beach',
    currentCoordinates: '37.5, 129.0',
    cargoDetails: '20FT 일반컨테이너 X 5',
    freightCost: '₩1,200,000',
    ETD: '2025-02-04 08:00',
    ETA: '2025-02-20 18:00',
  };

  // X 버튼 클릭 시 포워더 대시보드로 이동
  const handleClose = () => {
    navigate('/forwarder-dashboard');
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="map-container">
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
          <ComposableMap
            projection="geoEqualEarth"
            width={1440}
            height={980}
            projectionConfig={{
              center: shipCoordinates,
              scale: 1000,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                  />
                ))
              }
            </Geographies>
            <Marker coordinates={shipCoordinates}>
              <text textAnchor="middle" y={-10} style={{ fontSize: '32px' }}>
                ⛴
              </text>
            </Marker>
          </ComposableMap>

          <div className="process-bar">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <span className={index < currentStage ? 'active' : ''}>
                  {step}
                </span>
                {index < processSteps.length - 1 && (
                  <div className="process-separator" />
                )}
              </div>
            ))}
          </div>

          <div className="info-window-label">실시간 화물 모니터링</div>

          <div className="info-window">
            {/* ✅ X 버튼 추가 */}

            {/* 화물번호 영역 */}
            <div className="info-header">
              <p>
                <strong>화물번호</strong> {cargoInfo.cargoNumber}
              </p>
            </div>

            {/* 상단 정보 (POL, 현재 경위도, POD) */}
            <div className="info-top">
              <span className="pol">[POL]</span>
              <span className="current-coords">
                {cargoInfo.currentCoordinates}
              </span>
              <span className="pod">[POD]</span>
            </div>

            {/* 진행바 */}
            <div className="progress-bar-info">
              <div className="progress-filled" style={{ width: '50%' }}></div>
            </div>

            {/* 진행바 */}
            <div className="progress-bar-info">
              <div className="progress-filled" style={{ width: '50%' }}></div>
            </div>

            {/* 출발지와 목적지 영역 */}
            <div className="info-bottom">
              <span className="departure">{cargoInfo.departure}</span>
              <span className="destination">{cargoInfo.destination}</span>
            </div>

            {/* 나머지 상세 정보 */}
            <div className="info-content">
              <p>
                <strong>화물 적재물 정보</strong> {cargoInfo.cargoDetails}
              </p>
              <p>
                <strong>운임비 정보</strong> {cargoInfo.freightCost}
              </p>
            </div>

            {/* ETD/ETA 영역 */}
            <div className="etd-eta">
              <p>
                <strong>[ETD]:</strong> {cargoInfo.ETD}
              </p>
              <p>
                <strong>[ETA]:</strong> {cargoInfo.ETA}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
