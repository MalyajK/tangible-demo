import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAuth0 } from "@auth0/auth0-react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UsersApi from "../../apis/UsersApi";
import CustomersApi from "../../apis/CustomersApi";
import DivisionsApi from "../../apis/DivisionsApi";
import { TooltipStyle } from "./TooltipStyle";
import "./sales.css";

const CreateLead = () => {
  const history = useHistory();
  const { user } = useAuth0();
  const today = new Date();
  const currentMonth = today.getMonth();
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState();
  const [region, setRegion] = useState();
  const [divisions, setDivisions] = useState([]);
  const [divisionId, setDivisionId] = useState();
  const [source, setSource] = useState();
  const [assignees, setAssignees] = useState([]);
  const [assigneeId, setAssigneeId] = useState();
  const [status, setStatus] = useState();
  const [customerType, setCustomerType] = useState("Existing");
  const [userId, setUserId] = useState([]);
  const [prospect, setProspect] = useState();
  const [likelihood, setLikelihood] = useState();
  const [jan, setJan] = useState(0);
  const [feb, setFeb] = useState(0);
  const [mar, setMar] = useState(0);
  const [apr, setApr] = useState(0);
  const [may, setMay] = useState(0);
  const [jun, setJun] = useState(0);
  const [jul, setJul] = useState(0);
  const [aug, setAug] = useState(0);
  const [sep, setSep] = useState(0);
  const [oct, setOct] = useState(0);
  const [nov, setNov] = useState(0);
  const [dec, setDec] = useState(0);

  // get user fullname and department to feed assignee dropdown menu
  useEffect(() => {
    async function getAssignees() {
      const response = await UsersApi.get("/salesMarketing");
      setAssignees(response.data.salesMarketing.rows);
    }
    getAssignees();
  }, []);

  // Populate customer dropdown
  useEffect(() => {
    async function getCustomers() {
      const response = await CustomersApi.get("/");
      setCustomers(response.data.customers.rows);
    }
    getCustomers();
  }, []);

  // Populate divisions dropdown
  useEffect(() => {
    async function getDivisions() {
      const response = await DivisionsApi.get("/");
      setDivisions(response.data.divisions.rows);
    }
    getDivisions();
  }, []);

  // get identity of logged in user
  useEffect(() => {
    async function getUserId() {
      const response = await UsersApi.get(`/userId/${user.email}`);
      setUserId(response.data.userId.rows[0]);
    }
    getUserId();
  }, [user.email]);

  const chartData = [
    {
      name: "JAN",
      value: jan,
    },
    {
      name: "FEB",
      value: feb,
    },
    {
      name: "MAR",
      value: mar,
    },
    {
      name: "APR",
      value: apr,
    },
    {
      name: "MAY",
      value: may,
    },
    {
      name: "JUN",
      value: jun,
    },
    {
      name: "JUL",
      value: jul,
    },
    {
      name: "AUG",
      value: aug,
    },
    {
      name: "SEP",
      value: sep,
    },
    {
      name: "OCT",
      value: oct,
    },
    {
      name: "NOV",
      value: nov,
    },
    {
      name: "DEC",
      value: dec,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CustomersApi.post("/leads", {
        customer_type: customerType,
        customer_id: customerId,
        division: divisionId,
        assignee: assigneeId,
        prospect: prospect,
        region: region,
        source: source,
        status: status,
        pipeline: {
          January: jan,
          February: feb,
          March: mar,
          April: apr,
          May: may,
          June: jun,
          July: jul,
          August: aug,
          September: sep,
          October: oct,
          November: nov,
          December: dec,
        },
        created_by: userId.user_id,
        likelihood: likelihood,
      });
    } catch (error) {}
    history.push("/sales/customers");
    alert("Lead Created Successfully");
  };

  return (
    <div id="sales-lead">
      <h5 id="lead-title">Create Lead</h5>
      <div id="lead-input-group" className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Customer Type</span>
        </div>
        <input
          className="lead-radio"
          type="radio"
          id="existing"
          name="customerType"
          value="Existing"
          checked={customerType === "Existing"}
          onClick={(e) => setCustomerType(e.target.value)}
        />
        <label id="lead-radio-text" for="existing">
          Existing
        </label>
        <input
          className="lead-radio"
          type="radio"
          id="new"
          name="customerType"
          value="New"
          checked={customerType === "New"}
          onClick={(e) => setCustomerType(e.target.value)}
        />
        <label id="lead-radio-text" for="new">
          New
        </label>
      </div>
      <Form onSubmit={handleSubmit}>
        <table className="table" id="lead-basic">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Region</th>
              <th>Division</th>
              <th>Source</th>
              <th>Assign To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {customerType === "Existing" ? (
                <td>
                  <select
                    value={customerId}
                    className="form-control"
                    onChange={(e) => setCustomerId(e.target.value)}
                  >
                    <option></option>
                    {customers.map((customer) => (
                      <option
                        key={customer.customer_id}
                        value={customer.customer_id}
                      >
                        {customer.customer_name}
                      </option>
                    ))}
                  </select>
                </td>
              ) : (
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter prospect name"
                    value={prospect}
                    onChange={(e) => setProspect(e.target.value)}
                  />
                </td>
              )}
              <td>
                <select
                  value={region}
                  className="form-control"
                  onChange={(e) => setRegion(e.target.value)}
                  required
                >
                  <option></option>
                  <option value="United States">United States</option>
                  <option value="France">France</option>
                  <option value="Canada">Canada</option>
                </select>
              </td>
              <td>
                <select
                  value={divisionId}
                  className="form-control"
                  onChange={(e) => setDivisionId(e.target.value)}
                  required
                >
                  <option></option>
                  {divisions.map((division) => (
                    <option
                      key={division.division_id}
                      value={division.division_id}
                    >
                      {division.division_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={source}
                  className="form-control"
                  onChange={(e) => setSource(e.target.value)}
                  required
                >
                  <option></option>
                  <option value="Direct Contact">Direct Contact</option>
                  <option value="Website">Website</option>
                  <option value="Phone">Phone</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Referral">Referral</option>
                  <option value="Campaign">Campaign</option>
                </select>
              </td>
              <td>
                <select
                  value={assigneeId}
                  className="form-control"
                  onChange={(e) => setAssigneeId(e.target.value)}
                  required
                >
                  <option></option>
                  {assignees.map((assignee) => (
                    <option key={assignee.user_id} value={assignee.user_id}>
                      {assignee.full_name} - {assignee.department_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={status}
                  onChange={(e) => {setStatus(e.target.value); setLikelihood("")}}
                  className="form-control"
                  required
                >
                  <option></option>
                  <option value="Prospect">Prospect</option>
                  <option value="In Discussions">In Discussions</option>
                  <option value="Proposal Submitted">Proposal Submitted</option>
                  <option value="Won">Won</option>
                  <option value="Aborted">Aborted</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <h5 id="lead-title-months">
          Revenue Distribution (zero value allowed but not blank)
        </h5>
        <table className="table" id="lead-months">
          <thead>
            <th>JAN</th>
            <th>FEB</th>
            <th>MAR</th>
            <th>APR</th>
            <th>MAY</th>
            <th>JUN</th>
          </thead>
          <tr>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 0}
                min={0}
                value={jan}
                onChange={(e) => setJan(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 1}
                min={0}
                value={feb}
                onChange={(e) => setFeb(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 2}
                min={0}
                value={mar}
                onChange={(e) => setMar(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 3}
                min={0}
                value={apr}
                onChange={(e) => setApr(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 4}
                min={0}
                value={may}
                onChange={(e) => setMay(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 5}
                min={0}
                value={jun}
                onChange={(e) => setJun(e.target.value)}
                required
              />
            </td>
          </tr>
        </table>
        <table className="table" id="lead-months">
          <thead>
            <th>JUL</th>
            <th>AUG</th>
            <th>SEP</th>
            <th>OCT</th>
            <th>NOV</th>
            <th>DEC</th>
          </thead>
          <tr>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 6}
                min={0}
                value={jul}
                onChange={(e) => setJul(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 7}
                min={0}
                value={aug}
                onChange={(e) => setAug(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 8}
                min={0}
                value={sep}
                onChange={(e) => setSep(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 9}
                min={0}
                value={oct}
                onChange={(e) => setOct(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 10}
                min={0}
                value={nov}
                onChange={(e) => setNov(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                disabled={currentMonth > 11}
                min={0}
                value={dec}
                onChange={(e) => setDec(e.target.value)}
                required
              />
            </td>
          </tr>
        </table>
        <div id="lead-submit">
          <Button variant="primary" type="submit">
            Create Lead
          </Button>
        </div>
        <div id="likelihood">
          <label htmlFor="likely">Likelihood of Conversion (%)</label>
          <select
            id="likely"
            className="form-control"
            required
            value={likelihood}
            onChange={(e) => setLikelihood(e.target.value)}
          >
            <option></option>
            <option selected={status==='Aborted'} value="0">0</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option selected={status==='Won'} value="100">100</option>
          </select>
        </div>
      </Form>
      <h5 id="lead-chart-title">
        Expected Sales ${" "}
        {chartData.reduce((value, data) => value + parseInt(data.value), 0)}
      </h5>
      <ResponsiveContainer width={600} height={200}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="lightgrey" strokeDasharray="2 2" />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis
            unit="$"
            tickLine={false}
            domain={[
              0,
              Math.max(
                jan,
                feb,
                mar,
                apr,
                may,
                jun,
                jul,
                aug,
                sep,
                oct,
                nov,
                dec
              ),
            ]}
          />
          <Tooltip contentStyle={TooltipStyle} />
          <Bar dataKey="value" fill="#2A9D8F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CreateLead;
