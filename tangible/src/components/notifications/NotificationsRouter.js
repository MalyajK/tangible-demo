import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Main from "./Main";


const NotificationsRouter = () => {
  
  const {path} = useRouteMatch();
  
  return (
    <Switch>
      <Route path={path} exact component={Main} />
    </Switch>
  )
}

export default NotificationsRouter
