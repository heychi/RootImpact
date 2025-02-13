// src/components/SmartContractComplete.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/SmartContractPayment.css";

const SmartContractComplete = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="smart-contract-container">
                <h2>계약 체결 완료</h2>
                <p>계약이 성공적으로 체결되었습니다. 감사합니다.</p>
                <div className="button-group">
                    <button onClick={() => navigate("/")}>홈으로</button>
                </div>
            </div>
        </div>
    );
};

export default SmartContractComplete;
