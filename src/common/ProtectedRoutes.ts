import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const isBrowser = () => typeof window !== "undefined";

export const ProtectedRoutes = ({ router, children }: any) => {
  const { status, data: session } = useSession();
  
  const route = useRouter();

  useEffect(() => {
    if (
      isBrowser() &&
      status === "unauthenticated" &&
      route.asPath !== "/"
    ) {
      router.push("/");
    } 
  }, [ route.asPath, router, session, status]);

  return children;
};