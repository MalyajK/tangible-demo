import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import { AvatarGenerator } from "random-avatar-generator";
import {BsPencil} from 'react-icons/bs';
import { useParams } from "react-router-dom";
import ProgressMeter from "../common/ProgressMeter";
import StatusMeter from "../common/StatusMeter";
import ProjectsApi from "../../apis/ProjectsApi";

const ProjectSummary = () => {
  const generator = new AvatarGenerator();

  const [project, setProject] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [focus, setFocus] = useState();
  const { startDate, endDate } = dateRange;
  const { id } = useParams();

  useEffect(() => {
    async function getProject() {
      await ProjectsApi.get(`/projectSummary/${id}`).then((response) => {
      setProject(response.data.projectSummary.rows[0])
      })
    }
    getProject();
  }, [id]);

  // get task count

  return (
    <div className="column" id="project-details-left">
      <h3 id="project-detail-h3">Summary</h3>
      <hr id="project-details-hr-left" />
      <span id="row-heading-small">
        <strong>Project</strong>
      </span>
      <br />
      <span>{project.project_title}</span>
      <BsPencil id="pencil"/>
      <br />
      <hr id="project-details-hr-left" />
      <span id="row-heading-small">
        <strong>Description</strong>
      </span>
      <br />
      <span>{project.project_description}</span>
      <BsPencil id="pencil"/>
      <br />
      <hr id="project-details-hr-left" />
      <span id="row-heading-small">Project Manager</span>
      <br />
      <span>{project.project_manager}</span>
      <BsPencil id="pencil"/>
      <img
        src={generator.generateRandomAvatar(project.assignee)}
        alt="PM"
        id="project-details-avatar"
      />
      <br />
      <hr id="project-details-hr-left" style={{ marginTop: "30px" }} />
      <span id="row-heading-small">
        <strong>Dates</strong>
      </span>
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date"
        startDatePlaceholderText={moment(project.start_date).format("DD/MM/YYYY")}
        endDate={endDate}
        endDateId="end_date"
        endDatePlaceholderText={moment(project.end_date).format("DD/MM/YYYY")}
        onDatesChange={(date) => setDateRange(date)}
        focusedInput={focus}
        onFocusChange={(focus) => setFocus(focus)}
        displayFormat={() => "DD/MM/YYYY"}
        openDirection="up"
        required
        noBorder={true}
      />
      <br />
      <hr id="project-details-hr-left" />
      <span id="row-heading-small">Task Count</span>
      <br />
      <span>Finished / Total</span>
      <span id="project-task-count">5 / 10</span>
      <br />
      <hr id="project-details-hr-left" style={{ marginTop: "10px" }} />
      <span id="row-heading-small">Completion</span>
      <br />
      <div id="project-details-progress">
        <ProgressMeter value={67} />
      </div>
      <br />
      <hr id="project-details-hr-left" style={{ marginTop: "20px" }} />
      <span id="row-heading-small">Status</span>
      <br />
      <span>(Nearing Due Date)</span>
      <div id="project-details-progress">
        <StatusMeter completion={45} endDate={project.end_date} size={40} />
      </div>
      <br />
      <hr id="project-details-hr-left" style={{ marginTop: "20px" }} />
    </div>
  );
};

export default ProjectSummary;
