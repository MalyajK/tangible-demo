import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const SummaryChart = (props) => {
  
  const {customerId} = props;

  function chartData (customerId) {
    return  {
      'data': [
        {
          'name': "Target",
          'value': parseInt(customerId.row.original.target),
          'fill': "#E76F51",  
        },
        {
          'name': "Actual",
          'value': parseInt(customerId.row.original.actual),
          'fill': "#E9C46A",  
        },
        {
          'name': "Collected",
          'value': parseInt(customerId.row.original.collected),
          'fill': "#2A9D8F",  
        },
      ]
    }
  }

  return (
    <BarChart width={170} height={100} data={chartData(customerId).data}>
      <XAxis dataKey="name" tick={{display:"none"}}/>
      <Tooltip />
      <Bar dataKey="value" fill="fill"/>
    </BarChart>
  );
};

export default SummaryChart;
