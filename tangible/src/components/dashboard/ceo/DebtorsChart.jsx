import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, Pie, PieChart, Tooltip, Legend, Cell } from "recharts";
import { TooltipStyle } from "./TooltipStyle";
import { COLORS } from "./Colors";
import "../dashboard.css";

  const DebtorsChart = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get("https://api.apispreadsheets.com/data/9418/")
        .then((response) => {
          setData(response.data.data);
        });
    }
    getData();
  }, []);

  return (
    <div className="column col-md-6" id="debtors">
      <p id="dash-chart-title">Debtors Ageing</p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            label={true}
            innerRadius={40}
            dataKey="Amount"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip contentStyle={TooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DebtorsChart;
