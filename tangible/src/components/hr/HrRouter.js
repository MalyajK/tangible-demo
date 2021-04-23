import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./hr.css";
import EmployeeRequisition from "./EmployeeRequisition";
import EmployeeExit from "./EmployeeExit";
import EmployeeGrievance from "./EmployeeGrievance";
import EmployeeOnboarding from "./EmployeeOnboarding";

const HrRouter = () => {
  
  const {path} = useRouteMatch();

  return (
    <Switch>
      <Route path={path+"exit"} exact component={EmployeeExit} />
      <Route path={path+"requisition"} exact component={EmployeeRequisition} />
      <Route path={path+"grievance"} exact component={EmployeeGrievance} />
      <Route path={path+"onboarding"} exact component={EmployeeOnboarding} />
    </Switch>
  )
}

export default HrRouter
