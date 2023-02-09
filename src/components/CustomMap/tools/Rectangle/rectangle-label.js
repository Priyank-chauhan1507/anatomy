/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "../fabrictool";
import RectangleLabelObject from "./rectangle-label-object";

class RectangleLabel extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas;

    canvas.isDrawingMode = canvas.selection = false;
    canvas.forEachObject((o) => (o.selectable = o.evented = false));
    canvas.fillStyle = "red";
    this._width = props.lineWidth;
    this._color = props.lineColor;
    this._rtextColor = props.rtextColor;
    this._btextColor = props.btextColor;
    this._family = props.fontFamily;
    this._italic = props.textItalic;
    this._bold = props.textBold;
    this._textUnderLine = props.textUnderLine;
    this._textString = props.text;
    this._maxFontSize = props.textSize;
    if (this._italic) {
      this._italic = "italic";
    } else {
      this._italic = "";
    }
    if (this._bold) {
      this._bold = "900";
    } else {
      this._bold = "100";
    }
  }

  doMouseDown(o) {
    if (o.target && o.target.__originalState.type === "textbox") {
      return;
    }

    // if()) return ;
    let canvas = this._canvas;
    this.isDown = true;
    let pointer = canvas.getPointer(o.e);
    this.startX = pointer.x;
    this.startY = pointer.y;

    this.rectangleLabel = new RectangleLabelObject(canvas, "Start Writing", {
      left: this.startX,
      top: this.startY - 12,
      originX: "left",
      originY: "top",
      width: 200,
      height: canvas.height / 3,
      fontSize: this._maxFontSize,
      noScaleCache: false,

      transparentCorners: true,
      hasControls: true,
      angle: 0,
      fillStyle: "red",
      fontFamily: this._family,
      fontWeight: this._bold,
      backgroundColor: this._btextColor,
      fontStyle: this._italic,
      // textBackgroundColor:this._rtextColor,
      // fill:{"ok":false,"format":"hex6","_tc_id":258,"alpha":1}
      fill: this._rtextColor,
      underline: this._textUnderLine,
    });

    if (this._objects && this._objects.length > 0)
      this._objects.push(this.rectangleLabel);
    else this._objects = [this.rectangleLabel];

    while (this.rectangleLabel._textObj.height > canvas.height / 3) {
      this.rectangleLabel._textObj.set({
        fontSize: this.rectangleLabel._textObj.fontSize - 1,
        top: this.startY - this.rectangleLabel._textObj.fontSize - 12,
      });
    }

    // canvas.add(this.rectangleLabel._rectObj);
    canvas.add(this.rectangleLabel._textObj);
    canvas.renderAll();
    this.rectangleLabel._textObj.selectAll();
    // this.rectangleLabel._textObj.selectWord(0);
  }

  doMouseMove(o) {
    if (!this.isDown) return;
    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);
    if (this.startX > pointer.x) {
      // this.rectangleLabel._rectObj.set({ left: Math.abs(pointer.x) });
      this.rectangleLabel._textObj.set({ left: Math.abs(pointer.x) });
    }
    if (this.startY > pointer.y) {
      // this.rectangleLabel._rectObj.set({ left: Math.abs(pointer.x) });
      this.rectangleLabel._textObj.set({ top: Math.abs(pointer.y) });
    }
    this.rectangleLabel._textObj.setCoords();
    // this.rectangleLabel._rectObj.set({
    // width: Math.abs(this.startX - pointer.x),
    // });
    this.rectangleLabel._textObj.set({
      width: Math.abs(this.startX - pointer.x),
    });
    this.rectangleLabel._textObj.set({
      height: Math.abs(this.startY - pointer.y),
    });
    this.rectangleLabel._textObj.setCoords();
    canvas.renderAll();
  }

  doMouseUp(o) {
    this.isDown = false;
    let canvas = this._canvas;

    // var group = new fabric.Group([this.rectangleLabel._rectObj,this.rectangleLabel._textObj]);
    // canvas.remove(this.rectangleLabel._rectObj);
    // canvas.remove(this.rectangleLabel._textObj);
    // canvas.add(group);
    canvas.renderAll();
  }
}

export default RectangleLabel;
