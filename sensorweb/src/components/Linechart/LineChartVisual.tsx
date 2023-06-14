import { TSResolutions } from "@/helpers/dataManipulation";

import {
  Chart as ChartJS,
  Filler,
  PointElement,
  LineElement,
  Legend,
  LinearScale,
  TimeScale,
  Tooltip,
} from "chart.js";

import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

interface GraphPartialData {
  data: Array<number>;
}

export interface GraphData {
  labels: Array<string>;
  datasets: Array<GraphPartialData>;
}

const LinechartVisual = (props: {
  data: GraphData;
  resolution: TSResolutions;
}) => {
  ChartJS.register(
    Filler,
    TimeScale,
    PointElement,
    LineElement,
    Legend,
    LinearScale,
    Tooltip
    );
    

let unit = "minutes"
  switch (props.resolution) {
    case TSResolutions.raw:
      unit = "second";
      break;
    case TSResolutions["1m"]:
      unit = "minute";
      break;
    case TSResolutions["5m"]:
      unit = "minute";
      break;
    case TSResolutions["30m"]:
      unit = "hour";
      break;
    case TSResolutions["1h"]:
      unit = "hour";
      break;
    case TSResolutions["4h"]:
      unit = "hour";
      break;
    case TSResolutions["12h"]:
     unit = "day";
      break;
    case TSResolutions["1d"]:
      unit = "day";
      break;
    case TSResolutions["1w"]:
      unit = "week";
      break;
    }
    
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(47,97,68,1)",
        fill: "start",
        backgroundColor: "rgba(47,97,68,0.0)",
      },
      point: {
        radius: 10,
        hitRadius: 15,
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: unit as
            | false
            | "day"
            | "millisecond"
            | "second"
            | "minute"
            | "hour"
            | "week"
            | "month"
            | "quarter"
            | "year"
            | undefined,
        },
        },
        
    },
    };
    
  return <Line data={props.data} width={100} height={40} options={options} />;
};

export default LinechartVisual;
