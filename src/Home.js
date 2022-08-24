import React, { useEffect, useState } from "react";
import { axiosClient } from "./lib/axios-client";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
];

export const Home = () => {
  const [events, setEvents] = useState([]);
  const [totalTimePastThreeMonthsData, setTotalTimePastThreeMonthsData] =
    useState([]);
  const [insightsData, setInsightsData] = useState({});
  useEffect(() => {
    const response = axiosClient
      .get("api/calendar-audit/")
      .then((response) => response);
    const response2 = axiosClient.get("api/insights/").then((response) => {
      setInsightsData(response.data);
      setTotalTimePastThreeMonthsData(
        response.data.totalTimePastThreeMonths.map((x) => ({
          name: x.month,
          uv: x.total_time,
        }))
      );
    });
    console.log(totalTimePastThreeMonthsData);
  }, []);

  return (
    <>
      <BarChart width={400} height={200} data={totalTimePastThreeMonthsData}>
        <XAxis dataKey="name" />
        <YAxis />

        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
      <h1>
        Month with most meetings: {insightsData?.month_with_most_meetings}
      </h1>
      <h1>
        Busiest week (most meetings) = Month:{" "}
        {Math.floor(insightsData?.busiestWeek * 0.229984)} Week:{" "}
        {Math.floor(((insightsData?.busiestWeek * 0.229984) % 1) * 4) + 1}
      </h1>
    </>
  );
};
