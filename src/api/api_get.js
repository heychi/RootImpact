// src/api/api_get.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://43.203.83.174';

/**
 * GET 요청을 수행하는 함수
 * @param {string} endpoint - API 엔드포인트 (예: '/api/container/search')
 * @param {object} params - 쿼리 파라미터 객체
 * @returns {Promise<object>} - 응답 데이터 (JSON)
 */
export async function getAPI(endpoint, params) {
    // 배열은 콤마로 join, 나머지는 그대로
    const queryParams = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            if (Array.isArray(value)) {
                acc[key] = value.join(",");
            } else {
                acc[key] = value;
            }
            return acc;
        }, {})
    ).toString();

    const url = `${BASE_URL}${endpoint}?${queryParams}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "검색 API 호출 실패");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * 컨테이너 검색 API 호출 함수
 * @param {object} searchInfo - 검색 조건 객체
 * @returns {Promise<object[]>} - 검색 결과 배열
 */
export async function searchContainer(searchInfo) {
    return await getAPI("/api/container/search", searchInfo);
}
