import { FullData, FieldDatum, getFields, heatmapPoints } from "@/helpers/dataManipulation";
import HeatMap, { heatmapProps } from "./heatmap";
import { useState } from "react";
import { DataPoint } from "heatmap.js";

const HeatmapWapper = (props: { data: FullData }) => {
  const fields = getFields(props.data);

  let map: DataPoint<"x", "y", "value">[] = [];
  let sensorState: FieldDatum | null = null;
  if (fields.length != 0) {
    sensorState = fields[0];
  }

  const [sensor, setSensor] = useState(sensorState);

  let fieldMin = sensor ? sensor.min : 0;
  let fieldMax = sensor ? sensor.max : 30;

  
  const headerClasses =
    "border-2 border-b-0 px-3 border-blue-dark cursor-pointer";
  

  const renderFields = fields.map((field, index) => (
    <li
      key={index}
      className={
        sensor?.name == field.name
          ? headerClasses + " bg-blue-dark text-white"
          : headerClasses
      }
      onClick={() => setSensor(field)}
    >
      {field.name}
    </li>
  ));

  map = heatmapPoints(props.data);

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
