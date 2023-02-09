import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Slider,
  Tooltip,
} from "@material-ui/core";
import {
  CallMade,
  CheckBoxOutlineBlank,
  Edit,
  FiberSmartRecordOutlined,
  PanoramaHorizontalOutlined,
  PanTool,
  RadioButtonUncheckedOutlined,
  SelectAll,
  TextFields,
  Timeline,
} from "@material-ui/icons";
import ReplayIcon from "@material-ui/icons/Replay";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import transparentBg from "../../assets/transparent-bg.png";
import { TranslationContext } from "../../contexts/translation";
import { setMapContext } from "../../store/slices/app";
import { SketchField, Tools } from "../CustomMap";
import QuickZoom from "./QuickZoom";
import OutsideClickHandler from "react-outside-click-handler";
import { onShow, removeItem, setUndoContext } from "../../store/slices/lists";
import { changeMapSettings } from "../../store/slices/userSettings";
import { ConfirmationModal } from "../PatientInfoAccordion";
import { useCallback } from "react";
import { LIST_TYPES } from "../../constants/listsConstants";

const { innerHeight: height } = window;

const useStyles = makeStyles((theme) => ({
  svgMapContainer: {
    "&::-webkit-scrollbar-track": {
      width: "0",
      height: "0",
    },
    width: "100%",
    height: "100%",
    position: "sticky",
    borderRadius: 10,
    // overflow: "hidden",
    border: "1px solid #000",
    background: "#ccc",
    maxHeight: height - 50,

    "@media (orientation: landscape)": {
      maxHeight: height - 50,
    },

    "@media (max-width: 1024px) and (orientation: portrait)": {
      width: "100vw",
    },
    "@media (orientation: portrait)": {
      height: "40vh",
    },
  },
  box: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: `100%`,
    // padding: `${canvasPadding}px`,
    background: "#ccc",

    zIndex: -999,
  },
  sketchField: {
    zIndex: 3,
    width: "100%",
    borderRadius: 10,
  },
  sketchTools: {
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 4,
    display: "flex",
    alignItems: "center",
  },

  panToolContainer: {
    position: "absolute",
    top: 140,
    // left: 12,
    zIndex: 4,
    display: "flex",
    cursor: "pointer",
  },

  clickParentTargets: {
    zIndex: 4,
    position: "absolute",
    top: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "calc(100% - 80px)",
    "& > .title": {
      marginRight: "8px",
    },
    "& > .chips": {},
  },
  colorPicker: {
    padding: 8,
    "&>input": {
      display: "block",
      width: 100,
    },
  },
  lineWidthSlider: {
    // display: 'flex',
    width: "100px",
    marginRight: 16,
  },
  colorSelector: {
    display: "flex",
    "&>div": {
      display: "grid",
      marginRight: 8,
      marginTop: 8,
    },
    "& label": {
      width: 30,
      cursor: "pointer",
      height: 30,
      borderRadius: "50%",
      border: "3px solid #000",
      marginBottom: 8,
      boxShadow: "0 2px 2px rgba(0,0,0,.2)",
    },
  },
  fontToolBar: {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "5",
    padding: 8,
    borderRadius: 4,
    border: "1px solid #eee",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  textContainer: {
    padding: "20px",
    margin: "1px",
  },
  fontfamilyContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    justifyContent: "space-between",
  },
  fontSizeContainer: {
    maxWidth: "60px",
    margin: "10px",
  },
  testColorPicker: {
    marginLeft: "10px",
  },
  textColorBox: {
    width: "30px",
    border: "3px solid #000",
    cursor: "pointer",
    height: "30px",
    boxShadow: "0 2px 2px rgba(0,0,0,.2)",
    borderRadius: "50%",
    marginBottom: "8px",
  },
  marginpopuptext: {
    margin: "10px",
  },
  buttonoftextpopup: {
    marginRight: "3px",
  },
  zoomToolContainer: {
    position: "absolute",
    top: "250px",
    left: "4px",
    zIndex: "4",
    "@media only screen and (min-width: 480px) and (max-width: 900px) and (orientation: landscape)":
      {
        top: "83%",
      },
  },
}));

