"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/reducers/rootReducer";

export const useAuth = (redirectPath: string) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.user.user !== null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, router, redirectPath]);

  return isAuthenticated;
};
