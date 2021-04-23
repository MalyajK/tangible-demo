import React from "react";
import "./finance.css"

const Ageing = (props) => {
  const { dueDate } = props;
  const today = Date.UTC(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const subjectDate = Date.UTC(
    new Date(dueDate).getFullYear(),
    new Date(dueDate).getMonth(),
    new Date(dueDate).getDate()
  );
  
  const dateDiff = (today - subjectDate)/(1000*60*60*24)

  return dateDiff < 0 ? (
    <p id="not-due">Not Due</p>
  ) : dateDiff > 0 && dateDiff <=15 ? (
    <p id="days0-15">0-15 days</p>
  ) : dateDiff > 15 && dateDiff <=30 ? (
    <p id="days15-30">15-30 days</p>
  ) : dateDiff > 30 && dateDiff <=60 ? (
    <p id="days30-60">30-60 days</p>
  ) : dateDiff > 60 && dateDiff <=90 ? (
    <p id="days60-90">60-90 days</p>
  ) : (
    <p id="ageing-danger">90+ days</p>
  );
};


export default Ageing;
