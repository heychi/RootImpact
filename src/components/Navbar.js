import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ useLocation 추가

  useEffect(() => {
    console.log(`현재 경로: ${location.pathname}`);
  }, [location.pathname]); // ✅ location 대신 location.pathname을 의존성 배열에 추가

  return (
    <nav className="navbar">
      <h1 className="logo">Logismate</h1>

      <div className="menu">
        <button className="menu-item" onClick={() => navigate('/dashboard')}>
          대시보드
        </button>
        <button className="menu-item">고객지원</button>
        <button className="menu-item" onClick={() => navigate('/login')}>
          로그인
        </button>
        <button
          className="menu-item"
          onClick={() => navigate('/signup-selection')}
        >
          회원가입
        </button>
        <button className="menu-item">한국어</button>
        <button className="menu-item search-icon">🔍</button>
      </div>
    </nav>
  );
};

export default Navbar;
