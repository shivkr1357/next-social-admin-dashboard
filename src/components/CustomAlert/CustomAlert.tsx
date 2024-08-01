import { Alert } from "@mui/material";
import React from "react";

const CustomAlert = ({ message, type }: any) => {
   console.log("Console. log");
   return (
      <Alert sx={{ zIndex: 999 }} severity={type}>
         {message}
      </Alert>
   );
};

export default CustomAlert;
