"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/reducers/rootReducer";

interface Props {
  allowedRoles: number[];
}

const RoleGuard = ({ allowedRoles, children }: React.PropsWithChildren<Props>) => {
  const router = useRouter();
  const userRole = useSelector((state: RootState) => state.user?.user?.role);

  useEffect(() => {
    const hasAccess = userRole && allowedRoles.includes(userRole);
    if (!hasAccess) {
        if(userRole === 5) router.push("/support");
        else router.push("/dashboard");
    }
  }, [userRole, router, allowedRoles]);

  return allowedRoles.includes(userRole) ? <>{children}</> : null; 
};

export default RoleGuard;