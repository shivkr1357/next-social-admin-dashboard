import { TextField } from "@mui/material";
import React from "react";

const CustomInput = ({ placeholder }: any) => {
   return (
      <TextField
         sx={{ width: "80%", padding: "10px" }}
         placeholder={placeholder}
      />
   );
};

export default CustomInput;
