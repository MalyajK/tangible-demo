import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import TaskTable from "./TaskTable";
import TaskTabs from "./TaskTabs";
import CreateTask from "./CreateTask";

export default function TaskRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tasks/create" exact component={CreateTask}/>
        <Route path="/tasks/:id" exact component={TaskTabs} />
        <Route path="/tasks" exact component={TaskTable} />
      </Switch>
    </BrowserRouter>
  )
}