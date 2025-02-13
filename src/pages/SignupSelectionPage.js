import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SignupSelectionPage.css'; // ✅ 스타일 경로 확인

import { FiPackage, FiSend } from 'react-icons/fi'; // 아이콘 사용

const SignupSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');

  const handleNext = () => {
    if (!selectedType) {
      alert('회원 유형을 선택해주세요.');
      return;
    }
    // ✅ 선택한 유형을 localStorage에 저장 (회원가입 단계에서 활용)
    localStorage.setItem('selectedUserType', selectedType);

    // ✅ 올바른 회원가입 페이지로 이동
    navigate(
      selectedType === 'shipper' ? '/signup-shipper' : '/signup-forwarder'
    );
  };

  return (
    <div className="signup-selection-container">
      <p className="S_description">
        안녕하세요!
        <br /> 화물운송, 계약, 결제, 실시간 화물 추적까지 물류 올인원 서비스{' '}
        <strong>Logismate</strong>입니다.
      </p>
      <h1 className="title">회원가입</h1>

      <div className="user-type-options">
        <div
          className={`user-type-box ${
            selectedType === 'shipper' ? 'selected' : ''
          }`}
          onClick={() => setSelectedType('shipper')}
        >
          <FiPackage className="icon" />
          <p>화주</p>
        </div>
        <div
          className={`user-type-box ${
            selectedType === 'forwarder' ? 'selected' : ''
          }`}
          onClick={() => setSelectedType('forwarder')}
        >
          <FiSend className="icon" />
          <p>포워더</p>
        </div>
      </div>

      <button className="next-button" onClick={handleNext}>
        다음
      </button>
    </div>
  );
};

export default SignupSelectionPage;
