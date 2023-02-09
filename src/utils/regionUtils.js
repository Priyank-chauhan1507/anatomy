import { transformSVGCoords } from "./helpers";
import store from "../store";
import { uuid4 } from "../components/CustomMap/utils";

const defaults = {
  egzt: null,
  egzx: 50,
  egzy: 50,
  egzc: null,
};

export const parsePath = (pathId) => {
  pathId = pathId?.replace(/(-|#|_)(\d+)$/, "");
  let [namePart, ...dataParts] = pathId?.split("--") || ["", ""];
  let nameInfo = namePart.split(".")[1];
  // let [amid, side] = amidSideInfo.split("-");
  let [amid, side] = pathId?.split("-") || ["", ""];
  if (side) {
    side = side[0];
  }
  let name;
  if (nameInfo) {
    name = nameInfo.split("HL")[0];
  } else {
    name = namePart;
  }
  amid = amid.endsWith(".") ? amid.slice(0, amid.length - 1) : amid;
  const n_side = side ? side : "";
  let prefixes = [];
  let postfixes = [];
  let egz = { ...defaults };
  const obj = {};
  dataParts.forEach((datum) => {
    let [key, value] = datum.split(":");
    key = key.replace("data-", "");
    if (key.startsWith("pre")) {
      prefixes.push(value);
    } else if (key.startsWith("post")) {
      postfixes.push(value);
    } else if (key.startsWith("egz")) {
      egz[key] = parseInt(value);
    }

    obj[key] = {
      original: datum,
      key,
      value,
    };
  });

  return {
    amid,
    side: n_side,
    prefixes,
    postfixes,
    egz,
    dataObj: obj,
  };
};

export const patchSVGWithPattern = (rootSVG, pattern, targetEle) => {
  pattern.setAttribute("id", uuid4());
  rootSVG.querySelector("defs").appendChild(pattern);
  //   targetEle.setAttribute("fill", `url(#${pattern.getAttribute("id")})`);
  targetEle.style.fill = `url(#${pattern.getAttribute("id")})`;
  targetEle.style.opacity = "1";
};

const createRect = (x, y, width, height, color, opacity = 1) => {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
  rect.setAttribute("fill", color);
  rect.setAttribute("opacity", opacity);
  return rect;
};

export const selectARegionInAPath = (
  pathWidth,
  pathHeight,
  pathDevX,
  pathDevY,
  devPlane = "",
  nonSelectedColor = "red",
  selectedColor = "blue",
  selectedOpacity = 0.6
) => {
  const pathBound = { width: pathWidth, height: pathHeight };

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const pattern = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "pattern"
  );
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("width", pathWidth);
  svg.setAttribute("height", pathHeight);
  svg.setAttribute("viewBox", `0 0 ${pathWidth} ${pathHeight}`);

  pattern.setAttribute("width", pathBound.width + "px");
  pattern.setAttribute("height", pathBound.height + "px");
  g.setAttribute("width", pathBound.width + "px");
  g.setAttribute("height", pathBound.height + "px");
  //   pattern.setAttribute("patternUnits", "userSpaceOnUse");
  const centerRectWidth = (pathBound.width * pathDevX) / 100;
  const centerRectHeight = (pathBound.height * pathDevY) / 100;
  const centerPosX = pathBound.width / 2 - centerRectWidth / 2;
  const centerPosY = pathBound.height / 2 - centerRectHeight / 2;
  const devWidth = centerPosX;
  const devHeight = centerPosY;
  const color = selectedColor;

  const opacity = selectedOpacity;
  //   const rects = {
  const centerRect = createRect(
    centerPosX,
    centerPosY,
    centerRectWidth,
    centerRectHeight,
    "transparent",
    opacity
  );

  //   }

  let x, y, width, height;

  // case "-x":
  x = 0;
  y = centerPosY;
  width = devWidth;
  height = centerRectHeight;
  const negXRect = createRect(
    x,
    y,
    width,
    height,
    devPlane === "-x" ? color : "transparent",
    opacity
  );

  x = devWidth + centerRectWidth;
  y = centerPosY;
  width = devWidth;
  height = centerRectHeight;
  const posXRect = createRect(
    x,
    y,
    width,
    height,
    devPlane === "+x" ? color : "transparent",
    opacity
  );

  //   break;
  // case "-y":
  x = centerPosX;
  y = 0;
  width = centerRectWidth;
  height = devHeight;
  const negYRect = createRect(
    x,
    y,
    width,
    height,
    devPlane === "+y" ? color : "transparent",
    opacity
  );

  //   break;
  // case "+y":
  x = centerPosX;
  y = devHeight + centerRectHeight;
  width = centerRectWidth;
  height = devHeight;
  const posYRect = createRect(
    x,
    y,
    width,
    height,
    devPlane === "-y" ? color : "transparent",
    opacity
  );

  //   break;
  // case "-x+y":
  x = 0;
  y = 0;
  width = devWidth;
  height = devHeight;
  const negXPosYRect = createRect(
    x,
    y,
    width,
    height,
    devPlane === "-x+y" ? color : "transparent",
    opacity
  );

  //   break;
  // case "+x+y":
  x = devWidth + centerRectWidth;
  y = 0;
  width = devWidth;
  height = devHeight;
  const posXPosYRect = createRect(
    x,
    y,
    width,
    height,
    devPlane === "+x+y" ? color : "transparent",
    opacity
  );
  //   break;
  // case "-x-y":
  x = 0;
  y = devHeight + centerRectHeight;
  width = devWidth;
  height = devHeight;
  const negXNegYRect = createRect(
    x,
    y,
    width,
    height,
    devPlane === "-x-y" ? color : "transparent",
    opacity
  );
  x = devWidth + centerRectWidth;
  y = devHeight + centerRectHeight;
  width = devWidth;
  height = devHeight;
  const posXNegYRect = createRect(
    x,
    y,
    width,
    height,
    devPlane === "+x-y" ? color : "transparent",
    opacity
  );

  const fullRect = createRect(
    0,
    0,
    pathBound.width,
    pathBound.height,
    nonSelectedColor,
    opacity
  );
  svg.appendChild(fullRect);
  svg.appendChild(centerRect);
  svg.appendChild(negXRect);
  svg.appendChild(posXRect);
  svg.appendChild(negYRect);
  svg.appendChild(posYRect);
  svg.appendChild(negXPosYRect);
  svg.appendChild(posXPosYRect);
  svg.appendChild(negXNegYRect);
  svg.appendChild(posXNegYRect);
  g.appendChild(svg);
  svg.style.color = nonSelectedColor;
  svg.style.opacity = 1;
  pattern.appendChild(g);

  return pattern;

  //   return difference;
};
