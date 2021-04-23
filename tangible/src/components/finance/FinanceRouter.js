import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./finance.css";
import FundRequests from "./FundRequests";
import RequestFunds from "./RequestFunds";
import EditFundsRequest from "./EditFundsRequest";
import SendPricingForm from "./SendPricingForm";
import Invoices from "./Invoices";
import UpdateCollection from "./UpdateCollection";
import Budgets from './Budgets';  

const FinanceRouter = () => {
  
  const {path} = useRouteMatch();

  return (
    <Switch>
      <Route path={path+"fundrequests"} exact component={FundRequests} />
      <Route path={path+"requestfunds"} exact component={RequestFunds} />
      <Route path={path+"sendpricingform"} exact component={SendPricingForm} />
      <Route path={path+"receivables"} exact component={Invoices} />
      <Route path={path+"receivables/:id"} exact component={UpdateCollection} />
      <Route path={path+"fundrequests/:id"} exact component={EditFundsRequest} />
      <Route path={path+"budgets"} exact component={Budgets} />
    </Switch>
  )
}

export default FinanceRouter
