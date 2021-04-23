import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AssigneeDropdown from "../common/assigneeDropdown";
import ProjectDropdown from "../common/projectDropdown";
import MuiDatePicker from "../common/MuiDatePicker";
import "./tasks.css";

const TaskFilterModal = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minCount, setMinCount] = useState(null);
  const [maxCount, setMaxCount] = useState(null);
  const [project, setProject] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const { register, handleSubmit, errors, control } = useForm();

  const filteredTasks = () => {
    if (startDate !== null) {}
  }

  return (
    <form>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{ background: "#063245", color: "#fafafa" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Filter Tasks
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid" style={{ height: "200px" }}>
          <Container>
            <Row style={{ marginBottom: "20px" }}>
              <Col md={6}>
                <div className="form-group">
                  <label>Parent Project</label>
                  <select
                    name="project"
                    ref={register}
                    value={props.project_id}
                    className="form-control col-md-10"
                    onChange={(e) => setProject(e.target.value)}
                  >
                    <option>All Projects</option>
                    <option disabled>----------------------</option>
                    <ProjectDropdown />
                  </select>
                </div>
              </Col>
              <Col md={6}>
                <label>Assignee</label>
                <select
                  name="assignee"
                  ref={register}
                  value={props.assignee_id}
                  className="form-control col-md-10"
                  onChange={(e) => setAssignee(e.target.value)}
                >
                  <option>All Assignees</option>
                  <option disabled>----------------------</option>
                  <AssigneeDropdown />
                </select>
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={3}>
                <Controller
                  name="start_date"
                  control={control}
                  register={register}
                  value={startDate}
                  defaultValue={startDate}
                  onChange={(date) => setStartDate(date)}
                  render={({ value, onChange, defaultValue }) => (
                    <MuiDatePicker
                      label="Start Date"
                      defaultValue={defaultValue}
                      value={value}
                      setValue={onChange}
                    />
                  )}
                />
              </Col>
              <Col xs={6} md={3}>
                <Controller
                  name="end_date"
                  control={control}
                  register={register}
                  defaultValue={endDate}
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  render={({ value, onChange }) => (
                    <MuiDatePicker
                      value={value}
                      label="End Date"
                      setValue={onChange}
                    />
                  )}
                />
              </Col>
              <Col xs={6} md={2} style={{ marginLeft: "40px" }}>
                Min Progress
                <input
                  ref={register}
                  name="minProgress"
                  type="number"
                  value={minCount}
                  onChange={(e) => setMinCount(e.target.value)}
                  min="0"
                  max="100"
                  style={{
                    width: "60px",
                    height: "30px",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                />
              </Col>
              <Col xs={6} md={2}>
                Max Progress
                <input
                  ref={register}
                  name="maxProgress"
                  type="number"
                  value={maxCount}
                  onChange={(e) => setMaxCount(e.target.value)}
                  min={0}
                  max={100}
                  style={{
                    width: "60px",
                    height: "30px",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button onClick={props.onHide}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default TaskFilterModal;
