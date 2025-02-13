
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [contractList, setContractList] = useState([]);


  useEffect(() => {
    fetch('/api/contract/shipper')
      .then((res) => res.json())
      .then((data) => setContractList(data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="page-title">대시보드</h1>
        <h2 className="sub-title">계약 화물 리스트</h2>
        <div className="contract-list-container">
          {contractList.map((contract, index) => (
            <button key={index} className="contract-item">
              화물번호 {contract.contractId} | {contract.importExport} |{' '}
              {contract.contractDate}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
