import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/SignupComplete.css'; // 스타일 적용

const SignupComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL 경로에 따라 "화주" 또는 "포워더" 결정
  const userType = location.state?.userType || '회원';

  return (
    <div className="signup-complete-container">
      <h2 className="signup-complete-title">회원가입 ({userType})</h2>
      <hr className="divider" />
      <p className="message">회원가입이 완료되었습니다.</p>
      <p className="message">가입이 승인되면 사용 가능합니다.</p>
      <button className="home-button" onClick={() => navigate('/')}>
        홈으로
      </button>
    </div>
  );
};

export default SignupComplete;
