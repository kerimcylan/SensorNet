import { useState } from "react";
import { BoxResolutionData, TSResolutions } from "@/helpers/dataManipulation";
import LinechartVisual, { GraphData } from "./LineChartVisual";
import { graphDataFromSensorData } from "@/helpers/dataManipulation";

export default function LineChartMount(props: { data: BoxResolutionData }) {
  const [resolution, setResolution] = useState(TSResolutions.raw);
    let graphData: GraphData = {
        labels: [],
        datasets: [{
            data: []
        }]
    };
    switch (resolution) {
      case TSResolutions.raw:
        graphData = graphDataFromSensorData(props.data.raw);
        break;
      case TSResolutions["1m"]:
        graphData = graphDataFromSensorData(props.data["1m"]);
        break;
      case TSResolutions["5m"]:
        graphData = graphDataFromSensorData(props.data["5m"]);
        break;
      case TSResolutions["30m"]:
        graphData = graphDataFromSensorData(props.data["30m"]);
        break;
      case TSResolutions["1h"]:
        graphData = graphDataFromSensorData(props.data["1h"]);
        break;
      case TSResolutions["4h"]:
        graphData = graphDataFromSensorData(props.data["4h"]);
        break;
      case TSResolutions["12h"]:
        graphData = graphDataFromSensorData(props.data["12h"]);
        break;
      case TSResolutions["1d"]:
        graphData = graphDataFromSensorData(props.data["1d"]);
        break;
      case TSResolutions["1w"]:
        graphData = graphDataFromSensorData(props.data["1w"]);
        break;
    }
  const resolutions = [
    { name: "raw", en: TSResolutions.raw },
    { name: "1m", en: TSResolutions["1m"] },
    { name: "5m", en: TSResolutions["5m"] },
    { name: "30m", en: TSResolutions["30m"] },
    { name: "1h", en: TSResolutions["1h"] },
    { name: "4h", en: TSResolutions["4h"] },
    { name: "12h", en: TSResolutions["12h"] },
    { name: "1d", en: TSResolutions["1d"] },
    { name: "1w", en: TSResolutions["1w"] },
  ];
      const headerClasses =
        "border-2 border-b-0 px-2 text-sm border-blue-dark cursor-pointer";
    const header = resolutions.map((e) => {
            return (
              <div
                className={
                  resolution == e.en
                    ? headerClasses + " bg-blue-dark text-white"
                    : headerClasses
                }
                onClick={() => setResolution(e.en)}
              >
                {e.name}
              </div>
            );
        });
    
  return (
    <div className="w-full">
      <div className="flex flex-row flex-start text-blue-dark">{header}</div>
      <div className="border-2 border-blue-dark">
        <LinechartVisual data={graphData} resolution={resolution} />
      </div>
    </div>
  );
}
