import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ForwarderSignupStep2.css'; // ✅ 정확한 경로로 수정

const ForwarderSignupStep2 = () => {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState({
    transportMethods: [],
    insurance: [],
    tradeTerms: [],
    additionalServices: [],
  });

  const [selectedServiceArea, setSelectedServiceArea] = useState(''); // ✅ 단일 선택 (드롭다운)

  // ✅ 체크박스 선택 핸들러 (다중 선택 가능)
  const handleCheckboxChange = (category, value) => {
    setSelectedOptions((prevState) => {
      const updated = prevState[category].includes(value)
        ? prevState[category].filter((item) => item !== value)
        : [...prevState[category], value];

      return { ...prevState, [category]: updated };
    });
  };

  // ✅ 회원가입 제출 핸들러
  const handleSubmit = () => {
    if (
      selectedOptions.transportMethods.length === 0 ||
      !selectedServiceArea || // ✅ 드롭다운 필수 선택
      selectedOptions.insurance.length === 0 ||
      selectedOptions.tradeTerms.length === 0
    ) {
      alert('필수 항목을 선택해주세요.');
      return;
    }

    navigate('/signup-complete', { state: { userType: '포워더' } });
  };

  return (
    <div className="sign-container">
      <h2 className="signup-title">회원가입 (포워더 업체)</h2>
      <hr className="divider" />

      {/* ✅ 화물 운송 방법 (필수) */}
      <div className="section">
        <h3>화물 운송 방법</h3>
        <div className="checkbox-group">
          {['해상', '항공', '특송', '철도', '트럭'].map((method) => (
            <label key={method} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedOptions.transportMethods.includes(method)}
                onChange={() =>
                  handleCheckboxChange('transportMethods', method)
                }
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      {/* ✅ 서비스 지역 (드롭다운으로 변경) */}
      <div className="section">
        <h3>서비스 지역</h3>
        <select
          className="dropdown"
          value={selectedServiceArea}
          onChange={(e) => setSelectedServiceArea(e.target.value)}
        >
          <option value="" disabled>
            선택하세요
          </option>
          <option value="부산항">부산항</option>
          <option value="인천항">인천항</option>
          <option value="광양항">광양항</option>
          <option value="싱가포르항">싱가포르항</option>
          <option value="로테르담항">로테르담항</option>
          <option value="LA항">LA항</option>
        </select>
      </div>

      {/* ✅ 보험 (필수) */}
      <div className="section">
        <h3>보험</h3>
        <div className="checkbox-group">
          {['전손', '전위험', '특정 위험', '냉장화물', '위험물 전용'].map(
            (insurance) => (
              <label key={insurance} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedOptions.insurance.includes(insurance)}
                  onChange={() => handleCheckboxChange('insurance', insurance)}
                />
                {insurance}
              </label>
            )
          )}
        </div>
      </div>

      {/* ✅ 거래 조건 (필수) */}
      <div className="section">
        <h3>거래 조건</h3>
        <div className="checkbox-group">
          {['FOB', 'CFR', 'CIF', 'DAP', 'DPU', 'DDP', 'ETC'].map(
            (condition) => (
              <label key={condition} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedOptions.tradeTerms.includes(condition)}
                  onChange={() => handleCheckboxChange('tradeTerms', condition)}
                />
                {condition}
              </label>
            )
          )}
        </div>
      </div>

      {/* ✅ 추가 제공 서비스 (선택) */}
      <div className="section">
        <h3>추가 제공 서비스 (선택사항)</h3>
        <div className="checkbox-group">
          {['냉동컨테이너', 'CCTV', '위험물취급'].map((service) => (
            <label key={service} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedOptions.additionalServices.includes(service)}
                onChange={() =>
                  handleCheckboxChange('additionalServices', service)
                }
              />
              {service}
            </label>
          ))}
        </div>
      </div>

      {/* ✅ 회원가입 버튼 */}
      <button className="signup-button" onClick={handleSubmit}>
        회원가입
      </button>
    </div>
  );
};

export default ForwarderSignupStep2;
