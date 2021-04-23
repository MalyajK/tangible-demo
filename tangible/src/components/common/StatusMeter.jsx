import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";

const StatusMeter = (props) => {
  const { completion, endDate, size } = props;
  const today = Date.UTC(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  const subjectDate = Date.UTC(
    new Date(endDate).getFullYear(),
    new Date(endDate).getMonth(),
    new Date(endDate).getDate()
  );

  const [status, ] = useState(
    completion >= 100
      ? "complete" // set to complete regardless of dates
      : today > subjectDate
      ? "overdue"
      : today === subjectDate
      ? "due_today"
      : (subjectDate - today)/(1000*60*60*24) <= 2 //since difference is in milliseconds
      ? "near_due"
      : "not_due"
  );

  return status === "complete" ? (
    <FaIcons.FaThumbsUp size={size} color="#35ad2a" />
  ) : status === "near_due" ? (
    <BiIcons.BiRun size={size} color="red" />
  ) : status === "not_due" ? (
    <FaIcons.FaArrowsAltH size={size} color="#2a58ad" />
  ) : status === "due_today" ? (
    <BsIcons.BsAlarm size={size} />
  ) : (
    <FaIcons.FaFlag size={size} color="red" />
  );
};
export default StatusMeter;
