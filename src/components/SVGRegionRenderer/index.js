import React, { useEffect, useRef, useState, useContext } from "react";
import { LIST_TYPES } from "../../constants/listsConstants";
// import MIRROR_ICON from "../../assets/mirror_image.svg"
import MIRROR_ICON from "../../assets/mirror_image.svg";
import { TranslationContext } from "../../contexts/translation";
import { useSelector } from "react-redux";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { CloudDownloadOutlined, Help } from "@material-ui/icons";
import "./SvgRegion.css";
import {
  getPartOfRootSVG,
  getPartOfRootSVGWithPoint,
} from "../../utils/exportUtils";
import { saveAs } from "file-saver";
import { getPartOfRootSVGWithRegion } from "../../utils/exportUtils/root-svg";

export function MirrorImageComp({ isMirrorImage = false, setIsMirrorImage }) {
  const { language, uiData } = useContext(TranslationContext);
  return (
    <div
      style={{
        background: isMirrorImage ? "#00f" : "",
        display: isMirrorImage ? "block" : "",
        fill: isMirrorImage ? "#fff" : "",
        zIndex: 999999,
      }}
      onClick={() => setIsMirrorImage(!isMirrorImage)}>
      <div style={{ display: "flex" }}>
        <Tooltip title={uiData.edu_MirrorView_help.tr_text}>
          <Help style={{ height: "25px", width: "25px" }} />
        </Tooltip>
        <Tooltip title={uiData.edu_MirrorView.tr_text}>
          <img width='25' height='auto' src={MIRROR_ICON} alt='' />
        </Tooltip>

        {/* <Typography style={{fontSize:"10px"}} >{uiData
                    .edu_MirrorView
                    .tr_text}</Typography> */}
      </div>
    </div>
    // <img width="25" height="auto" src={MIRROR_ICON} alt="" style={{ position: 'absolute', right: '-30px', background: (isMirrorImage ? '#00f' : ''), display: (isMirrorImage ? "block" : '') }} onClick={() => setIsMirrorImage(!isMirrorImage)} />
  );
}

