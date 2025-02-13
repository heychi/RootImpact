// src/api/api_post.js
export async function postAPI(endpoint, data) {
    const baseUrl = process.env.REACT_APP_API_URL;
    const url = `${baseUrl}${endpoint}`; // 예: "/auth/shipper/signup"

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
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        businessRegistrationNumber: formData.businessNumber,
        companyContact: formData.phone,
        companyAddress: formData.address,
    };

    return await postAPI("/auth/shipper/signup", requestBody);
}
