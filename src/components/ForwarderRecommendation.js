// src/components/ForwarderRecommendation.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/ForwarderRecommendation.css";

// 예시 데이터: AI기반 추천포워더
const aiRecommendedForwarders = [
    {
        id: 1,
        logo: "/assets/corp1.png",
        expertise: "해상, 항공",
        companyName: "Forwarder A",
        estimatedCost: "₩1,000,000 ~ ₩1,500,000",
        rating: 4.5,
        reviewCount: 23,
        departure: "[KRPUS] Busan (2025.02.03)",
        destination: "[USLGB] Long Beach (2025.02.16)",
        capacity: "20000 kg / 150 cbm"
    },
    {
        id: 2,
        logo: "/assets/corp2.png",
        expertise: "특송",
        companyName: "Forwarder B",
        estimatedCost: "₩900,000 ~ ₩1,300,000",
        rating: 4.2,
        reviewCount: 15,
        departure: "[KRPUS] Incheon (2025.03.01)",
        destination: "[USLGB] Long Beach (2025.03.10)",
        capacity: "18000 kg / 140 cbm"
    },
];

// 예시 데이터: 일반 포워더
const regularForwarders = [
  {
    id: 3,
    logo: '/assets/corp1.png',
    expertise: '해상',
    companyName: 'Forwarder C',
    estimatedCost: '₩800,000 ~ ₩1,200,000',
    rating: 4.0,
    reviewCount: 8,
    departure: '[KRPUS] Busan (2025.04.05)',
    destination: '[USLGB] Long Beach (2025.04.20)',
    capacity: '22000 kg / 160 cbm',
  },
  {
    id: 4,
    logo: '/assets/corp2.png',
    expertise: '항공',
    companyName: 'Forwarder D',
    estimatedCost: '₩1,100,000 ~ ₩1,600,000',
    rating: 4.3,
    reviewCount: 20,
    departure: '[KRPUS] Incheon (2025.05.01)',
    destination: '[USLGB] Long Beach (2025.05.10)',
    capacity: '21000 kg / 155 cbm',
  },
];

// 통합 포워더 리스트 (AI추천과 일반 모두 포함)
const forwarders = [...aiRecommendedForwarders, ...regularForwarders];

