import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";
import { ChartData } from "./ChartData";

const TaskCharts = (props) => {
  
  const {user_id} = props;
  const index = ChartData.findIndex(row => row.userId === user_id)
  console.log(index);
  
  if (index >=0 ) {
    return (
      <BarChart width={150} height={120} data={ChartData[index].data}>
        <XAxis dataKey="name" tick={{display:"none"}}/>
        <Tooltip />
        <Bar dataKey="value" fill="fill"/>
      </BarChart>
    );
  } else {return (<div>No data available</div>)}
};

export default TaskCharts;
