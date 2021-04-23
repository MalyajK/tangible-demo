import React, {useState, useEffect, useMemo} from 'react';
import {useTable, useSortBy, usePagination, useGlobalFilter} from "react-table";
import {useAuth0} from '@auth0/auth0-react';
import { TeamColumns } from "./TeamColumns";
import UsersApi from "../../apis/UsersApi";
import './team.css';

const MyTeam = () => {
  
  const columns = useMemo(() => TeamColumns, []);
  const {user} = useAuth0();
  const [team, setTeam] = useState([]);
  const data = useMemo(() => team, [team]);

  // get team members
  useEffect(() => {
    async function getTeam() {
      await UsersApi.get(`/teamMembers/${user.email}`).then((response) => {
        setTeam(response.data.teamMembers.rows);
      })
    }
    getTeam();
  }, [user.email]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    // nextPage,
    // previousPage,
    // canNextPage,
    // canPreviousPage,
    // pageOptions,
    // gotoPage,
    // pageCount,
    // setPageSize,
    // state,
    // setGlobalFilter,
    prepareRow,
  } = useTable(
    { columns, data, initialState: { pageSize: 100 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <div id="my-team"> 
      <p id="team-page-title">My Team</p>
      <table {...getTableProps()} className="table table-hover" id="team-table">
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
    </div>
  )
}

export default MyTeam
