import { FullData, FieldData, getFields, heatmapPoints } from "@/helpers/dataManipulation";
import HeatMap, { heatmapProps } from "./heatmap";
import { useState } from "react";
import { DataPoint } from "heatmap.js";

const HeatmapWapper = (props: { data: FullData; fieldData: FieldData }) => {
  const fields = getFields(props.data);

  let map: DataPoint<"x", "y", "value">[] = [];
  let sensorState = "";
  if (fields.length != 0) {
    sensorState = fields[0];
  }

  const [sensor, setSensor] = useState(sensorState);

  let fieldMin = 0;
  let fieldMax = 30;
  if (sensor in props.fieldData) {
    fieldMin = props.fieldData[sensor].min;
    fieldMax = props.fieldData[sensor].max;
  }
  
  const headerClasses =
    "border-2 border-b-0 px-3 border-blue-dark cursor-pointer";
  const renderFields = fields.map((name, index) => (
    <li
      key={index}
      className={
        sensor == name
          ? headerClasses + " bg-blue-dark text-white"
          : headerClasses
      }
      onClick={() => setSensor(name)}
    >
      {name}
    </li>
  ));

  map = heatmapPoints(props.data, sensor);

  return (
    <>
      <ul className="flex flex-row text-blue-dark">{renderFields}</ul>
      <div className="border-2 border-blue-dark">
        <HeatMap mapData={map} min={fieldMin} max={fieldMax} />
      </div>
    </>
  );
};

export default HeatmapWapper;
