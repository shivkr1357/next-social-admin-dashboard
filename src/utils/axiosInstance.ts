import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
   baseURL: "http://localhost:5000/api/v1",
});

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
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         try {
            const response = await axiosInstance.post("/auth/verifyToken", {
               refreshToken: localStorage.getItem("refreshToken"),
            });
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
         } catch (error) {
            console.error("Refresh token expired", error);
            // Handle token refresh failure (e.g., logout user)
            return Promise.reject(error);
         }
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;
