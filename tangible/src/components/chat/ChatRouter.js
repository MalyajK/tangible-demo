import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ChatWindow from './ChatWindow';
import SingleChat from './SingleChat';
import "./chat.css";

const ChatRouter = () => {
  
  const {path} = useRouteMatch();
  const id = 'A'
  
  return (
    <Switch>
      <Route path={path} exact component={ChatWindow} />
      <Route path={path + id} exact component={SingleChat} />
    </Switch>
  )
}

export default ChatRouter