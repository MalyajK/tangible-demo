import React from 'react';

const ExpenseHeads = (props) => {
  const {department, onChange, value} = props;
  switch (department) {
    case '':
      return (
        <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
          <option></option>
        </select>
      );
    case 'CEO':
      return (
        <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
          <option></option>
          <option value="Eat Pizza">Eat Pizza</option>
          <option value="Drink Beer">Drink Beer</option>
        </select>
      );
    case 'Sales':
      return (
        <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
          <option></option>
          <option value="CRM">CRM</option>
          <option value="Conference Attendance">Conference Attendance</option>
          <option value="Customer Meeting">Customer Meeting</option>
          <option value="Training">Training</option>
          <option value="Others">Others</option>
        </select>
      );
    case 'Finance':
    return (
      <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
        <option></option>
        <option value="Audit">Audit</option>
        <option value="Regulatory">Regulatory</option>
        <option value="Training">Training</option>
        <option value="ERP">ERP</option>
        <option value="Others">Others</option>
      </select>
    );
    case 'Marketing':
    return (
      <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
        <option></option>
        <option value="Collaterals">Collaterals</option>
        <option value="Conference Attendance">Conference Attendance</option>
        <option value="Conference Hosting">Conference Hosting</option>
        <option value="Advertising">Advertising</option>
        <option value="Agency Fees">Agency Fees</option>
        <option value="Gifting">Gifting</option>
        <option value="Training">Training</option>
        <option value="Others">Others</option>
      </select>
    );
    case 'Operations':
    return (
      <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
        <option></option>
        <option value="Vehicles">Vehicles</option>
        <option value="Warehouse R&M">Warehouse R&M</option>
        <option value="Packaging Material">Packaging Material</option>
        <option value="Storage Infrastructure">Storage Infrastructure</option>
        <option value="Handheld Equipment">Handheld Equipment</option>
        <option value="POL Materials">POL Materials</option>
        <option value="Fuel">Fuel</option>
        <option value="AMC">AMC</option>
        <option value="Audit">Audit</option>
        <option value="Training">Training</option>
        <option value="Others">Others</option>
      </select>
    );
    case 'Engineering':
    return (
      <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
        <option></option>
        <option value="Plant R&M">Plant R&M</option>
        <option value="Fuel">Fuel</option>
        <option value="Raw Material">Raw Material</option>
        <option value="POL Material">POL Materials</option>
        <option value="Fixed Equipment">Fixed Equipment</option>
        <option value="Loose Equipment">Loose Equipment</option>
        <option value="Vehicles">Vehicles</option>
        <option value="AMC">AMC</option>
        <option value="Audit">Audit</option>
        <option value="Training">Training</option>
        <option value="Others">Others</option>
      </select>
    );
    case 'Human Resources':
    return (
      <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
        <option></option>
        <option value="HRMS">HRMS</option>
        <option value="Welfare">Welfare</option>
        <option value="Training">Training</option>
        <option value="Audit">Audit</option>
        <option value="Others">Others</option>
      </select>
    );
    case 'Administration':
    return (
      <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
        <option></option>
        <option value="Rent">Rent</option>
        <option value="Electricity">Electricity</option>
        <option value="Water">Water</option>
        <option value="Housekeeping">Housekeeping</option>
        <option value="Vehicle">Vehicle</option>
        <option value="Fuel">Fuel</option>
        <option value="Landline">Landline</option>
        <option value="Mobile">Mobile</option>
        <option value="Wifi Dongles">Wifi Dongles</option>
        <option value="Stationery">Stationery</option>
        <option value="Courier">Courier</option>
        <option value="Regulatory">Regulatory</option>
        <option value="Training">Training</option>
        <option value="Others">Others</option>
      </select>
    );
    case 'IT':
    return (
      <select className='form-control' id="expense-head" onChange={onChange} value={value} required>
        <option></option>
        <option value="Broadband">Broadband</option>
        <option value="Cloud">Cloud</option>
        <option value="Web Hosting">Web Hosting</option>
        <option value="Applications">Applications</option>
        <option value="IT Assets">IT Assets</option>
        <option value="AMC">AMC</option>
        <option value="Training">Training</option>
        <option value="Others">Others</option>
      </select>
    );
    default: return null
  }
}

export default ExpenseHeads
