import { format } from "date-fns";
import {Link} from "react-router-dom";
import Ageing from "./Ageing";
import * as RiIcons from "react-icons/ri";

export const Columns = [
  {
    Header: "Customer",
    accessor: "customer_name",
  },
  {
    Header: "Update",
    accessor: "",
    Cell: ((invoice) =>
      <Link to={`/finance/receivables/${invoice.row.original.invoice_number}`}><div style={{textAlign:"center"}}>
        <RiIcons.RiMoneyDollarCircleLine size={30} color="#2A9D8F" />
      </div></Link>
    ),
  },
  {
    Header: "Division",
    accessor: "division_name",
  },
  {
    Header: "Invoice No.",
    accessor: "invoice_number",
  },
  {
    Header: "Invoice Date",
    accessor: "invoice_date",
    Cell: ({ value }) => {
      return format(new Date(value), "do MMM yyyy");
    },
  },
  {
    Header: "Due Date",
    accessor: "due_date",
    Cell: ({ value }) => {
      return format(new Date(value), "do MMM yyyy");
    },
  },
  {
    Header: "Billed",
    accessor: "invoice_amount",
  },
  {
    Header: "Received",
    accessor: "amount_received",
  },
  {
    Header: "Outstanding",
    accessor: "outstanding",
  },
  {
    Header: "Ageing",
    accessor: "",
    Cell: (status) => (
      <div style={{ textAlign: "center" }}>
        <Ageing dueDate={status.row.original.due_date} />
      </div>
    ),
  },
];
