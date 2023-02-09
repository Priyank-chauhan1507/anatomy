import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  ListItem,
  Popover,
  TextField,
  Tooltip,
  Typography,
  Chip,
} from "@material-ui/core";
import {
  AddAPhotoRounded,
  Done,
  ExpandLess,
  ExpandMore,
  FindInPage,
  IndeterminateCheckBoxRounded,
  InsertDriveFile,
  InsertLink,
  Reorder,
  RoomSharp,
  Warning,
} from "@material-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getDate } from "../../utils/cf";
import { LIST_TYPES, LIST_TYPES_MAPPING } from "../../constants/listsConstants";
import useTranslations from "../../hooks/useTranslations";
import {
  changeItemListType,
  changeItemNotes,
  changeItemSubtype,
  onAddFile,
  removeItem,
  setActiveItem,
} from "../../store/slices/lists";

import GalleryIcon from "@material-ui/icons/Collections";
import SaveIcon from "@material-ui/icons/Save";
import { useSelector } from "react-redux";
import selectDistSeg from "../../assets/PinToDistSegment.svg";
import selectPinSeg from "../../assets/DistSegToPin.svg";
import { PREVIEW_ITEM_SVG_SIZE } from "../../constants/itemConstants";
import MetadataAccordian from "../../MetadataAccordian";
import { ORDERS } from "../../constants/itemConstants";
import {
  openICDModal,
  openLinkEditor,
  openPinDescriptionModal,
  openSessionGalleryModal,
} from "../../store/slices/modals";
import { storeCopiedImage, storeFile, storeImage } from "../../utils/fileCache";
import { chooseList, onLocatePin } from "../../utils/helpers";
import { getPinDescriptionText } from "../../utils/pinUtils";
import ButtonWithCount from "../Buttons/ButtonWithCount";
import { DiagnosisDescription } from "../ICD/DiagnosisDescription";
import ItemDiagnosis, {
  DiagnosisRenderer,
} from "../ListItemComponents/ItemDiagnosis";
import ItemFiles from "../ListItemComponents/ItemFiles";
import ItemLinkViewer from "../ListItemComponents/ItemLinkViewer";
import ItemQRCode from "../ListItemComponents/ItemQRCode";
import Morphology from "../ListItemComponents/Morphology";
import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy";
import { RegionPreview } from "../SVGRegionRenderer";
import e from "@toast-ui/react-image-editor";
import useToasterMessage from "../../hooks/useToasterMessage";
// import { PdfThumbnail }  from 'react-pdf-thumbnail';
export const accordionStyle = {
  position: "relative",
  "@media (max-width: 1180px)": {
    paddingInline: "11rem",
  },
};
export const accordionItemStyle = {
  display: "flex",
  alignItems: "flex-start",
  marginRight: "auto",
  "@media (min-width: 1180px)": {
    gap: "1rem",
  },
};

