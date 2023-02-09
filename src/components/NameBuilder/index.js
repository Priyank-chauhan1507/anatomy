import {
    Button,
    Checkbox,
    Chip, Grid, IconButton,
    TextField,
    Tooltip,
    Typography
} from "@material-ui/core"
import {
    Add,
    Help,
    HelpOutlined,
    RefreshOutlined,
    Reorder, Search, SettingsOutlined,
    Visibility,
    VisibilityOffOutlined
} from "@material-ui/icons"
// import { Autocomplete } from "@material-ui/lab";
import React, { useCallback, useContext, useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { TranslationContext } from "../../contexts/translation"
import CustomizedDialogs from "../Dialog/Dialog"
import { LabelRenderer as LabelRendererSNS } from "../SNSConfigurationModal"
import AutoComplete from "./AutoComplete"
// import { patientInfoString } from "../../App";
import GreyAccordion from "./GreyAccordion"
// import DiagnosisInfo from "../ICD/DiagnosisInfo";
import { useDispatch, useSelector } from "react-redux"
import { DEFAULT_SNS, SNS_RENDERER } from "../../constants/itemConstants"
import { LIST_TYPES } from "../../constants/listsConstants"
import {
    changeItemName,
    changeItemSNSOrder,
    changeItemSNSValue,
    changeItemSNSVisibility,
    resetItemSNS
} from "../../store/slices/lists"
import {
    closeNameBuilderModal,
    openICDModal,
    openPinDescriptionModal,
    toggleSNSModal
} from "../../store/slices/modals"
import { chooseList } from "../../utils/helpers"
import ItemDiagnosis from "../ListItemComponents/ItemDiagnosis"
import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy"
import { PinDescriptionRenderer } from "../ListsRenderer/ItemTemplates"
import PatientInfo from "../PatientInfo/PatientInfo"
import {
    SVGRegionRenderer, SVGRegionRendererWithPoint
} from "../SVGRegionRenderer"
import useToasterMessage from "../../hooks/useToasterMessage"

export const LabelRenderer = ({ help, label, style, pre, post }) => {
    // const labelRef = useRef();
    // useEffect(() => {
    //   labelRef.current = label;
    // }, []);
    return help ? (
        <span style={{ display: "flex", gap: 5 }}>
            <span style={style}>
                {pre}
                {label}
                {post}
            </span>
            <Tooltip title={help}>
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        marginTop: "2px",
                    }}
                >
                    <HelpOutlined fontSize={"small"} />
                </span>
            </Tooltip>
        </span>
    ) : (
        <span>
            <span style={style}>
                {pre}
                {label}
                {post}
            </span>
        </span>
    )
}

