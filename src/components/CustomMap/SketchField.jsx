/*eslint no-unused-vars: 0*/

import React, { PureComponent, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import History from "./history";
import { uuid4 } from "./utils";
import Arrow from "./tools/Arrow";
import Tool from "./tools";
import DefaultTool from "./tools/defaul-tool";
import Select from "./tools/Select";
import Pencil from "./tools/Pencil";
import Line from "./tools/Line";
import Rectangle from "./tools/Rectangle";
import RectangleLabel from "./tools/Rectangle/rectangle-label";
import Circle from "./tools/Circle";
import Pan from "./tools/Pan";
import AnatomyMapper from "../AnatomyMapper";
import Highlighter from "./tools/Highlighter";
import { Button, IconButton, Tooltip, withStyles } from "@material-ui/core";
import { TranslationContext } from "../../contexts/translation";
import {
  AddOutlined,
  DeleteForever,
  Crop32Outlined,
  DeleteForeverOutlined,
  RemoveOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutMapOutlined,
  ZoomOutOutlined,
} from "@material-ui/icons";
import { Slider } from "@material-ui/core";
import "gsap/CSSPlugin";
import { gsap } from "gsap";
import { Tools } from ".";
import Ellipse from "./tools/Ellipse";
import useTranslations from "../../hooks/useTranslations";
import { getRootSVG } from "../../utils/cf";

const MAX_ZOOM = 6.4;
const MIN_ZOOM = 1;
const RATIO = 11 / 8.5;
const MAP_CONTAINER_MARGIN_CORRECT = 45;
const fabric = require("fabric").fabric;

const classes = (theme) => ({
  mapContainer: {
    "@media (max-width: 1024px)": {
      marginTop: "10px",
      // border: "2px dashed #999",
    },
    position: "relative",
    zIndex: "4",
    width: "100%",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },

  errorPanMax: {
    border: "10px solid rgba(0,0,0,.8)",
    borderRightWidth: "20px",
    borderLeftWidth: "20px",
  },

  zoomButtonContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 5,
    width: 20,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    "& > span": {
      marginBottom: "12px",
    },
    "& svg": {
      fontSize: "16px",
    },
"@media (max-width: 768px)":{
      height: 100,
    }
  },

  setInitialZoom: {
    position: "absolute",
    top: 200,
    left: 2,
    zIndex: 5,
    width: 20,
    height: 140,
    "@media only screen and (min-width: 480px) and (max-width: 900px) and (orientation: landscape)":
      {
        top: "70%",
      },
  },

  undoButtonContainer: {
    display: "flex",
    position: "absolute",
    bottom: 12,
    right: 12,
    zIndex: 5,
    "&>button": {
      borderRadius: 6,
      border: "1px solid #000",
      padding: "0px 6px",
    },
  },
  DeleteSelectedButton: {
    zIndex: 5,
    "& svg": {
      color: "red",
    },
  },

  // blackBoundingBox: {
  //   position: 'absolute',
  //   top: '0',
  //   left: '50%',
  //   zIndex: "3",
  //   transform: 'translateX(-50%)',
  //   width: 'calc(100% - 80px)',
  //   height: `calc(100% - ${MAP_CONTAINER_MARGIN_CORRECT}px)`,
  //   backgroundColor: 'rgba(0,0,0,.9)',
  //   transition: 'all .2s',
  //   marginBottom: MAP_CONTAINER_MARGIN_CORRECT,
  //   "@media (max-width: 960px)": {
  //     width: '100%',
  //   },
  // }
});
/**
 * Sketch Tool based on FabricJS for React Applications
 */

var ua = navigator.userAgent.toLowerCase();

let isSafari = false;
if (ua.indexOf("safari") !== -1) {
  if (!(ua.indexOf("chrome") !== -1)) {
    isSafari = true;
  }
}
class SketchField extends PureComponent {
  static propTypes = {
    //font family in rectangle lable
    fontFamily: PropTypes.string,
    //the color of the text in rectangle-lable
    rtextColor: PropTypes.string,
    //background color in rectangle lable
    btextColor: PropTypes.string,
    //the text bold
    textBold: PropTypes.bool,
    //the text italic
    textItalic: PropTypes.bool,
    //size of text rectangle lable
    textSize: PropTypes.string,
    //the text underline
    textUnderLine: PropTypes.bool,
    // the color of the line
    lineColor: PropTypes.string,
    // The width of the line
    lineWidth: PropTypes.number,
    // the fill color of the shape when applicable
    fillColor: PropTypes.string,
    // the background color of the sketch
    backgroundColor: PropTypes.string,
    // the opacity of the object
    opacity: PropTypes.number,
    // number of undo/redo steps to maintain
    undoSteps: PropTypes.number,
    // The tool to use, can be pencil, rectangle, circle, brush;
    tool: PropTypes.string,
    // image format when calling toDataURL
    imageFormat: PropTypes.string,
    // Sketch data for controlling sketch from
    // outside the component
    value: PropTypes.object,
    // Set to true if you wish to force load the given value, even if it is  the same
    forceValue: PropTypes.bool,
    // Specify some width correction which will be applied on auto resize
    widthCorrection: PropTypes.number,
    // Specify some height correction which will be applied on auto resize
    heightCorrection: PropTypes.number,
    // Specify action on change
    onChange: PropTypes.func,
    // Default initial value
    defaultValue: PropTypes.object,
    // Sketch width
    width: PropTypes.number,
    // Sketch height
    height: PropTypes.number,
    // event object added
    onObjectAdded: PropTypes.func,
    // event object modified
    onObjectModified: PropTypes.func,
    // event object removed
    onObjectRemoved: PropTypes.func,
    // event mouse down
    onMouseDown: PropTypes.func,
    // event mouse move
    onMouseMove: PropTypes.func,
    // event mouse up
    onMouseUp: PropTypes.func,
    // event mouse out
    onMouseOut: PropTypes.func,
    // event object move
    onObjectMoving: PropTypes.func,
    // event object scale
    onObjectScaling: PropTypes.func,
    // event object rotating
    onObjectRotating: PropTypes.func,
    // Class name to pass to container div of canvas
    className: PropTypes.string,
    // Style options to pass to container div of canvas
    style: PropTypes.object,
  };

