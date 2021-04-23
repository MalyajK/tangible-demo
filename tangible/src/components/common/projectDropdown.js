import { useEffect, useState } from 'react';
import ProjectsApi from "../../apis/ProjectsApi";

const ProjectDropdown = (props) => {
  // get project titles to feed parent project dropdown menu
  const [allProjects, setAllProjects] = useState([]);
  
  useEffect(() => {
    async function getAllProjects() {
      const response = await ProjectsApi.get("/");
      setAllProjects(response.data.allProjects.rows);
    }
    getAllProjects();
  }, []);
  
  return (
      allProjects.map((project) => (
        <option key={project.project_id} value={project.project_id}>
          {project.project_title}
        </option>
      ))
  )
}

export default ProjectDropdown
