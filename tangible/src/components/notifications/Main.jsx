import React from "react";
import { format } from "date-fns";
import Paper from "@material-ui/core/Paper";
import { MdArrowForward } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { RiDeleteBin6Fill, RiCloseFill } from "react-icons/ri";
import "./notifications.css";

const Main = (props) => {
  const { isExpired } = props;
  const invitees = [
    { name: "Malyaj Kaloni" },
    { name: "Anshika Khaitan" },
    { name: "Bruce Wayne" },
    { name: "Clark Kent" },
    { name: "Peter Parker" },
    { name: "Chanakya" },
    { name: "Birbal" },
    { name: "Tenali Raman" },
    { name: "Naseeruddin Hoja" },
    { name: "Suppandi" },
    { name: "Malyaj Kaloni" },
    { name: "Anshika Khaitan" },
    { name: "Bruce Wayne" },
    { name: "Clark Kent" },
    { name: "Peter Parker" },
    { name: "Chanakya" },
    { name: "Birbal" },
    { name: "Tenali Raman" },
    { name: "Naseeruddin Hoja" },
    { name: "Suppandi" },
  ];

  const handleDelete = () => {

  }

  const handleClose = () => {
    
  }

  return (
    <div id="not-main">
      <Paper id="event-modal" elevation={4}>
        <h5 style={{ textAlign: "center", fontWeight: "bold" }}>
          Event Details
        </h5>
        <hr style={{ width: "100%", borderColor: "lightgrey" }} />
        <h6 id="event-modal-title">
          Review of notifications module of Tangible
        </h6>
        <hr style={{ width: "100%", borderColor: "lightgrey" }} />
        <p
          style={{
            textAlign: "center",
            color: "red",
            display: isExpired ? "block" : "none",
          }}
        >
          This event has expired
        </p>
        <div style={{ textAlign: "center" }}>
          <h4 style={{ color: "#457F96" }}>
            {format(new Date(), "do MMM, HH:MM")}{" "}
            <MdArrowForward
              size={30}
              color="brown"
              style={{ marginBottom: "7px" }}
            />{" "}
            {format(new Date(), "do MMM, HH:MM")}{" "}
          </h4>
        </div>
        <div id="participant-container">
          <div id="event-participants" className="row">
            <BsPeopleFill size={35} color="#2A9D8F" />
            <h6
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginLeft: "10px",
                marginTop: "7px",
              }}
            >
              Participants
            </h6>
          </div>
          <div id="participant-list" className="row">
            {invitees.map((invitee) => (
              <p id="event-invitee">{invitee.name}</p>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <RiDeleteBin6Fill
            color="red"
            size={30}
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          />
          <RiCloseFill
            size={40}
            style={{ marginLeft: "20px", cursor: "pointer" }}
            color="#457F96"
            onClick={handleClose}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Main;
