import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // Gateway address
});

// Request Interceptor: Add Token to Header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
}

// Response Interceptor: Handle 401 and Refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        const originalRequest = config;

        // If error is 401 and we haven't retried yet
        if (response?.status === 401 && originalRequest && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    // Use a clean axios instance for refresh to avoid interceptor loops
                    const res = await axios.post("http://localhost:8080/auth/refresh-token", {
                        refreshToken: refreshToken
                    });

                    if (res.status === 200) {
                        const { accessToken, refreshToken: newRefreshToken } = res.data;

                        localStorage.setItem("token", accessToken);
                        if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

                        isRefreshing = false;
                        onRefreshed(accessToken);

                        // Retry original request
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    isRefreshing = false;
                    // Logout user
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("role");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            } else {
                isRefreshing = false;
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
