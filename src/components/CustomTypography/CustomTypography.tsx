"use client";
import { Typography, styled } from "@mui/material";
import React from "react";

export default function CustomTypography({
   fontSize,
   title,
   color,
   weight,
}: any) {
   const CustomTypographyComp = styled(Typography, {
      name: "CustomTypographyComp",
      slot: "root",
   })(({ theme }) => ({
      fontSize: fontSize + "px",
      color: color,
      fontWeight: weight,
      [theme.breakpoints.up("xs")]: {
         width: "auto",
      },
   }));

   return <CustomTypographyComp>{title}</CustomTypographyComp>;
}
