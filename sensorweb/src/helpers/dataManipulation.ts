import { DataPoint } from "heatmap.js";

export interface SensorDatum {
    timestamp: number,
    value: number,
}

export interface SensorData {
    [field: string]: Array<SensorDatum>
}

export interface BoxData {
    data: SensorData,
    location: Array<number>,
}

export interface FullData {
    [box: string]: BoxData
}

export interface FieldDatum {
    min: number,
    max: number,
    aqiWeight: number
}

export interface FieldData {
    [field: string]: FieldDatum
}


export const getFields = (fullData: FullData) => {
    const fields:Array<string> = [];
        for (const key in fullData) {
            for (const fieldkey in fullData[key].data) {
                if (!fields.includes(fieldkey)) fields.push(fieldkey);
          }
    }
    return fields;
};

export const heatmapPoints = (fullData: FullData, field: string) => {
  const points: DataPoint<"x", "y", "value">[] = [];
  for (const key in fullData) {
    for (const fieldkey in fullData[key].data) {
        if (fieldkey == field) {
            const lastEntry = fullData[key].data[fieldkey][0];
            if (lastEntry) {
                points.push({ x: fullData[key].location[0], y: fullData[key].location[1], value: lastEntry.value });
            }
          
      }
    }
    }
    return points;
};
