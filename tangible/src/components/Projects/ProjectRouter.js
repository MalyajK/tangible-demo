import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Projects from "./Projects";
import ProjectDetails from "./ProjectDetails";

export default function ProjectRouter() {
  return (
    <BrowserRouter>
        <Route path = "/:id" component={ProjectDetails}/>
        <Route exact path = "/" component={Projects}/>
    </BrowserRouter>
  )
}
