import React, {useState, useEffect} from 'react';
import CustomersApi from '../../apis/CustomersApi';

const CustomerDropdown = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    async function getCustomers() {
      const response = await CustomersApi.get("/");
      setCustomers(response.data.customers.rows);
    }
    getCustomers();
  }, []);

  return (
    customers.map((customer) => (
      <option key={customer.customer_id} value={customer.customer_id}>
        {customer.customer_name}
      </option>
    ))  
  )
}


export default CustomerDropdown
