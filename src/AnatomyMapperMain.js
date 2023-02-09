import React from "react";
import SVGMapper from "./components/SVGMapper";

import ItemsRenderer from "./components/ItemsRenderer";
// const svgUrl = Test4;
// const svgUrl = "https://visualizer.anatomymapper.com/images/test/amaps.svg";
// const svgUrl =
// "https://visualizer.anatomymapper.com/images/test/amaps-vFB1-09.svg";
const svgUrl =
  "https://visualizer.anatomymapper.com/images/test/amaps-vFB1-09-id.svg";

const AnatomyMapperMain = React.forwardRef(
  (
    {
      gender,
      hideOpposite,
      isOralVisible,
      setOralVisible,
      setQuickUndo,
      setUndoCanvas,
      undoCanvas,
      quickUndo
    },
    ref
  ) => {
    return (
      <div ref={ref}>
        <SVGMapper
          svg={svgUrl}
          gender={gender}
          hideOpposite={hideOpposite}
          isOralVisible={isOralVisible}
          setOralVisible={setOralVisible}
          setQuickUndo={setQuickUndo}
          setUndoCanvas={setUndoCanvas}
          undoCanvas={undoCanvas}
          quickUndo={quickUndo}
        />
        <ItemsRenderer />
        <p></p>
      </div>
    );
  }
);

export default AnatomyMapperMain;
