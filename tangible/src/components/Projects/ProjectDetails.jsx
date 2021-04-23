import React from 'react';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import ProjectSummary from './ProjectSummary';
import ProjectTasks from './ProjectTasks';

const ProjectDetails = () => {
  return (
    <div className="row" id="project-details">
      <ProjectSummary />
      <ProjectTasks />
    </div>
  )
}

export default ProjectDetails
