// src/components/ShipperSignup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ShipperSignup.css';
import { signupShipper } from '../api/api_post'; // API 통신 모듈 import

const ShipperSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    businessNumber: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signupShipper(formData);
        navigate('/signup-complete', { state: { userType: '화주' } });
      } catch (error) {
        alert("회원가입 실패: " + error.message);
      }
    } else {
      alert('입력한 정보를 다시 확인해주세요.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입 (화주)</h2>
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
          회원가입
        </button>
      </form>
    </div>
  );
};

export default ShipperSignup;
