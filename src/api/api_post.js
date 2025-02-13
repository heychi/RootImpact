// src/api/api_post.js
// API 기본 URL은 환경 변수로 관리합니다 (.env 파일에 REACT_APP_API_URL=http://43.203.83.174 를 설정)
const BASE_URL = process.env.REACT_APP_API_URL;

export async function postAPI(endpoint, data) {
    const url = `${BASE_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API 호출 실패");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function signupShipper(formData) {
    const requestBody = {
        "userRole": "SHIPPER", // 고정값
        "email": formData.email,
        "password": formData.password,
        "companyName": formData.companyName,
        "companyContact": formData.phone,
        "companyAddress": formData.address,
        "companyImagePath": "",
        "businessRegistrationNumber": formData.businessNumber,
    };
    return await postAPI("/api/auth/signup", requestBody);
}

export async function signIn(formData) {
    const requestBody = {
        "email": formData.email,
        "password": formData.password,
        "userRole": formData.userRole
    };
    return await postAPI('/api/auth/signin', requestBody);
}

/**
 * 컨테이너 등록 API 호출 함수
 * @param {object} containerData - 컨테이너 정보 (Space.js의 상태)
 * @returns {Promise<object>} - 서버 응답 데이터
 */
export async function registerContainer(containerData) {
    // originDestination은 "출발지 - 도착지" 형식으로 가정하고 분리
    let departure = "";
    let destination = "";
    if (containerData.originDestination.includes("-")) {
        [departure, destination] = containerData.originDestination.split("-").map(s => s.trim());
    }

    const requestBody = {
        importExport: containerData.contractDetails.importExport || "", // 예: "IMPORT" 또는 "EXPORT"
        departure: departure,
        destination: destination,
        expectedDepartureDate: containerData.estimatedDate || "", // "2025-02-13" 형식
        expectedArrivalDate: containerData.estimatedDate || "",     // 별도의 입력이 없으므로 estimatedDate 사용
        insuranceTypes: containerData.contractDetails.insurance
            ? [containerData.contractDetails.insurance]
            : [],
        additionalServices: containerData.contractDetails.additionalInfo
            ? containerData.contractDetails.additionalInfo.split(",").map(s => s.trim())
            : [],
        maxWeight: 0, // 입력되지 않으므로 기본값 0
        maxVolume: 0, // 입력되지 않으므로 기본값 0
        cost: Number(containerData.freightCost) || 0,
    };

    return await postAPI("/api/container/register", requestBody);
}