import React from "react";
import * as FaIcons from "react-icons/fa";
import tangibleLogo from "../images/logoTransparent.png";
import "./users.css";

export default function Login() {
  return (
    <div className="register">
      <form>
        <div className="register-title">
          <img src={tangibleLogo} id="tangible-logo" />
          <h3>Login to Tangible</h3>
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
              placeholder="Email"
              required="required"
              name="email"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span>
                  <FaIcons.FaLock className="login-icon"/>
                </span>
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required="required"
              name="password"
            />
          </div>
        </div>
        <div>
          <label class="form-check-label"><input type="checkbox"/>Keep me signed in</label>
        </div>
        <div className="register-button" >
          <button className="btn btn-info" type="submit" id="register-button">LOGIN</button>
        </div>
        <div className="form-group">
          <span>New User? </span><a href="/register">Register Here</a>
          <a href="/forgotPassword" style={{float:"right"}}>Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}
