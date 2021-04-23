import React from "react";
import * as FaIcons from "react-icons/fa";
import tangibleLogo from "../images/logoTransparent.png";
import "./users.css";

export default function ForgotPassword() {
  return (
    <div className="register">
      <form>
        <div className="register-title">
          <img src={tangibleLogo} id="tangible-logo" />
          <h3>Retrieve Password</h3>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span>
                  <FaIcons.FaPaperPlane className="login-icon"/>
                </span>
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              placeholder="Registered Email id"
              required="required"
              name="email"
            />
          </div>
        </div>
        <div className="register-button" >
          <button className="btn btn-info" type="submit" id="register-button">Send Password Reset Link</button>
        </div>
      </form>
    </div>
  );
}
