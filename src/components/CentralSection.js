// src/components/CentralSection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CentralSection.css";

const CentralSection = () => {
    const navigate = useNavigate();

    // 탭 상태 (수출/수입)
    const [selectedTab, setSelectedTab] = useState("수출");

    // 옵션 입력 상태
    const [transportMethods, setTransportMethods] = useState([]); // 해상, 항공, 특송
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    // 화물 종류를 라디오 버튼으로 단일 선택
    const [cargoType, setCargoType] = useState("");
    // 화물 크기 및 무게 (FCL, LCL 라디오 버튼)
    const [cargoSize, setCargoSize] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");

    // 컨테이너 관련 상태
    const [containerSize, setContainerSize] = useState("");
    const [containerCount, setContainerCount] = useState("");
    const [containerWeight, setContainerWeight] = useState("");

    // 모달 관련 상태 (출발지/도착지 선택)
    const [showPortModal, setShowPortModal] = useState(false);
    const [modalTarget, setModalTarget] = useState(""); // "departure" 또는 "arrival"
    const [selectedCountry, setSelectedCountry] = useState("");

    // 예시 데이터: 국가 및 해당 항구 목록
    const countries = [
        { name: "한국", ports: ["부산", "인천", "광양"] },
        { name: "미국", ports: ["LA", "NY", "시카고"] },
        { name: "중국", ports: ["상해", "심천"] },
    ];

    // 모달 열기 (target: "departure" 또는 "arrival")
    const openPortModal = (target) => {
        setModalTarget(target);
        setSelectedCountry(""); // 초기 상태
        setShowPortModal(true);
    };

    // 운송방법 체크박스 변경 처리
    const handleTransportChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setTransportMethods((prev) => [...prev, value]);
        } else {
            setTransportMethods((prev) => prev.filter((item) => item !== value));
        }
    };

    // 화물 종류 라디오 버튼 변경 처리
    const handleCargoTypeChange = (e) => {
        setCargoType(e.target.value);
    };

    // 제출 처리: 모든 필수 입력값 검증
    const handleSubmit = () => {
        if (
            transportMethods.length === 0 ||
            departure === "" ||
            arrival === "" ||
            cargoType === "" ||
            cargoSize === "" ||
            departureDate === "" ||
            arrivalDate === ""
        ) {
            alert("매칭에 필요한 운송 정보를 모두 입력해주세요.");
            return;
        }
        // 모든 필수 값이 입력된 경우 포워더 추천 리스트 페이지로 이동
        navigate("/recommendation");
    };

    return (
        <div className="central-section">
            <div className="central-content">
                {/* 왼쪽 영역: 로고와 슬로건 */}
                <div className="left-panel">
                    <h1 className="logo">Logismate</h1>
                    <div className="slogan-box">
                        <p className="slogan">
                            화물운송, 계약, 결제, 실시간 화물 추적까지 물류 올인원(AII-IN-ONE) 서비스
                        </p>
                    </div>
                </div>

                {/* 오른쪽 영역: 옵션 선택 메뉴 */}
                <div className="right-panel">
                    {/* 탭 영역 */}
                    <div className="tab-container">
                        <button
                            className={`tab ${selectedTab === "수출" ? "selected" : ""}`}
                            onClick={() => setSelectedTab("수출")}
                        >
                            <div className="tab-main">수출</div>
                            <div className="tab-sub">Export</div>
                        </button>
                        <button
                            className={`tab ${selectedTab === "수입" ? "selected" : ""}`}
                            onClick={() => setSelectedTab("수입")}
                        >
                            <div className="tab-main">수입</div>
                            <div className="tab-sub">Import</div>
                        </button>
                    </div>

                    {/* 운송방법 체크박스 */}
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="transport"
                                value="해상"
                                onChange={handleTransportChange}
                            />{" "}
                            해상
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="transport"
                                value="항공"
                                onChange={handleTransportChange}
                            />{" "}
                            항공
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="transport"
                                value="특송"
                                onChange={handleTransportChange}
                            />{" "}
                            특송
                        </label>
                    </div>

                    {/* 출발지 선택 필드 */}
                    <div className="form-row">
                        <label>
                            출발지:
                            <div className="select-field-container">
                                <div
                                    className="select-field"
                                    onClick={() => openPortModal("departure")}
                                >
                                    {/* departure 값 표시 */}
                                    { /* (departure 상태 사용) */}
                                    {departure || "선택하세요"}
                                </div>
                                {departure && (
                                    <button
                                        className="clear-button"
                                        onClick={() => setDeparture("")}
                                    >
                                        선택 취소
                                    </button>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* 도착지 선택 필드 */}
                    <div className="form-row">
                        <label>
                            도착지:
                            <div className="select-field-container">
                                <div
                                    className="select-field"
                                    onClick={() => openPortModal("arrival")}
                                >
                                    {arrival || "선택하세요"}
                                </div>
                                {arrival && (
                                    <button
                                        className="clear-button"
                                        onClick={() => setArrival("")}
                                    >
                                        선택 취소
                                    </button>
                                )}
                            </div>
                        </label>
                    </div>

                    {/* 화물 종류 라디오 버튼 */}
                    <div className="form-row cargo-type">
                        <span>화물종류:</span>
                        <label>
                            <input
                                type="radio"
                                name="cargoType"
                                value="일반"
                                checked={cargoType === "일반"}
                                onChange={handleCargoTypeChange}
                            />{" "}
                            일반
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="cargoType"
                                value="냉장"
                                checked={cargoType === "냉장"}
                                onChange={handleCargoTypeChange}
                            />{" "}
                            냉장
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="cargoType"
                                value="냉동"
                                checked={cargoType === "냉동"}
                                onChange={handleCargoTypeChange}
                            />{" "}
                            냉동
                        </label>
                    </div>

                    {/* 화물 크기 및 무게 (라디오 버튼) */}
                    <div className="form-row cargo-size">
                        <span>화물크기 및 무게:</span>
                        <label>
                            <input
                                type="radio"
                                name="cargoSize"
                                value="FCL"
                                checked={cargoSize === "FCL"}
                                onChange={(e) => setCargoSize(e.target.value)}
                            />{" "}
                            FCL
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="cargoSize"
                                value="LCL"
                                checked={cargoSize === "LCL"}
                                onChange={(e) => setCargoSize(e.target.value)}
                            />{" "}
                            LCL
                        </label>
                    </div>

                    {/* 컨테이너 관련 추가 입력란 */}
                    {/* 컨테이너 관련 추가 입력란 */}
                    <div className="form-row container-details">
                        <div className="container-row">
                            <select
                                className="container-size-dropdown"
                                value={containerSize}
                                onChange={(e) => setContainerSize(e.target.value)}
                            >
                                <option value="">컨테이너 크기 선택</option>
                                <option value="20ft">20ft</option>
                                <option value="40ft">40ft</option>
                            </select>
                            <input
                                type="number"
                                className="container-count-input"
                                placeholder="컨테이너 개수"
                                value={containerCount}
                                onChange={(e) => setContainerCount(e.target.value)}
                            />
                        </div>
                        <div className="container-row">
                            <input
                                type="number"
                                className="container-weight-input"
                                placeholder="컨테이너 무게 (kg)"
                                value={containerWeight}
                                onChange={(e) => setContainerWeight(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 출발 예정일 */}
                    <div className="form-row">
                        <label>
                            출발 예정일:
                            <input
                                type="date"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* 최소 도착 희망일 */}
                    <div className="form-row">
                        <label>
                            최소 도착 희망일:
                            <input
                                type="date"
                                value={arrivalDate}
                                onChange={(e) => setArrivalDate(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* 실시간 포워더 매칭 버튼 */}
                    <div className="form-row">
                        <button className="match-button" onClick={handleSubmit}>
                            실시간 포워더 매칭
                        </button>
                    </div>
                </div>
            </div>

            {/* 포트 선택 모달 (출발지/도착지 선택 시) */}
            {showPortModal && (
                <div className="port-modal-overlay">
                    <div className="port-modal">
                        <button
                            className="modal-close-button"
                            onClick={() => setShowPortModal(false)}
                        >
                            닫기
                        </button>
                        <div className="modal-content">
                            {/* 왼쪽 영역: 국가 선택 */}
                            <div className="country-panel">
                                {countries.map((country) => (
                                    <div
                                        key={country.name}
                                        className={`country-item ${selectedCountry === country.name ? "selected" : ""}`}
                                        onClick={() => setSelectedCountry(country.name)}
                                    >
                                        {country.name}
                                    </div>
                                ))}
                            </div>
                            {/* 오른쪽 영역: 해당 국가의 항구 선택 */}
                            <div className="port-panel">
                                {selectedCountry ? (
                                    countries
                                        .find((c) => c.name === selectedCountry)
                                        ?.ports.map((port) => (
                                            <div
                                                key={port}
                                                className="port-item"
                                                onClick={() => {
                                                    if (modalTarget === "departure") {
                                                        setDeparture(port);
                                                    } else if (modalTarget === "arrival") {
                                                        setArrival(port);
                                                    }
                                                    setShowPortModal(false);
                                                    setSelectedCountry("");
                                                }}
                                            >
                                                {port}
                                            </div>
                                        ))
                                ) : (
                                    <div className="port-placeholder">국가를 선택하세요</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CentralSection;