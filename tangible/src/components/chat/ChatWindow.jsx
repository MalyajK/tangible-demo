import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import { AvatarGenerator } from "random-avatar-generator";
import Paper from "@material-ui/core/Paper";
import { CgMaximize, CgChevronDown } from "react-icons/cg";
import { IoMdPersonAdd } from "react-icons/io";
import { RiGroup2Fill } from "react-icons/ri";
import { AiFillAlert } from "react-icons/ai";
import SingleChat from "./SingleChat";
import NewMessage from "./NewMessage";
import ChatsApi from "../../apis/ChatsApi";
import UsersApi from "../../apis/UsersApi";
import { UserContext } from "../../auth/UserContext";
import "./chat.css";

const ChatWindow = (params) => {
  const currentUser = useContext(UserContext);
  const generator = new AvatarGenerator();

  const [newIncoming, setNewIncoming] = useState(false);
  const updateIncoming = (incoming) => setNewIncoming(incoming);

  const [modifiedChat, setModifiedChat] = useState();
  const updateModifiedChat = (incoming) => setModifiedChat(incoming);

  const [expand, setExpand] = useState(false);
  const toggle = () => {
    setExpand(!expand);
    setAlertState(false);
  }

  const [chatId, setChatId] = useState();
  const renderChatId = (chatId) => setChatId(chatId);

  const [showChat, setShowChat] = useState(true);
  const handleClose = () => setShowChat(!showChat);

  const [newChat, setNewChat] = useState(false);
  const handleAdd = () => setNewChat(true);
  const closeNew = () => setNewChat(false);

  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);

  const [names, setNames] = useState([]);
  const [loadingNames, setLoadingNames] = useState(true);

  const [alertState, setAlertState] = useState(false);
  const updateAlertState = (incoming) => setAlertState(incoming);

  // load chat feed
  useEffect(() => {
    async function getChats() {
      await ChatsApi.get(`/chatWindowFeed/${currentUser}`).then((response) => {
        setChats(response.data.chatWindowFeed.rows);
        setLoadingChats(false);
        setNewIncoming(false);
      });
    }
    getChats();
  }, [newIncoming, currentUser]);

  // get user names
  useEffect(() => {
    async function getNames() {
      await UsersApi.get("/fullNames").then((response) => {
        setNames(response.data.fullNames.rows);
        setLoadingNames(false);
      });
    }
    getNames();
  }, [currentUser]);

  if (!loadingChats && !loadingNames) {
    return (
      <>
        <Paper
          id="chat-collapse"
          className="row"
          style={{ display: expand ? "none" : "flex" }}
          elevation={3}
        >
          <img
            id="chat-avatar"
            src={generator.generateRandomAvatar(currentUser)}
            alt="profile pic"
          />
          <p
            style={{
              paddingTop: "10px",
              marginLeft: "10px",
              fontSize: "1.1rem",
            }}
          >
            Chats ({chats.length})
          </p>
          <AiFillAlert
            color="cyan"
            size={20}
            style={{
              marginBottom: "10px",
              marginLeft: "10px",
              display: alertState ? "block" : "none",
              cursor:"pointer"
            }}
            onClick={toggle}
          />
          <div
            style={{
              marginLeft: "auto",
              marginBottom: "9px",
            }}
          >
            <IoMdPersonAdd size={30} cursor="pointer" onClick={handleAdd} />
          </div>
          <div
            onClick={toggle}
            style={{
              marginLeft: "15px",
              marginRight: "23px",
              marginBottom: "8px",
              cursor: "pointer",
            }}
          >
            <CgMaximize size={30} />
          </div>
        </Paper>
        <Paper id="chat-expand" elevation={5}>
          <div
            id="chat-expand-header"
            style={{ display: !expand ? "none" : "flex" }}
          >
            <img
              id="chat-avatar-expand"
              src={generator.generateRandomAvatar(currentUser)}
              alt="profile pic"
            />
            <p
              style={{
                paddingTop: "10px",
                marginLeft: "15px",
                fontSize: "1.1rem",
              }}
            >
              Chats ({chats.length})
            </p>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "15px",
                marginTop: "8px",
              }}
            >
              <IoMdPersonAdd
                size={30}
                cursor="pointer"
                onClick={handleAdd}
                style={{ marginRight: "10px" }}
              />
              <CgChevronDown size={35} onClick={toggle} />
            </div>
          </div>
          <div
            id="chat-expand-body"
            style={{ display: !expand ? "none" : "block" }}
          >
            {chats.map((chat) => (
              <div key={chat.chat_id}>
                <div
                  className="row"
                  id="chat-item"
                  style={{
                    background:
                      chat.chat_id === modifiedChat ? "#C2EFE9" : "white",
                  }}
                  onClick={() => {
                    renderChatId(chat.chat_id);
                    setShowChat(true);
                    setModifiedChat(null);
                  }}
                >
                  {chat.is_private && chat.creator === currentUser ? (
                    <img
                      src={generator.generateRandomAvatar(
                        chat.receiver.filter(
                          (participant) => participant !== currentUser
                        )[0]
                      )}
                      alt="chatter"
                      id="chat-avatar-body"
                    />
                  ) : chat.is_private && chat.creator !== currentUser ? (
                    <img
                      src={generator.generateRandomAvatar(chat.creator)}
                      alt="chatter"
                      id="chat-avatar-body"
                    />
                  ) : (
                    <div id="group-info" data-tooltip="group-info">
                      <RiGroup2Fill
                        size={55}
                        color="#E76F51"
                        style={{
                          marginLeft: "10px",
                          marginTop: "5px",
                          marginRight: "5px",
                        }}
                      />
                    </div>
                  )}
                  <p
                    id="chat-with"
                    style={{ color: "darkslategray", fontWeight: "bold" }}
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
                  </p>
                  <div id="chat-date" className="container">
                    <span style={{ fontSize: "0.8rem" }}>
                      {format(new Date(chat.message_time), "HH:MM / do MMM")}
                    </span>
                  </div>
                  <p id="chat-preview">{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
        </Paper>
        <SingleChat
          chatId={chatId}
          handleClose={handleClose}
          showChat={showChat}
          incoming={updateIncoming}
          updateChat={updateModifiedChat}
          alertState={updateAlertState}
        />
        <NewMessage visible={newChat} handleClose={closeNew} />
      </>
    );
  } else return null;
};

export default ChatWindow;
