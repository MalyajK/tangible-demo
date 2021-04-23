import axios from 'axios';

export default axios.create({
  baseURL: "https://tangible-demo.herokuapp.com/api/chats"
});