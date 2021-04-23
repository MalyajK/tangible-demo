import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import TasksApi from "../../apis/TasksApi";

const ProjectTasks = () => {
  const [, setLoading] = useState(true);
  const [titles, setTitles] = useState([]);
  const [averages, setAverages] = useState([]);
  const { id } = useParams();

  // get tasks by project id
  useEffect(() => {
    async function getTasks() {
      await TasksApi.get(`/getTasksByProject/${id}`).then(
        (response) => {
          setLoading(false);
          setTitles(response.data.getTasksByProject.rows);
        }
      );
    }
    getTasks();
  }, [id]);

  // get individual completion weight of each task
  useEffect(() => {
    async function getAverages() {
      await TasksApi.get(`/wtdAvg/${id}`).then((response) => {
        setAverages(response.data.wtdAvg.rows);
        console.log(response);
      });
    }
    getAverages();
  }, [id]);

  let weightedAverage = 0;
  averages.forEach((task) => {
    weightedAverage += parseFloat(task.wtd_avg);
  });

  return (
    <div className="column" id="project-details-right">
      <h3 id="project-detail-h3">Constituent Tasks</h3>
      <table className="table table-hover" id="project-task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assignee</th>
            <th>Direction</th>
            <th>Contribution</th>
            <th>Placeholder</th>
          </tr>
        </thead>
        <tbody>
          {titles.map((title) => (
            <tr>
              <Link to={"/tasks/" + title.task_id}>
                <td id="constituent-task" key={title.task_id}>
                  {title.task_title}
                </td>
              </Link>
              <td key={title.user_id}>{title.full_name}</td>
              {title.completion < weightedAverage ? (
                <td id="task-arrow">
                  <FaArrowDown color="red" size={20} />
                </td>
              ) : (
                <td id="task-arrow">
                  <FaArrowUp color="green" size={20}/>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTasks;
