import { format } from "date-fns";
import { Link } from "react-router-dom";
import StatusMeter from "../common/StatusMeter";
import {AvatarGenerator} from 'random-avatar-generator';

const generator = new AvatarGenerator();

export const Columns = [
  {
    Header: "",
    accessor: "assignee",
    Cell: (employee) => (
      <div>
        <img
          src={generator.generateRandomAvatar(employee.value)}
          alt="profile pic"
          id="project-avatar"
        />
      </div>
    ),
  },
  {
    Header: "Project Manager",
    accessor: "project_manager",
  },
  {
    Header: "Project Title",
    accessor: "project_title",
    Cell: (title) => (
      <Link to={`projects/${title.row.original.project_id}`}><div id="project-title">{title.value}</div></Link>
    ),
  },
  {
    Header: "Description",
    accessor: "project_description",
  },
  {
    Header: "Start Date",
    accessor: "start_date",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "End Date",
    accessor: "end_date",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: (status) => (
      <div style={{textAlign:"center"}}>
        <StatusMeter endDate={status.row.original.end_date} 
          completion={parseInt(status.row.original.completion)}
        />
      </div>
    ),
  },
];
