import client from "./client";

export const getDoctors = (name) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL, {
    method: "GET",
    body: {
      TableName: "hospital_Info",
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

export const getDoctorTimes = (name, doctor) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL, {
    method: "POST",
    body: {
      TableName: "hospital_Info",
      Item: {
        number: "3",
        HospitalName: name,
        doctorName: doctor,
      },
    },
  });
