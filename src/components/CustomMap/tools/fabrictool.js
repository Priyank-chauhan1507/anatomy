/* eslint no-unused-vars: 0 */

/**
 * "Abstract" like base class for a Canvas tool
 */
class FabricCanvasTool {
  constructor(canvas, panEleContainer, isPanAllowed) {
    this._canvas = canvas;
    this._panEleContainer = panEleContainer;
    this._isPanAllowed = isPanAllowed;
  }

  configureCanvas(props) {}

  doMouseUp(event) {}

  doMouseDown(event) {}

  doMouseMove(event) {}

  doMouseOut(event) {}
}

export default FabricCanvasTool;
