import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GlobalFilter } from "../common/GlobalFilter";
import { Columns } from "./FundRequestsColumns";
import FinanceApi from '../../apis/FinanceApi';
import "./finance.css";

const FundRequests = () => {
  const [requests, setRequests] = useState([]);
  const [, setApproved] = useState([]);
  const [, setRejected] = useState([]);
  const [, setPending] = useState([]);
  const [, setFetchingRequests] = useState(true);
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => requests, [requests]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    { columns, data, initialState: { pageSize: 7 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    async function getRequests () {
      await FinanceApi.get('/fundRequests').then(res => {
        setRequests(res.data.fundRequests.rows);
        setApproved(res.data.fundRequests.rows.filter(row=> row.status==='Approved'))
        setRejected(res.data.fundRequests.rows.filter(row=> row.status==='Rejected'))
        setPending(res.data.fundRequests.rows.filter(row=> row.status==='Pending L1'))
        setFetchingRequests(false);
      })
    }
    getRequests()
  }, [])

  return (
    <div id="fund-requests" className="justify-content-center">
      <div className="row">
        <p id="invoices-counter" style={{marginRight:"120px"}}>
          Showing {Math.min(pageSize, requests.length)} of {requests.length} Requests
        </p>
        <ButtonGroup
          className="mr-5"
          style={{ alignItems: "center", marginRight:"10px", marginBottom:"0px", height:"32px" }}
        >
          <Button variant="outline-secondary">Pending</Button>
          <Button variant="outline-secondary">Approved</Button>
          <Button variant="outline-secondary">Rejected</Button>
          <Button active variant="outline-secondary" id="all">
            All
          </Button>
        </ButtonGroup>
        <Link to="/finance/requestfunds">
          <Button variant="info" className="ml-5 mr-5">
            + New
          </Button>
        </Link>
        <div id="invoices-filter" className="ml-5">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
        <table {...getTableProps()} className="table table-hover mt-2">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div>
          Page {pageIndex + 1} of {pageOptions.length}
        </div>
        <span style={{ marginLeft: "220px" }}>
          Go to page:{" "}
          <input
            type="number"
            min={1}
            max={Math.ceil(requests.length / pageSize)}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{
              width: "50px",
              marginRight: "2px",
              marginLeft: "2px",
              textAlign: "center",
            }}
          />
        </span>
        <button
          type="button"
          className="btn btn-sm btn-info"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          style={{
            height: "25px",
            width: "30px",
            marginRight: "2px",
            marginLeft: "2px",
          }}
        >
          {"<<"}
        </button>
        <button
          className="btn btn-sm btn-info"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{
            height: "25px",
            width: "50px",
            marginRight: "2px",
            marginLeft: "2px",
          }}
        >
          Prev
        </button>
        <button
          className="btn btn-sm btn-info"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{
            height: "25px",
            width: "50px",
            marginRight: "2px",
            marginLeft: "2px",
          }}
        >
          Next
        </button>
        <button
          className="btn btn-sm btn-info"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          style={{
            height: "25px",
            width: "30px",
            marginRight: "220px",
            marginLeft: "2px",
          }}
        >
          {">>"}
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          style={{ fontSize: "0.9rem" }}
        >
          {[5, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>
    </div>
  );
};

export default FundRequests;
