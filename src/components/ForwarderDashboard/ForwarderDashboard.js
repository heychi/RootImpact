import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronRight, HiTrash } from 'react-icons/hi';
import Navbar from '../Navbar';
import ForwarderContractList from './ForwarderContractList';
import '../../style/ForwarderDashboard.css';

const ForwarderDashboard = () => {
  const navigate = useNavigate();
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [containers, setContainers] = useState([]);

  const contractData = {
    request: 5,
    inProgress: 3,
    completed: 43,
  };

  const cargoList = [
    {
      id: 'KRUS30243',
      contract: { cost: '500,000원', duration: '2주', weight: '200kg' },
    },
    {
      id: 'VNKR04983',
      contract: { cost: '620,000원', duration: '3주', weight: '250kg' },
    },
    {
      id: 'CHKR03932',
      contract: { cost: '700,000원', duration: '1주', weight: '180kg' },
    },
  ];

  useEffect(() => {
    const storedContainers =
      JSON.parse(localStorage.getItem('containers')) || [];
    setContainers(storedContainers);
  }, []);

  const handleCargoClick = (cargoId) => {
    setSelectedCargo(cargoList.find((cargo) => cargo.id === cargoId));
  };

  const handleOpenContractList = () => {
    if (!selectedCargo) {
      alert('화물을 선택해주세요.');
      return;
    }
    setIsContractModalOpen(true);
  };

  const handleContractNavigation = () =>
    navigate('/forwarder-dashboard/contract-management');
  const handleSpaceRegistration = () => navigate('/space-registration');

  const handleEditContainer = (container) =>
    navigate('/space-registration', { state: { container } });

  const handleDeleteContainer = (containerNumber) => {
    if (window.confirm('이 컨테이너를 삭제하시겠습니까?')) {
      const updatedContainers = containers.filter(
        (container) => container.containerNumber !== containerNumber
      );
      setContainers(updatedContainers);
      localStorage.setItem('containers', JSON.stringify(updatedContainers));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="fd-dashboard-container">
        {/* 계약 정보 요약 */}
        <div className="fd-contract-summary">
          {['계약 요청', '진행 중', '완료'].map((label, index) => (
            <div className="fd-summary-box" key={index}>
              <span className="fd-summary-label">{label}</span>
              <span
                className={`fd-summary-value ${
                  index === 1 ? 'fd-in-progress' : 'fd-completed'
                }`}
              >
                {contractData[Object.keys(contractData)[index]]}
              </span>
            </div>
          ))}
        </div>

        {/* 주요 기능 섹션 */}
        <div className="fd-tasks-container">
          {/* ✅ 실시간 계약, 화물 추적 */}
          <div className="fd-task-container">
            <div className="fd-task-header">
              <button
                className="fd-task-title"
                onClick={handleOpenContractList}
              >
                실시간 계약, 화물 추적{' '}
                <HiChevronRight className="fd-arrow-icon" />
              </button>
            </div>
            <div className="fd-task-box">
              <ul>
                {cargoList.map((cargo) => (
                  <li
                    key={cargo.id}
                    className={`fd-cargo-item ${
                      selectedCargo?.id === cargo.id ? 'fd-highlight' : ''
                    }`}
                    onClick={() => handleCargoClick(cargo.id)}
                  >
                    • {cargo.id}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ 계약 내역 및 문서 관리 */}
          <div className="fd-task-container">
            <div className="fd-task-header">
              <button
                className="fd-task-title"
                onClick={handleContractNavigation}
              >
                계약 내역 및 문서 관리{' '}
                <HiChevronRight className="fd-arrow-icon" />
              </button>
            </div>
            <div className="fd-task-box">
              <ul>
                <li className="fd-document-item">물류서비스계약서</li>
                <li className="fd-document-item">
                  선하증권 (Bill of Lading, B/L)
                </li>
                <li className="fd-document-item">
                  수출 신고서 (Export Declaration)
                </li>
              </ul>
            </div>
          </div>

          {/* ✅ 컨테이너 남는 공간 등록 */}
          <div className="fd-task-container">
            <div className="fd-task-header">
              <button
                className="fd-task-title"
                onClick={handleSpaceRegistration}
              >
                컨테이너 남는 공간 등록{' '}
                <HiChevronRight className="fd-arrow-icon" />
              </button>
            </div>
            <div className="fd-task-box">
              <ul>
                {containers.length === 0 ? (
                  <li className="fd-document-item">
                    등록된 컨테이너가 없습니다.
                  </li>
                ) : (
                  containers.map((container, index) => (
                    <li
                      key={index}
                      className="fd-document-item fd-container-item"
                    >
                      <span onClick={() => handleEditContainer(container)}>
                        {container.containerNumber} (운임:{' '}
                        {container.freightCost} 원)
                      </span>
                      <button
                        className="fd-delete-button"
                        onClick={() =>
                          handleDeleteContainer(container.containerNumber)
                        }
                      >
                        <HiTrash className="fd-trash-icon" />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isContractModalOpen && selectedCargo && (
        <ForwarderContractList
          cargo={selectedCargo}
          onClose={() => setIsContractModalOpen(false)}
          onConfirm={() =>
            navigate('/forwarder-dashboard/ForwarderMonitoring', {
              state: { cargo: selectedCargo },
            })
          }
        />
      )}
    </div>
  );
};

export default ForwarderDashboard;
