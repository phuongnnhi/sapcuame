import axios from 'axios';

const apiService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,  // Replace with your backend URL
});

// Request Interceptor
apiService.interceptors.request.use(
    (request) => {
        console.log("Request:", request);
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        alert("An error occurred while processing your request.");
        return Promise.reject(error);
    }
);

export default apiService;