// src/components/Dashboard.js
import React from "react";
import Navbar from "./Navbar";
import "../styles/Dashboard.css";

const contractList = [
    "화물번호 DKI30857 ㅣ[KRPUS] Busan - [USLGB] Long Beach ㅣ25.02.04",
    "화물번호 ABC12345 ㅣ[KRPUS] Incheon - [USLGB] Long Beach ㅣ25.03.10",
    "화물번호 XYZ98765 ㅣ[KRPUS] Busan - [USLGB] Los Angeles ㅣ25.04.20",
];

const Dashboard = () => {
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
