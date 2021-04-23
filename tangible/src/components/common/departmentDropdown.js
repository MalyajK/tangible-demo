import { useEffect, useState } from 'react';
import DepartmentsApi from "../../apis/DepartmentsApi";

const DepartmentDropdown = (props) => {

  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    async function getDepartments() {
      const response = await DepartmentsApi.get("/");
      setDepartments(response.data.allDepartments.rows);
    }
    getDepartments();
  }, []);

  return (
    departments.map((department) => (
      <option key={department.department_id} value={department.department_id}>
        {department.department_name}
      </option>
    ))  
  )
}

export default DepartmentDropdown