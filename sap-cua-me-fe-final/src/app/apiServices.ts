import axios from 'axios';

const apiService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL, 
});

// Prevent multiple refresh calls at once
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to refresh token
const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) return null;

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh-token`, {
            token: storedRefreshToken,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("token", newAccessToken);

        // Notify all waiting requests to use the new token
        refreshSubscribers.forEach((callback) => callback(newAccessToken));
        refreshSubscribers = [];

        return newAccessToken;
    } catch (error) {
        console.error("Refresh token failed:", error);
        handleLogout(); // If refresh fails, force logout
        return null;
    }
};

// Function to force logout if refresh fails
const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Redirect to login page
};

// Request Interceptor: Attach token to all requests
apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor: Handle 401 (expired token)
apiService.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If request fails due to an expired token (401)
        if (error.response?.status === 401 && error.response.data.message === "Token expired, please refresh") {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const newAccessToken = await refreshToken();
                    isRefreshing = false;

                    if (!newAccessToken) {
                        return Promise.reject(error);
                    }

                    // Retry the original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiService(originalRequest);
                } catch (refreshError) {
                    isRefreshing = false;
                    return Promise.reject(refreshError);
                }
            }

            return new Promise((resolve) => {
                refreshSubscribers.push((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    resolve(apiService(originalRequest));
                });
            });
        }

        // If the error is still 401 (invalid token), force logout
        if (error.response?.status === 401) {
            console.error("Unauthorized: Invalid token. Logging out.");
            handleLogout();
        }

        return Promise.reject(error);
    }
);

export default apiService;