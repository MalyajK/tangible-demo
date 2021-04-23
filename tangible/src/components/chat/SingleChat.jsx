import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import Paper from "@material-ui/core/Paper";
import { AvatarGenerator } from "random-avatar-generator";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdDelete, MdSend, MdAttachFile } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FaSmile } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import ChatsApi from "../../apis/ChatsApi";
import UsersApi from "../../apis/UsersApi";
import { UserContext } from "../../auth/UserContext";
import "./chat.css";

const SingleChat = (props) => {

  const { chatId, handleClose, showChat, incoming, updateChat, alertState } = props;
  const currentUser = useContext(UserContext);
  const generator = new AvatarGenerator();

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const [chat, setChat] = useState([]);
  const [loadingChat, setLoadingChat] = useState(true);

  const [names, setNames] = useState([]);
  const [loadingNames, setLoadingNames] = useState(true);

  const [message, setMessage] = useState("");

  // load selected chat
  useEffect(() => {
    if (chatId) {
      async function getChat() {
        await ChatsApi.get(`/selectedChat/${chatId}`).then((response) => {
          setChat(response.data.selectedChat.rows[0]);
          setLoadingChat(false);
        });
      }
      getChat();
    }
  }, [chatId]);

  // load messages of selected chat
  useEffect(() => {
    if (chatId) {
      async function getMessages() {
        await ChatsApi.get(`/messageWindowFeed/${chatId}`).then((response) => {
          setMessages(response.data.messageWindowFeed.rows);
          setLoadingMessages(false);
        });
      }
      getMessages();
    }
  }, [chatId, messages]);

  // get user names
  useEffect(() => {
    async function getNames() {
      await UsersApi.get("/fullNames").then((response) => {
        setNames(response.data.fullNames.rows);
        setLoadingNames(false);
      });
    }
    getNames();
  }, []);

  const submitMessage = async (e) => {
    e.preventDefault();
    try {
      await ChatsApi.post("/newMessage", {
        message: message,
        sender: currentUser,
        chat_id: chatId,
      });
    } catch (error) {
      alert("Could not create message");
      console.log(error);
    }
    setMessage("");
    setMessages((currentMessage) => [...messages, message]);
    incoming(true);
    updateChat(chatId);
    alertState(true);
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      submitMessage()
    } 
  }

  if (chatId && !loadingMessages && !loadingNames && !loadingChat) {
    return (
      <Paper
        id="single-chat-expand"
        elevation={5}
        style={{ display: showChat ? "block" : "none" }}
      >
        <div id="single-chat-expand-header">
          {chat.is_private ? (
            <img
              src={
                chat.creator === currentUser
                  ? generator.generateRandomAvatar(
                      chat.receiver.filter((user) => user !== currentUser)[0]
                    )
                  : generator.generateRandomAvatar(chat.creator)
              }
              alt="chatter"
              id="chat-avatar-expand"
            />
          ) : (
            <div id="group-info" data-tooltip="group-info">
              <ImUsers
                size={32}
                style={{ marginTop: "6px", marginLeft: "10px" }}
              />
            </div>
          )}
          <p
            style={{
              fontSize: "1.1rem",
              marginLeft: "60px",
              marginTop: "-27px",
            }}
          >
            {currentUser === chat.creator
              ? names.filter(
                  (name) =>
                    name.user_id ===
                    chat.receiver.filter(
                      (participant) => participant !== currentUser
                    )[0]
                )[0].full_name
              : names.filter((name) => name.user_id === chat.creator)[0]
                  .full_name}{" "}
            {chat.is_private ? null : ` + ${chat.receiver.length - 2}`}
            <span
              style={{ float: "right", marginRight: "15px", cursor: "pointer" }}
              onClick={handleClose}
            >
              <CgClose size={25} />
            </span>
            <span
              style={{ float: "right", marginRight: "15px", cursor: "pointer" }}
            >
              <MdDelete size={25} />
            </span>
          </p>
        </div>
        <div
          id="single-chat-expand-body"
        >
          {messages.map((message) =>
            message.sender === currentUser ? (
              <div className="row" key={message.message_id}>
                <div className="column col-xs-4" style={{ marginTop: "5px" }}>
                  <img
                    src={generator.generateRandomAvatar(message.sender)}
                    alt="chatter"
                    id="my-single-chat-avatar"
                  />
                </div>
                <div className="column col-md-10">
                  <p id="my-message">{message.message}</p>
                  <p id="my-message-timestamp">
                    {format(new Date(message.timestamp), "HH:MM")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="row" key={message.message_id}>
                <div className="column col-md-10">
                  <p id="other-message">
                    <span id="other-message-timestamp"></span>{" "}
                    {message.message}
                  </p>
                </div>
                <div className="column col-xs-4" style={{ marginTop: "5px" }}>
                  <img
                    src={generator.generateRandomAvatar(message.sender)}
                    alt="chatter"
                    id="other-single-chat-avatar"
                  />
                </div>
              </div>
            )
          )}
        </div>
        <Form className="row" id="chat-send-container">
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
              placeholder="write something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleEnter}
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
            <div className="row" style={{ height: "50%", marginLeft: "-10px" }}>
              <Button
                variant="dark"
                id="chat-send"
                type="submit"
                onClick={submitMessage}
              >
                <MdSend size={20} /> Send
              </Button>
            </div>
          </div>
        </Form>
      </Paper>
    );
  } else return null;
};

export default SingleChat;
