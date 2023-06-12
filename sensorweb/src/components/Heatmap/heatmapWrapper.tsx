import HeatMap, { heatmapProps } from "./heatmap";

const HeatmapWapper = (props: heatmapProps) => {
  return (
    <>
      <ul className="flex flex-row text-blue-dark">
        <li>Temperature</li>
        <li>Humidity</li>
        <li>Partical Counts</li>
      </ul>
      <div className="border-2 border-blue-dark">
        <HeatMap {...props} />
      </div>
    </>
  );
};

export default HeatmapWapper;
