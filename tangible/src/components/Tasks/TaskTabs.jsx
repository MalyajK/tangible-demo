import React from 'react';
import {useParams} from 'react-router-dom';
import HyvorTalk from 'hyvor-talk-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TaskEditTab from './TaskEditTab';
import TaskCommentsTab from './TaskComments';

const TaskTabs = () => {
  
  const {id} = useParams();
  
  const commentCounter = <HyvorTalk.CommentCount
    websiteId={3233}
    id={`localhost:3000/tasks/${id}`}
  />
  
  return (
    <div style={{marginTop:"100px", marginRight:"30px", marginLeft:"280px"}}>
      <Tabs defaultActiveKey="editing">
        <Tab eventKey="editing" title="Editing">
          <TaskEditTab />
        </Tab>
        <Tab eventKey="comments" title={commentCounter}>
          <TaskCommentsTab />
        </Tab>
        <Tab eventKey="review" title="Review">
          <h1>Hello Tab Three</h1>
        </Tab>
      </Tabs>
    </div>
  )
}

export default TaskTabs;
