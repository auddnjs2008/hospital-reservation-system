import client from "./client";

export const getOneManager = (hospital) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL, {
    method: "GET",
    body: {
      TableName: "hospital_ID",
      ScanFilter: {
        hospitalName: {
          AttributeValueList: {
            S: hospital,
          },
          ComparisonOperator: "EQ",
        },
      },
    },
  });

export const getPrevChats = (from, to) =>
  client.post(process.env.REACT_APP_CHAT_URL, {
    type: "data",
    from,
    to,
  });

export const getListPeople = (name) =>
  client.post(process.env.REACT_APP_CHAT_URL, {
    type: "connect",
    name,
  });
