// src/components/SmartContractPayment.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/SmartContractPayment.css";

const SmartContractPayment = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    // const handlePayment = () => {
    //     if (!paymentMethod) {
    //         alert("결제 방법을 선택해주세요.");
    //         return;
    //     }
    //     // 결제 로직 처리 후 계약 체결 완료 페이지로 이동
    //     navigate("/smart-contract/complete");
    // };

    return (
        <div>
            <Navbar />
            <div className="smart-contract-payment-container">
                <h2 className="page-title">스마트계약(결제)</h2>

                {/* 결제 정보 표 */}
                <div className="payment-info-table">
                    <div className="table-row">
                        <div className="table-cell label">결제 방식</div>
                        <div className="table-cell value">후불 결제</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell label">보증금</div>
                        <div className="table-cell value">1,000,000</div>
                    </div>
                </div>

                {/* 결제 방법 선택 영역 (라디오 버튼) */}
                <div className="payment-options">
                    <h3 className="option-title">결제 방법 선택</h3>
                    <div className="payment-methods">
                        <label className="payment-option">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="계좌이체"
                                checked={paymentMethod === "계좌이체"}
                                onChange={handlePaymentMethodChange}
                            />
                            계좌이체
                        </label>
                        <label className="payment-option">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="카드 결제"
                                checked={paymentMethod === "카드 결제"}
                                onChange={handlePaymentMethodChange}
                            />
                            카드 결제
                        </label>
                        <label className="payment-option">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="가장계좌 선택"
                                checked={paymentMethod === "가장계좌 선택"}
                                onChange={handlePaymentMethodChange}
                            />
                            가장계좌 선택
                        </label>
                        <label className="payment-option">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="에스크로 결제 시스템"
                                checked={paymentMethod === "에스크로 결제 시스템"}
                                onChange={handlePaymentMethodChange}
                            />
                            에스크로 결제 시스템
                        </label>
                    </div>
                </div>

                {/* 하단 버튼 영역 */}
                <div className="button-group">
                    <button
                        className="prev-button"
                        onClick={() => navigate("/contract/document")}
                    >
                        이전
                    </button>
                    <button className="next-button" onClick={() => navigate("/contract/complete")}>
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartContractPayment;
