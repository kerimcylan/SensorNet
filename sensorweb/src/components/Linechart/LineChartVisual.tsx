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
    

    //60 * 100 equals a minute
  let dateModifier = 60*1000;
let unit = "minutes"
  switch (props.resolution) {
    case TSResolutions.raw:
      unit = "second";
      // 30 minutes
      dateModifier *= 30;
      break;
    case TSResolutions["1m"]:
      unit = "minute";
      dateModifier *= 3 * 30;
      break;
    case TSResolutions["5m"]:
      dateModifier *= 5 * 3 * 30;
      unit = "minute";
      break;
    case TSResolutions["30m"]:
      dateModifier *= 6 * 5 * 3 * 30;
      unit = "hour";
      break;
    case TSResolutions["1h"]:
      dateModifier *= 2 * 6 * 5 * 3 * 30;
      unit = "hour";
      break;
    case TSResolutions["4h"]:
      dateModifier *= 4 * 2 * 6 * 5 * 3 * 30;
      unit = "hour";
      break;
    case TSResolutions["12h"]:
      dateModifier *= 3 * 4 * 2 * 6 * 5 * 3 * 30;
     unit = "day";
      break;
    case TSResolutions["1d"]:
      dateModifier *= 2 * 3 * 4 * 2 * 6 * 5 * 3 * 30;
      unit = "day";
      break;
    case TSResolutions["1w"]:
      dateModifier *= 7 * 3 * 4 * 2 * 6 * 5 * 3 * 30;
      unit = "week";
      break;
  }
  
    const data = props.data;
    const lastDate = Date.parse(props.data.labels[data.labels.length - 1]);

    const cleanData: GraphData = { labels: [], datasets: [{ data: [] }] };
    data.labels.forEach((date, index) => {
      if (!(lastDate - Date.parse(date) > dateModifier)) {
        cleanData.labels.push(date);
        cleanData.datasets[0].data.push(data.datasets[0].data[index]);
      }
    });
    
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
    
  return <Line data={cleanData} width={100} height={40} options={options} />;
};

export default LinechartVisual;
