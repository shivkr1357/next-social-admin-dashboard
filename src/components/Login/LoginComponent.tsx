import { Stack, Typography, styled } from "@mui/material";
import React from "react";
import CustomInput from "../CustomInput/CustomInput";

const LoginComponent = () => {
   return (
      <Stack
         sx={{
            padding: "5px 10px",
            paddingTop: "3%",
            paddingBottom: "3%",
            width: "30%",
            height: "60%",
            border: "1px solid red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "10px",
         }}
      >
         <Typography>Login</Typography>
         <CustomInput placeholder='User Name' />
         <CustomInput placeholder='Password' />
      </Stack>
   );
};

export default LoginComponent;
