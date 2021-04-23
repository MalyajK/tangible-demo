import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
} from "react";
import FormControl from "react-bootstrap/FormControl";
import Paper from "@material-ui/core/Paper";
import { CgClose } from "react-icons/cg";
import UsersApi from "../../apis/UsersApi";
import { UserContext } from "../../auth/UserContext";
import "./calendar.css";

const ParticipantPicker = () => {

  const currentUser = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const fieldRef = useRef();

  const [selected, dispatchSelected] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [...state, { id: state.length, name: action.name }];
      case "remove":
        return state.filter((_, index) => index !== action.index);
      case "empty":
        return [];
      default:
        return state;
    }
  }, []);

  const [state, setState] = useState({
    active: 0,
    filtered: [],
    displayUsers: false,
    inputValue: "",
  });

  const searchUser = (e) => {
    const inputValue = e.currentTarget.value;
    const filtered = users.filter((user) =>
      user.full_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setState({
      active: 0,
      filtered: filtered,
      displayUsers: true,
      inputValue: e.currentTarget.value,
    });
  };

  const handleUserSelect = (e) => {
    setState({
      active: 0,
      filtered: [],
      displayUsers: false,
      inputValue: e.currentTarget.innerText,
    });
    fieldRef.current.value = "";
    handleAddUsers(e.currentTarget.innerText);
  };

  const navigateUser = (e) => {
    const { active, filtered } = state;

    if (!fieldRef.current.value && e.keyCode === 13) {
      alert("Please select a user !");
    } else if (!filtered.length && e.keyCode === 13) {
      alert("User does not exist !");
    } else if (e.keyCode === 13) {
      setState({
        active: 0,
        filtered: [],
        displayUsers: false,
        inputValue: filtered[active].full_name,
      });
      fieldRef.current.value = "";
      handleAddUsers(filtered[active].full_name);
    }
  };

  function handleAddUsers(e) {
    dispatchSelected({
      type: "add",
      name: e,
    });
  }

  useEffect(() => {
    async function getUsers() {
      await UsersApi.get("/fullNames").then((response) => {
        setUsers(response.data.fullNames.rows);
        setLoadingUsers(false);
      });
    }
    getUsers();
  }, []);

  useEffect(() => {
    setUsersArray(selected.map((item) => item.name));
  }, [selected]);

  const participants = usersArray.map(
    (user) => users.filter((row) => row.full_name === user)[0].user_id
  );

  participants.push(currentUser);

  if (!loadingUsers) {
    return (
      <div>
        <FormControl
          type="text"
          style={{ width: "300px" }}
          ref={fieldRef}
          placeholder="add a participant . . ."
          value={(fieldRef.current && fieldRef.current.value) || ""}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          onChange={searchUser}
          onKeyDown={navigateUser}
        />
        {state.displayUsers &&
        state.inputValue.length &&
        state.filtered.length ? (
          <Paper elevation={3} id="participant-dropdown">
            {state.filtered
              .map((user) => {
                return (
                  <ul style={{ listStyleType: "none" }} key={user.user_id}>
                    <li
                      onClick={handleUserSelect}
                      value={user.user_id}
                      id="participant-dropdown-item"
                    >
                      {user.full_name}
                    </li>
                  </ul>
                );
              })
              .slice(0, 10)}
          </Paper>
        ) : null}
        <div id="collect-participants">
          {usersArray.map((user, index) => (
            <span id="selected-participant" value={user} key={index}>
              {user}{" "}
              <CgClose
                color="yellow"
                size={17}
                style={{
                  marginBottom: "2px",
                  marginLeft: "2px",
                  cursor: "pointer",
                }}
                onClick={() => dispatchSelected({ type: "remove", index })}
              />
            </span>
          ))}
        </div>
      </div>
    );
  } else
    return (
      <div>
        <h5>Fetching Data...</h5>
      </div>
    );
};

export default ParticipantPicker;
