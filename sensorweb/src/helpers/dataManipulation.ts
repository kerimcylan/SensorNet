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
  name: string;
  fields: Array<BoxFieldData>;
  location: Array<number>;
}

export interface BoxFieldData{
    fieldId: number,
    name: string,
    data: BoxResolutionData
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
  timestamp: string;
  value: number;
}

// For field collection
export interface FieldData {
  [field: string]: FieldDatum;
}

export interface FieldDatum {
  min: number;
  max: number;
  aqiWeight: number;
}

export const getFields = (fullData: FullData) => {
    const fields: Array<string> = [];

    fullData.forEach((box) => {
        box.fields.forEach((field) => {
            if (!fields.includes(field.name)) fields.push(field.name);
    })
    });
  return fields;
};

export const heatmapPoints = (fullData: FullData, field: string) => {
    const points: DataPoint<"x", "y", "value">[] = [];

    fullData.forEach((box) => {
        box.fields.forEach((field) => {
            const lastEntry = field.data.raw[0];
                    if (lastEntry) {
                      points.push({
                        x: box.location[0],
                        y: box.location[1],
                        value: lastEntry.value,
                      });
                    }
        })
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