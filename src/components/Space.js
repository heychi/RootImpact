import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Space.css';
import companyImage from '../assets/company_KMTC.jpg';

const Space = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 기존 컨테이너 정보 (수정 모드인지 확인)
  const existingData = location.state?.container || null;
  const [isEditing, setIsEditing] = useState(!!existingData);

  // ✅ 초기 컨테이너 정보
  const [containerData, setContainerData] = useState(
    existingData || {
      containerNumber: '',
      freightCost: '',
      estimatedDate: '',
      originDestination: '',
      spaceInfo: '', // 공간정보 추가
      contractDetails: {
        importExport: '',
        insurance: '',
        additionalInfo: '',
      },
    }
  );

  // ✅ 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContainerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContractChange = (e) => {
    const { name, value } = e.target;
    setContainerData((prev) => ({
      ...prev,
      contractDetails: {
        ...prev.contractDetails,
        [name]: value,
      },
    }));
  };

  // ✅ 등록/수정 버튼 클릭 시 처리
  const handleRegister = () => {
    if (
      !containerData.containerNumber ||
      !containerData.freightCost ||
      !containerData.estimatedDate ||
      !containerData.originDestination ||
      !containerData.spaceInfo // 공간정보도 필수 입력값으로 설정
    ) {
      alert('모든 필드를 입력하세요!');
      return;
    }

    let containers = JSON.parse(localStorage.getItem('containers')) || [];

    if (isEditing) {
      // 수정 모드: 기존 컨테이너 정보 업데이트
      containers = containers.map((cont) =>
        cont.containerNumber === containerData.containerNumber
          ? containerData
          : cont
      );
    } else {
      // 신규 등록
      containers.push(containerData);
    }

    // localStorage에 저장 후 대시보드로 이동
    localStorage.setItem('containers', JSON.stringify(containers));
    navigate('/forwarder-dashboard');
  };

  // ✅ 취소 버튼 클릭 시 처리
  const handleCancel = () => {
    // 입력된 데이터가 있는지 확인
    const hasData =
      Object.values(containerData).some((value) => value !== '') ||
      Object.values(containerData.contractDetails).some(
        (value) => value !== ''
      );

    if (hasData) {
      const confirmCancel = window.confirm('등록을 취소하시겠습니까?');
      if (!confirmCancel) return;
    }

    navigate('/forwarder-dashboard');
  };

  return (
    <div>
      <Navbar />
      <div className="container-registration-container">
        <h2>컨테이너 남는 공간 {isEditing ? '수정' : '등록'}</h2>

        {/* 컨테이너 정보 표시 */}
        <div className="container-info">
          <img
            src={companyImage}
            alt="컨테이너 이미지"
            className="container-image"
          />

          <div className="container-details">
            <p>
              <strong>컨테이너 번호:</strong>{' '}
              {isEditing ? containerData.containerNumber : '---'}
            </p>
            <p>
              <strong>운임 비용:</strong>{' '}
              {isEditing ? `${containerData.freightCost} 원` : '---'}
            </p>
            <p>
              <strong>예상 운송일자:</strong>{' '}
              {isEditing ? containerData.estimatedDate : '---'}
            </p>
            <p>
              <strong>출발지 - 도착지:</strong>{' '}
              {isEditing ? containerData.originDestination : '---'}
            </p>
            <p>
              <strong>공간정보:</strong>{' '}
              {isEditing ? containerData.spaceInfo : '---'}
            </p>
          </div>
        </div>

        {/* 계약 정보 입력 폼 */}
        <div className="input-form">
          <h3>계약 정보 입력</h3>
          <input
            type="text"
            name="containerNumber"
            placeholder="컨테이너 번호"
            value={containerData.containerNumber}
            onChange={handleChange}
          />
          <input
            type="number"
            name="freightCost"
            placeholder="운임 비용 (원)"
            value={containerData.freightCost}
            onChange={handleChange}
          />
          <input
            type="text"
            name="estimatedDate"
            placeholder="예상 운송일자"
            value={containerData.estimatedDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="originDestination"
            placeholder="출발지 - 도착지"
            value={containerData.originDestination}
            onChange={handleChange}
          />
          <input
            type="text"
            name="spaceInfo"
            placeholder="공간정보 (예: 20ft 컨테이너, 10cbm 여유)"
            value={containerData.spaceInfo}
            onChange={handleChange}
          />

          <h3>추가 계약 정보</h3>
          <input
            type="text"
            name="importExport"
            placeholder="수출 / 수입"
            value={containerData.contractDetails.importExport}
            onChange={handleContractChange}
          />
          <input
            type="text"
            name="insurance"
            placeholder="보험 여부"
            value={containerData.contractDetails.insurance}
            onChange={handleContractChange}
          />
          <input
            type="text"
            name="additionalInfo"
            placeholder="추가 서비스 및 기타"
            value={containerData.contractDetails.additionalInfo}
            onChange={handleContractChange}
          />

          <div className="button-container">
            <button className="register-button" onClick={handleRegister}>
              {isEditing ? '수정' : '등록'}
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Space;
