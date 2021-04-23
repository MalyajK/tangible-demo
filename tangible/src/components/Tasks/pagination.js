import React from "react";
import "./tasks.css";

const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination justify-content-center mt-5">
        {pageNumbers.map((number) => (
          <li
            style={{cursor:"pointer"}}
            key={number}
            className={
              number === currentPage ? "page-item active" : "page-item"
            }
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
