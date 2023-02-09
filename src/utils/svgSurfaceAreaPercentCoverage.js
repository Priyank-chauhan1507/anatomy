import { flattenSVG } from "flatten-svg";
import * as d3 from "d3-polygon";

const getPolygonArea = (polygon) => {
  return Math.abs(d3.polygonArea(polygon));
};

export const svgSurfaceAreaCoverage = (parentSvg, childSvg) => {
  const data = {
    parentArea: 0,
    childArea: 0,
    percentCoverage: 0,
  };
  if (parentSvg) {
    const coords = flattenSVG(parentSvg);
    for (const coord of coords) {
      const area = getPolygonArea(coord.points);
      data.parentArea += area;
    }
  }
  if (childSvg) {
    const coords = flattenSVG(childSvg);
    for (const coord of coords) {
      const area = getPolygonArea(coord.points);

      data.childArea += area;
    }
  }
  if (data.parentArea)
    data.percentCoverage = (data.childArea / data.parentArea) * 100;
  return data;
};

export const getSurfaceAreaCoverage = (parentEl, childEl) => {
  const parentSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const childSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  parentSvg.appendChild(parentEl.cloneNode(true));
  childSvg.appendChild(childEl.cloneNode(true));
  const result = svgSurfaceAreaCoverage(parentSvg, childSvg);
  parentSvg.remove();
  childSvg.remove();
  return result;
};
