import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../auth/LogoutButton";
import UsersApi from "../../apis/UsersApi";

export default function Avatar() {
  const { user } = useAuth0();
  const [userId, setUserId] = useState([]);
  const [loading, setLoading] = useState(true);
  const generator = new AvatarGenerator();

  useEffect(() => {
    async function getUserId() {
      await UsersApi.get(`/userId/${user.email}`).then((response) => {
        setLoading(false);
        setUserId(response.data.userId.rows[0]);
      });
    }
    getUserId();
  }, [user.email]);
  
  return (
    <div
      style={{
        marginTop: "35px",
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
        src={generator.generateRandomAvatar(userId.user_id)}
        alt="profile pic"
        style={{ width: "60px", height: "60px", marginBottom: "10px" }}
      />
      <p style={{ fontSize: "0.8rem" }}>Signed in as:</p>
      <p style={{ marginTop: "-10px", marginBottom: "10px" }}>
        {user.name}
      </p>
      <LogoutButton />
      {!loading ? (
        <Link to={`/users/${userId.user_id}`}>
          <button className="btn btn-sm" style={{ width: "60px", backgroundColor:"#2A9D8F", color:"#fff" }}>
            Profile
          </button>
        </Link>
      ) : (
        <Link to={`/users`}>
          <button className="btn btn-sm" style={{ width: "60px", backgroundColor:"2A9D8F", color:"#fff" }}>
            Profile
          </button>
        </Link>
      )}
    </div>
  );
}
