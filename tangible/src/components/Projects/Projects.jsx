import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import {Columns} from './Columns';
import ProjectsApi from '../../apis/ProjectsApi';
import {GlobalFilter} from '../common/GlobalFilter';
import './projects.css';

const Projects = () => {
  // set projects
  const [projects, setProjects] = useState([]);

  // get projects
  useEffect(() => {
    async function getProjects() {
      const response = await ProjectsApi.get("/projectsTable");
      setProjects(response.data.projectsTable.rows);
    }
    getProjects();
  }, []);

  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => projects, [projects]);

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

  return (
    <div id="projects-main">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <p id="projects-counter">Showing {pageSize} of {projects.length} projects ...</p>
      <table {...getTableProps()} className="table table-hover mt-4">
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
                    <td {...cell.getCellProps()} id="project-row">{cell.render("Cell")}</td>
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
            max={Math.ceil(projects.length / pageSize)}
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
          {[4, 5, 10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="row status-legend">
        <FaIcons.FaThumbsUp size={20} color="#35ad2a" />
        <span id="status-legend">Complete</span>
        <BiIcons.BiRun size={35} color="red" />
        <span id="status-legend">Almost due</span>
        <FaIcons.FaArrowsAltH size={25} color="#2a58ad" />
        <span id="status-legend">Not due</span>
        <BsIcons.BsAlarm size={25} />
        <span id="status-legend">Due Today</span>
        <FaIcons.FaFlag size={20} color="red" />
        <span id="status-legend">Overdue</span>
      </div>
    </div>
  )
};

export default Projects
