import React, { useState, useEffect } from "react";
import { format, isAfter } from "date-fns";
import Paper from "@material-ui/core/Paper";
import { MdArrowForward } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { AvatarGenerator } from "random-avatar-generator";
import { RiDeleteBin6Fill, RiCloseFill } from "react-icons/ri";
import CalendarsApi from "../../apis/CalendarsApi";
import UsersApi from "../../apis/UsersApi";
import "./modal.css";

const EventModal = (props) => {
  const { eventId, showModal, handleClose, incoming } = props;
  const generator = new AvatarGenerator();

  const [event, setEvent] = useState([]);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const [names, setNames] = useState([]);
  const [loadingNames, setLoadingNames] = useState(true);

  // get event by id
  useEffect(() => {
    if (eventId) {
      async function getEvent() {
        await CalendarsApi.get(`/event/${eventId}`).then((response) => {
          setEvent(response.data.eventById.rows[0]);
          setLoadingEvent(false);
        });
      }
      getEvent();
    }
  }, [eventId]);

  // get user names
  useEffect(() => {
    async function getNames() {
      await UsersApi.get("/fullNames").then((response) => {
        setNames(response.data.fullNames.rows);
        setLoadingNames(false);
      });
    }
    getNames();
  }, []);

  const handleDelete = async () => {
    if (event.event_id) {
      try {
        await CalendarsApi.patch(`/delete/${event.event_id}`).then(
          (response) => {
            if (response.status === 200) {
              alert("Event cancelled");
              handleClose();
              incoming(true);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else alert("Error. Try again later");
  };

  if (eventId && !loadingNames && !loadingEvent) {
    return (
      <div>
        <Paper
          id="event-modal"
          elevation={4}
          style={{ display: showModal ? "block" : "none" }}
        >
          <h5 style={{ textAlign: "center", fontWeight: "bold" }}>
            Event Details
          </h5>
          <hr style={{ width: "100%", borderColor: "lightgrey" }} />
          <img
            id="event-creator"
            src={generator.generateRandomAvatar(event.event_creator)}
            alt="profile pic"
          />
          <h6 id="event-modal-title">{event.event_title}</h6>
          <hr style={{ width: "100%", borderColor: "lightgrey" }} />
          <p
            style={{
              textAlign: "center",
              color: "red",
              display: isAfter(new Date(event.start_time), new Date())
                ? "none"
                : "block",
            }}
          >
            This event has expired
          </p>
          <p
            style={{
              textAlign: "center",
              color: "red",
              display: event.is_live ? "none" : "block",
            }}
          >
            This event has been cancelled
          </p>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ color: "#457F96" }}>
              {format(new Date(event.start_time), "do MMM, HH:MM")}{" "}
              <MdArrowForward
                size={30}
                color="brown"
                style={{ marginBottom: "7px" }}
              />{" "}
              {format(new Date(event.end_time), "do MMM, HH:MM")}{" "}
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
              {event.invitees.map((invitee) => {
                return (
                  <p id="event-invitee">
                    {
                      names.filter((each) => each.user_id === invitee)[0]
                        .full_name
                    }
                  </p>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <RiDeleteBin6Fill
              color="red"
              size={30}
              style={{
                cursor: "pointer",
                marginRight: "20px",
                display: event.is_live ? null : "none",
              }}
              onClick={handleDelete}
            />
            <RiCloseFill
              size={40}
              style={{ cursor: "pointer" }}
              color="#457F96"
              onClick={handleClose}
            />
          </div>
        </Paper>
      </div>
    );
  } else return null;
};

export default EventModal;