export const CommonItemWrapper = ({
  locked,
  itemId,
  listType,
  subtypeOptions,
}) => {
  const dispatch = useDispatch();
  const { uiData } = useTranslations();
  const [viewImage, setViewImage] = useState();
  const activeItemId = useSelector(
    (state) => state.listStore.activeItem.activeItemId
  );

  const [expanded, setExpanded] = useState(false);
  const linkCount = useSelector(
    (state) => state.listStore.itemsMap[itemId].links.length
  );
  const files = useSelector((state) => state.listStore.itemsMap[itemId].files);
  const primaryDiagnosis = useSelector(
    (state) => state.listStore.itemsMap[itemId].diagnoses[0]
  );
  const [filesCount, setFilesCount] = useState(0);
  const [imagesCount, setImagesCount] = useState(0);

  // const itemsMap = useSelector((state) => state.listStore.itemsMap)
  const mapContext = useSelector((state) => state.app.mapContext);

  const itemsMap = useSelector((state) => state.listStore.itemsMap);

  // const openContextMenu = useSelector(state => state.modals.contextMenu.state)
  const toaster = useToasterMessage();

  useEffect(() => {
    const element = document.getElementById("accordian-" + itemId);
    if (activeItemId === itemId) {
      setExpanded(true);
      if (element) {
        element.scrollIntoView(true);
      }
    } else {
      setExpanded(false);
    }
    //eslint-disable-next-line
  }, [activeItemId]);

  useEffect(() => {
    let newImagesCount = 0;
    let newFilesCount = 0;
    files.forEach(({ contentType }) => {
      if (contentType === "image") {
        newImagesCount++;
      } else {
        newFilesCount++;
      }
    });
    setFilesCount(newFilesCount);
    setImagesCount(newImagesCount);
  }, [files]);

  const fileUploadRef = useRef();
  const imageUploadRef = useRef();
  const onRemove = useCallback(
    (e) => {
      dispatch(removeItem({ itemId, pushToBin: true }));
    },
    [dispatch, itemId]
  );

  const handleOpenLinkEditor = (e) => {
    dispatch(
      openLinkEditor({
        itemId,
        isGrouped: false,
        listType: "",
        listSubtype: "",
      })
    );
  };

  const handleUploadFileClick = (e) => {
    fileUploadRef.current.click();
  };

  const handleUploadFile = async (e) => {
    e.stopPropagation();
    const files = e.target.files;
    if (files[0]) {
      const id = storeFile(files[0]);
      dispatch(
        onAddFile({
          itemId,
          file: {
            name: files[0].name,
            type: files[0].type,
            fileCreationDate: files[0].lastModifiedDate,
            id,
            contentType: "doc",
            original: true,
          },
        })
      );
    }
  };

  const handleUploadImageClick = (e) => {
    imageUploadRef.current.click();
  };

  const handleUploadImage = (e) => {
    const files = e.target.files;
    if (files[0]) {
      const id = storeImage(files[0]);
      dispatch(
        onAddFile({
          itemId,
          file: {
            name: files[0].name,
            type: files[0].type,
            fileCreationDate: files[0].lastModifiedDate,
            id,
            contentType: "image",
            original: true,
          },
        })
      );
    }
  };

  const pasteImg = (img) => {
    const id = storeCopiedImage(img);
    dispatch(
      onAddFile({
        itemId,
        file: {
          name: img.name,
          type: img.type,
          fileCreationDate: img.lastModifiedDate,
          id,
          contentType: "image",
          original: true,
        },
      })
    );
  };

  const handleLocate = (e) => {
    onLocatePin(
      itemId,
      listType === LIST_TYPES.painted_distribution.name,
      true
      
    );
    // dispatch(toggleContextMenu({ id: itemId }));
    dispatch(
      setActiveItem({
        itemId: itemId,
        activeList: itemsMap[itemId]["listType"],
        activeSubType: itemsMap[itemId]["listSubtype"],
      })
    );
   
    // onSelectPin(itemId, listType === LIST_TYPES.painted_distribution.name)
  };
  const handleOpenDiagnosisModal = () => {
    dispatch(openICDModal({ itemId }));
  };

  useEffect(() => {
    if (mapContext !== "pin_select" || mapContext !== "region_select") {
      const marker = document.querySelector("#clicked_marker");
      if (marker) {
        marker.remove();
      }
    }
  }, [mapContext]);

  return (
    <Accordion
      id={"accordian-" + itemId}
      expanded={expanded}
      style={{ backgroundColor: itemId === activeItemId ? "#EEFCFF" : "" }}
    >
      <AccordionSummary>
        <input
          ref={fileUploadRef}
          type="file"
          accept="*"
          hidden
          onChange={handleUploadFile}
        />

        <input
          ref={imageUploadRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleUploadImage}
        />

        <div style={accordionItemStyle}>
          <IconButton onClick={onRemove} disabled={locked}>
            <IndeterminateCheckBoxRounded
              style={{
                opacity: locked ? "0.5" : "",
              }}
            />
          </IconButton>
          <div style={{ marginRight: "auto" }}>
            <NameAndPinRendererWithHierarchy itemId={itemId} />
            {!expanded && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <div className="listContent_itemToolbar" style={{ width: 144 }}>
                  <ButtonWithCount
                    onClick={handleUploadImageClick}
                    count={imagesCount}
                  >
                    <Tooltip title={uiData.icon_AddPhoto_help?.tr_text}>
                      <AddAPhotoRounded />
                    </Tooltip>
                  </ButtonWithCount>

                  <ButtonWithCount
                    count={filesCount}
                    onClick={handleUploadFileClick}
                  >
                    <Tooltip title={uiData.icon_AddAttachment_help?.tr_text}>
                      <InsertDriveFile />
                    </Tooltip>
                  </ButtonWithCount>
                  <ButtonWithCount
                    count={linkCount}
                    onClick={handleOpenLinkEditor}
                  >
                    <Tooltip title={uiData.icon_LinkEditor_help?.tr_text}>
                      <InsertLink />
                    </Tooltip>
                  </ButtonWithCount>
                </div>
                <div style={{ flex: 1 }}>
                  {!(listType === LIST_TYPES.painted_distribution.name) && (
                    <PinDescriptionRenderer itemId={itemId} />
                  )}
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={handleOpenDiagnosisModal}
                  >
                    <DiagnosisRenderer
                      icd={primaryDiagnosis.icd}
                      isPrimary={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={
            !expanded
              ? {
                  display: "flex",
                  flexDirection: "column",
                }
              : {
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  right: "0px",
                }
          }
        >
          <IconButton
            className={locked ? "item-handle-icon NoSort" : "item-handle-icon"}
            onClick={(e) => {
              locked &&
                toaster({
                  message: uiData.alert_ListLocked?.tr_text,
                  type: "info",
                });
            }}
          >
            <Tooltip title={uiData.icon_Reorder_help?.tr_text}>
              <Reorder
                style={{
                  cursor: locked ? "not-allowed" : "move",
                  color: "#707070",
                  marginLeft: "5px",
                  opacity: locked ? "0.5" : "",
                }}
              />
            </Tooltip>
          </IconButton>
          <div
            style={{
              marginTop: "auto",
              flexDirection: "column",
              display: "flex",
            }}
          >
            <IconButton className={"less-pad"} onClick={handleLocate}>
              {LIST_TYPES.painted_distribution.name === listType ? (
                <Tooltip title={uiData.icon_FindDistSeg_help?.tr_text}>
                  <FindInPage />
                </Tooltip>
              ) : (
                <Tooltip title={uiData.icon_FindPin_help?.tr_text}>
                  <RoomSharp />
                </Tooltip>
              )}
            </IconButton>

            <IconButton
              className={"less-pad"}
              onClick={(e) => setExpanded((prev) => !prev)}
            >
              {!expanded ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <CommonExpandedItem
            itemId={itemId}
            expanded={expanded}
            listType={listType}
            imagesCount={imagesCount}
            filesCount={filesCount}
            linkCount={linkCount}
            onUploadImageClick={handleUploadImageClick}
            onUploadFileClick={handleUploadFileClick}
            onOpenLinkEditor={handleOpenLinkEditor}
            subtypeOptions={subtypeOptions}
            pasteImg={pasteImg}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export const PinDescriptionRenderer = ({
  itemId,
  localDescChange = false,
  localDesc = null,
}) => {
  const { uiData } = useTranslations();
  const dispatch = useDispatch();
  const descriptions = useSelector(
    (state) => state.listStore.itemsMap[itemId].descriptions
  );
  const descriptionText = getPinDescriptionText(localDesc || descriptions);
  const color = useSelector((state) => {
    if (!itemId) return "";
    const { listType, listSubtype } = state.listStore.itemsMap[itemId];
    return chooseList(state.listStore.lists, listType, listSubtype).attr.color;
  });
  const handleOpenPinDescriptionModal = () => {
    return dispatch(openPinDescriptionModal(itemId));
  };
  const isFirstDescriptionEdited = useSelector((state) => {
    return itemId
      ? state.listStore.itemsMap[itemId].isFirstDescriptionEdited
      : false;
  });

  return (
    <div
      style={{
        color: descriptionText === "" ? "" : color,
        marginLeft: ".5rem",
        marginTop: ".8rem",
        cursor: "pointer",
        marginBlock: 4,
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
        position: "relative",
      }}
      onClick={handleOpenPinDescriptionModal}
    >
      <div style={{ position: "absolute", top: "-80%", left: "0" }}>
        {isFirstDescriptionEdited || localDescChange ? (
          <Warning style={{ color: "gold", fontSize: "1.2rem" }} />
        ) : (
          ""
        )}
      </div>
      {descriptionText
        ? descriptionText
        : uiData.label_PinDescription_No?.tr_text || "No pin description"}
    </div>
  );
};

export const CommonExpandedItem = ({
  itemId,
  listType,
  subtypeOptions,
  filesCount,
  imagesCount,
  linkCount,
  onOpenLinkEditor,
  onUploadImageClick,
  onUploadFileClick,
  pasteImg,
}) => {
  const { uiData } = useTranslations();
  const cpyImg = useSelector((state) => state.modals.copiedImg);
  const itemsMap = useSelector((state) => state.listStore.itemsMap);
  const lists = useSelector((state) => state.listStore.lists);
  const diagnosis = itemsMap[itemId].diagnoses;
  const morphologies = useSelector(
    (state) => state.listStore.itemsMap[itemId].morphologies
  );
  // const diagnoses = useSelector(
  //     (state) => state.listStore.itemsMap[itemId].diagnoses
  // );
  const dispatch = useDispatch();

  const hideQrHandler = () => {
    if (lists[listType].isGroupMode) {
      return lists[listType][itemsMap[itemId].listSubtype].attr.pinListSettings
        .use_qr;
    } else {
      return lists[listType].attr.pinListSettings.use_qr;
    }
  };

  return (
    <div className={"listContent_expandedInfo"}>
      <div className={"listContent_expandedInfo_qrCode-Region"}>
        <div>
          <ItemRegionPreview itemId={itemId} listType={listType} />
        </div>
        {hideQrHandler() && <ItemQRCode itemId={itemId} />}
      </div>
      {!(listType === LIST_TYPES.painted_distribution.name) && (
        <div className={"listContent_expandedInfo_description-Region"}>
          <PinDescriptionRenderer itemId={itemId} />
        </div>
      )}

      <div
        className="listContent_expandedInfo_Diagnosis"
        style={{ marginBlock: 16 }}
      >
        <ItemDiagnosis itemId={itemId} isGrouped={false} />
      </div>
      <div
        className="listContent_expandedInfo_Subtype-RegionType"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <ItemSubtypeSelector itemId={itemId} subtypeOptions={subtypeOptions} />
        <PopOverMenu listType={listType} itemId={itemId} />
      </div>
      <div className={"listContent_expandedInfo_Inputs"}></div>
      <div className={"listContent_expandedInfo_Notes"}>
        <ItemNotes itemId={itemId} />
      </div>
      <div className={"listContent_expandedInfo_Morphology"}>
        <Morphology
          itemId={itemId}
          isGrouped={false}
          morphologies={morphologies}
        />
      </div>
      <div className={"listContent_expandedInfo_MetaDataAccordion"}>
        <ItemAdditionalDocumentation itemId={itemId} />
      </div>

      <div className="listContent_expandedInfo_ImagesAndDocs col-2-des">
        <div className={"listContent_expandedInfo_ImagesAndDocsHandles col-1"}>
          <ButtonWithCount count={imagesCount} onClick={onUploadImageClick}>
            <Tooltip title={uiData.icon_AddPhoto_help?.tr_text}>
              <AddAPhotoRounded />
            </Tooltip>
          </ButtonWithCount>

          <div style={{ textAlign: "center" }}>
            <SaveIcon
              style={{ opacity: 0.7, cursor: "pointer" }}
              onClick={() => {
                pasteImg(cpyImg);
              }}
            />
          </div>
          <ButtonWithCount count={filesCount} onClick={onUploadFileClick}>
            <Tooltip title={uiData.icon_AddAttachment_help?.tr_text}>
              <InsertDriveFile />
            </Tooltip>
          </ButtonWithCount>
          <div style={{ textAlign: "center" }}>
            <GalleryIcon
              style={{ opacity: 0.7, cursor: "pointer" }}
              onClick={() => {
                dispatch(openSessionGalleryModal({ itemId, listType }));
              }}
            />
          </div>
        </div>
        <div className={"listContent_expandedInfo_ImagesSection col-2"}>
          <ItemFiles itemId={itemId} />
        </div>
      </div>
      <div className={"listContent_expandedInfo_Links col-2-des"}>
        <div className={"listContent_expandedInfo_LinksHandles col-1"}>
          <ButtonWithCount count={linkCount} onClick={onOpenLinkEditor}>
            <Tooltip title={uiData.icon_LinkEditor_help?.tr_text}>
              <InsertLink />
            </Tooltip>
          </ButtonWithCount>
        </div>
        <div className={"listContent_expandedInfo_LinksSection col-2"}>
          <ItemLinkViewer itemId={itemId} />
        </div>
      </div>
      <div className="listContent_expandedInfo_MetaDataAccordion">
        <MetadataAccordian itemId={itemId} />
      </div>
      <div className={"listContent_expandedInfo_DiagnosisDescriptionAccordion"}>
        <ICDDescriptionAccordian diagnosis={diagnosis} />
      </div>
    </div>
  );
};

export const ICDDescriptionAccordian = ({ diagnosis }) => {
  const { uiData } = useTranslations();

  const [copyData, setCopyData] = useState([]);
  const copyText = () => {
    let copiedData = "";
    //eslint-disable-next-line
    copyData.map((data) => {
      //eslint-disable-next-line
      copiedData = copiedData + data + "\n" + "\n";
    });
    navigator.clipboard.writeText(copiedData);
  };
  return (
    <Accordion style={{ backgroundColor: "#999", margin: "16px auto" }}>
      <AccordionSummary
        style={accordionStyle}
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {uiData.label_FNB_DiagnosisICD?.tr_text} -{" "}
          {uiData.listItem_MoreInformationBox?.tr_text}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div
            style={{
              textDecoration: "underline",
              marginBottom: "10px",
              fontWeight: 600,
              fontSize: "20px",
            }}
            onClick={() => {
              copyText();
            }}
          >
            {uiData.label_CodeTranslator_CopyAll?.tr_text}
          </div>
          {diagnosis.map((item, index) => {
            const { icd } = item;
            return (
              <DiagnosisDescription
                key={index}
                icd={icd}
                setCopyData={setCopyData}
              />
            );
          })}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export const ItemNotes = ({ itemId }) => {
  const notes = useSelector((state) => state.listStore.itemsMap[itemId].notes);
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);
  const encounterInfo = useSelector(
    (state) => state.userSettings.encounterInfo
  );
  const index = useSelector((state) => state.listStore.itemsOrderMap[itemId]);
  const { names, listType, listSubtype } = useSelector(
    (state) => state.listStore.itemsMap[itemId]
  );
  const { order } = useSelector(
    (state) => chooseList(state.listStore.lists, listType, listSubtype).attr
  );
  const handleNote = (i) => {
    const a = i;
    setNoteState(noteState + " - " + i);
  };

  // const subType = uiData[LIST_TYPES_MAPPING[listType][listSubtype].translation_key]?.tr_text|| LIST_TYPES_MAPPING[listType][listSubtype].default_label
  const descriptions = useSelector(
    (state) => state.listStore.itemsMap[itemId].descriptions
  );
  const descriptionText = getPinDescriptionText(descriptions);
  const dispatch = useDispatch();
  const { uiData } = useTranslations();
  const [noteState, setNoteState] = useState(notes);
  // const timeoutRef = useRef()
  const dob = patientInfo.DOB
    ? `${uiData.label_FNB_PtDOB.emoji_code} ${getDate(patientInfo.DOB)}`
    : "";
  const encDate = encounterInfo.dateTime
    ? ` ${uiData.label_FNB_EncounterDate.emoji_code} ${getDate(
        encounterInfo.dateTime
      )}`
    : "";
  const pinOrder = order && order !== "--" ? ORDERS[order].resolve(index) : "";
  const desc = descriptionText
    ? descriptionText
    : uiData.label_PinDescription_No?.tr_text || "No pin description";
  const chipItem = [dob, encDate, pinOrder, listSubtype, desc];
  const items = chipItem.filter((e) => {
    return e !== "";
  });

  return (
    <>
      <TextField
        label={uiData?.transtext_Notes?.tr_text}
        variant={"outlined"}
        multiline
        rows={3}
        fullWidth
        size="small"
        color={"primary"}
        style={{ marginBlock: 16, zIndex: 0 }}
        onBlur={() => {
          dispatch(changeItemNotes({ itemId, notes: noteState }));
        }}
        value={noteState}
        onChange={(e) => {
          setNoteState(e.target.value);
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "4px",
          flexWrap: "wrap",
          marginBottom: "6px",
        }}
      >
        {items.map((item, i) => {
          return (
            <div id={i} onClick={() => handleNote(item)}>
              <Chip label={item} clickable color="primary" variant="outlined" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export const ItemSubtypeSelector = ({ itemId, subtypeOptions }) => {
  const subtype = useSelector(
    (state) => state.listStore.itemsMap[itemId].listSubtype
  );
  const uiData = useTranslations().uiData;
  const dispatch = useDispatch();
  const onChangeSubtype = (e) => {
    dispatch(changeItemSubtype({ itemId, subtype: e.target.value, uiData }));
  };
  return (
    <div className={"listContent_expandedInfo_Subtype-RegionType"}>
      <TextField
        select
        label={"Type"}
        style={{ marginBlock: 6, zIndex: 0 }}
        SelectProps={{
          native: true,
        }}
        value={subtype}
        onChange={onChangeSubtype}
        variant="outlined"
        color={"primary"}
        size={"small"}
        // className="listContent__basicInfo__dropdown"
      >
        {subtypeOptions.map(({ name, default_label, translation_key }) => (
          <option key={name} value={name}>
            {uiData[translation_key]?.tr_text || default_label}
          </option>
        ))}
      </TextField>
    </div>
  );
};

export const ItemRegionPreview = ({ itemId, listType, height, width }) => {
  const layerInfo = useSelector(
    (state) => state.listStore.itemsMap[itemId].layerInfo
  );
  const pathId = useSelector(
    (state) => state.listStore.itemsMap[itemId].pathId
  );
  return (
    pathId && (
      <RegionPreview
        listType={listType}
        layerInfo={layerInfo}
        itemId={itemId}
        height={height ? height : PREVIEW_ITEM_SVG_SIZE}
        width={width}
        pathId={pathId}
      />
    )
  );
};

export const ItemAdditionalDocumentation = ({ itemId }) => {
  const { uiData } = useTranslations();
  return (
    <Accordion
      className="listContent__additionalMetaData"
      style={{ backgroundColor: "#999" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        -- {uiData.transtext_show?.tr_text}{" "}
        {uiData.label_ShowAdditionalDocumentation?.tr_text} --
      </AccordionSummary>
      <AccordionDetails className="app__mainBody__list__body">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, optio
        itaque beatae id, nam laborum maxime amet illo laboriosam veniam sed
        quasi dignissimos blanditiis porro maiores deleniti modi ipsam eaque.
      </AccordionDetails>
    </Accordion>
  );
};
export const PopOverMenu = ({ listType, itemId }) => {
  const { uiData } = useTranslations();
  const [popOverRef, setPopOverRef] = useState(null);
  const dispatch = useDispatch();
  let pins = [];
  let pin_subtypes = [];
  let region_subtypes = [];
  let subtypes = [];
  for (let x in LIST_TYPES_MAPPING) {
    if (x !== "painted_distribution") {
      pins.push(x);
      for (let y in LIST_TYPES_MAPPING[x]) {
        subtypes.push(y);
      }

      pin_subtypes.push(subtypes);
      subtypes = [];
    } else {
      for (let y in LIST_TYPES_MAPPING[x]) {
        region_subtypes.push(y);
      }
    }
  }
  const item = useSelector((state) => state.listStore.itemsMap[itemId]);
  const onChangetype = (type, subtype) => {
    dispatch(changeItemListType({ itemId, subtype, type, uiData }));
  };
  return (
    <>
      {item.pathId && (
        <div
          style={{
            width: "30px",
            height: "26px",
            objectFit: "contain",
            margin: "auto 0",
          }}
          onClick={(e) => {
            setPopOverRef(e.currentTarget);
          }}
        >
          {listType !== LIST_TYPES.painted_distribution.name && (
            <img src={selectDistSeg} alt="" />
          )}
          {listType === LIST_TYPES.painted_distribution.name && (
            <img
              style={{
                width: "30px",
                height: "26px",
                objectFit: "contain",
                margin: "auto 0",
              }}
              src={selectPinSeg}
              alt=""
            />
          )}
        </div>
      )}

      {item.pathId && listType === LIST_TYPES.painted_distribution.name ? (
        <Popover
          open={popOverRef != null}
          anchorEl={popOverRef}
          onClose={() => {
            setPopOverRef(null);
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <List component="nav" aria-label="secondary mailbox folder">
            {pins.map((name, idx) => (
              <>
                <ListItem
                  key={name}
                  value={name}
                  style={{ fontWeight: "bold" }}
                >
                  {uiData[LIST_TYPES[name].translation_key]?.tr_text ||
                    LIST_TYPES[name].default_label}
                </ListItem>
                <List component="nav" aria-label="secondary mailbox folder">
                  {pin_subtypes[idx].map((n) => {
                    return (
                      <ListItem
                        key={n}
                        value={n}
                        button
                        onClick={() => {
                          onChangetype(name, n);
                        }}
                      >
                        {
                          /*eslint-disable-next-line */
                          (uiData[
                            LIST_TYPES_MAPPING[name][n].translation_key
                          ] &&
                            uiData[LIST_TYPES_MAPPING[name][n].translation_key]
                              ?.tr_text) ||
                            LIST_TYPES_MAPPING[name][n].default_label
                        }
                      </ListItem>
                    );
                  })}
                </List>
              </>
            ))}
          </List>
        </Popover>
      ) : (
        <Popover
          open={popOverRef != null}
          anchorEl={popOverRef}
          onClose={() => {
            setPopOverRef(null);
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <List component="nav" aria-label="secondary mailbox folder">
            <ListItem
              key={"painted_distribution"}
              value={"painted_distribution"}
              style={{ fontWeight: "bold" }}
            >
              {uiData[LIST_TYPES["painted_distribution"].translation_key]
                ?.tr_text || LIST_TYPES["painted_distribution"].default_label}
            </ListItem>
            <List component="nav" aria-label="secondary mailbox folder">
              {region_subtypes.map((name) => (
                <ListItem
                  key={name}
                  value={name}
                  button
                  onClick={() => {
                    onChangetype("painted_distribution", name);
                  }}
                >
                  {(uiData[LIST_TYPES_MAPPING["painted_distribution"][name]] &&
                    uiData[
                      LIST_TYPES_MAPPING["painted_distribution"][name]
                        .translation_key
                    ]?.tr_text) ||
                    LIST_TYPES_MAPPING["painted_distribution"][name]
                      .default_label}
                </ListItem>
              ))}
            </List>
          </List>
        </Popover>
      )}
    </>
  );
};
