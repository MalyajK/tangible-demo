import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { GlobalFilter } from "../common/GlobalFilter";
import CustomersApi from "../../apis/CustomersApi";
import { CustomerColumns } from "./CustomerColumns";
import "./sales.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const columns = useMemo(() => CustomerColumns, []);
  const data = useMemo(() => customers, [customers]);

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
    { columns, data, initialState: { pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    async function getCustomers() {
      await CustomersApi.get("/customerList").then(
        (response) => {
          setCustomers(response.data.customerList.rows);
        }
      );
    }
    getCustomers();
  }, []);

  return (
    <div id="sales-customers">
      <div id="customer-filter">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <p id="customer-counter">
        Showing {pageSize} of {customers.length} customers
      </p>
      <ButtonGroup id="customer-period-toggler">
        <Button variant="outline-secondary">Month</Button>
        <Button variant="outline-secondary">Quarter</Button>
        <Button variant="outline-secondary" active>Year</Button>
      </ButtonGroup>
      <table {...getTableProps()} className="table table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} id="customer-header">
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
                    <td {...cell.getCellProps()} id="customer-row">{cell.render("Cell")}</td>
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
            max={Math.ceil(customers.length / pageSize)}
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
  );
};

export default Customers;
