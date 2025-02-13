import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import Navbar from '../Navbar';
import '../../style/ForwarderMonitoring.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const ForwarderMonitoring = () => {
  const [cargoInfo, setCargoInfo] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // 🚀 API 호출: 실시간 화물 상태 가져오기
    const fetchCargoData = async () => {
      try {
        const response = await fetch('/api/cargo/status');
        const data = await response.json();
        setCargoInfo(data);
        updateProgressStage(data.cargoStatus);
      } catch (error) {
        console.error('Error fetching cargo data:', error);
      }
    };

    // 🚀 일정 시간 간격마다 업데이트 (10초마다 실행)
    fetchCargoData();
    const interval = setInterval(fetchCargoData, 10000);

    return () => clearInterval(interval);
  }, []);

  // 🚀 화물 상태에 따른 진행 단계 업데이트
  const updateProgressStage = (status) => {
    const statusMap = {
      LOADING_PREPARED: 0,
      SAILING: 1,
      CUSTOMS_CLEARANCE: 2,
      ON_ROAD: 3,
      DELIVERED: 4,
    };
    setCurrentStage(statusMap[status] || 0);
  };

  if (!cargoInfo) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="monitoring-container">
        {/* 🌍 지도 표시 */}
        <ComposableMap projection="geoEqualEarth" width={1440} height={700}>
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

          {/* 🚢 화물 위치 */}
          <Marker coordinates={cargoInfo.currentCoordinates}>
            <text textAnchor="middle" y={-10} style={{ fontSize: '32px' }}>
              ⛴
            </text>
          </Marker>

          {/* 🏁 출발지 위치 */}
          <Marker coordinates={cargoInfo.departureCoordinates}>
            <circle r={6} fill="blue" />
          </Marker>

          {/* 🎯 도착지 위치 */}
          <Marker coordinates={cargoInfo.destinationCoordinates}>
            <circle r={6} fill="red" />
          </Marker>
        </ComposableMap>

        {/* 📊 진행 상태 바 */}
        <div className="progress-bar">
          {[
            '선적준비',
            '항해중',
            '입항 및 통관',
            '도착지 운송',
            '운송 완료',
          ].map((step, index) => (
            <div
              key={index}
              className={`progress-step ${
                index <= currentStage ? 'active' : ''
              }`}
            >
              {step}
              {index < 4 && <div className="progress-separator" />}
            </div>
          ))}
        </div>

        {/* ℹ️ 화물 상세 정보 */}
        <div className="info-window">
          <h2>실시간 화물 모니터링</h2>
          <p>
            <strong>화물번호:</strong> {cargoInfo.cargoNumber}
          </p>
          <p>
            <strong>출발지:</strong> {cargoInfo.departure}
          </p>
          <p>
            <strong>목적지:</strong> {cargoInfo.destination}
          </p>
          <p>
            <strong>현재 위치:</strong>{' '}
            {cargoInfo.currentCoordinates.join(', ')}
          </p>
          <p>
            <strong>화물 정보:</strong> {cargoInfo.cargoDetails}
          </p>
          <p>
            <strong>운임비:</strong> {cargoInfo.freightCost}
          </p>
          <p>
            <strong>ETD:</strong> {cargoInfo.ETD}
          </p>
          <p>
            <strong>ETA:</strong> {cargoInfo.ETA}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForwarderMonitoring;
