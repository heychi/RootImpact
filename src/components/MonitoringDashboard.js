// src/components/MonitoringDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'; // 추가된 부분
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

  // Dummy state 및 함수 추가: cargoList, selectedCargo, handleOpenContractList, handleCargoClick
  const [cargoList, setCargoList] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  const [selectedCargo, setSelectedCargo] = useState(null);

  const handleOpenContractList = () => {
    // 실제 모달을 열도록 구현해야 함. 현재는 콘솔 출력으로 대체.
    console.log("실시간 계약 모달 열기");
  };

  const handleCargoClick = (cargoId) => {
    const selected = cargoList.find((cargo) => cargo.id === cargoId);
    setSelectedCargo(selected);
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="map-container">
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

          <div className="additional-tasks-container">
            <div className="task-wrapper">
              <button
                className="task-title"
                onClick={handleOpenContractList}
                disabled={!selectedCargo}
              >
                실시간 계약
              </button>
              <div className="task-box">
                <ul>
                  {cargoList.map((cargo) => (
                    <li
                      key={cargo.id}
                      className={`cargo-item ${selectedCargo?.id === cargo.id ? 'highlight' : ''}`}
                      onClick={() => handleCargoClick(cargo.id)}
                    >
                      • {cargo.id}
                    </li>
                  ))}
                </ul>
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
    </div>
  );
};

export default MonitoringDashboard;
