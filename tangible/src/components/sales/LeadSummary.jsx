import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { AvatarGenerator } from "random-avatar-generator";
import "./sales.css";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";
import CustomersApi from "../../apis/CustomersApi";

const LeadSummary = () => {
  const currency = '$';
  const generator = new AvatarGenerator();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const prospectLeads = leads.filter((lead) => lead.status === "Prospect");
  const discussionLeads = leads.filter(
    (lead) => lead.status === "In Discussions"
  );
  const submittedLeads = leads.filter(
    (lead) => lead.status === "Proposal Submitted"
  );
  const wonLeads = leads.filter((lead) => lead.status === "Won");
  const abortedLeads = leads.filter((lead) => lead.status === "Aborted");

  const ageing = (leadDate) => {
    const today = Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const subjectDate = Date.UTC(
      new Date(leadDate).getFullYear(),
      new Date(leadDate).getMonth(),
      new Date(leadDate).getDate()
    );
    const dateDiff = (today - subjectDate) / (1000 * 60 * 60 * 24);
    return dateDiff;
  };

  useEffect(() => {
    async function getLeads() {
      await CustomersApi.get("/leadSummary").then(
        (response) => {
          setLeads(response.data.leadSummary.rows);
          setLoading(false);
        }
      );
    }
    getLeads();
  }, []);

  if (!loading) {
    return (
      <div id="lead-summary">
        <div className="row">
          <div className="column" id="lead-container-main">
            <div
              id="heading-container"
              className="row justify-content-center mr-4"
              style={{ backgroundColor: "#264653", color: "white" }}
            >
              <p id="heading-text">Prospect</p>
            </div>
            {prospectLeads.map((lead) => (
              <div
                id="content-container"
                className="row mr-4"
                style={{ backgroundColor: "#DEEBF0", color: "black" }}
              >
                <div className="row">
                  <div className="column">
                    <img
                      src={generator.generateRandomAvatar(lead.assignee)}
                      alt="avatar"
                      id="lead-avatar"
                    />
                  </div>
                  <div className="column">
                    <strong>
                      <span>Lead Manager :</span>
                    </strong>
                    <br />
                    <span>{lead.full_name}</span>
                    <br />
                    <hr id="lead-break-sm" />
                    <strong>
                      <span>Lead Source</span>
                    </strong>
                    <br />
                    <span>{lead.source}</span>
                  </div>
                  <div className="container">
                    <hr id="lead-break-md" />
                    <strong>
                      <span>Customer</span>
                    </strong>
                    <br />
                    <span>
                      {lead.customer_type === "New"
                        ? lead.prospect
                        : lead.customer_name}
                    </span>
                    <br />
                    <hr id="lead-break-outer" />
                    <FcIcons.FcGlobe size={25} id="lead-sum-icon" />
                    <span>{lead.region}</span>
                    <br />
                    <FcIcons.FcFactory size={25} id="lead-sum-icon" />
                    <span>{lead.division_name}</span>
                    <br />
                    <FcIcons.FcMoneyTransfer size={25} id="lead-sum-icon" />
                    <span>
                      {currency} {Object.values(lead.pipeline).reduce(
                        (a, b) => parseInt(a) + parseInt(b)
                      )}
                    </span>
                    <br />
                    <FcIcons.FcCalendar size={25} id="lead-sum-icon" />
                    <span>{ageing(lead.created_on)} days old</span>
                    <Link to={`/sales/editlead/${lead.lead_id}`}><FaIcons.FaRegEdit
                      size={20}
                      style={{ float: "right", marginRight: "20px" }}
                    /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="column" id="lead-container-main">
            <div
              id="heading-container"
              className="row justify-content-center mr-4"
              style={{ backgroundColor: "#F4A261", color: "white" }}
            >
              <p id="heading-text">In Discussions</p>
            </div>
              {discussionLeads.map((lead) => (
                <div
                id="content-container"
                className="row mr-4"
                style={{ backgroundColor: "#FEF4EB", color: "black" }}
              >
                <div className="row">
                  <div className="column">
                    <img
                      src={generator.generateRandomAvatar(lead.assignee)}
                      alt="avatar"
                      id="lead-avatar"
                    />
                  </div>
                  <div className="column">
                    <strong>
                      <span>Lead Manager :</span>
                    </strong>
                    <br />
                    <span>{lead.full_name}</span>
                    <br />
                    <hr id="lead-break-sm" />
                    <strong>
                      <span>Lead Source</span>
                    </strong>
                    <br />
                    <span>{lead.source}</span>
                  </div>
                  <div className="container">
                    <hr id="lead-break-md" />
                    <strong>
                      <span>Customer</span>
                    </strong>
                    <br />
                    <span>
                      {lead.customer_type === "New"
                        ? lead.prospect
                        : lead.customer_name}
                    </span>
                    <br />
                    <hr id="lead-break-outer" />
                    <FcIcons.FcGlobe size={25} id="lead-sum-icon" />
                    <span>{lead.region}</span>
                    <br />
                    <FcIcons.FcFactory size={25} id="lead-sum-icon" />
                    <span>{lead.division_name}</span>
                    <br />
                    <FcIcons.FcMoneyTransfer size={25} id="lead-sum-icon" />
                    <span>
                    {currency} {Object.values(lead.pipeline).reduce(
                        (a, b) => parseInt(a) + parseInt(b)
                      )}
                    </span>
                    <br />
                    <FcIcons.FcCalendar size={25} id="lead-sum-icon" />
                    <span>{ageing(lead.created_on)} days old</span>
                    <Link to={`/sales/editlead/${lead.lead_id}`}><FaIcons.FaRegEdit
                      size={20}
                      style={{ float: "right", marginRight: "20px" }}
                    /></Link>
                  </div>
                </div>
                </div>
              ))}
          </div>
          <div className="column" id="lead-container-main">
            <div
              id="heading-container"
              className="row justify-content-center mr-4"
              style={{ backgroundColor: "#E9C46A", color: "white" }}
            >
              <p id="heading-text">Proposal Submitted</p>
            </div>
              {submittedLeads.map((lead) => (
                <div
                id="content-container"
                className="row mr-4"
                style={{ backgroundColor: "#FCF8EC", color: "black" }}
              >
                <div className="row">
                  <div className="column">
                    <img
                      src={generator.generateRandomAvatar(lead.assignee)}
                      alt="avatar"
                      id="lead-avatar"
                    />
                  </div>
                  <div className="column">
                    <strong>
                      <span>Lead Manager :</span>
                    </strong>
                    <br />
                    <span>{lead.full_name}</span>
                    <br />
                    <hr id="lead-break-sm" />
                    <strong>
                      <span>Lead Source</span>
                    </strong>
                    <br />
                    <span>{lead.source}</span>
                  </div>
                  <div className="container">
                    <hr id="lead-break-md" />
                    <strong>
                      <span>Customer</span>
                    </strong>
                    <br />
                    <span>
                      {lead.customer_type === "New"
                        ? lead.prospect
                        : lead.customer_name}
                    </span>
                    <br />
                    <hr id="lead-break-outer" />
                    <FcIcons.FcGlobe size={25} id="lead-sum-icon" />
                    <span>{lead.region}</span>
                    <br />
                    <FcIcons.FcFactory size={25} id="lead-sum-icon" />
                    <span>{lead.division_name}</span>
                    <br />
                    <FcIcons.FcMoneyTransfer size={25} id="lead-sum-icon" />
                    <span>
                    {currency} {Object.values(lead.pipeline).reduce(
                        (a, b) => parseInt(a) + parseInt(b)
                      )}
                    </span>
                    <br />
                    <FcIcons.FcCalendar size={25} id="lead-sum-icon" />
                    <span>{ageing(lead.created_on)} days old</span>
                    <Link to={`/sales/editlead/${lead.lead_id}`}><FaIcons.FaRegEdit
                      size={20}
                      style={{ float: "right", marginRight: "20px" }}
                    /></Link>
                  </div>
                </div>
                </div>
              ))}
          </div>
          <div className="column" id="lead-container-main">
            <div
              id="heading-container"
              className="row justify-content-center mr-4"
              style={{ backgroundColor: "#2A9D8F", color: "white" }}
            >
              <p id="heading-text">Won</p>
            </div>
              {wonLeads.map((lead) => (
                <div
                id="content-container"
                className="row mr-4"
                style={{ backgroundColor: "#E0F7F4", color: "black" }}
              >
                <div className="row">
                  <div className="column">
                    <img
                      src={generator.generateRandomAvatar(lead.assignee)}
                      alt="avatar"
                      id="lead-avatar"
                    />
                  </div>
                  <div className="column">
                    <strong>
                      <span>Lead Manager :</span>
                    </strong>
                    <br />
                    <span>{lead.full_name}</span>
                    <br />
                    <hr id="lead-break-sm" />
                    <strong>
                      <span>Lead Source</span>
                    </strong>
                    <br />
                    <span>{lead.source}</span>
                  </div>
                  <div className="container">
                    <hr id="lead-break-md" />
                    <strong>
                      <span>Customer</span>
                    </strong>
                    <br />
                    <span>
                      {lead.customer_type === "New"
                        ? lead.prospect
                        : lead.customer_name}
                    </span>
                    <br />
                    <hr id="lead-break-outer" />
                    <FcIcons.FcGlobe size={25} id="lead-sum-icon" />
                    <span>{lead.region}</span>
                    <br />
                    <FcIcons.FcFactory size={25} id="lead-sum-icon" />
                    <span>{lead.division_name}</span>
                    <br />
                    <FcIcons.FcMoneyTransfer size={25} id="lead-sum-icon" />
                    <span>
                    {currency} {Object.values(lead.pipeline).reduce(
                        (a, b) => parseInt(a) + parseInt(b)
                      )}
                    </span>
                    <br />
                    <FcIcons.FcCalendar size={25} id="lead-sum-icon" />
                    <span>{ageing(lead.created_on)} days old</span>
                    <Link to={`/sales/editlead/${lead.lead_id}`}><FaIcons.FaRegEdit
                      size={20}
                      style={{ float: "right", marginRight: "20px"}}
                    /></Link>
                  </div>
                </div>
                </div>
              ))}
          </div>
          <div className="column" id="lead-container-main">
            <div
              id="heading-container"
              className="row justify-content-center"
              style={{ backgroundColor: "#E76F51", color: "white" }}
            >
              <p id="heading-text">Lost / Cold</p>
            </div>
              {abortedLeads.map((lead) => (
                <div
                id="content-container"
                className="row"
                style={{ backgroundColor: "#FCEDE9", color: "black" }}
              >
                <div className="row">
                  <div className="column">
                    <img
                      src={generator.generateRandomAvatar(lead.assignee)}
                      alt="avatar"
                      id="lead-avatar"
                    />
                  </div>
                  <div className="column">
                    <strong>
                      <span>Lead Manager :</span>
                    </strong>
                    <br />
                    <span>{lead.full_name}</span>
                    <br />
                    <hr id="lead-break-sm" />
                    <strong>
                      <span>Lead Source</span>
                    </strong>
                    <br />
                    <span>{lead.source}</span>
                  </div>
                  <div className="container">
                    <hr id="lead-break-md" />
                    <strong>
                      <span>Customer</span>
                    </strong>
                    <br />
                    <span>
                      {lead.customer_type === "New"
                        ? lead.prospect
                        : lead.customer_name}
                    </span>
                    <br />
                    <hr id="lead-break-outer" />
                    <FcIcons.FcGlobe size={25} id="lead-sum-icon" />
                    <span>{lead.region}</span>
                    <br />
                    <FcIcons.FcFactory size={25} id="lead-sum-icon" />
                    <span>{lead.division_name}</span>
                    <br />
                    <FcIcons.FcMoneyTransfer size={25} id="lead-sum-icon" />
                    <span>
                    {currency} {Object.values(lead.pipeline).reduce(
                        (a, b) => parseInt(a) + parseInt(b)
                      )}
                    </span>
                    <br />
                    <FcIcons.FcCalendar size={25} id="lead-sum-icon" />
                    <span>{ageing(lead.created_on)} days old</span>
                    <Link to={`/sales/editlead/${lead.lead_id}`}><FaIcons.FaRegEdit
                      size={20}
                      style={{ float: "right", marginRight: "20px"}}
                    /></Link>
                  </div>
                </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else return <div id="lead-summary">Fetching Details...</div>;
};

export default LeadSummary;
