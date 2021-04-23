import React, {useState, useEffect} from 'react';
import DivisionsApi from '../../apis/DivisionsApi';

const DivisionDropdown = () => {
  const [divisions, setDivisions] = useState([]);
  useEffect(() => {
    async function getDivisions() {
      const response = await DivisionsApi.get("/");
      setDivisions(response.data.divisions.rows);
    }
    getDivisions();
  }, []);

  return (
    divisions.map((division) => (
      <option key={division.division_id} value={division.division_id}>
        {division.division_name}
      </option>
    ))  
  )
}


export default DivisionDropdown
