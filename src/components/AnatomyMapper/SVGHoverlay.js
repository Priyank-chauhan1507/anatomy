import { Box, Popper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { innerLayerColors } from ".";
import useTranslations from "../../hooks/useTranslations";
import NameRenderer from "../NameRenderer";

const useStyles = makeStyles(() => ({
  activePath: {
    fill: "rgb(141, 235, 137) !important",
    opacity: "1 !important",
    zIndex: 1300,
  },
  activePathHierarchy: {
    fill: "rgba(255, 0, 0, 0.7) !important",
    opacity: "1 !important",
    zIndex: 1301,
  },
  label: {
    background: "red",
    margin: "1vw",
    borderRadius: "50%",
  },
  container: {
    borderRadius: "10px",
    zIndex: 1300,
    padding: "10px",
    boxShadow: "0 2px 2px rgba(0,0,0,.2)",
    overflow: "auto",
    // position: "fixed",
    position: "absolute",
    border: "1px solid #999",
    // top: 380,
    // left: 10,
    transition: "all .4s",
  },
}));

const Circle = ({ size, color }) => {
  return (
    <span
      style={{
        borderRadius: "50%",
        height: size,
        width: size,
        backgroundColor: "currentcolor",
        display: "block",
        color,
      }}></span>
  );
};

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { x: rect.top + scrollTop, y: rect.left + scrollLeft };
}
function getColorLegendPos(id) {
  const el = document.getElementById(id);
  var pos = { bottom: 0, left: 10 };
  if (el) {
    const { x, y } = offset(el);
    if (x > 380 && y < 500) {
      pos = { top: 0, right: 10 };
    }
  }

  return pos; //default pos
}
export default function SVGHoverlay({
  innerLayers,
  showHierarchy,
  activePathId,
  sns,
  activeEGZ,
  activeHoverElement,
  hideToolTip,
  pinListSettings,
}) {
  const classes = useStyles();
  const {
    correspondingColorText,
    semiTransparentBackgroud,
    indentAnatomicSite,
    showParentAtTop,
  } = useSelector((state) => state.userSettings.colorCodedLegendSettings);

  const { anatomicData } = useTranslations();

  return !showHierarchy ? (
    <>
      <HoverToolTip
        activeEGZ={activeEGZ}
        activeHoverElement={activeHoverElement}
        sns={sns}
        hideToolTip={hideToolTip}
        pinListSettings={pinListSettings}
      />
    </>
  ) : (
    <div
      className={classes.container}
      style={{
        ...getColorLegendPos(activePathId),
        opacity: activePathId ? 1 : 0,
        background: semiTransparentBackgroud
          ? "rgba(255,255,255,.6)"
          : "rgba(255,255,255,1)",
        display: "flex",
        zIndex: "10000",
        flexDirection: showParentAtTop ? "column-reverse" : "column",
      }}>
      <div style={{ marginBottom: 8 }}>
        <span
          style={{
            color: correspondingColorText
              ? !showHierarchy
                ? "rgb(141, 235, 137)"
                : "rgb(255, 0,0)"
              : "black",
            fontSize: 14,
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}>
          {activeEGZ && activeEGZ.egz.amid && indentAnatomicSite
            ? Array.from(
                {
                  length:
                    anatomicData[activeEGZ.egz.amid].hierarchical_level || 0,
                },
                (_, i) => <>&nbsp;</>
              )
            : " "}
          <Circle
            size={14}
            color={!showHierarchy ? "rgb(141, 235, 137)" : "rgb(255, 0,0)"}
          />
          {activePathId && (
            <NameRenderer
              noEdit
              sns={sns}
              parentComponent='colorCodedLegend'
              names={activeEGZ.names}
              pinListSettings={pinListSettings}
            />
          )}
        </span>
      </div>
      <div
        style={{
          fontSize: 12,
          display: "flex",
          flexDirection: showParentAtTop ? "column-reverse" : "column",
        }}>
        {innerLayers.map((item, index) => {
          return (
            <span
              style={{
                color: correspondingColorText
                  ? innerLayerColors[index].color
                  : "black",
                backgroundColor: correspondingColorText
                  ? innerLayerColors[index].bg
                  : "",
                display: "flex",
                gap: 4,
              }}
              key={item.pathId}>
              {/* <div style={{ height: 100 }}>
                <SVGRegionVisual
                  gID={item.layerInfo.D_ID}
                  pathId={item.pathId}
                  color={"yellow"}
                />
              </div> */}
              {indentAnatomicSite
                ? Array.from(
                    {
                      length:
                        anatomicData[item.egz.amid]?.hierarchical_level || 0,
                    },
                    (_, i) => <>&nbsp;</>
                  )
                : " "}
              <Circle size={12} color={innerLayerColors[index].color} />

              <NameRenderer
                noEdit
                sns={sns}
                parentComponent='colorCodedLegend'
                names={item.names}
                pinListSettings={pinListSettings}
              />
              {/* <EGZInfo egz={id.egz.egz} deviation={id.egz.deviation} /> */}
            </span>
          );
        })}
      </div>
      <HoverToolTip
        activeEGZ={activeEGZ}
        activeHoverElement={activeHoverElement}
        sns={sns}
        hideToolTip={hideToolTip}
        pinListSettings={pinListSettings}
      />
      {/* {ContextMenu For Pin Selection} */}
    </div>
  );
}

function HoverToolTip({ activeHoverElement, activeEGZ, sns, pinListSettings }) {
  return (
    <Popper
      id={"popper-hover-svg"}
      open={Boolean(activeHoverElement)}
      style={{ zIndex: 1600 }}
      anchorEl={activeHoverElement}
      placement='bottom'
      keepMounted={false}>
      <Box
        style={{
          backgroundColor: "rgba(0,0,0,.6)",
          color: "#fff",
          borderRadius: 8,
          border: "1px solid #eee",
          padding: 8,
          boxShadow: "2px 2px 2px rgba(0,0,0,.2)",
          // width: "min-content",
          // maxWidth: "95vw",
        }}>
        <NameRenderer
          names={activeEGZ?.names}
          sns={sns}
          noEdit
          parentComponent={"tooltip"}
          pinListSettings={pinListSettings}
        />
      </Box>
    </Popper>
    // </ClickAwayListener>
  );
}
