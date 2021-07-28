import axios from "axios";

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
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/review",
      data: {
        method: "GET",
        body: {
          TableName: "review",
          ScanFilter: {
            HospitalName: {
              AttributeValueList: {
                S: "서울숭실병원",
              },
              ComparisonOperator: "EQ",
            },
          },
        },
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const postRecentPage = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/contentsview",
      data: {
        type: "POST",
        body: {
          TableName: "contentsView",
          Key: {
            userName: "명원최고",
          },
          hospitalName: "명원최고병원",
        },
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const onePostReservation = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/reservation",
      data: {
        method: "GET",
        body: {
          TableName: "reservation",
          ScanFilter: {
            hospitalName: {
              AttributeValueList: {
                S: "미엘피부과 송산그린시티점",
              },
              ComparisonOperator: "EQ",
            },
          },
        },
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const postReservation = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/reservation",
      data: {
        method: "POST",
        body: {
          TableName: "reservation",
          Item: {
            number: "100",
            hospitalName: "서울숭실병원",
            name: "xodnjs",
            time: "07/26 19:00",
          },
        },
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const getReservation = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://u7npsu62nj.execute-api.ap-northeast-2.amazonaws.com/api_test/reservation",
      data: {
        method: "GET",
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
