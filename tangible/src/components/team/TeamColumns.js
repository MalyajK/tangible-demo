import { Link } from "react-router-dom";
import {AvatarGenerator} from 'random-avatar-generator';
import TaskCharts from "./TaskCharts";
import "./team.css";
import * as BsIcons from "react-icons/bs";

const generator = new AvatarGenerator();

export const TeamColumns = [
  {
    Header: "",
    accessor: "user_id",
    Cell: (employee) => (
      <div id="avatar-container">
        <img
          src={generator.generateRandomAvatar(employee.value) || `/images/${employee.value}.png`}
          alt="profile pic"
          id="avatar"
        />
      </div>
    ),
  },
  {
    Header: "Name",
    accessor: "team_member",
    Cell: (employee) => (
      <Link to={`/users/${employee.row.original.user_id}`}>
        <div id="username">{employee.value}</div>
      </Link>
    ),
  },
  {
    Header: "Message || Review",
    accessor: "",
    Cell: (
      <div id="action-button-group">
        <BsIcons.BsChat size={30} color="grey" id="action-button"/>
        <BsIcons.BsPersonCheck size={35} color="grey" id="action-button"/>
      </div>
    ),
  },
  {
    Header: "Task Status",
    accessor: "",
    Cell: (status) => (
      <div id="task-charts">
        <TaskCharts user_id={status.row.original.user_id} />
      </div>
    ),
  },
  {
    Header: "Health",
    accessor: "",
  },
];
