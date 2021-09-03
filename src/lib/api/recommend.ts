import client from "./client";

export const recommendPlace = (data: object[]) =>
  client.post(process.env.REACT_APP_RECOMMEND_URL as string, data);
