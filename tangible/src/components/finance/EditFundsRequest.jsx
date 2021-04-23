import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useParams, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Bar, BarChart, Tooltip, XAxis } from "recharts";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt } from "react-icons/fa";
import { AvatarGenerator } from "random-avatar-generator";
import { VscChromeClose, VscCheck } from "react-icons/vsc";
import FinanceApi from "../../apis/FinanceApi";
import "./finance.css";

const EditFundsRequest = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const history = useHistory();
  const generator = new AvatarGenerator();
  const [request, setRequest] = useState([]);
  // const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [fetchingRequest, setFetchingRequest] = useState(true);

  const months = [
    { short: "JAN", long: "January", tiny: "J" },
    { short: "FEB", long: "February", tiny: "F" },
    { short: "MAR", long: "March", tiny: "M" },
    { short: "APR", long: "April", tiny: "A" },
    { short: "MAY", long: "May", tiny: "M" },
    { short: "JUN", long: "June", tiny: "J" },
    { short: "JUL", long: "July", tiny: "J" },
    { short: "AUG", long: "August", tiny: "A" },
    { short: "SEP", long: "September", tiny: "S" },
    { short: "OCT", long: "October", tiny: "O" },
    { short: "NOV", long: "November", tiny: "N" },
    { short: "DEC", long: "December", tiny: "D" },
  ];

  const quarters = [
    { name: "Q1" },
    { name: "Q2" },
    { name: "Q3" },
    { name: "Q4" },
  ];

  useEffect(() => {
    async function getRequest() {
      await FinanceApi.get(`/fundRequests/${id}`).then((res) => {
        setRequest(res.data.fundRequestById.rows[0]);
        setFetchingRequest(false);
      });
    }
    getRequest();
  }, [id]);

  function totalAmount(frequency, starting, amount) {
    if (frequency === "Monthly") {
      return (
        (12 - months.findIndex((month) => month.short === starting)) * amount
      );
    }
    if (frequency === "Quarterly") {
      return (
        (4 - quarters.findIndex((quarter) => quarter.name === starting)) *
        amount
      );
    } else return amount;
  }

  const chartData = [
    {
      month: "J",
      spend: 0,
    },
    {
      month: "F",
      spend: 0,
    },
    {
      month: "M",
      spend: 0,
    },
    {
      month: "A",
      spend: 700,
    },
    {
      month: "M",
      spend: 700,
    },
    {
      month: "J",
      spend: 700,
    },
    {
      month: "J",
      spend: 700,
    },
    {
      month: "A",
      spend: 700,
    },
    {
      month: "S",
      spend: 700,
    },
    {
      month: "O",
      spend: 700,
    },
    {
      month: "N",
      spend: 700,
    },
    {
      month: "D",
      spend: 700,
    },
  ];

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      await FinanceApi.patch(`fundRequests/${id}`, {
        status: "Approved",
        comments: {
          user: user.nickname,
          content: comment,
        },
      });
    } catch (error) {}
    history.push("/finance/fundrequests");
    alert("Updated Successfully");
  };

  const handleReject = async (e) => {
    if (!comment) {
      alert("Please add a comment before submitting!");
    } else {
      e.preventDefault();
      try {
        await FinanceApi.patch(`fundRequests/${id}`, {
          status: "Rejected",
          comments: {
            user: user.nickname,
            content: comment,
          },
        });
      } catch (error) {}
      history.push("/finance/fundrequests");
      alert("Updated Successfully");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await FinanceApi.patch(`fundRequests/${id}`, {
        status: request.status,
        comments: {
          user: user.nickname,
          content: comment,
        },
      });
    } catch (error) {}
    history.push("/finance/fundrequests");
    alert("Updated Successfully");
  };

  const allFetched = !fetchingRequest;

  if (allFetched) {
    return (
      // Main container
      <div id="edit-fund-req">
        {/* First horizontal container */}
        <div className="row" style={{ marginLeft: "20px" }}>
          {/* First section of first horizontal */}
          <div className="column mr-2" id="efr-left">
            <p id="efr-small-title">Request ID</p>
            <p id="efr-output">{request.request_id}</p>
            <hr id="hr" />
            <p id="efr-small-title">Initiated By</p>
            <img
              id="initiator-avatar"
              src={generator.generateRandomAvatar(request.initiator)}
              alt="profile-pic"
            />
            <p id="efr-output">{request.initiator_name}</p>
            <hr id="hr" />
            <p id="efr-small-title">Created On</p>
            <p id="efr-output">
              {format(new Date(request.created_at), "do MMM yyyy")}
            </p>
            <hr id="hr" />
            <p id="efr-small-title">Status</p>
            <p id="efr-output">{request.status}</p>
            <hr id="hr" />
          </div>
          {/* Second section of first horizontal */}
          <div className="column mr-2" id="efr-middle">
            <p id="efr-small-title">Description</p>
            <p id="efr-output">{request.description}</p>
            <hr id="hr" />
            {request.project_id ? (
              <>
                <p id="efr-small-title">Project Title</p>
                <p id="efr-output">{request.project_title}</p>
                <hr id="hr" />
              </>
            ) : request.task_id ? (
              <>
                <p id="efr-small-title">Task Title</p>
                <p id="efr-output">{request.task_title}</p>
                <hr id="hr" />
              </>
            ) : (
              <>
                <p id="efr-small-title">Project / Task</p>
                <p id="efr-output">This requisition is unassigned</p>
                <hr id="hr" />
              </>
            )}
            <p id="efr-small-title">Department</p>
            <p id="efr-output">{request.department_name}</p>
            <hr id="hr" />
            <p id="efr-small-title">Expense Head</p>
            <p id="efr-output">{request.expense_head}</p>
            <hr id="hr" />
            <p id="efr-small-title">Budgeted</p>
            {request.budgeted === true ? (
              <VscCheck size={35} color="#2A9D8F" />
            ) : (
              <VscChromeClose size={35} color="#E76F51" />
            )}
            <hr id="hr" />
          </div>
          {/* Third section of first horizontal */}
          <div className="column mr-5" id="efr-right">
            <p id="efr-small-title">Amount</p>
            <p id="efr-output">
              US$ {request.amount}{" "}
              {request.frequency === "Monthly"
                ? `every month starting ${
                    months.filter((row) => row.short === request.starting)[0]
                      .long
                  }`
                : request.frequency === "Quarterly"
                ? `every quarter starting ${request.starting}`
                : request.frequency === "Exact"
                ? `on or before ${format(
                    new Date(request.required_by),
                    "do MMM yyyy"
                  )}`
                : `this year`}
            </p>
            <hr id="hr" />
            <div
              style={{
                display:
                  request.frequency === "Annual" ||
                  request.frequency === "Exact"
                    ? "none"
                    : "flex",
              }}
            >
              <div className="mr-5" style={{ width: "200px" }}>
                <p id="efr-small-title">Total This Year</p>
                <p id="efr-output">
                  US${" "}
                  {totalAmount(
                    request.frequency,
                    request.starting,
                    request.amount
                  )}
                </p>
              </div>
              <BarChart
                data={chartData}
                width={350}
                height={100}
                margin={{ right: 30 }}
              >
                <XAxis dataKey="month" tickLine={false} />
                <Bar dataKey="spend" fill="#F4A261" />
                <Tooltip />
              </BarChart>
            </div>
            <hr
              id="hr"
              style={{
                display:
                  request.frequency === "Annual" ||
                  request.frequency === "Exact"
                    ? "none"
                    : "flex",
              }}
            />
            <Form>
              <div style={{ width: "490px" }}>
                <p id="efr-small-title">
                  Add a comment <em>(mandatory if rejecting)</em>
                </p>
                <FormControl
                  as="textarea"
                  maxLength={150}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="max 150 characters"
                  style={{ backgroundColor: "#FCF8EC" }}
                  required
                />
              </div>
              <div className="row ml-0 mt-3">
                <div
                  className="mr-4"
                  style={{
                    display: request.status === "Approved" ? "none" : "block",
                  }}
                >
                  <Button
                    type="submit"
                    variant="success"
                    onClick={handleApprove}
                  >
                    <FaThumbsUp size={20} />
                  </Button>
                </div>
                <div
                  className="mr-4"
                  style={{
                    display: request.status === "Rejected" ? "none" : "block",
                  }}
                >
                  <Button variant="danger" type="submit" onClick={handleReject}>
                    <FaThumbsDown size={20} />
                  </Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    disabled={!comment}
                    onClick={handleComment}
                  >
                    <FaCommentAlt size={20}/>
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="row ml-4 mt-3">
          <div
            style={{
              width: "480px",
              padding: "20px",
              border: "1px solid #BDD6E0",
              borderRadius: "10px",
            }}
            className="column"
          >
            <h5 style={{ fontWeight: "bold" }}>Comments</h5>
            <hr id="hr" />
            {request.comments &&
              request.comments.map((obj) => (
                <div
                  className="mb-2"
                  style={{
                    textAlign: obj.user === user.nickname ? "right" : "left",
                  }}
                >
                  <p
                    style={{
                      color: "brown",
                      fontWeight: "bold",
                      margin: "0px",
                    }}
                  >
                    {obj.user}:{" "}
                  </p>
                  <p style={{ margin: "0px" }}>{obj.content}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div id="edit-fund-req">
        <h5>Fetching Data...</h5>
      </div>
    );
};

export default EditFundsRequest;
