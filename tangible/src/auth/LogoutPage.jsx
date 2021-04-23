import React from "react";
import LoginButton from "./LoginButton";
import tangibleLogo from "../components/images/originalOnTransparent.png";
// import background from "../components/images/loginImage.jpg";

const LogoutPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // backgroundImage: `url(${background})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        // backgroundAttachment: "fixed",
        // backgroundSize: "cover",
        // height: "100vh",
      }}
    >
      <form
        style={{
          marginTop: "150px",
          paddingTop: "35px",
          // borderStyle: "solid",
          // borderColor: "#fafafa",
          // borderRadius: "15px",
          width: "400px",
          height: "400px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={tangibleLogo}
            alt="Tangible"
            style={{ width: "310px", height: "240px", marginBottom: "30px" }}
          />
          <div>
          <LoginButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogoutPage;
