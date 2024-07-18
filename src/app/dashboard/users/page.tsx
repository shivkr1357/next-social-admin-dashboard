"use client";
import EnhancedTable from "@/components/CustomTable/Table";
import { isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Users = () => {
   const [accessTokenCheck, setAccessTokenCheck] = useState(
      localStorage.getItem("accessToken")
   );

   const router = useRouter();
   useEffect(() => {
      if (!isAuthenticated()) {
         setAccessTokenCheck("");
         router.push("/");
      }
   }, [accessTokenCheck]);

   return <EnhancedTable />;
};

export default Users;
