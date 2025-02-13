import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/CargoList.css';

const CargoList = () => {
  const navigate = useNavigate();

  const cargoItems = [
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

  return (
    <div className="cargo-list-container">
      <h2 className="list-title">계약 화물 리스트</h2>
      <div className="cargo-items">
        {cargoItems.map((cargo, index) => (
          <button
            key={index}
            className="cargo-item"
            onClick={() => navigate('/forwarder-dashboard/monitoring')}
          >
            화물번호 {cargo.id} ㅣ {cargo.route} ㅣ {cargo.date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CargoList;
