import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    IconButton,
    Modal,
    Tooltip,
    Typography,
} from "@material-ui/core"
import {
    Edit,
    ExpandMore,
    Print,
    Reorder,
    Visibility,
    VisibilityOff,
} from "@material-ui/icons"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUiData, setPinTitles } from "../../store/slices/translation"
import useTranslations from "../../hooks/useTranslations"
import { changeAttributeOfAList } from "../../store/slices/lists"
import Colors from "../ColorComponent/Colors"
import ChangePinNameModal from "./ChangePinNameModal"
import { useEffect } from "react"
import { useRef } from "react"

export const CommonListWrapper = ({
    title,
    inBracketTitle,
    target,
    OgTitle,
    changeTitle,
    setChangeTitle,
    listType,
    listSubtype,
    locked,
    color = "",
    visibility,
    listItemContainer,
    printButton = true,
    opacity = 1,
    pattern = "dash",
    backgroundColor = "blue",
    isBkgColor = true,
    extendedPalette = false,
}) => {
    const uiData = useSelector((state) => state.translation.uiData)
    const pinTitles = useSelector((state) => state.translation.pinTitles)

    const activeList = useSelector(
        (state) => state.listStore.activeItem.activeList
    )

    // const { uiData, setUiData, pinTitles, setPinTitles } = useTranslations();
    const dispatch = useDispatch()
    const onColorChange = useCallback(
        (newColor) => {
            dispatch(
                changeAttributeOfAList({
                    listType,
                    listSubtype,
                    name: "color",
                    value: newColor,
                })
            )
        },
        [dispatch, listType, listSubtype]
    )
    const onFgColorChange = useCallback(
        (newColor) => {
            dispatch(
                changeAttributeOfAList({
                    listType,
                    listSubtype,
                    name: "color",
                    value: newColor,
                })
            )
        },
        [dispatch, listType, listSubtype]
    )
    const onBkgColorChange = useCallback(
        (newColor) => {
            dispatch(
                changeAttributeOfAList({
                    listType,
                    listSubtype,
                    name: "backgroundColor",
                    value: newColor,
                })
            )
        },
        [dispatch, listType, listSubtype]
    )

    const onVisibilityChange = useCallback(
        (e) => {
            e.stopPropagation()
            dispatch(
                changeAttributeOfAList({
                    listType,
                    listSubtype,
                    name: "visibility",
                })
            )
        },
        [dispatch, listType, listSubtype]
    )

    const onLockChange = useCallback(
        (e) => {
            e.stopPropagation()

            dispatch(
                changeAttributeOfAList({
                    listType,
                    listSubtype,
                    name: "locked",
                })
            )
        },
        [dispatch, listType, listSubtype]
    )

    const onPrint = useCallback((e) => {
        e.stopPropagation()
    }, [])

    const onHash = useCallback((e) => {
        e.stopPropagation()
    }, [])

    const [open, setOpen] = useState(false)

    const onClickEdit = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // const [changeTitle, setChangeTitle] = useState(`${title}`)
    const [displayEditPin, setDisplayEditPin] = useState(false)

    const [expanded, setExpanded] = useState(true)
    const handleChange = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        if (!expanded) {
            setExpanded(listType === activeList ? true : false)
        }
    }, [activeList])

    const [bracketTitle, setBracketTitle] = useState("")

    useEffect(() => {
        setBracketTitle(inBracketTitle)
        if (inBracketTitle) setBracketTitle((prev) => `(${prev})`)
    }, [inBracketTitle])

    return (
        <Accordion expanded={expanded} onChange={handleChange} defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="app__mainBody__list__header"
                style={{ backgroundColor: "#0c27c8" }}
            >
                <div
                    style={{
                        display: "flex",
                        background: "#fff",
                        marginRight: 8,
                        border:
                            listType === "painted_distribution"
                                ? "2px solid white"
                                : "",
                    }}
                >
                    <Colors
                        color={color}
                        backgroundColor={backgroundColor}
                        foregroundColor={color}
                        containerStyles={{ opacity, marginRight: 0 }}
                        onColorChange={
                            listType !== "painted_distribution"
                                ? onColorChange
                                : null
                        }
                        listType={listType}
                        listSubtype={listSubtype}
                        locked={locked}
                        opacity={opacity}
                        pattern={pattern}
                        onBkgColorChange={onBkgColorChange}
                        onFgColorChange={onFgColorChange}
                        isBkgColor={isBkgColor}
                        extendedPalette={extendedPalette}
                    />
                </div>

                <div
                    onMouseOver={() => {
                        setDisplayEditPin(true)
                    }}
                    onMouseOut={() => {
                        setDisplayEditPin(false)
                    }}
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginRight: 5,
                    }}
                >
                    <Typography
                        className={"accordion-heading"}
                        style={{ flexGrow: 1 }}
                    >
                        {/* {title} {inBracketTitle && `(${inBracketTitle})`} */}
                        {changeTitle + (bracketTitle ? bracketTitle : "")}
                    </Typography>

                    <IconButton
                        // color={"primary"}
                        size={"small"}
                        onClick={onClickEdit}
                        style={{
                            opacity: displayEditPin ? 1 : 0,
                            transition: "opacity 0.5s",
                        }}
                    >
                        <Edit />
                    </IconButton>
                </div>

                {/* -------------Chnage Pin Modal-------- */}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div>
                        <ChangePinNameModal
                            setChangeTitle={setChangeTitle}
                            changeTitle={changeTitle}
                            target={target}
                            OgTitle={OgTitle}
                        />
                    </div>
                </Modal>

                {/* xxxxxxxxx Change Pin Modal xxxxxxxxxxx */}

                <div
                    style={{
                        marginLeft: "auto",
                    }}
                >
                    <Tooltip title={uiData.icon_BillingCodes_help.tr_text}>
                        <Button
                            className="app__mainBody__list__action__btns"
                            style={{
                                color: "white",
                                border: "solid 1px #fff",
                            }}
                            onClick={onHash}
                        >
                            {" "}
                            {"<$>"}{" "}
                        </Button>
                    </Tooltip>

                    <Button
                        className="app__mainBody__list__action__btns"
                        style={{
                            backgroundColor: "white",
                        }}
                        onClick={onPrint}
                    >
                        <Tooltip
                            title={
                                uiData.icon_PrintPathRequisition_help.tr_text
                            }
                        >
                            <Print color="primary" />
                        </Tooltip>
                    </Button>

                    <IconButton
                        className="app__mainBody__list__action__btns"
                        style={{
                            minWidth: "30px",
                            maxWidth: "30px",
                            marginRight: 0,
                        }}
                        onClick={onVisibilityChange}
                    >
                        {visibility ? (
                            <Tooltip
                                title={
                                    uiData.icon_VisibilityToggle_help.tr_text
                                }
                            >
                                <Visibility />
                            </Tooltip>
                        ) : (
                            <Tooltip
                                title={
                                    uiData.icon_VisibilityToggle_help.tr_text
                                }
                            >
                                <VisibilityOff />
                            </Tooltip>
                        )}
                    </IconButton>
                    <IconButton
                        className="app__mainBody__list__action__btns"
                        style={{
                            minWidth: "35px",
                            maxWidth: "35px",
                        }}
                        onClick={onLockChange}
                    >
                        {locked ? (
                            <Tooltip
                                title={uiData.icon_LockToggle_help.tr_text}
                            >
                                <div>
                                    {uiData?.label_ListHeader_Lock?.emoji_code}
                                </div>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                title={uiData.icon_LockToggle_help.tr_text}
                            >
                                <div>
                                    {
                                        uiData?.label_ListHeader_Unlock
                                            ?.emoji_code
                                    }
                                </div>
                            </Tooltip>
                        )}
                    </IconButton>
                </div>
                <Tooltip
                    title={uiData?.label_ListHeader_ReorderList_help?.tr_text}
                >
                    <Reorder
                        style={{
                            cursor: "move",
                            color: "#707070",
                            position: "absolute",
                            top: "50%",
                            right: "40px",
                            transform: "translateY(-50%)",
                        }}
                        className="sorting-handle"
                    />
                </Tooltip>
            </AccordionSummary>
            <AccordionDetails>{listItemContainer}</AccordionDetails>
        </Accordion>
    )
}
