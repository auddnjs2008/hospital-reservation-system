import client from "./client";

export const postReservation = (hospital, date, name, doctorName) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL, {
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
export const getReservations = (username) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL, {
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