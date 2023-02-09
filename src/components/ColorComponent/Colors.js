import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { chooseList } from "../../utils/helpers"
import { SketchPicker } from "react-color"
import CloseIcon from "@material-ui/icons/Close"
import Popover from "@material-ui/core/Popover"
import "./color.css"
import { IconButton } from "@material-ui/core"
import HelpIcon from "@material-ui/icons/Help"
import { Help, HelpOutline } from "@material-ui/icons"
import { Switch, Tooltip, TextField, MenuItem, Grid } from "@material-ui/core"
import useTranslations from "../../hooks/useTranslations"
import { changeAttributeOfAList } from "../../store/slices/lists"
import { REGION_PATTERNS } from "../../constants/itemConstants"
import { getPinShape } from "../../utils/pinUtils"
import { colourNameToHex, DarkOrLight } from "../../utils/colourNameToHex"
import useToasterMessage from "../../hooks/useToasterMessage"

const patterns = Object.values(REGION_PATTERNS)

function Control({ label, control }) {
    return (
        <span style={{ display: "flex", alignItems: "center" }}>
            {label && <span className="actionText">{label}</span>}

            <span>{control}</span>
        </span>
    )
}

const Colors = ({
    color,
    foregroundColor,
    backgroundColor,
    containerStyles = {},
    onColorChange,
    opacity,
    pattern,
    listType,
    listSubtype,
    locked,
    onFgColorChange,
    onBkgColorChange,
    isBkgColor,
    extendedPalette = false,
}) => {
    const [element, setElement] = useState(null)
    const [shapeColor, setShapeColor] = useState(null)

    const handleClick = (event) => {
        event.stopPropagation()

        setElement(event.currentTarget)
    }

    const shape = useSelector(
        (state) =>
            chooseList(state.listStore.lists, listType, listSubtype).attr.shape
    )
    const handleClose = (e) => {
        e.stopPropagation()
        setElement(null)
    }
    const dispatch = useDispatch()
    const { uiData } = useTranslations()

    const listSubtypeTrText =
        listSubtype === "dermatitis_nos"
            ? uiData.toolTitle_Dermatitis.tr_text
            : listSubtype === "psoriasis"
            ? uiData.toolTitle_Psoriasis.tr_text
            : listSubtype === "eczema"
            ? uiData.toolTitle_Eczema.tr_text
            : listSubtype === "seborrheic_dermatitis"
            ? uiData.toolTitle_SeborrheicDermatitis.tr_text
            : uiData.toolTitle_CustomLookup.tr_text

    const toaster = useToasterMessage()
    const onChangeAttributeOfAList = useCallback(
        (e) => {
            if (locked) {
                toaster({
                    message: uiData.alert_ListLocked.tr_text,
                    type: "info",
                })
                return
            }
            dispatch(
                changeAttributeOfAList({
                    listType,
                    listSubtype,
                    name: e.target.name,
                    value: e.target.value,
                })
            )
        },
        [dispatch, listType, listSubtype, locked, uiData]
    )

    useEffect(() => {
        setShapeColor(foregroundColor)
    }, [foregroundColor])

    const options = new Array(10)
        .fill(0.1)
        .map((v, index) => (v + index * 0.1).toFixed(1))

    const leftItems = [
        {
            label: "Opacity",
            control: (
                <TextField
                    value={opacity}
                    type={"number"}
                    inputMode={"decimal"}
                    name={"opacity"}
                    variant={"outlined"}
                    onChange={onChangeAttributeOfAList}
                    size={"small"}
                    style={{ opacity: locked ? "0.5" : "" }}
                    select
                    fullWidth={false}
                >
                    {options.map((v) => {
                        return (
                            <MenuItem key={v} value={v}>
                                {v}
                            </MenuItem>
                        )
                    })}
                </TextField>
            ),
        },
        {
            label: "Pattern",
            control: (
                <TextField
                    select
                    value={pattern}
                    size={"small"}
                    variant={"outlined"}
                    name={"pattern"}
                    style={{ opacity: locked ? "0.5" : "" }}
                    onChange={onChangeAttributeOfAList}
                >
                    {patterns.map(({ name, label }) => {
                        return (
                            <MenuItem key={name} value={name}>
                                {label}
                            </MenuItem>
                        )
                    })}
                </TextField>
            ),
        },
    ]

    return (
        <div
            className="color-picker-container"
            style={{
                backgroundColor:
                    !extendedPalette || pattern === "no_pattern"
                        ? foregroundColor
                        : null,
                ...containerStyles,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {listType !== "painted_distribution" &&
                getPinShape(shape, shapeColor)}
            {extendedPalette ? (
                pattern !== "no_pattern" ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {pattern === "dash" ? (
                            <svg
                                width="100%"
                                height="24px"
                                opacity={opacity}
                                style={{
                                    border: isBkgColor
                                        ? `1px solid ${backgroundColor}`
                                        : null,
                                }}
                            >
                                <pattern
                                    id={`pattern-circles-${listSubtype}`}
                                    x="0"
                                    y="0"
                                    width="10"
                                    height="10"
                                    patternUnits="userSpaceOnUse"
                                >
                                    {isBkgColor ? (
                                        <rect
                                            x="0"
                                            y="0"
                                            width="100%"
                                            height="100%"
                                            fill={backgroundColor}
                                        ></rect>
                                    ) : null}
                                    <circle
                                        cx="4"
                                        cy="4"
                                        r="4"
                                        fill={foregroundColor}
                                    />
                                </pattern>
                                <rect
                                    x="0"
                                    y="0"
                                    width="100px"
                                    height="100px"
                                    fill={`url(#pattern-circles-${listSubtype})`}
                                />
                            </svg>
                        ) : null}
                        {pattern === "dash_dash" ? (
                            <svg
                                width="100%"
                                height="24px"
                                opacity={opacity}
                                style={{
                                    border: isBkgColor
                                        ? `1px solid ${backgroundColor}`
                                        : null,
                                }}
                            >
                                <pattern
                                    id={`pattern-checkers-${listSubtype}`}
                                    x="0"
                                    y="0"
                                    width="20"
                                    height="20"
                                    patternUnits="userSpaceOnUse"
                                >
                                    {isBkgColor ? (
                                        <rect
                                            x="0"
                                            y="0"
                                            width="100%"
                                            height="100%"
                                            fill={backgroundColor}
                                        ></rect>
                                    ) : null}
                                    <rect
                                        class="checker"
                                        fill={foregroundColor}
                                        x="0"
                                        width="10"
                                        height="10"
                                        y="0"
                                    ></rect>
                                    <rect
                                        class="checker"
                                        fill={foregroundColor}
                                        x="10"
                                        width="10"
                                        height="10"
                                        y="10"
                                    ></rect>
                                </pattern>
                                <rect
                                    x="0"
                                    y="0"
                                    width="100px"
                                    height="100px"
                                    fill={`url(#pattern-checkers-${listSubtype})`}
                                />
                            </svg>
                        ) : null}
                        {pattern === "dot" ? (
                            <svg
                                width="100%"
                                height="24px"
                                opacity={opacity}
                                style={{
                                    border: isBkgColor
                                        ? `1px solid ${backgroundColor}`
                                        : null,
                                }}
                            >
                                <pattern
                                    id={`pattern-chevron-${listSubtype}`}
                                    x="0"
                                    y="0"
                                    patternUnits="userSpaceOnUse"
                                    width="10"
                                    height="20"
                                    viewBox="0 0 10 18"
                                >
                                    {isBkgColor ? (
                                        <rect
                                            x="0"
                                            y="0"
                                            width="100%"
                                            height="100%"
                                            fill={backgroundColor}
                                        ></rect>
                                    ) : null}

                                    <g id="chevron">
                                        <path
                                            fill={foregroundColor}
                                            class="left"
                                            d="M0 0l5 3v5l-5 -3z"
                                        ></path>
                                        <path
                                            fill={foregroundColor}
                                            class="right"
                                            d="M10 0l-5 3v5l5 -3"
                                        ></path>
                                    </g>
                                    <use x="0" y="9" xlinkHref="#chevron"></use>
                                </pattern>

                                <rect
                                    x="0"
                                    y="0"
                                    width="100px"
                                    height="100px"
                                    fill={`url(#pattern-chevron-${listSubtype})`}
                                />
                            </svg>
                        ) : null}
                    </div>
                ) : null
            ) : null}
            <div className="color-picker-overlay" onClick={handleClick}></div>

            {!extendedPalette ? (
                <Popover
                    open={element != null}
                    anchorEl={element}
                    onClose={handleClose}
                >
                    <div
                        className="color-picker"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <IconButton onClick={handleClose}>
                            <CloseIcon
                                className="color-picker-close"
                                fontSize="small"
                            />
                        </IconButton>
                        <SketchPicker
                            disableAlpha={true}
                            color={color}
                            onChangeComplete={(color, e) => {
                                e.stopPropagation()
                                onColorChange(color.hex, e)
                            }}
                        />
                    </div>
                </Popover>
            ) : (
                <Popover
                    open={element != null}
                    anchorEl={element}
                    onClose={handleClose}
                >
                    <div className="color-picker">
                        <div style={{ float: "left", marginLeft: "10px" }}>
                            {listSubtypeTrText}
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            <div>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item xs={2}>
                                        <Tooltip
                                            title="Select Foreground Color"
                                            arrow
                                            enterTouchDelay={30}
                                        >
                                            <HelpIcon
                                                style={{ cursor: "pointer" }}
                                                fontSize="small"
                                            />
                                        </Tooltip>
                                    </Grid>

                                    <Grid item xs>
                                        Foreground Color
                                    </Grid>

                                    <Grid item>
                                        <IconButton onClick={handleClose}>
                                            <CloseIcon
                                                className="color-picker-close"
                                                fontSize="small"
                                            />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </div>

                            <SketchPicker
                                disableAlpha={true}
                                color={foregroundColor}
                                onChangeComplete={(color, e) => {
                                    e.stopPropagation()
                                    onFgColorChange(color.hex, e)
                                }}
                            />
                        </div>
                        {pattern !== "no_pattern" ? (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                            >
                                <div style={{ padding: "10px 0px 10px 0px" }}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-evenly"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item xs={2}>
                                            <Tooltip
                                                title="Select Background Color"
                                                arrow
                                                enterTouchDelay={30}
                                            >
                                                <HelpIcon
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    fontSize="small"
                                                />
                                            </Tooltip>
                                        </Grid>

                                        <Grid item>
                                            <Switch
                                                color="primary"
                                                checked={isBkgColor}
                                                onChange={() => {
                                                    dispatch(
                                                        changeAttributeOfAList({
                                                            listType,
                                                            listSubtype,
                                                            name: "isBkgColor",
                                                            value: !isBkgColor,
                                                        })
                                                    )
                                                }}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item>Background Color</Grid>
                                    </Grid>
                                </div>
                                {isBkgColor ? (
                                    <SketchPicker
                                        disableAlpha={true}
                                        color={backgroundColor}
                                        onChangeComplete={(color, e) => {
                                            e.stopPropagation()
                                            onBkgColorChange(color.hex, e)
                                        }}
                                    />
                                ) : null}
                            </div>
                        ) : null}

                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="space-evenly"
                                className="opacityPattern"
                            >
                                {leftItems.map(({ label, id, control }) => {
                                    return (
                                        <Grid item>
                                            <Control
                                                key={id}
                                                label={label}
                                                control={control}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </div>

                        {pattern !== "no_pattern" ? (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                style={{ padding: "10px 0px 10px 0px" }}
                            >
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                margin: "0px 10px 0px 10px",
                                            }}
                                        >
                                            <Tooltip
                                                title="Preview Pattern"
                                                arrow
                                                enterTouchDelay={30}
                                            >
                                                <HelpIcon
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    fontSize="small"
                                                />
                                            </Tooltip>
                                            <span
                                                style={{ paddingLeft: "10px" }}
                                            >
                                                Pattern Preview:
                                            </span>
                                        </div>
                                    </Grid>

                                    <Grid item>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {pattern === "dash" ? (
                                                <svg
                                                    width="100px"
                                                    height="100px"
                                                    opacity={opacity}
                                                    style={{
                                                        border: isBkgColor
                                                            ? `1px solid ${backgroundColor}`
                                                            : null,
                                                        backgroundColor:
                                                            isBkgColor
                                                                ? backgroundColor
                                                                : null,
                                                    }}
                                                >
                                                    <pattern
                                                        id="pattern-circles"
                                                        x="0"
                                                        y="0"
                                                        width="10"
                                                        height="10"
                                                        patternUnits="userSpaceOnUse"
                                                    >
                                                        <circle
                                                            cx="5"
                                                            cy="5"
                                                            r="5"
                                                            fill={
                                                                foregroundColor
                                                            }
                                                        />
                                                    </pattern>
                                                    <rect
                                                        x="0"
                                                        y="0"
                                                        width="100px"
                                                        height="100px"
                                                        fill="url(#pattern-circles)"
                                                    />
                                                </svg>
                                            ) : null}
                                            {pattern === "dash_dash" ? (
                                                <svg
                                                    width="100px"
                                                    height="100px"
                                                    opacity={opacity}
                                                    style={{
                                                        border: isBkgColor
                                                            ? `1px solid ${backgroundColor}`
                                                            : null,
                                                        backgroundColor:
                                                            isBkgColor
                                                                ? backgroundColor
                                                                : null,
                                                    }}
                                                >
                                                    <pattern
                                                        id="pattern-checkers"
                                                        x="0"
                                                        y="0"
                                                        width="20"
                                                        height="20"
                                                        patternUnits="userSpaceOnUse"
                                                    >
                                                        <rect
                                                            class="checker"
                                                            fill={
                                                                foregroundColor
                                                            }
                                                            x="0"
                                                            width="10"
                                                            height="10"
                                                            y="0"
                                                        ></rect>
                                                        <rect
                                                            class="checker"
                                                            fill={
                                                                foregroundColor
                                                            }
                                                            x="10"
                                                            width="10"
                                                            height="10"
                                                            y="10"
                                                        ></rect>
                                                    </pattern>
                                                    <rect
                                                        x="0"
                                                        y="0"
                                                        width="100px"
                                                        height="100px"
                                                        fill="url(#pattern-checkers)"
                                                    />
                                                </svg>
                                            ) : null}
                                            {pattern === "dot" ? (
                                                <svg
                                                    width="100px"
                                                    height="100px"
                                                    opacity={opacity}
                                                    style={{
                                                        border: isBkgColor
                                                            ? `1px solid ${backgroundColor}`
                                                            : null,
                                                        backgroundColor:
                                                            isBkgColor
                                                                ? backgroundColor
                                                                : null,
                                                    }}
                                                >
                                                    <pattern
                                                        id="pattern-chevron"
                                                        x="0"
                                                        y="0"
                                                        patternUnits="userSpaceOnUse"
                                                        width="10"
                                                        height="20"
                                                        viewBox="0 0 10 18"
                                                    >
                                                        <g id="chevron">
                                                            <path
                                                                fill={
                                                                    foregroundColor
                                                                }
                                                                class="left"
                                                                d="M0 0l5 3v5l-5 -3z"
                                                            ></path>
                                                            <path
                                                                fill={
                                                                    foregroundColor
                                                                }
                                                                class="right"
                                                                d="M10 0l-5 3v5l5 -3"
                                                            ></path>
                                                        </g>
                                                        <use
                                                            x="0"
                                                            y="9"
                                                            xlinkHref="#chevron"
                                                        ></use>
                                                    </pattern>

                                                    <rect
                                                        x="0"
                                                        y="0"
                                                        width="100px"
                                                        height="100px"
                                                        fill="url(#pattern-chevron)"
                                                    />
                                                </svg>
                                            ) : null}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        ) : null}
                    </div>
                </Popover>
            )}
        </div>
    )
}

export default Colors
