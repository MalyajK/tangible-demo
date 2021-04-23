import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
import { TooltipStyle } from "./TooltipStyle";
import "../dashboard.css";

const ProfitChart = () => {
  const [data, setData] = useState([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      await axios
        .get("https://api.apispreadsheets.com/data/9058/")
        .then((response) => {
          setLoading(false);
          setData(response.data.data.slice(0,12))
        });
    }
    getData();
  }, []);

  return (
    <div className="column col-md-6" id="profit">
      <p id="dash-chart-title">Profit</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} title="All Goals">
          <CartesianGrid stroke="lightgrey" strokeDasharray="2 2" />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis unit="" tickLine={false}/>
          <Tooltip contentStyle={TooltipStyle} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ paddingTop: "10px", paddingLeft: "20px" }}
          />
          <Line type="natural" dataKey="Target" stroke="orange" />
          <Line type="natural" dataKey="Actual" stroke="teal" fill="teal" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProfitChart;
