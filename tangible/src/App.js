import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./auth/UserContext";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Switch, Route } from "react-router-dom";
import Projects from "./components/Projects/Projects";
import ProjectDetails from "./components/Projects/ProjectDetails";
import LogoutPage from "./auth/LogoutPage";
import UserProfile from "./components/Users/UserProfile";
import Calendar from "./components/calendar/Calendar";
import TaskTable from "./components/Tasks/TaskTable";
import TaskTabs from "./components/Tasks/TaskTabs";
import CreateTask from "./components/Tasks/CreateTask";
import Main from "./components/dashboard/Main";
import NavbarMain from "./components/navbar/Navbar";
import MyTeam from "./components/team/MyTeam";
import HrRouter from "./components/hr/HrRouter";
import FinanceRouter from "./components/finance/FinanceRouter";
import SalesRouter from "./components/sales/SalesRouter";
import NotificationsRouter from "./components/notifications/NotificationsRouter";
import ChatWindow from "./components/chat/ChatWindow";

function App() {
  const { isAuthenticated, user} = useAuth0();

  if (isAuthenticated) {
    return (
      <UserContext.Provider value={user.name === 'Tangible Guest' ? 7 : parseInt(user.nickname)}> 
        <React.Fragment>
          <NavbarMain />
          <Sidebar />
          <ChatWindow />  
          <Switch>
            <Route path="/users/:id" exact component={UserProfile} />
            <Route path="/dashboard" exact component={Main} />
            <Route path="/" exact component={Main} />
            <Route path="/scheduler" exact component={Calendar} />
            <Route path="/projects/:id" exact component={ProjectDetails} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/tasks/create" exact component={CreateTask} />
            <Route path="/tasks/:id" exact component={TaskTabs} />
            <Route path="/tasks" exact component={TaskTable} />
            <Route path="/team" exact component={MyTeam} />
            <Route path="/hr/" component={HrRouter} />
            <Route path="/finance/" component={FinanceRouter} />
            <Route path="/sales/" component={SalesRouter} />
            <Route path="/login" component={LogoutPage} />
            <Route path="/notifications/" component={NotificationsRouter} />
          </Switch>
        </React.Fragment>
      </UserContext.Provider>
    );
  } else return <LogoutPage />;
}

export default App;
