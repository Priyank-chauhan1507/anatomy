import { Tooltip } from "@material-ui/core"
import { UndoOutlined } from "@material-ui/icons"
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import selectDistSeg from "../../assets/PinToDistSegment.svg"
import selectPin from "../../assets/select-pin2.svg"
import appLogo from "../../assets/svg/AnatomyMapperLogoWL.svg"
import useTranslations from "../../hooks/useTranslations"
import { setMapContext } from "../../store/slices/app"
import { undoPin, setUndoContext } from "../../store/slices/lists"
import OutsideClickHandler from "react-outside-click-handler"
import "./Toolset.css"

const Toolset = ({
    tools,
    selectedToolIndex,
    onChange,
    navbar,
    quickUndo,
    undoCanvas,
    setUndoCanvas,
}) => {
    const dispatch = useDispatch()
    const mapContext = useSelector((state) => state.app.mapContext)
    const undoContext = useSelector((state) => state.listStore.undoContext)
    const itemsMap = useSelector((state) => state.listStore.itemsMap)
    const undoHistory = useSelector((state) => state.listStore.undoHistory)
    // const [component, setComponent] = useState(1);
    //eslint-disable-next-line
    const [width, setWidth] = useState(window.innerWidth)
    //eslint-disable-next-line
    const [height, setHeight] = useState(window.innerHeight)
    const updateDimensions = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }
    const { uiData } = useTranslations()
    useEffect(() => {
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])
    // ${width<1050?`toolset__fixed${index}`:""}

    return (
        <>
            <div className="app__nav__logo">
                <img src={appLogo} alt="Logo" />
            </div>
            {navbar}
            <OutsideClickHandler
                onOutsideClick={() => {
                    dispatch(
                        setUndoContext({
                            navbar: false,
                            sketch: undoContext.sketch,
                        })
                    )
                }}
            >
                <div
                    className="toolset__flex toolset__body"
                    onMouseOver={() => {
                        dispatch(
                            setUndoContext({
                                navbar: true,
                                sketch: undoContext.sketch,
                            })
                        )
                    }}
                >
                    <div className="toolset__starttool">
                        <div
                            style={{
                                background:
                                    mapContext === "pin_select" ||
                                    mapContext === "region_select" ||
                                    mapContext === "pin_drag" ||
                                    mapContext === "region_drag"
                                        ? "#00f"
                                        : "",
                            }}
                        >
                            {selectedToolIndex === 0 && (
                                <Tooltip
                                    title={uiData.icon_SelectPin_help?.tr_text}
                                >
                                    <img
                                        src={selectPin}
                                        style={{
                                            width: "30px",
                                            height: "26px",
                                            objectFit: "contain",
                                        }}
                                        alt=""
                                        onClick={() => {
                                            dispatch(
                                                setMapContext("pin_select")
                                            )
                                        }}
                                    />
                                </Tooltip>
                            )}

                            {selectedToolIndex === 1 && (
                                <Tooltip
                                    title={
                                        uiData.icon_SelectDistSeg_help?.tr_text
                                    }
                                >
                                    <img
                                        src={selectDistSeg}
                                        style={{
                                            width: "30px",
                                            height: "26px",
                                            objectFit: "contain",
                                        }}
                                        alt=""
                                        onClick={() => {
                                            dispatch(
                                                setMapContext("region_select")
                                            )
                                        }}
                                    />
                                </Tooltip>
                            )}
                        </div>
                        {(undoContext.sketch || undoContext.navbar) &&
                        undoHistory.length > 0 ? (
                            <div
                                onClick={() => {
                                    dispatch(undoPin())
                                }}
                                // ref={wrapperRef}
                                // onClick={() => { }}
                                style={{ cursor: "pointer", padding: "2%" }}
                            >
                                <Tooltip
                                    title={uiData.icon_QuickUndo_help?.tr_text}
                                >
                                    <UndoOutlined />
                                </Tooltip>
                            </div>
                        ) : (
                            <div
                                style={{
                                    color: "grey",
                                    cursor: "pointer",
                                    padding: "2%",
                                }}
                            >
                                <Tooltip
                                    title={uiData.icon_QuickUndo_help?.tr_text}
                                >
                                    <UndoOutlined />
                                </Tooltip>
                            </div>
                        )}
                    </div>

                    <div className="toolset__flex">
                        {tools.map(({ icon, component, id }, index) => {
                            let tooltipData = ""
                            if (id === "Pin Tools")
                                tooltipData = uiData.icon_PinTools_help?.tr_text
                            else if (id === "Distribution Tools")
                                tooltipData =
                                    uiData.icon_DistPainter_help?.tr_text
                            else if (id === "Create Tools")
                                tooltipData =
                                    uiData.icon_CosmeticTools_help?.tr_text
                            else
                                tooltipData =
                                    uiData.icon_SurgeryTools_help?.tr_text

                            return (
                                <Fragment key={id}>
                                    <div
                                        className={`toolset__tool ${
                                            index === selectedToolIndex &&
                                            mapContext === "list"
                                                ? `toolset__tool__selected `
                                                : `toolset__tool__notselected `
                                        } `}
                                        onClick={() => onChange(index)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Tooltip title={tooltipData}>
                                            <div>{icon}</div>
                                        </Tooltip>
                                        <div>
                                            {index === selectedToolIndex ? (
                                                <ArrowRightIcon />
                                            ) : (
                                                <ArrowLeftIcon />
                                            )}
                                        </div>
                                    </div>
                                    {index === selectedToolIndex && (
                                        <div
                                            className="toolset__tool__com"
                                            style={{ paddingRight: 12 }}
                                        >
                                            {component}
                                        </div>
                                    )}
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
            </OutsideClickHandler>
        </>
    )
}

export default Toolset
