import React, { useState } from "react";
import styled from "styled-components";
import { ResponsiveLine } from "@nivo/line";
import { useEffect } from "react";

const ManagerGraphBox = styled.div`
  width: 800px;
  height: 100%;
  background-color: #363b3e;
`;

const ManagerGraph = ({ graphData, data, doctorIndex, doctors }) => {
  const [graphTimes, setTimes] = useState({});

  const makeGraphData = (times, id, color) => {
    const result = [
      {
        id,
        color,
        data: [
          {
            x: "09:00",
            y: times["09:00"],
          },
          {
            x: "09:30",
            y: times["09:30"],
          },
          {
            x: "10:00",
            y: times["10:00"],
          },
          {
            x: "10:30",
            y: times["10:30"],
          },
          {
            x: "11:00",
            y: times["11:00"],
          },
          {
            x: "11:30",
            y: times["11:30"],
          },
          {
            x: "13:00",
            y: times["13:00"],
          },
          {
            x: "13:30",
            y: times["13:30"],
          },
          {
            x: "14:00",
            y: times["14:00"],
          },
          {
            x: "14:30",
            y: times["14:30"],
          },
          {
            x: "15:00",
            y: times["15:00"],
          },
          {
            x: "15:30",
            y: times["15:30"],
          },
          {
            x: "16:00",
            y: times["16:00"],
          },
          {
            x: "16:30",
            y: times["16:30"],
          },
          {
            x: "17:00",
            y: times["17:00"],
          },
          {
            x: "17:30",
            y: times["17:30"],
          },
        ],
      },
    ];
    return result;
  };

  const makeGraphTimes = (obj) => {
    const isRvTimes = {
      "09:00": 0,
      "09:30": 0,
      "10:00": 0,
      "10:30": 0,
      "11:00": 0,
      "11:30": 0,
      "13:00": 0,
      "13:30": 0,
      "14:00": 0,
      "14:30": 0,
      "15:00": 0,
      "15:30": 0,
      "16:00": 0,
      "16:30": 0,
      "17:00": 0,
      "17:30": 0,
    };
    for (let i = 0; i < obj.length; i++) {
      switch (obj[i].time.split(" ")[1]) {
        case "09:00":
          isRvTimes["09:00"] = isRvTimes["09:00"] + 1;
          break;
        case "09:30":
          isRvTimes["09:30"] = isRvTimes["09:30"] + 1;
          break;
        case "10:00":
          isRvTimes["10:00"] = isRvTimes["10:00"] + 1;
          break;
        case "10:30":
          isRvTimes["10:30"] = isRvTimes["10:30"] + 1;
          break;
        case "11:00":
          isRvTimes["11:00"] = isRvTimes["11:00"] + 1;
          break;
        case "11:30":
          isRvTimes["11:30"] = isRvTimes["11:30"] + 1;
          break;
        case "13:00":
          isRvTimes["13:00"] = isRvTimes["13:00"] + 1;
          break;
        case "13:30":
          isRvTimes["13:30"] = isRvTimes["13:30"] + 1;
          break;
        case "14:00":
          isRvTimes["14:00"] = isRvTimes["14:00"] + 1;
          break;
        case "14:30":
          isRvTimes["14:30"] = isRvTimes["14:30"] + 1;
          break;
        case "15:00":
          isRvTimes["15:00"] = isRvTimes["15:00"] + 1;
          break;
        case "15:30":
          isRvTimes["15:30"] = isRvTimes["15:30"] + 1;
          break;
        case "16:00":
          isRvTimes["16:00"] = isRvTimes["16:00"] + 1;
          break;
        case "16:30":
          isRvTimes["16:30"] = isRvTimes["16:30"] + 1;
          break;
        case "17:00":
          isRvTimes["17:00"] = isRvTimes["17:00"] + 1;
          break;
        case "17:30":
          isRvTimes["17:30"] = isRvTimes["17:30"] + 1;
          break;
        default:
          break;
      }
    }
    return isRvTimes;
  };

  useEffect(() => {
    if (graphData) {
      const times = makeGraphTimes(graphData);
      const result = makeGraphData(
        times,
        doctors[doctorIndex] ? doctors[doctorIndex] : "all",
        "hsl(12, 70%, 50%)"
      );
      console.log(result);
      setTimes(result);
    }
  }, [graphData]);

  return (
    <ManagerGraphBox>
      <ResponsiveLine
        data={graphTimes}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        theme={{
          textColor: "#eee",
          fontSize: "12px",
          crosshair: {
            line: {
              stroke: "yellow",
              //   strokeWidth: 1,
              //   strokeOpacity: 0.35,
            },
          },
        }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.1f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </ManagerGraphBox>
  );
};

export default ManagerGraph;
