import React from "react";
import * as FaIcons from "react-icons/fa";
import tangibleLogo from "../images/logoTransparent.png";
import LocationDropdown from "../common/locationDropdown";
import DepartmentDropdown from "../common/departmentDropdown";
import "./users.css";

export default function Register() {
  return (
    <div className="register">
      <form>
        <div className="register-title">
          <img src={tangibleLogo} id="tangible-logo" />
          <h3>Sign Up for Tangible</h3>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span>
                  <FaIcons.FaUser className="login-icon"/>
                </span>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              required="required"
              name="first_name"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span>
                  <FaIcons.FaUser className="login-icon"/>
                </span>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              required="required"
              name="last_name"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span>
                  <FaIcons.FaMapMarkerAlt className="login-icon"/>
                </span>
              </span>
            </div>
            <select 
              className="form-control"
              required="required"
              name="location" 
            >
              <option disabled selected>Location</option>
              <LocationDropdown />
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span>
                  <FaIcons.FaShieldAlt className="login-icon"/>
                </span>
              </span>
            </div>
            <select 
              className="form-control"
              required="required"
              name="location" 
            >
              <option disabled selected>Department</option>
              <DepartmentDropdown />
            </select>
          </div>
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
              placeholder="Confirm Password"
              required="required"
              name="confirm_password"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span>
                  <FaIcons.FaPhoneAlt className="login-icon"/>
                </span>
              </span>
            </div>
            <input
              type="text"
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              className="form-control"
              placeholder="Mobile Number"
              required="required"
              name="mobile"
            />
          </div>
        </div>
        <div className="register-button" >
          <button className="btn btn-info" type="submit" id="register-button">REGISTER</button>
        </div>
        <div class="text-center">Already have an account? <a href="/login">Login here</a></div>
      </form>
    </div>
  );
}
