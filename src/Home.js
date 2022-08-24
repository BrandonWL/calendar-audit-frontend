import React, { useEffect, useState } from "react";
import { axiosClient } from "./lib/axios-client";

export const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const response = axiosClient
      .get("api/calendar-audit/")
      .then((response) => console.log(`ASLKDASDK: ${response}`));
  });

  return <>{events}</>;
};
