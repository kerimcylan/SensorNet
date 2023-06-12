import React, { useEffect } from "react";
import h337, { DataPoint, HeatmapData } from "heatmap.js";
import styles from "./heatmap.module.css";
import { scalePointsFromData } from "@/helpers/locationFns";

export interface heatmapProps {
  mapData: DataPoint<"x", "y", "value">[];
  min: number,
  max: number
}

const HeatMap = (props: heatmapProps) => {
  const containerRef = React.useRef(null);

  const newPoints = (el: HTMLElement) => {
    const points = [];

    for (let i = 0; i < props.mapData.length; i++) {
      let newPoints = scalePointsFromData(
        props.mapData[i].x,
        props.mapData[i].y,
        el.offsetWidth,
        el.offsetHeight
      );
      points.push({
        x: newPoints[0],
        y: newPoints[1],
        value: props.mapData[i].value,
      });
    }
    return points;
  };

  const renderHeatmap = (
    el: HTMLElement,
    points: DataPoint<"x", "y", "value">[]
  ) => {
    var config = {
      container: el,
      radius: 50,
      maxOpacity: 0.8,
      minOpacity: 0.3,
      blur: 0.75,
    };

    // create heatmap with configuration
    (window as any).heatmapInstance = h337.create(config);
    console.log(points);
    (window as any).heatmapInstance.setData({
      max: props.max,
      min: props.min,
      data: points,
    });
  };
  useEffect(() => {
    if (containerRef.current) {
      const element: HTMLElement = containerRef.current!;
      const newData = newPoints(element);
      renderHeatmap(element, newData);

      const renderHeatmapEvent = () => {
        (window as any).heatmapInstance.setData({
          max: props.max,
          min: props.min,
          data: newData,
        });
      };
      addEventListener("resize", renderHeatmapEvent);
    }

    return () => {
      if ((window as any).heatmapInstance) {
              (window as any).heatmapInstance._renderer.canvas.remove();
      }
    }
  });

  return (
    <div ref={containerRef} className={styles.heatmap}>
      <img src="/images/kroki.png" />
    </div>
  );
};

export default HeatMap;
