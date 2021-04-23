import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Ceo from "./ceo/Ceo";
import "./dashboard.css";

const Main = () => {
  return (
    <div id="dash-main">
      <Tabs defaultActiveKey="ceo">
        <Tab eventKey="ceo" title="CEO"><Ceo /></Tab>
        <Tab eventKey="operations" title="Operations"></Tab>
        <Tab eventKey="sales" title="Sales"></Tab>
        <Tab eventKey="marketing" title="Marketing"></Tab>
        <Tab eventKey="engineering" title="Engineering"></Tab>
        <Tab eventKey="hr" title="Human Resources"></Tab>
        <Tab eventKey="legal" title="Legal"></Tab>
        <Tab eventKey="finance" title="Finance"></Tab>
        <Tab eventKey="it" title="IT"></Tab>
      </Tabs>
    </div>
  );
};

export default Main;
