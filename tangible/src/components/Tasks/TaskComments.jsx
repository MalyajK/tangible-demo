import {useParams} from 'react-router-dom';
import HyvorTalk from 'hyvor-talk-react';
import React, {useState, useEffect} from 'react';
import TasksApi from "../../apis/TasksApi";

const TaskCommentsTab = () => {
  const {id} = useParams();
  const [taskTitle, setTaskTitle] = useState();
  const [, setTaskId] = useState();

  useEffect(() => {
    async function getTask() {
      const response = await TasksApi.get(`/${id}`);
      setTaskTitle(response.data.rows[0].task_title);
      setTaskId(response.data.rows[0].task_id);
    }
    getTask();
  }, [id]);

  return (
    <div style={{marginRight:"50px"}}>
      <h5 style={{textAlign:"center", marginTop:"10px", fontWeight:"bold"}}>Task : {taskTitle}</h5>
      {/* <div className="comment-count-view">
        <HyvorTalk.CommentCount
          websiteId={3233}
          id={`localhost:3000/tasks/${id}`}
        />
      </div> */}
      <div>
        <HyvorTalk.Embed 
          websiteId={3233}
          id={`localhost:3000/tasks/${id}`}
        />
      </div>
    </div>
  )
}

export default TaskCommentsTab;