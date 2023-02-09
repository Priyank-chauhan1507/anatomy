import {
  ClickAwayListener,
  Fade,
  Paper,
  Popover,
  Popper,
} from "@material-ui/core";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { TranslationContext } from "../../contexts/translation";
import { useExport } from "../../hooks/useExport";
import { setMapContext, setSelectedItemId } from "../../store/slices/app";
import { onAddItem, setActiveItem, updateItem } from "../../store/slices/lists";
import { getEGZInfo, getRootSVG } from "../../utils/cf";
import { downloadMohrsMap } from "../../utils/exportUtils/pdf";
import {
  checkIsSeaAllowed,
  chooseList,
  fetchHmap,
  getHierarchy,
  isAnAnatomicSite,
  parseMarkerToGetID,
  parseRegionMarkerToDistributionInfo,
  removePin,
  transformSVGCoords,
} from "../../utils/helpers";
import { ContextMenu } from "../ItemsRenderer";
import LoadSVG from "../LoadSVG";
import { SVGRegionRenderer } from "../SVGRegionRenderer";
import SVGHoverlay from "./SVGHoverlay";

// const getClassForMarker = (listType, listTT) => {
//   return `Marker-${listType}-${listTT}`;
// };

// const createPinDescription = ({
//   NS,
//   listType,
//   g,
//   fillColor,
//   pin_description,
//   pinShape,
//   left_to_right,
// }) => {
//   const desc = document.createElementNS(NS, "text");
//   const hyphen = document.createElementNS(NS, "svg");
//   hyphen.innerHTML = hyphenElement({ fillColor });
//   hyphen.setAttribute("y", -0.5 * SCALE);
//   hyphen.classList.add("Pin-Hyphen");
//   if (getPinDescriptionText(pin_description) === "")
//     hyphen.style.visibility = "hidden";
//   desc.classList.add("Pin-Description");
//   // desc.style.outlineColor = "white";
//   // desc.style.outlineWidth = "6px";
//   // desc.style.outlineStyle = "solid";
//   desc.style.stroke = "white";
//   desc.style.fontWeight = "700";
//   desc.style.paintOrder = "stroke";
//   desc.style.fill = fillColor;

//   if (left_to_right) {
//     hyphen.setAttribute("x", 14 * SCALE);
//     desc.setAttribute("x", 20 * SCALE);
//     desc.setAttribute("text-anchor", "start");
//   } else {
//     hyphen.setAttribute("x", -19 * SCALE);
//     desc.setAttribute("x", -22 * SCALE);
//     desc.setAttribute("text-anchor", "end");
//   }

//   desc.setAttribute("y", 4 * SCALE);
//   desc.innerHTML = getPinDescriptionText(pin_description);
//   desc.style.fontSize = 0.6 * SCALE + "rem";
//   //
//   if (listType === "unordered") {
//     if (left_to_right) {
//       hyphen.setAttribute("x", 8 * SCALE);
//       desc.setAttribute("x", 14 * SCALE);
//     } else {
//       hyphen.setAttribute("x", -13 * SCALE);
//       desc.setAttribute("x", -16 * SCALE);
//     }
//     hyphen.setAttribute("y", -2 * SCALE);
//     desc.setAttribute("y", 3 * SCALE);
//   }

//   if (pinShape === 4 && left_to_right) {
//     hyphen.setAttribute("x", 11 * SCALE);
//     desc.setAttribute("x", 18 * SCALE);
//     if (listType === "unordered") {
//       hyphen.setAttribute("x", 6 * SCALE);
//       desc.setAttribute("x", 12 * SCALE);
//     }
//   } else if (pinShape === 4) {
//     hyphen.setAttribute("x", -13 * SCALE);
//     desc.setAttribute("x", -16 * SCALE);
//     if (listType === "unordered") {
//       hyphen.setAttribute("x", -8 * SCALE);
//       desc.setAttribute("x", -11 * SCALE);
//     }
//   }

//   g.appendChild(hyphen);
//   g.appendChild(desc);
// };

export const getParentsForArea = (pathId) => {
  let hierarchy = [];
  // let v_children = [];
  // const boundingRect = document.getElementById(pathId).getBoundingClientRect();
  const ele = document.getElementById(pathId);
  const childrens = document
    .getElementById(pathId)
    ?.parentElement.querySelectorAll("path");

  if (childrens) {
    childrens.forEach((e) => {
      if (e.contains(ele)) {
        hierarchy.push(e.id);
      }
    });
    // const children = parentEl.children;
  }
  return hierarchy;
};

