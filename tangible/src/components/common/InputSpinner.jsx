import React, { useState } from "react";

const InputSpinner = () => {
  
  const [count, setCount] = useState();
  
  const decrement = () => {
    setCount(count - 1);
  }
  
  const increment = () => {
    setCount(count + 1);
  }
  
  return (
    <div>
      <input
        type="number"
        value={count}
        min={0}
        max={100}
        style={{
          width: "60px",
          height: "30px",
          fontSize: "1rem",
          textAlign: "center",
        }}
      />
    </div>
  );
};
export default InputSpinner;
