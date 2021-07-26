import client from "./client";

export const recommendPlace = (data) =>
  client.post(
    "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/testrecommend",
    data
  );
