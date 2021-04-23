import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control"
      placeholder="Search...."
    />
  );
};
