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
                    <h3 className="detail-title">컨테이너의 남는 공간을 필요한 곳과 이어주는 효율적인 물류 솔루션</h3>
                    <p>
                        화물 운송, LCL 컨테이너 계약, 결제, 실시간 추적까지 원스톱으로 제공하여 기존의 복잡한 물류 프로세스를 디지털화하여 간편한 운송 경험 제공합니다. 로지스메이트에서 경험해보세요.
                    </p>
                </div>
            </div>

            {/* 3행: (문장, 사진) */}
            <div className="row row-3">
                <div className="col text-col">
                    <h3 className="detail-title">컨테이너의 남는 공간 조회 및 계약</h3>
                    <p>
                        포워더들이 등록한 남는 컨테이너 공간을 실시간으로 조회하고, 출발지/도착지, 운송 방식, 화물 크기 및 비용을 비교하여 가장 적합한 운송사와 신속하게 계약할 수 있습니다.
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
                    <h3 className="detail-title">실시간 화물 관리 기능</h3>
                    <p>
                        운송 중인 화물의 실시간 위치 추적, 예상 도착 시간 확인, 계약 내역 및 서류 관리까지 한눈에 확인할 수 있습니다. 보다 투명하고 안전한 화물 관리를 가능하게 합니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Differentiators;
