import axios from "axios";

const client = axios.create({
  headers: { "X-API-KEY": process.env.REACT_APP_API_GATEWAY },
});

export default client;
