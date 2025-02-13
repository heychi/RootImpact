import React from 'react';
import '../styles/ForwarderTable.css';

const tableData = [
  { label: '수출/수입', value: '수입' },
  { label: '해상/항공/특송', value: '특송' },
  { label: '출발지-도착지', value: '부산신항 - 카자흐스탄 악타우(Aktau) 항항' },
  { label: '화물 종류', value: 'CFR (Const and Freight)' },
  { label: '화물정보', value: '20FT 일반 컨테이너 X 5' },
  { label: '최소 도착 희망일', value: '2025.02.12 24:00' },
  { label: '추가서비스', value: '창고 보관, 통관 대행' },
  { label: '보험여부 및 종류', value: '화물 보험 가입 (전손보험)' },
  { label: '거래조건', value: 'CIF (운송료 및 보험료 포함' },
  { label: '운송비용 범위', value: '15,895,800 ~ 19,345,200' },
  { label: '기타 요구사항', value: '빠른 통관 지원 요청' },
  { label: '예상 운송 기간 ', value: '2주(2025.02.03 ~ 02.16)' },
  { label: '포워더 평점', value: '4/5' },
  { label: '추천 이유', value: '고려해운 선사 포워딩 업체' },
];

const ForwarderTable = () => {
  return (
    <table className="forwarder-table">
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td className="table-label">{row.label}</td>
            <td className="table-value">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ForwarderTable;
