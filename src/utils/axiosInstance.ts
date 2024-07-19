import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Flag to indicate whether a token refresh is in progress
let isRefreshing = false;
let refreshSubscribers: any[] = [];

// Function to add subscribers to the queue
function subscribeTokenRefresh(cb: any) {
  refreshSubscribers.push(cb);
}

// Function to notify all subscribers
function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
}

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response.status === 403 && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true;
        isRefreshing = true;
        try {
          const verifyResponse = await axiosInstance.post("/auth/verifyToken", {
            refreshToken: localStorage.getItem("refreshToken"),
          });
          const { accessToken } = verifyResponse.data;
          localStorage.setItem("accessToken", accessToken);
          isRefreshing = false;
          onRefreshed(accessToken);
          refreshSubscribers = [];
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.error("Refresh token expired", error);
          isRefreshing = false;
          refreshSubscribers = [];
          // Handle token refresh failure (e.g., logout user)
          return Promise.reject(error);
        }
      } else {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
