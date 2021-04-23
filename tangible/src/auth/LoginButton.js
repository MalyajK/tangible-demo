import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-lg btn-info"
      onClick={() => loginWithRedirect()}
      style={{width:"310px", borderRadius:"15px"}}
    >
      Login
    </button>
  );
};

export default LoginButton;
