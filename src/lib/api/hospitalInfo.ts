import client from "./client";

export const getDoctors = (name: string) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL as string, {
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

export const getDoctorTimes = (name: string, doctor: string) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL as string, {
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

export const getHospitalId = (name: string) =>
  client.post(process.env.REACT_APP_HOSPIAL_INFO_URL as string, {
    method: "GET",
    body: {
      TableName: "hospital_ID",
      ScanFilter: {
        hospitalName: {
          AttributeValueList: {
            S: name,
          },
          ComparisonOperator: "EQ",
        },
      },
    },
  });
