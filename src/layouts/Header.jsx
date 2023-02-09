import {
    Button,
    FormControlLabel,
    IconButton,
    Menu,
    MenuItem,
    Popover,
    Tooltip,
} from "@material-ui/core"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import Switch from "@material-ui/core/Switch"
import {
    Create,
    FormatPaintOutlined,
    GetApp,
    HelpOutline,
    Help,
    Language,
    LocationOn,
    MoreVert,
    PriorityHigh,
    Publish,
} from "@material-ui/icons"
import { withStyles } from "@material-ui/styles"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Broom from "../assets/svg/sweeper-cleaning.svg"
import AccordionToolset from "../components/AccordianToolset/Toolset"
import ExportTextListModal from "../components/ExportTextListModal/index"
import ExportZipModal from "../components/ExportZipModal"
import ListSelectionBar from "../components/ListSelectionBar"
import SplitButton from "../components/SplitButton/SplitButton"
import {
    CLEAR_ACTIONS,
    EXPORT_ACTIONS,
    LOAD_ACTIONS,
} from "../constants/settingsConstants"
import { useExport } from "../hooks/useExport"
import useTranslations from "../hooks/useTranslations"
import { clearListsOrder, toggleDistributionMode } from "../store/slices/lists"
import {
    toggleColorCodedLegendModal,
    toggleExportTextListModal,
    toggleExportZipModal,
    toggleSiteNameToCodeTranslatorModal,
    toggleStringToNameTranslatorModal,
} from "../store/slices/modals"
import {
    changeGeneralSettings,
    changeMapSettings,
    clearEncounterInfo,
    clearPatientInfo,
    clearUserSettings,
    toggleHierarchy,
} from "../store/slices/userSettings"

import "../index.css"
import { setMapContext } from "../store/slices/app"
import { downloadMainMap } from "../utils/exportUtils/pdf"
import store from "../store"
import { fetchDiagnosisData } from "../hooks/useDiagnosis"
import { LIST_TYPES } from "../constants/listsConstants"
import { chooseList, getPatternId } from "../utils/helpers"
import { getPatterns } from "../utils/exportUtils/root-svg"

const MapSwitch = withStyles({
    switchBase: {
        color: `#afb6e0`,
        "&$checked": {
            color: `#0c27c8`,
        },
        "&$checked + $track": {
            backgroundColor: `#0c28c89d`,
        },
    },
    checked: {},
    track: {},
})(Switch)

const EXPORT_OPTIONS = Object.values(EXPORT_ACTIONS)
const LOAD_OPTIONS = Object.values(LOAD_ACTIONS)
const CLEAR_OPTIONS = Object.values(CLEAR_ACTIONS)

