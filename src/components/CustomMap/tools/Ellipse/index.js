/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "../fabrictool";
import { linearDistance } from "../../utils";

const fabric = require("fabric").fabric;

class Ellipse extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas;
    this.props = props;
    canvas.isDrawingMode = canvas.selection = false;
    canvas.forEachObject((o) => (o.selectable = o.evented = false));
    this._width = props.lineWidth;
    this._color = props.lineColor;
    this._fill = props.fillColor;
  }

  doMouseDown(o) {
    let canvas = this._canvas;
    this.isDown = true;
    if(this.isActive){
      if(o.target===null){
        this.isActive = false;
        this._canvas.selection =false;
        this.ellipse.selectable = false;
        this.ellipse.evented = false;
        this.newEllipse = false;
        this._canvas.discardActiveObject().renderAll();
        // return;
      }
      return;
    }else{
      this.newEllipse = true;
    }; 

    let pointer = canvas.getPointer(o.e);
    [this.startX, this.startY] = [pointer.x, pointer.y];
    this.ellipse = new fabric.Ellipse({
      left: this.startX,
      top: this.startY,
      originX: "left",
      originY: "center",
      strokeWidth: this._width,
      stroke: this._color,
      fill: this._fill,
      selectable: false,
      evented: false,
      rx:1,
      ry:1
    });
    
    canvas.add(this.ellipse);
  }

  doMouseMove(o) {
    if (!this.isDown) return;
    if(this.isActive) return; 
    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);
    this.ellipse.set({
      rx: Math.abs(pointer.x - this.startX),
      ry: Math.abs(pointer.y - this.startY),  
      angle:
        (Math.atan2(pointer.y - this.startY, pointer.x - this.startX) * 180) /
        Math.PI,
    });
    this.ellipse.setCoords();
    canvas.renderAll();
  }




  doMouseUp(o) {
    if(this.newEllipse){
      this._canvas.setActiveObject(this.ellipse);
      this.isActive = true;
      this._canvas.selection = true;
      this.ellipse.selectable = true;
      this.ellipse.evented = true;
      this._canvas.renderAll(); 
    }
    
  
    
    this.isDown = false;
  }
}

export default Ellipse;
