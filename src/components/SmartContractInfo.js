// src/components/SmartContractInfo.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/SmartContractInfo.css";

const SmartContractInfo = () => {
    const navigate = useNavigate();
    const companyInfo = {
        logo: "/assets/corp1.png",
        companyName: "Forwarder A",
        estimatedCost: "₩1,000,000 ~ ₩1,500,000",
        transitTime: "5-7일",
        serviceArea: "국내외",
        rating: "4.5/5",
    };

    const contractInfo = {
        exportImport: "수출",
        transportMode: "해상",
        route: "부산 - LA",
        cargoType: "일반",
        cargoDetails: "500kg, 2톤",
        desiredArrivalDate: "2025-02-20",
        additionalServices: "통관대행",
        insurance: "기본 운송 보험(전손보험)",
        tradeTerms: "CIF",
        costRange: "₩1,000,000 ~ ₩1,500,000",
        additionalRequirements: "냉동 컨테이너",
        expectedTransit: "7일",
        forwarderRating: "4.5/5",
        recommendationReason: "AI 기반 최적 매칭",
    };

    return (
        <div>
            <Navbar />
            <div className="smart-contract-container">
                {/* 상단 제목 */}
                <div className="header">
                    <h1>스마트 계약</h1>
                </div>
                <hr className="divider" />

                {/* 회사 정보 영역 */}
                <div className="company-info">
                    <div className="logo-container">
                        <img src={companyInfo.logo} alt="회사 로고" />
                    </div>
                    <div className="forwarder-info">
                        <h2>포워더 정보</h2>
                        <p>
                            <strong>업체명:</strong> {companyInfo.companyName}
                        </p>
                        <p>
                            <strong>예상 운임 비용:</strong> {companyInfo.estimatedCost}
                        </p>
                        <p>
                            <strong>소요기간:</strong> {companyInfo.transitTime}
                        </p>
                        <p>
                            <strong>서비스 제공 지역:</strong> {companyInfo.serviceArea}
                        </p>
                        <p>
                            <strong>평점:</strong> {companyInfo.rating}
                        </p>
                    </div>
                </div>

                {/* 계약 정보 영역 */}
                <div className="contract-info">
                    <h2>계약 정보</h2>
                    <table className="contract-table">
                        <tbody>
                            <tr>
                                <th>수출/수입</th>
                                <td>{contractInfo.exportImport}</td>
                            </tr>
                            <tr>
                                <th>해상/항공/특송</th>
                                <td>{contractInfo.transportMode}</td>
                            </tr>
                            <tr>
                                <th>출발지-도착지</th>
                                <td>{contractInfo.route}</td>
                            </tr>
                            <tr>
                                <th>화물 종류</th>
                                <td>{contractInfo.cargoType}</td>
                            </tr>
                            <tr>
                                <th>화물정보</th>
                                <td>{contractInfo.cargoDetails}</td>
                            </tr>
                            <tr>
                                <th>최소 도착 희망일</th>
                                <td>{contractInfo.desiredArrivalDate}</td>
                            </tr>
                            <tr>
                                <th>추가서비스</th>
                                <td>{contractInfo.additionalServices}</td>
                            </tr>
                            <tr>
                                <th>보험여부 및 종류</th>
                                <td>{contractInfo.insurance}</td>
                            </tr>
                            <tr>
                                <th>거래조건</th>
                                <td>{contractInfo.tradeTerms}</td>
                            </tr>
                            <tr>
                                <th>운송비용 범위</th>
                                <td>{contractInfo.costRange}</td>
                            </tr>
                            <tr>
                                <th>기타 요구사항</th>
                                <td>{contractInfo.additionalRequirements}</td>
                            </tr>
                            <tr>
                                <th>예상 운송 기간</th>
                                <td>{contractInfo.expectedTransit}</td>
                            </tr>
                            <tr>
                                <th>포워더 평점</th>
                                <td>{contractInfo.forwarderRating}</td>
                            </tr>
                            <tr>
                                <th>추천 이유</th>
                                <td>{contractInfo.recommendationReason}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="button-group">
                    {/* 첫 페이지이므로 이전 버튼은 없음 */}
                    <button onClick={() => navigate("/contract/document")}>
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartContractInfo;
