import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import UsersApi from "../../apis/UsersApi";

export default function UserProfile() {
  const { id } = useParams();
  // const { user } = useAuth0();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      await UsersApi.get(`/userData/${id}`).then(
        (response) => {
          setLoading(false);
          setUserData(response.data.userData.rows[0]);
        }
      );
    } 
    getUserData();
  }, [id]);

  const imageUrl = "/images/" + id + ".png"
  const defaultImageUrl = "/images/default.png"

  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "center",
        paddingTop: "80px",
      }}
    >
      <img
        style={{ width: "80px", height: "80px", marginBottom: "15px" }}
        src={!loading ? (imageUrl) : (defaultImageUrl)}
        alt="profile pic"
      />
      {!loading ? (
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          {userData.first_name} {userData.last_name}
        </p>
      ) : <p>Fetching data ....</p>}
      
      <table className="table" style={{ width: "400px", marginLeft: "520px" }}>
        <tr>
          <td style={{ fontWeight: "bold", textAlign: "left" }}>Department</td>
          <td>|</td>
          {!loading ? (
            <td>{userData.department_name}</td>
          ) : (
            <td>Fetching data ....</td>
          )}
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", textAlign: "left" }}>Location</td>
          <td>|</td>
          {!loading ? (
            <td>
            {userData.building} - {userData.city_name}
          </td>
          ) : (<td>Fetching data ....</td>)}
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", textAlign: "left" }}>Email</td>
          <td>|</td>
          {!loading ? (
            <td>{userData.email}</td>
          ) : (<td>Fetching data ....</td>)}
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", textAlign: "left" }}>Mobile</td>
          <td>|</td>
          {!loading ? (
            <td>{userData.mobile_no}</td>
          ) : (<td>Fetching data ....</td>)}
        </tr>
        <tr>
          <td style={{ fontWeight: "bold", textAlign: "left" }}>Manager</td>
          <td>|</td>
          <td>Malyaj Kaloni</td>
        </tr>
      </table>
    </div>
  );
}
