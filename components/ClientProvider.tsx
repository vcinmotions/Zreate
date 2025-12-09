"use client";

import { setAuth } from "@/store/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      console.log("teh data we get is ", data);
      if (data.user) {
        dispatch(setAuth({ token: data.token, user: data.user }));
      }
    };
    fetchUser();
  }, [dispatch]);

  return <>{children}</>;
}
