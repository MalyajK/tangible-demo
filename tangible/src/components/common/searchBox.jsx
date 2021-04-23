import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <form>
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      style={{width:'400px'}}
    />
    </form>
  );
};

export default SearchBox;