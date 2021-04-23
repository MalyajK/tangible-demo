import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {RevenueData} from './RevenueData';
import { TooltipStyle } from "./TooltipStyle";
import "../dashboard.css";

const RevenueChart = () => {
  return (
    <div className="column col-md-6" id="revenue">
      <p id="dash-chart-title">Revenue</p>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={RevenueData} title="All Goals">
          <CartesianGrid stroke="lightgrey" strokeDasharray="2 2" />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis unit="%" tickLine={false} />
          <Tooltip contentStyle={TooltipStyle} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px", paddingLeft: "20px" }}
          />
          <Area
            type="natural"
            dataKey="Target"
            stroke="orange"
            fill="orange"
          />
          <Area type="natural" dataKey="Actual" stroke="teal" fill="teal" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart
