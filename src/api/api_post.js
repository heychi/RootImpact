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
        "userRole": "SHIPPER", // 고정값
    };
    return await postAPI('/api/auth/signin', requestBody);
}