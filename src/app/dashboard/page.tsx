"use client";
import CustomLineChart from "@/components/Charts/Line";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Dashboard = () => {
  const { sidebar } = useSelector((state: RootState) => state.theme);

  return (
    <Grid
      container
      sx={{
        marginLeft: sidebar === true ? "25px" : "90px",
      }}
    >
      <CustomLineChart />
    </Grid>
  );
};

export default Dashboard;
