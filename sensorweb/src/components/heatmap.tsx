import React, { useEffect } from "react";
import h337, { DataPoint, HeatmapData } from "heatmap.js";
import styles from "./heatmap.module.css";
import { scalePointsFromData } from "@/helpers/location";

const HeatMap = ({ mapData }) => {
  const containerRef = React.useRef(null);

  const newPoints = (el: HTMLElement) => {
    const points = [];

    for (let i = 0; i < mapData.length; i++) {
      let newPoints = scalePointsFromData(
        mapData[i].x,
        mapData[i].y,
        el.offsetWidth,
        el.offsetHeight
      );
      points.push({
        x: newPoints[0],
        y: newPoints[1],
        value: mapData[i].value,
      });
      }
      return points;
  };

  const renderHeatmap = (el: HTMLElement, points) => {
    var config = {
      container: el,
      radius: 50,
      maxOpacity: 0.5,
      minOpacity: 0,
      blur: 0.75,
    };
    // create heatmap with configuration
    const heatmapInstance = h337.create(config);
    heatmapInstance.setData({
      max: 25,
      min: 0,
      data: points,
    });
      return heatmapInstance;
  };
  useEffect(() => {
    if (containerRef.current) {
      const element: HTMLElement = containerRef.current!;
        const heatmap = renderHeatmap(element, newPoints(element));

        const renderHeatmapEvent = () => {
            heatmap.setData({
              max: 25,
              min: 0,
              data: newPoints(element),
            });
        }
        addEventListener("resize", renderHeatmapEvent);
    }
  });

  return (
    <div ref={containerRef} className={styles.heatmap}>
      <img src="/images/kroki.png" />
    </div>
  );
};

export default HeatMap;
