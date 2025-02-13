import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronRight, HiTrash } from 'react-icons/hi'; // ✅ 화살표 & 삭제 아이콘 추가
import Navbar from './Navbar';
import ForwarderContractList from './ForwarderContractList';
import '../style/ForwarderDashboard.css';
s;
const ForwarderDashboard = () => {
  const navigate = useNavigate();
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [containers, setContainers] = useState([]);

  const contractData = {
    request: 5,
    inProgress: 3,
    completed: 0,
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

  const handleContractNavigation = () => {
    navigate('/forwarder-dashboard/contract-management');
  };

  const handleSpaceRegistration = () => {

    navigate('/dashboard/forwarder/spaceenroll'); // `Space.js`로 이동

  };

  const handleEditContainer = (container) => {
    navigate('/space-registration', { state: { container } });
  };

  // ✅ 컨테이너 삭제 기능 추가
  const handleDeleteContainer = (containerNumber) => {
    if (window.confirm('이 컨테이너를 삭제하시겠습니까?')) {
      const updatedContainers = containers.filter(
        (container) => container.containerNumber !== containerNumber
      );
      setContainers(updatedContainers);
      localStorage.setItem('containers', JSON.stringify(updatedContainers)); // ✅ `localStorage`에서도 삭제
    }
  };

  return (
    <div>
      <Navbar />
      <div className="forwarder-dashboard-container">
        <div className="contract-summary">
          <div className="summary-box">
            <span className="summary-label">계약 요청</span>
            <span className="summary-value">{contractData.request}</span>
          </div>
          <div className="summary-box">
            <span className="summary-label">진행 중</span>
            <span className="summary-value in-progress">
              {contractData.inProgress}
            </span>
          </div>
          <div className="summary-box">
            <span className="summary-label">완료</span>
            <span className="summary-value completed">
              {contractData.completed}
            </span>
          </div>
        </div>

        <div className="additional-tasks-container">
          {/* ✅ 실시간 계약, 화물 추적 버튼 */}
          <div className="task-wrapper">
            <button className="task-title" onClick={handleOpenContractList}>
              <span>실시간 계약, 화물 추적</span>
              <HiChevronRight className="arrow-icon" />
            </button>
            <div className="task-box">
              <ul>
                {cargoList.map((cargo) => (
                  <li
                    key={cargo.id}
                    className={`cargo-item ${selectedCargo?.id === cargo.id ? 'highlight' : ''
                      }`}
                    onClick={() => handleCargoClick(cargo.id)}
                  >
                    • {cargo.id}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ 계약 내역 및 문서 관리 버튼 */}
          <div className="task-wrapper">
            <button className="task-title" onClick={handleContractNavigation}>
              <span>계약 내역 및 문서 관리</span>
              <HiChevronRight className="arrow-icon" />
            </button>
            <div className="task-box">
              <ul>
                <li className="document-item">물류서비스계약서</li>
                <li className="document-item">
                  선하증권 (Bill of Lading, B/L)
                </li>
                <li className="document-item">
                  수출 신고서 (Export Declaration)
                </li>
              </ul>
            </div>
          </div>

          {/* ✅ 컨테이너 남는 공간 등록 */}
          <div className="task-wrapper">
            <button className="task-title" onClick={handleSpaceRegistration}>
              <span>컨테이너 남는 공간 등록</span>
              <HiChevronRight className="arrow-icon" />
            </button>
            <div className="task-box">
              <ul>
                {containers.length === 0 ? (
                  <li className="document-item">등록된 컨테이너가 없습니다.</li>
                ) : (
                  containers.map((container, index) => (
                    <li key={index} className="document-item container-item">
                      <span onClick={() => handleEditContainer(container)}>
                        {container.containerNumber} (운임:{' '}
                        {container.freightCost} 원)
                      </span>
                      {/* ✅ 삭제 버튼 추가 */}
                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDeleteContainer(container.containerNumber)
                        }
                      >
                        <HiTrash className="trash-icon" />
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
          onConfirm={() => {
            navigate('/forwarder-dashboard/ForwarderMonitoring', {
              state: { cargo: selectedCargo },
            });
          }}
        />
      )}
    </div>
  );
};

export default ForwarderDashboard;
