import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FcMoneyTransfer} from 'react-icons/fc';
import UsersApi from "../../apis/UsersApi";
import ProjectsApi from "../../apis/ProjectsApi";
import TasksApi from "../../apis/TasksApi";
import DepartmentsApi from "../../apis/DepartmentsApi";
import FinanceApi from "../../apis/FinanceApi";
import ExpenseHeads from "./ExpenseHeads";

const RequestFunds = () => {
  const { user } = useAuth0();
  const history = useHistory();
  const [userId, setUserId] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState();
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState();
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [expenseHead, setExpenseHead] = useState();
  const [budgeted, setBudgeted] = useState("true");
  const [assignTo, setAssignTo] = useState();
  const [frequency, setFrequency] = useState();
  const [amount, setAmount] = useState();
  const [starting, setStarting] = useState(null);
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [fetchingUser, setFetchingUser] = useState(true);
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const [fetchingTasks, setFetchingTasks] = useState(true);
  const [fetchingDepartments, setFetchingDepartments] = useState(true);

  const months = [
    { name: "JAN" },
    { name: "FEB" },
    { name: "MAR" },
    { name: "APR" },
    { name: "MAY" },
    { name: "JUN" },
    { name: "JUL" },
    { name: "AUG" },
    { name: "SEP" },
    { name: "OCT" },
    { name: "NOV" },
    { name: "DEC" },
  ];

  const quarters = [
    { name: "Q1" },
    { name: "Q2" },
    { name: "Q3" },
    { name: "Q4" },
  ];

  // get user_id
  useEffect(() => {
    async function getUserId() {
      await UsersApi.get(`/userId/${user.email}`).then((response) => {
        setUserId(response.data.userId.rows[0]);
        setFetchingUser(false);
      });
    }
    getUserId();
  }, [user.email]);

  // get projects by user
  useEffect(() => {
    async function getProjects() {
      await ProjectsApi.get(`/user/${user.email}`).then((response) => {
        setProjects(response.data.projectsByUser.rows);
        setFetchingProjects(false);
      });
    }
    getProjects();
  }, [user.email]);

  // get tasks by user
  useEffect(() => {
    async function getTasks() {
      await TasksApi.get(`/user/${user.email}`).then((response) => {
        setTasks(response.data.tasksByUser.rows);
        setFetchingTasks(false);
      });
    }
    getTasks();
  }, [user.email]);

  // get departments
  useEffect(() => {
    async function getDepartments() {
      await DepartmentsApi.get("/").then((response) => {
        setDepartments(response.data.allDepartments.rows);
        setFetchingDepartments(false);
      });
    }
    getDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await FinanceApi.post("/fundRequest", {
        budgeted: budgeted,
        project_id: projectId,
        description: description,
        initiator: userId.user_id,
        expense_head: expenseHead,
        assign_to: assignTo,
        task_id: taskId,
        frequency: frequency,
        amount: amount,
        starting: starting,
        department: departments.filter(
          (row) => row.department_name === departmentName
        )[0].department_id,
        required_by: date,
        status: 'Pending L1',
      }).then(res => {
        if(res.status === 200) {
          alert("Requisition Created Successfully")      
        } else {
          alert("Could not create requisition")
        }
      });
    } catch (error) {if (error) {
      alert("Could not create requisition")
    }}
    history.push("/finance/fundrequests");
  };

  const allFetched =
    !fetchingUser &&
    !fetchingProjects &&
    !fetchingTasks &&
    !fetchingDepartments;

  if (allFetched) {
    return (
      <div id="request-funds" className="container">
        <div className="row">
          <FcMoneyTransfer size={40}/>
          <h4 id="req-funds-title">Funds Requisition</h4>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <FormGroup className="mr-5">
              <FormLabel>Role</FormLabel>
              <select
                id="department"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="form-control"
                required
              >
                <option></option>
                {departments.map((department) => (
                  <option
                    value={department.department_name}
                    key={department.department_id}
                  >
                    {department.department_name}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup className="mr-5">
              <FormLabel>Expense Head</FormLabel>
              <ExpenseHeads
                department={departmentName}
                value={expenseHead}
                onChange={(e) => setExpenseHead(e.target.value)}
              />
            </FormGroup>
            <FormGroup id="assign-to" className="mr-5">
              <FormLabel>Assign To</FormLabel>
              <FormControl
                as="select"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                required
              >
                <option></option>
                <option value="Project">Project</option>
                <option value="Task">Task</option>
                <option value="NA">NA</option>
              </FormControl>
            </FormGroup>
            <FormGroup
              style={{ display: assignTo !== "Project" ? "none" : "block" }}
              id="assign-toggle"
            >
              <FormLabel>Select Project</FormLabel>
              <FormControl
                as="select"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                required={assignTo === "Project"}
              >
                <option></option>
                {projects.map((project) => (
                  <option value={project.project_id} key={project.project_id}>
                    {project.project_title}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup
              style={{ display: assignTo !== "Task" ? "none" : "block" }}
              id="assign-toggle"
            >
              <FormLabel>Select Task</FormLabel>
              <FormControl
                as="select"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                required={assignTo === "Task"}
              >
                <option></option>
                {tasks.map((task) => (
                  <option value={task.task_id} key={task.task_id}>
                    {task.task_title}
                  </option>
                ))}
              </FormControl>
            </FormGroup>
          </div>
          <div className="row mt-2">
            <FormGroup>
              <FormLabel className="mb-3">Budgeted ?</FormLabel>
              <div className="input-group" id="budgeted">
                <span className="input-group-prepend mr-3">Yes</span>
                <input
                  name="expenseType"
                  value={true}
                  type="radio"
                  className="budgeted-radio"
                  id="true"
                  checked={budgeted === "true"}
                  onClick={(e) => setBudgeted(e.target.value)}
                />
                <span className="input-group-prepend ml-4 mr-3">No</span>
                <input
                  name="expenseType"
                  value={false}
                  type="radio"
                  className="budgeted-radio"
                  id="false"
                  checked={budgeted === "false"}
                  onClick={(e) => setBudgeted(e.target.value)}
                />
              </div>
            </FormGroup>
            <FormGroup id="funds-frequency">
              <FormLabel>Frequency</FormLabel>
              <FormControl
                as="select"
                value={frequency}
                onChange={(e) => {
                  setFrequency(e.target.value);
                  setStarting("");
                }}
                required
              >
                <option></option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annual">Annual</option>
                <option value="Exact">Exact</option>
              </FormControl>
            </FormGroup>
            <FormGroup
              id="funds-frequency"
              style={{
                display: !frequency ? "none" : "block",
              }}
            >
              <FormLabel>Amount</FormLabel>
              <FormControl
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={0}
                style={{ textAlign: "center" }}
                required
              />
            </FormGroup>
            <div className="row">
              <FormGroup
                id="funds-frequency"
                style={{
                  display: frequency !== "Exact" ? "none" : "block",
                }}
              >
                <FormLabel className="ml-3">Required By</FormLabel>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                  required={frequency === "Exact"}
                  value={date}
                />
              </FormGroup>
            </div>
            <FormGroup
              id="funds-starting"
              style={{
                display:
                  !frequency || frequency === "Annual" || frequency === "Exact"
                    ? "none"
                    : "block",
              }}
            >
              <FormLabel>Starting From</FormLabel>
              <FormControl
                as="select"
                value={starting}
                onChange={(e) => setStarting(e.target.value)}
                required={frequency === "Monthly" || frequency === 'Quarterly'}
              >
                <option>{null}</option>
                {frequency === "Monthly"
                  ? months.map((month) => <option>{month.name}</option>)
                  : frequency === "Quarterly"
                  ? quarters.map((quarter) => <option>{quarter.name}</option>)
                  : null}
              </FormControl>
            </FormGroup>
            <FormGroup
              style={{
                display: !frequency || frequency === "Exact" ? "none" : "block",
              }}
              id="frequent-amount"
            >
              <FormLabel className="mb-3 ml-3">
                <u>Total</u>
              </FormLabel>
              <br />
              <h6>
                {frequency === "Monthly" && starting
                  ? (12 -
                      months.findIndex((month) => month.name === starting)) *
                    amount
                  : frequency === "Quarterly" && starting
                  ? (4 -
                      quarters.findIndex(
                        (quarter) => quarter.name === starting
                      )) *
                    amount
                  : frequency === "Annual"
                  ? amount
                  : null}
              </h6>
            </FormGroup>
          </div>
          <div className="row">
            <FormGroup id="req-description">
              <FormLabel>Requirement Description</FormLabel>
              <FormControl
                as="textarea"
                placeholder="not exceeding 100 characters ..."
                rows={3}
                maxLength={100}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <div
              style={{
                textAlign: "center",
                marginTop: "60px",
                marginLeft: "40px",
              }}
            >
              <Button variant="info" type="submit" style={{ width: "150px" }}>
                Create Requisition
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  } else return <div id="fund-requests">Fetching Data ...</div>;
};

export default RequestFunds;
