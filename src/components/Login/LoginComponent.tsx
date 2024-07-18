"use client";
import { Stack, styled, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import CustomTypography from "../CustomTypography/CustomTypography";
import { getUser, loginUser } from "@/app/redux/actions/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authActions } from "@/app/redux/reducers/auth";

const CustomStack = styled(Stack)(({ theme }) => ({
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
}));

const LoginComponent = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const router = useRouter();
   const dispatch = useDispatch();

   const handleLogin = async () => {
      await loginUser({ email: email, password: password })
         .then(async (res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            await getUser(email)
               .then((response) => {
                  dispatch(authActions.setCurrentUser(response.data.user));
                  router.push("/dashboard/users");
               })
               .catch((error) => {
                  console.log(error);
               });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleChange = useCallback(
      (
         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
         name: string
      ) => {
         if (name === "email") {
            setEmail(e.target.value);
         } else if (name === "password") {
            setPassword(e.target.value);
         }
      },
      []
   );

   useEffect(() => {
      if (localStorage.getItem("accessToken")) {
         return router.push("/dashboard/users");
      }
   }, []);

   return (
      <CustomStack>
         <CustomTypography
            title='Admin Login'
            fontSize={30}
            color='#333'
            weight='bold'
         />
         <TextField
            sx={{ width: "80%", padding: "10px" }}
            placeholder={"User Name"}
            name='email'
            value={email}
            onChange={(e) => {
               handleChange(e, "email");
            }}
         />
         <TextField
            sx={{ width: "80%", padding: "10px" }}
            placeholder={"Password"}
            name='password'
            type='password'
            value={password}
            onChange={(e) => {
               handleChange(e, "password");
            }}
         />
         <CustomButton name='Login' onPress={handleLogin} />
      </CustomStack>
   );
};

export default LoginComponent;
