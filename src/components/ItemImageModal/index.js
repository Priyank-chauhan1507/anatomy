import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Popover,
  Select,
  Slider,
  Switch,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import {
  AddOutlined,
  Delete,
  GetApp,
  RemoveOutlined,
  SwapHoriz,
} from "@material-ui/icons";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Close from "@material-ui/icons/Close";
import CropIcon from "@material-ui/icons/Crop";
import HelpIcon from "@material-ui/icons/Help";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import LabelIcon from "@material-ui/icons/Label";
import LinkIcon from "@material-ui/icons/Link";
import PdfViewer from "./PdfViewer";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";
import SearchIcon from "@material-ui/icons/Search";
import { Skeleton } from "@material-ui/lab";
import EXIF from "exif-js";
import { saveAs } from "file-saver";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ORDERS, SNS_RENDERER } from "../../constants/itemConstants";
import { FILE_NAME_BUILDER_OPTIONS_MAP } from "../../constants/userSettings";
import { useSNS } from "../../hooks/listAndItemHooks";
import { useDiagnosis } from "../../hooks/useDiagnosis";
import useTranslations from "../../hooks/useTranslations";
import {
  removeGallery,
  transferFileFromGallery,
  updateItemFiles,
} from "../../store/slices/lists";
import {
  closeDeleteModal,
  closeItemImageModal,
  openDeleteModal,
} from "../../store/slices/modals";
import { changeFileNameSettings } from "../../store/slices/userSettings";
import { getDate, getEmojiGroupString } from "../../utils/cf";
import { getFile, getImage, storeImage } from "../../utils/fileCache";
import { numberToRoman } from "../../utils/helpers";
import { translateTags } from "../../utils/translationHelpers";
import Editor from "../ImageEditor";
import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy";
import { Listss } from "../ListsRenderer/GalleryThrash";
import { PinDescriptionRenderer } from "../ListsRenderer/ItemTemplates";
import PatientInfo from "../PatientInfo/PatientInfo";
import { RegionPreview } from "../SVGRegionRenderer";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  backgroundColor: "white",

  boxShadow: 24,
  padding: 10,
  width: window.matchMedia("(min-width: 500px)").matches ? "50vw" : "390px",
  maxHeight: "90%",
  overflow: "scroll",
  overflowX: "scroll",
};
const styledeleteModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  backgroundColor: "white",

  boxShadow: 24,
  padding: 10,
  width: "fit-content",
  maxHeight: "90%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const DiagnosisRenderer = ({ isPrimary, icd }) => {
  const { data, isLoaded } = useDiagnosis(icd);
  return (
    <div style={{ fontSize: isPrimary ? 16 : 14 }}>
      {isLoaded ? `${data.diagnosis} (${icd})` : <Skeleton variant="text" />}
    </div>
  );
};

const DiagnosisExtensionRenderer = ({ isPrimary, icd, exts }) => {
  const { data, isLoaded } = useDiagnosis(icd);
  const opt = "";
  return (
    <div style={{ fontSize: isPrimary ? 16 : 14 }}>
      {isLoaded && exts.length > 0
        ? exts.map((val) => {
          const ext = val.id;
          return `${data.postCoordination[ext][opt]}`;
        })
        : null}
    </div>
  );
};

const ItemRegionPreview = ({ itemId, listType }) => {
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
        height={100}
        pathId={pathId}
      />
    )
  );
};

