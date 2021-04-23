import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import * as FcIcons from "react-icons/fc";
import Paper from "@material-ui/core/Paper";
import CustomersApi from "../../apis/CustomersApi";
import { TooltipStyle } from "./TooltipStyle";
import { COLORS } from "../common/Colors";
import "./sales.css";

const SalesTarget = () => {
  const [divTargets, setDivTargets] = useState([]);
  const [monthTargets, setMonthTargets] = useState([]);
  const [staffTargets, setStaffTargets] = useState([]);
  const [regionTargets, setRegionTargets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDivTargets() {
      CustomersApi.get("/targetsByDivision").then((res) => {
        setDivTargets(res.data.targetsByDivision.rows);
        setLoading(false);
      });
    }
    getDivTargets();
  }, []);

  useEffect(() => {
    async function getMonthTargets() {
      CustomersApi.get("/targetsByMonth").then((res) => {
        setMonthTargets(res.data.targetsByMonth.rows[0]);
      });
    }
    getMonthTargets();
  }, []);

  useEffect(() => {
    async function getStaffTargets() {
      CustomersApi.get("/targetsByStaff").then((res) => {
        setStaffTargets(res.data.targetsByStaff.rows);
      });
    }
    getStaffTargets();
  }, []);

  useEffect(() => {
    async function getRegionTargets() {
      CustomersApi.get("/targetsByRegion").then((res) => {
        setRegionTargets(res.data.targetsByRegion.rows);
      });
    }
    getRegionTargets();
  }, []);

  const divData = divTargets.map((target) => ({
    division: Object.values(target)[0],
    target: parseInt(Object.values(target)[1] / 1000),
  }));

  const regionData = regionTargets.map((target) => ({
    region: Object.values(target)[0],
    target: parseInt(Object.values(target)[1] / 1000),
  }));

  const monthData = Object.keys(monthTargets).map((key) => {
    return {
      month: key.toUpperCase(),
      target: parseInt(monthTargets[key] / 1000),
    };
  });

  const staffData = staffTargets.map((target) => ({
    staff: Object.values(target)[1],
    target: parseInt(Object.values(target)[2] / 1000),
  }));

  if (!loading) {
    return (
      <div className="container" id="sales-target">
        <div className="row justify-content-center">
          <h5
            style={{
              fontWeight: "bold",
              marginRight: "20px",
              marginTop: "10px",
              color: "slategray",
            }}
          >
            View By :
          </h5>
          <Link to="/sales/target/division"><FcIcons.FcFactory id="sales-target-icon" size={40} title="Division"/></Link>
          <Link to="/sales/target/month"><FcIcons.FcCalendar id="sales-target-icon" size={40} title="Month"/></Link>
          <Link to="/sales/target/region"><FcIcons.FcGlobe id="sales-target-icon" size={38} title="Region"/></Link>
          <Link to="/sales/target/staff"><FcIcons.FcBusinesswoman id="sales-target-icon" size={38} title="Salesperson"/></Link>
        </div>
        <Paper elevation={5} id="sales-target-divpie">
          <u>
            <h5 id="div-target-title">Division wise targets (in USD '000)</h5>
          </u>
          <ResponsiveContainer width="100%" height="95%">
            <PieChart>
              <Pie
                data={divData}
                label={true}
                innerRadius={50}
                dataKey="target"
                nameKey="division"
                isAnimationActive={false}
              >
                {divData.map((entry, index) => (
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
        </Paper>
        <Paper elevation={5} id="sales-target-monthbar">
          <u>
            <h5 id="div-target-title">Month wise targets (in USD '000)</h5>
          </u>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart data={monthData} margin={{ top: 0 }}>
              <XAxis dataKey="month" tickLine={false} />
              <YAxis />
              <Bar dataKey="target" fill="#2A9D8F" />
              <Tooltip
                contentStyle={TooltipStyle}
                cursor={{ fill: "#2A9D8F", opacity: "0.2" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper elevation={5} id="sales-target-divpie">
          <u>
            <h5 id="div-target-title">Region wise targets (in USD '000)</h5>
          </u>
          <ResponsiveContainer width="100%" height="95%">
            <PieChart>
              <Pie
                data={regionData}
                label={true}
                innerRadius={50}
                dataKey="target"
                nameKey="region"
                isAnimationActive={false}
              >
                {regionData.map((entry, index) => (
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
        </Paper>
        <Paper elevation={5} id="sales-target-staffbar">
          <u>
            <h5 id="div-target-title">Targets by Salesperson (in USD '000)</h5>
          </u>
          <ResponsiveContainer width="100%" height="95%">
            <BarChart
              data={staffData}
              margin={{ top: 0 }}
              layout="vertical"
              barSize={20}
            >
              <XAxis type="number" />
              <YAxis
                dataKey="staff"
                tickLine={false}
                type="category"
                scale="band"
                width={140}
              />
              <Bar dataKey="target" fill="#264653" />
              <Tooltip
                contentStyle={TooltipStyle}
                cursor={{ fill: "#264653", opacity: "0.2" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>
    );
  } else
    return (
      <div id="sales-target">
        <h5>Fetching Data...</h5>
      </div>
    );
};

export default SalesTarget;
