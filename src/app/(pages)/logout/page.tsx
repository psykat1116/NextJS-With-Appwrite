"use client";
import appwriteService from "@/appwrite/config";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();

  useEffect(()=>{
    appwriteService.logoutUserAccount().then(()=>{
        setAuthStatus(false);
        router.replace("/login");
    })
  },[]);

  return <></>;
};

export default LogoutPage;
