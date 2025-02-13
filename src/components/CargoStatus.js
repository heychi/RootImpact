// src/components/CargoStatusPage.js
import { useNavigate } from 'react-router-dom';
import { FiChevronRight, FiX } from 'react-icons/fi'; // ✅ X 버튼 추가
import Navbar from './Navbar';
import '../style/CargoStatus.css';

const CargoStatusPage = () => {
  const navigate = useNavigate();

  // ✅ 현재 진행 상태 (3 = 운송 중, 1~2는 운송 준비)
  const steps = ['화물 등록', '계약 완료', '운송 중', '도착 완료'];
  const activeStep = 3; // 🔹 현재 운송 단계 (3 = 운송 중)

  // ✅ 실시간 화물 모니터링 단계
  const monitoringSteps = [
    '선적준비',
    '항해중',
    '입항 및 통관',
    '도착지 운송',
    '운송완료',
  ];
  const activeMonitoringStep = 2; // 🔹 현재 진행 단계 (예: 항해중)

  // ✅ 계약 문서 단계
  const documentSteps = [
    '물류서비스계약서',
    '선하증권 (Bill of Lading, B/L)',
    '수출 신고서 (Export Declaration)',
  ];

  // ✅ 실시간 화물 모니터링 클릭 핸들러
  const handleMonitoringClick = () => {
    if (activeStep !== 3) {
      alert('현재는 운송 준비 중에 있습니다.');
      return;
    }
    navigate('/forwarder-monitoring');
  };

  return (
    <div>
      <Navbar />
      <div className="cargo-status-page-container">
        {/* ✅ X 버튼 (이전 페이지로 이동) */}
        <button className="close-button" onClick={() => navigate(-1)}>
          <FiX />
        </button>

        {/* ✅ 진행 바 */}
        <div className="cargo-status-bar">
          {steps.map((step, index) => (
            <div key={index} className="status-step">
              <span className={activeStep === index + 1 ? 'active' : ''}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <span className="step-separator">{'>'}</span>
              )}
            </div>
          ))}
        </div>

        {/* ✅ 두 개의 박스로 구성 */}
        <div className="additional-tasks-container">
          {/* ✅ 실시간 화물 모니터링 박스 */}
          <div className="task-wrapper">
            <button
              className="task-title"
              onClick={handleMonitoringClick} // ✅ 운송 중일 때만 이동
            >
              실시간 화물 모니터링 <FiChevronRight />
            </button>
            <div className="task-box">
              {monitoringSteps.map((item, idx) => (
                <div
                  key={idx}
                  className="monitoring-item"
                  style={{
                    color:
                      activeMonitoringStep === idx + 1 ? '#00B8FF' : '#969696',
                    fontWeight:
                      activeMonitoringStep === idx + 1 ? 'bold' : 'normal',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ✅ 계약 내역 및 문서 관리 박스 */}
          <div className="task-wrapper">
            <button
              className="task-title"
              onClick={() => navigate('/contract-management')} // ✅ 클릭 시 이동
            >
              계약 내역 및 문서 관리 <FiChevronRight />
            </button>
            <div className="task-box">
              {documentSteps.map((item, idx) => (
                <div key={idx} className="document-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoStatusPage;
