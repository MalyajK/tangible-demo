import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import TangibleLogo from "../images/logoTransparent.png";
import * as BsIcons from "react-icons/bs";
import "./navbar.css";

const NavbarMain = () => {

  return (
    <div id="navbar-main">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <img id="navbar-logo" src={TangibleLogo} alt="Logo" />
        <Navbar.Brand href="#home">Tangible</Navbar.Brand>
        <div style={{ marginLeft: "100px" }}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Item style={{ color: "#E76F51", marginRight: "10px" }}>
              Quick Links
            </Nav.Item>
            <BsIcons.BsBoxArrowInRight color="lightgrey" size={30} />
            <Nav className="mr-4 ml-4">
              <NavDropdown title="SALES" id="nav-items">
                <NavDropdown.Item>
                  <Link id="link" to="/sales/customers">
                    Customers
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/sales/createlead">
                    Create Lead
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/sales/leadsummary">
                    Manage Leads
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/sales/existing">
                    Existing Business
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/sales/target">
                    Target
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link id="link" to="/tasks/create">
                    Create Todo
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-4">
              <NavDropdown title="FINANCE" id="nav-items">
                <NavDropdown.Item>
                  <Link id="link" to="/finance/receivables">
                    Receivables
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/finance/budgets">
                    Budget
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/finance/fundrequests">
                    Fund Requests
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/finance/requestfunds">
                    New Fund Request
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link id="link" to="/tasks/create">
                    Create Todo
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-4">
              <NavDropdown title="MARKETING" id="nav-items">
                <NavDropdown.Item href="">Record Collection</NavDropdown.Item>
                <NavDropdown.Item href="">Hello Mister</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-4">
              <NavDropdown title="OPERATIONS" id="nav-items">
                <NavDropdown.Item href="">Record Collection</NavDropdown.Item>
                <NavDropdown.Item href="">Hello Mister</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-4">
              <NavDropdown title="ENGINEERING" id="nav-items">
                <NavDropdown.Item href="">Record Collection</NavDropdown.Item>
                <NavDropdown.Item href="">Hello Mister</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-4">
              <NavDropdown title="HR" id="nav-items">
                <NavDropdown.Item>
                  <Link id="link" to="/hr/requisition">
                    Employee Requisition
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/hr/exit">
                    Employee Exit
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link id="link" to="/hr/grievance">
                    Employee Grievance
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="/hr/onboarding">
                  Employee Onboarding
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/tasks/create">
                  Create Todo
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-4">
              <NavDropdown title="ADMIN" id="nav-items">
                <NavDropdown.Item href=""></NavDropdown.Item>
                <NavDropdown.Item href="">Hello Mister</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Create Todo
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="mr-4">
              <NavDropdown title="IT" id="nav-items">
                <NavDropdown.Item href="">Record Collection</NavDropdown.Item>
                <NavDropdown.Item href="">Hello Mister</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarMain;
