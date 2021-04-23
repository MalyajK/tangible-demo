import { format } from "date-fns";
import { Link } from "react-router-dom";
import ProgressMeter from "../common/ProgressMeter";
import StatusMeter from "../common/StatusMeter";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "task_id",
  },
  {
    Header: "Task Title",
    accessor: "task_title",
    Cell: (title) => (
      <Link to={`tasks/${title.row.original.task_id}`}>{title.value}</Link>
    ),
  },
  {
    Header: "Description",
    accessor: "task_description",
  },
  {
    Header: "Project",
    accessor: "project_title",
  },
  {
    Header: "Assignee",
    accessor: "full_name",
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
  {
    Header: "Progress",
    accessor: "completion",
    Cell: (completion) => (
      <div style={{marginLeft:"10px", width:"42px", height:"42px"}}>
        <ProgressMeter value={completion.value} />
      </div>
    ),
  },
];
