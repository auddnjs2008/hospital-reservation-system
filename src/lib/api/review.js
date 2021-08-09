import client from "./client";

export const getReviews = (name) =>
  client.post(process.env.REACT_APP_REVIEW_URL, {
    method: "GET",
    body: {
      TableName: "review",
      ScanFilter: {
        HospitalName: {
          AttributeValueList: {
            S: name,
          },
          ComparisonOperator: "EQ",
        },
      },
    },
  });

export const postReviews = (hospital, text, name, rate) =>
  client.post(process.env.REACT_APP_REVIEW_URL, {
    method: "POST",
    body: {
      TableName: "review",
      Item: {
        number: `${Date.now()}`,
        HospitalName: hospital,
        UserName: name,
        comment: text,
        rate: rate,
      },
    },
  });

export const setRates = () => client.post(process.env.REACT_APP_RATE, {});
