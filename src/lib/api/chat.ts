import client from "./client";

export const getOneManager = (hospital: string) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL as string, {
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

export const getPrevChats = (from: string, to: string) =>
  client.post(process.env.REACT_APP_CHAT_URL as string, {
    type: "data",
    from,
    to,
  });

export const getListPeople = (name: string) =>
  client.post(process.env.REACT_APP_CHAT_URL as string, {
    type: "connect",
    name,
  });
