import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { format } from "date-fns";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FinanceApi from "../../apis/FinanceApi";
import Paper from "@material-ui/core/Paper";
import "./finance.css";

const UpdateCollection = () => {
  const [invoice, setInvoice] = useState([]);
  const [newReceived, setNewReceived] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let history = useHistory();

  function ageing(dueDate) {
    const today = Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const subjectDate = Date.UTC(
      new Date(dueDate).getFullYear(),
      new Date(dueDate).getMonth(),
      new Date(dueDate).getDate()
    );
    const overdueDays = (today - subjectDate) / (1000 * 60 * 60 * 24);
    if (overdueDays > 0 ) {return overdueDays} else {return "Not Due"};
  }

  useEffect(() => {
    async function getInvoice() {
      await FinanceApi.get(`invoices/${id}`).then(
        (response) => {
          setInvoice(response.data.invoiceById.rows[0]);
          setLoading(false);
        }
      );
    }
    getInvoice();
  }, [id]);

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      await FinanceApi.patch(`invoices/${id}`, {
        amount_received: newReceived,
      });
    } catch (error) {}
    history.push("/finance/receivables");
    alert("Updated Successfully");
  };

  return (
    <div id="collect-update">
      <h4 id="invoice-number">Invoice No. {invoice.invoice_number}</h4>
      <Form>
        <Paper elevation={3}>
          <table className="table">
            <tr>
              <td id="collect-left-col">Invoice Date</td>
              <td>
                {!loading
                  ? format(new Date(invoice.invoice_date), "do MMM yyyy")
                  : "Loading"}
              </td>
            </tr>
            <tr>
              <td id="collect-left-col">Due Date</td>
              <td>
                {!loading
                  ? format(new Date(invoice.due_date), "do MMM yyyy")
                  : "Loading"}
              </td>
            </tr>
            <tr>
              <td id="collect-left-col">Customer</td>
              <td>{invoice.customer_name}</td>
            </tr>
            <tr>
              <td id="collect-left-col">Division</td>
              <td>{invoice.division_name}</td>
            </tr>
            <tr>
              <td id="collect-left-col">Billed Amount</td>
              <td>$ {invoice.invoice_amount}</td>
            </tr>
            <tr>
              <td id="collect-left-col">Received Till Date</td>
              <td>$ {invoice.amount_received}</td>
            </tr>
            <tr>
              <td id="collect-left-col">Outstanding</td>
              <td>$ {invoice.invoice_amount - invoice.amount_received}</td>
            </tr>
            <tr>
              <td id="collect-left-col">Days Outstanding</td>
              <td>{ageing(invoice.due_date)}</td>
            </tr>
            <tr>
              <td id="collect-left-col">New $ Received</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={newReceived}
                  onChange={(e) => setNewReceived(e.target.value)}
                  required
                />
              </td>
            </tr>
          </table>
        </Paper>
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="info"
            style={{ widht: "75px", marginRight:"20px" }}
            onClick={handleSubmit}
            disabled={!newReceived}
          >
            Update
          </Button>
          <Link to="/finance/receivables"><Button variant="warning" style={{ width: "75px" }}>
            Back
          </Button></Link>
        </div>
      </Form>
    </div>
  );
};

export default UpdateCollection;
