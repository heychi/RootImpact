import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import Navbar from '../Navbar';
import '../../style/ContractManagement.css';

const ContractManagement = () => {
  const navigate = useNavigate();

  // ✅ 계약 문서 리스트
  const contractDocuments = [
    {
      name: '선하증권 (Bill of Lading, B/L)',
      file: '/BillOfLading.pdf',
    },
    {
      name: '물류 서비스 계약서',
      file: '/Contract.pdf',
    },
    {
      name: '수출 신고서 (Export Declaration)',
      file: '/ExportDeclaration.pdf',
    },
  ];

  // ✅ PDF 다운로드 함수 (각 문서별 다운로드 가능)
  const handleDownload = (file, name) => {
    const link = document.createElement('a');
    link.href = file; // ✅ public 폴더의 파일 경로 직접 사용
    link.download = name + '.pdf'; // ✅ 파일명 지정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Navbar />
      <div className="contract-management-container">
        {/* 닫기 버튼 */}
        <button
          className="close-icon"
          onClick={() => navigate('/forwarder-dashboard')}
        >
          <FiX size={30} />
        </button>

        {/* 계약 정보 헤더 */}
        <div className="title-container">
          <h2 className="title">계약정보</h2>
          <p className="description">계약서류를 한눈에 확인해보세요!</p>
        </div>

        {/* 계약 문서 리스트 */}
        <div className="contract-table">
          <div className="table-header">
            <span>문서 등록일</span>
            <span>문서명</span>
            <span>출발지 - 도착지</span>
            <span>계약번호</span>
          </div>
          {contractDocuments.map((doc, index) => (
            <div key={index} className="table-row">
              <span>2025-02-05 16:11</span>
              <span>{doc.name}</span>
              <span>부산-롱비치</span>
              <span>KHN3039855</span>
              <button
                className="download-button"
                onClick={() => handleDownload(doc.file, doc.name)}
              >
                내려받기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractManagement;
