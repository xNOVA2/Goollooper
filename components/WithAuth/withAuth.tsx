"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

import { RootState } from "@/store/reducers/rootReducer";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent: React.FC<P> = (props) => {
    const isAuthenticated = useSelector(
      (state: RootState) => state.userReducer.user !== null
    );
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/");
      } else if (pathname === "/") {
        router.push("/dashboard");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return AuthComponent;
};

export default withAuth;
