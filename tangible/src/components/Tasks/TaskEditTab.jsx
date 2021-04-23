import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import TasksApi from "../../apis/TasksApi";
import MuiDatePicker from "../common/MuiDatePicker";
import ProjectDropdown from "../common/projectDropdown";
import AssigneeDropdown from "../common/assigneeDropdown";
import NewSlider from "../common/NewSlider";

const TaskEditTab = () => {
  // use task id
  const { id } = useParams();

  // set state
  const [taskDescription, setTaskDescription] = useState();
  const [, setProjectTitle] = useState();
  const [taskTitle, setTaskTitle] = useState();
  const [projectId, setProjectId] = useState();
  const [, setDepartmentName] = useState();
  const [assigneeId, setAssigneeId] = useState();
  const [, setFullName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [sliderValue, setSliderValue] = useState();
  const [loading, setLoading] = useState(true);
  
  // get task details
  useEffect(() => {
    async function getTask() {
      await TasksApi.get(`/${id}`).then((response) => {
        setLoading(false);
        setTaskTitle(response.data.rows[0].task_title);
        setProjectId(response.data.rows[0].project_id);
        setProjectTitle(response.data.rows[0].project_title);
        setTaskDescription(response.data.rows[0].task_description);
        setAssigneeId(response.data.rows[0].assignee);
        setDepartmentName(response.data.rows[0].department_name);
        setFullName(response.data.rows[0].full_name);
        setStartDate(response.data.rows[0].start_date);
        setEndDate(response.data.rows[0].end_date);
        setSliderValue(response.data.rows[0].completion);
      });
    }
    getTask();
  }, [id]);

  // destructure react hooks form
  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    try {
      // const response = await TasksApi.put(`/${id}`, {
      //   task_title: data.task_title,
      //   task_description: data.task_description,
      //   project_id: parseInt(data.parent_project),
      //   created_by: 4,
      //   assignee: parseInt(data.assignee),
      //   start_date: data.start_date,
      //   end_date: data.end_date,
      //   completion: parseInt(data.completion),
      // });
      console.log(data);
      alert("Task updated successfully !")
    } catch (error) {}
  };

  // const handleDelete = async () => {
  //   const response = await TasksApi.delete(`/${id}`);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row" id="task-form-main">
        <div className="column task-form">
          <div className="form-group mb-4">
            <label>Task Title</label>
            <input
              type="text"
              name="task_title"
              className="form-control"
              minLength="1"
              maxLength="40"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              ref={register({ required: true })}
            />
          </div>
          <div className="form-group">
            <label>Task Description</label>
            <textarea
              type="text"
              name="task_description"
              value={taskDescription}
              className="form-control"
              minLength="1"
              maxLength="100"
              onChange={(e) => setTaskDescription(e.target.value)}
              ref={register({ required: true })}
            />
          </div>
          <div className="form-group mb-4">
            <label>Parent Project</label>
            <select
              className="form-control"
              name="parent_project"
              ref={register({ required: true })}
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              {/* <option>{projectTitle}</option> */}
              <ProjectDropdown />
            </select>
          </div>
          <div className="form-group mb-4">
            <label>Assignee</label>
            <select
              className="form-control"
              name="assignee"
              ref={register({ required: true })}
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
            >
              {/* <option>{fullName} - {departmentName}</option> */}
              <AssigneeDropdown />
            </select>
          </div>
        </div>
        <div className="column task-form right">
          <div className="form-group">
            <label>Task Completion</label>
            {!loading ? (
              <Controller 
                name="completion"
                control={control}
                ref={register}
                render={({value, onChange}) => (
                  <NewSlider
                    className="slider"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(e.target.value)}
                  />
                )}
            />
            ) : (<p>Loading.....</p>)}
          </div>
          <div id="start-date single" className="form-group mt-4 mb-5">
            {!loading ? (
              <Controller 
                name="start_date"
                control={control}
                register={register}
                render={({value, onChange, defaultValue}) => (
                  <MuiDatePicker
                    label="Start Date"
                    value={startDate}
                    setValue={(date) => setStartDate(date)}
                  />
                )}
              />
            ) : (<p>Loading.....</p>)}    
          </div>
          <div className="form-group mb-4">
          {!loading ? (
            <Controller 
              name="end_date"
              control={control}
              register={register}
              render={({value, onChange}) => (
                <MuiDatePicker
                  value={endDate}
                  label="End Date"
                  setValue={(date) => setEndDate(date)}
                />
              )}
            />
          ) : (<p>Loading.....</p>)}    
          </div>
          <button type="submit" className="btn btn-info" id="update-button">
            Update
          </button>
          <button type="delete" className="btn btn-warning" id="abort-button">
            Abort
          </button>
          <button type="delete" className="btn btn-danger" id="delete-button">
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskEditTab;