  static defaultProps = {
    btextColor: "black",
    rtextColor: "blue",
    textBold: false,
    textSize: "15",
    textItalic: false,
    textUnderLine: false,
    fontFamily: "cursive",
    lineColor: "black",
    lineWidth: 10,
    fillColor: "transparent",
    backgroundColor: "transparent",
    opacity: 1.0,
    undoSteps: 25,
    tool: null,
    widthCorrection: 0,
    heightCorrection: 0,
    forceValue: false,
    onObjectAdded: () => null,
    onObjectModified: () => null,
    onObjectRemoved: () => null,
    onMouseDown: () => null,
    onMouseMove: () => null,
    onMouseUp: () => null,
    onMouseOut: () => null,
    onObjectMoving: () => null,
    onObjectScaling: () => null,
    onObjectRotating: () => null,
  };

  state = {
    action: true,
    scale: 1,
    // eleContainerAttr: { transformation: { x: 0, y: 0 }, scale: 1 },
    isObjectSelected: false,
    mapContainerDims: { width: 0, height: 0 },
    showBoundingBox: false,
    _undoCounter: 0,
  };
  _initTools = (fabricCanvas) => {
    this._tools = {};
    this._tools[Tool.Select] = new Select(fabricCanvas);
    this._tools[Tool.Pencil] = new Pencil(fabricCanvas);
    this._tools[Tool.Line] = new Line(fabricCanvas);
    this._tools[Tool.Arrow] = new Arrow(fabricCanvas);
    this._tools[Tool.Rectangle] = new Rectangle(fabricCanvas);
    this._tools[Tool.RectangleLabel] = new RectangleLabel(fabricCanvas);
    this._tools[Tool.Circle] = new Circle(fabricCanvas);
    this._tools[Tool.Pan] = new Pan(fabricCanvas, this.panEleContainer);
    this._tools[Tool.Highlighter] = new Highlighter(fabricCanvas);
    this._tools[Tool.DefaultTool] = new DefaultTool(fabricCanvas);
    this._tools[Tool.Ellipse] = new Ellipse(fabricCanvas);
  };

  /**
   * Enable touch Scrolling on Canvas
   */
  enableTouchScroll = () => {
    let canvas = this._fc;
    if (canvas.allowTouchScrolling) return;
    canvas.allowTouchScrolling = true;
  };

  /**
   * Disable touch Scrolling on Canvas
   */
  disableTouchScroll = () => {
    let canvas = this._fc;
    if (canvas.allowTouchScrolling) {
      canvas.allowTouchScrolling = false;
    }
  };

  /**
   * Add an image as object to the canvas
   *
   * @param dataUrl the image url or Data Url
   * @param options object to pass and change some options when loading image, the format of the object is:
   *
   * {
   *   left: <Number: distance from left of canvas>,
   *   top: <Number: distance from top of canvas>,
   *   scale: <Number: initial scale of image>
   * }
   */
  addImg = (dataUrl, options = {}) => {
    let canvas = this._fc;
    fabric.Image.fromURL(dataUrl, (oImg) => {
      let opts = {
        left: Math.random() * (canvas.getWidth() - oImg.width * 0.5),
        top: Math.random() * (canvas.getHeight() - oImg.height * 0.5),
        scale: 0.5,
      };
      Object.assign(opts, options);
      oImg.scale(opts.scale);
      oImg.set({
        left: opts.left,
        top: opts.top,
      });
      canvas.add(oImg);
    });
  };

  translate = {
    x: 0,
    y: 0,
  };

  _zoom = 1;

