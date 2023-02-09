/* eslint no-unused-vars: 0 */

const fabric = require("fabric").fabric;

class RectangleLabelObject {
  constructor(canvas, text, textProps) {
  
    // textProps['width'] = '100px';
    this._canvas = canvas;
    this._text = text;
  // this._rectObj = new fabric.Rect(rectProps);
    this._textObj = new fabric.Textbox(text, textProps);
    this._textObj.selectLine();
    canvas.on({ "object:scaling": this.update });
    canvas.on({ "object:moving": this.update });
  }

  update = (e) => {
    //e.target.set({scaleX:1, scaleY:1})
    if (!this._textObj || !this._rectObj) return;
    if (e.target === this._textObj) {
      this._textObj.set({
        width: this._rectObj.getScaledWidth(),
        scaleX: 1,
        scaleY: 1,
        top: this._textObj.top - this._textObj.getScaledHeight(),
        left: this._textObj.left,
      });
    }
  };

  setText(text) {
    this._text = text;
    this._textObj.set({ text });
  }
}

export default RectangleLabelObject;
