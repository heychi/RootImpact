// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Dashboard.css";
import { getContractList } from "../api/api_get"; // GET API 함수 import

const Dashboard = () => {
    const navigate = useNavigate();
    const [contractList, setContractList] = useState([]);

    useEffect(() => {
        // 계약 리스트를 API를 통해 가져옵니다.
        getContractList()
            .then((data) => {
                // API 응답 데이터를 원하는 문자열 형식으로 변환합니다.
                const list = data.map((contract) => {
                    // 예시 포맷: "계약번호 {contractId} ㅣ {importExport} ㅣ 계약일 {contractDate}"
                    return `계약번호 ${contract.contractId} ㅣ ${contract.importExport} ㅣ 계약일 ${contract.contractDate}`;
                });
                setContractList(list);
            })
            .catch((error) => {
                console.error("계약 리스트 API 호출 실패:", error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <h1 className="page-title">대시보드</h1>
                <h2 className="sub-title">계약 화물 리스트</h2>
                <div className="contract-list-container">
                    {contractList.map((item, index) => (
                        <button key={index} className="contract-item">
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