  /**
   * Action when an object is added to the canvas
   */
  _onObjectAdded = (e) => {
    const { onObjectAdded } = this.props;
    if (!this.state.action) {
      this.setState({ action: true });
      return;
    }
    let obj = e.target;
    obj.__version = 1;
    // record current object state as json and save as originalState
    let objState = obj.toJSON();
    obj.__originalState = objState;
    let state = JSON.stringify(objState);
    // object, previous state, current state
    this.setState({ _undoCounter: this.state._undoCounter + 1 });
    this._history.keep([obj, state, state]);
    onObjectAdded(e);
  };

  /**
   * Action when an object is moving around inside the canvas
   */
  _onObjectMoving = (e) => {
    const { onObjectMoving } = this.props;
    onObjectMoving(e);
  };

  /**
   * Action when an object is scaling inside the canvas
   */
  _onObjectScaling = (e) => {
    const { onObjectScaling } = this.props;
    onObjectScaling(e);
  };

  /**
   * Action when an object is rotating inside the canvas
   */
  _onObjectRotating = (e) => {
    const { onObjectRotating } = this.props;
    onObjectRotating(e);
  };

  _onObjectModified = (e) => {
    const { onObjectModified } = this.props;
    let obj = e.target;
    obj.__version += 1;
    let prevState = JSON.stringify(obj.__originalState);
    let objState = obj.toJSON();
    // record current object state as json and update to originalState
    obj.__originalState = objState;
    let currState = JSON.stringify(objState);
    this.setState({ _undoCounter: this.state._undoCounter + 1 });
    this._history.keep([obj, prevState, currState]);
    onObjectModified(e);
  };

  /**
   * Action when an object is removed from the canvas
   */
  _onObjectRemoved = (e) => {
    const { onObjectRemoved } = this.props;
    let obj = e.target;
    if (obj.__removed) {
      obj.__version += 1;
      return;
    }
    obj.__version = 0;
    onObjectRemoved(e);
  };

  /**
   * Action when the mouse button is pressed down
   */
  _onMouseDown = (e) => {
    const { onMouseDown } = this.props;
    this._selectedTool.doMouseDown(e);
    onMouseDown(e);
  };

  /**
   * Action when the mouse cursor is moving around within the canvas
   */
  _onMouseMove = (e) => {
    const { onMouseMove } = this.props;
    this._selectedTool.doMouseMove(e);
    onMouseMove(e);
  };

  _onMouseOut = (e) => {
    const { onMouseOut } = this.props;
    this._selectedTool.doMouseOut(e);
    if (this.props.onChange) {
      let onChange = this.props.onChange;
      setTimeout(() => {
        onChange(e.e);
      }, 10);
    }
    onMouseOut(e);
  };

  _onMouseUp = (e) => {
    const { onMouseUp } = this.props;
    this._selectedTool.doMouseUp(e);
    if (this.props.tool !== Tool.Pencil) {
      const canvas = this._fc;
      const objects = canvas.getObjects();
      const newObj = objects[objects.length - 1];
      if (newObj && newObj.__version === 1) {
        newObj.__originalState = newObj.toJSON();
      }
    }
    if (this.props.onChange) {
      let onChange = this.props.onChange;
      setTimeout(() => {
        onChange(e.e);
      }, 10);
    }
    onMouseUp(e);
  };

  /**
   * Track the resize of the window and update our state
   *
   * @param e the resize event
   * @private
   */
  _resize = (e, canvasWidth = null, canvasHeight = null) => {
    if (e) e.preventDefault();
    this.setMapContainerDimension(() => {
      let { widthCorrection, heightCorrection } = this.props;
      let canvas = this._fc;
      const el = getRootSVG() || document.getElementById("loaded-svg-cont");
      const { height: clientHeight, width: offsetWidth } =
        el.getBoundingClientRect();
      // const clientHeight = document.getElementById("loaded-svg-cont").offsetHeight;
      // const offsetWidth = document.getElementById("loaded-svg-cont").offsetWidth;
      let prevWidth = canvasWidth || canvas.getWidth();
      let prevHeight = canvasHeight || canvas.getHeight();
      // let wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2);
      // let hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2);

      let wfactor = ((offsetWidth - widthCorrection) / prevWidth);
      let hfactor = ((clientHeight - heightCorrection) / prevHeight);
      canvas.setWidth(offsetWidth - widthCorrection);
      canvas.setHeight(clientHeight - heightCorrection);
      if (canvas.backgroundImage) {
        // Need to scale background images as well
        let bi = canvas.backgroundImage;
        bi.width = bi.width * wfactor;
        bi.height = bi.height * hfactor;
      }
      let objects = canvas.getObjects();
      for (let i in objects) {
        let obj = objects[i];
        let scaleX = obj.scaleX;
        let scaleY = obj.scaleY;
        let left = obj.left;
        let top = obj.top;
        let tempScaleX = scaleX * wfactor;
        let tempScaleY = scaleY * hfactor;
        let tempLeft = left * wfactor;
        let tempTop = top * hfactor;
        obj.scaleX = tempScaleX;
        obj.scaleY = tempScaleY;
        obj.left = tempLeft;
        obj.top = tempTop;
        obj.setCoords();
      }
      canvas.renderAll();
      canvas.calcOffset();
      this._staticCenter = canvas.getCenter();
    });
  };

