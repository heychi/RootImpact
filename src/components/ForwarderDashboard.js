import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../style/ForwarderDashboard.css';

const ForwarderDashboard = () => {
  const navigate = useNavigate();

  // 계약 상태 데이터
  const contractData = {
    request: 5,
    inProgress: 3,
    completed: 43,
  };

  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedCargo, setSelectedCargo] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const handleCargoClick = (cargo) => {
    setSelectedCargo(cargo);
  };

  // ✅ 계약 내역 버튼 클릭 시 동작
  const handleContractNavigation = () => {
    if (!selectedDocument) {
      alert('먼저 확인할 문서를 선택해주세요.');
      return;
    }

    if (selectedDocument === '물류서비스계약서') {
      navigate(`/forwarder-dashboard/contract-management`);
    } else if (
      selectedDocument === '선하증권 (Bill of Lading, B/L)' ||
      selectedDocument === '수출 신고서 (Export Declaration)'
    ) {
      // ✅ PDF 파일 경로 변경 (public/ 기준)
      const pdfFiles = {
        '선하증권 (Bill of Lading, B/L)': '/BillOfLading.pdf',
        '수출 신고서 (Export Declaration)': '/ExportDeclaration.pdf',
      };

      const newWindow = window.open();
      newWindow.document.write(`
        <html>
          <head><title>${selectedDocument}</title></head>
          <body style="margin:0;">
            <embed src="${pdfFiles[selectedDocument]}" type="application/pdf" width="100%" height="100%"/>
          </body>
        </html>
      `);
    }
  };

  // ✅ 실시간 화물 리스트 버튼 클릭 시 이동
  const handleCargoNavigation = () => {
    if (!selectedCargo) {
      alert('먼저 확인할 화물 번호를 선택해주세요.');
      return;
    }
    navigate(`/forwarder-dashboard/ForwarderMonitoring`, {
      state: { selectedCargo },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="forwarder-dashboard-container">
        {/* 계약 상태 요약 박스 */}
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

        {/* 추가 기능 박스 */}
        <div className="additional-tasks-container">
          <div className="task-wrapper">
            <button className="task-title" onClick={handleCargoNavigation}>
              실시간 화물 리스트 ➤
            </button>
            <div className="task-box">
              <ul>
                {['KRUS30243', 'VNKR04983', 'CHKR03932'].map((cargo) => (
                  <li
                    key={cargo}
                    className={`cargo-item ${selectedCargo === cargo ? 'highlight' : ''
                      }`}
                    onClick={() => handleCargoClick(cargo)}
                  >
                    • {cargo}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="task-wrapper">
            <button className="task-title" onClick={handleContractNavigation}>
              계약 내역 및 문서 관리 ➤
            </button>
            <div className="task-box">
              <ul>
                {[
                  '물류서비스계약서',
                  '선하증권 (Bill of Lading, B/L)',
                  '수출 신고서 (Export Declaration)',
                ].map((doc) => (
                  <li
                    key={doc}
                    className={`document-item ${selectedDocument === doc ? 'highlight' : ''
                      }`}
                    onClick={() => handleDocumentClick(doc)}
                  >
                    • {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="task-wrapper">
            <button className="task-title">프로필 확인 ➤</button>
            <div className="task-box">
              <p className="alert-content">해당 내용이 없음</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForwarderDashboard;