const ForwarderRecommendation = () => {
  const navigate = useNavigate();

  // 기본 정보 변경 드롭다운 상태
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    transport: [],
    departure: '',
    arrival: '',
    cargoType: [],
    cargoSize: '',
    departureDate: '',
    arrivalDate: '',
  });

    // 추천 조건 상태: 이제 추가서비스, 보험 종류, 운송비용 범위만 사용
    const [recommendation, setRecommendation] = useState({
        additionalServices: [],
        insurance: [],
        costRange: ""
    });

  // 다중 선택 토글 함수 (기본정보와 추천 조건 모두 사용)
  const toggleSelection = (field, value, isBasic = false) => {
    if (isBasic) {
      setBasicInfo((prev) => {
        const arr = prev[field];
        if (arr.includes(value)) {
          return { ...prev, [field]: arr.filter((item) => item !== value) };
        } else {
          return { ...prev, [field]: [...arr, value] };
        }
    });

    const handleReset = () => {
        setBasicInfo({
            transport: [],
            departure: "",
            arrival: "",
            cargoType: [],
            cargoSize: "",
            departureDate: "",
            arrivalDate: ""
        });
        setRecommendation({
            additionalServices: [],
            insurance: [],
            costRange: ""
        });
    };

    const navigateDetail = (id) => {
        navigate(`/forwarder/${id}`);
    };

    const handleReviewClick = (e, id) => {
        e.stopPropagation();
        navigate(`/forwarder/${id}/reviews`);
    };

    // 별 아이콘 렌더링 함수: rating을 반올림하여 ★ 문자열 생성
    const renderStars = (rating) => {
        const stars = Math.round(rating);
        return "★".repeat(stars);
    };

    return (
        <div>
            <Navbar />
            <div className="recommendation-page">
                {/* 기본 정보 변경 드롭다운 영역 */}
                <div className="basic-info-dropdown">
                    <button
                        className="dropdown-toggle"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        기본 정보 변경 | 고객님이 입력하신 정보를 바탕으로 표시합니다. {dropdownOpen ? "▲" : "▼"}
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            {/* 운송수단 */}
                            <div className="dropdown-row">
                                <span>운송수단:</span>
                                <div className="option-group">
                                    {["해상", "항공", "특송"].map((option) => (
                                        <span
                                            key={option}
                                            className={`option-item ${basicInfo.transport.includes(option) ? "selected" : ""}`}
                                            onClick={() => toggleSelection("transport", option, true)}
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* 출발지 */}
                            <div className="dropdown-row">
                                <span>출발지:</span>
                                <input
                                    type="text"
                                    value={basicInfo.departure}
                                    onChange={(e) =>
                                        setBasicInfo({ ...basicInfo, departure: e.target.value })
                                    }
                                    placeholder="출발지 입력"
                                />
                            </div>
                            {/* 도착지 */}
                            <div className="dropdown-row">
                                <span>도착지:</span>
                                <input
                                    type="text"
                                    value={basicInfo.arrival}
                                    onChange={(e) =>
                                        setBasicInfo({ ...basicInfo, arrival: e.target.value })
                                    }
                                    placeholder="도착지 입력"
                                />
                            </div>
                            {/* 화물종류 */}
                            <div className="dropdown-row">
                                <span>화물종류:</span>
                                <div className="option-group">
                                    {["일반", "냉장", "냉동"].map((option) => (
                                        <span
                                            key={option}
                                            className={`option-item ${basicInfo.cargoType.includes(option) ? "selected" : ""}`}
                                            onClick={() => toggleSelection("cargoType", option, true)}
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* 화물크기 및 무게 */}
                            <div className="dropdown-row">
                                <span>화물크기 및 무게:</span>
                                <div className="option-group">
                                    {["FCL", "LCL"].map((option) => (
                                        <span
                                            key={option}
                                            className={`option-item ${basicInfo.cargoSize === option ? "selected" : ""}`}
                                            onClick={() => setBasicInfo({ ...basicInfo, cargoSize: option })}
                                        >
                                            {option}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* 출발예정일 */}
                            <div className="dropdown-row">
                                <span>출발예정일:</span>
                                <input
                                    type="date"
                                    value={basicInfo.departureDate}
                                    onChange={(e) =>
                                        setBasicInfo({ ...basicInfo, departureDate: e.target.value })
                                    }
                                />
                            </div>
                            {/* 최소 도착 희망일 */}
                            <div className="dropdown-row">
                                <span>최소 도착 희망일:</span>
                                <input
                                    type="date"
                                    value={basicInfo.arrivalDate}
                                    onChange={(e) =>
                                        setBasicInfo({ ...basicInfo, arrivalDate: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* 검색 조건 영역 및 액션 버튼 영역 (전체 영역: 1200x300) */}
                <div className="search-condition-container">
                    {/* 조건 행 1: 추가서비스 */}
                    <div className="condition-row">
                        <div className="condition-title">추가서비스</div>
                        <div className="condition-item">
                            <input
                                type="text"
                                placeholder="추가서비스 입력"
                                value={recommendation.additionalServices.join(", ")}
                                onChange={(e) =>
                                    setRecommendation({
                                        ...recommendation,
                                        additionalServices: e.target.value.split(",").map(s => s.trim())
                                    })
                                }
                            />
                        </div>
                    </div>
                    {/* 조건 행 2: 보험 종류 */}
                    <div className="condition-row">
                        <div className="condition-title">보험 종류</div>
                        <div className="condition-item">
                            <input
                                type="text"
                                placeholder="보험 종류 입력"
                                value={recommendation.insurance.join(", ")}
                                onChange={(e) =>
                                    setRecommendation({
                                        ...recommendation,
                                        insurance: e.target.value.split(",").map(s => s.trim())
                                    })
                                }
                            />
                        </div>
                    </div>
                    {/* 조건 행 3: 운송비용 범위 */}
                    <div className="condition-row">
                        <div className="condition-title">운송비용 범위</div>
                        <div className="condition-item">
                            <input
                                type="text"
                                placeholder="예: 1000 ~ 5000"
                                value={recommendation.costRange}
                                onChange={(e) =>
                                    setRecommendation({ ...recommendation, costRange: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    {/* 액션 버튼 영역 */}
                    <div className="action-buttons">
                        <button className="reset-button" onClick={handleReset}>
                            초기화
                        </button>
                        <button
                            className="search-button"
                            onClick={() => navigate("/forwarder/search-results")}
                        >
                            검색
                        </button>
                    </div>
                </div>

                {/* 포워더 리스트 섹션 (통합 리스트) */}
                <div className="forwarder-list-section">
                    <div className="list-header">
                        <div className="col-index">순번</div>
                        <div className="col-company">포워더명</div>
                        <div className="col-departure">출발지<br />(출발 예정일)</div>
                        <div className="col-destination">도착지<br />(도착 예정지)</div>
                        <div className="col-capacity">최대 용량(kg)/<br />최대 부피(cbm)</div>
                        <div className="col-cost">운임 비용</div>
                        <div className="col-detail">상세보기</div>
                    </div>
                    {forwarders.map((fw, index) => (
                        <div key={fw.id} className="list-row">
                            <div className="col-index">{index + 1}</div>
                            <div className="col-company">{fw.companyName}</div>
                            <div className="col-departure">{fw.departure}</div>
                            <div className="col-destination">{fw.destination}</div>
                            <div className="col-capacity">{fw.capacity}</div>
                            <div className="col-cost">{fw.freightCost}</div>
                            <div className="col-detail">
                                <button onClick={() => navigate('/forwarder')}>상세보기</button>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
              {/* 출발예정일 */}
              <div className="dropdown-row">
                <span>출발예정일:</span>
                <input
                  type="date"
                  value={basicInfo.departureDate}
                  onChange={(e) =>
                    setBasicInfo({
                      ...basicInfo,
                      departureDate: e.target.value,
                    })
                  }
                />
              </div>
              {/* 최소 도착 희망일 */}
              <div className="dropdown-row">
                <span>최소 도착 희망일:</span>
                <input
                  type="date"
                  value={basicInfo.arrivalDate}
                  onChange={(e) =>
                    setBasicInfo({ ...basicInfo, arrivalDate: e.target.value })
                  }
                />
              </div>
            </div>
          )}

        {/* 검색 조건 영역 및 액션 버튼 영역 (전체 영역: 1200x300) */}
        <div className="search-condition-container">
          {/* 조건 행 1: 추가서비스 */}
          <div className="condition-row">
            <div className="condition-title">추가서비스</div>
            <div className="condition-item">
              <input
                type="text"
                placeholder="추가서비스 입력"
                value={recommendation.additionalServices.join(', ')}
                onChange={(e) =>
                  setRecommendation({
                    ...recommendation,
                    additionalServices: e.target.value
                      .split(',')
                      .map((s) => s.trim()),
                  })
                }
              />
            </div>
          </div>
          {/* 조건 행 2: 보험 종류 */}
          <div className="condition-row">
            <div className="condition-title">보험 종류</div>
            <div className="condition-item">
              <input
                type="text"
                placeholder="보험 종류 입력"
                value={recommendation.insurance.join(', ')}
                onChange={(e) =>
                  setRecommendation({
                    ...recommendation,
                    insurance: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
              />
            </div>
          </div>
          {/* 조건 행 3: 운송비용 범위 */}
          <div className="condition-row">
            <div className="condition-title">운송비용 범위</div>
            <div className="condition-item">
              <input
                type="text"
                placeholder="예: 1000 ~ 5000"
                value={recommendation.costRange}
                onChange={(e) =>
                  setRecommendation({
                    ...recommendation,
                    costRange: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {/* 액션 버튼 영역 */}
          <div className="action-buttons">
            <button className="reset-button" onClick={handleReset}>
              초기화
            </button>
            <button
              className="search-button"
              onClick={() => navigate('/forwarder/search-results')}
            >
              검색
            </button>
          </div>
        </div>

        {/* 포워더 리스트 섹션 (통합 리스트) */}
        <div className="forwarder-list-section">
          <div className="list-header">
            <div className="col-index">순번</div>
            <div className="col-company">포워더명</div>
            <div className="col-departure">
              출발지
              <br />
              (출발 예정일)
            </div>
            <div className="col-destination">
              도착지
              <br />
              (도착 예정지)
            </div>
            <div className="col-capacity">
              최대 용량(kg)/
              <br />
              최대 부피(cbm)
            </div>
            <div className="col-cost">운임 비용</div>
            <div className="col-detail">상세보기</div>
          </div>
          {forwarders.map((fw, index) => (
            <div key={fw.id} className="list-row">
              <div className="col-index">{index + 1}</div>
              <div className="col-company">{fw.companyName}</div>
              <div className="col-departure">{fw.departure}</div>
              <div className="col-destination">{fw.destination}</div>
              <div className="col-capacity">{fw.capacity}</div>
              <div className="col-cost">{fw.freightCost}</div>
              <div className="col-detail">
                <button onClick={() => navigateDetail(fw.id)}>상세보기</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForwarderRecommendation;
