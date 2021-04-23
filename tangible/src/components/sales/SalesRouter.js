import React from 'react';
import {Switch, Route, useRouteMatch} from "react-router-dom";
import Customers from "./Customers";
import CreateLead from "./CreateLead";
import CustomerDetails from "./CustomerDetails";
import LeadSummary from "./LeadSummary";
import EditLead from "./EditLead";
import ExistingBusiness from "./ExistingBusiness";
import SalesTarget from "./SalesTarget";
import TargetsDivMonth from "./TargetsDivMonth";
import TargetsStaffMonth from "./TargetsStaffMonth";
import TargetsRegionMonth from "./TargetsRegionMonth";
import TargetsMonth from "./TargetsMonth";
import "./sales.css"

const SalesRouter = () => {
  
  const {path} = useRouteMatch();

  return (
    <Switch>
      <Route path={path+"customers"} exact component={Customers}/>
      <Route path={path+"createlead"} exact component={CreateLead}/>
      <Route path={path+"customers/:id"} exact component={CustomerDetails}/>
      <Route path={path+"leadsummary"} exact component={LeadSummary}/>
      <Route path={path+"editlead/:id"} exact component={EditLead}/>
      <Route path={path+"existing"} exact component={ExistingBusiness}/>
      <Route path={path+"target"} exact component={SalesTarget}/>
      <Route path={path+"target/division"} exact component={TargetsDivMonth}/>
      <Route path={path+"target/staff"} exact component={TargetsStaffMonth}/>
      <Route path={path+"target/region"} exact component={TargetsRegionMonth}/>
      <Route path={path+"target/month"} exact component={TargetsMonth}/>
    </Switch>
  )
}

export default SalesRouter;