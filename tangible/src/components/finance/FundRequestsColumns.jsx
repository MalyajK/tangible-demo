import { format } from "date-fns";
import { Link } from "react-router-dom";
import {VscChromeClose, VscCheck} from "react-icons/vsc";
import {BsEye} from 'react-icons/bs';

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

export const Columns = [
  {
    Header: "ID",
    accessor: "request_id",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Budgeted",
    accessor: "budgeted",
    Cell: (budgeted) => {
      if (budgeted.value === true) return <div style={{textAlign:"center", padding:"0px"}}><VscCheck color="green"/></div>;
      else return <div style={{textAlign:"center", padding:"0px"}}><VscChromeClose color="red"/></div>;
    },
  },
  {
    Header: "Request Date",
    accessor: "created_at",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Project / Task",
    accessor: "",
    Cell: ((request) => {
      if (request.row.original.project_title) return request.row.original.project_title;
      if (request.row.original.task_title) return request.row.original.task_title;
      else return <p style={{color:"red", fontWeight:"bold", marginBottom:"0px"}}>Unassigned</p>
    })
  },
  {
    Header: "Initiator",
    accessor: "full_name",
  },
  {
    Header: "Expense Head",
    accessor: "expense_head",
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: (request) => {
      if (request.row.original.frequency === 'Annual' || request.row.original.frequency === 'Exact') return request.value;
      if (request.row.original.frequency === 'Monthly') return ((12 - months.findIndex((month) => month.name === request.row.original.starting)) * request.value);
      return ((4 - quarters.findIndex((quarter) => quarter.name === request.row.original.starting)) * request.value)
    }
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "View",
    accessor: "",
    Cell: ((request) =>
      <Link to={`/finance/fundrequests/${request.row.original.request_id}`}><div style={{textAlign:"center"}}>
        <BsEye size={20} color="#264653"/>
      </div></Link>
    ),
  },
];
