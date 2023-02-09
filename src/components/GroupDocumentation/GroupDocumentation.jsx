import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { ExpandMore, InsertLink } from "@material-ui/icons";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import TransferIcon from "../../assets/mono-copy.png";
import { TranslationContext } from "../../contexts/translation";
import useConfirmationDialog from "../../hooks/useConfirmationDialog";
import useTranslations from "../../hooks/useTranslations";
import {
  addGroupFile,
  changeGroupNotes,
  copyGroupDiagnoses,
  updateLinks,
} from "../../store/slices/lists";
import { openLinkEditor } from "../../store/slices/modals";
import {
  getEmojiCodeForLinkType,
  translateTags,
} from "../../utils/translationHelpers";
import ButtonWithCount from "../Buttons/ButtonWithCount";
import ItemDiagnosis from "../ListItemComponents/ItemDiagnosis";
import Morphology from "../ListItemComponents/Morphology";
import { getFileIcon } from "./documentationHelper";
import "./GroupDocumentation.css";

const GroupDocumentation = ({ itemId, listType, listSubtype, changeTitle }) => {
  const { tags, language } = useContext(TranslationContext);
  const [expanded, setExpanded] = useState(false);
  const [groupImages, setGroupImages] = useState([]);
  // const [groupFiles, setGroupFiles] = useState([]);
  const [grpNotes, setGrpNotes] = useState("");
  const [showImagesGrid, setShowImagesGrid] = useState(true);
  const uploadImage = useRef();
  const uploadImage1 = useRef();
  const uploadFiles = useRef();
  const uploadFiles1 = useRef();
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const [userNote, setUserNote] = useState("");
  const [imageCount, setImageCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const { uiData } = useTranslations(TranslationContext);

  const singleType = ["ordered", "single_diagnosis", "comments", "defer"];

  // const orderedLink = useSelector(state => state.listStore.lists[listType]?.attr.grouped_documentation.links)
  // const otherLink = useSelector(state => state.listStore.lists[listType][listSubtype]?.attr.grouped_documentation.links)
  // const link = singleType.includes(listType) ? orderedLink : otherLink

  const link = useSelector((state) =>
    singleType.includes(listType)
      ? state.listStore.lists[listType]?.attr.grouped_documentation.links
      : state.listStore.lists[listType][listSubtype]?.attr.grouped_documentation
          .links
  );

  const diagnoses = useSelector((state) =>
    singleType.includes(listType)
      ? state.listStore.lists[listType]?.attr.grouped_documentation.diagnoses
      : state.listStore.lists[listType][listSubtype]?.attr.grouped_documentation
          .diagnoses
  );

  const morphologies = useSelector((state) =>
    singleType.includes(listType)
      ? state.listStore.lists[listType]?.attr.grouped_documentation.morphologies
      : state.listStore.lists[listType][listSubtype]?.attr.grouped_documentation
          .morphologies
  );

  const grouped = useSelector((state) =>
    singleType.includes(listType)
      ? state.listStore.lists[listType].attr?.grouped
      : state.listStore.lists[listType][listSubtype].attr?.grouped
  );

  const handleOpenLinkEditor = () => {
    const type = singleType.includes(listType)
      ? listType
      : listType + listSubtype;
    dispatch(
      openLinkEditor({
        type,
        isGrouped: true,
        listType,
        listSubtype,
      })
    );
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

  const getURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleGridClick = (who) => {
    if (who === "images") {
      if (!showImagesGrid) {
        setShowImagesGrid(true);
      }
    }
    if (who === "files") {
      if (showImagesGrid) {
        setShowImagesGrid(false);
      }
    }
  };

  const captureImage = async (e) => {
    e.preventDefault();

    try {
      const url = await getURL(e.target.files[0]);
      const newImgObject = {
        user_img: url,
        user_tag: [],
        user_image_note: userNote,
        originalFileName: e.target.files[0].name,
        fileCreationDate: e.target.files[0].lastModifiedDate,
        type: "image",
      };
      if (url && groupImages.length > 0) {
        setGroupImages([...groupImages, newImgObject]);
      } else if (url) {
        setGroupImages([newImgObject]);
      }
      const d = { isGrouped: grouped, listSubtype, listType };
      dispatch(addGroupFile({ file: groupImages, data: d }));
      setImageCount(imageCount + 1);
    } catch (err) {}
  };

  const captureFile = async (e) => {
    e.preventDefault();
    const newImgObject = {
      user_img: e.target.files[0].name,
      user_tag: [],
      user_image_note: userNote,
      originalFileName: e.target.files[0].name,
      fileCreationDate: e.target.files[0].lastModifiedDate,
      type: e.target.files[0].lastModifiedDate.type,
    };
    if (groupImages.length > 0) {
      setGroupImages([...groupImages, newImgObject]);
    } else {
      setGroupImages([newImgObject]);
    }
    const d = { isGrouped: grouped, listSubtype, listType };
    dispatch(addGroupFile({ file: groupImages, data: d }));
    setFileCount(fileCount + 1);
  };

  const handleUserNote = (e, index) => {
    const newImags = [...groupImages];
    newImags[index] = {
      ...newImags[index],
      user_image_note: e.target.value,
    };
    setGroupImages(newImags);
    const d = { isGrouped: grouped, listSubtype, listType };
    dispatch(addGroupFile({ file: groupImages, data: d }));
  };

  const handleUserTag = (value, index, image, key) => {
    let Tag = [];

    image.user_tag?.length < 1
      ? (Tag = [key])
      : (Tag = [...image.user_tag, key]);
    const newImags = [...groupImages];
    newImags[index] = {
      ...newImags[index],
      user_tag: Tag,
    };
    setGroupImages(newImags);
    const d = { isGrouped: grouped, listSubtype, listType };
    dispatch(addGroupFile({ file: groupImages, data: d }));
  };

  const confirmation = useConfirmationDialog();

  const copyDiagnoses = () => {
    const text = `Are you sure you want to replace all diagnoses in this list?
This action cannot be undone.`;

    const func = (isAgree) => {
      if (isAgree) {
        dispatch(copyGroupDiagnoses({ listType, listSubtype, diagnoses }));
      }
    };

    confirmation(
      {
        title: "Replace all diagnoses?",
        content: text,
      },
      func
    );
  };

  return (
    <div
      className='grpDocumentation'
      style={
        grouped ? { width: "100%", marginBottom: "1rem" } : { display: "none" }
      }>
      <Accordion
        expanded={expanded}
        onChange={(e) => setExpanded((prev) => !prev)}
        style={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "2px solid black",
          borderRadius: "0",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          {!expanded ? (
            <>
              <div className='grpTitle'>
                {uiData?.label_GroupDoc_GroupDocumentation?.tr_text +
                  " " +
                  uiData?.transtext_for?.tr_text +
                  " " +
                  changeTitle +
                  " " +
                  uiData?.transtext_group?.tr_text}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "150px",
                  justifyContent: "space-evenly",
                  marginTop: "15px",
                }}>
                <input
                  type='file'
                  accept='image/*'
                  ref={uploadImage1}
                  style={{ display: "none" }}
                  capture='camera'
                  onClick={(e) => (e.target.value = null)}
                  onChange={(e) => {
                    handleGridClick("images");
                    captureImage(e);
                  }}
                />
                <div className='upload-container'>
                  <IconButton onClick={() => uploadImage1.current.click()}>
                    <AddAPhotoRoundedIcon />
                    {groupImages && imageCount > 0 && (
                      <span className='badge' style={badgeStyles}>
                        {imageCount}
                      </span>
                    )}
                  </IconButton>
                </div>
                <input
                  type='file'
                  accept='*'
                  ref={uploadFiles1}
                  style={{ display: "none" }}
                  capture='camera'
                  onClick={(e) => (e.target.value = null)}
                  onChange={(e) => {
                    handleGridClick("files");
                    captureFile(e);
                  }}
                />
                <div className='upload-container'>
                  <IconButton onClick={() => uploadFiles1.current.click()}>
                    <InsertDriveFileIcon />
                    {groupImages && fileCount > 0 && (
                      <span className='badge' style={badgeStyles}>
                        {fileCount}
                      </span>
                    )}
                  </IconButton>
                </div>
                <ButtonWithCount
                  count={link.length}
                  onClick={handleOpenLinkEditor}>
                  <InsertLink />
                </ButtonWithCount>
              </div>
            </>
          ) : (
            ""
          )}
        </AccordionSummary>
        <AccordionDetails>
          <div
            className='listContent_expandedInfo_Diagnosis'
            style={{ marginBlock: 16, display: "flex" }}>
            <ItemDiagnosis
            itemId ={itemId}
              isGrouped={true}
              listType={listType}
              listSubtype={listSubtype}
            />
            <ArrowDownwardIcon
              style={{ cursor: "pointer", opacity: 0.7, width: "10%" }}
              onClick={copyDiagnoses}
            />
          </div>
          <TextField
            label={uiData?.label_GroupDoc_GroupNotes?.tr_text}
            variant={"outlined"}
            multiline
            rows={3}
            fullWidth
            size='small'
            color={"primary"}
            style={{ marginBlock: 16, zIndex: 0 }}
            onBlur={() => {
              dispatch(
                changeGroupNotes({
                  listType: listType,
                  listSubtype: listSubtype,
                  notes: grpNotes,
                })
              );
            }}
            value={grpNotes}
            onChange={(e) => {
              setGrpNotes(e.target.value);
            }}
          />
          <div
            style={{ margin: "10px 0" }}
            className={"listContent_expandedInfo_Morphology"}>
            <Morphology
              listSubtype={listSubtype}
              listType={listType}
              isGrouped={true}
              morphologies={morphologies}
            />
          </div>
          <div className='inputRow'>
            <IconButton style={{ padding: 0 }}>
              <img width='25' height='auto' src={TransferIcon} alt='' />
            </IconButton>
            <Accordion style={{ backgroundColor: "#999" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                {uiData?.transtext_show?.tr_text +
                  " " +
                  uiData?.label_ShowAdditionalDocumentation?.tr_text}
              </AccordionSummary>
              <AccordionDetails className='app__mainBody__list__body'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Cumque, optio itaque beatae id, nam laborum maxime amet illo
                laboriosam veniam sed quasi dignissimos blanditiis porro maiores
                deleniti modi ipsam eaque.
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='attachments'>
            <div className='attIcons' style={{ marginRight: "4%" }}>
              <input
                type='file'
                accept='image/*'
                ref={uploadImage}
                style={{ display: "none" }}
                capture='camera'
                onClick={(e) => (e.target.value = null)}
                onChange={(e) => {
                  handleGridClick("images");
                  captureImage(e);
                }}
              />
              <div className='upload-container'>
                <IconButton onClick={() => uploadImage.current.click()}>
                  <AddAPhotoRoundedIcon />
                  {groupImages && imageCount > 0 && (
                    <span className='badge' style={badgeStyles}>
                      {imageCount}
                    </span>
                  )}
                </IconButton>
              </div>
              <input
                type='file'
                accept='*'
                ref={uploadFiles}
                style={{ display: "none" }}
                capture='camera'
                onClick={(e) => (e.target.value = null)}
                onChange={(e) => {
                  handleGridClick("files");
                  captureFile(e);
                }}
              />
              <div className='upload-container'>
                <IconButton onClick={() => uploadFiles.current.click()}>
                  <InsertDriveFileIcon />
                  {groupImages && fileCount > 0 && (
                    <span className='badge' style={badgeStyles}>
                      {fileCount}
                    </span>
                  )}
                </IconButton>
              </div>
            </div>
            <div className='attGrid'>
              {groupImages &&
                groupImages.map((image, index) => {
                  return (
                    <div
                      style={{ width: 100, minWidth: 100 }}
                      className='attImageColumn'>
                      {image.type === "image" ? (
                        <div className='imgContainer'>
                          <img
                            className='attImage'
                            src={image.user_img}
                            alt=''
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ) : (
                        <img
                          title={image.originalFileName}
                          src={getFileIcon(image.originalFileName)}
                          alt=''
                          style={{
                            width: "45px",
                            height: "50px",
                            margin: "0 auto",
                          }}
                        />
                      )}
                      <FormControl fullWidth>
                        <InputLabel id={`imagetag-${index}`}>
                          {uiData?.transtext_tags?.tr_text}
                        </InputLabel>
                        <Select
                          multiple
                          value={image.user_tag}
                          renderValue={(v) => {
                            return v
                              .map((tag) => tags[tag].emoji_code)
                              .join(", ");
                          }}>
                          {tags &&
                            Object.keys(tags).map((key) => {
                              return (
                                <div style={{ display: "flex" }}>
                                  <Checkbox
                                    checked={image.user_tag.includes(key)}
                                    onClick={() =>
                                      handleUserTag(
                                        tags[key][
                                          `language_${language.toLowerCase()}`
                                        ],
                                        index,
                                        image,
                                        key
                                      )
                                    }
                                    color='primary'
                                  />
                                  <MenuItem value={10}>
                                    {`${tags[key].emoji_code} ${
                                      tags[key][
                                        `language_${language.toLowerCase()}`
                                      ]
                                    }`}
                                  </MenuItem>
                                </div>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <TextField
                        id='outlined-basic'
                        label={uiData?.transtext_Notes?.tr_text}
                        variant='outlined'
                        onChange={(e) => {
                          handleUserNote(e, index);
                        }}
                        value={groupImages[index].user_image_note}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={"listContent_expandedInfo_Links col-2-des"}>
            <div className={"listContent_expandedInfo_LinksHandles col-1"}>
              <ButtonWithCount
                count={link.length}
                onClick={handleOpenLinkEditor}>
                <InsertLink />
              </ButtonWithCount>
            </div>
            <div className={"listContent_expandedInfo_LinksSection col-2"}>
              <LinkViewer
                link={link}
                listType={listType}
                listSubtype={listSubtype}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default GroupDocumentation;

const LinkViewer = ({ link, listSubtype, listType }) => {
  const dispatch = useDispatch();

  const { uiData, tags: t } = useTranslations();

  const handleLinkReorder = (newLinks) => {
    return dispatch(
      updateLinks({
        newLinks,
        data: { isGrouped: true, listType, listSubtype },
      })
    );
  };

  return (
    Boolean(link.length) && (
      <div
        style={{
          display: "flex",
          background: "#ccc",
          width: "100%",
          borderRadius: 8,
          padding: 4,
        }}>
        <ReactSortable
          list={link}
          setList={handleLinkReorder}
          delay={200}
          style={{ width: "100%" }}>
          {link.map(({ link, desc, type, tags }) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: 4,
                  cursor: "move",
                }}>
                <Link
                  target='_blank'
                  href={link}
                  style={{
                    textDecoration: "underline",
                    fontWeight: "bold",
                    fontSize: "110%",
                    marginRight: "auto",
                  }}
                  key={link}>
                  {`${getEmojiCodeForLinkType(type, { uiData })} ${desc}`}
                </Link>
                <div
                  style={{ padding: 2, background: "#fff", borderRadius: 3 }}>
                  {tags.map((tag) => {
                    return <span>{translateTags(tag, { tags: t }, true)}</span>;
                  })}
                </div>
              </div>
            );
          })}
        </ReactSortable>
      </div>
    )
  );
};