  /**
   * Sets the background color for this sketch
   * @param color in rgba or hex format
   */
  _backgroundColor = (color) => {
    if (!color) return;
    let canvas = this._fc;
    canvas.setBackgroundColor(color, () => canvas.renderAll());
  };

  showBoundingBox = () => {
    let timeOutError;
    !this.state.showBoundingBox && this.setState({ showBoundingBox: true });
    clearTimeout(timeOutError);
    timeOutError = setTimeout(() => {
      this.setState({ showBoundingBox: false });
    }, 500);
  };

  getPointOnSVG = (coord) => {
    return isSafari ? coord / this.state.scale : coord;
  };
  /**
   * Zoom the drawing by the factor specified
   *
   * The zoom factor is a percentage with regards the original, for example if factor is set to 2
   * it will double the size whereas if it is set to 0.5 it will half the size
   *
   * @param factor the zoom factor
   */
  timeOutId;

  zoom = (factor = 1, e) => {
    let canvas = this._fc;
    if (factor < MAX_ZOOM) {
      factor = factor < MIN_ZOOM ? MIN_ZOOM : factor;
      const { width, height } = document
        .getElementById("loaded-svg-cont")
        .getBoundingClientRect();
      gsap.to("#loaded-svg-cont>svg", {
        duration: ".2s",
        scale: factor,
      });
      this._zoom = factor;
      const rootSVG = getRootSVG();
      if (rootSVG) {
        if (factor <= MAX_ZOOM / 2) {
          rootSVG.style.setProperty("--map-scale", 1 / factor);
        } else {
          // document.getElementById().style.setProperty()
          rootSVG.style.setProperty("--map-scale", 1 / 4);
        }
      }

      canvas.setDimensions({ width: width * factor, height: height * factor });
      canvas.zoomToPoint({ x: 0, y: 0 }, factor);
      this.setState({ scale: factor });
    }
  };

  checkIsPanAllowed = (transformation = { x: 0, y: 0 }) => {
    let { workOnSVG, tool } = this.props;
    if (workOnSVG === false && tool !== "pan") return false;
    const errorCorrection = 70;
    const absDisX = Math.abs(transformation.x),
      absDisY = Math.abs(transformation.y);
    const { width: c_width, height: c_height } =
      this._container.getBoundingClientRect();
    const { width: s_width, height: s_height } = document
      .querySelector("#loaded-svg-cont>svg")
      .getBoundingClientRect();
    const maxX = s_width + (c_width - s_width) / 2 - errorCorrection;
    const maxY = s_height + (c_height - s_height) / 2 - errorCorrection;
    if (absDisX > maxX || absDisY > maxY) {
      this.showBoundingBox();
      return false;
    } else {
      return true;
    }
  };

  /**
   * Perform an undo operation on canvas, if it cannot undo it will leave the canvas intact
   */
  undo = () => {
    if (this._history.current) {
      let history = this._history;
      let [obj, prevState, currState] = history.getCurrent();
      history.undo();
      if (obj.__removed) {
        this.setState({ action: false }, () => {
          this._fc.add(obj);
          obj.__version -= 1;
          obj.__removed = false;
        });
      } else if (obj.__version <= 1) {
        if (this.state._undoCounter > 0)
          this.setState({ _undoCounter: this.state._undoCounter - 1 });
        this._fc.remove(obj);
      } else {
        obj.__version -= 1;
        obj.setOptions(JSON.parse(prevState));
        obj.setCoords();
        this._fc.renderAll();
      }
      if (this.props.onChange) {
        this.props.onChange();
      }
    }
  };

  /**
   * Perform a redo operation on canvas, if it cannot redo it will leave the canvas intact
   */
  redo = () => {
    let history = this._history;
    if (history.canRedo()) {
      let canvas = this._fc;
      //noinspection Eslint
      let [obj, prevState, currState] = history.redo();
      if (obj.__version === 0) {
        this.setState({ action: false }, () => {
          canvas.add(obj);
          obj.__version = 1;
        });
      } else {
        obj.__version += 1;
        obj.setOptions(JSON.parse(currState));
      }
      obj.setCoords();
      canvas.renderAll();
      if (this.props.onChange) {
        this.props.onChange();
      }
    }
  };

  /**
   * Delegation method to check if we can perform an undo Operation, useful to disable/enable possible buttons
   *
   * @returns {*} true if we can undo otherwise false
   */
  canUndo = () => {
    return this._history.canUndo();
  };

  /**
   * Delegation method to check if we can perform a redo Operation, useful to disable/enable possible buttons
   *
   * @returns {*} true if we can redo otherwise false
   */
  canRedo = () => {
    return this._history.canRedo();
  };

  toDataURL = (options = {}) =>
    this._fc.toDataURL({ ...options, multiplier: 4, quality: 1 });

