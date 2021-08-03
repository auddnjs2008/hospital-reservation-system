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
