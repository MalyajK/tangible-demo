import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import Button from "react-bootstrap/Button";
import * as FcIcons from "react-icons/fc";
import Paper from "@material-ui/core/Paper";
import CustomersApi from "../../apis/CustomersApi";
import { TooltipStyle } from "./TooltipStyle";
import "./sales.css";

const TargetsMonth = () => {
  const [divTargets, setDivTargets] = useState([]);
  const [staffTargets, setStaffTargets] = useState([]);
  const [regionTargets, setRegionTargets] = useState([]);
  const [gettingDivs, setGettingDivs] = useState(true);
  const [gettingStaff, setGettingStaff] = useState(true);
  const [gettingRegions, setGettingRegions] = useState(true);
  const [divActuals, setDivActuals] = useState([]);
  const [staffActuals, setStaffActuals] = useState([]);
  const [regionActuals, setRegionActuals] = useState([]);
  const [gettingDivActuals, setGettingDivActuals] = useState(true);
  const [gettingStaffActuals, setGettingStaffActuals] = useState(true);
  const [gettingRegionActuals, setGettingRegionActuals] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "MMM").toLowerCase()
  );

  useEffect(() => {
    async function divMonthTargets() {
      await CustomersApi.get("/targetsDivMonth").then((res) => {
        setDivTargets(res.data.targetsDivMonth.rows);
        setGettingDivs(false);
      });
    }
    divMonthTargets();
  }, []);

  useEffect(() => {
    async function staffMonthTargets() {
      await CustomersApi.get("/targetsStaffMonth").then((res) => {
        setStaffTargets(res.data.targetsStaffMonth.rows);
        setGettingStaff(false);
      });
    }
    staffMonthTargets();
  }, []);

  useEffect(() => {
    async function regionMonthTargets() {
      await CustomersApi.get("/targetsRegionMonth").then((res) => {
        setRegionTargets(res.data.targetsRegionMonth.rows);
        setGettingRegions(false);
      });
    }
    regionMonthTargets();
  }, []);

  useEffect(() => {
    async function getDivActuals() {
      await CustomersApi.get("/actualsDivMonth").then((res) => {
        setDivActuals(res.data.actualsDivMonth.rows);
        setGettingDivActuals(false);
      });
    }
    getDivActuals();
  }, []);

  useEffect(() => {
    async function getStaffActuals() {
      await CustomersApi.get("/actualsStaffMonth").then((res) => {
        setStaffActuals(res.data.actualsStaffMonth.rows);
        setGettingStaffActuals(false);
      });
    }
    getStaffActuals();
  }, []);

  useEffect(() => {
    async function getRegionActuals() {
      await CustomersApi.get("/actualsRegionMonth").then((res) => {
        setRegionActuals(res.data.actualsRegionMonth.rows);
        setGettingRegionActuals(false);
      });
    }
    getRegionActuals();
  }, []);

  const allFetched =
    !gettingDivs &&
    !gettingStaff &&
    !gettingRegions &&
    !gettingDivActuals &&
    !gettingStaffActuals &&
    !gettingRegionActuals;

  const plotDivMonth = (monthName) => {
    
    const modifiedActuals = divActuals.map((actual) => {
      return {
        division: actual.division_name,
        month: months[actual.month - 1].name,
        actual: parseInt(actual.actual),
      };
    });

    const filtered = modifiedActuals.filter(row => row.month === selectedMonth)

    const chartData = divTargets.map((row) => {
      return {
        division: row.division_name,
        target: parseInt(row[monthName]) / 1000,
        actual: filtered.filter(thisRow => thisRow.division === row.division_name).length && filtered.filter(thisRow => thisRow.division === row.division_name)[0].actual / 1000
      };
    });
    
    return chartData
  };

  const plotRegionMonth = (monthName) => {
    
    const modifiedActuals = regionActuals.map((actual) => {
      return {
        region: actual.country,
        month: months[actual.month - 1].name,
        actual: parseInt(actual.actual),
      };
    });

    const filtered = modifiedActuals.filter(row => row.month === selectedMonth)

    const chartData = regionTargets.map((row) => {
      return {
        country: row.country,
        target: parseInt(row[monthName]) / 1000,
        actual: filtered.filter(thisRow => thisRow.region === row.country).length && filtered.filter(thisRow => thisRow.region === row.country)[0].actual / 1000
      };
    });

    return chartData;
  };

  const plotStaffMonth = (monthName) => {
    
    const modifiedActuals = staffActuals.map((actual) => {
      return {
        name: actual.full_name,
        month: months[actual.month - 1].name,
        actual: parseInt(actual.actual),
      };
    });

    const filtered = modifiedActuals.filter(row => row.month === selectedMonth)

    const chartData = staffTargets.map((row) => {
      return {
        name: row.full_name,
        target: parseInt(row[monthName]) / 1000,
        actual: filtered.filter(thisRow => thisRow.name === row.full_name).length && filtered.filter(thisRow => thisRow.name === row.full_name)[0].actual / 1000
      };
    });

    return chartData;
  };

  const months = [
    { name: "jan", color: "#DEEBF0" },
    { name: "feb", color: "#FCF8EC" },
    { name: "mar", color: "#FCEDE9" },
    { name: "apr", color: "#E0F7F4" },
    { name: "may", color: "#FEF4EB" },
    { name: "jun", color: "#DEEBF0" },
    { name: "jul", color: "#FCF8EC" },
    { name: "aug", color: "#FCEDE9" },
    { name: "sep", color: "#E0F7F4" },
    { name: "oct", color: "#FEF4EB" },
    { name: "nov", color: "#DEEBF0" },
    { name: "dec", color: "#FCF8EC" },
  ];

  return (
    <div className="container" id="target-div-month">
      <div className="row justify-content-center align-items-center mb-4">
        <h5 className="mr-5" style={{ fontWeight: "bold", marginTop: "5px" }}>
          Displaying targets by MONTH{" "}
        </h5>
        <em>
          <h5
            className="mr-3"
            style={{ fontWeight: "bold", color: "brown", marginTop: "5px" }}
          >
            {" "}
            View instead by :{" "}
          </h5>
        </em>
        <Link to="/sales/target/division">
          <FcIcons.FcFactory
            id="sales-target-icon"
            size={35}
            title="Division"
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
          <Button className="btn-sm mr-5" variant="info">
            Back
          </Button>
        </Link>
        <h5 style={{ fontWeight: "bold", marginTop: "5px" }}>Select Month</h5>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="form-control ml-3"
          style={{ width: "100px" }}
        >
          {months.map((month) => (
            <option value={month.name}>{month.name.toUpperCase()}</option>
          ))}
        </select>
      </div>
      {allFetched ? (
        <>
          <div className="row">
            <Paper elevation={5} id="target-divmonth-bar">
              <h6 id="div-target-title">
                {selectedMonth.toUpperCase()} - Division wise (USD '000)
              </h6>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  margin={{ top: 0 }}
                  data={plotDivMonth(selectedMonth)}
                >
                  <XAxis dataKey="division" tickLine={false} />
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
                {selectedMonth.toUpperCase()} - Region wise (USD '000)
              </h6>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  margin={{ top: 0 }}
                  data={plotRegionMonth(selectedMonth)}
                >
                  <XAxis dataKey="country" tickLine={false} />
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
          </div>
          <div className="row">
            <Paper
              elevation={5}
              id="target-divmonth-bar"
              style={{ height: "500px" }}
            >
              <h6 id="div-target-title">
                {selectedMonth.toUpperCase()} - Staff wise (USD '000)
              </h6>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  margin={{ top: 0 }}
                  data={plotStaffMonth(selectedMonth)}
                  layout="vertical"
                >
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    tickLine={false}
                    type="category"
                    width={140}
                    scale="band"
                  />
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
                {selectedMonth.toUpperCase()} - SUMMARY
              </h6>
            </Paper>
          </div>
        </>
      ) : (
        <div>
          <h5>Fetching Data.....</h5>
        </div>
      )}
    </div>
  );
};

export default TargetsMonth;
