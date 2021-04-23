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
 
const EmployeeExit = () => {
  const [employeeId, setEmployeeId] = useState();
  const [exitType, setExitType] = useState();
  const [resignReason, setResignReason] = useState([]);
  const [terminationReason, setTerminationReason] = useState([]);
  const [requestedDate, setRequestedDate] = useState();
  const [proposedDate, setProposedDate] = useState();
  const [receivedDate, setReceivedDate] = useState();
  const [recommendation, setRecommendation] = useState();
  const [assignee, setAssignee] = useState();
  const [remarks, setRemarks] = useState();
  const [relFocused, setRelFocused] = useState();
  const [propFocused, setPropFocused] = useState();
  const [receivedFocused, setReceivedFocused] = useState();

  return (
    <div id="emp-exit">
      <Paper style={{width:'800px', padding:"20px 0px 20px 65px"}} elevation={5}>
        <h4 className="mb-4" id="emp-req-title">Employee Exit</h4>
        <Form>
          <div className="row">
            <div className="column col-md-5 mr-5">
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
                  focused={receivedFocused}
                  onFocusChange={({ focused }) => setReceivedFocused(focused)}
                  displayFormat={() => "DD/MM/YYYY"}
                  numberOfMonths={1}
                  appendToBody={true}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Exit Type</FormLabel>
                <FormControl
                  as="select"
                  value={exitType}
                  onChange={(e) => setExitType(e.target.value)}
                  required
                >
                  <option></option>
                  <option>Resignation</option>
                  <option>Termination</option>
                  <option>Contract Ended</option>
                  <option>Superannuation</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Reason for Resignation</FormLabel>
                <FormControl
                  as="select"
                  value={resignReason}
                  onChange={(e) => setResignReason(e.target.value)}
                  required
                >
                  <option></option>
                  <option>Better Role</option>
                  <option>Better Salary</option>
                  <option>Manager Issues</option>
                  <option>Long Working Hours</option>
                  <option>Cultural Issues</option>
                  <option>Lack of Motivation</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Reason for Termination</FormLabel>
                <FormControl
                  as="select"
                  value={terminationReason}
                  onChange={(e) => setTerminationReason(e.target.value)}
                  required
                >
                  <option></option>
                  <option>Performance</option>
                  <option>Disciplinary</option>
                  <option>Redundancy</option>
                </FormControl>
              </FormGroup>
            </div>
            <div className="column col-md-5">
              <FormGroup style={{float:"left"}}>
                <FormLabel>Requested Exit Date</FormLabel>
                <br />
                <SingleDatePicker
                  id="req_rel_date"
                  date={requestedDate}
                  onDateChange={(date) => setRequestedDate(date)}
                  focused={relFocused}
                  onFocusChange={({ focused }) => setRelFocused(focused)}
                  displayFormat={() => "DD/MM/YYYY"}
                  numberOfMonths={1}
                  appendToBody={true}
                  required
                />
              </FormGroup>
              <FormGroup style={{float:"right"}}>
                <FormLabel>Proposed Exit Date</FormLabel>
                <br />
                <SingleDatePicker
                  id="prop_rel_date"
                  date={proposedDate}
                  onDateChange={(date) => setProposedDate(date)}
                  focused={propFocused}
                  onFocusChange={({ focused }) => setPropFocused(focused)}
                  displayFormat={() => "DD/MM/YYYY"}
                  numberOfMonths={1}
                  appendToBody={true}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Manager Recommendation</FormLabel>
                <FormControl
                  as="select"
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  required
                >
                  <option></option>
                  <option>Let Go</option>
                  <option>Try to Retain</option>
                  <option>Must Retain</option>
                  <option>Place on PIP</option>
                  <option>Not Sure</option>
                </FormControl>
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
          </div>
          <div id="submit-emp-req"><Button type="submit">Submit</Button></div>
        </Form>
      </Paper>
    </div>
  );
};

export default EmployeeExit;