export const NameLine = ({
    id,
    isLabel = false,
    pre,
    post,
    label,
    value,
    strict,
    onChange,
    isArray,
    isEditable,
    style,
    max = Infinity,
    autoCompleteOptions,
    help = null,
    child,
    notAllowed,
    onChangeVisibilityOfChild,
    renderOption,
}) => {
    useEffect(() => { }, [label])

    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const [editIndex, setEditIndex] = useState(-1)
    const toaster = useToasterMessage();

    const handleChange = (newValue) => {
        if (isArray) {
            onChange(newValue.map(({ label, val }) => val))
        } else {
            onChange(newValue)
        }
    }

    const handleInputChange = (newValue) => {
        if (isArray) {
            if (editIndex === -1) {
                handleChange([
                    ...value,
                    { id: newValue, label: "", val: newValue },
                ])
            } else {
                const newArray = [...value]
                newArray[editIndex] = {
                    id: newValue,
                    val: newValue,
                    label: "",
                }
                handleChange(newArray)
            }
        } else {
            handleChange(newValue)
        }

        setInput("")
        setEditIndex(-1)
        setOpen(false)
    }
    if (isLabel)
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <Tooltip title={help}>
                    <Help />
                </Tooltip>
                <span>{label}</span>
            </div>
        )
    return (
        <>
            <CustomizedDialogs
                open={open}
                onClose={() => setOpen(false)}
                title={label}
                body={
                    <div style={{ width: 200 }}>
                        {autoCompleteOptions.length !== 0 ? (
                            <AutoComplete
                                label="Type here..."
                                value={input}
                                onChange={(value) => setInput(value)}
                                optionsList={autoCompleteOptions}
                                renderOption={renderOption}
                            />
                        ) : (
                            <TextField
                                label={"Type Here.."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        )}
                    </div>
                }
                footer={
                    <div>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => {
                                if (input) {
                                    handleInputChange(input)
                                } else {
                                    if (strict) {
                                        toaster(
                                            {message: "Please select any value from dropdown",
                                            type: 'info'}
                                        )
                                    } else {
                                        toaster({message: "Can't leave field blank", type: 'info'})
                                    }
                                }
                            }}
                        >
                            {editIndex === -1 ? "ADD" : "SAVE"}
                        </Button>
                    </div>
                }
            />

            {!isArray && isEditable ? (
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        marginTop: 4,
                        marginBottom: 4,

                        // overflow: "auto",
                        alignItems: "center",
                    }}
                    className={notAllowed ? "not-allowed-line" : ""}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title={help}>
                            <Help />
                        </Tooltip>
                    </div>
                    <span style={{ fontSize: 48 }}>{pre}</span>
                    <div style={{ flex: 1, padding: "10px 10px 0 10px" }}>
                        <TextField
                            value={value}
                            onChange={(e) => {
                                handleChange(e.target.value)
                            }}
                            //onChange={handleDefaultValueTextBox}
                            label={label}
                            fullWidth
                            size={"small"}
                            variant="outlined"
                        />
                    </div>
                    <span style={{ fontSize: 48 }}>{post}</span>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: "center",
                    }}
                    className={notAllowed ? "not-allowed-line" : ""}
                >
                    <div
                        style={{
                            display: "flex",
                            flex: "0 0 240px",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 6,
                        }}
                    >
                        <LabelRenderer
                            help={help}
                            label={label}
                            style={style}
                            pre={pre}
                            post={post}
                        />
                        {/* {isArray && isEditable && ( */}
                        <span>
                            <IconButton
                                color={"primary"}
                                onClick={() => {
                                    setInput("")
                                    setOpen(true)
                                }}
                                disabled={value?.length === max}
                                style={{ padding: 0 }}
                            >
                                {" "}
                                <Add />{" "}
                            </IconButton>
                        </span>
                        {/* )} */}
                        :
                    </div>

                    <div style={{ display: "flex", overflow: "auto" }}>
                        <span
                            style={{
                                marginLeft: 8,
                                fontSize: 20,
                                marginRight: 4,
                                color:
                                    style && style.color
                                        ? style.color
                                        : "black",
                            }}
                        >
                            {"  " + pre + " "}
                        </span>
                        {isArray && isEditable ? (
                            <ReactSortable
                                list={value}
                                setList={(newValue) => handleChange(newValue)}
                                animation={200}
                                style={{
                                    display: "flex",
                                    gap: 8,
                                    flex: 1,
                                    overflow: "auto",
                                    minWidth: 40,
                                }}
                                // delayOnTouchStart={true}
                                // delay={2}
                                handle=".sorting-handle"
                            >
                                {value.map(({ id, label }, index) => {
                                    return (
                                        <span
                                            className={"sorting-handle"}
                                            key={id}
                                            onClick={() => {
                                                setEditIndex(index)
                                                setInput(label)
                                                setOpen(true)
                                            }}
                                        >
                                            <Chip
                                                label={label}
                                                onDelete={() => {
                                                    const newList = [...value]
                                                    newList.splice(index, 1)
                                                    handleChange(newList)
                                                    // onChange(value.map(({id,label})=>label))
                                                }}
                                            />
                                        </span>
                                    )
                                })}
                            </ReactSortable>
                        ) : (
                            <span
                                style={{
                                    // cursor: "pointer",
                                    // minWidth: 40,
                                    ...style,

                                    whiteSpace: "nowrap",
                                }}
                                onClick={() => {
                                    // setEditIndex(4);
                                    // setOpen(true);
                                    // setInput(value);
                                }}
                            >
                                {isArray
                                    ? value?.map(({ label }) => label).join(" ")
                                    : value}
                            </span>
                        )}
                        <span
                            style={{
                                fontSize: 20,
                                color:
                                    style && style.color
                                        ? style.color
                                        : "black",
                            }}
                        >
                            {post + " "}
                        </span>
                    </div>
                </div>
            )}
            {child && (
                <LabelRendererSNS
                    help={child.help}
                    pre={child.pre}
                    post={child.post}
                    label={child.label}
                    style={child.style}
                    checked={child.visible}
                    isCheckboxVisible={!child.isCheckboxVisible}
                    onChange={onChangeVisibilityOfChild}
                    isChild
                />
            )}
        </>
    )
}

