import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import FinanceApi from "../../apis/FinanceApi";
import { GlobalFilter } from "../common/GlobalFilter";
import { Columns } from "./InvoicesColumns";
import "./finance.css";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => invoices, [invoices]);

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
    async function getInvoices() {
      await FinanceApi.get("/invoices").then((response) => {
        setInvoices(response.data.invoices.rows);
      });
    }
    getInvoices();
  }, []);

  return (
    <div id="fin-collect">
      <div id="invoices-filter" className="mb-3">
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
      </div>
      <p id="invoices-counter">
        Showing {pageSize} of {invoices.length} invoices ...
      </p>
      <table {...getTableProps()} className="table table-hover">
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
            max={Math.ceil(invoices.length / pageSize)}
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

export default Invoices;
