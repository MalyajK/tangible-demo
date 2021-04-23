import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";
import { DepCompData } from "./DeptCompletion";
import { TooltipStyle } from "./TooltipStyle";
import { COLORS } from "./Colors";
import "../dashboard.css";

const CustomizedLabel = (props) => {
  const { x, y, value} = props;
  return (
    <text
      x={x}
      y={y}
      dx={10}
      dy={30}
      textAnchor=""
      fill="white"
    >
      {value}
    </text>
  );
};

const DepCompChart = () => {
  return (
    <div className="column col-md-6" id="dep-goal-comp">
      <p id="dash-chart-title">Department Wise Goal Completion</p>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={DepCompData} title="All Goals">
          <CartesianGrid vertical={false} />
          <Tooltip contentStyle={TooltipStyle} />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis unit="%" tickLine={false} />
          <Line type="natural" dataKey="Target" stroke="brown" />
          <Bar dataKey="Actual" label={CustomizedLabel}>
            {DepCompData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepCompChart;
