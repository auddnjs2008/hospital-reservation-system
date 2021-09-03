import client from "./client";

export const postReservation = (
  hospital: string,
  date: string,
  name: string,
  doctorName: string
) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL as string, {
    method: "POST",
    body: {
      TableName: "reservation",
      Item: {
        number: `${Date.now()}` + name,
        hospitalName: hospital,
        name: name,
        time: date,
        doctorName: doctorName,
      },
    },
  });
export const getReservations = (username: string) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL as string, {
    method: "GET",
    body: {
      TableName: "reservation",
      ScanFilter: {
        name: {
          AttributeValueList: {
            S: username,
          },
          ComparisonOperator: "EQ",
        },
      },
    },
  });

export const getRecentPage = (userName: string) =>
  client.post(process.env.REACT_APP_CHAT_URL as string, {
    type: "GET",
    body: {
      TableName: "contentsView",
      userName,
    },
  });

export const postRecentPage = (userName: string, hospitalName: string) =>
  client.post(process.env.REACT_APP_CHAT_URL as string, {
    type: "POST",
    body: {
      userName,
      hospitalName,
    },
  });
