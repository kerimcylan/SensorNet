import { FullData } from "./dataManipulation";

const mockData: FullData = [
  {
    _id: "6489d1268a0ccd787cfbbd3b",
    name: "Starbucks",
    location: [630, 200],
    slug: "starbucks",
    fields: [
      {
        data: {
          raw: [
            {
              timestamp: "2023-06-14T18:21:55.000Z",
              value: 124.9974,
              _id: "6489db1e40f8c4290be68922",
            },
          ],
          "1m": [],
          "5m": [],
          "30m": [],
          "1h": [],
          "4h": [],
          "12h": [],
          "1d": [],
          "1w": [],
        },
        field: {
          _id: "64882ac7079865bb79058e19",
          name: "Temperature",
          min: 10,
          max: 30,
          AQI: 0.5,
        },
        _id: "6489d12a8a0ccd787cfbbd3e",
      },
    ],
  },
];


export default mockData;