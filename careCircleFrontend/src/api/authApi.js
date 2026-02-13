import api from "./api";

export async function login(email, password, role) {
    const response = await api.post("/auth/login", { email, password, role });
    return response.data;
}

export async function forgotPassword(email, role) {
    const response = await api.post("/auth/forgot-password", { email, role });
    return response.data;
}

export async function resetPassword(email, otp, newPassword, role) {
    const response = await api.post("/auth/reset-password", { email, otp, newPassword, role });
    return response.data;
}

export async function verifyAccount(email, otp, role) {
    const response = await api.post("/auth/verify-account", { email, otp, role });
    return response.data;
}

export async function register(email, password, role) {
    const response = await api.post("/auth/register", { email, password, role });
    return response.data;
}
