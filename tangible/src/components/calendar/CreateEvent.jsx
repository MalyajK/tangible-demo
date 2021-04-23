import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import MultiSelect from "react-multi-select-component";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import { UserContext } from "../../auth/UserContext";
import "react-datepicker/dist/react-datepicker.css";
import CalendarsApi from "../../apis/CalendarsApi";
import UsersApi from "../../apis/UsersApi";
import "./calendar.css";

const CreateEvent = (props) => {
  
  const {updateIncoming} = props;
  const currentUser = useContext(UserContext);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [eventType, setEventType] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [invitees, setInvitees] = useState([]);

  const enabled = startDate && endDate && eventType && eventTitle && invitees.length;

  // get users
  useEffect(() => {
    async function getUsers() {
      await UsersApi.get("/fullNames").then((response) => {
        setUsers(response.data.fullNames.rows);
        setLoadingUsers(false);
      });
    }
    getUsers();
  }, []);

  const dropdown = users.map((user) => {
    return {
      label: user.full_name,
      value: user.user_id,
    };
  });

  const selected = [currentUser]
  invitees.map((invitee) => {
    return selected.push(invitee.value)
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (endDate < startDate) alert("End time must be greater than start time");
    else
      try {
        await CalendarsApi.post("/", {
          event_type: eventType,
          event_title: eventTitle,
          start_time: startDate,
          end_time: endDate,
          event_creator: currentUser,
          invitees: selected,
          is_live: true,
        }).then((res) => {
          if (res.status === 200) {
            alert("Event added to calendar!");
            updateIncoming(true);
            setEventType("");
            setEventTitle("");
            setStartDate(null);
            setEndDate(null);
            setInvitees([]);
          }
        });
      } catch (error) {
        console.log(error);
      }
  };

  if (!loadingUsers) {
    return (
      <div id="header-container">
        <Form className="row">
          <FormGroup className="mr-3">
            <FormLabel>Event Type</FormLabel>
            <FormControl
              as="select"
              required
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value=""></option>
              <option value="Internal Meeting">Internal Meeting</option>
              <option value="Customer Meeting">Customer Meeting</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Event Title</FormLabel>
            <FormControl
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              style={{ width: "250px" }}
              placeholder="max 50 characters"
              maxLength={50}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Start</FormLabel>
            <br />
            <DatePicker
              showTimeSelect
              selected={startDate}
              dateFormat="h:mm aa / do MMM"
              timeIntervals={15}
              value={startDate}
              onChange={(date) => setStartDate(date)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>End</FormLabel>
            <br />
            <DatePicker
              showTimeSelect
              selected={endDate}
              dateFormat="h:mm aa / do MMM"
              timeIntervals={15}
              value={endDate}
              onChange={(date) => setEndDate(date)}
              required
            />
          </FormGroup>
          <FormGroup className="ml-3 mr-3">
            <FormLabel>Participants</FormLabel>
            <MultiSelect
              options={dropdown}
              value={invitees}
              onChange={setInvitees}
              labelledBy="Select"
              hasSelectAll={false}
              className="invitee-dropdown"
            />
          </FormGroup>
          <div id="create-event-button">
            <Button type="button" onClick={handleSubmit} disabled={!enabled}>
              CREATE
            </Button>
          </div>
        </Form>
      </div>
    );
  } else return null;
};

export default CreateEvent;
