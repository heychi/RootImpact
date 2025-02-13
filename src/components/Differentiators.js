import React from "react";
import "../styles/Differentiators.css";
import diffImage1 from "../assets/diff1.png";
import diffImage2 from "../assets/diff2.png";
import diffImage3 from "../assets/diff3.png";

const Differentiators = () => {
    return (
        <div className="differentiators-section">
            {/* 1행: 제목 */}
            <div className="row title-row">
                <h2>Logismate만의 차별점</h2>
            </div>

            {/* 2행: (사진, 문장) */}
            <div className="row row-2">
                <div className="col image-col">
                    <img src={diffImage1} alt="차별점 이미지 1" />
                </div>
                <div className="col text-col">
                    <h3 className="detail-title">올인원(All-in-One) 디지털 포워딩 플랫폼</h3>
                    <p>
                        화물 운송, 계약, 결제, 실시간 추적, 분쟁 해결까지 원스톱으로 제공하여 기존의 복잡한 물류 프로세스를 디지털화하여 간편한 운송 경험 제공합니다. 로지스메이트에서 경험해보세요.
                    </p>
                </div>
            </div>

            {/* 3행: (문장, 사진) */}
            <div className="row row-3">
                <div className="col text-col">
                    <h3 className="detail-title">AI 기반 화주-포워더 스마트 매칭 서비스</h3>
                    <p>
                        나에게 맞는 최적의 포워더! 화물의 종류, 출발지/도착지, 운송 방식, 비용 등을 고려하여 최적의 포워더 추천하고 과거 운송 이력, 평점, 서비스 품질을 AI가 분석하여 신뢰도 높은 포워더 매칭해드립니다.
                    </p>
                </div>
                <div className="col image-col">
                    <img src={diffImage2} alt="차별점 이미지 2" />
                </div>
            </div>

            {/* 4행: (사진, 문장) */}
            <div className="row row-4">
                <div className="col image-col">
                    <img src={diffImage3} alt="차별점 이미지 3" />
                </div>
                <div className="col text-col">
                    <h3 className="detail-title">스마트 계약 & 안전한 결제 시스템</h3>
                    <p>
                        거래 계약까지 로지스메이트와 함께, 디지털 서명 기반 스마트 계약으로 투명하고 안전한 거래 환경을 제공합니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Differentiators;
