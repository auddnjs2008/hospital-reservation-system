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
    method: "GET",
    body: {
      TableName: "reservation",
      ScanFilter: {
        hospitalName: {
          AttributeValueList: {
            S: name,
          },
          ComparisonOperator: "EQ",
        },
        doctorName: {
          AttributeValueList: {
            S: doctor,
          },
          ComparisonOperator: "EQ",
        },
      },
    },
  });

export const getHospitalId = (name) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL, {
    method: "GET",
    body: {
      TableName: "hospital_ID",
      ScanFilter: {
        hospitalName: {
          AttributeValueList: {
            S: "숭실의원",
          },
          ComparisonOperator: "EQ",
        },
      },
    },
  });
