import React from "react";
import "./projects.css";

const Pagination = ({ projectsPerPage, totalProjects, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination justify-content-center">
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
