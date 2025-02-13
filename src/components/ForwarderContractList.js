import React from 'react';
import { useNavigate } from 'react-router-dom';
import companyImage from '../../img/company_KMTC.jpg';
import '../../style/ForwarderContractList.css';

const ForwarderContractList = ({ cargoNumber, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/forwarder-dashboard/ForwarderMonitoring', {
      state: { cargoNumber },
    });
  };

  return (
    <div className="contract-modal">
      <div className="contract-modal-content">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <h2>계약 확인</h2>

        <span className="contract-info">
          <img src={companyImage} alt="Forwarder" className="forwarder-logo" />
        </span>

        <h3>화주 정보</h3>
        <p>
          <strong>업체명:</strong> KTMC
        </p>
        <p>
          <strong>운임 비용:</strong> 385,000원
        </p>
        <p>
          <strong>예상 운송일자:</strong> 2주(2025.02.03 - 02.16)
        </p>
        <p>
          <strong>최대 무게(kg):</strong> 200kg
        </p>
        <p>
          <strong>최대 부피(cbm):</strong> 6000 cbm
        </p>

        <div className="contract-details">
          <h3>계약 정보</h3>
          <table>
            <tbody>
              <tr>
                <td>수출/수입</td>
                <td>수입</td>
              </tr>
              <tr>
                <td>출발지-도착지</td>
                <td>부산항 → 카자흐스탄 악타우(Aktau) 항</td>
              </tr>
              <tr>
                <td>예상 운송기간</td>
                <td>2주(2025.02.03 - 02.16)</td>
              </tr>
              <tr>
                <td>보험가입</td>
                <td>화물 보험 가입 (전손보험)</td>
              </tr>
              <tr>
                <td>화물정보</td>
                <td>200kg / 6000cbm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="confirm-button" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default ForwarderContractList;