  /**
   * Returns JSON representation of canvas
   *
   * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
   * @returns {string} JSON string
   */
  toJSON = (propertiesToInclude) => this._fc.toJSON(propertiesToInclude);

  /**
   * Populates canvas with data from the specified JSON.
   *
   * JSON format must conform to the one of fabric.Canvas#toDatalessJSON
   *
   * @param json JSON string or object
   */
  fromJSON = (json) => {
    if (!json) return;
    let canvas = this._fc;
    setTimeout(() => {
      canvas.loadFromJSON(json, () => {
        if (this.props.tool === Tool.DefaultTool) {
          canvas.isDrawingMode = canvas.selection = false;
          canvas.forEachObject((o) => (o.selectable = o.evented = false));
        }
        canvas.renderAll();
        if (this.props.onChange) {
          this.props.onChange();
        }
      });
    }, 100);
  };

  /**
   * Clear the content of the canvas, this will also clear history but will return the canvas content as JSON to be
   * used as needed in order to undo the clear if possible
   *
   * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
   * @returns {string} JSON string of the canvas just cleared
   */
  clear = (propertiesToInclude = "") => {
    let discarded = this.toJSON(propertiesToInclude);
    this._fc.clear();
    this._history.clear();
    return discarded;
  };

  hasSelection = () => {
    if (this._fc) {
      let canvas = this._fc;
      return !!canvas.getActiveObject();
    } else {
      return false;
    }
  };

