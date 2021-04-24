import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../auth/LogoutButton";
import {UserContext} from "../../auth/UserContext";

export default function Avatar() {
  const { user } = useAuth0();
  const generator = new AvatarGenerator();
  const currentUser = useContext(UserContext);

  return (
    <div
      style={{
        marginTop: "px",
        color: "#264653",
        textAlign: "center",
        borderStyle: "solid",
        borderColor: "grey",
        borderWidth: "1px",
        borderRadius: "10px",
        paddingTop: "5px",
        paddingBottom: "10px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <img
        src={generator.generateRandomAvatar(currentUser)}
        alt="profile pic"
        style={{ width: "60px", height: "60px", marginBottom: "10px" }}
      />
      <p style={{ fontSize: "0.8rem" }}>Signed in as:</p>
      <p style={{ marginTop: "-10px", marginBottom: "10px" }}>{user.name}</p>
      <LogoutButton />
      <Link to={`/users/${currentUser}`}>
        <button
          className="btn btn-sm"
          style={{ width: "60px", backgroundColor: "#32BCAC", color: "#fff" }}
        >
          Profile
        </button>
      </Link>
    </div>
  );
}
