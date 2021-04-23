import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="btn btn-sm"
      style={{width:"60px", marginRight:"15px", background:"#F4A261"}}
      onClick={() => logout({ returnTo: 'http://localhost:3000/logout' })}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
