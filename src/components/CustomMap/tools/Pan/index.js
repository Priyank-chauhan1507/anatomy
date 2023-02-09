/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "../fabrictool";

const fabric = require("fabric").fabric;

class Pan extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = canvas.selection = false;
    canvas.forEachObject((o) => (o.selectable = o.evented = false));
    //Change the cursor to the move grabber
    canvas.defaultCursor = "grab";

  }

 
  doMouseDown(o) {
    let canvas = this._canvas;
    this.isDown = true;
    let pointer = canvas.getPointer(o.e);
    this.startX = pointer.x;
    this.startY = pointer.y;
    canvas.defaultCursor = "grab";

  }

  doMouseMove(o) {
    if (!this.isDown) return;
    if(o.e.touches && o.e.touches.length !== 1){
     return
    }
    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);
    canvas.defaultCursor = "grabbing";

    this._panEleContainer(pointer,{startX:this.startX,startY:this.startY});

    
  }

  doMouseUp(o) {
    this.isDown = false;
    this._canvas.defaultCursor = "grab";

  }
}

export default Pan;
