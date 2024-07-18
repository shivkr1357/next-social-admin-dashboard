export const isAuthenticated = () => {
   const accessToken = localStorage.getItem("accessToken");
   const refreshToken = localStorage.getItem("refreshToken");

   if (accessToken && refreshToken) {
      return true;
   }

   return false;
};
