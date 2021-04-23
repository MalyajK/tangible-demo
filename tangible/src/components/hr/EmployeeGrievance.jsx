import React, { useState} from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./hr.css";

const EmployeeGrievance = () => {
  const [employeeId, setEmployeeId] = useState();
  const [grievanceType, setGrievanceType] = useState([]);
  const [receivedDate, setReceivedDate] = useState();
  const [assignee, setAssignee] = useState();
  const [remarks, setRemarks] = useState();
  const [focused, setFocused] = useState();

  return (
    <div id="emp-grievance">
      <Paper style={{width:'400px', padding:"20px 30px"}} elevation="5">
        <h4 className="mb-4" id="emp-req-title">Employee Grievance</h4>
        <Form>
          <FormGroup>
            <FormLabel>Employee</FormLabel>
            <FormControl
              as="select"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              <option></option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Intimation Received On</FormLabel>
            <br />
            <SingleDatePicker
              id="received_date"
              date={receivedDate}
              onDateChange={(date) => setReceivedDate(date)}
              focused={focused}
              onFocusChange={({ focused }) => setFocused(focused)}
              displayFormat={() => "DD/MM/YYYY"}
              numberOfMonths={1}
              appendToBody={true}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Grievance Type</FormLabel>
            <FormControl
              as="select"
              value={grievanceType}
              onChange={(e) => setGrievanceType(e.target.value)}
              required
            >
              <option></option>
              <option>Salary</option>
              <option>Role</option>
              <option>Working Hours</option>
              <option>Cultural Issues</option>
              <option>Manager</option>
              <option>Misconduct</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Remarks</FormLabel>
            <FormControl
              as="textarea"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={4}
              maxLength={200}
              placeHolder="max 200 characters"
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Assign To</FormLabel>
            <FormControl
              as="select"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
          </FormGroup>
          <div id="submit-emp-req"><Button type="submit">Submit</Button></div>
        </Form>
      </Paper>
    </div>
  );
};

export default EmployeeGrievance;
