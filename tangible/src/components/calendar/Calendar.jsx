import React, { useState, useEffect, useContext } from "react";
import {
  format,
  isSameMonth,
  addDays,
  subDays,
  endOfMonth,
  startOfMonth,
  parseJSON,
  isAfter,
} from "date-fns";
import { FaBackward, FaForward } from "react-icons/fa";
import CreateEvent from "./CreateEvent";
import { takeMonth } from "./generators";
import CalendarsApi from "../../apis/CalendarsApi";
import { UserContext } from "../../auth/UserContext";
import EventModal from "./EventModal";
import "./calendar.css";

const Calendar = () => {
  const currentUser = useContext(UserContext);

  const [monthDate, setMonthDate] = useState(null);

  const [eventId, setEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [incoming, setIncoming] = useState(false);
  const updateIncoming = (trigger) => setIncoming(trigger);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(!showModal);

  const [eventDeleted, setEventDeleted] = useState(false);
  const updateEventDeleted = (trigger) => setEventDeleted(trigger);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const chosenDate = !monthDate ? new Date() : monthDate;
  const data = takeMonth(chosenDate)();

  const displayPreviousMonth = () => {
    setMonthDate(subDays(startOfMonth(chosenDate), 1));
  };

  const displayNextMonth = () => {
    setMonthDate(addDays(endOfMonth(chosenDate), 1));
  };

  const renderEventId = (value) => {
    setEventId(value);
  };

  const filteredData = events.filter((data) =>
    isSameMonth(chosenDate, parseJSON(data.start_time))
  );

  const checkExpired = (date) => {
    return isAfter(new Date(), new Date(date)) ? "#989d9e" : "#5999B3";
  };

  function fetchEvents(date) {
    const dateEvents = filteredData.filter(
      (data) =>
        format(date, "dd/MM/yyyy") ===
        format(new Date(data.start_time), "dd/MM/yyyy")
    );
    return dateEvents;
  }

  // get all events
  useEffect(() => {
    async function getEvents() {
      await CalendarsApi.get(`/${currentUser}`).then((response) => {
        setEvents(response.data.allEvents.rows);
        setLoadingEvents(false);
        setIncoming(false);
        setEventDeleted(false);
      });
    }
    getEvents();
  }, [incoming, currentUser, eventDeleted]);

  if (!loadingEvents) {
    return (
      <div id="calendar-main">
        <CreateEvent updateIncoming={updateIncoming} />
        <div className="row" id="month-toggle">
          <select
            className="form-control"
            id="select-view"
            defaultValue="Month View"
          >
            <option value="Day View">Day View</option>
            <option value="Week View">Week View</option>
            <option value="Month View">Month View</option>
          </select>
          <FaBackward
            size={17}
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={displayPreviousMonth}
          />
          <h5 id="month-name">
            {format(chosenDate, "MMMM yyyy").toUpperCase()}
          </h5>
          <FaForward
            size={17}
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={displayNextMonth}
          />
        </div>
        <div className="row">
          {days.map((day) => (
            <div id="day-of-week" key={day}>
              {day}
            </div>
          ))}
        </div>
        {data.map((week, index) => (
          <div className="row" key={index}>
            {week.map((date, index) => (
              <div>
                <div
                  id="date"
                  key={index}
                  style={{
                    background:
                      format(new Date(), "dd/MM") === format(date, "dd/MM")
                        ? "yellow"
                        : isSameMonth(date, new Date())
                        ? "#FCEDE9"
                        : "#E0F7F4",
                  }}
                >
                  <p id="date-numeric">{format(date, "dd")}</p>
                  <div id="event-container">
                    {fetchEvents(date).map((event) => (
                      <p
                        className="single-event-container"
                        style={{
                          background: checkExpired(event.start_time),
                          textDecoration: !event.is_live
                            ? "line-through"
                            : null,
                        }}
                        onClick={() => {
                          renderEventId(event.event_id);
                          setShowModal(true);
                        }}
                      >
                        {event.event_title}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <EventModal
          showModal={showModal}
          handleClose={handleClose}
          eventId={eventId}
          incoming={updateEventDeleted}
        />
      </div>
    );
  } else
    return (
      <div id="calendar-main">
        <h3>Fetching Data</h3>
      </div>
    );
};

export default Calendar;
