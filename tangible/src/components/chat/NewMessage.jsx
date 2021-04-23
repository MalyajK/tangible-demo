import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useContext,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Paper from "@material-ui/core/Paper";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { CgClose } from "react-icons/cg";
import { FaSmile } from "react-icons/fa";
import { MdSend, MdAttachFile } from "react-icons/md";
import UsersApi from "../../apis/UsersApi";
import ChatsApi from "../../apis/ChatsApi";
import { UserContext } from "../../auth/UserContext";
import "./chat.css";

const NewMessage = (props) => {
  const currentUser = useContext(UserContext);
  const { visible, handleClose } = props;
  const { user } = useAuth0();
  const [userId, setUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [message, setMessage] = useState();
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

  function cancelNewChat() {
    handleClose();
    setMessage("");
    dispatchSelected({
      type: "empty",
      name: "",
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

  // get user_id
  useEffect(() => {
    async function getUserId() {
      await UsersApi.get(`/userId/${user.email}`).then((response) => {
        setUserId(response.data.userId.rows[0]);
        setLoadingUser(false);
      });
    }
    getUserId();
  }, [user.email]);

  // get chats by user_id
  useEffect(() => {
    async function getChats() {
      await ChatsApi.get(`/allChats/${currentUser}`).then((response) => {
        setChats(response.data.allChatsByUser.rows);
        setLoadingChats(false);
      });
    }
    getChats();
  }, [currentUser]);

  const participants = usersArray.map(
    (user) => users.filter((row) => row.full_name === user)[0].user_id
  );

  participants.push(currentUser);

  const identicalChat =
    participants.length > 1 &&
    chats.filter(
      (chat) =>
        JSON.stringify(chat.receiver.sort()) ===
        JSON.stringify(participants.sort())
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (identicalChat.length) {
      await ChatsApi.post("/newMessage", {
        chat_id: identicalChat[0].chat_id,
        sender: currentUser,
        message: message,
      });
    } else
      try {
        await ChatsApi.post("/newChat", {
          is_private: [...new Set(participants)].length > 2 ? false : true,
          creator: userId.user_id,
          receiver: [...new Set(participants)],
        }).then((response) => {
          if (response.status === 200) {
            alert("New Chat Created !");
            ChatsApi.post("/newMessage", {
              chat_id: response.data.newChat.rows[0].chat_id,
              sender: userId.user_id,
              message: message,
            });
          } else if (response.status > 399 && response.status < 500) {
            alert(
              "Failed to create chat. Please check all fields before retrying"
            );
          } else if (response.status > 499 && response.status < 600) {
            alert("Server error. Please try after some time");
          }
        });
      } catch (error) {
        if (error) {
          alert("Could not create new Chat");
        }
      }
    cancelNewChat();
  };

  const allClear = !loadingUser && !loadingUsers && !loadingChats;

  if (allClear) {
    return (
      <Paper
        id="new-msg-container"
        elevation={5}
        style={{ display: visible ? "block" : "none" }}
      >
        <div id="new-msg-header" className="row">
          <p style={{ fontSize: "1.1rem", marginTop: "3px" }}>New Message</p>
          <span
            style={{ float: "right", marginLeft: "auto", marginBottom: "12px" }}
          >
            <CgClose
              size={30}
              onClick={cancelNewChat}
              style={{ cursor: "pointer" }}
            />
          </span>
        </div>
        <Form onSubmit={handleSubmit}>
          <div id="new-msg-body">
            <FormControl
              ref={fieldRef}
              type="text"
              className="form-control"
              placeholder="search a colleague . . ."
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
              <Paper elevation={3} id="user-dropdown">
                {state.filtered
                  .map((user) => {
                    return (
                      <ul style={{ listStyleType: "none" }} key={user.user_id}>
                        <li
                          onClick={handleUserSelect}
                          key={user.user_id}
                          value={user.user_id}
                          id="user-dropdown-item"
                        >
                          {user.full_name}
                        </li>
                      </ul>
                    );
                  })
                  .slice(0, 10)}
              </Paper>
            ) : null}
            <div id="collect-users">
              {usersArray.map((user, index) => (
                <span id="selected-user" value={user} key={user.user_id}>
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
          <div className="row" id="chat-send-container">
            <div
              className="column"
              style={{
                width: "75%",
                marginLeft: "5px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <FormControl
                as="textarea"
                rows={3}
                id="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div
              className="column"
              style={{ marginLeft: "15px", marginTop: "7px" }}
            >
              <div
                className="row"
                style={{ height: "50%", alignContent: "center" }}
              >
                <div className="mr-4 ml-2">
                  <MdAttachFile size={25} color="darkslategrey" />
                </div>
                <FaSmile size={25} color="#E76F51" />
              </div>
              <div
                className="row"
                style={{ height: "50%", marginLeft: "-6px" }}
              >
                <Button
                  variant="dark"
                  id="chat-send"
                  type="submit"
                  disabled={!message}
                >
                  <MdSend size={20} /> Send
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Paper>
    );
  } else return null;
};

export default NewMessage;
