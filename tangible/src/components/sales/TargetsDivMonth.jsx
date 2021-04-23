import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Line,
  LineChart,
  Tooltip,
  Legend,
} from "recharts";
import Button from "react-bootstrap/Button";
import * as FcIcons from "react-icons/fc";
import Paper from "@material-ui/core/Paper";
import CustomersApi from "../../apis/CustomersApi";
import DivisionsApi from "../../apis/DivisionsApi";
import { TooltipStyle } from "./TooltipStyle";
import "./sales.css";

const TargetsMonth = () => {
  const [allTargets, setAllTargets] = useState([]);
  const [divMonthTargets, setDivMonthTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gettingDivs, setGettingDivs] = useState(true);
  const [divisions, setDivisions] = useState([]);
  const [actuals, setActuals] = useState([]);
  const [gettingActuals, setGettingActuals] = useState(true);
  const [allActuals, setAllActuals] = useState([]);
  const [gettingAll, setGettingAll] = useState(true);
  const [gettingAllActuals, setGettingAllActuals] = useState(true);

  // get all targets
  useEffect(() => {
    async function getAllTargets() {
      await CustomersApi.get("/allTargetsMonth").then((res) => {
        setAllTargets(res.data.allTargetsMonth.rows[0]);
        setGettingAll(false);
      });
    }
    getAllTargets();
  }, []);

  // get divisional targets
  useEffect(() => {
    async function divMonthTargets() {
      await CustomersApi.get("/targetsDivMonth").then((res) => {
        setDivMonthTargets(res.data.targetsDivMonth.rows);
        setLoading(false);
      });
    }
    divMonthTargets();
  }, []);

  // get all divisions
  useEffect(() => {
    async function getDivisions() {
      await DivisionsApi.get("/").then((res) => {
        setDivisions(res.data.divisions.rows);
        setGettingDivs(false);
      });
    }
    getDivisions();
  }, []);

  // get all actuals
  useEffect(() => {
    async function getAllActuals() {
      await CustomersApi.get("/allActualsMonth").then((res) => {
        setAllActuals(res.data.allActualsMonth.rows);
        setGettingAllActuals(false);
      });
    }
    getAllActuals();
  }, []);

  // get divisional actuals
  useEffect(() => {
    async function getActuals() {
      await CustomersApi.get("/actualsDivMonth").then((res) => {
        setActuals(res.data.actualsDivMonth.rows);
        setGettingActuals(false);
      });
    }
    getActuals();
  }, []);

  // plot all
  function plotAll() {
    const modifiedAllActuals = allActuals.map((actual) => {
      return {
        month: months[actual.month - 1],
        actual: parseInt(actual.actual),
      };
    });
    const chartData = Object.keys(allTargets).map((key) => {
      return {
        month: key.toUpperCase(),
        target: parseInt(allTargets[key]) / 1000,
        actual:
          modifiedAllActuals.filter((row) => row.month === key).length &&
          modifiedAllActuals.filter((row) => row.month === key)[0].actual/1000,
      };
    });
    return chartData;
  }

  //plot divisions
  const plotDivMonth = (divName) => {
    const division = divMonthTargets.filter(
      (row) => row.division_name === divName
    )[0];

    const modifiedActuals = actuals.map((actual) => {
      return {
        division_name: actual.division_name,
        month: months[actual.month - 1],
        actual: parseInt(actual.actual),
      };
    });

    const actual = modifiedActuals.filter(
      (row) => row.division_name === divName
    );

    const divMonthData = Object.keys(division).map((key) => {
      return {
        month: key.toUpperCase(),
        target: parseInt(division[key] / 1000),
        actual:
          actual.filter((row) => row.month === key).length &&
          actual.filter((row) => row.month === key)[0].actual / 1000,
      };
    });

    const rowsWithoutDivision = divMonthData.filter(
      (row) => row.month !== "DIVISION_NAME"
    );

    return rowsWithoutDivision;
  };

  // function to calculate cumulative values
  function accumulate(row, column, array) {
    switch (array.indexOf(row)) {
      case 0:
        return array[0][column];
      case 1:
        return array[0][column] + array[1][column];
      case 2:
        return array[0][column] + array[1][column] + array[2][column];
      case 3:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column]
        );
      case 4:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column] +
          array[4][column]
        );
      case 5:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column] +
          array[4][column] +
          array[5][column]
        );
      case 6:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column] +
          array[4][column] +
          array[5][column] +
          array[6][column]
        );
      case 7:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column] +
          array[4][column] +
          array[5][column] +
          array[6][column] +
          array[7][column]
        );
      case 8:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column] +
          array[4][column] +
          array[5][column] +
          array[6][column] +
          array[7][column] +
          array[8][column]
        );
      case 9:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column] +
          array[4][column] +
          array[5][column] +
          array[6][column] +
          array[7][column] +
          array[8][column] +
          array[9][column]
        );
      case 10:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column] +
          array[4][column] +
          array[5][column] +
          array[6][column] +
          array[7][column] +
          array[8][column] +
          array[9][column] +
          array[10][column]
        );
      case 11:
        return (
          array[0][column] +
          array[1][column] +
          array[2][column] +
          array[3][column] +
          array[4][column] +
          array[5][column] +
          array[6][column] +
          array[7][column] +
          array[8][column] +
          array[9][column] +
          array[10][column] +
          array[11][column]
        );
      default: return null
    }
  }

  // plot all cumulative
  function plotAllCumulative() {
    const modifiedAllActuals = allActuals.map((actual) => {
      return {
        month: months[actual.month - 1],
        actual: parseInt(actual.actual),
      };
    });
    const chartData = Object.keys(allTargets).map((key) => {
      return {
        month: key.toUpperCase(),
        target: parseInt(allTargets[key]) / 1000,
        actual:
          modifiedAllActuals.filter((row) => row.month === key).length &&
          modifiedAllActuals.filter((row) => row.month === key)[0].actual/1000,
      };
    });
    const cumulative = chartData.map(monthRow => {
      return {
        month: monthRow.month,
        target: accumulate(monthRow, "target", chartData),
        actual: accumulate(monthRow, "actual", chartData), 
      }
    })
    return cumulative;
  }

  // plot cumulative (divisions)
  const plotCumulative = (divName) => {
    const division = divMonthTargets.filter(
      (row) => row.division_name === divName
    )[0];

    const modifiedActuals = actuals.map((actual) => {
      return {
        division_name: actual.division_name,
        month: months[actual.month - 1],
        actual: parseInt(actual.actual),
      };
    });

    const actual = modifiedActuals.filter(
      (row) => row.division_name === divName
    );

    const allRows = Object.keys(division).map((key) => {
      return {
        month: key.toUpperCase(),
        target: parseInt(division[key] / 1000),
        actual:
          actual.filter((row) => row.month === key).length &&
          actual.filter((row) => row.month === key)[0].actual / 1000,
      };
    });

    const rowsWithoutDivision = allRows.filter(
      (row) => row.month !== "DIVISION_NAME"
    );

    const lineChartData = rowsWithoutDivision.map((monthRow) => {
      return {
        month: monthRow.month,
        target: accumulate(monthRow, "target", rowsWithoutDivision),
        actual: accumulate(monthRow, "actual", rowsWithoutDivision),
      };
    });
    return lineChartData;
  };

  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  if (
    !loading &&
    !gettingDivs &&
    !gettingActuals &&
    !gettingAll &&
    !gettingAllActuals
  ) {
    return (
      <div className="container" id="target-div-month">
        <div className="row justify-content-center align-items-center mb-2">
          <h5 className="mr-5" style={{ fontWeight: "bold" }}>
            Displaying targets by Division{" "}
          </h5>
          <em>
            <h5 className="mr-3" style={{ fontWeight: "bold", color: "brown" }}>
              {" "}
              View instead by :{" "}
            </h5>
          </em>
          <Link to="/sales/target/month">
            <FcIcons.FcCalendar
              id="sales-target-icon"
              size={35}
              title="Month"
            />
          </Link>
          <Link to="/sales/target/region">
            <FcIcons.FcGlobe id="sales-target-icon" size={35} title="Region" />
          </Link>
          <Link to="/sales/target/staff">
            <FcIcons.FcBusinesswoman
              id="sales-target-icon"
              size={35}
              title="Salesperson"
            />
          </Link>
          <Link to="/sales/target">
            <Button className="btn-sm ml-5" variant="info">
              Back
            </Button>
          </Link>
        </div>
        <div className="row">
          <Paper
            elevation={5}
            id="target-divmonth-bar"
            style={{ backgroundColor: "#E0F7F4" }}
          >
            <h6 id="div-target-title">ALL DIVISIONS - Monthwise (USD '000)</h6>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart margin={{ top: 0 }} data={plotAll()}>
                <XAxis dataKey="month" tickLine={false} />
                <YAxis />
                <Bar dataKey="target" fill="#F4A261" />
                <Bar dataKey="actual" fill="#2A9D8F" />
                <Legend />
                <Tooltip
                  contentStyle={TooltipStyle}
                  cursor={{ fill: "#2A9D8F", opacity: "0.2" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
          <Paper
            elevation={5}
            id="target-divmonth-bar"
            style={{ backgroundColor: "#E0F7F4" }}
          >
            <h6 id="div-target-title">ALL DIVISIONS - Cumulative (USD '000)</h6>
            <ResponsiveContainer width="99%" height="80%">
              <LineChart margin={{ top: 0 }} data={plotAllCumulative()}>
                <XAxis dataKey="month" tickLine={false} scale="band"/>
                <YAxis />
                <Line dataKey="target" stroke="#F4A261" strokeWidth={2}/>
                <Line dataKey="actual" stroke="#2A9D8F" strokeWidth={2}/>
                <Legend />
                <Tooltip
                  contentStyle={TooltipStyle}
                  cursor={{ fill: "#2A9D8F", opacity: "0.2" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </div>
        {divisions.map((div) => {
          return (
            <div className="row">
              <Paper elevation={5} id="target-divmonth-bar">
                <h6 id="div-target-title">
                  {div.division_name} - Monthwise (USD '000)
                </h6>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart
                    margin={{ top: 0 }}
                    data={plotDivMonth(div.division_name)}
                  >
                    <XAxis dataKey="month" tickLine={false} />
                    <YAxis />
                    <Bar dataKey="target" fill="#F4A261" />
                    <Bar dataKey="actual" fill="#2A9D8F" />
                    <Legend />
                    <Tooltip
                      contentStyle={TooltipStyle}
                      cursor={{ fill: "#2A9D8F", opacity: "0.2" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
              <Paper elevation={5} id="target-divmonth-bar">
                <h6 id="div-target-title">
                  {div.division_name} - Cumulative (USD '000)
                </h6>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart
                    margin={{ top: 0 }}
                    data={plotCumulative(div.division_name)}
                  >
                    <XAxis dataKey="month" tickLine={false} scale="band" />
                    <YAxis />
                    <Line dataKey="target" stroke="#F4A261" strokeWidth={2} />
                    <Line dataKey="actual" stroke="#2A9D8F" strokeWidth={2} />
                    <Legend />
                    <Tooltip
                      contentStyle={TooltipStyle}
                      cursor={{ fill: "#2A9D8F", opacity: "0.2" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Fetching data...</div>;
  }
};

export default TargetsMonth;
