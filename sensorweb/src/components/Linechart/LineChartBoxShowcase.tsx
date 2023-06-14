import { BoxData } from "@/helpers/dataManipulation";
import React from "react";
import LineChartMount from "./LineChartMount";

export default function LineChartBoxShowcase(props: { data: BoxData }) {
  console.log(props.data)
  const fields = props.data.fields.map((field) => {
    return (
      <div>
        <h2 className="text-blue-dark">{field.field.name}</h2>
        <LineChartMount data={field.data} />
      </div>
    );
  });
  return <div className="grid grid-cols-3 gap-5">{ fields }</div>;
}
