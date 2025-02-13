// src/api/api.js

// .env 파일에 REACT_APP_API_URL=<서버주소> 형태로 설정
// 설정이 없으면 기본값은 http://43.203.83.174
const BASE_URL = process.env.REACT_APP_API_URL || "http://43.203.83.174";

/**
 * 공통 요청 함수:
 * - HTTP 메서드와 인증 필요 여부 등을 파라미터로 받음
 * - fetch 사용, 응답 에러 처리 (response.ok 체크)
 * - 오류 발생 시 서버가 반환하는 JSON을 파싱해 에러 메시지 추출
 */
async function requestAPI(method, endpoint, data = null, isAuthNeeded = false) {
  const url = `${BASE_URL}${endpoint}`;

  // 공통 헤더 설정
  const headers = { "Content-Type": "application/json" };

  // 인증이 필요한 경우 Bearer 토큰 추가
  if (isAuthNeeded) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  // fetch 설정
  const config = { method, headers };
  if (data) config.body = JSON.stringify(data);

  // 실제 요청
  const response = await fetch(url, config);

  // 응답 에러 처리
  if (!response.ok) {
    let errorMsg = "API Error";
    try {
      const errData = await response.json();
      errorMsg = errData.message || errorMsg;
    } catch (e) {
      // 응답이 JSON이 아닐 경우 기본 메시지 사용
    }
    throw new Error(errorMsg);
  }

  // 정상 응답이면 JSON 반환
  return await response.json();
}

/**
 * 메서드별 래핑 함수
 * - 필요 시 PATCH, DELETE 등 추가
 */
export function getAPI(endpoint, auth = false) {
  return requestAPI("GET", endpoint, null, auth);
}

export function postAPI(endpoint, data, auth = false) {
  return requestAPI("POST", endpoint, data, auth);
}

export function putAPI(endpoint, data, auth = false) {
  return requestAPI("PUT", endpoint, data, auth);
}

// 필요에 따라 추가 가능
// export function patchAPI(endpoint, data, auth = false) {
//   return requestAPI("PATCH", endpoint, data, auth);
// }
// export function deleteAPI(endpoint, auth = false) {
//   return requestAPI("DELETE", endpoint, null, auth);
// }

/* ---------------------------------------
   아래부터 각 API 엔드포인트별 함수들
---------------------------------------- */

/**
 * 1. 화주 회원가입
 */
export async function signupShipper(formData) {
  const body = {
    userRole: "SHIPPER",
    email: formData.email,
    password: formData.password,
    companyName: formData.companyName,
    companyContact: formData.phone,
    companyAddress: formData.address,
    companyImage: "",
    registerBusinessNumber: formData.businessNumber,
  };
  return postAPI("/auth/signup", body);
}

/**
 * 2. 로그인
 *  - 성공 시 토큰을 localStorage에 저장
 */
export async function signIn(formData) {
  const body = { email: formData.email, password: formData.password };
  const res = await postAPI("/auth/signin", body);
  if (res?.token) localStorage.setItem("token", res.token);
  return res;
}

/**
 * 3. 컨테이너 검색 (화주)
 */
export async function searchContainer(data) {
  return postAPI("/container/search", data, true); // 인증 필요
}

/**
 * 4. 컨테이너 등록 (포워더)
 */
export async function registerContainer(data) {
  return postAPI("/container/register", data, true);
}

/**
 * 5. 컨테이너 개별 조회 (화주)
 */
export async function getContainer(id) {
  return getAPI(`/container/${id}`, true);
}

/**
 * 6. 1:1 채팅방 생성/조회
 */
export async function createChatRoom(otherUserId) {
  return postAPI(`/chat/rooms?otherUserId=${otherUserId}`, null, true);
}

/**
 * 7. 로그인한 사용자의 채팅방 목록
 */
export async function getChatRooms() {
  return getAPI("/chat/rooms", true);
}

/**
 * 8. 특정 채팅방 메시지 조회
 */
export async function getChatMessages(chatRoomId) {
  return getAPI(`/chat/rooms/${chatRoomId}/messages`, true);
}

/**
 * 9. 계약 요청 (화주)
 */
export async function requestContract(contractData) {
  return postAPI("/contract", contractData, true);
}

/**
 * 10. 특정 계약 정보 조회
 */
export async function getContract(contractId) {
  return getAPI(`/contract/${contractId}`, true);
}

/**
 * 11. 특정 계약의 AIS 정보 조회
 */
export async function getAis(contractId) {
  return getAPI(`/contract/ais/${contractId}`, true);
}

/**
 * 12. 로그인한 유저(화주)의 모든 계약
 */
export async function getMyContracts() {
  return getAPI("/contract/my-contracts", true);
}

/**
 * 13. 계약 상태별 조회 (포워더)
 */
export async function getContractsByStatus(contractStatus) {
  return getAPI(`/contract/status/${contractStatus}`, true);
}

/**
 * 14. 특정 계약 상태 변경 (포워더)
 */
export async function updateContractStatus(contractId, contractStatus) {
  return putAPI(`/contract/${contractId}/status?contractStatus=${contractStatus}`, null, true);
}
