import client from "./client";

export const recommendPlace = (data) =>
  client.post(process.env.REACT_APP_RECOMMEND_URL, data);
