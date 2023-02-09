import {
  Checkbox,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Link,
  ListItemText,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import { InsertLink, ReorderRounded } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";
import { LINK_TYPES } from "../../constants/itemConstants";
import useTranslations from "../../hooks/useTranslations";
import {
  decreaseLinkArray,
  increaseLinkArray,
  updateLinks,
  updateLinksById,
} from "../../store/slices/lists";
import {
  closeLinkEditor,
  openLinkGalleryModal,
} from "../../store/slices/modals";
import { chooseList } from "../../utils/helpers";
import {
  getEmojiCodeForLinkType,
  translateLinkOption,
  translateTags,
} from "../../utils/translationHelpers";
import ButtonWithCount from "../Buttons/ButtonWithCount";
import CustomizedDialogs from "../Dialog/Dialog";
import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy";
import PatientInfo from "../PatientInfo/PatientInfo";
import {
  SVGRegionRenderer,
  SVGRegionRendererWithPoint,
} from "../SVGRegionRenderer";
import { PinDescriptionRenderer } from "../ListsRenderer/ItemTemplates";
import { LIST_TYPES } from "../../constants/listsConstants";

const LINK_TYPES_ARRAY = Object.values(LINK_TYPES);
const emptyArr = [];

const selectLinks = (state, isModalOpen, data) => {
  if (!isModalOpen) {
    return emptyArr;
  } else {
    const { itemId, isGrouped, listType, listSubtype } = data;
    if (isGrouped) {
      return chooseList(state.listStore.lists, listType, listSubtype).attr
        .grouped_documentation.links;
    } else {
      return state.listStore.itemsMap[itemId].links;
    }
  }
};
const initialLink = {
  link: "",
  type: LINK_TYPES.url.name,
  desc: "",
  tags: [],
  id: uuidv4(),
  original: true,
};

const LinkDescriptionModal = () => {
  const { uiData, tags, language } = useTranslations();
  const dispatch = useDispatch();
  const Allfiles = useSelector((state) => state.listStore.itemsMap);
  const { state: open, data } = useSelector((state) => state.modals.linkEditor);
  const { layerInfo } = useSelector((state) =>
    data.itemId ? state.listStore.itemsMap[data.itemId] : { layerInfo: "" }
  );
  const { pathId } = useSelector((state) =>
    data.itemId ? state.listStore.itemsMap[data.itemId] : { pathId: "" }
  );
  const l = useSelector((state) => selectLinks(state, open, data));
  const [links, setLinks] = useState([]);
  const tagsArray = Object.values(tags);
  const [linkCount, setLinkCount] = useState(l.length);
  useEffect(() => {
    if (l.length === 0) {
      setLinks([{ ...initialLink, id: uuidv4() }]);
    } else {
      setLinkCount(l.length);
      setLinks(l);
    }
  }, [l]);

  const [unLinkModal, setunLinkModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currRemoveLink, setCurrRemoveLink] = useState(null);
  const [currRemoveIndex, setCurrRemoveIndex] = useState(null);
  const totalLinkCount = useSelector((state) => state.listStore.totalLinks);

  useEffect(() => {
    const newLinkCount = links.filter((l) => l.desc && l.link).length;
    if (newLinkCount > linkCount) dispatch(increaseLinkArray());
    setLinkCount(newLinkCount);
    //eslint-disable-next-line
  }, [links]);

  useEffect(() => {}, []);

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

  const onChange = (prop, value, index) => {
    const newLinks = [...links];
    newLinks[index] = {
      ...links[index],
      [prop]: value,
    };
    //changeAll(newLinks[index].id, newLinks[index])
    setLinks(newLinks);
  };

  const onAdd = () => {
    const newLinks = [...links];
    var currLink = initialLink;
    currLink.id = uuidv4();
    newLinks.push(currLink);
    setLinks(newLinks);
  };

  const onRemove = () => {
    const newLinks = [...links];
    newLinks.splice(currRemoveIndex, 1);
    setLinks(newLinks);
    onCloseDeleteModal();
    onCloseUnlinkModal();
  };

  const onModalClose = () => {
    var newLinks = {};
    //eslint-disable-next-line
    links
      .filter((v) => v.desc && v.link)
      .map((tempLink) => {
        newLinks[tempLink.id] = tempLink;
      });

    var ids = [];
    //eslint-disable-next-line
    Object.entries(Allfiles).map((bucketList) => {
      const currItemId = bucketList[0];
      ids.push(currItemId);
    });

    dispatch(
      updateLinksById({ links: newLinks, ids: ids, itemId: data.itemId })
    );
    dispatch(
      updateLinks({ newLinks: links.filter((v) => v.desc && v.link), data })
    );

    dispatch(closeLinkEditor());
  };

  const onDeleteLink = () => {
    onRemove();
    if (linkCount > 0) dispatch(decreaseLinkArray());
    //eslint-disable-next-line
    Object.entries(Allfiles).map((bucketList) => {
      const currItemId = bucketList[0];
      const newLinks = [];
      if (currItemId !== data.itemId) {
        //eslint-disable-next-line
        bucketList[1].links?.map((currLink) => {
          if (currLink.id !== currRemoveLink) newLinks.push(currLink);
        });

        const newData = { ...data, itemId: currItemId };
        dispatch(updateLinks({ newLinks: newLinks, data: newData }));
      }
    });
    onCloseDeleteModal();
    onCloseUnlinkModal();
  };

  const onCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const onCloseUnlinkModal = () => {
    setunLinkModal(false);
  };

  return (
    <>
      <CustomizedDialogs
        open={deleteModal}
        title={"Delete Link"}
        onClose={onCloseDeleteModal}
        body={
          <div style={{ minWidth: 450, maxWidth: 600, fontSize: "80%" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <h3>
                {uiData.label_Are_You_Sure?.tr_text}&nbsp;
                {uiData.label_Delete?.tr_text}&nbsp;
                {uiData.transtext_this?.tr_text}&nbsp;? All the links to it will
                be removed.
              </h3>
              <IconButton
                style={{ marginLeft: "100px" }}
                onClick={() => {
                  // Delete
                  onDeleteLink();
                }}
              >
                {uiData.label_Yes?.tr_text}
              </IconButton>
              <IconButton
                style={{ marginLeft: "100px" }}
                onClick={() => {
                  onCloseDeleteModal();
                }}
              >
                {uiData.label_No?.tr_text}
              </IconButton>
            </div>
          </div>
        }
      />
      <CustomizedDialogs
        open={unLinkModal}
        title={"Delete Link"}
        onClose={onCloseUnlinkModal}
        body={
          <div style={{ minWidth: 450, maxWidth: 600, fontSize: "80%" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <h3>
                {uiData.label_Are_You_Sure?.tr_text}&nbsp; unlink
                {uiData.transtext_this?.tr_text}&nbsp; Link?
              </h3>
              <IconButton
                style={{ marginLeft: "100px" }}
                onClick={() => {
                  // Delete
                  onRemove();
                }}
              >
                Unlink
              </IconButton>
              <IconButton
                style={{ marginLeft: "100px" }}
                onClick={() => {
                  onDeleteLink();
                }}
              >
                Delete
              </IconButton>
            </div>
          </div>
        }
      />

      <CustomizedDialogs
        open={open}
        title={
          uiData.label_LinkEditor?.tr_text +
          " " +
          uiData.label_LinkEditor?.emoji_code
        }
        onClose={onModalClose}
        body={
          <div style={{ minWidth: 450, maxWidth: 600, fontSize: "80%" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <PatientInfo color={"#000"} withBorder />
              {data.itemId ? (
                <NameAndPinRendererWithHierarchy itemId={data.itemId} />
              ) : null}
              {data.itemId &&
                (data.listType === LIST_TYPES.painted_distribution.name ? (
                  <SVGRegionRenderer
                    gID={layerInfo.D_ID}
                    pathId={pathId}
                    hMapId={layerInfo.HMAP_ID}
                  />
                ) : (
                  <SVGRegionRendererWithPoint
                    gID={layerInfo.D_ID}
                    itemId={data.itemId}
                  />
                ))}
              {data.itemId && <PinDescriptionRenderer itemId={data.itemId} />}
            </div>
            <Box display="flex" gap="2rem" position="relative">
              <IconButton onClick={onAdd} style={{ padding: "0", margin: "0" }}>
                <div style={{ position: "relative" }}>
                  <AddIcon
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "white",
                      backgroundColor: "blue",
                      borderRadius: "50%",

                      marginInlineStart: "1rem",
                      marginInlineEnd: "0.41rem",
                    }}
                  />
                </div>
              </IconButton>

              <div style={{ position: "relative" }}>
                <InsertLink
                  style={{ width: "30px", height: "30px", padding: "0" }}
                />
                {linkCount > 0 && (
                  <span className="badge badgeStyles">{linkCount}</span>
                )}
              </div>
              <div
                style={{ position: "absolute", right: "10px", top: "-10px" }}
              >
                <ButtonWithCount
                  count={totalLinkCount}
                  onClick={() => {
                    dispatch(openLinkGalleryModal({ itemId: data.itemId }));
                  }}
                >
                  <Tooltip title={uiData.icon_AddAttachment_help?.tr_text}>
                    <AttachFileIcon />
                  </Tooltip>
                </ButtonWithCount>
              </div>
            </Box>

            <ReactSortable
              list={links}
              setList={setLinks}
              animation={200}
              handle=".item-handle-icon"
            >
              {links.map(
                ({ id, link, emoji, type, desc, tags: t, original }, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "1rem",
                        borderBottom: "1px solid black",
                      }}
                    >
                      {desc && link && (
                        <Link
                          target="_blank"
                          href={link}
                          style={{
                            marginLeft: "12%",
                            marginBottom: "0.8rem",
                            textDecoration: "underline",
                            fontWeight: "bold",
                            fontSize: "130%",
                          }}
                        >
                          {`${getEmojiCodeForLinkType(type, {
                            uiData,
                          })} ${desc}`}
                        </Link>
                      )}
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            setCurrRemoveLink(id);
                            setCurrRemoveIndex(index);

                            if (!original) {
                              setunLinkModal(true);
                            } else setDeleteModal(true);
                          }}
                        >
                          <IndeterminateCheckBoxIcon />
                        </IconButton>
                        <div>
                          <Box
                            display="flex"
                            p={1}
                            flexDirection="row"
                            style={{ gap: "1rem" }}
                          >
                            <TextField
                              id="outlined-helperText"
                              label={uiData.label_LinkDescription?.tr_text}
                              value={desc}
                              onChange={(e) => {
                                onChange("desc", e.target.value, index);
                              }}
                              defaultValue={uiData.label_Link?.tr_text}
                              variant="outlined"
                              style={{ width: "63%" }}
                            />
                            <TextField
                              id="filled-select-currency"
                              select
                              label={uiData.label_LinkType?.tr_text}
                              value={type}
                              onChange={(e) => {
                                onChange("type", e.target.value, index);
                              }}
                              variant="outlined"
                            >
                              {LINK_TYPES_ARRAY.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                  {translateLinkOption(option.name, { uiData })}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                          <Box Box p={1} style={{ width: "100%" }}>
                            <TextField
                              id="outlined-helperText"
                              label={uiData.label_LinkURLorPath?.tr_text}
                              placeholder="https://.anatomymapper.com"
                              style={{ width: "100%" }}
                              value={link}
                              onChange={(e) => {
                                onChange("link", e.target.value, index);
                              }}
                              variant="outlined"
                            />
                          </Box>
                        </div>
                        <IconButton
                          style={{ cursor: "move" }}
                          className="item-handle-icon"
                        >
                          <ReorderRounded
                            style={{
                              cursor: "move",
                              marginLeft: "5px",
                            }}
                          />
                        </IconButton>
                      </div>
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel>
                          {uiData?.label_FNB_Tags?.emoji_code}{" "}
                          {uiData?.label_FNB_Tags?.tr_text}
                        </InputLabel>
                        <Select
                          multiple
                          value={t}
                          onChange={(e, i) => {
                            onChange("tags", e.target.value, index);
                          }}
                          input={<Input />}
                          renderValue={(v) => {
                            return v
                              .map((tagId) =>
                                translateTags(tagId, { tags, language })
                              )
                              .join(", ");
                          }}
                          MenuProps={MenuProps}
                        >
                          {tagsArray.map((tag) => (
                            <MenuItem key={tag.id} value={tag.id}>
                              <Checkbox
                                color="primary"
                                checked={t.indexOf(tag.id) > -1}
                              />
                              <ListItemText
                                primary={translateTags(tag.id, {
                                  tags,
                                  language,
                                })}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  );
                }
              )}
            </ReactSortable>
          </div>
        }
      />
    </>
  );
};

export default LinkDescriptionModal;
