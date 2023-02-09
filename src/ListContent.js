import React, { useEffect, useState, useRef, useContext } from "react";
import {
  AttachFile,
  GetApp,
  Help,
  HelpOutlined,
  Reorder,
} from "@material-ui/icons";

import { InsertLink } from "@material-ui/icons";
import LinkDescriptionDialog from "./components/Dialog/LinkDescriptionDialog";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Popover from "@material-ui/core/Popover";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Tooltip,
  FormControlLabel,
  Box,
  Link,
} from "@material-ui/core";
import { ReactComponent as HierarchyIcon } from "./assets/hierarchy.svg";
import { saveAs } from "file-saver";

// =========================
// Material-UI Icons
// =========================
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import HelpIcon from "@material-ui/icons/Help";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ReorderIcon from "@material-ui/icons/Reorder";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import {
  Delete,
  ExpandMore,
  ExpandLess,
  WarningOutlined,
} from "@material-ui/icons";
import { getURL } from "./utils/cf";
import RoomSharpIcon from "@material-ui/icons/RoomSharp";
import { getNameFromId } from "./utils/getNameFromId";
import "gsap/CSSPlugin";
import NameRenderer from "./components/NameRenderer";
import { formatData } from "./components/ImageNameConf/nameConf";
import { getChronologyLabel } from "./components/subtoolbar/subToolHelpers";
import { getPinShape, getPinDescriptionText } from "./utils/pinUtils";
import { TranslationContext } from "./contexts/translation";
import { ReactSortable } from "react-sortablejs";
import ImageModal from "./components/ImageModal";
import { getUrlGetParams } from "./utils/urlParamsUtils";
import QRCode from "react-qr-code";
import MetadataAccordian from "./MetadataAccordian";
import DiagnosisInfo from "./components/ICD/DiagnosisInfo";