export const innerLayerColors = [
  { color: "#FFA500", bg: "#fff" },
  { color: "#ffff00", bg: "#000" },
  { color: "#00FF00", bg: "#fff" },
  { color: "#0000FF", bg: "#fff" },
  { color: "#4B0082", bg: "#fff" },
  { color: "#8F00FF", bg: "#fff" },
  { color: "#D3D3D3", bg: "#fff" },
  { color: "#A9A9A9", bg: "#fff" },
  { color: "#000000", bg: "#fff" },
  { color: "#FF0000", bg: "#fff" },
  { color: "#4B0082", bg: "#fff" },
  { color: "#FF7F00", bg: "#fff" },
  { color: "#FFA500", bg: "#fff" },
  { color: "#ffff00", bg: "#000" },
  { color: "#00FF00", bg: "#fff" },
  { color: "#0000FF", bg: "#fff" },
  { color: "#4B0082", bg: "#fff" },
  { color: "#8F00FF", bg: "#fff" },
  { color: "#D3D3D3", bg: "#fff" },
  { color: "#A9A9A9", bg: "#fff" },
  { color: "#000000", bg: "#fff" },
  { color: "#FF0000", bg: "#fff" },
  { color: "#4B0082", bg: "#fff" },
  { color: "#FF7F00", bg: "#fff" },
  { color: "#FFA500", bg: "#fff" },
  { color: "#ffff00", bg: "#000" },
  { color: "#00FF00", bg: "#fff" },
  { color: "#0000FF", bg: "#fff" },
  { color: "#4B0082", bg: "#fff" },
  { color: "#8F00FF", bg: "#fff" },
  { color: "#D3D3D3", bg: "#fff" },
  { color: "#A9A9A9", bg: "#fff" },
  { color: "#000000", bg: "#fff" },
  { color: "#FF0000", bg: "#fff" },
  { color: "#4B0082", bg: "#fff" },
  { color: "#FF7F00", bg: "#fff" },
  { color: "#FFA500", bg: "#fff" },
  { color: "#ffff00", bg: "#000" },
  { color: "#00FF00", bg: "#fff" },
  { color: "#0000FF", bg: "#fff" },
  { color: "#4B0082", bg: "#fff" },
  { color: "#8F00FF", bg: "#fff" },
  { color: "#D3D3D3", bg: "#fff" },
  { color: "#A9A9A9", bg: "#fff" },
  { color: "#000000", bg: "#fff" },
  { color: "#FF0000", bg: "#fff" },
  { color: "#4B0082", bg: "#fff" },
  { color: "#FF7F00", bg: "#fff" },
];

let prevHierarchy = [];
var prevColorsAndOpacity = [];

const styleHierarchy = (hierarchy = [], mapContext) => {
  // if (mapContext === "list") {
  prevHierarchy.forEach(({ pathId: id }, index) => {
    const ele = document.getElementById(id);
    if (ele) {
      ele.style.opacity = prevColorsAndOpacity[index].opacity;
      ele.style.fill = prevColorsAndOpacity[index].fill;
    }

    // document.getElementById(id).style.zIndex = undefined;
  });
  prevColorsAndOpacity = [];
  hierarchy.forEach(({ pathId: id }, index) => {
    const ele = document.getElementById(id);

    if (ele) {
      prevColorsAndOpacity.push({
        // opacity: ele.getAttribute("fill") ? ele.style.opacity : null,
        opacity: ele.getAttribute("data-opacity") || ele.style.opacity || null,
        fill: ele.getAttribute("data-fill") || ele.style.fill || null,
      });
      ele.style.opacity = 1;
      ele.style.fill = innerLayerColors[index].color;
    }

    // document.getElementById(id).style.zIndex = index + 1;
  });
  prevHierarchy = [...hierarchy];
  // }
};
let prevPathId = "";
let prevIsHierarchy = false;

const styleActivePath = (pathId, isHierarchy = false, mapContext) => {
  if (prevPathId) {
    if (prevIsHierarchy) {
      document
        .getElementById(prevPathId)
        .classList.remove("active-path-x-hierarchy");
    } else {
      document.getElementById(prevPathId).classList.remove("active-path-x");
    }
  }
  if (pathId) {
    // if (pathId && mapContext === "list") {
    if (isHierarchy) {
      document.getElementById(pathId).classList.add("active-path-x-hierarchy");
    } else {
      document.getElementById(pathId).classList.add("active-path-x");
    }
  }

  prevPathId = pathId;
  prevIsHierarchy = isHierarchy;
};

