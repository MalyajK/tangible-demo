import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from 'react-bootstrap/Button';
import * as FaIcons from "react-icons/fa";
import "./tasks.css";
import TasksApi from "../../apis/TasksApi";
import Pagination from "../Tasks/pagination";
import ProgressMeter from "../common/ProgressMeter";
import TaskFilterModal from "../Tasks/TaskFilterModal";

function Tasks() {
  // set state
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  // get tasks
  useEffect(() => {
    async function getTasks() {
      const response = await TasksApi.get("/");
      setTasks(response.data.allTasks.rows);
      console.log(response);
    }
    getTasks();
  }, []);

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // sorted tasks
  let sortedTasks = [...tasks];
  if (sortedField != null) {
    sortedTasks.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      return 0;
    });
  }

  // tasks on title and description
  const contentFilteredTasks = tasks.filter((task) => {
    return (
      task.task_title.toLowerCase().includes(search.toLowerCase()) ||
      task.task_description.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div id="task-table">
      <div className="row mb-3">
        <div className="column title-group">
          <p id="page-title">Showing {tasks.length} tasks ...</p>
        </div>
        <div className="column title-group">
          <form>
            <input
              className="form-control"
              type="text"
              placeholder="Search by title or description..."
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "400px" }}
            />
          </form>
        </div>
        <div className="column title-group">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            
            <FaIcons.FaFilter
              id="filter"
              size={20}
              style={{ color: "white"}}
            />
          </Button>
          <TaskFilterModal show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Task Title</th>
            <th scope="col">Description</th>
            <th scope="col">Project</th>
            <th scope="col">Assignee</th>
            <th scope="col">
              <DropdownButton variant="outline-dark" title="Start Date">
                <Dropdown.Item disabled>Sort By</Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setSortedField("start_date")}
                >
                  Oldest First
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setSortedField("start_date")}
                >
                  Newest First
                </Dropdown.Item>
              </DropdownButton>
            </th>
            <th scope="col">
              <DropdownButton variant="outline-dark" title="End Date">
                <Dropdown.Item disabled>Sort By</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Oldest First</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Newest First</Dropdown.Item>
              </DropdownButton>
            </th>
            <th scope="col">
              <DropdownButton variant="outline-dark" title="Progress">
                <Dropdown.Item href="#/action-1" disabled>
                  Sort By
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Most Complete</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Least Complete</Dropdown.Item>
              </DropdownButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key="task.task_id">
              <td>{task.task_id}</td>
              <td>
                <Link to={`tasks/${task.task_id}`}>{task.task_title}</Link>
              </td>
              <td>{task.task_description}</td>
              <td>{task.project_title}</td>
              <td style={{ textAlign: "center" }}>{task.full_name}</td>
              <td style={{ textAlign: "center" }}>
                {moment(task.start_date).format("DD/MM/YYYY")}
              </td>
              <td style={{ textAlign: "center" }}>
                {moment(task.end_date).format("DD/MM/YYYY")}
              </td>
              <td>
                <ProgressMeter value={task.completion} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Tasks;
