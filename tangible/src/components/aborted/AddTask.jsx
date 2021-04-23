import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import "./tasks.css";
import ProjectsApi from "../../apis/ProjectsApi";
import TasksApi from "../../apis/TasksApi";
import UsersApi from "../../apis/UsersApi";
import Toggle from "../common/Switch";

const AddTask = () => {
  // use state of input fields
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [projectId, setProjectId] = useState();
  const [assigneeId, setAssigneeId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [visibility, setVisibility] = useState(true);

  // destructure react hooks form
  const { register, handleSubmit, errors, control } = useForm();

  // get project titles to feed parent project dropdown menu
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    async function getAllProjects() {
      const response = await ProjectsApi.get("/");
      setAllProjects(response.data.allProjects.rows);
    }
    getAllProjects();
  }, []);

  // get user fullname and department to feed assignee dropdown menu
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    async function getAssignees() {
      const response = await UsersApi.get("/fullNames");
      setAssignees(response.data.fullNames.rows);
    }
    getAssignees();
  }, []);

  // Form submission to populate backend
  const onSubmit = async (data) => {
    try {
      // const response = await TasksApi.post("/", {
      //   task_title: data.title,
      //   task_description: data.description,
      //   project_id: parseInt(data.project_id),
      //   created_by: 4,
      //   assignee: parseInt(data.assigneeId),
      //   start_date: data.start_date,
      //   end_date: data.end_date,
      //   completion: 0,
      //   is_public: data.visibility
      // });
      console.log(data);
    } catch (error) {}
  };

  // Rendering
  return (
    <form style={{marginLeft:"330px", marginTop:"70px"}} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <p style={{fontSize:"1.3rem", fontWeight:"bold", marginLeft:"150px"}}>Add New Task</p>
      </div>
      <div className="form-group">
        <label>Parent Project</label>
        <select
          className="form-control mr-5"
          ref={register({ required: true })}
          name="project_id"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value=""></option>
          <option disabled value>
            Select project or create independent task
          </option>
          <option>Independent Task</option>
          <option disabled value>
            -------Projects-------
          </option>
          {allProjects.map((project) => (
            <option key={project.project_id} value={project.project_id}>
              {project.project_title}
            </option>
          ))}
        </select>
        {errors.project_id && (
          <p id="validation-error">This field is required</p>
        )}
      </div>
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="maximum 40 characters"
          minLength="1"
          maxLength="40"
          ref={register({ required: true })}
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p id="validation-error">This field is required</p>}
      </div>
      <div className="form-group">
        <label>Task Description</label>
        <textarea
          type="text"
          className="form-control"
          placeholder="maximum 100 characters"
          minLength="1"
          maxLength="100"
          ref={register({ required: true })}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p id="validation-error">This field is required</p>
        )}
      </div>
      <div className="form-group">
        <label>Assign To</label>
        <select
          className="form-control"
          ref={register({ required: true })}
          name="assigneeId"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
        >
          <option value=""></option>
          <option disabled value>
            Assign to self or colleagues
          </option>
          <option>Self</option>
          <option disabled>--------Assigneess--------</option>
          {assignees.map((assignee) => (
            <option key={assignee.user_id} value={assignee.user_id}>
              {assignee.full_name} - {assignee.department_name}
            </option>
          ))}
        </select>
        {errors.assigneeId && (
          <p id="validation-error">This field is required</p>
        )}
      </div>
      <div className="form-group">
        <label>Task Visibility (Public by default)</label>
        <div className="form-row" style={{marginLeft:"10px", marginTop:"5px"}}>
          <p style={{paddingTop:"7px"}}>Private</p>
          <Controller 
            name="visibility"
            control={control}
            inputRef={register}
            valueName="checked"
            as={<Toggle />}
          />
          <p style={{paddingTop:"7px"}}>Public</p>
        </div>
      </div>
      <div className="form-row" style={{marginTop:"10px"}}>
        <div id="start-date" className="form-group">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              name="start_date"
              control={control}
              value={startDate}
              onChange={(startDate) => setStartDate(startDate)}
              register={register}
              rules={{required:"required"}}
              render={({value, onChange}) => (
                <KeyboardDatePicker
                  value={value}
                  onChange={onChange}
                  autoOk
                  inputVariant="outlined"
                  label="Start Date"
                  format="dd/MM/yyyy"
                  InputAdornmentProps={{ position: "end" }}
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="form-group">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              name="end_date"
              control={control}
              value={endDate}
              onChange={(endDate) => setEndDate(endDate)}
              register={register}
              rules={{required:"required"}}
              render={({value, onChange}) => (
                <KeyboardDatePicker
                  value={value}
                  onChange={onChange}
                  autoOk
                  inputVariant="outlined"
                  label="End Date"
                  format="dd/MM/yyyy"
                  InputAdornmentProps={{ position: "end" }}
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <Button type="submit" color="primary" variant="contained" id="create-task-button">
        Create Task
      </Button>
    </form>
  );
};

export default AddTask;
