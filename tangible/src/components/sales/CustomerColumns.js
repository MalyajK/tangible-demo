import {Link} from "react-router-dom";
import SummaryChart from "./SummaryChart";

export const CustomerColumns = [
  {
    Header: "Name",
    accessor: "customer_name",
    Cell:(customer) => (
      <Link to={`/sales/customers/${customer.row.original.customer_id}`}>
        <div id="customer-link">{customer.value}</div>
      </Link>
    )
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Industry",
    accessor: "industry",
  },
  {
    Header: "Target | Actual | Collected",
    accessor: "customer_id",
    Cell: (value) => (
      <div id="summary-chart">
        <SummaryChart customerId={value}/>
      </div>
    ),
  },
  {
    Header: "Share",
    accessor: "",
  },
]