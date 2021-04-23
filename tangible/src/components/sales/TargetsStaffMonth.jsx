import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
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
import Button from 'react-bootstrap/Button';
import * as FcIcons from "react-icons/fc";
import Paper from "@material-ui/core/Paper";
import CustomersApi from "../../apis/CustomersApi";
import UsersApi from "../../apis/UsersApi";
import { TooltipStyle } from "./TooltipStyle";
import "./sales.css";

const TargetsStaffMonth = () => {
  const [staffMonthTargets, setStaffMonthTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gettingStaff, setGettingStaff] = useState(true);
  const [staff, setStaff] = useState([]);
  const [actuals, setActuals] = useState([]);
  const [gettingActuals, setGettingActuals] = useState(true);

  useEffect(() => {
    async function staffMonthTargets() {
      CustomersApi.get("/targetsStaffMonth").then((res) => {
        setStaffMonthTargets(res.data.targetsStaffMonth.rows);
        setLoading(false);
      });
    }
    staffMonthTargets();
  }, []);

  useEffect(() => {
    async function getStaff() {
      UsersApi.get("/sales").then((res) => {
        setStaff(res.data.sales.rows);
        setGettingStaff(false);
      });
    }
    getStaff();
  }, []);

  useEffect(() => {
    async function getActuals() {
      CustomersApi.get("/actualsStaffMonth").then((res) => {
        setActuals(res.data.actualsStaffMonth.rows);
        setGettingActuals(false);
      });
    }
    getActuals();
  }, []);

  const plotStaffMonth = (salesPerson) => {
    const person = staffMonthTargets.filter(
      (row) => row.full_name === salesPerson
    )[0];

    const modifiedActuals = actuals.map((actual) => {
      return {
        sales_person: actual.full_name,
        month: months[actual.month - 1],
        actual: parseInt(actual.actual),
      };
    });

    const actual = modifiedActuals.filter(
      (row) => row.sales_person === salesPerson
    );

    const staffMonthData = Object.keys(person).map((key) => {
      return {
        month: key.toUpperCase(),
        target: parseInt(person[key] / 1000),
        actual:
          actual.filter((row) => row.month === key).length &&
          actual.filter((row) => row.month === key)[0].actual / 1000,
      };
    });

    const rowsWithoutStaff = staffMonthData.filter(
      (row) => row.month !== "FULL_NAME"
    );

    return rowsWithoutStaff;
  };

  const plotCumulative = (salesPerson) => {
    const person = staffMonthTargets.filter(
      (row) => row.full_name === salesPerson
    )[0];

    const modifiedActuals = actuals.map((actual) => {
      return {
        sales_person: actual.full_name,
        month: months[actual.month - 1],
        actual: parseInt(actual.actual),
      };
    });

    const actual = modifiedActuals.filter(
      (row) => row.sales_person === salesPerson
    );

    const allRows = Object.keys(person).map((key) => {
      return {
        month: key.toUpperCase(),
        target: parseInt(person[key] / 1000),
        actual:
          actual.filter((row) => row.month === key).length &&
          actual.filter((row) => row.month === key)[0].actual / 1000,
      };
    });

    const rowsWithoutStaff = allRows.filter((row) => row.month !== "FULL_NAME");

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

    const lineChartData = rowsWithoutStaff.map((monthRow) => {
      return {
        month: monthRow.month,
        target: accumulate(monthRow, "target", rowsWithoutStaff),
        actual: accumulate(monthRow, "actual", rowsWithoutStaff),
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

  if (!loading && !gettingStaff && !gettingActuals) {
    return (
      <div className="container" id="target-div-month">
        <div className="row justify-content-center align-items-center mb-2">
          <h5 className="mr-5" style={{fontWeight:"bold"}}>Displaying targets by Staff </h5>
          <em><h5 className="mr-3" style={{fontWeight:"bold", color:"brown"}}> View instead by : </h5></em>
          <Link to="/sales/target/division"><FcIcons.FcFactory id="sales-target-icon" size={35} title="Division"/></Link>
          <Link to="/sales/target/month"><FcIcons.FcCalendar id="sales-target-icon" size={35} title="Month"/></Link>
          <Link to="/sales/target/region"><FcIcons.FcGlobe id="sales-target-icon" size={35} title="Region"/></Link>
          <Link to="/sales/target"><Button className="btn-sm ml-5" variant="info">Back</Button></Link>
        </div>
        {staff.map((eachStaff) => {
          return (
            <div className="row">
              <Paper elevation={5} id="target-divmonth-bar">
                <h6 id="div-target-title">
                  {eachStaff.full_name} - Monthwise (USD '000)
                </h6>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart
                    margin={{ top: 0 }}
                    data={plotStaffMonth(eachStaff.full_name)}
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
                  {eachStaff.full_name} - Cumulative (USD '000)
                </h6>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart
                    margin={{ top: 0 }}
                    data={plotCumulative(eachStaff.full_name)}
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
        ;
      </div>
    );
  } else {
    return <div>Fetching data...</div>;
  }
};

export default TargetsStaffMonth;
