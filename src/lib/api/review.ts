import client from "./client";

export const getReviews = (name: string) =>
  client.post(process.env.REACT_APP_REVIEW_URL as string, {
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

export const postReviews = (
  hospital: string,
  text: string,
  name: string,
  rate: string
) =>
  client.post(process.env.REACT_APP_REVIEW_URL as string, {
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

export const setRates = () =>
  client.post(process.env.REACT_APP_RATE as string, {});
