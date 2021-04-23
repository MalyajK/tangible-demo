import React, {useState, useEffect}from 'react';
import CustomersApi from "../../apis/CustomersApi";

const ExistingBusiness = () => {

  const [customer, setCustomer] = useState([])

  useEffect(() => {
    async function getCustomer() {
      await CustomersApi.get('/customerData').then((response) => {
        setCustomer(response.data.customerData.rows[0]);
      });
    };
    getCustomer();
  }, []);

  const columns = [Object.keys(customer).map((column)=>({value: column}))]
  const rows = [Object.values(customer).map((row)=>({value: row}))]
  const data = [columns, rows]
  console.log(data);

  return (
    <div id="existing-biz">
      <h5>Existing Business</h5>
    </div>
  )
}

export default ExistingBusiness
