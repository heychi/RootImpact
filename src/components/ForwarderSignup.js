import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ForwarderSignup.css'; // ✅ 스타일 경로 확인

const ForwarderSignup = () => {
  const navigate = useNavigate();

  // ✅ 포워더가 맞는지 확인 (localStorage 활용)
  useEffect(() => {
    const userType = localStorage.getItem('selectedUserType');
    if (userType !== 'forwarder') {
      alert('잘못된 접근입니다.');
      navigate('/signup-selection'); // 🚨 포워더가 아닐 경우 선택 페이지로 리디렉션
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    businessNumber: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  // ✅ 입력 필드 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (
      !/^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*()_+]).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        '대소문자 포함, 숫자/특수문자 중 2가지 포함 8자리 이상 입력해주세요.';
    }

    if (!formData.companyName) {
      newErrors.companyName = '회사명을 입력해주세요.';
    }

    if (!formData.businessNumber) {
      newErrors.businessNumber = '사업자등록번호를 입력해주세요.';
    } else if (!/^\d{13}$/.test(formData.businessNumber)) {
      newErrors.businessNumber = '사업자등록번호는 13자리 숫자로 입력해주세요.';
    }

    if (!formData.phone) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (!/^\d{3}-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '연락처는 000-0000-0000 형식으로 입력해주세요.';
    }

    if (!formData.address) {
      newErrors.address = '회사 주소를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ 입력 값 핸들링 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // ✅ 회원가입 버튼 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Navigating to ForwarderSignupStep2 with data:', formData); // ✅ 디버깅 로그 추가
      navigate('/forwarder-signup-step2', { state: { formData } }); // ✅ 올바른 경로 확인
    } else {
      alert('메시지를 확인해주세요.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입 (포워더 업체)</h2>
      <hr className="divider" />
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          placeholder="logismate@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="대소문자, 숫자, 특수문자 중 2가지를 포함한 8자리 이상"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>회사명</label>
        <input
          type="text"
          name="companyName"
          placeholder="로지스메이트"
          value={formData.companyName}
          onChange={handleChange}
        />
        {errors.companyName && <p className="error">{errors.companyName}</p>}

        <label>사업자등록번호</label>
        <input
          type="text"
          name="businessNumber"
          placeholder="13자리 숫자"
          value={formData.businessNumber}
          onChange={handleChange}
        />
        {errors.businessNumber && (
          <p className="error">{errors.businessNumber}</p>
        )}

        <label>연락처</label>
        <input
          type="text"
          name="phone"
          placeholder="010-1234-5678"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>회사주소</label>
        <input
          type="text"
          name="address"
          placeholder="서울특별시 OO구 OO로 OO번길 O"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <button type="submit" className="signup-button">
          다음 단계
        </button>
      </form>
    </div>
  );
};

export default ForwarderSignup;
