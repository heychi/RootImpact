import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import Navbar from './Navbar';
import '../styles/ForwarderMonitoring.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const ForwarderMonitoring = () => {
  const shipCoordinates = [-120.0, 35.0];

  const processSteps = [
    '선적준비',
    '항해중',
    '입항 및 통관',
    '도착지 운송',
    '운송 완료',
  ];
  const currentStage = 1;

  const cargoInfo = {
    cargoNumber: 'DKI30857',
    departure: '[KRPUS] Busan',
    destination: '[USLGB] Long Beach',
    currentCoordinates: '41°04′56.2″N 174°56′12.2″W',
    cargoDetails: '20FT 일반컨테이너 X 5',
    freightCost: 'KRW 16,895,800',
    ETD: '2025.02.04 18:00',
    ETA: '2025.02.13 21:00',
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="map-container">
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
            <Marker coordinates={[-118.2, 33.7]}>
              <text textAnchor="middle" y={-10} style={{ fontSize: '32px' }}>
                ⛴
              </text>
            </Marker>
          </ComposableMap>

          <div className="process-bar">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`process-step ${index <= currentStage ? 'active' : ''
                  }`}
              >
                {step}
                {index < processSteps.length - 1 && (
                  <div className="process-separator" />
                )}
              </div>
            ))}
          </div>

          <div className="info-window-label">실시간 화물 모니터링</div>

          <div className="info-window">
            <div className="info-content">
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
                <strong>현재 위치:</strong> {cargoInfo.currentCoordinates}
              </p>
              <p>
                <strong>화물 정보:</strong> {cargoInfo.cargoDetails}
              </p>
              <p>
                <strong>운임비:</strong> {cargoInfo.freightCost}
              </p>
            </div>
            <div className="etd-eta">
              <p>
                <strong>ETD:</strong> {cargoInfo.ETD}
              </p>
              <p>
                <strong>ETA:</strong> {cargoInfo.ETA}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForwarderMonitoring;