const useShapesTiles = makeStyles((theme) => ({}));
let fontsizearr = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];
const ShapesTiles = ({
  shapes = [],
  selectedToolId,
  onClickShapeTile = () => {},
}) => {
  const classes = useShapesTiles();
  return (
    <div className={classes.container} style={{ cursor: "pointer" }}>
      {shapes.map(({ id, label, icon }, index) => {
        return (
          <Tooltip
            title={label}
            onClick={() => {}}
            style={{ cursor: "pointer" }}
          >
            <IconButton
              key={id}
              onClick={() => {
                onClickShapeTile(id, index);
              }}
              color={id === selectedToolId ? "primary" : "default"}
            >
              {icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </div>
  );
};

const workOnSVGMapWithMapContext = {
  list: true,
  drawing: false,
  pin_select: true,
  region_select: true,
  pin_drag: true,
  region_drag: true,
};

const SVGMapper = React.forwardRef((props, ref) => {
  const classes = useStyles();
  // const sketchRef = useRef();
  const [popOverRef, setPopOverRef] = useState(null);
  const mapContext = useSelector((state) => state.app.mapContext);
  const workOnSVG = workOnSVGMapWithMapContext[mapContext];
  const dispatch = useDispatch();
  const [popOverFillRef, setPopOverFillRef] = useState(null);
  const [openQuickZoom, setOpenQuickZoom] = useState(false);
  const [popOverShape, setPopoverShape] = useState(null);
  const [defaultShapeIndex, setDefaultShapeIndex] = useState(-1);
  const [isShapeSelected, setIsShapeSelected] = useState(false);
  const [color, setColor] = useState({ r: 200, g: 0, b: 255, a: 1 });
  const { uiData } = useContext(TranslationContext);

  const items = useSelector((state) => state.listStore.itemsMap);

  const displayOral = () => {
    for (let x in items) {
      if (items[x].layerInfo.HG_IDs) {
        items[x].layerInfo.HG_IDs.forEach((y) => {
          if (y === "HG-Oral_Anatomy") {
            const itemId = items[x].id;
            if (items[x].listType !== LIST_TYPES.painted_distribution.name) {
              const AnatomicName = true;
              dispatch(onShow({ AnatomicName, itemId }));
            }
          }
        });
      }
    }
  };

  const [lineWidth, setLineWidth] = useState(1);
  const [fillColor, setFillColor] = useState({ r: 200, g: 0, b: 255, a: 0 });
  const [selectedTool, setSelectedTool] = useState(Tools.DefaultTool);

  const [rtextColor, setrTextColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [btextColor, setbTextColor] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });

  useEffect(() => {
    if (workOnSVG) {
      if (selectedTool !== Tools.DefaultTool) {
        setSelectedTool(Tools.DefaultTool);
      }
    }
  }, [workOnSVG, selectedTool]);

  const [fontFamily, setFontFamily] = useState("monospace");
  const [textBold, setTextBold] = useState(false);
  const [textSize, setTextSize] = useState("20");
  const [textItalic, setTextItalic] = useState(false);
  const [textUnderLine, setTextUnderLine] = useState(false);
  const [popOverText, setPopOverText] = useState(null);
  const [popOverTextColor, setPopOverTextColor] = useState(null);
  //to display these in the Sample text
  const [StextBold, setSTextBold] = useState("initial");
  const [StextItalic, setSTextItalic] = useState("normal");
  const [StextUnderLine, setSTextUnderLine] = useState("none");
  const [popOverTextBackgroundColor, setPopOverTextBackgroundColor] =
    useState(null);
  const TextTiles = () => {
    const classes = useStyles();
    return (
      uiData && (
        <div className={classes.textContainer}>
          <FormControl sx={{ m: 1, minWidth: 120 }} style={{ minWidth: 120 }}>
            <p
              style={{
                fontFamily: fontFamily,
                color: `rgba(${rtextColor.r}, ${rtextColor.g}, ${rtextColor.b}, ${rtextColor.a})`,
                backgroundColor: `rgba(${btextColor.r}, ${btextColor.g}, ${btextColor.b}, ${btextColor.a})`,
                fontSize: textSize,
                fontWeight: StextBold,
                textDecoration: StextUnderLine,
                fontStyle: StextItalic,
                margin: "10px",
              }}
            >
              {uiData.drawingTools_Text_SampleText?.tr_text}
            </p>

            <Select
              className={classes.marginpopuptext}
              id="demo-simple-select-helper"
              value={fontFamily}
              label="Font Family"
              style={{ fontFamily: fontFamily }}
              onChange={(e) => {
                setFontFamily(e.target.value);
              }}
            >
              <MenuItem style={{ fontFamily: "ui-rounded" }} value="ui-rounded">
                <em>ui-rounded</em>
              </MenuItem>
              <MenuItem style={{ fontFamily: "monospace" }} value="monospace">
                Monospace
              </MenuItem>
              <MenuItem style={{ fontFamily: "cursive" }} value="cursive">
                Cursive
              </MenuItem>
              <MenuItem style={{ fontFamily: "sans-serif" }} value="sans-serif">
                sans-serif
              </MenuItem>
            </Select>

            <Select
              labelId="outlined-number1"
              className={classes.marginpopuptext}
              id="outlined-number"
              label="Font Size"
              type="text"
              defaultValue="20"
              value={textSize}
              style={{ maxHeight: "20px" }}
              onChange={(e, newValue) => {
                const { value } = e.target;
                setTextSize(value);
              }}
              PaperProps={{
                style: {
                  maxHeight: 20 * 4.5,
                  width: "20ch",
                },
              }}
            >
              {fontsizearr.map((i) => {
                return (
                  <MenuItem value={i}>
                    <em>{i}</em>
                  </MenuItem>
                );
              })}
            </Select>

            <div
              style={{ display: "flex", flexDirection: "row" }}
              aria-labelledby="groupLabel"
            >
              <div
                className={classes.textColorBox}
                style={{
                  backgroundColor: `rgba(${rtextColor.r}, ${rtextColor.g}, ${rtextColor.b}, ${rtextColor.a})`,
                  margin: "10px",
                }}
                onClick={(e) => {
                  setPopOverTextColor(e.currentTarget);
                }}
              ></div>

              <div
                className={classes.textColorBox}
                style={{
                  backgroundColor: `rgba(${btextColor.r}, ${btextColor.g}, ${btextColor.b}, ${btextColor.a})`,
                  margin: "10px",
                }}
                onClick={(e) => {
                  setPopOverTextBackgroundColor(e.currentTarget);
                }}
              ></div>
            </div>

            <div className={classes.marginpopuptext}>
              <Button
                style={{ fontWeight: "bolder" }}
                className={classes.buttonoftextpopup}
                variant={textBold ? "contained" : "outlined"}
                size="small"
                color="primary"
                onClick={(e) => {
                  if (!textBold) {
                    setSTextBold("bolder");
                  } else {
                    setSTextBold("initial");
                  }
                  setTextBold(!textBold);
                }}
              >
                B
              </Button>
              <Button
                style={{ fontStyle: "italic" }}
                className={classes.buttonoftextpopup}
                variant={textItalic ? "contained" : "outlined"}
                size="small"
                color="primary"
                onClick={() => {
                  if (!textItalic) {
                    setSTextItalic("italic");
                  } else {
                    setSTextItalic("initial");
                  }
                  setTextItalic(!textItalic);
                }}
              >
                I
              </Button>
              <Button
                style={{ textDecoration: "underline" }}
                className={classes.buttonoftextpopup}
                variant={textUnderLine ? "contained" : "outlined"}
                size="small"
                color="primary"
                onClick={() => {
                  if (!textUnderLine) {
                    setSTextUnderLine("underline");
                  } else {
                    setSTextUnderLine("initial");
                  }
                  setTextUnderLine(!textUnderLine);
                }}
              >
                U
              </Button>
            </div>

            <Button
              className={classes.marginpopuptext}
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                handleToolClick(Tools.RectangleLabel);
              }}
            >
              {uiData.drawingTools_TextLabels?.tr_text}
            </Button>
          </FormControl>
        </div>
      )
    );
  };

  function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;
    //
    return "#" + r + g + b;
  }
  const onClickQuickZoomTile = (id = "") => {
    setOpenQuickZoom(false);
    if (id === "G-Oral_Anatomy") {
      // props.isOralVisible = true;
      dispatch(
        changeMapSettings({
          name: "isOralAnatomyVisible",
          value: true,
        })
      );
      displayOral();
      // alert("Please check 'Show Oral Anatomy'");
      // setTimeout(()=>{
      const svgPortion = document.getElementById(id);
      if (svgPortion) {
        window.window.sketchRef.panAndZoomToARegion(svgPortion);
      }
      // },200);
    } else {
      if (id === "anogenital") {
        let anid = false;
        let id = "";
        if (props.hideOpposite) {
          if (props.gender === "male") {
            id = "G-Male_Anatomy";
            anid = false;
          } else if (props.gender === "female") {
            id = "G-Female_Anatomy";
            anid = false;
          } else {
            anid = true;
          }
        } else {
          anid = true;
        }
        if (anid) {
          const region = document.getElementById("G-Male_Anatomy");
          const region2 = document.getElementById("G-Female_Anatomy");

          window.window.sketchRef.panAndZoomToASetOfRegion([region, region2]);
        } else {
          const svgPortion = document.getElementById(id);
          if (svgPortion) {
            window.window.sketchRef.panAndZoomToARegion(svgPortion);
          }
        }
      } else {
        const svgPortion = document.getElementById(id);
        if (svgPortion) {
          window.window.sketchRef.panAndZoomToARegion(svgPortion);
        }
      }
    }
  };

  const handleToolClick = (toolId, isShape = false, shapeIndex = -1) => {
    if (selectedTool === toolId) {
      setSelectedTool(Tools.DefaultTool);
      dispatch(setMapContext("list"));
      return;
    }
    setSelectedTool(toolId);
    dispatch(setMapContext("drawing"));
    setIsShapeSelected(isShape);
    setDefaultShapeIndex(shapeIndex);
    if (toolId === Tools.Arrow) setLineWidth(4);
  };
  // const onHoverAnatomyMapper = (pathObj) => {
  //   setAnatomyMapper({ ...anatomyMapper, ...pathObj });
  // };

  const [shapes, setShapes] = useState([]);
  const [tools, setTools] = useState([]);
  const undoContext = useSelector((state) => state.listStore.undoContext);

  useEffect(() => {
    if (!uiData) return;
    setShapes([
      {
        icon: <Timeline />,
        label: uiData.drawingTools_Line?.tr_text,
        id: Tools.Line,
      },
      {
        icon: <CheckBoxOutlineBlank />,
        label: uiData.drawingTools_Rectangle?.tr_text,
        id: Tools.Rectangle,
      },
      {
        icon: <RadioButtonUncheckedOutlined />,
        label: uiData.drawingTools_Circle?.tr_text,
        id: Tools.Circle,
      },
      {
        icon: <FiberSmartRecordOutlined />,
        label: uiData.drawingTools_Ellipse?.tr_text,
        id: Tools.Ellipse,
      },
    ]);
    setTools([
      {
        icon: <TextFields />,
        label: uiData.drawingTools_TextLabels?.tr_text,
        id: Tools.RectangleLabel,
      },
      {
        icon: <Edit />,
        label: uiData.drawingTools_Pencil?.tr_text,
        id: Tools.Pencil,
      },
      {
        icon: <CallMade />,
        label: uiData.drawingTools_Arrow?.tr_text,
        id: Tools.Arrow,
      },
      {
        icon: <SelectAll />,
        label: uiData.drawingTools_Select?.tr_text,
        id: Tools.Select,
      },
      // {
      //   icon: <UndoOutlined />,
      //   label: uiData.icon_QuickUndo_help?.tr_text,
      //   id: 'undo',
      // },
    ]);
  }, [uiData]);

  return (
    uiData && (
      <>
        <Popover
          open={popOverRef != null}
          anchorEl={popOverRef}
          onClose={() => setPopOverRef(null)}
        >
          <SketchPicker
            disableAlpha={true}
            color={color}
            onChangeComplete={(e) => setColor(e.rgb)}
          />
        </Popover>
        <Popover
          open={popOverFillRef != null}
          anchorEl={popOverFillRef}
          onClose={() => setPopOverFillRef(null)}
        >
          <SketchPicker
            disableAlpha={true}
            color={fillColor}
            onChangeComplete={(e) => setFillColor(e.rgb)}
          />
        </Popover>
        <Popover
          open={popOverShape != null}
          anchorEl={popOverShape}
          onClose={() => setPopoverShape(null)}
        >
          <ShapesTiles
            shapes={shapes}
            selectedToolId={selectedTool}
            onClickShapeTile={(toolid, index) => {
              handleToolClick(toolid, true, index);
            }}
          />
        </Popover>

        <Popover
          open={popOverText != null}
          anchorEl={popOverText}
          onClose={() => setPopOverText(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <TextTiles />
        </Popover>

        <Popover
          open={popOverTextColor != null}
          anchorEl={popOverText}
          onClose={() => setPopOverTextColor(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <SketchPicker
            disableAlpha={true}
            color={rtextColor}
            onChange={(e) => {
              setrTextColor(e.rgb);
            }}
          />
        </Popover>

        <Popover
          open={popOverTextBackgroundColor != null}
          anchorEl={popOverText}
          onClose={() => setPopOverTextBackgroundColor(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <SketchPicker
            disableAlpha={true}
            color={btextColor}
            onChange={(e) => {
              setbTextColor(e.rgb);
            }}
          />
        </Popover>

        <div className={classes.svgMapContainer}>
          <div
            className={classes.panToolContainer}
            onClick={() => handleToolClick(Tools.Pan)}
          >
            <Tooltip title={uiData.mapInteractionLabel_Pan?.tr_text}>
              <IconButton
                color={Tools.Pan === selectedTool ? "primary" : "default"}
              >
                <PanTool />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.zoomToolContainer}>
            <Tooltip
              title={uiData.mapInteractionLabel_QuickZoom?.tr_text}
              aria-label="Quick Zoom"
            >
              <IconButton
                onClick={() => setOpenQuickZoom(true)}
                color={openQuickZoom ? "primary" : "default"}
              >
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
          </div>
          <OutsideClickHandler
            onOutsideClick={() => {
              dispatch(
                setUndoContext({ navbar: undoContext.navbar, sketch: false })
              );
            }}
          >
            <div
              className={clsx(classes.sketchField, classes.box)}
              onMouseOver={() => {
                dispatch(
                  setUndoContext({ sketch: true, navbar: undoContext.navbar })
                );
              }}
            >
              <SketchField
                setUndoCanvas={props.setUndoCanvas}
                undoCanvas={props.undoCanvas}
                setQuickUndo={props.setQuickUndo}
                pinShape={props.pinShape}
                plotOnSea={props.plotOnSea}
                ref={(r) => {
                  if (r) {
                    window.window.sketchRef = r;
                  }
                }}
                tool={selectedTool}
                lineColor={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
                fillColor={`rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a})`}
                lineWidth={lineWidth}
                svg={props.svg}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                uiData={uiData}
                // anatomyMapper={anatomyMapper}
                // onHoverAnatomyMapper={onHoverAnatomyMapper}
                //text background color in rectanglelable
                btextColor={`rgba(${btextColor.r}, ${btextColor.g}, ${btextColor.b}, ${btextColor.a})`}
                //text color in rectanglelable
                rtextColor={RGBToHex(rtextColor.r, rtextColor.g, rtextColor.b)}
                textBold={textBold}
                textItalic={textItalic}
                textUnderLine={textUnderLine}
                fontFamily={fontFamily}
                textSize={textSize}
                workOnSVG={workOnSVG}
                mapContext={mapContext}
              />
            </div>
          </OutsideClickHandler>
          <div
            className={classes.sketchTools}
            style={{
              right: selectedTool !== "default-tool" ? "60px" : "5%",
            }}
          >
            <div
              className={classes.lineWidthSlider}
              style={{
                display: isShapeSelected ? "block" : "none",
              }}
            >
              <span
                style={{
                  padding: "0 14px",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <hr
                  style={{
                    height: 2 + lineWidth,
                    backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  }}
                />
              </span>
              <Slider
                defaultValue={1}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                min={1}
                max={10}
                value={lineWidth}
                onChange={(e, newValue) => setLineWidth(newValue)}
                valueLabelDisplay="auto"
              />
            </div>
            <div
              className={classes.colorSelector}
              style={{
                display: isShapeSelected ? "flex" : "none",
              }}
            >
              <Tooltip title="Stroke Color">
                <div>
                  <label
                    htmlFor={"color-picker"}
                    onClick={(e) => setPopOverRef(e.currentTarget)}
                    style={{
                      backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                    }}
                  ></label>
                </div>
              </Tooltip>
              <Tooltip title="Fill Color">
                <div>
                  <label
                    htmlFor={"fill-color-picker"}
                    style={{
                      background:
                        fillColor.a === 0
                          ? `url(${transparentBg})`
                          : `rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a})`,
                    }}
                    onClick={(e) => setPopOverFillRef(e.currentTarget)}
                  ></label>
                </div>
              </Tooltip>
            </div>

            <Tooltip
              title={uiData.drawingTools_Shapes?.tr_text}
              aria-label="Select Shape"
            >
              <IconButton
                onClick={(e) => {
                  setPopoverShape(e.currentTarget);
                }}
                color={!(defaultShapeIndex === -1) ? "primary" : "default"}
              >
                {!(defaultShapeIndex === -1) ? (
                  shapes[defaultShapeIndex].icon
                ) : (
                  <PanoramaHorizontalOutlined />
                )}
              </IconButton>
            </Tooltip>

            {tools.map((tool) => (
              <Tooltip title={tool.label} aria-label={tool.label} key={tool.id}>
                <IconButton
                  onClick={(e) => {
                    if (tool.id === "rectangle-label") {
                      setDefaultShapeIndex(-1);
                      if (selectedTool === tool.id) {
                        handleToolClick(tool.id);
                      } else {
                        setPopOverText(e.currentTarget);
                      }
                    } else {
                      if (tool.id === Tools.Arrow || tool.id === Tools.Pencil) {
                        handleToolClick(tool.id, true);
                      } else {
                        handleToolClick(tool.id);
                      }
                    }
                  }}
                  color={tool.id === selectedTool ? "primary" : "default"}
                >
                  {tool.icon}
                </IconButton>
              </Tooltip>
            ))}
            {props.quickUndo ? (
              <div
                onClick={() => props.setUndoCanvas(!props.undoCanvas)}
                style={{
                  cursor: "pointer",
                  border: "1px solid black",
                  marginTop: "1%",
                }}
              >
                <Tooltip title={uiData.drawingTools_Undo_DrawingTools?.tr_text}>
                  <ReplayIcon />
                </Tooltip>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <QuickZoom
          open={openQuickZoom}
          setOpen={setOpenQuickZoom}
          onClickQuickZoomTile={onClickQuickZoomTile}
        />
      </>
    )
  );
});
// function SVGMapper(props) {

SVGMapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SVGMapper;