export default function NameBuilder({
    pinDetails,
    encounterDateTime,
    arNames,
}) {
    const {
        state: open,
        data: { itemId },
    } = useSelector((state) => state.modals.nameBuilderModal)
    const { listType, listSubtype, names, layerInfo, pathId } = useSelector((state) =>
        itemId
            ? state.listStore.itemsMap[itemId]
            : { listType: "", listSubtype: "", names: {}, layerInfo: {}, pathId: "" }
    )

    const dispatch = useDispatch()

    const sns = useSelector(
        (state) =>
            state.listStore.customSNS[itemId] ||
            (listType === LIST_TYPES.painted_distribution.name
                ? state.listStore.distributionSNS
                : state.listStore.globalSNS)
    )
    const { uiData, anatomicData, egztData, lateralityData } =
        useContext(TranslationContext)
    // const descriptions = useSelector((state) =>
    //     itemId ? state.listStore.itemsMap[itemId].descriptions : ["", "", ""]
    // )
    // const [desc, setDesc] = useState([])

    const [visibilityMap, setVisibilityMap] = useState(new Set())
    // useEffect(()=>{
    //   setDesc(descriptions)

    // },[descriptions])
    //   useEffect(() => {
    //     setDesc(descriptions)
    // }, [descriptions])
    useEffect(() => {
        const newVisibilityMap = new Set()
        sns.orderList.forEach(({ id, visible }) => {
            if (visible) {
                newVisibilityMap.add(id)
            }
        })
        setVisibilityMap(newVisibilityMap)
    }, [sns])

    const handleChange = useCallback(
        (value, name) => {
            if (name === DEFAULT_SNS.optional_separator.id) {
                dispatch(changeItemSNSValue({ itemId, id: name, value }))
            } else {
                dispatch(changeItemName({ name, value, itemId }))
            }
        },
        [dispatch, itemId]
    )

    const onChangeVisibility = useCallback(
        (index, newVisible, isChild = false) => {
            dispatch(
                changeItemSNSVisibility({
                    itemId,
                    isVisible: newVisible,
                    isChild,
                    index,
                })
            )
        },
        [itemId, dispatch]
    )
    const pinListSettings = useSelector((state) =>
        listType
            ? chooseList(state.listStore.lists, listType, listSubtype).attr
                .pinListSettings
            : {}
    )
    useEffect(() => {
        if (open) {
            dispatch(
                changeItemSNSVisibility({
                    itemId,
                    isVisible: pinListSettings?.use_enhanced_mod,
                    isChild: false,
                    index: 1,
                })
            )
        }
    }, [pinListSettings])


    const onChangeOrder = useCallback(
        (newOrderList) => {
            dispatch(changeItemSNSOrder({ itemId, newOrderList }))
        },
        [itemId, dispatch]
    )

    const getLabel = useCallback(
        (id, isChild = false) => {
            if (id === DEFAULT_SNS.anatomic_site.id) {
                return (
                    <span>
                        {uiData[DEFAULT_SNS.anatomic_site.translation_key]
                            ?.tr_text ||
                            DEFAULT_SNS.anatomic_site.default_label}
                        <a
                            href={`https://anatomymapper.com/terms/#${names.amid}`}
                            target={"_blank"}
                            rel={"noreferrer"}
                        >
                            ({names.amid})
                        </a>
                    </span>
                )
            } else {
                if (isChild) {
                    return (
                        <span>
                            {uiData[DEFAULT_SNS[id].child.translation_key]
                                ?.tr_text || ""}
                        </span>
                    )
                }
                return (
                    <span>
                        {uiData[DEFAULT_SNS[id].translation_key]?.tr_text ||
                            DEFAULT_SNS[id].default_label}
                    </span>
                )
            }
        },
        [names.amid, uiData]
    )

    const getHelp = useCallback(
        (id, isChild = false) => {
            if (isChild) {
                return (
                    uiData[DEFAULT_SNS[id].child.help.translation_key]
                        ?.tr_text || ""
                )
            }
            return uiData[DEFAULT_SNS[id].help.translation_key]?.tr_text
        },
        [uiData]
    )

    const getOptions = useCallback(
        (id) => {
            return SNS_RENDERER[id].getOptions
                ? SNS_RENDERER[id].getOptions({
                    uiData,
                    lateralityData,
                    anatomicData,
                })
                : []
        },
        [uiData, lateralityData, anatomicData]
    )

    const getOptionRenderer = useCallback(
        (id) => {
            return (val) => {
                if (SNS_RENDERER[id].renderLabel) {
                    return SNS_RENDERER[id].renderLabel(
                        { uiData, lateralityData, anatomicData },
                        val
                    )
                } else {
                    return val
                }
            }
        },
        [uiData, lateralityData, anatomicData]
    )

    const getValue = (id, snsIndex) => {
        if (DEFAULT_SNS[id].isArray && names[id]) {
            return names[id].map((val, i) => {
                return {
                    label: SNS_RENDERER[id].renderer(
                        { uiData, lateralityData, anatomicData },
                        names,
                        i,
                        sns.orderList[snsIndex],
                        { visibilityMeta: visibilityMap }
                    ),
                    val,
                    id: val,
                    index: i,
                }
            })
        } else {
            return SNS_RENDERER[id].renderer(
                { uiData, lateralityData, anatomicData },
                names,
                null,
                sns.orderList[snsIndex],
                { visibilityMeta: visibilityMap }
            )
        }
    }

    const onOpenDiagnosis = () => {
        dispatch(openICDModal({ itemId }))
    }

    const handleDescriptionClick = () => {
        dispatch(closeNameBuilderModal())
        dispatch(openPinDescriptionModal(itemId))
    }

    const color = useSelector((state) => {
        if (!itemId) return ""
        const { listType, listSubtype } = state.listStore.itemsMap[itemId]
        return chooseList(state.listStore.lists, listType, listSubtype).attr
            .color
    })

    return (
        uiData &&
        open && (
            <CustomizedDialogs
                open={open}
                onClose={() => {
                    dispatch(closeNameBuilderModal())
                }}
                title={
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6">
                            {uiData.label_NameBuilder_Title.tr_text}
                        </Typography>
                        &nbsp;
                        <Typography>
                            ({uiData.transtext_for.tr_text}{" "}
                            {listType === LIST_TYPES.painted_distribution.name
                                ? uiData.label_DistributionSegment.tr_text
                                : uiData.transtext_pin.tr_text}
                            )
                        </Typography>
                    </span>
                }
                body={
                    <div style={{ minWidth: 450, maxWidth: 600 }}>
                        <div
                            style={{
                                width: "100%",
                                textAlign: "center",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {/* <DiagnosisInfo
                  diagnosisData={pinDetails ? pinDetails.diagnosisData : null}
                /> */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginBottom: "20px",
                                    background: "rgba(139,182,189,.2)",
                                    borderRadius: 4,
                                    padding: 8,
                                    border: "1px solid rgb(139,182,189)",
                                    alignItems: "flex-start",
                                }}
                            >
                                <PatientInfo color={"#000"} />
                                <Grid container style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                }}>
                                    <IconButton
                                        onClick={onOpenDiagnosis}
                                        size={"small"}
                                    >
                                        <Search />
                                    </IconButton>
                                    <div style={{ width: "auto" }}>
                                        <ItemDiagnosis itemId={itemId} />
                                    </div>
                                </Grid>
                                {/* <IconButton onClick={onOpenDiagnosis}>
                                    <AddCircleOutline />
                                </IconButton> */}



                            </div>
                            <NameAndPinRendererWithHierarchy
                                itemId={itemId}
                                isNameEditable={false}
                            />
                            <div className="preview">
                                {listType ===
                                    LIST_TYPES.painted_distribution.name ? (
                                    <SVGRegionRenderer
                                        gID={layerInfo.D_ID}
                                        pathId={pathId}
                                        hMapId={layerInfo.HMAP_ID}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            height: "100%",
                                            position: "relative",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: "10px",
                                                fontWeight: "bold",
                                                color,
                                                cursor: "pointer",
                                            }}
                                            onClick={handleDescriptionClick}
                                        >
                                        </div>
                                        <SVGRegionRendererWithPoint
                                            gID={layerInfo.D_ID}
                                            itemId={itemId}
                                        />


                                    </div>
                                )}

                            </div>
                            <div style={{ textAlign: "left" }}>
                                <PinDescriptionRenderer
                                    itemId={itemId}
                                />
                            </div>

                            <div
                                style={{
                                    marginTop: 8,
                                    marginBottom: 8,
                                    textAlign: "right",
                                }}
                            >
                                <Tooltip
                                    title={
                                        uiData
                                            .label_NameBuilder_RestoreNameBuilderDefaultSequence_help
                                            .tr_text
                                    }
                                >
                                    <IconButton
                                        color={"primary"}
                                        onClick={() => {
                                            dispatch(
                                                resetItemSNS({
                                                    itemId,
                                                    egztData,
                                                    lateralityData,
                                                })
                                            )
                                        }}
                                        style={{ marginRight: 10, padding: 0 }}
                                    >
                                        <RefreshOutlined />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title={
                                        uiData.label_NameBuilder_OpenSNSEditor
                                            .tr_text
                                    }
                                >
                                    <IconButton
                                        color={"primary"}
                                        onClick={() => {
                                            dispatch(toggleSNSModal())
                                        }}
                                        style={{ padding: 0 }}
                                    >
                                        <SettingsOutlined />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <ReactSortable
                                list={sns.orderList}
                                setList={onChangeOrder}
                                animation={200}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    flex: 1,
                                    flexWrap: "wrap",
                                }}
                                delayOnTouchStart={true}
                                delay={2}
                                handle=".sorting-handle"
                            >
                                {sns.orderList.map(
                                    (
                                        {
                                            id,
                                            pre,
                                            post,
                                            isArray,
                                            isLabel,
                                            isEditable,
                                            strict,
                                            style,
                                            max,
                                            alwaysSelected,
                                            visible,
                                            child,
                                            notAllowed = false,
                                        },
                                        index
                                    ) => {
                                        return (
                                            <div
                                                style={{
                                                    display: notAllowed
                                                        ? "none"
                                                        : "flex",
                                                    alignItems: "center",
                                                    gap: 10,
                                                    width: "100%",
                                                }}
                                                className={{}}
                                                key={id}
                                            >
                                                <div>
                                                    <Checkbox
                                                        color={"primary"}
                                                        icon={
                                                            <VisibilityOffOutlined />
                                                        }
                                                        checkedIcon={
                                                            <Visibility />
                                                        }
                                                        checked={visible}
                                                        disabled={notAllowed}
                                                        style={{
                                                            visibility: Boolean(
                                                                alwaysSelected
                                                            )
                                                                ? "hidden"
                                                                : "visible",
                                                            padding: 0,
                                                        }}
                                                        onChange={(e) =>
                                                            onChangeVisibility(
                                                                index,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <NameLine
                                                        id={id}
                                                        key={id}
                                                        pre={pre}
                                                        post={post}
                                                        notAllowed={notAllowed}
                                                        value={getValue(
                                                            id,
                                                            index
                                                        )}
                                                        isLabel={isLabel}
                                                        isArray={isArray}
                                                        isEditable={isEditable}
                                                        label={getLabel(id)}
                                                        help={getHelp(id)}
                                                        style={style}
                                                        strict={strict}
                                                        autoCompleteOptions={getOptions(
                                                            id
                                                        )}
                                                        renderOption={getOptionRenderer(
                                                            id
                                                        )}
                                                        max={max}
                                                        onChange={(value) => {
                                                            handleChange(
                                                                value,
                                                                id
                                                            )
                                                        }}
                                                        visible={visible}
                                                        child={
                                                            child
                                                                ? {
                                                                    ...child,
                                                                    label: getLabel(
                                                                        id,
                                                                        true
                                                                    ),
                                                                    help: getHelp(
                                                                        id,
                                                                        true
                                                                    ),
                                                                }
                                                                : null
                                                        }
                                                        onChangeVisibilityOfChild={(
                                                            e
                                                        ) =>
                                                            onChangeVisibility(
                                                                index,
                                                                e.target
                                                                    .checked,
                                                                true
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <IconButton
                                                        className={
                                                            "sorting-handle"
                                                        }
                                                        style={{
                                                            cursor: "move",
                                                            padding: 0,
                                                        }}
                                                    >
                                                        <Reorder />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </ReactSortable>
                        </div>
                        <GreyAccordion itemId={itemId} />
                    </div>
                }
                footer={null}
            />
        )
    )
}
