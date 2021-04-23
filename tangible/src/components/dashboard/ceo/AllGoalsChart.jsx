import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { AllGoalsData } from "./AllGoalsData";
import { TooltipStyle } from "./TooltipStyle";
import "../dashboard.css";

const AllGoalsChart = () => {
  return (
    <div className="column col-md-6" id="all-goals">
      <p id="dash-chart-title">All Goals</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={AllGoalsData} title="All Goals">
          <CartesianGrid stroke="lightgrey" strokeDasharray="2 2" />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis unit="%" tickLine={false} />
          <Tooltip contentStyle={TooltipStyle} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px", paddingLeft: "20px" }}
          />
          <Line
            type="natural"
            dataKey="Target"
            stroke="orange"
          />
          <Line type="natural" dataKey="Actual" stroke="teal"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllGoalsChart;
