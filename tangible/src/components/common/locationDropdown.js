import { useEffect, useState } from 'react';
import AddressesApi from "../../apis/AddressesApi";

const LocationDropdown = (props) => {

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    async function getLocations() {
      const response = await AddressesApi.get("/employeeLocations");
      setLocations(response.data.employeeLocations.rows);
    }
    getLocations();
  }, []);

  return (
    locations.map((location) => (
      <option key={location.city_id} value={location.city_id}>
        {location.location}
      </option>
    ))  
  )
}

export default LocationDropdown