const ImageContainer = ({
  itemId,
  index,
  onCloseModal,
  onDeleteFile,
  onTransferFile,
}) => {
  const {
    tags: t,
    tagsArray,
    language,
    uiData,
    lateralityData,
    anatomicData,
  } = useTranslations();
  const diagnoses = useSelector(
    (state) => state.listStore.itemsMap[itemId].diagnoses
  );
  const [tagMenuEl, setTagMenuEl] = useState(null);

  const fileLibrary = useSelector((state) => state.listStore.itemsMap);

  const open = Boolean(tagMenuEl);
  const dispatch = useDispatch();
  const file = useSelector(
    (state) => state.listStore.itemsMap[itemId].files[index]
  );

  const item = useSelector((state) => state.listStore.itemsMap[itemId]);
  const [tagsCount, setTagsCount] = useState(file.tags.length);
  const { sequence, delimiter, useEmoji } = useSelector(
    (state) => state.userSettings.fileNameSettings
  );
  const clinicInfo = useSelector((state) => state.userSettings.userSettings);
  const encounterInfo = useSelector(
    (state) => state.userSettings.encounterInfo
  );
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);
  const allFiles = useSelector(
    (state) => state.listStore.itemsMap[itemId].files
  );
  const setFiles = (files) => {
    dispatch(updateItemFiles({ itemId, files }));
  };
  const handleFileTags = (value) => {
    const newFiles = [...allFiles];
    newFiles[index] = {
      ...newFiles[index],
      tags: value,
    };
    setTagsCount(newFiles[index].tags.length);
    setFiles(newFiles);
  };
  const [pdfFile, setPdfFile] = useState(null);

  const openViewer = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setPdfFile(e.target.result);
    };
    return pdfFile;
  };
  const contentData =
    file.contentType === "image" ? getImage(file.id) : getFile(file.id);

  const [originalImage, setOriginalImage] = useState(contentData);
  const [zoomLvl, setZoomLvl] = useState(1);
  const [isRotateMode, setIsRotateMode] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [isCropMode, setIsCropMode] = useState(false);
  const [includeMetadata, setIncludeMetadata] = useState(false);
  const mediaMatch = window.matchMedia("(max-width: 500px)");
  const idx = useSelector((state) => state.listStore.itemsOrderMap[itemId]);
  const { names } = useSelector((state) => state.listStore.itemsMap[itemId]);

  const sns = useSNS(itemId);
  //eslint-disable-next-line
  const [visibilityMap, setVisibilityMap] = useState(new Set());
  const trData = { lateralityData, uiData, anatomicData };

  const orderList = sns.orderList
    .map((item) => {
      const newItem = { ...item };
      var value = "";
      if (item.visible) {
        value = item.isArray
          ? names[item.id]
            .map((_, i) =>
              SNS_RENDERER[item.id].renderer(trData, names, i, item, {
                visibilityMeta: visibilityMap,
              })
            )
            .join(" ")
          : SNS_RENDERER[item.id].renderer(trData, names, null, item, {
            visibilityMeta: visibilityMap,
          });
      }

      newItem.value = value;
      return newItem;
    })
    .filter(({ visible, value }) => {
      return visible && value !== "";
    });

  // const anatomic_site = orderList.filter((item) => {
  //   return item.value !== "" && item.id === "anatomic_site";
  // })[0].value;

  // const icd_code = orderList.filter((item) => {
  //   return item.value !== "" && item.id === "icd_codes";
  // })[0];

  // const laterality = orderList
  //   .filter((item) => {
  //     return item.value !== "" && item.id === "laterality";
  //   })[0]
  //   ["value"].toLowerCase();
  // const laterality_code = lateralityData[laterality].icd_code;
  let allMetaData;
  const [ExifData, setExifData] = useState("");
  let exif = {};
  useEffect(() => {
    let img2 = document.getElementById(`${originalImage}`);
    const extension = file.name.split(".");
    const ext = extension[extension.length - 1];
    if (ext === "jpeg" || ext === "jpg") {
      EXIF.getData(img2, function () {
        //eslint-disable-next-line
        allMetaData = EXIF.getAllTags(this);
        setExifData(CreateExif(allMetaData, exif));
      });
    }
  });

  let obj = {
    ...patientInfo,
    ...item,
    ...file,
    ...clinicInfo,
    ...encounterInfo,
    amid: item.egz.amid,
    emojiGroup: getEmojiGroupString(
      anatomicData[item.names.amid].emoji_group,
      item.names,
      lateralityData
    ),
  };

  const Filename = CreateName(
    obj,
    itemId,
    anatomicData,
    ORDERS,
    uiData,
    useEmoji,
    item,
    sequence,
    tagsArray,
    delimiter,
    file,
    idx,
    index,
    orderList
  );

  const setOtherSettings = (name, value) =>
    dispatch(changeFileNameSettings({ name, value }));
  // const { order } = useSelector(
  //   (state) => chooseList(state.listStore.lists, listType, listSubtype).attr
  // );

  const download = () => {
    let FileName = Filename;

    if (FileName.length > 201) {
      FileName = FileName.slice(0, 200);
      const extension = file.name.split(".");
      FileName = FileName + "...";

      FileName += "." + extension[extension.length - 1];
    }

    if (!includeMetadata) saveAs(contentData, FileName);
    else {
      saveAs(contentData, FileName);
    }
  };

  const handleTagMenuClick = (event) => {
    setTagMenuEl(event.currentTarget);
  };

  const handleOpen = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleTagMenuClose = () => {
    setTagMenuEl(null);
  };

  const handleTagRemove = (tagID) => {
    const arr = [...file.tags];

    const idx = arr.indexOf(tagID);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
    const newFiles = [...allFiles];
    newFiles[index] = {
      ...newFiles[index],
      tags: arr,
    };
    setTagsCount(newFiles[index].tags.length);
    setFiles(newFiles);
  };

  const handleNotesChange = (val) => {
    const newFiles = [...allFiles];
    newFiles[index] = {
      ...newFiles[index],
      notes: val,
    };
    setFiles(newFiles);
  };

  const handleImageChange = (img) => {
    let dataUrl = img.split(",");
    let base64 = dataUrl[1];
    let mime = dataUrl[0].match(/:(.*?);/)[1];
    let bin = atob(base64);
    let buf = new ArrayBuffer(bin.length);
    let arr = new Uint8Array(buf);
    bin.split("").forEach((e, i) => (arr[i] = e.charCodeAt(0)));

    let f = new File([buf], "filename", { type: mime });

    // storeImage(f, file.id)
    const id = storeImage(f);
    const newFiles = [...allFiles];
    const prevId = newFiles[index].id;
    newFiles[index] = {
      ...newFiles[index],
      id: id,
    };

    setFiles(newFiles);
    //eslint-disable-next-line
    Object.entries(fileLibrary).map((bucket) => {
      if (bucket[0] !== itemId) {
        var currFiles = [];
        //eslint-disable-next-line
        bucket[1].files?.map((file) => {
          if (file.id === prevId) {
            file.id = id;
          }
          currFiles.push(file);
        });
        dispatch(updateItemFiles({ itemId: bucket[0], files: currFiles }));
      }
    });
  };
  const onUnlinkFile = useCallback(
    (e) => {
      // deleteImage(imageId);
      dispatch(removeGallery({ itemId, index }));
      onCloseModal();
    },
    //eslint-disable-next-line
    [dispatch, itemId, index]
  );

  return (
    <Box style={style}>
      <PatientInfo
        color={"black"}
        withBorder={true}
        isAvatarModal={false}
        isSmallAvatar={true}
      />

      <div>
        <div>
          <SearchIcon fontSize="small" />{" "}
          <span style={{ fontStyle: "italic" }}>
            <strong>{uiData?.listItem_Diagnosis?.tr_text}:</strong>
          </span>
          {diagnoses
            .filter(({ icd }) => icd)
            .map(({ icd }, index) => {
              return (
                <DiagnosisRenderer
                  key={icd}
                  icd={icd}
                  isPrimary={index === 0}
                />
              );
            })}
        </div>

        <div>
          <SearchIcon fontSize="small" />{" "}
          <span style={{ fontStyle: "italic" }}>
            <strong>{uiData?.listItem_DiagnosisExtensions?.tr_text}:</strong>
          </span>
          {diagnoses
            .filter(({ exts }) => exts)
            .map(({ icd, exts }, index) => {
              return (
                <DiagnosisExtensionRenderer
                  key={icd}
                  icd={icd}
                  isPrimary={index === 0}
                  exts={exts}
                />
              );
            })}
        </div>
      </div>

      <ItemRegionPreview itemId={itemId} listType={item.listType} />

      <NameAndPinRendererWithHierarchy itemId={itemId} />
      <PinDescriptionRenderer itemId={itemId} />
      <div style={{ border: " 1px solid black" }}>
        {file.contentType === "image" ? (
          isRotateMode || isCropMode ? (
            <Editor
              path={originalImage}
              onExit={(img) => {
                setOriginalImage(img);
                isRotateMode ? setIsRotateMode(false) : setIsCropMode(false);
                handleImageChange(img);
              }}
              menuItems={isRotateMode ? ["rotate"] : ["crop"]}
            />
          ) : (
            <TransformWrapper>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "0px 5px 0px 0px",
                      width: 20,
                      height: 140,
                      alignSelf: "flex-start",
                      border: "0px solid red",
                    }}
                  >
                    <span>
                      <AddOutlined color="primary" />
                    </span>
                    <Slider
                      style={{ left: mediaMatch.matches ? "-10px" : "" }}
                      orientation={"vertical"}
                      step={0.1}
                      min={1}
                      max={6.4}
                      value={zoomLvl}
                      onChange={(e, newValue) => {
                        if (newValue > zoomLvl) zoomIn(newValue);
                        else if (newValue < zoomLvl) zoomOut(newValue);
                        else if (newValue === 1) {
                          resetTransform();
                        }
                        setZoomLvl(newValue);
                      }}
                      valueLabelDisplay="auto"
                    />
                    <span>
                      <RemoveOutlined color="primary" />
                    </span>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setZoomLvl(1);
                        resetTransform();
                      }}
                    >
                      <CheckBoxOutlineBlankIcon fontSize="small" />
                    </IconButton>
                  </div>
                  <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <TransformComponent>
                      <img
                        id={`${originalImage}`}
                        style={{
                          width: "360px",
                          height: "360px",
                          objectFit: "contain",
                        }}
                        src={originalImage}
                        alt="img"
                      />
                    </TransformComponent>
                  </div>
                </div>
              )}
            </TransformWrapper>
          )
        ) : file.type === "application/pdf" ? (
          // <PictureAsPdfOutlinedIcon
          //   style={{
          //     width: "360px",
          //     height: "360px",
          //   }}
          //             />
          contentData && (
            <PdfViewer
              style={{ width: "100%", height: "400px" }}
              pdfFile={openViewer(contentData)}
            />
          )
        ) : (
          <InsertDriveFileOutlinedIcon
            style={{
              width: "360px",
              height: "360px",
            }}
          />
        )}
      </div>

      {
        !(file.type === 'application/pdf') &&
        <div style={{ display: "flex", marginTop: "0px" }}>
          {/* {
          file.type===
        } */}
          <div style={{ margin: "0px 0px 0px 0px" }}>
            <IconButton
              color={isRotateMode ? "primary" : "default"}
              onClick={() => {
                setIsRotateMode(!isRotateMode);
                isCropMode
                  ? setIsCropMode(!isCropMode)
                  : setIsCropMode(isCropMode);
              }}>
              <Rotate90DegreesCcwIcon />
            </IconButton>
          </div>

          <div>
            <IconButton
              color={isCropMode ? "primary" : "default"}
              onClick={() => {
                setIsCropMode(!isCropMode);
                isRotateMode
                  ? setIsRotateMode(!isRotateMode)
                  : setIsRotateMode(isRotateMode);
              }}>
              <CropIcon />
            </IconButton>
          </div>
        </div>
      }
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: ".5rem",
          marginTop: ".5rem",
        }}
      >
        {/* <Tooltip
                placement="top"
                title={uiData.label_FNB_UseEmojis_help.tr_text}
              >
                <HelpIcon /> */
        /* </Tooltip> */}
        <Switch
          checked={useEmoji}
          onChange={(e) => {
            setOtherSettings("useEmoji", e.target.checked);
          }}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <span>
          <strong>{uiData.label_FNB_UseEmojis.tr_text}</strong>
        </span>{" "}
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <IconButton onClick={handleTagMenuClick}>
            {tagsCount > 0 ? (
              <span className="badge badgeStyles" style={{ top: 5, right: 8 }}>
                {tagsCount}
              </span>
            ) : null}
            <LabelIcon color="success" />
          </IconButton>
          <Menu
            anchorEl={tagMenuEl}
            open={open}
            onClose={handleTagMenuClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: "250",
              },
            }}
          >
            {tagsArray.map((tag) => (
              <MenuItem
                key={tag.id}
                value={tag.id}
                onClick={(e) => {
                  e.stopPropagation();
                  let arr = [...file.tags];
                  if (!arr.includes(e.target.value)) {
                    arr.push(e.target.value);
                  } else {
                    const idx = arr.indexOf(e.target.value);
                    if (idx > -1) {
                      arr.splice(idx, 1);
                    }
                  }
                  handleFileTags(arr);
                }}
                selected={file.tags.includes(tag.id) ? true : false}
              >
                {translateTags(tag.id, { tags: t, language })}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {file.tags.length > 0 ? (
            <ReactSortable
              list={file.tags}
              setList={(e) => {
                //   "🚀 ~ file: index.js ~ line 377 ~ ImageContainer ~ e",
                //   e
                // );
                let flag = true;
                for (let i = 0; i < e.length; i++) {
                  if (typeof e[i] === "object") {
                    flag = false;
                    break;
                  }
                }
                if (flag) handleFileTags(e);
              }}
            >
              {file.tags.map((tagId) => (
                <Chip
                  key={tagId}
                  label={translateTags(tagId, { tags: t, language })}
                  onDelete={() => handleTagRemove(tagId)}
                  style={{ margin: "2px 3px 3px 0px" }}
                />
              ))}
            </ReactSortable>
          ) : null}
        </div>
      </div>

      <div style={{ margin: "10px 0px 0px 0px" }}>
        <TextField
          id="outlined-basic"
          label={uiData?.label_FNB_PhotoAttachmentNotes?.tr_text}
          className="Attachment-Notes"
          variant="outlined"
          size="small"
          defaultValue={file.notes}
          onChange={(e) => {
            handleNotesChange(e.target.value);
          }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>{Filename}</div>
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "14px" }}>
          {uiData?.label_lightbox_IncludeMetadataExif?.tr_text}
        </span>
        <Tooltip
          title={uiData?.label_lightbox_IncludeMetadataExif_help?.tr_text}
          arrow
          enterTouchDelay={30}
        >
          <HelpIcon style={{ cursor: "pointer" }} fontSize="small" />
        </Tooltip>
        <Switch
          color="primary"
          checked={includeMetadata}
          onChange={() => {
            setIncludeMetadata(!includeMetadata);
          }}
          size="small"
        />
      </div>

      {includeMetadata && ExifData !== "" && (
        <div>
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>Metadata :</div>
          {ExifData}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <IconButton onClick={handleOpen}>
          <SwapHoriz />
        </IconButton>

        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          anchorOrigin={{ vartical: "bottom", horizontal: "left" }}
          onClose={() => setAnchor(null)}
        >
          <>
            <Typography
              style={{ padding: " 12px 10px" }}
              variant="h5"
              component="h2"
            >
              {uiData?.label_lightbox_TransferPhotoAttachment?.tr_text}
            </Typography>

            <FormControl fullWidth>
              <InputLabel htmlFor="listItem" style={{ fontSize: "1.2rem" }}>
                {" "}
                {uiData?.transtext_ListItem?.tr_text}
              </InputLabel>

              <Select
                fullWidth
                value={selectedItem || ""}
                onChange={handleChange}
                defaultValue=""
              >
                {Listss()}
              </Select>
            </FormControl>

            <Button
              onClick={(e) => {
                let finalId = selectedItem;

                onTransferFile(itemId, finalId, index);
              }}
              variant="text"
              color="primary"
              style={{ paddingTop: 20 }}
            >
              {uiData?.label_Transfer?.tr_text}
            </Button>
          </>
        </Popover>
        <IconButton onClick={download} style={{ paddingTop: "15px" }}>
          <GetApp />
        </IconButton>
        {!file.original && (
          <IconButton
            onClick={() => {
              // Delete
              onUnlinkFile();
            }}
          >
            <LinkIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            // Delete
            onDeleteFile();
          }}
        >
          <Delete />
        </IconButton>
      </div>
      <Close
        style={{
          position: "fixed",
          top: "1%",
          left: "93%",
          cursor: "pointer",
        }}
        onClick={() => onCloseModal()}
      />
    </Box>
  );
};
const DeleteModal = ({ itemId, index, deleteState, onCloseModal }) => {
  const { uiData } = useTranslations();
  const dispatch = useDispatch();
  const file = useSelector(
    (state) => state.listStore.itemsMap[itemId].files[index]
  );

  const fileLibrary = useSelector((state) => state.listStore.itemsMap);

  const onDeleteFile = useCallback(
    (e) => {
      // deleteImage(imageId);
      dispatch(removeGallery({ itemId, index }));
      //eslint-disable-next-line
      Object.entries(fileLibrary).map((bucket) => {
        if (bucket[0] !== itemId) {
          //eslint-disable-next-line
          bucket[1].files?.map((currfile, i) => {
            if (currfile.id === file.id) {
              dispatch(removeGallery({ itemId: bucket[0], index: i }));
            }
          });
        }
      });
      onCloseModal();
      onCloseDeleteModal();
    },
    //eslint-disable-next-line
    [dispatch, itemId, index]
  );
  const onCloseDeleteModal = () => {
    dispatch(closeDeleteModal());
  };
  return (
    uiData && (
      <Modal
        open={deleteState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ outline: "none", border: "none" }}
      >
        <Box style={styledeleteModal}>
          <div>
            <h3>
              {uiData.label_Are_You_Sure.tr_text}&nbsp;
              {uiData.label_Delete.tr_text}&nbsp;
              {uiData.transtext_this.tr_text}&nbsp;
              {uiData.label_Photo.emoji_code}&nbsp;
              {uiData.label_Photo.tr_text}?
              {uiData?.alert_DeleteAllInstances_help?.tr_text}
            </h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                style={{ marginLeft: "100px" }}
                onClick={() => {
                  // Delete
                  onDeleteFile();
                }}
              >
                {uiData.label_Yes.tr_text}
              </IconButton>
              <IconButton
                style={{ marginLeft: "100px" }}
                onClick={() => {
                  onCloseDeleteModal();
                }}
              >
                {uiData.label_No.tr_text}
              </IconButton>
            </div>
          </div>
        </Box>
      </Modal>
    )
  );
};
export default function ItemImageModal() {
  const { state: openModal, data: modalData } = useSelector(
    (state) => state.modals.itemImage
  );
  const { state: deleteState } = useSelector((state) => state.modals.deleteImg);
  const dispatch = useDispatch();
  const { itemId, index } = modalData;

  const onCloseModal = () => {
    dispatch(closeItemImageModal());
  };
  const onTransferFile = useCallback(
    (initialId, finalId, index) => {
      dispatch(transferFileFromGallery({ initialId, finalId, index }));
      dispatch(closeItemImageModal());
    },
    [dispatch]
  );

  const onDelete = () => {
    dispatch(openDeleteModal());
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => {
          // setOpenMod
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ outline: "none", border: "none" }}
      >
        {itemId && index !== -1 ? (
          <ImageContainer
            itemId={itemId}
            index={index}
            onCloseModal={onCloseModal}
            onDeleteFile={onDelete}
            onTransferFile={onTransferFile}
          />
        ) : (
          <></>
        )}
      </Modal>
      {itemId && index !== -1 && (
        <DeleteModal
          itemId={itemId}
          index={index}
          deleteState={deleteState}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
}

export function CreateName(
  obj,
  itemId,
  anatomicData,
  ORDERS,
  uiData,
  useEmoji,
  item,
  sequence,
  tagsArray,
  delimiter,
  file,
  idx,
  index,
  orderList,
  order
) {
  let name = "";
  orderList?.forEach((item) => {
    if (item.value !== "") {
      name += item.value;
      name += " ";
    }
  });
  name = name.slice(0, -1);
  obj["diagnosisICD"] = `${item.diagnoses[0]?.icd}`;
  obj["fileType"] = `${item.files[0].type}`;
  const laterality = item.names.laterality
    .map((x) => {
      return x;
    })
    .join(" ");
  obj["laterality"] = `${laterality}`;
  const pinDescription = item.descriptions
    //eslint-disable-next-line
    .map((x) => {
      if (x !== "") return x;
    })
    .join(" ");
  obj["pinDescription"] = `${pinDescription}`;
  obj["anatomicSiteName"] = name;
  obj["originalFileName"] = `${item.files[0].name}`;
  obj["anatomyICD"] = `${anatomicData[item.names.amid].icd_code}`;
  obj["fileCreationDate"] = `${item.files[0].fileCreationDate}`;
  obj["originalFileName"] = file.name;
  obj["attachmentNotes"] = `${file.notes}`;
  if (order) {
    obj["orderMarker"] = `${ORDERS[order].resolve(idx)}·${obj.listSubtype}`;
  }
  obj["pinId"] = `${itemId}`;
  obj[`testID`] = `${itemId}`;
  obj["BucketOrder"] = `${index + 1}`;
  // obj["mapVersion"] = document
  //   .querySelector("#loaded-svg-cont")
  //   .childNodes[0].childNodes[0].childNodes[2].childNodes[1].childNodes[1].getAttribute(
  //     "am:version"
  //   );
  obj["mapVersion"] = '-';

  const seq = sequence.filter((key) => {
    if (
      obj[key.id] === undefined ||
      obj[key.id] === "" ||
      obj[key.id] === null ||
      (Array.isArray(obj[key.id]) && obj[key.id].length === 0) ||
      (key.id === "emojiGroup" && !useEmoji)
    ) {
      return false;
    } else return true;
  });

  seq.forEach((key) => {
    if (
      key.id === "dateTime" ||
      key.id === "DOB" ||
      key.id === "fileCreationDate"
    ) {
      obj[key.id] = getDate(obj[key.id]);
    } else if (key.id === "skinType") {
      obj[key.id] = "(" + numberToRoman(parseFloat(obj[key.id])) + ")";
    } else if (key.id === "monkType") {
      obj[key.id] = `MST-${obj[key.id]}`;
    } else if (key.id === "coords" && typeof obj[key.id] !== "string") {
      obj[key.id].svgCoords.x = Math.round(obj[key.id].svgCoords.x);
      obj[key.id].svgCoords.y = Math.round(obj[key.id].svgCoords.y);
      obj[key.id] = `x-(${obj[key.id].svgCoords.x}) y-(${obj[key.id].svgCoords.y
        })`;
    } else if (key.id === "gender" && useEmoji) {
      let female_emoji = uiData["label_PT_Sex_Female"]["emoji_code"];
      let male_emoji = uiData["label_PT_Sex_Male"]["emoji_code"];
      let others_emoji = uiData["label_PT_Sex_Other"]["emoji_code"];
      if (obj[key.id] === "male") {
        obj[key.id] = male_emoji + " " + obj[key.id];
      } else if (obj[key.id] === "female") {
        obj[key.id] = female_emoji + " " + obj[key.id];
      } else {
        obj[key.id] = others_emoji + " " + obj[key.id];
      }
    } else if (obj[key.id] === undefined) {
      obj[key.id] = "NA";
    }
  });

  let fileName = seq
    .map((key) => {
      if (useEmoji && obj[key.id] && key.id !== "BucketOrder") {
        if (
          uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
            .emoji_code
        ) {
          if (key.id === "tags" && obj[key.id] !== "NA") {
            return (
              uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
                .emoji_code +
              " " +
              obj[key.id]
                .map((x) => {
                  return tagsArray[x - 1].emoji_code;
                })
                .join("")
            );
          } else {
            return (
              uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
                .emoji_code +
              " " +
              obj[key.id]
            );
          }
        } else return obj[key.id];
      } else if (
        obj[key.id] &&
        key.id !== "BucketOrder" &&
        uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
          .element_AdditionalProperties
      ) {
        return (
          uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
            .element_AdditionalProperties + obj[key.id]
        );
      } else {
        return obj[key.id];
      }
    })
    .join(useEmoji ? "\u2022" : delimiter);

  const extension = file.name.split(".");
  fileName += "." + extension[extension.length - 1];
  return fileName;
}
const CreateExif = (allMetaData, exif) => {
  if (allMetaData.ImageDescription)
    exif.ImageDescription = allMetaData.ImageDescription;
  if (allMetaData.Artist) exif.Artist = allMetaData.Artist;
  if (allMetaData.copyright) exif.copyright = allMetaData.copyright;
  if (allMetaData.DateTimeDigitized)
    exif.DateTimeDigitized = allMetaData.DateTimeDigitized;
  if (allMetaData.DateTimeOriginal)
    exif.DateTimeOriginal = allMetaData.DateTimeOriginal;

  let exifString = "";
  for (let x in exif) {
    if (x) {
      let temp = exif[x].split(" ").join("");

      if (temp !== "" && temp !== undefined && temp !== null) {
        let val = exif[x].split(";").join(" ");
        exifString += `${x} : ${val} , `;
      }
    }
  }
  exifString = exifString.slice(0, -2);
  return exifString;
};
