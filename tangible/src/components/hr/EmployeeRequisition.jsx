import React, { useState } from "react";
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

const EmployeeRequisition = () => {
  const [hireType, setHireType] = useState();
  const [department, setDepartment] = useState();
  const [designation, setDesignation] = useState();
  const [tenure, setTenure] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [salary, setSalary] = useState();
  const [assignee, setAssignee] = useState();
  const [remarks, setRemarks] = useState();
  const [focused, setFocused] = useState();

  return (
    <div id="emp-req">
      <Paper style={{width:'800px', padding:"20px 0px 20px 65px"}} elevation="5">
        <h4 className="mb-4" id="emp-req-title">Employee Requisition</h4>
        <Form>
          <div className="row">
            <div className="column col-md-5 mr-5">
              <FormGroup>
                <FormLabel>Hiring Type</FormLabel>
                <FormControl
                  as="select"
                  value="hireType"
                  onChange={(e) => setHireType(e.target.value)}
                  required
                >
                  <option></option>
                  <option>New</option>
                  <option>Replacement</option>
                  <option>Temp</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Department</FormLabel>
                <FormControl
                  as="select"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option></option>
                  <option>HR</option>
                  <option>Admin</option>
                  <option>Sales</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Designation</FormLabel>
                <FormControl
                  as="select"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                >
                  <option></option>
                  <option>General Manager</option>
                  <option>Asst Vice President</option>
                  <option>Senior Consultant</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Tenure in months (for Temps only)</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  disabled={hireType !== "Temp"}
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
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
            </div>
            <div className="column col-md-5">
              <FormGroup>
                <FormLabel>Desired Joining Date</FormLabel>
                <br />
                <SingleDatePicker
                  id="join_date"
                  date={joiningDate}
                  onDateChange={(date) => setJoiningDate(date)}
                  focused={focused}
                  onFocusChange={({ focused }) => setFocused(focused)}
                  displayFormat={() => "DD/MM/YYYY"}
                  numberOfMonths={1}
                  appendToBody={true}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Expected Salary per Month</FormLabel>
                <FormControl
                  type="number"
                  min="0"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Remarks (Optional)</FormLabel>
                <FormControl
                  as="textarea"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  maxLength={200}
                  placeHolder="max 200 characters"
                />
              </FormGroup>
            </div>
          </div>
          <div id="submit-emp-req"><Button type="submit">Submit</Button></div>
        </Form>
      </Paper>
    </div>
  );
};

export default EmployeeRequisition;
