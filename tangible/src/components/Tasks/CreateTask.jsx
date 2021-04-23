import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import Switch from "react-switch";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { useAuth0 } from "@auth0/auth0-react";
import "react-dates/lib/css/_datepicker.css";
import "./tasks.css";
import ProjectsApi from "../../apis/ProjectsApi";
import TasksApi from "../../apis/TasksApi";
import UsersApi from "../../apis/UsersApi";
import ConfirmationModal from "../common/ConfirmationModal";

const CreateTask = () => {
  // use state of input fields
  const { user } = useAuth0();
  const [userId, setUserId] = useState([]);
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [projectId, setProjectId] = useState();
  const [assigneeId, setAssigneeId] = useState();
  const [visibility, setVisibility] = useState(true);
  const [measureType, setMeasureType] = useState();
  const [target, setTarget] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [focus, setFocus] = useState();
  const { startDate, endDate } = dateRange;

  const enabled =
    projectId &&
    title &&
    description &&
    ((measureType === "Numeric" && target) || (measureType === "Percentage" && target) ||
    (measureType === "Date" || measureType==="Not Applicable")) &&
    startDate &&
    endDate

  let history = useHistory();

  // manage visibility toggle
  const onSwitchAction = () => {
    setVisibility(!visibility);
  };

  // get project titles to feed parent project dropdown menu
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    async function getAllProjects() {
      const response = await ProjectsApi.get("/");
      setAllProjects(response.data.allProjects.rows);
    }
    getAllProjects();
  }, []);

  // get user fullname and department to feed assignee dropdown menu
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    async function getAssignees() {
      const response = await UsersApi.get("/fullNames");
      setAssignees(response.data.fullNames.rows);
    }
    getAssignees();
  }, []);

  // get identity of logged in user
  useEffect(() => {
    async function getUserId() {
      const response = await UsersApi.get(`/userId/${user.email}`);
      setUserId(response.data.userId.rows[0]);
    }
    getUserId();
  }, [user.email]);

  // Form submission
  const onSubmit = async (e, data) => {
    e.preventDefault();
    try {
      await TasksApi.post("/", {
        task_title: title,
        task_description: description,
        project_id: parseInt(projectId),
        created_by: userId.user_id,
        assignee: parseInt(assigneeId),
        start_date: startDate,
        end_date: endDate,
        completion: 0,
        is_public: visibility,
        measure_type: measureType,
        target: parseInt(target),
      });
    } catch (error) {}
    history.push("/tasks");
    alert("Task Created Successfully")
  };

  // Rendering
  return (
    <div
      style={{
        marginTop: "80px",
        justifyContent: "center",
        display: "flex",
        marginLeft: "100px",
      }}
    >
      <Form onSubmit={onSubmit} id="task-submit-form">
        <h5
          style={{
            marginBottom: "30px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Create new Task
        </h5>
        <div className="row">
          <div className="column">
            <FormGroup>
              <FormLabel>Parent Project</FormLabel>
              <FormControl
                name="project_id"
                required
                as="select"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="col-md-10"
              >
                <option value=""></option>
                <option disabled>
                  Select project or create independent task
                </option>
                <option>Independent Task</option>
                <option disabled>-------Projects-------</option>
                {allProjects.map((project) => (
                  <option key={project.project_id} value={project.project_id}>
                    {project.project_title}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Task Title</FormLabel>
              <FormControl
                name="task_title"
                required
                type="text"
                value={title}
                rows={2}
                minLength={1}
                maxLength={40}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Maximum 40 characters"
                className="col-md-10"
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Task Description</FormLabel>
              <FormControl
                name="task_description"
                required
                as="textarea"
                value={description}
                rows={4}
                minLength={1}
                maxLength={100}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Maximum 100 characters"
                className="col-md-10"
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Assignee</FormLabel>
              <FormControl
                name="assignee"
                required
                as="select"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="col-md-10"
              >
                <option value=""></option>
                <option disabled>Assign to self or colleagues</option>
                <option>Self</option>
                <option disabled>--------Assigneess--------</option>
                {assignees.map((assignee) => (
                  <option key={assignee.user_id} value={assignee.user_id}>
                    {assignee.full_name} - {assignee.department_name}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
          </div>
          <div className="column">
            <FormGroup>
              <FormLabel>Measure Type</FormLabel>
              <FormControl
                as="select"
                name="measure_type"
                value={measureType}
                onChange={(e) => {setMeasureType(e.target.value); setTarget("")}}
                required
                className="col-md-10"
              >
                <option value=""></option>
                <option>Numeric</option>
                <option>Percentage</option>
                <option>Date</option>
                <option>Not Applicable</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Target</FormLabel>
              <div className="row" style={{ marginLeft: "0px" }}>
                <FormControl
                  type="number"
                  name="target"
                  required={
                    measureType === "Numeric" || measureType === "Percentage"
                  }
                  value={target}
                  className="col-md-4"
                  onChange={(e) => setTarget(e.target.value)}
                  disabled={
                    measureType === "Date" || measureType === "Not Applicable"
                  }
                  style={{
                    textAlign: "center",
                  }}
                ></FormControl>
                <div
                  className="input-group-append"
                  style={{
                    display: measureType === "Percentage" ? "block" : "none",
                  }}
                >
                  <p className="input-group-text">%</p>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <FormLabel style={{ marginRight: "20px", display: "flex" }}>
                Timeline
              </FormLabel>
              <DateRangePicker
                startDate={startDate}
                startDateId="start_date"
                endDate={endDate}
                endDateId="end_date"
                onDatesChange={(date) => setDateRange(date)}
                focusedInput={focus}
                onFocusChange={(focus) => setFocus(focus)}
                displayFormat={() => "DD/MM/YYYY"}
                openDirection="down"
                required
              />
            </FormGroup>
            <FormGroup style={{ marginTop: "30px" }}>
              <div className="form-row">
                <FormLabel
                  style={{
                    marginLeft: "5px",
                    marginRight: "30px",
                    marginTop: "15px",
                    clear: "right",
                  }}
                >
                  <span style={{ display: "flex" }}>Visibility</span>
                </FormLabel>
                <div
                  className="row"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderRadius: "5px",
                    borderColor: "#dedcdc",
                    height: "50px",
                    width: "250px",
                    justifyContent: "center",
                    paddingTop: "10px",
                    position: "relative",
                  }}
                >
                  <span style={{ marginRight: "10px", paddingTop: "3px" }}>
                    Private
                  </span>
                  <Switch
                    checked={visibility}
                    onChange={onSwitchAction}
                    onColor="#FFA500"
                    checkedIcon={false}
                    uncheckedIcon={false}
                  />
                  <span style={{ marginLeft: "10px", paddingTop: "3px" }}>
                    Public (default)
                  </span>
                </div>
              </div>
            </FormGroup>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <ConfirmationModal
            buttonText="Create Task"
            modalText="Are you sure you want to create this Task?"
            handleSubmit={onSubmit}
            form="task-submit-form"
            disabled={!enabled}
          />
        </div>
      </Form>
    </div>
  );
};

export default CreateTask;
