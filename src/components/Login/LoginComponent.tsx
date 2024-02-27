"use client";
import { Stack, Typography, styled } from "@mui/material";
import React from "react";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";

const LoginComponent = () => {
   const handleLogin = () => {
      console.log("Handle Login");
   };

   const CustomStack = styled(Stack, { name: "CustomStack", slot: "root" })(
      ({ theme }) => ({
         padding: "5px 10px",
         paddingTop: "3%",
         paddingBottom: "3%",
         height: "60%",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         backgroundColor: "white",
         borderRadius: "10px",
         [theme.breakpoints.up("xs")]: {
            width: "85%",
         },
         [theme.breakpoints.up("sm")]: {
            width: "60%",
         },
         [theme.breakpoints.up("md")]: {
            width: "35%",
         },
      })
   );

   return (
      <CustomStack>
         <CustomInput placeholder='User Name' />
         <CustomInput placeholder='Password' />
         <CustomButton name={"Login"} onPress={handleLogin} />
      </CustomStack>
   );
};

export default LoginComponent;
