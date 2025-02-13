import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이메일 형식 검사 함수
  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  // 비밀번호 규칙 검사 함수
  const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*()_+]).{8,}$/.test(password);
  };

  const handleLogin = () => {
    if (!userType) {
      alert('회원 유형을 선택해주세요.');
      return;
    }
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (!isValidPassword(password)) {
      alert(
        '비밀번호는 대소문자 포함, 숫자/특수문자 중 2가지 포함 8자리 이상 입력해주세요.'
      );
      return;
    }

    console.log(`로그인 요청: ${userType}, ${email}`);
  };

  return (
    <div className="login-container">
      <p className="Hidescription">
        안녕하세요!
        <br /> 화물운송, 계약, 결제, 실시간 화물 추적까지 물류 올인원 서비스{' '}
        <strong>Logismate</strong>입니다.
      </p>
      <h2 className="login-title">로그인</h2>

      <div className="user-type">
        <label>
          <input
            type="radio"
            name="userType"
            value="shipper"
            onChange={() => setUserType('shipper')}
          />
          화주
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="forwarder"
            onChange={() => setUserType('forwarder')}
          />
          포워더
        </label>
      </div>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button" onClick={handleLogin}>
        로그인
      </button>

      <p className="signup-prompt">
        아직 회원이 아니신가요?
        <br /> 회원가입 후 이용 부탁드립니다.
      </p>

      <button
        className="signup-button"
        onClick={() => navigate('/account/enroll')}
      >
        회원가입
      </button>
    </div>
  );
};

export default LoginPage;
