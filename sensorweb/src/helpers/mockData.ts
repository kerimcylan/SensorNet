import { FullData } from "./dataManipulation";

const mockData: FullData = [
  {
    name: "Starbucks",
    fields: [
      {
        fieldId: 1,
        name: "Temperature",
        data: {
          raw: [
            { timestamp: "2022-11-01 15:30:20", value: 25 },
            { timestamp: "2022-11-01 15:30:30", value: 15 },
            { timestamp: "2022-11-01 15:30:40", value: 35 },
            { timestamp: "2022-11-01 15:30:50", value: 45 },
            { timestamp: "2022-11-01 15:31:00", value: 15 },
          ],
          "1m": [
            { timestamp: "2022-11-01 15:31:20", value: 25 },
            { timestamp: "2022-11-01 15:32:30", value: 15 },
            { timestamp: "2022-11-01 15:33:40", value: 35 },
            { timestamp: "2022-11-01 15:34:50", value: 45 },
            { timestamp: "2022-11-01 15:36:00", value: 15 },
          ],
          "5m": [
            { timestamp: "2022-11-01 15:31:20", value: 25 },
            { timestamp: "2022-11-01 15:32:30", value: 15 },
            { timestamp: "2022-11-01 15:33:40", value: 35 },
            { timestamp: "2022-11-01 15:34:50", value: 45 },
            { timestamp: "2022-11-01 15:36:00", value: 15 },
          ],
          "30m": [
            { timestamp: "2022-11-01 15:31:20", value: 25 },
            { timestamp: "2022-11-01 15:32:30", value: 15 },
            { timestamp: "2022-11-01 15:33:40", value: 35 },
            { timestamp: "2022-11-01 15:34:50", value: 45 },
            { timestamp: "2022-11-01 15:36:00", value: 15 },
          ],
          "1h": [
            { timestamp: "2022-11-01 15:31:20", value: 25 },
            { timestamp: "2022-11-01 15:32:30", value: 15 },
            { timestamp: "2022-11-01 15:33:40", value: 35 },
            { timestamp: "2022-11-01 15:34:50", value: 45 },
            { timestamp: "2022-11-01 15:36:00", value: 15 },
          ],
          "4h": [
            { timestamp: "2022-11-01 15:31:20", value: 25 },
            { timestamp: "2022-11-01 15:32:30", value: 15 },
            { timestamp: "2022-11-01 15:33:40", value: 35 },
            { timestamp: "2022-11-01 15:34:50", value: 45 },
            { timestamp: "2022-11-01 15:36:00", value: 15 },
          ],
          "12h": [
            { timestamp: "2022-11-01 15:31:20", value: 25 },
            { timestamp: "2022-11-01 15:32:30", value: 15 },
            { timestamp: "2022-11-01 15:33:40", value: 35 },
            { timestamp: "2022-11-01 15:34:50", value: 45 },
            { timestamp: "2022-11-01 15:36:00", value: 15 },
          ],
          "1d": [
            { timestamp: "2022-11-01 15:31:20", value: 25 },
            { timestamp: "2022-11-01 15:32:30", value: 15 },
            { timestamp: "2022-11-01 15:33:40", value: 35 },
            { timestamp: "2022-11-01 15:34:50", value: 45 },
            { timestamp: "2022-11-01 15:36:00", value: 15 },
          ],
          "1w": [
            { timestamp: "2022-11-01 15:31:20", value: 25 },
            { timestamp: "2022-11-01 15:32:30", value: 15 },
            { timestamp: "2022-11-01 15:33:40", value: 35 },
            { timestamp: "2022-11-01 15:34:50", value: 45 },
            { timestamp: "2022-11-01 15:36:00", value: 15 },
          ],
        },
      },
      {
        fieldId: 2,
        name: "Humidity",
        data: {
          raw: [{ timestamp: "2022-11-01 15:30:00", value: 10 }],
          "1m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "5m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "30m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "4h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "12h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1d": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1w": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
        },
      },
      {
        fieldId: 3,
        name: "Fanfirifinfon",
        data: {
          raw: [{ timestamp: "2022-11-01 15:30:00", value: 10 }],
          "1m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "5m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "30m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "4h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "12h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1d": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1w": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
        },
      },
      {
        fieldId: 4,
        name: "Yarabbiiim",
        data: {
          raw: [{ timestamp: "2022-11-01 15:30:00", value: 10 }],
          "1m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "5m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "30m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "4h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "12h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1d": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1w": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
        },
      },
    ],
    location: [630, 200],
  },
  {
    name: "D Block",
    fields: [
      {
        fieldId: 1,
        name: "Temperature",
        data: {
          raw: [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "5m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "30m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "4h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "12h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1d": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1w": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
        },
      },
      {
        fieldId: 2,
        name: "Humidity",
        data: {
          raw: [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "5m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "30m": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "4h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "12h": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1d": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
          "1w": [{ timestamp: "2022-11-01 15:30:00", value: 0 }],
        },
      },
    ],
    location: [300, 150],
  },
];


export default mockData;