const removeOldStyle = (prev) => {
  const { el, fill, opacity } = prev;
  if (el) {
    el.setAttribute("fill", fill || null);
    el.style.opacity = opacity || null;
    // el.style.opacity = fill ? opacity : null;
  }
};

const initalRestore = {
  el: null,
  opacity: null,
  fill: null,
  x: null,
  y: null,
};

function AnatomyMapper({ containerStyle, svgUrl }) {
  // reactive states
  const [activePathId, setActivePathId] = useState(null);
  const [innerLayers, setInnerLayers] = useState([]);
  const [activeEGZ, setActiveEGZ] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const { lateralityData, egztData, uiData } = useContext(TranslationContext);
  const { exportPDFWithMap } = useExport();
  // const [currentTimeout, setCurrentTimeout] = useState(null);
  const mapContext = useSelector((state) => state.app.mapContext);
  const dispatch = useDispatch();
  const selectedItemId = useSelector((state) => state.app.selectedItemId);
  const [anchorEle, setAnchorEle] = useState(null);
  const [diagram, setDiagram] = useState([]);
  const [contextMenuAnchor, setContextMenuAnchor] = useState(false);
  // const [moved, setMoved] = useState(false);
  const showHierarchy = useSelector(
    (state) => state.userSettings.mapSettings.showHierarchy
  );

  const itemsMap = useSelector((state) => state.listStore.itemsMap);

  const globalSNS = useSelector((state) => state.listStore.globalSNS);

  const distributionSNS = useSelector(
    (state) => state.listStore.distributionSNS
  );

  const isDistributionMode = useSelector(
    (state) => state.listStore.isDistributionMode
  );

  const activeList = useSelector((state) => state.listStore.activeList);
  const activeSubType = useSelector(
    (state) => state.listStore.lists[activeList]?.activeSubType
  );

  const pinListSettings = useSelector(
    (state) =>
      chooseList(state.listStore.lists, activeList, activeSubType).attr
        .pinListSettings
  );

  const sns = isDistributionMode ? distributionSNS : globalSNS;

  //passive state
  const isMousePressed = useRef(false);
  const restoreInfo = useRef(initalRestore);
  const prevEleStyle = useRef({
    opacity: null,
    el: null,
    fill: null,
  });
  const isSeaAllowed = useRef(false);
  const ele = document.getElementById(selectedItemId);
  const moveCbCount = useRef(0);
  const mohrsMapElement = useRef(null);
  const touchCoordInfo = useRef(null);
  const isLongPress = useRef(false);
  const longPresstimeout = useRef(null);
  const isTouchMoved = useRef(false);

  const hideHoverElement = () => {
    setActiveElement(false);
  };

  const onMouseMove = (e) => {
    //
    if (e.target.tagName !== "svg") {
      const pathId = e.target.getAttribute("id");
      if (isAnAnatomicSite(pathId)) {
        const x = e.clientX;
        const y = e.clientY;
        styleActivePath(pathId, showHierarchy, mapContext);

        const hierarchy = !showHierarchy
          ? []
          : getHierarchy(pathId, { x, y }, lateralityData, egztData);
        styleHierarchy(hierarchy, mapContext);
        //
        setActiveElement(e.target);
        const egz = getEGZInfo(pathId, { x, y }, lateralityData, egztData);
        setActiveEGZ(egz);
        setActivePathId(pathId);
        setInnerLayers(hierarchy);
      }
    }
    if (mapContext === "pin_drag") {
      const svgCoords = transformSVGCoords({ x: e.clientX, y: e.clientY });
      ele.setAttribute("x", svgCoords.x);
      ele.setAttribute("y", svgCoords.y);
      ele.style.touchAction = "none";
      ele.style.pointerEvents = "none";
      const pathElement = document.elementFromPoint(e.clientX, e.clientY);
      ele.style.touchAction = "all";
      ele.style.pointerEvents = "auto";
      const pathId = pathElement.getAttribute("id");
      if (isAnAnatomicSite(pathId)) {
        document.body.style.cursor = "grabbing";
        styleActivePath(pathId, showHierarchy, mapContext);
      } else {
        if (isSeaAllowed.current) {
          document.body.style.cursor = "grabbing";
        } else {
          document.body.style.cursor = "not-allowed";
        }
      }
    } else if (mapContext === "region_drag") {
      ele.style.touchAction = "none";
      ele.style.pointerEvents = "none";
      const pathElement = document.elementFromPoint(e.clientX, e.clientY);
      ele.style.touchAction = "all";
      ele.style.pointerEvents = "auto";
      if (pathElement) {
        const pathId = pathElement.getAttribute("id");
        removeOldStyle(prevEleStyle.current);
        const svgCoords = transformSVGCoords({
          x: e.clientX,
          y: e.clientY,
        });
        ele.setAttribute("x", svgCoords.x);
        ele.setAttribute("y", svgCoords.y);
        if (isAnAnatomicSite(pathId)) {
          prevEleStyle.current.el = pathElement;
          prevEleStyle.current.opacity = pathElement.style.opacity;
          // prevEleStyle.current.fill = pathElement.getAttribute("fill");
          pathElement.setAttribute("fill", restoreInfo.current.fill);
          pathElement.style.opacity = restoreInfo.current.opacity;
          document.body.style.cursor = "grabbing";
        } else {
          if (isSeaAllowed.current) {
            document.body.style.cursor = "grabbing";
          } else {
            document.body.style.cursor = "not-allowed";
          }
        }
      }
    }

    if (
      (mapContext === "pin_select" || mapContext === "region_select") &&
      ele &&
      isMousePressed.current
    ) {
      moveCbCount.current = moveCbCount.current + 1;
      if (moveCbCount.current > 1) {
        dispatch(
          setMapContext(
            mapContext === "pin_select" ? "pin_drag" : "region_drag"
          )
        );
      }
    }
  };

  const onRestoreAfterDrag = (failed = false) => {
    dispatch(
      setMapContext(mapContext === "pin_drag" ? "pin_select" : "region_select")
    );
    if (failed) {
      ele.setAttribute("x", restoreInfo.current.x);
      ele.setAttribute("y", restoreInfo.current.y);
      if (mapContext === "region_drag") {
        document
          .getElementById(restoreInfo.current.pathId)
          .setAttribute("fill", restoreInfo.current.fill);
        document.getElementById(restoreInfo.current.pathId).style.opacity =
          restoreInfo.current.opacity;
      }
    }

    removeOldStyle(prevEleStyle.current);
    prevEleStyle.current = {
      el: null,
      opacity: null,
      fill: null,
    };
    document.body.style.cursor = "auto";
    isSeaAllowed.current = false;
    restoreInfo.current = initalRestore;
  };

  const onMouseLeave = (e) => {
    setActivePathId(null);
    setInnerLayers([]);
    setActiveElement(null);
    document.querySelector(".active-path-x")?.classList.remove("active-path-x");
    styleHierarchy([], mapContext);
    styleActivePath(null, false, mapContext);
  };

  const onSelectContextMenuClose = useCallback(
    (e) => {
      const id = parseMarkerToGetID(e.target);
      if (id) {
        if (id === selectedItemId) {
        } else {
          dispatch(setSelectedItemId(id));
        }
      } else {
        dispatch(setSelectedItemId(null));
      }
    },
    [selectedItemId, dispatch]
  );

  const onDragFinish = (e) => {
    switch (e.type) {
      case "touchend":
        if (ele) {
          ele.style.pointerEvents = "none";
          ele.style.touchAction = "none";
          const targetElement = document.elementFromPoint(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
          );
          // ele.style.pointerEvents = null;
          // ele.style.touchAction = null;
          ele.style.cursor = null;
          if (targetElement) {
            const pathId = targetElement.getAttribute("id");
            const itemId = selectedItemId;

            const coords = {
              x: e.changedTouches[0].clientX,
              y: e.changedTouches[0].clientY,
            };
            const isAnatomicSite = isAnAnatomicSite(pathId);
            let inf = { egz: {}, names: {} };
            let layerInfo = {};
            let hierarchy = [];
            let show = isAnatomicSite;
            const svgCoords = transformSVGCoords(coords);
            if (isSeaAllowed.current) {
            }

            let tempData = {
              pathId,
              coords: {
                absCoords: coords,
                svgCoords: {
                  x: svgCoords.x,
                  y: svgCoords.y,
                },
              },
              isAnatomicSite,
              egz: inf.egz,
              names: inf.names,
              hierarchy,
              layerInfo,
              show,
            };

            if (isAnatomicSite) {
              inf = getEGZInfo(pathId, coords, lateralityData, egztData);
              hierarchy = getHierarchy(
                pathId,
                coords,
                lateralityData,
                egztData
              );
              layerInfo = fetchHmap(pathId, coords);
              tempData = {
                ...tempData,
                egz: inf.egz,
                names: inf.names,
                hierarchy,
                layerInfo,
              };

              dispatch(
                updateItem({
                  itemId: itemId,
                  data: tempData,
                  spread: true,
                })
              );
            } else {
              if (isSeaAllowed.current) {
                dispatch(
                  updateItem({
                    itemId: itemId,
                    data: tempData,
                    spread: true,
                  })
                );
              } else {
                return onRestoreAfterDrag(true);
              }
            }
          }
        }
        return onRestoreAfterDrag();
      case "mouseup":
        if (ele) {
          ele.style.pointerEvents = "none";
          ele.style.touchAction = "none";
          const targetElement = document.elementFromPoint(e.clientX, e.clientY);
          // ele.style.pointerEvents = null;
          // ele.style.touchAction = null;
          ele.style.cursor = null;
          if (targetElement) {
            const pathId = targetElement.getAttribute("id");
            const itemId = selectedItemId;
            const coords = {
              x: e.clientX,
              y: e.clientY,
            };
            const isAnatomicSite = isAnAnatomicSite(pathId);
            let inf = { egz: {}, names: {} };
            let layerInfo = {};
            let hierarchy = [];
            let show = isAnatomicSite;
            const svgCoords = transformSVGCoords(coords);
            if (isSeaAllowed.current) {
            }

            let tempData = {
              pathId,
              coords: {
                absCoords: coords,
                svgCoords: {
                  x: svgCoords.x,
                  y: svgCoords.y,
                },
              },
              isAnatomicSite,
              egz: inf.egz,
              names: inf.names,
              hierarchy,
              layerInfo,
              show,
            };

            if (isAnatomicSite) {
              inf = getEGZInfo(pathId, coords, lateralityData, egztData);
              hierarchy = getHierarchy(
                pathId,
                coords,
                lateralityData,
                egztData
              );
              layerInfo = fetchHmap(pathId, coords);
              tempData = {
                ...tempData,
                egz: inf.egz,
                names: inf.names,
                hierarchy,
                layerInfo,
              };
              dispatch(
                updateItem({
                  itemId: itemId,
                  data: tempData,
                  spread: true,
                })
              );
            } else {
              if (isSeaAllowed.current) {
                dispatch(
                  updateItem({
                    itemId: itemId,
                    data: tempData,
                    spread: true,
                  })
                );
              } else {
                return onRestoreAfterDrag(true);
              }
            }
          }
        }
        return onRestoreAfterDrag();
      default:
        break;
    }
  };

  //context menu for each svg item

  const onMouseUp = (e) => {
    isMousePressed.current = false;
    moveCbCount.current = 0;
    if (e.button === 2) return;
    if (mapContext === "pin_select" || mapContext === "region_select") {
      return;
    } else if (mapContext === "pin_drag" || mapContext === "region_drag") {
      onDragFinish(e);
    } else {
      const pathId = e.target.getAttribute("id");

      const coords = {
        x: e.clientX,
        y: e.clientY,
      };
      const isAnatomicSite = isAnAnatomicSite(pathId);
      let inf = { egz: {}, names: {} };
      let layerInfo = {};
      let hierarchy = [];
      //  let pathIds = [];

      if (isAnatomicSite) {
        //  pathIds = fetchIds(coords);
        inf = getEGZInfo(pathId, coords, lateralityData, egztData);
        hierarchy = getHierarchy(pathId, coords, lateralityData, egztData);
        layerInfo = fetchHmap(pathId, coords);
      }

      dispatch(
        onAddItem({
          data: {
            pathId,
            coords,
            isAnatomicSite,
            egz: inf.egz,
            names: inf.names,
            layerInfo,
            hierarchy,
            uiData,
          },
        })
      );
    }
  };

  const onMouseDown = (e) => {
    isMousePressed.current = true;
    if (mapContext === "pin_select") {
      const id = parseMarkerToGetID(e.target);
      // isSeaAllowed.current = checkIsSeaAllowed(id)
      isSeaAllowed.current = true;
      if (id) {
        // if (id !== selectedItemId) {
        dispatch(setSelectedItemId(id));
        dispatch(
          setActiveItem({
            itemId: id,
            activeList: itemsMap[id]["listType"],
          })
        );
        const tg = document.getElementById(id);
        restoreInfo.current = {
          x: tg.getAttribute("x"),
          y: tg.getAttribute("y"),
        };
        // }
      }
    } else if (mapContext === "region_select") {
      const dInfo = parseRegionMarkerToDistributionInfo(e.target);
      if (dInfo) {
        isSeaAllowed.current = dInfo.isSeaAllowed;
        if (dInfo) {
          restoreInfo.current = dInfo;
          const path = document.getElementById(dInfo.pathId);
          const tg = document.getElementById(dInfo.id);
          restoreInfo.current = {
            ...restoreInfo.current,
            x: tg.getAttribute("x"),
            y: tg.getAttribute("y"),
          };
          prevEleStyle.current = {
            el: path,
            opacity: null,
            fill: null,
          };
          dispatch(setSelectedItemId(dInfo.id));
          dispatch(
            setActiveItem({
              itemId: dInfo.id,
              activeList: itemsMap[dInfo.id]["listType"],
            })
          );
        }
      }
    }
  };

  const handleOpenMohrsMap = (ele) => {
    let node = ele;
    while (node && (!node.getAttribute("id") || node.tagName !== "g")) {
      node = node.parentNode;
    }

    if (!node) return;
    while (node) {
      if (
        node.getAttribute("id").includes("HMAPseg") &&
        document.getElementById(
          `Dseg${node.getAttribute("id").substring(7)}`
        ) != null
      )
        break;
      else if (
        node.getAttribute("id").includes("HGseg") &&
        document.getElementById(
          `Gseg${node.getAttribute("id").substring(5)}`
        ) != null
      )
        break;
      else if (
        node.getAttribute("id").includes("HMAP") &&
        document.getElementById(`D${node.getAttribute("id").substring(4)}`) !=
        null
      )
        break;
      else node = node.parentNode;
    }

    const hmap = node.getAttribute("id");
    let diagramId = hmap.replace("HMAP", "D");
    diagramId = diagramId.replace("HMAPseg", "Dseg");
    diagramId = diagramId.replace("HGseg", "Gseg");
    let dgram = document.getElementById(diagramId);
    const dArray = [];
    while (dgram.getAttribute("id").substring(0, 2) !== "D-") {
      dArray.push(dgram.getAttribute("id"));
      dgram = dgram.parentNode;
    }
    dArray.push(dgram.getAttribute("id"));
    setDiagram(dArray);

    setContextMenuAnchor(ele);
  };

  const onContextMenu = (e) => {
    const pathId = e.target.getAttribute("id");
    const isAnatomicSite = isAnAnatomicSite(pathId);
    if (isAnatomicSite) {
      e.preventDefault();
      handleOpenMohrsMap(e.target);
    }
  };

  const onTouchStart = (e) => {
    isTouchMoved.current = true;
    // isTouchMoved.current = false;
    mohrsMapElement.current = null;
    longPresstimeout.current = null;
    touchCoordInfo.current = null;
    isLongPress.current = false;
    if (e.touches.length > 1) {
      return;
    } else {
      e.stopPropagation();

      if (mapContext === "pin_select") {
        // isTouchMoved.current = true;

        const id = parseMarkerToGetID(e.target);
        isSeaAllowed.current = true;
        if (id) {
          dispatch(setSelectedItemId(id));
          const tg = document.getElementById(id);
          restoreInfo.current = {
            x: tg.getAttribute("x"),
            y: tg.getAttribute("y"),
          };
        }
      } else if (mapContext === "region_select") {
        const dInfo = parseRegionMarkerToDistributionInfo(e.target);
        if (dInfo) {
          isSeaAllowed.current = dInfo.isSeaAllowed;
          if (dInfo) {
            restoreInfo.current = dInfo;
            const path = document.getElementById(dInfo.pathId);
            const tg = document.getElementById(dInfo.id);
            restoreInfo.current = {
              ...restoreInfo.current,
              x: tg.getAttribute("x"),
              y: tg.getAttribute("y"),
            };
            prevEleStyle.current = {
              el: path,
              opacity: null,
              fill: null,
            };
            dispatch(setSelectedItemId(dInfo.id));
          }
        }
      } else {
        const pathId = e.target.getAttribute("id");
        const isAnatomicSite = isAnAnatomicSite(pathId);
        if (!isAnatomicSite) {
          mohrsMapElement.current = null;
        } else {
          mohrsMapElement.current = e.target;
        }
        e.preventDefault();
        e.stopPropagation();
        touchCoordInfo.current = {
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
          pageX: e.touches[0].pageX,
          pageY: e.touches[0].pageY,
        };
        longPresstimeout.current = setTimeout(() => {
          isLongPress.current = true;
        }, 500);
      }
    }
    // e.stopPropagation()
  };

  const onTouchEnd = (e) => {
    // styleActivePath(null, false, mapContext);
    document.querySelector(".active-path-x")?.classList.remove("active-path-x");
    isTouchMoved.current = false;
    if (longPresstimeout.current) clearTimeout(longPresstimeout.current);
    // e.stopPropagation()
    e.preventDefault();
    setActivePathId(null);
    setInnerLayers([]);
    setActiveElement(null);
    styleHierarchy([], mapContext);
    styleActivePath(null, false, mapContext);
    moveCbCount.current = 0;
    if (e.touches.length > 1) return;
    else {
      e.stopPropagation();
      if (mapContext === "pin_select" || mapContext === "region_select") {
        return;
      } else if (mapContext === "pin_drag" || mapContext === "region_drag") {
        onDragFinish(e);
      } else {
        const pathId = e.target.getAttribute("id");
        if (isTouchMoved.current) {
          return;
        }
        if (isLongPress.current) {
          handleOpenMohrsMap(e.target);
        } else {
          const coords = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
          };
          const isAnatomicSite = isAnAnatomicSite(pathId);
          let inf = { egz: {}, names: {} };
          let layerInfo = {};
          let hierarchy = [];
          if (isAnatomicSite) {
            inf = getEGZInfo(pathId, coords, lateralityData, egztData);
            hierarchy = getHierarchy(pathId, coords, lateralityData, egztData);
            layerInfo = fetchHmap(pathId, coords);
          }
          dispatch(
            onAddItem({
              data: {
                pathId,
                coords,
                isAnatomicSite,
                egz: inf.egz,
                names: inf.names,
                layerInfo,
                hierarchy,
                uiData,
              },
            })
          );
        }
      }

      // }
    }
  };

  const onTouchMove = (e) => {
    // isTouchMoved.current = false;
    // isTouchMoved.current = true;
    // if (longPresstimeout.current) clearTimeout(longPresstimeout.current);

    if (e.touches.length > 1) return;
    else {
      e.stopPropagation();

      if (e.target.tagName !== "svg") {
        e.target.style.touchAction = "none";
        const element = document.elementFromPoint(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
        const pathId = element.getAttribute("id");
        e.target.style.touchAction = "all";

        // const pathId = e.target.getAttribute("id");

        if (isAnAnatomicSite(pathId)) {
          const x = e.touches[0].clientX;
          const y = e.touches[0].clientY;
          styleActivePath(pathId, showHierarchy, mapContext);

          const hierarchy = !showHierarchy
            ? []
            : getHierarchy(pathId, { x, y }, lateralityData, egztData);
          styleHierarchy(hierarchy, mapContext);
          //
          setActiveElement(e.target);
          const egz = getEGZInfo(pathId, { x, y }, lateralityData, egztData);

          setActiveEGZ(egz);
          setActivePathId(pathId);
          setInnerLayers(hierarchy);
        }
      }
      if (mapContext === "pin_drag") {
        const svgCoords = transformSVGCoords({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
        ele.setAttribute("x", svgCoords.x);
        ele.setAttribute("y", svgCoords.y);
        ele.style.touchAction = "none";
        ele.style.pointerEvents = "none";
        const pathElement = document.elementFromPoint(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
        ele.style.touchAction = "all";
        ele.style.pointerEvents = "auto";
        const pathId = pathElement.getAttribute("id");
        if (isAnAnatomicSite(pathId)) {
          document.body.style.cursor = "grabbing";
          styleActivePath(pathId, showHierarchy, mapContext);
        } else {
          if (isSeaAllowed.current) {
            document.body.style.cursor = "grabbing";
          } else {
            document.body.style.cursor = "not-allowed";
          }
        }
      } else if (mapContext === "region_drag") {
        ele.style.touchAction = "none";
        ele.style.pointerEvents = "none";
        const pathElement = document.elementFromPoint(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
        ele.style.touchAction = "all";
        ele.style.pointerEvents = "auto";
        if (pathElement) {
          const pathId = pathElement.getAttribute("id");
          removeOldStyle(prevEleStyle.current);
          const svgCoords = transformSVGCoords({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          });
          ele.setAttribute("x", svgCoords.x);
          ele.setAttribute("y", svgCoords.y);
          if (isAnAnatomicSite(pathId)) {
            prevEleStyle.current.el = pathElement;
            prevEleStyle.current.opacity = pathElement.style.opacity;
            prevEleStyle.current.fill = pathElement.getAttribute("fill");
            pathElement.setAttribute("fill", restoreInfo.current.fill);
            pathElement.style.opacity = restoreInfo.current.opacity;
            document.body.style.cursor = "grabbing";
          } else {
            if (isSeaAllowed.current) {
              document.body.style.cursor = "grabbing";
            } else {
              document.body.style.cursor = "not-allowed";
            }
          }
        }
      }

      if (
        (mapContext === "pin_select" || mapContext === "region_select") &&
        ele &&
        isTouchMoved.current
      ) {
        moveCbCount.current = moveCbCount.current + 1;

        if (moveCbCount.current > 1) {
          dispatch(
            setMapContext(
              mapContext === "pin_select" ? "pin_drag" : "region_drag"
            )
          );
        }
      }
    }
  };

  const onTouchCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (longPresstimeout.current) clearTimeout(longPresstimeout.current);

    setActivePathId(null);
    setInnerLayers([]);
    setActiveElement(null);
    document.querySelector(".active-path-x")?.classList.remove("active-path-x");
    styleHierarchy([], mapContext);
    styleActivePath(null, false, mapContext);
  };

  // for the pdf creation of the proof of concept
  const handleMohrsMap = (id) => {
    // exportPDFWithMap(id, false);
    downloadMohrsMap(id);
  };

  useEffect(() => {
    if (selectedItemId) {
      if (mapContext === "pin_select") {
        setTimeout(() => {
          setAnchorEle(document.getElementById(selectedItemId));
        }, 0);
      } else if (mapContext === "region_select") {
        setTimeout(() => {
          setAnchorEle(document.getElementById(selectedItemId));
        }, 0);
      } else {
        setAnchorEle(null);
      }
    } else {
      removePin();
    }
  }, [mapContext, selectedItemId]);

  return (
    <>
      <Popover
        anchorEl={contextMenuAnchor}
        open={Boolean(contextMenuAnchor)}
        onClose={(e) => setContextMenuAnchor(null)}>
        {diagram.map((d) => {
          return (
            <div
              key={d}
              onClick={() => {
                handleMohrsMap(d);
              }}
              id={`img-${d}}`}
              style={{
                display: "flex",
                padding: "10px",
                borderBottom: "1px solid balck",
                backgroundColor: "lightgray",
                cursor: "pointer",
                alignItems: "center",
              }}>
              <div>
                {uiData.transtext_print.tr_text} Mohs{" "}
                {uiData.transtext_Map.tr_text}
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  backgroundColor: "white",
                  padding: "5px",
                }}
              // id="img1"
              >
                <SVGRegionRenderer
                  gID={d}
                  height={90}
                  width={90}
                // tr={320} ->removed this line so the ratio is now maintained and not broken by this value
                />
              </div>
            </div>
          );
        })}
      </Popover>

      <SVGHoverlay
        activePathId={activePathId}
        activeEGZ={activeEGZ}
        innerLayers={innerLayers}
        showHierarchy={showHierarchy}
        activeHoverElement={activeElement}
        selectedItemId={selectedItemId}
        selectedAnchorEl={anchorEle}
        sns={sns}
        hideToolTip={hideHoverElement}
        pinListSettings={pinListSettings}
      />

      {useMemo(() => {
        return (
          Boolean(anchorEle) &&
          Boolean(selectedItemId) && (
            <ClickAwayListener onClickAway={onSelectContextMenuClose}>
              <Popper
                open={Boolean(anchorEle)}
                anchorEl={anchorEle}
                disablePortal={false}
                // onClose={onSelectContextMenuClose}
                placement='bottom-start'
                transition
                // modifiers={{
                //   arrow: {
                //     enabled: true,
                //   },
                //   offset: {
                //     enabled: true,
                //     offset: "-5,10",
                //   },
                // }}
                style={{
                  zIndex: "1000",
                }}>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <ContextMenu itemId={selectedItemId} />
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </ClickAwayListener>
          )
        );
      }, [anchorEle, selectedItemId, onSelectContextMenuClose])}

      <LoadSVG
        url={svgUrl}
        svgProps={{
          onMouseMove, // For dragging markers and region in desktop
          onMouseLeave, // For removing ccl
          onMouseUp, // For adding markers and region and finishing dragging  in desktop
          onMouseDown, // For starting dragging markers and region in desktop
          onContextMenu, // On opening right click context menu
          onTouchStart,
          onTouchEnd,
          onTouchMove,
          onTouchCancel,
          style: containerStyle,
        }}
      />
    </>
  );
}

export default AnatomyMapper;
