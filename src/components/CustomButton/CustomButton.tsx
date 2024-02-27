import { Button, styled } from "@mui/material";
import React from "react";

export default function CustomButton({ onPress, name }: any) {
   const CustomButtonComp = styled(Button, {
      name: "CustomButtonComp",
      slot: "root",
   })(({ theme }) => ({
      backgroundColor: "#ff6b6b",
      color: "white",
      width: "80%",
      [theme.breakpoints.up("xs")]: {
         width: "80%",
      },
      [theme.breakpoints.up("sm")]: {
         width: "80%",
      },
      [theme.breakpoints.up("md")]: {
         width: "80%",
      },
   }));

   return (
      <CustomButtonComp
         onClick={onPress}
         style={{
            backgroundColor: "#ff6b6b",
            color: "white",
            width: "80%",
            marginTop: "20px",
         }}
      >
         {name}
      </CustomButtonComp>
   );
}