export function SVGRegionRendererWithPoint({
  gID,
  itemId,
  height = undefined,
  width = undefined,
}) {
  const ref = useRef();
  const [transformBox, setTransformBox] = useState({ x: 0, y: 0 });
  const [isMirrorImage, setIsMirrorImage] = useState(false);

  const { language, uiData } = useContext(TranslationContext);

  useEffect(() => {
    const gLayer = document.getElementById(gID);
    if (gLayer) {
      const { x, y, width, height } = gLayer.getBBox();
      setTransformBox({
        x: x,
        y: y,
        ratio: height / width,
        width: width,
        height: height,
      });
    }
  }, [gID, itemId]);

  const handleExport = async () => {
    try {
      const svgImage = await getPartOfRootSVGWithPoint(gID, [itemId]);
      saveAs(svgImage, `${itemId}.png`);
    } catch (e) {}
  };

  return (
    <div className='svg-region'>
      <div
        style={{
          height: height || 200,
          width: width || 200,
          margin: "auto",
          position: "relative",
          background: isMirrorImage
            ? "linear-gradient(to bottom right, #9c9b9b, #0000)"
            : "",
          borderStyle: isMirrorImage ? "groove" : "",
        }}>
        <div className={"action-buttons"}>
          <MirrorImageComp
            isMirrorImage={isMirrorImage}
            setIsMirrorImage={setIsMirrorImage}
          />
          <IconButton onClick={handleExport}>
            <CloudDownloadOutlined />
          </IconButton>
        </div>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          height={"100%"}
          width={"100%"}
          style={{
            overflow: "visible",
            transform: isMirrorImage ? "scale(-1, 1)" : "",
          }}
          viewBox={`${transformBox.x} ${transformBox.y} ${transformBox.width} ${transformBox.height}`}
          preserveAspectRatio='xMidYMid'
          ref={ref}>
          <use
            xlinkHref={`#${gID}`}
            style={{
              height: "100%",
              aspectRatio: "16/9",
            }}
          />
          <use
            xlinkHref={`#${itemId}`}
            style={{
              height: "100%",
              aspectRatio: "16/9",
              x: 0,
              y: 0,
              "--opacity-description": 0,
              "--map-scale": 1,
              "--mirror-image-transform": isMirrorImage ? "scale(-1,1)" : "",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export function SVGRegionRenderer({
  gID,
  pathId,
  height = undefined,
  width = undefined,
  tr = undefined,
}) {
  const ref = useRef();
  const [transformBox, setTransformBox] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isMirrorImage, setIsMirrorImage] = useState(false);
  const [isBlockIcon, setBlockIcon] = useState(false);
  const [LateralLabel, setLateral] = useState(gID.includes("DLAT"));
  const [bilateral, setBilateral] = useState(false);
  useEffect(() => {
    const gLayer = document.getElementById(gID);
    if (gLayer) {
      const { x, y, width, height } = gLayer.getBBox();

      setTransformBox({
        x,
        y,
        width,
        height,
      });
    }
    const LateralData = gID.split(":");
    //
    const n = LateralData.length;

    if (LateralLabel) {
      if (LateralData[n - 1][0] == "B") {
        setBilateral(true);
      } else {
        setBilateral(false);
      }
    }
  }, [gID, LateralLabel]);

  const handleExport = async () => {
    try {
      const svgImage = await getPartOfRootSVGWithRegion(gID, [pathId]);
      saveAs(svgImage, `${pathId}.png`);
    } catch (e) {}
  };
  const {mapLateralityLabel}=useContext(TranslationContext)
  return (
    <div className='svg-region'>
      <div
        style={{
          height: height || 200,
          width: width || 200,
          margin: "auto",
          position: "relative",
          background: isMirrorImage
            ? "linear-gradient(to bottom right, #9c9b9b, #0000)"
            : "",
          borderStyle: isMirrorImage ? "groove" : "",
        }}>
        <div className={"action-buttons"}>
          <MirrorImageComp
            isMirrorImage={isMirrorImage}
            setIsMirrorImage={setIsMirrorImage}
          />
          <IconButton onClick={handleExport}>
            <CloudDownloadOutlined />
          </IconButton>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          height={"100%"}
          width={"100%"}
          // width={"max-content"}
          style={{
            overflow: "visible",
            transform: isMirrorImage ? "scale(-1, 1)" : "",
          }}
          preserveAspectRatio='xMidYMid'
          viewBox={`${transformBox.x} ${transformBox.y} ${transformBox.width} ${transformBox.height}`}
          ref={ref}>
          <use
            xlinkHref={`#${gID}`}
            style={{
              // transform: `translate(${-transformBox.x}px, ${-transformBox.y}px)`,
              height: "100%",
            }}
          />
          <g id={`${gID}-mohs`} style={{opacity:"0"}}>
          {
            LateralLabel && (
              bilateral?(
              <g id="Blateral">
            <g id="lateral" transform={`translate(${transformBox.x} ${transformBox.y})`}>
              <text >
               {gID.split(':')[1][1]=='L'? mapLateralityLabel.data.l_abbreviation:mapLateralityLabel.data.r_abbreviation }
               </text>
            </g>
            <g id="lateral"   transform={`translate(${transformBox.x+transformBox.width} ${transformBox.y})`}>
            <text>
               {gID.split(':')[1][2]=='L'? mapLateralityLabel.data.l_abbreviation:mapLateralityLabel.data.r_abbreviation}
               </text>
            </g>
            </g>

              ):(
                <g id="lateral" transform={`translate(${transformBox.x} ${transformBox.y})`}>
                  <text>
                    {gID.split(':')[1][0]=='L'?mapLateralityLabel.data.l_abbreviation :mapLateralityLabel.data.r_abbreviation}
                    </text>
                </g>
              ) )}
          </g>
          <use
            xlinkHref={`#${pathId}`}
            style={{
              // transform: `translate(${-transformBox.x}px, ${-transformBox.y}px)`,
              height: "100%",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export function SVGRegionVisual({
  gID,
  pathId,
  pinId,
  color,
  HMAP_ID,
  opacity,
  pattern,
  name,
}) {
  const ref = useRef();
  const [transformBox, setTransformBox] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const gLayer = document.getElementById(gID);
    if (gLayer) {
      const { x, y, height, width } = gLayer.getBBox();
      setTransformBox({
        x,
        y,
        height,
        width,
      });
    }
  }, [gID]);

  return (
    //<div style={{ maxWidth:"300px" }}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      height={"100%"}
      maxHeight={"60vw"}
      
      display={"block"}
      style={{ overflow: "visible",maxWidth:"100px" }}
      viewBox={`${transformBox.x} ${transformBox.y} ${transformBox.width} ${transformBox.height}`}
      preserveAspectRatio='xMidYMid meet'>
      <use
        xlinkHref={`#${gID}`}
        style={{
          height: "1%",
          // aspectRatio: "16/9",
        }}
      />
      {pinId && (
        <use
          className='svg__visual__preview'
          xlinkHref={`#${pinId}`}
          style={{
            height: "1%",
            x: 0,
            y: 0,
            "--opacity-description": 0,
            // aspectRatio: "16/9",
          }}
        />
      )}

      {pathId && (
        <use
          xlinkHref={`#${pathId}`}
          style={{
            height: "1%",
            // aspectRatio: "16/9",
            fill:
              pattern === "dash"
                ? `url(#pattern-circles-${name})`
                : pattern === "dash_dash"
                ? `url(#pattern-checkers-${name})`
                : pattern === "dot"
                ? `url(#pattern-chevron-${name})`
                : color,
            "--opacity": opacity,
            "--stroke": "#fba70e",
            "--stroke-width": "8px",
            "--stroke-dash-array": "2,2",
            "--stroke-linejoin": "round",
          }}
          className={"svg-opacity"}
          ref={ref}
        />
      )}
    </svg>
    //</div>
  );
}

export const RegionPreview = ({
  listType,
  layerInfo,
  itemId,
  pathId,
  height,
  width,
}) => {
  const show = useSelector((state) => state.listStore.itemsMap[itemId].show);
  return (
    show &&
    (listType === LIST_TYPES.painted_distribution.name ? (
      <SVGRegionRenderer
        gID={layerInfo.D_ID}
        pathId={pathId}
        height={height}
        // hMapId={layerInfo.HMAP_ID}
        width={width}
      />
    ) : (
      <SVGRegionRendererWithPoint
        gID={layerInfo.D_ID}
        height={height}
        width={width}
        itemId={itemId}
      />
    ))
  );
};
