import axios from "axios";

const recommendAxios = async (dataArray) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/testrecommend",
      data: dataArray,
    });
    console.log(response.data.body);
    console.log(JSON.parse(response.data.body));
  } catch (e) {
    console.log(e);
  }
};

export const writeAxios = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/review",
      data: {
        method: "POST",
        body: {
          TableName: "review",
          Item: {
            number: "1",
            HospitalName: "서울명원최고병원",
            UserName: "auddnjs",
            comment:
              "명원선생님, 직원분들 정말 친절하세요~질문하는거 하나하나 자세히 설명잘해주세요^^ 고시촌에 있을 때 자주 갈껄 후회되네요. 위,장 내시경도 하는거 같아요.의사선생님 전문의시고요",
            rate: "5",
          },
        },
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const readAxios = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/review-get",
      data: {
        type: "all",
        hospitalName: "서울숭실병원",
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const getRecentPage = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/contentsview",
      data: {
        type: "GET",
        body: {
          TableName: "contentsView",
          Key: {
            userName: "xodnjs",
          },
        },
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export default recommendAxios;
