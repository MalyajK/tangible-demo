import React, {useState, useEffect} from 'react';
import "../goals.css";
import Card from "@material-ui/core/Card";
import * as BsIcons from "react-icons/bs";
import {useAuth0} from "@auth0/auth0-react";
import {AvatarGenerator} from 'random-avatar-generator';
import ProjectsApi from "../../../apis/ProjectsApi";

const AllGoals = () => {
  const [goals, setGoals] = useState([]);
  const {email} = useAuth0();
  const colors = ['#e1e9f5', '#f5e1e1', '#e5f5e4', '#ffffe8', '#ffe8ff']
  const generator = new AvatarGenerator();

  function getRandomColor() {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 95%)";
    return color;
  }
  
  useEffect(() => {
    async function getGoals() {
      const response = ProjectsApi.get("/").then((response) => {
          setGoals(response.data.allProjects.rows)
        });
    }
    getGoals();
  }, []);

  return (
    <div className="" id="goals-main">
      <h4 id="goals-title-main">Goals</h4>
      {goals.map((goal, i) => (
        <Card elevation={5} id="goal-paper" style={{backgroundColor:getRandomColor()}}>
        <p id="goal-paper-tile">{goal.project_title}</p>
        <img src={generator.generateRandomAvatar(goal.assignee)} alt="avatar" id="goals-avatar"/>
        <div id="settings-icon"><BsIcons.BsThreeDotsVertical size={20}/></div>
      </Card>
      ))}
    </div>
  )
}

export default AllGoals
