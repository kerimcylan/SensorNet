import { DataPoint } from "heatmap.js";
import { GraphData } from "@/components/Linechart/LineChartVisual";

export enum TSResolutions {
  "raw" = "raw",
  "1m" = "1m",
  "5m" = "5m",
  "30m" = "30m",
  "1h" = "1h",
  "4h" = "4h",
  "12h" = "12h",
  "1d" = "1d",
  "1w" = "1w",
}

// For boxes collection
export type FullData = Array<BoxData>;

export interface BoxData {
  _id: string,
  name: string;
  fields: Array<BoxFieldData>;
  location: Array<number>;
  slug: string,
}

export interface BoxFieldData {
  field: FieldDatum,
  data: BoxResolutionData,
  _id: string
}

export interface BoxResolutionData {
  raw: Array<SensorDatum>,
  "1m": Array<SensorDatum>,
  "5m": Array<SensorDatum>,
  "30m": Array<SensorDatum>,
  "1h": Array<SensorDatum>,
  "4h": Array<SensorDatum>,
  "12h": Array<SensorDatum>,
  "1d": Array<SensorDatum>,
  "1w": Array<SensorDatum>
}

export interface SensorDatum {
  _id: string
  timestamp: string;
  value: number;
}

// For field collection
export interface FieldData {
  [field: string]: FieldDatum;
}

// Doesnt need prolly
export interface FieldDatum {
  _id: string,
  name: string,
  min: number;
  max: number;
  AQI: number;
}

export const getFields = (fullData: FullData) => {
    const fieldIds: Array<string> = [];
  const fields: Array<FieldDatum> = [];

    fullData.forEach((box) => {
        box.fields.forEach((field) => {
          if (!fieldIds.includes(field.field?._id)) {
            fieldIds.push(field.field?._id);
            fields.push(field?.field)
            } 
    })
    });
  return fields;
};

export const heatmapPoints = (fullData: FullData, sensorId: string) => {
    const points: DataPoint<"x", "y", "value">[] = [];

  fullData.forEach((box) => {
      
    const sensorData = box.fields.find((i) => i.field._id == sensorId)?.data;

            const lastEntry = sensorData?.raw[0];
                    if (lastEntry) {
                      points.push({
                        x: box.location[0],
                        y: box.location[1],
                        value: lastEntry.value,
                      });
                    }
    });
  return points;
};

export const graphDataFromSensorData = (data: Array<SensorDatum>) => {
    const graphData: GraphData = {
        labels: [],
        datasets: [{ data: [] }]
    };
    data.forEach(datum => {
        graphData.labels.push(datum.timestamp);
        graphData.datasets[0].data.push(datum.value);
    })
    return graphData;
}