export default function Header({ setUndoCanvas, undoCanvas, quickUndo }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const { uiData } = useTranslations()
    const openMenu = Boolean(anchorEl)
    const [exportIndex, setExportIndex] = useState(0)
    const [clearIndex, setClearIndex] = useState(0)
    const [loadIndex, setLoadIndex] = useState(0)
    const [toolIndex, setToolIndex] = useState(0)
    const dispatch = useDispatch()
    const { exportPDFWithMap, exportBlankMap, exportMarkedUpMap, setLoader } =
        useExport()
    const showHierarchy = useSelector(
        (state) => state.userSettings.mapSettings.showHierarchy
    )
    const itemsMap = useSelector((state) => state.listStore.itemsMap)
    const lists = useSelector((state) => state.listStore.lists)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        dispatch(setMapContext("list"))
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const { diagnosisLanguage } = useTranslations()
    //const patientInfo = useSelector((state) => state.userSettings.patientInfo);

    const [show, setShow] = useState(false)
    const handleExport = () => {
        const selectedExport = EXPORT_OPTIONS[exportIndex]
        switch (selectedExport.name) {
            case EXPORT_ACTIONS.EXPORT_PDF_WITH_MAP.name:
                exportPDFWithMap()
                setShow(false)
                break
            case EXPORT_ACTIONS.EXPORT_PDF_WITH_MAP_NEW.name:
                {
                    setLoader(true)
                    // fetching diagnosis data
                    let promises = []
                    let icdOrder = []
                    let icdSet = new Set()
                    let cut = 0
                    Object.keys(itemsMap).map((key) => {
                        itemsMap[key].diagnoses.length &&
                            itemsMap[key].diagnoses.map(({ icd, ext }) => {
                                if (!icdSet.has(icd)) {
                                    cut++
                                    promises.push(
                                        fetchDiagnosisData(
                                            icd,
                                            diagnosisLanguage
                                        )
                                    )
                                    icdOrder.push(icd)
                                }
                            })
                    })
                    let diagnosisMap = {}
                    let patMapper = {}

                    const patObj = {}

                    LIST_TYPES.painted_distribution.options.map(
                        ({ name: subtype }) => {
                            const p = chooseList(
                                lists,
                                LIST_TYPES.painted_distribution.name,
                                subtype
                            ).attr
                            const {
                                pattern,
                                opacity,
                                color: foregroundColor,
                                backgroundColor,
                                isBkgColor,
                            } = p
                            const patternId = getPatternId(pattern, subtype)
                            const svg = document.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "svg"
                            )
                            let defs = document.createElement("defs")
                            svg.setAttribute("width", "30px")
                            svg.setAttribute("height", "30px")
                            // svg.setAttribute("opacity", opacity)
                            // svg.style.opacity = opacity
                            if (isBkgColor)
                                svg.style.backgroundColor = backgroundColor
                            let rect = document.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "rect"
                            )
                            rect.setAttribute("x", 0)
                            rect.setAttribute("y", 0)
                            rect.setAttribute("width", "100%")
                            rect.setAttribute("height", "100%")
                            if (pattern !== "no_pattern")
                                rect.setAttribute("fill", `url(#${patternId})`)
                            else rect.setAttribute("fill", foregroundColor)
                            let pat = document.getElementById(patternId)

                            if (pat) {
                                pat = pat.cloneNode(true)
                                pat.setAttribute("id", patternId)
                                svg.append(pat)
                            }
                            svg.append(rect)
                            patObj[subtype] = svg
                        }
                    )

                    // const promises = []

                    for (let key in patObj) {
                        promises.push(getPatterns(patObj[key], key))
                    }

                    Promise.all(promises).then((values) => {
                        values.map((val, idx) => {
                            if (idx < cut)
                                diagnosisMap[icdOrder[idx]] = val.data.diagnosis
                            else patMapper = { ...patMapper, ...val }
                        })
                        downloadMainMap(diagnosisMap, patMapper).finally(() => {
                            setLoader(false)
                        })
                    })
                }
                // setShow(true)
                break
            case EXPORT_ACTIONS.BLANK_MAP.name:
                exportBlankMap()
                setShow(false)
                break
            case EXPORT_ACTIONS.MARKED_UP_MAP.name:
                exportMarkedUpMap()
                setShow(false)
                break
            case EXPORT_ACTIONS.EXPORT_TEXT_LISTS.name:
                dispatch(toggleExportTextListModal())
                setShow(false)
                break
            case EXPORT_ACTIONS.EXPORT_TO_ZIP.name:
                dispatch(toggleExportZipModal())
                setShow(false)
                break
            default:
                setShow(false)
                break
        }
    }

    const handleClearPatienInfo = async () => {
        const clearedPatientInfoData = {
            firstName: "",
            lastName: "",
            preferredName: "",
            DOB: null,
            gender: null,
            MRN: "",
            physicianName: "",
            additionalInfo: "",
            hideOpposite: false,
            showOral: false,
            skinType: "",
            country: "",
            flag: "",
            countryOpts: { paper_size: "Letter" },
        }
        dispatch(clearPatientInfo(clearedPatientInfoData))
        dispatch(
            changeGeneralSettings({
                name: "showTabTitleAsPatientInfo",
                value: false,
            })
        )
        dispatch(
            changeMapSettings({
                name: "hideOppositeGenderAnatomy",
                value: false,
            })
        )
        dispatch(
            changeMapSettings({
                name: "isOralAnatomyVisible",
                value: false,
            })
        )
    }

    const handleClearUserSettingInfo = async () => {
        const clearedUserSettingsdata = {
            clinicCountryOpts: { paper_size: "Letter" },
            userEmail: "",
            physicianName: "",
            assistantName: "",
            clinicName: "",
            clinicAddress: "",
            clinicCountry: "",
            clinicPhone: "",
            clinicFax: "",
            clinicSite: "",
            clinicEmail: "",
            clinicInfo: "",
            clinicLogo: "",
            acceptLic: false,
            acceptStatement: false,
            clinicFlag: "",
            paperSize: "",
        }
        dispatch(clearUserSettings(clearedUserSettingsdata))
    }

    const handleClearEncounterInfo = async () => {
        const clearedEncounterdata = {
            notes: "",
            sessionID: 0,
            IPaddress: "",
            dateTime: new Date(),
        }
        dispatch(clearEncounterInfo(clearedEncounterdata))
    }

    const handleClearListsOrder = async () => {
        dispatch(clearListsOrder())
    }

    const handleClearDrawings = async () => {
        window.window.sketchRef.clear()
    }

    const handleClear = async (index) => {
        if (index === 0) {
            handleClearPatienInfo()
        } else if (index === 1) {
            handleClearUserSettingInfo()
        } else if (index === 2) {
            handleClearEncounterInfo()
        } else if (index === 3) {
            await handleClearListsOrder()
        } else if (index === 4) {
            handleClearUserSettingInfo()
            handleClearListsOrder()
            handleClearDrawings()
        } else if (index === 5) {
            handleClearDrawings()
        }
    }

    const handleLoad = () => {}

    return (
        <>
            {<ExportTextListModal />}
            {<ExportZipModal />}
            <nav className="app__nav">
                <div>
                    <Tooltip title={uiData?.label_kebab_menu_help?.tr_text}>
                        <Button
                            id="demo-customized-button"
                            aria-controls={
                                openMenu ? "demo-customized-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={openMenu ? "true" : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            style={{
                                width: "30px",
                                minWidth: "30px",
                                display: "flex",
                                height: "70px",
                                justifyContent: "start",
                                paddingLeft: "3px",
                                position: "fixed",
                                top: "0px",
                                left: "0px",
                                zIndex: 99999,
                            }}
                        >
                            <MoreVert />
                        </Button>
                    </Tooltip>
                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                        }}
                        elevation={0}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        style={{
                            boxShadow:
                                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                            marginInlineStart: "3px",
                        }}
                    >
                        <MenuItem dense>
                            <SplitButton
                                detailedLabel={[
                                    <Publish />,
                                    uiData[
                                        EXPORT_OPTIONS[exportIndex]
                                            .translation_key
                                    ]?.tr_text ||
                                        EXPORT_OPTIONS[exportIndex]
                                            .default_label,
                                ]}
                                options={EXPORT_OPTIONS.map(
                                    ({
                                        translation_key,
                                        default_label,
                                        name,
                                    }) => ({
                                        label:
                                            uiData[translation_key]?.tr_text ||
                                            default_label,
                                        value: name,
                                    })
                                )}
                                onButtonClick={handleExport}
                                menuItemIndex={exportIndex}
                                onMenuItemChange={(index) => {
                                    setExportIndex(index)
                                }}
                            >
                                {uiData.functionTitle_Export.tr_text}
                            </SplitButton>
                        </MenuItem>

                        <MenuItem dense>
                            <SplitButton
                                detailedLabel={[
                                    <img
                                        src={Broom}
                                        alt="clear-icon"
                                        width="23px"
                                    />,
                                    uiData[
                                        CLEAR_OPTIONS[clearIndex]
                                            .translation_key
                                    ]?.tr_text ||
                                        CLEAR_OPTIONS[clearIndex].default_label,
                                ]}
                                options={CLEAR_OPTIONS.map(
                                    ({
                                        translation_key,
                                        default_label,
                                        name,
                                    }) => ({
                                        label:
                                            uiData[translation_key]?.tr_text ||
                                            default_label,
                                        value: name,
                                    })
                                )}
                                menuItemIndex={clearIndex}
                                onButtonClick={() => {}}
                                onMenuItemChange={(index) => {
                                    setClearIndex(index)
                                    handleClear(index)
                                }}
                            />
                        </MenuItem>
                        <MenuItem dense>
                            <SplitButton
                                detailedLabel={[
                                    <GetApp />,
                                    uiData[
                                        LOAD_OPTIONS[loadIndex].translation_key
                                    ]?.tr_text ||
                                        LOAD_OPTIONS[loadIndex].default_label,
                                ]}
                                options={LOAD_OPTIONS.map(
                                    ({
                                        translation_key,
                                        default_label,
                                        name,
                                    }) => ({
                                        label:
                                            uiData[translation_key]?.tr_text ||
                                            default_label,
                                        value: name,
                                    })
                                )}
                                onButtonClick={handleLoad}
                                menuItemIndex={loadIndex}
                                onMenuItemChange={(index) =>
                                    setLoadIndex(index)
                                }
                            />
                        </MenuItem>
                        <MenuItem dense>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    dispatch(
                                        toggleStringToNameTranslatorModal()
                                    )
                                }
                            >
                                <Language />
                                &nbsp;{" "}
                                {uiData.label_CodeTranslator_title.tr_text}
                            </Button>
                        </MenuItem>
                        <MenuItem dense>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    dispatch(
                                        toggleSiteNameToCodeTranslatorModal()
                                    )
                                }
                            >
                                <Language />
                                &nbsp;{" "}
                                {
                                    uiData?.label_SiteNameToCodeTranslator_title
                                        ?.tr_text
                                }
                            </Button>
                        </MenuItem>
                    </Menu>
                </div>

                <AccordionToolset
                    setUndoCanvas={setUndoCanvas}
                    undoCanvas={undoCanvas}
                    quickUndo={quickUndo}
                    navbar={
                        <>
                            <div className="app__nav__switch__label hide_on_mobile">
                                {/* Show All Mapped Elements on Hover */}
                                {
                                    uiData.toggleTitle_showAllMapElementsOnHover
                                        .tr_text
                                }
                                <Tooltip
                                    style={{
                                        width: 15,
                                        height: 15,
                                        position: "absolute",
                                    }}
                                    title={
                                        uiData
                                            .toggleTitle_showAllMapElementsOnHover_help
                                            .tr_text
                                    }
                                    enterTouchDelay={30}
                                >
                                    <Help />
                                </Tooltip>
                            </div>
                            <div
                                className="hide_on_mobile app__nav__switch "
                                // style={{ display: "flex", flexDirection: "column" }}
                            >
                                <FormControlLabel
                                    control={
                                        <MapSwitch
                                            checked={showHierarchy}
                                            onChange={() => {
                                                dispatch(toggleHierarchy())
                                            }}
                                            name="Map Type"
                                        />
                                    }
                                />
                                <IconButton
                                    onClick={() =>
                                        dispatch(toggleColorCodedLegendModal())
                                    }
                                    style={{
                                        width: 15,
                                        height: 15,
                                        position: "relative",
                                        top: -7,
                                    }}
                                >
                                    {uiData.transtext_Settings.emoji_code}
                                </IconButton>
                            </div>
                            <div className="app__nav__divider">&nbsp;</div>
                        </>
                    }
                    tools={[
                        {
                            id: "Pin Tools",
                            icon: <LocationOn />,
                            component: <ListSelectionBar />,
                        },
                        {
                            id: "Distribution Tools",
                            icon: <FormatPaintOutlined />,
                            component: <ListSelectionBar />,
                        },
                        {
                            id: "Create Tools",
                            icon: <Create />,
                            component: null,
                        },
                        {
                            id: "Priority ",
                            icon: <PriorityHigh />,
                            component: null,
                        },
                    ]}
                    selectedToolIndex={toolIndex}
                    onChange={(index) => {
                        if (index === 1) {
                            dispatch(toggleDistributionMode(true))
                        } else if (index === 0) {
                            dispatch(toggleDistributionMode(false))
                        }

                        setToolIndex(index)
                    }}
                />
            </nav>
        </>
    )
}
