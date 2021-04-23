import React from "react";
import tangibleLogo from "../components/images/originalOnTransparent.png";

export default function RefreshPage() {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "130px auto auto auto",
        justifyContent: "center",
      }}
    >
      <img
        src={tangibleLogo}
        alt="Tangible"
        style={{ width: "200px", height: "155px", marginBottom: "60px" }}
      />
      <h3 style={{ fontWeight: "bold", color: "darkgrey" }}>Loading . . . . </h3>
    </div>
  );
}
