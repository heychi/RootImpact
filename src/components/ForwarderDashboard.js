import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronRight, HiTrash } from 'react-icons/hi';
import Navbar from './Navbar';
import ForwarderContractList from './ForwarderContractList';
import '../style/ForwarderDashboard.css';

const ForwarderDashboard = () => {
  const navigate = useNavigate();
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [containers, setContainers] = useState([]);
  const [contractData, setContractData] = useState({
    request: 0,
    inProgress: 0,
    completed: 0,
  });
  const [cargoList, setCargoList] = useState([]);

  useEffect(() => {
    fetch('/api/contract/status?contractStatus=REQUESTED')
      .then((res) => res.json())
      .then((data) => {
        setContractData({
          request: data.length,
          inProgress: 0,
          completed: 0,
        });
      });

    fetch('/api/contract/status?contractStatus=DELIVERING')
      .then((res) => res.json())
      .then((data) => {
        setContractData((prev) => ({ ...prev, inProgress: data.length }));
      });

    fetch('/api/contract/status?contractStatus=COMPLETED')
      .then((res) => res.json())
      .then((data) => {
        setContractData((prev) => ({ ...prev, completed: data.length }));
      });

    fetch('/api/contract/shipper')
      .then((res) => res.json())
      .then((data) => setCargoList(data));
  }, []);

  const handleCargoClick = (cargoId) => {
    setSelectedCargo(cargoList.find((cargo) => cargo.contractId === cargoId));
  };

  return (
    <div>
      <Navbar />
      <div className="forwarder-dashboard-container">
        <div className="contract-summary">
          {['계약 요청', '진행 중', '완료'].map((label, index) => (
            <div className="summary-box" key={index}>
              <span className="summary-label">{label}</span>
              <span className="summary-value">
                {contractData[Object.keys(contractData)[index]]}
              </span>
            </div>
          ))}
        </div>

        <div className="additional-tasks-container">
          <div className="task-wrapper">
            <button
              className="task-title"
              onClick={() => setIsContractModalOpen(true)}
            >
              <span>실시간 계약, 화물 추적</span>
              <HiChevronRight className="arrow-icon" />
            </button>
            <div className="task-box">
              <ul>
                {cargoList.map((cargo) => (
                  <li
                    key={cargo.contractId}

                    className={`cargo-item ${
                      selectedCargo?.contractId === cargo.contractId
                        ? 'highlight'
                        : ''
                    }`}

                    onClick={() => handleCargoClick(cargo.contractId)}
                  >
                    • {cargo.contractId}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isContractModalOpen && selectedCargo && (
        <ForwarderContractList
          cargo={selectedCargo}
          onClose={() => setIsContractModalOpen(false)}
        />
      )}
    </div>
  );

};

export default ForwarderDashboard;
