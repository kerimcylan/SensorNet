import heatmapConf from "@/config/heatmap"

export const scalePointsFromData = (x: number, y: number, frameW: number, frameH: number) => {
    return [Math.floor(x * (frameW / heatmapConf.mapWidth)), Math.floor(y * (frameH / heatmapConf.mapHeight))];
}
export const scalePointsToData = (
  x: number,
  y: number,
  frameW: number,
  frameH: number
) => {
  return [
    Math.floor(x * (heatmapConf.mapWidth / frameW)),
    Math.floor(y * (heatmapConf.mapHeight / frameH)),
  ];
};