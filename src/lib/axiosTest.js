import axios from "axios";

const recommendAxios = async (dataArray) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/testrecommend",
      data: dataArray,
    });
    console.log(JSON.parse(response.data.body)[0]);
  } catch (e) {
    console.log(e);
  }
};

export default recommendAxios;
