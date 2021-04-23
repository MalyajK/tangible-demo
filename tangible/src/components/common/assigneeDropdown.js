import { useEffect, useState } from 'react';
import UsersApi from "../../apis/UsersApi";

const AssigneeDropdown = (props) => {
  // get user fullname and department to feed assignee dropdown menu
  const [assignees, setAssignees] = useState([]);
  useEffect(() => {
    async function getAssignees() {
      const response = await UsersApi.get("/fullNames");
      setAssignees(response.data.fullNames.rows);
    }
    getAssignees();
  }, []);

  return (
    assignees.map((assignee) => (
      <option key={assignee.user_id} value={assignee.user_id}>
        {assignee.full_name} - {assignee.department_name}
      </option>
    ))  
  )
}

export default AssigneeDropdown