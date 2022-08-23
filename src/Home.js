import React, { useEffect } from "react";
import { axiosClient } from "./lib/axios-client";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const [searchParams, setSearchParams] = useSearchParams();
  const authorizationCode = searchParams.get("code");

  useEffect(() => {
    if (authorizationCode != null) {
      // aditional checks if token is in local storage etc
      axiosClient.post("/api/calendar-audit/", { code: authorizationCode });
    }
  });
  const login = () => {
    window.location.replace(
      `https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=auto&client_id=${clientId}&response_type=code&scope=https://www.googleapis.com/auth/calendar.readonly&redirect_uri=http://localhost:3000`
    );
  };

  return <button onClick={login}>Activate Lasers</button>;
};