  clearSelection = () => {
    let canvas = this._fc;
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  /**
   * Remove selected object from the canvas
   */
  removeSelected = () => {
    let canvas = this._fc;
    let activeObj = canvas.getActiveObject();
    if (activeObj) {
      let selected = [];
      if (activeObj.type === "activeSelection") {
        activeObj.forEachObject((obj) => selected.push(obj));
      } else {
        selected.push(activeObj);
      }
      selected.forEach((obj) => {
        obj.__removed = true;
        let objState = obj.toJSON();
        obj.__originalState = objState;
        let state = JSON.stringify(objState);
        this._history.keep([obj, state, state]);
        canvas.remove(obj);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  copy = () => {
    let canvas = this._fc;
    canvas.getActiveObject().clone((cloned) => (this._clipboard = cloned));
  };

  paste = () => {
    // clone again, so you can do multiple copies.
    this._clipboard.clone((clonedObj) => {
      let canvas = this._fc;
      canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === "activeSelection") {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas;
        clonedObj.forEachObject((obj) => canvas.add(obj));
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      this._clipboard.top += 10;
      this._clipboard.left += 10;
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
    });
  };

  /**
   * Sets the background from the dataUrl given
   *
   * @param dataUrl the dataUrl to be used as a background
   * @param options
   */
  setBackgroundFromDataUrl = (dataUrl, options = {}) => {
    let canvas = this._fc;
    let img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    const { stretched, stretchedX, stretchedY, ...fabricOptions } = options;
    img.onload = () => {
      const imgObj = new fabric.Image(img);
      if (stretched || stretchedX) imgObj.scaleToWidth(canvas.width);
      if (stretched || stretchedY) imgObj.scaleToHeight(canvas.height);
      canvas.setBackgroundImage(
        imgObj,
        () => canvas.renderAll(),
        fabricOptions
      );
    };
    img.src = dataUrl;
  };

  addText = (text, options = {}) => {
    let canvas = this._fc;
    let iText = new fabric.IText(text, options);
    let opts = {
      left: (canvas.getWidth() - iText.width) * 0.5,
      top: (canvas.getHeight() - iText.height) * 0.5,
    };
    Object.assign(options, opts);
    iText.set({
      left: options.left,
      top: options.top,
    });

    canvas.add(iText);
  };

  callEvent = (e, eventFunction) => {
    if (this._selectedTool) {
      if (e.e && e.e.touches && e.e.touches.length >= 2) return;
      eventFunction(e);
    }
  };

  panEleContainer = (coords, org, cb = () => {}) => {
    let newTransformation = {
      x: this._pan.x + (coords.x - org.startX),
      y: this._pan.y + (coords.y - org.startY),
    };

    // if (!this.checkIsPanAllowed(newTransformation)) {
    //   return;
    // }

    this._pan = {
      x: newTransformation.x,
      y: newTransformation.y,
    };
    gsap.to("#loaded-svg-cont>svg", {
      duration: ".2s",
      x: this._pan.x,
      y: this._pan.y,
    });

    gsap.to(".canvas-container", {
      duration: ".2s",
      xPercent: -50,
      yPercent: -50,
      x: this._pan.x,
      y: this._pan.y,
    });
    this.translate = {
      x: coords.x - org.startX + this.translate.x,
      y: coords.y - org.startY + this.translate.y,
    };
    cb();
    // this._eleContainer.style.transform = string ;
  };

  resetZoomAndPan = () => {
    this.setState({
      scale: 1,
    });
    const currentX = this._pan.x;
    this._pan = { x: 0, y: 0 };
    gsap.to(".canvas-container", {
      duration: ".1s",
      xPercent: -50,
      yPercent: -50,
      x: this._pan.x,
      y: this._pan.y,
    });
    gsap.to("#loaded-svg-cont>svg", {
      duration: ".1s",
      x: this._pan.x,
      y: this._pan.y,
    });
    this.zoom(1);
  };

  onObjectSelection = (e) => {
    this.setState({ isObjectSelected: true });
  };

  onObjectSelectionRemove = (e) => {
    this.setState({ isObjectSelected: false });
  };

  setMapContainerDimension = (cb = () => {}) => {
    const { width, height } = this._container.getBoundingClientRect();
    //
    let fullHeight, fullWidth;
    if (width > height) {
      fullHeight = height - MAP_CONTAINER_MARGIN_CORRECT;
      fullWidth = fullHeight * RATIO;
    } else {
      fullWidth = width - 10;
      fullHeight = fullWidth * (1 / RATIO);
    }
    //
    // if (window.innerHeight > window.innerWidth) {
    //   fullWidth = fullHeight * (1 / RATIO);
    // } else {
    //   fullWidth = fullHeight * RATIO;
    // }
    this.setState(
      {
        mapContainerDims: {
          width: fullWidth,
          height: fullHeight,
        },
      },
      () => {
        cb();
      }
    );
  };

  componentDidMount = () => {
    let { tool, value, undoSteps, defaultValue, backgroundColor } = this.props;
    // this.tl = new TimelineLite();
    // this._scale = 1;
    this._pan = { x: 0, y: 0 };
    //
    this.setMapContainerDimension(() => {
      let canvas = (this._fc = new fabric.Canvas(
        this._canvas /*, {
           preserveObjectStacking: false,
           renderOnAddRemove: false,
           skipTargetFind: true
           }*/
      ));

      this._staticCenter = canvas.getCenter();
      // this.setState({boundingFrameDims: {
      //   width:
      // }})
      this._initTools(canvas);

      // set initial backgroundColor
      this._backgroundColor(backgroundColor);

      let selectedTool = this._tools[tool];
      if (selectedTool) selectedTool.configureCanvas(this.props);
      this._selectedTool = selectedTool;

      // Control resize
      window.addEventListener("resize", this._resize, false);

      // Initialize History, with maximum number of undo steps
      this._history = new History(undoSteps);

      // Events binding
      canvas.on("object:added", (e) => this.callEvent(e, this._onObjectAdded));
      canvas.on("object:modified", (e) =>
        this.callEvent(e, this._onObjectModified)
      );
      canvas.on("object:removed", (e) =>
        this.callEvent(e, this._onObjectRemoved)
      );

      canvas.on("selection:created", (e) => this.onObjectSelection(e));
      canvas.on("selection:cleared", (e) => this.onObjectSelectionRemove(e));

      canvas.on("mouse:down", (e) => this.callEvent(e, this._onMouseDown));
      canvas.on("mouse:move", (e) => this.callEvent(e, this._onMouseMove));
      canvas.on("mouse:up", (e) => this.callEvent(e, this._onMouseUp));
      canvas.on("mouse:out", (e) => this.callEvent(e, this._onMouseOut));
      canvas.on("object:moving", (e) =>
        this.callEvent(e, this._onObjectMoving)
      );
      canvas.on("object:scaling", (e) =>
        this.callEvent(e, this._onObjectScaling)
      );
      canvas.on("object:rotating", (e) =>
        this.callEvent(e, this._onObjectRotating)
      );

      this.disableTouchScroll();

      this._resize();

      // initialize canvas with controlled value if exists
      (value || defaultValue) && this.fromJSON(value || defaultValue);
    });
  };

  panAndZoomToARegion = (
    targetNode = document.getElementById("loaded-svg-cont"),
    onComplete = () => {}
  ) => {
    if (targetNode) {
      this.resetZoomAndPan();
      if (this.timeOutId) {
        clearTimeout(this.timeOutId);
        this.timeOutId = null;
      }
      this.timeoutId = setTimeout(() => {
        const svgBox = document
          .getElementById("loaded-svg-cont")
          .getBoundingClientRect();
        const targetRegion = targetNode.getBoundingClientRect();
        const rectDiagonal = Math.hypot(
          targetRegion.width,
          targetRegion.height
        );
        const svgDiagonal = Math.hypot(svgBox.width, svgBox.height);

        let scale = svgDiagonal / rectDiagonal;
        scale = scale >= 6 ? 6 : scale;
        this.zoom(scale);
        setTimeout(() => {
          const svgBox = document
            .getElementById("loaded-svg-cont")
            .getBoundingClientRect();
          const targetRegion = targetNode.getBoundingClientRect();
          const svgBoxX = (svgBox.left + svgBox.right) / 2;
          const svgBoxY = (svgBox.top + svgBox.bottom) / 2;

          const newY = (targetRegion.top + targetRegion.bottom) / 2;
          const newX = (targetRegion.left + targetRegion.right) / 2;
          this.panEleContainer(
            { x: svgBoxX, y: svgBoxY },
            { startX: newX, startY: newY },
            () => {}
          );
          onComplete();
        }, 400);
      }, 400);
    }
  };

  panAndZoomToASetOfRegion = (
    targets = [document.getElementById("loaded-svg-cont")],
    onComplete = () => {}
  ) => {
    this.resetZoomAndPan();
    const max = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
      this.timeOutId = null;
    }
    setTimeout(() => {
      targets.forEach((elem) => {
        const { top, bottom, right, left } = elem.getBoundingClientRect();
        if (max["top"] < top) {
          max["top"] = top;
        }
        if (max["left"] < left) {
          max["left"] = left;
        }
        if (max["right"] < right) {
          max["right"] = right;
        }
        if (max["bottom"] < bottom) {
          max["bottom"] = bottom;
        }
      });

      const width = max["right"] - max["left"];
      const height = max["bottom"] - max["top"];

      const svgBox = document
        .getElementById("loaded-svg-cont")
        .getBoundingClientRect();
      // const targetRegion = targetNode.getBoundingClientRect();
      const rectDiagonal = Math.hypot(width, height);
      const svgDiagonal = Math.hypot(svgBox.width, svgBox.height);

      let scale = svgDiagonal / rectDiagonal;
      scale = 3.3;
      this.zoom(scale);
      setTimeout(() => {
        const svgBox = document
          .getElementById("loaded-svg-cont")
          .getBoundingClientRect();
        const max = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        };
        targets.forEach((elem) => {
          const { top, bottom, right, left } = elem.getBoundingClientRect();
          if (max["top"] < top) {
            max["top"] = top;
          }
          if (max["left"] < left) {
            max["left"] = left;
          }
          if (max["right"] < right) {
            max["right"] = right;
          }
          if (max["bottom"] < bottom) {
            max["bottom"] = bottom;
          }
        });

        // const targetRegion = targetNode.getBoundingClientRect();
        const svgBoxX = (svgBox.left + svgBox.right) / 2;
        const svgBoxY = (svgBox.top + svgBox.bottom) / 2;

        const newY = (max.top + max.bottom) / 2;
        const newX = (max.left + max.right) / 2;
        this.panEleContainer(
          { x: svgBoxX, y: svgBoxY },
          { startX: newX, startY: newY },
          () => {}
        );
        onComplete();
      }, 400);
    }, 400);
  };

  componentWillUnmount = () =>
    window.removeEventListener("resize", this._resize);

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.width !== prevProps.width ||
      this.props.height !== prevProps.height
    ) {
      this._resize();
    }

    if (this.state._undoCounter > 0) this.props.setQuickUndo(1);
    else this.props.setQuickUndo(0);

    if (this.props.undoCanvas !== prevProps.undoCanvas) {
      this.undo();
    }

    if (
      this.props.tool !== prevProps.tool ||
      this.props.lineColor !== prevProps.lineColor ||
      this.props.fillColor !== prevProps.fillColor ||
      this.props.lineWidth !== prevProps.lineWidth
    ) {
      this._selectedTool = this._tools[this.props.tool];
      //Bring the cursor back to default if it is changed by a tool
      this._fc.defaultCursor = "default";
      if (this._selectedTool) {
        this._selectedTool.configureCanvas(this.props);
      }
    }

    if (this.props.backgroundColor !== prevProps.backgroundColor) {
      this._backgroundColor(this.props.backgroundColor);
    }

    if (
      this.props.value !== prevProps.value ||
      (this.props.value && this.props.forceValue)
    ) {
      this.fromJSON(this.props.value);
    }
  };

  handleZoom = (e) => {
    e.preventDefault();

    let deltaScale = Math.sign(e.deltaY) < 0 ? 0.1 : -0.1;
    this.zoom(this.state.scale + this.state.scale * deltaScale, e);
  };

  // onClickAnatomyMapper = () => {};
  handleToolClick = (tool) => {};
  handleOnTouchStart = (e) => {
    if (e.nativeEvent.touches.length === 2) {
      e.stopPropagation();
      this._pinchZoomStart = true;
      this._prevPanX = e.touches[0].pageX;
      this._prevPanY = e.touches[0].pageY;
      this._startDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
    } else {
      if (e.nativeEvent.touches.length === 1) {
        this._singleTouchPan = this._selectedTool === Tools.Pan ? false : true;
        this._prevPanX = e.nativeEvent.touches[0].pageX;
        this._prevPanY = e.nativeEvent.touches[0].pageY;
      }
      this._pinchZoomStart = false;
    }
  };
  handleOnTouch = (e) => {
    // e.nativeEvent.preventDefault();
    if (this._pinchZoomStart) {
      const dist =
        Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        ) - this._startDist;
      this._startDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );

      const panX = e.touches[0].pageX;
      const panY = e.touches[0].pageY;

      const diagonal = Math.hypot(window.screen.width, window.screen.height);
      const delta = dist / diagonal;
      if (dist <= 1) {
        if (this._selectedTool === Tools.Pan || this.props.workOnSVG) {
          this.panEleContainer(
            { x: panX, y: panY },
            { startX: this._prevPanX, startY: this._prevPanY }
          );
        }
      }
      this.zoom(this.state.scale + this.state.scale * 2 * delta);
      this._prevPanX = panX;
      this._prevPanY = panY;
    } else if (this._singleTouchPan) {
      if (this._selectedTool === Tools.Pan || this.props.workOnSVG) {
        const panX = e.nativeEvent.touches[0].pageX;
        const panY = e.nativeEvent.touches[0].pageY;
        this.panEleContainer(
          { x: panX, y: panY },
          { startX: this._prevPanX, startY: this._prevPanY }
        );
        this._prevPanX = panX;
        this._prevPanY = panY;
      }
    }
  };
  handleOnTouchEnd = (e) => {
    if (this._pinchZoomStart) this._pinchZoomStart = false;
    this._singleTouchPan = false;
  };

  render = () => {
    let { className, style, width, height, uiData } = this.props;
    const { showBoundingBox } = this.state;
    const { classes } = this.props;
    let canvasDivStyle = Object.assign(
      {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "40px",
      },

      style ? style : {}
    );

    // const elementContainerTransform2 = `translate(${this.state.eleContainerAttr.transformation.x}px, ${this.state.eleContainerAttr.transformation.y}px) scale(${this.state.eleContainerAttr.scale})`;

    // const elementContainerTransform = `translate(calc(-50% + ${this.state.eleContainerAttr.transformation.x}px), calc(-50% + ${this.state.eleContainerAttr.transformation.y}px)) scale(${this.state.eleContainerAttr.scale})`;
    return (
      <div
        className={className}
        ref={(c) => (this._container = c)}
        style={canvasDivStyle}>
        <div className={classes.zoomButtonContainer}>
          <span>
            <Tooltip title={uiData?.mapInteractionLabel_ZoomIn?.tr_text}>
              <AddOutlined />
            </Tooltip>
          </span>
          <Slider
            defaultValue={1}
            orientation={"vertical"}
            aria-labelledby='discrete-slider-small-steps'
            step={0.1}
            min={1}
            max={MAX_ZOOM}
            value={this.state.scale}
            onChange={(e, newValue) => this.zoom(newValue)}
            valueLabelDisplay='auto'
          />
          <span>
            <Tooltip title={uiData?.mapInteractionLabel_ZoomOut?.tr_text}>
              <RemoveOutlined />
            </Tooltip>
          </span>
        </div>

        <div className={classes.setInitialZoom}>
          <IconButton
            id={"reset-zoom-pan"}
            onClick={() => this.resetZoomAndPan()}>
            <Tooltip
              title={
                uiData?.mapInteractionLabel_CenterAndViewEntireMap?.tr_text
              }>
              <Crop32Outlined />
            </Tooltip>
          </IconButton>
        </div>

        {/* <div
          className={classes.undoButtonContainer}
          style={{
            display: this.props.tool !== "default-tool" ? "block" : "none",
          }}
        >
          <IconButton onClick={() => this.undo()}>
            {" "}
            <UndoOutlined />{" "}
          </IconButton>
        </div> */}
        <div
          className={classes.DeleteSelectedButton}
          style={{
            visibility: !this.state.isObjectSelected ? "hidden" : "visible",
            position: "absolute",
            top: "0",
            right: "0",
          }}>
          <Tooltip title='Remove Selected'>
            <IconButton onClick={this.removeSelected}>
              <DeleteForeverOutlined />
            </IconButton>
          </Tooltip>
        </div>
        <div
          id='map-container'
          ref={(ele) => (this._mapContainer = ele)}
          className={
            classes.mapContainer +
            " " +
            (this.props.mapContext + "__context-map")
          }
          onTouchStart={this.handleOnTouchStart}
          onTouchMove={this.handleOnTouch}
          onTouchEnd={this.handleOnTouchEnd}
          onWheel={this.handleZoom}
          style={{
            maxWidth: this.state.mapContainerDims.width,
            width: "100%",
            margin: "auto",
            aspectRatio: "1.3 / 1",
            height: "100%",
            display: "flex",
            alignItems: "center",
            // transform: elementContainerTransform2,
            // transition: "all .1s",
            // position: "relative"
            maxHeight: this.state.mapContainerDims.height,
          }}>
          <AnatomyMapper
            tool={this.props.tool}
            id='mappper-els'
            hoverMode={"hierarchy"}
            containerStyle={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
            svgUrl={this.props.svg}
            zoom={this.state.scale}
          />

          <canvas id={"drawing-canvas"} ref={(c) => (this._canvas = c)}>
            Sorry, Canvas HTML5 element is not supported by your browser :(
          </canvas>

          {/* </div> */}
        </div>
      </div>
    );
  };
}

export default withStyles(classes)(SketchField);
