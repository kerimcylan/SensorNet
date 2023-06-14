import { BoxData, FullData } from "@/helpers/dataManipulation";
import React from "react";
import LineChartMount from "./LineChartMount";

export default function LineChartSensorShowcase(props: { data: any }) {
  const fields = props.data.map((box: any) => {
    return (
      <div>
        <h2 className="text-blue-dark">{box.name}</h2>
        <LineChartMount data={box.fields[0].data} />
      </div>
    );
  });
  return <div className="grid grid-cols-3 gap-5">{fields}</div>;
}
