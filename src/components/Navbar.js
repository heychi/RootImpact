import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ 로그인 상태 유지 (localStorage 사용)
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }
    console.log(`현재 경로: ${location.pathname}`);
  }, [location.pathname]);

  // ✅ 로그인 페이지로 이동
  const handleLogin = () => {

    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    navigate('/account/login'); // 로그인 후 대시보드로 이동

  };

  // ✅ 로그아웃 시 실행될 함수
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/'); // 로그아웃 후 메인 페이지로 이동
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Logismate</h1>

      <div className="menu">
        <button
          className="menu-item"
          onClick={() => navigate('/dashboard/owner')}
        >
          대시보드
        </button>

        {/* ✅ 로그인 상태에 따라 버튼 변경 */}
        {isLoggedIn ? (
          <button className="menu-item" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <>
            <button className="menu-item" onClick={handleLogin}>
              로그인
            </button>
            <button
              className="menu-item"
              onClick={() => navigate('/account/enroll')}
            >
              회원가입
            </button>
          </>
        )}

        <button className="menu-item">한국어</button>
        <button className="menu-item search-icon">🔍</button>
      </div>
    </nav>
  );
};

export default Navbar;