import useToasterMessage from "../src/hooks/useToasterMessage";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  name: {
    position: "relative",
  },
  hoverContainer: {
    position: "absolute",
    zIndex: 100,
    top: "100%",
    left: "0",
    display: "flex",
  },
  summary: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  extraPad: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  devBox: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  attrSectionTitle: {
    // textAlign: "center",
    fontSize: 14,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  attrLine: {
    display: "flex",
    width: "100%",
    // justifyContent: "center",
    marginBottom: 4,
  },
  attrHead: {
    fontSize: 13,
    fontStyle: "italic",
  },

  subAttrHead: {
    fontSize: 12,
    fontStyle: "italic",
  },
  attrValue: {
    fontSize: 13,
    fontWeight: 400,
    margin: "0 4px",
  },
  subAttrValue: {
    fontSize: 12,
    fontWeight: 400,
    margin: "0 4px",
  },
  enhancedName: {
    // textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: theme.spacing(1),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ListContent = ({
  id,
  locked,
  color,
  biopsy__type,
  pin_description,
  anatomic__site,
  setAnatomicSite,
  hierarchy,
  transfer_to_parent,
  list__type,
  user__notes,
  setBiopsy__type,
  delete__content,
  setUser__notes,
  user__image,
  setUser__image,
  user__comment,
  setUser__comments,
  inputs,
  onInputChange,
  droppedPinId,
  content_id,
  onLocatePin,
  attrInfo,
  native_name,
  defined_name,
  //   pinDescription,
  setPinDescription,
  pinShape,
  nameIncludes,
  delimiter,
  sns,
  snsSequence = "laterality_then_site",
  formData,
  onOpenNameBuilder,
  ar,
  selectedChronology,
  pinOnSea,
  siteDetails,
  editPinDescription,
  setEditExternalLinksListContent,
  patientJsx,
  patientInfo,
  listContentInfo,
  patientImg,
  snsLinkDescription,
  listContent,
  pinDetails,
}) => {
  const { uiData, anatomicData, lateralityData, tags, language } =
    useContext(TranslationContext);
  const imageTagsList = {};
  Object.values(tags).map((tag) => {
    imageTagsList[tag.tag_code] = {
      language: tag[`language_${language.toLowerCase()}`],
      emoji: tag.emoji_code,
    };
  });
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  useEffect(() => {
    if (modalImage.length > 0) {
      setOpenModal(true);
    }
  }, [modalImage]);
  useEffect(() => {
    if (!openModal) setModalImage("");
  }, [openModal]);
  const uploadImage = useRef();
  const uploadFile = useRef();
  const prevNote = useRef();
  const [popOverRef, setPopOverRef] = useState(null);
  const classes = useStyles();

  // =========================
  // UseStates
  // =========================
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [value, setValue] = useState("");
  const [valueEdit, setValueEdit] = useState("");
  const [editType] = useState("");
  const [notes, setNotes] = useState("");
  const [comment, setComment] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [showLinkDescription, setShowLinkDescription] = useState(false);

  const [links, setLinks] = useState([
    {
      link: "",
      type: "URL",
      desc: "",
      emoji: uiData.label_LinkType_URL.emoji_code,
      tags: [],
    },
  ]);

  const [linkCount, setLinkCount] = useState(0);
  useEffect(() => {
    let newLinkCount = 0;
    links.map((link) => {
      if (link.link && link.desc) newLinkCount++;
    });
    setLinkCount(newLinkCount);
  }, [links]);
  // =========================
  // UseEffect
  // =========================
  const editExternalLinks = () => {
    setShowLinkDescription(true);
  };
  useEffect(() => {
    setNotes(user__notes);
  }, [user__notes]);

  useEffect(() => {
    setImage(user__image);
  }, [user__image]);
  useEffect(() => {
    setComment(user__comment);
  }, [user__comment]);

  useEffect(() => {
    setComment(user__comment);
  }, [user__comment]);

  useEffect(() => {
    setShowWarning(
      user__notes || (user__image && user__image.length) || user__comment
    );
  }, [user__notes, user__image, user__comment]);

  useEffect(() => {
    const urlParamsObject = {
      secret: "1t5a53cr3t123",
      ...(language !== "en" && { language: language }),
      listType: list__type,
      shape: pinShape,
      color: color,
      chronology: selectedChronology,
    };

    const content = {
      content_id: content_id,
      biopsy__type: biopsy__type,
      pin_description: pin_description,
      ...(user__notes && { user__notes: user__notes }),
      devX: attrInfo.deviation.dev_x,
      devY: attrInfo.deviation.dev_y,
      defined_name: {},
    };

    const items = [];

    let name = { ...defined_name };
    delete name.anatomic_site;

    for (let key in name) {
      if (Object.prototype.toString.call(name[key]) == "[object Function]")
        continue;

      if (name[key]) content.defined_name[key] = name[key];
    }

    items.push(content);

    urlParamsObject.items = JSON.stringify(items);
    setQrCodeValue(window.location.origin + getUrlGetParams(urlParamsObject));
  }, [
    content_id,
    list__type,
    biopsy__type,
    pin_description,
    user__notes,
    defined_name,
    pinOnSea,
    attrInfo,
  ]);

  // =========================
  // Event Handlers
  // =========================

  // Change the Biopsy type
  const handleBiopsyChange = (event) => {
    const newBiopsy = event.target.value;
    setBiopsy__type(newBiopsy);
  };

  // Delete a list content
  const toaster = useToasterMessage();
  const handleDeleteContent = () => {
    if (locked) {
      toaster({ message: uiData.alert_ListLocked.tr_text, type: "info" });
      return;
    }
    delete__content(id);
  };

  // Handles opening of dialog box for user notes
  const handleClickOpen = () => {
    prevNote.current = notes;
    setValue(notes);
    setOpen(true);
  };

  // Handles closing of dialog box for user notes
  const handleOk = () => {
    setNotes(value);
    setUser__notes(value);
    setOpen(false);
  };

  // Handles cancel button for user notes
  const handleCancel = () => {
    setNotes(prevNote.current);
    setUser__notes(prevNote.current);
    setOpen(false);
  };

  // Handles closing of dialog box for name edit
  const handleOkEdit = () => {
    setAnatomicSite({
      ...anatomic__site,
      [editType]: { ...anatomic__site[editType], text: valueEdit },
    });
    setOpenEdit(false);
  };

  // Handles cancel button for name edit
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  //change pin description on map
  useEffect(() => {
    const element = document.getElementById(droppedPinId);
    if (element) {
      const pinDescriptionElement =
        element.getElementsByClassName("Pin-Description")[0];
      const pinHyphenElement = element.getElementsByClassName("Pin-Hyphen")[0];
      pinDescriptionElement.innerHTML = getPinDescriptionText(pin_description);
      if (getPinDescriptionText(pin_description) !== "") {
        pinHyphenElement.style.visibility = "visible";
      } else {
        pinHyphenElement.style.visibility = "hidden";
      }
    }
  }, [pin_description]);

  //generate img name according to sequence configured earlier
  const getImgName = (originalFileName, fileCreationDate) => {
    const nameDataObject = formatData(
      { ...formData, listType: list__type, pinId: defined_name },
      {
        originalFileName,
        fileCreationDate,
        pinDescription: pin_description,
        listType: list__type,
        orderMarker: getChronologyLabel(selectedChronology, id),
        laterality: defined_name.laterality[0],
        notes,
      }
    );

    const customImgName = nameIncludes
      .map((nameObj) => nameObj.key)
      .filter((key) => {
        if (nameDataObject[key]) {
          return true;
        }
        return false;
      })
      .map((key) => nameDataObject[key])
      .join(delimiter);

    return customImgName;
  };

  const badgeStyles = {
    position: "absolute",
    color: "white",
    backgroundColor: "blue",
    borderRadius: "50%",
    padding: ".1rem",
    height: "16px",
    width: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: ".6rem",
    top: "8px",
    right: "6px",
  };

  //Attach file
  const captureFile = async (e) => {
    e.preventDefault();

    setFiles((prev) => [
      ...prev,
      {
        file_name: e.target.files[0].name,
        file_data: e.target.files[0],
        file_note: "",
        file_tags: [],
      },
    ]);
  };

  // Get data url from file
  const captureImage = async (e) => {
    e.preventDefault();

    try {
      const url = await getURL(e.target.files[0]);

      const newImgObject = {
        user_img: url,
        user_img_tags: [],
        user_image_note: "",
        originalFileName: e.target.files[0].name,
        fileCreationDate: e.target.files[0].lastModifiedDate,
      };
      if (url && image && image.length > 0) {
        setImage([...image, newImgObject]);

        setUser__image([...image, newImgObject]);
      } else if (url) {
        setImage([newImgObject]);
        setUser__image([newImgObject]);
      }
    } catch (err) {}
  };

  const getRequiredInput = (input, index) => {
    switch (input.type) {
      case "text":
        return (
          <TextField
            onChange={(e) => onInputChange(e.target.value, index)}
            value={input.value}
            label={input.label}
          />
        );
      case "select":
        return (
          <TextField
            select
            onChange={(e) => onInputChange(e.target.value, index)}
            value={input.value}
            label={input.label}>
            {input.options.map((opt) => {
              return <MenuItem value={opt}>{opt}</MenuItem>;
            })}
          </TextField>
        );

      case "multiselect":
        return (
          <TextField
            select
            SelectProps={{
              multiple: true,
              value: input.value,
              onChange: (e) => onInputChange(e.target.value, index),
            }}
            label={input.label}>
            {input.options.map((opt) => {
              return <MenuItem value={opt}>{opt}</MenuItem>;
            })}
          </TextField>
        );
      default:
        return null;
    }
  };

  // handle addition of notes for images
  const handleImageNote = (e, i) => {
    var temp = {};
    var tempImage = [...image];

    temp = { ...tempImage[i] };
    temp.user_image_note = e.target.value;

    tempImage.splice(i, 1, temp);

    setUser__image(tempImage);
    // setImage(tempImage);
  };

  const handleImgTags = (e, i) => {
    var temp = {};
    var tempImage = [...image];

    temp = { ...tempImage[i] };
    temp.user_img_tags = e.target.value;

    tempImage.splice(i, 1, temp);

    setUser__image(tempImage);
  };
  const handleFileNote = (e, i) => {
    var allFiles = [...files];
    const newFile = { ...allFiles[i] };
    newFile.file_note = e.target.value;
    allFiles.splice(i, 1, newFile);
    setFiles([...allFiles]);
  };

  const handleFileTags = (e, i) => {
    var allFiles = [...files];
    const newFile = { ...allFiles[i] };
    newFile.file_tags = e.target.value;
    allFiles.splice(i, 1, newFile);
    setFiles([...allFiles]);
  };

  // handles image and note delete
  const handleImageDelete = (i) => {
    var temp = [...image];
    temp.splice(i, 1);
    setImage(temp);

    setUser__image(temp);
  };
  const handleFileDelete = (i) => {
    var temp = [...files];
    temp.splice(i, 1);
    setFiles(temp);
  };

  // get Part of Name

  return (
    <>
      <Popover
        open={popOverRef != null}
        anchorEl={popOverRef}
        onClose={() => setPopOverRef(null)}>
        <List component='nav' aria-label='secondary mailbox folder'>
          {hierarchy
            .sort()
            .reverse()
            .map(({ id: parentId, egz }) => {
              return parentId ? (
                <ListItem
                  button
                  key={parentId}
                  onClick={(event) => {
                    transfer_to_parent(parentId);
                    setPopOverRef(null);
                  }}>
                  <ListItemText
                    primary={
                      <NameRenderer sns={sns} noEdit={true} {...egz.names} />
                    }
                  />
                </ListItem>
              ) : null;
            })}
        </List>
      </Popover>

      <div className='listContent'>
        <Accordion
          style={{ width: "100%" }}
          expanded={expanded}
          //onChange={(e) => setExpanded((prev) => !prev)}
        >
          <AccordionSummary style={accordionStyle}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}>
              <div className='listContent__basicInfo'>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}>
                  <div style={style}>
                    <IconButton onClick={handleDeleteContent}>
                      <IndeterminateCheckBoxRoundedIcon
                        style={{ opacity: locked ? "0.5" : "" }}
                      />
                    </IconButton>
                    {list__type === "comments" ||
                    list__type === "diagnosis" ||
                    pinShape === 4 ? (
                      <span
                        style={{
                          background: color,
                          borderRadius: "50%",
                          width: "21px",
                          height: "21px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <span
                          style={{
                            color: "white",
                            padding: "0px",
                            fontSize:
                              selectedChronology === "I-IX" ||
                              selectedChronology === "i-ix"
                                ? "11px"
                                : "14px",
                            fontWeight: "bold",
                            overflow: "unset",
                          }}>
                          {getChronologyLabel(selectedChronology, id)}
                        </span>
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: ".03rem",
                        }}>
                        <span>{getPinShape(pinShape, color, "8px")}</span>
                        <span style={{ color, fontSize: "1.4rem" }}>
                          {list__type === "ordered"
                            ? getChronologyLabel(selectedChronology, id)
                            : null}
                        </span>
                      </span>
                    )}
                    <span>
                      {!pinOnSea && (
                        <div className='transfer-container'>
                          <Tooltip title={uiData.label_Transfer.tr_text}>
                            <IconButton
                              disabled={hierarchy.length === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                setPopOverRef(e.currentTarget);
                              }}>
                              <HierarchyIcon
                                style={{
                                  width: 20,
                                  height: 20,
                                  fill: "currentColor",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      )}
                    </span>
                    {pinOnSea && (
                      <i
                        style={{
                          fontSize: ".85rem",
                          display: "flex",
                          alignItems: "flex-start",
                          // width: "100%",
                        }}>
                        <span>
                          {uiData.listItem_PinNotOnAnatomicSite.tr_text}
                        </span>
                        <Tooltip
                          title={
                            uiData.listItem_PinNotOnAnatomicSite_help.tr_text
                          }>
                          <HelpIcon
                            fontSize='small'
                            style={{ cursor: "pointer" }}
                          />
                        </Tooltip>
                      </i>
                    )}
                    {/* : ( */}
                    <NameRenderer
                      {...defined_name}
                      auto_related_name={ar}
                      sns={sns}
                      onClickEdit={(e) => {
                        e.stopPropagation();
                        onOpenNameBuilder();
                      }}
                      breakWord
                    />
                    {/* )} */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}>
                    {showWarning && (
                      <WarningOutlined
                        style={{
                          color: "#FFC947",
                        }}
                      />
                    )}
                    {!expanded && (
                      <>
                        <QRCode size={100} value={qrCodeValue} />
                        <div style={{ position: "relative" }}>
                          <IconButton
                            onClick={() => uploadImage.current.click()}>
                            <AddAPhotoRoundedIcon />
                            {image && image.length > 0 && (
                              <span className='badge' style={badgeStyles}>
                                {image.length}
                              </span>
                            )}
                          </IconButton>
                        </div>

                        <div style={{ position: "relative" }}>
                          <IconButton
                            onClick={() => uploadFile.current.click()}>
                            <InsertDriveFileIcon />
                            {files.length > 0 && (
                              <span className='badge' style={badgeStyles}>
                                {files.length}
                              </span>
                            )}
                          </IconButton>
                        </div>
                        <div style={{ position: "relative" }}>
                          <IconButton
                            onClick={() => {
                              editExternalLinks();
                              setEditExternalLinksListContent(id, list__type);
                            }}>
                            <InsertLink />
                            {linkCount > 0 && (
                              <span className='badge' style={badgeStyles}>
                                {linkCount}
                              </span>
                            )}
                          </IconButton>
                        </div>
                      </>
                    )}
                    <div
                      style={{
                        color:
                          getPinDescriptionText(pin_description) === ""
                            ? ""
                            : color,
                        marginLeft: ".5rem",
                      }}
                      onClick={() => editPinDescription(id, list__type)}>
                      {pin_description.every((item) => item === "")
                        ? uiData?.label_PinDescription_No?.tr_text ||
                          "No pin description"
                        : getPinDescriptionText(pin_description)}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <IconButton
                    className={
                      locked ? "item-handle-icon NoSort" : "item-handle-icon"
                    }
                    onClick={() =>
                      locked &&
                      toaster({
                        message: uiData.alert_ListLocked.tr_text,
                        type: "info",
                      })
                    }>
                    <ReorderIcon
                      style={{
                        cursor: locked ? "not-allowed" : "move",
                        color: "#707070",
                        marginLeft: "5px",
                        opacity: locked ? "0.5" : "",
                      }}
                    />
                  </IconButton>
                  <RoomSharpIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      onLocatePin(droppedPinId);
                    }}
                    style={{
                      cursor: "pointer",
                      color: "#707070",
                      marginLeft: "5px",
                    }}
                  />
                  <IconButton onClick={(e) => setExpanded((prev) => !prev)}>
                    {!expanded ? <ExpandMore /> : <ExpandLess />}
                  </IconButton>
                </div>
              </div>
              {pinDetails?.diagnosisData && !expanded ? (
                <div>
                  Dx:{pinDetails.diagnosisData.primary.diagnosis.text}(
                  {pinDetails.diagnosisData.primary.diagnosis.code})
                </div>
              ) : (
                ""
              )}
            </div>
          </AccordionSummary>

          <AccordionDetails style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
              <>
                {/* <div>BABA Baabrarr</div> */}
                <DiagnosisInfo
                  diagnosisData={pinDetails ? pinDetails.diagnosisData : null}
                />
                <MetadataAccordian
                  attrInfo={attrInfo}
                  defined_name={defined_name}
                  hierarchy={hierarchy}
                  id={id}
                  ar={ar}
                  sns={sns}
                  anatomic__site={anatomic__site}
                />

                <div className='listContent__userData'>
                  <div>
                    {(list__type === "comments" ||
                      list__type === "diagnosis") && (
                      <input
                        style={{ padding: "0.5vw" }}
                        type='text'
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                          setUser__comments(e.target.value);
                        }}
                        placeholder='Add comments'
                      />
                    )}
                    <FormControl
                      variant='outlined'
                      className={`${classes.formControl} listContent__basicInfo__dropdown__container`}>
                      <InputLabel htmlFor='Biopsy'>Type</InputLabel>

                      <Select
                        native
                        value={biopsy__type}
                        onChange={handleBiopsyChange}
                        label='Biopsy'
                        className='listContent__basicInfo__dropdown'
                        inputProps={{
                          name: "biopsy",
                          id: "biopsy",
                        }}>
                        {list__type === "ordered" ? (
                          <>
                            <option value='Shave-Biopsy'>
                              {uiData.toolTitle_ShaveBiopsy.tr_text}
                            </option>
                            <option value='Shave-Removal'>
                              {uiData.toolTitle_ShaveRemoval.tr_text}
                            </option>
                            <option value='Punch-Biopsy'>
                              {uiData.toolTitle_PunchBiopsy.tr_text}
                            </option>
                            <option value='Punch-Excision'>
                              {uiData.toolTitle_PunchExcision.tr_text}
                            </option>
                            <option value='Excision'>
                              {uiData.toolTitle_Excision.tr_text}
                            </option>
                          </>
                        ) : list__type === "comments" ? (
                          <>
                            <option value='General-Comment'>
                              {uiData.toolTitle_GeneralComment.tr_text}
                            </option>
                            <option value='Cosmetic-Comment'>
                              {uiData.toolTitle_CosmeticComment.tr_text}
                            </option>
                            <option value='Diagnosis-Comment'>
                              {uiData.toolTitle_DiagnosisComment.tr_text}
                            </option>
                          </>
                        ) : (
                          <>
                            <option value='Cryo-AK'>
                              {uiData.toolTitle_CryoAK.tr_text}
                            </option>
                            <option value='Cryo-Wart'>
                              {uiData.toolTitle_CryoWart.tr_text}
                            </option>
                            <option value='Cryo-ISK'>
                              {uiData.toolTitle_CryoISK.tr_text}
                            </option>
                            <option value='Injection-Med'>
                              {uiData.toolTitle_InjectionMed.tr_text}
                            </option>
                            <option value='Diagnosis-Nevus'>
                              {uiData.toolTitle_Nevus.tr_text}
                            </option>
                            <option value='Diagnosis-Acne'>
                              {uiData.toolTitle_Acne.tr_text}
                            </option>
                            <option value='Diagnosis-Psoriasis'>
                              {uiData.toolTitle_Psoriasis.tr_text}
                            </option>
                            <option value='Diagnosis-Eczema'>
                              {uiData.toolTitle_Eczema.tr_text}
                            </option>
                            <option value='Skin-cancer'>
                              {uiData.toolTitle_SkinCancer.tr_text}
                            </option>
                            <option value='Custom-Lookup'>
                              {uiData.toolTitle_CustomLookup.tr_text}
                            </option>
                          </>
                        )}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      style={{ cursor: "pointer" }}
                      onClick={handleClickOpen}>
                      <CreateRoundedIcon />
                    </IconButton>
                    &ensp;
                    <span>
                      {notes ? notes : uiData.listItem_AddNotes.tr_text}
                    </span>
                  </div>

                  <div
                    className='attachmentsContainer'
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <input
                      type='file'
                      accept='image/*'
                      ref={uploadImage}
                      style={{ display: "none" }}
                      capture='camera'
                      onClick={(e) => (e.target.value = null)}
                      onChange={(e) => captureImage(e)}
                    />

                    <div className='upload-container'>
                      <IconButton onClick={() => uploadImage.current.click()}>
                        <AddAPhotoRoundedIcon />

                        {image && image.length > 0 && (
                          <span className='badge' style={badgeStyles}>
                            {image.length}
                          </span>
                        )}
                      </IconButton>
                    </div>

                    <input
                      type='file'
                      ref={uploadFile}
                      style={{ display: "none" }}
                      capture='camera'
                      onClick={(e) => (e.target.value = null)}
                      onChange={(e) => captureFile(e)}
                    />

                    <div className='upload-container'>
                      <IconButton onClick={() => uploadFile.current.click()}>
                        <InsertDriveFileIcon />
                        {files.length > 0 && (
                          <span className='badge' style={badgeStyles}>
                            {files.length}
                          </span>
                        )}
                      </IconButton>
                    </div>
                    <div style={{ position: "relative" }}>
                      <IconButton
                        onClick={() => {
                          editExternalLinks();
                          setEditExternalLinksListContent(id, list__type);
                        }}>
                        <InsertLink />
                        {linkCount > 0 && (
                          <span className='badge' style={badgeStyles}>
                            {linkCount}
                          </span>
                        )}
                      </IconButton>
                    </div>
                  </div>
                </div>

                <div className='listContent__Images'>
                  <ReactSortable
                    list={image}
                    setList={setImage}
                    className='images-box'>
                    {image &&
                      image.map((img, i) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              justifyItems: "space-evenly",
                              flexWrap: "wrap",
                              width: 125,
                            }}>
                            <div className='image-list-item'>
                              <img
                                key={i}
                                className='uploaded-img'
                                src={img.user_img}
                                alt='img'
                                onClick={() => {
                                  setModalImage(img.user_img);
                                }}
                              />
                              <div className='image-actions'>
                                <div style={{ display: "flex" }}>
                                  <IconButton
                                    onClick={() => {
                                      handleImageDelete(i);
                                    }}>
                                    <Delete />
                                  </IconButton>
                                </div>
                                <IconButton
                                  onClick={() => {
                                    const [, type] = img.user_img
                                      .split(";")[0]
                                      .split("/");
                                    saveAs(
                                      img.user_img,
                                      getImgName(
                                        img.originalFileName,
                                        img.fileCreationDate
                                      ) +
                                        "." +
                                        type
                                    );
                                  }}>
                                  <GetApp />
                                </IconButton>
                              </div>
                            </div>
                            <div style={{ width: 125 }}>
                              <FormControl style={{ width: "100%" }}>
                                <InputLabel>
                                  {uiData?.label_FNB_Tags?.emoji_code}{" "}
                                  {uiData?.label_FNB_Tags?.tr_text}
                                  {"(" + img.user_img_tags.length + ")"}
                                </InputLabel>
                                <Select
                                  multiple
                                  value={img.user_img_tags}
                                  onChange={(e) => handleImgTags(e, i)}
                                  input={<Input />}
                                  renderValue={(selected) =>
                                    selected
                                      .map(
                                        (code) => imageTagsList[code].language
                                      )
                                      .join(", ")
                                  }
                                  MenuProps={MenuProps}>
                                  {Object.values(tags).map((tag) => (
                                    <MenuItem
                                      key={tag.id}
                                      value={tag["tag_code"]}>
                                      <Checkbox
                                        color='primary'
                                        checked={
                                          img.user_img_tags.indexOf(
                                            tag.tag_code
                                          ) > -1
                                        }
                                      />
                                      <ListItemText
                                        primary={
                                          tag.emoji_code +
                                          " " +
                                          tag[
                                            `language_${language.toLowerCase()}`
                                          ]
                                        }
                                      />
                                    </MenuItem>
                                  ))}
                                </Select>
                                <div
                                  style={{
                                    height: 25,
                                    display: "flex",
                                    flexWrap: "nowrap",

                                    overflowX: "scroll",
                                  }}
                                  className='hideScrollbar'>
                                  {img.user_img_tags.map((code) => (
                                    <span>{imageTagsList[code].emoji}</span>
                                  ))}
                                </div>
                              </FormControl>
                            </div>

                            <TextField
                              style={{ width: 125 }}
                              label='Note'
                              autoComplete='off'
                              type='text'
                              onChange={(e) => handleImageNote(e, i)}
                              value={img.user_image_note}
                              fullWidth
                              onBlur={() => setUser__image(image)}
                            />
                          </div>
                        );
                      })}
                  </ReactSortable>
                </div>

                <div className='listContent__Images'>
                  <ReactSortable
                    list={image}
                    setList={setImage}
                    className='images-box'>
                    {files &&
                      files.map((file, i) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              justifyItems: "space-evenly",
                              flexWrap: "wrap",
                              width: 125,
                            }}>
                            <div
                              className='image-list-item'
                              style={{
                                height: 100,
                                overflow: "hidden",
                              }}>
                              <span
                                style={{
                                  height: "100%",
                                  textOverflow: "hidden",
                                  alignSelf: "center",
                                }}>
                                {file.file_name}
                              </span>
                              <div className='image-actions'>
                                <div style={{ display: "flex" }}>
                                  <IconButton
                                    onClick={() => {
                                      handleFileDelete(i);
                                    }}>
                                    <Delete />
                                  </IconButton>
                                </div>
                                <IconButton
                                  href={file.file_data}
                                  download={file.file_name}>
                                  <GetApp />
                                </IconButton>
                              </div>
                            </div>
                            <div style={{ width: 125 }}>
                              <FormControl style={{ width: "100%" }}>
                                <InputLabel>
                                  {uiData?.label_FNB_Tags?.emoji_code}{" "}
                                  {uiData?.label_FNB_Tags?.tr_text}
                                  {"(" + file.file_tags.length + ")"}
                                </InputLabel>
                                <Select
                                  multiple
                                  value={file.file_tags}
                                  onChange={(e) => handleFileTags(e, i)}
                                  input={<Input />}
                                  renderValue={(selected) =>
                                    selected
                                      .map(
                                        (code) => imageTagsList[code].language
                                      )
                                      .join(", ")
                                  }
                                  MenuProps={MenuProps}>
                                  {Object.values(tags).map((tag) => (
                                    <MenuItem
                                      key={tag["id"]}
                                      value={tag["tag_code"]}>
                                      <Checkbox
                                        color='primary'
                                        checked={
                                          file.file_tags.indexOf(tag.tag_code) >
                                          -1
                                        }
                                      />
                                      <ListItemText
                                        primary={
                                          tag.emoji_code +
                                          " " +
                                          tag[
                                            `language_${language.toLowerCase()}`
                                          ]
                                        }
                                      />
                                    </MenuItem>
                                  ))}
                                </Select>
                                <div
                                  style={{
                                    height: 25,
                                    display: "flex",
                                    flexWrap: "nowrap",

                                    overflowX: "scroll",
                                  }}
                                  className='hideScrollbar'>
                                  {file.file_tags
                                    .map((code) => imageTagsList[code].emoji)
                                    .join("")}
                                </div>
                              </FormControl>
                            </div>
                            <TextField
                              style={{ width: 125 }}
                              label='Note'
                              autoComplete='off'
                              type='text'
                              onChange={(e) => handleFileNote(e, i)}
                              value={file.file_note}
                              fullWidth
                            />
                          </div>
                        );
                      })}
                  </ReactSortable>
                </div>
                <div
                  style={{
                    display: "flex",
                    background: "#ccc",
                  }}>
                  <div style={{ position: "relative" }}>
                    <IconButton
                      onClick={() => {
                        editExternalLinks();
                        setEditExternalLinksListContent(id, list__type);
                      }}>
                      <InsertLink />
                      {linkCount > 0 && (
                        <span className='badge' style={badgeStyles}>
                          {linkCount}
                        </span>
                      )}
                    </IconButton>
                  </div>
                  <Box
                    display='flex'
                    p={1}
                    flexDirection='column'
                    style={{ gap: "0.51rem" }}>
                    {links.map(({ link, desc, type, emoji, tags }) => {
                      return (
                        link &&
                        desc && (
                          <Link
                            target='_blank'
                            href={link}
                            style={{
                              marginLeft: "10%",
                              marginBottom: "0.8rem",
                              textDecoration: "underline",
                              fontWeight: "bold",
                              fontSize: "110%",
                              width: "100%",
                            }}
                            key={link}>
                            {`${emoji} ${desc}`}
                          </Link>
                        )
                      );
                    })}
                  </Box>
                </div>
                <div className='listContent__additionalInputs'>
                  {inputs &&
                    inputs.map((input, index) => {
                      return (
                        <FormControl key={index}>
                          {getRequiredInput(input, index)}
                        </FormControl>
                      );
                    })}
                </div>
                <Accordion
                  className='listContent__additionalMetaData'
                  style={{ backgroundColor: "#999" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'>
                    -- Show additional documentation options --
                  </AccordionSummary>
                  <AccordionDetails className='app__mainBody__list__body'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Cumque, optio itaque beatae id, nam laborum maxime amet illo
                    laboriosam veniam sed quasi dignissimos blanditiis porro
                    maiores deleniti modi ipsam eaque.
                  </AccordionDetails>
                </Accordion>
              </>
            </div>
          </AccordionDetails>
        </Accordion>

        <Dialog
          open={open}
          onClose={handleCancel}
          aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>
            Notes about "
            {list__type === "ordered" && `${String.fromCharCode(64 + id)}. `}
            {list__type === "comments" && `${id}`}
            {list__type === "diagnosis" && `${id}`}
            {anatomic__site?.getFullName()} - {biopsy__type} Biopsy"
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your notes below...
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              type='text'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleOk} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openEdit}
          onClose={handleCancelEdit}
          aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>
            Edit {editType} "
            {list__type === "ordered" && `${String.fromCharCode(64 + id)}. `}
            {list__type === "comments" && `${id}`}
            {list__type === "diagnosis" && `${id}`}
            {anatomic__site?.getFullName()}"
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your changes below...
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              type='text'
              value={valueEdit}
              onChange={(e) => setValueEdit(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleOkEdit} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ImageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={{ modalImage }}
      />
    </>
  );
};

export default ListContent;

const style = {
  display: "flex",
  alignItems: "center",
  "@media (min-width: 1180px)": {
    gap: "1rem",
  },
};

const accordionStyle = {
  "@media (max-width: 1180px)": {
    paddingInline: "11rem",
  },
};
