import { FullData, FieldDatum, getFields, heatmapPoints } from "@/helpers/dataManipulation";
import HeatMap, { heatmapProps } from "./heatmap";
import { useState } from "react";
import { DataPoint } from "heatmap.js";
import { useTranslation } from "next-i18next";

const HeatmapWapper = (props: { data: FullData }) => {
  
  const fields = getFields(props.data);
  const { t } = useTranslation();

  let map: DataPoint<"x", "y", "value">[] = [];
  let sensorState: FieldDatum | null = null;
  if (fields.length != 0) {
    sensorState = fields[0];
  }

  const [sensor, setSensor] = useState(sensorState?._id);

  const sensorNow = fields.find((i) => i._id == sensor);
  let fieldMin = sensorNow != null ? sensorNow.min : 0;
  let fieldMax = sensorNow != null ? sensorNow.max : 30;

  
  const headerClasses =
    "border-2 border-b-0 px-3 border-blue-dark cursor-pointer";


  const renderFields = fields.map((field, index) => (
    <li
      className={
        sensor == field._id
          ? headerClasses + " bg-blue-dark text-white"
          : headerClasses
      }
      key={field._id}
      onClick={() => setSensor(field._id)}
    >
      {t(field.name)}
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
