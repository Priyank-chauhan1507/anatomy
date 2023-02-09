import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Popover,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  DeleteForever,
  ExpandMore,
  Help,
  Reorder,
  SwapHoriz,
  Undo,
} from "@material-ui/icons";

import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import {
  GROUPED_DIAGNOSIS_TYPES,
  GROUPED_PROCEDURE_TYPES,
  LIST_TYPES,
  PAINTED_DISTRIBUTION_TYPES,
} from "../../constants/listsConstants";
import useTranslations from "../../hooks/useTranslations";
import {
  deleteItemFile,
  reorderLists,
  restoreGallery,
  setBinGallery,
  transferFile,
} from "../../store/slices/lists";
import { getFile, getImage } from "../../utils/fileCache";
import {
  translateListSubtype,
  translateListType,
} from "../../utils/translationHelpers";
import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy";
import { accordionItemStyle, accordionStyle } from "./ItemTemplates";

export const Listss = () => {
  const listsOrder = useSelector((state) => state.listStore.listsOrder);
  return listsOrder.map(({ listType, listSubtype }) => {
    switch (listType) {
      case LIST_TYPES.single_diagnosis.name:
        return SingleDiagnosisList();

      case LIST_TYPES.ordered.name:
        return OrderedList();
      case LIST_TYPES.grouped_procedure.name:
        return GroupedProcedureList(listSubtype);

      case LIST_TYPES.grouped_diagnosis.name:
        return GroupedDiagnosisList(listSubtype);

      case LIST_TYPES.comments.name:
        return CommentsList();
      case LIST_TYPES.defer.name:
        return DeferList();
      case LIST_TYPES.painted_distribution.name:
        return PainterDistributionList(listSubtype);
      default:
        return null;
    }
  });
};

const DeleteGalleryItem = ({
  itemId,
  index,
  restoreGalleryFromBin,
  deleteGalleryFromBin,
  contentType,
  content,
  type,
  transferFromBin,
}) => {
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const [expanded, setExpanded] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [selectedItem, setSelectedItem] = useState();

  const { listType, listSubtype } = useSelector(
    (state) => state.listStore.itemsMap[itemId]
  );
  //eslint-disable-next-line
  const id = useRef(null);
  //eslint-disable-next-line
  const setListsOrder = useCallback(
    (newList) => {
      dispatch(reorderLists(newList));
    },
    [dispatch]
  );

  const { uiData } = useTranslations();

  const handleOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleChange = (e) => {
    setSelectedItem(e.target.value);
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary style={accordionStyle}>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
          onClick={(e) => {}}>
          <div className='listContent__basicInfo'>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}>
              <div style={accordionItemStyle}>
                <div style={{ marginRight: "auto" }}>
                  {contentType === "image" ? (
                    <img src={content} className='uploaded-img' alt='content' />
                  ) : type === "application/pdf" ? (
                    <PictureAsPdfOutlinedIcon
                      className={"uploaded-img"}
                      style={{ height: "80px", width: "80px" }}
                    />
                  ) : (
                    <InsertDriveFileOutlinedIcon
                      className={"uploaded-img"}
                      style={{ height: "80px", width: "80px" }}
                    />
                  )}

                  <div>{`[${translateListType(listType, {
                    uiData,
                  })}], [${translateListSubtype(listType, listSubtype, {
                    uiData,
                  })}]`}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <IconButton
                    className={"item-handle-icon"}
                    onClick={(e) => {}}>
                    <Reorder
                      style={{
                        cursor: "move",
                        color: "#707070",
                        padding: "2px",
                      }}
                    />
                  </IconButton>

                  <IconButton style={{ padding: "2px" }} onClick={handleOpen}>
                    <SwapHoriz />
                  </IconButton>
                  <Popover
                    open={Boolean(anchor)}
                    anchorEl={anchor}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    onClose={() => setAnchor(null)}>
                    <>
                      <Typography
                        style={{ padding: " 12px 10px" }}
                        variant='h5'
                        component='h2'>
                        Transfer to existing item{" "}
                      </Typography>

                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor='listItem'
                          style={{ fontSize: "1.2rem" }}>
                          {" "}
                          List Item{" "}
                        </InputLabel>

                        <Select
                          fullWidth
                          value={selectedItem || ""}
                          onChange={handleChange}
                          defaultValue=''>
                          {Listss()}
                        </Select>
                      </FormControl>

                      <Button
                        onClick={(e) => {
                          let itemId = selectedItem;

                          transferFromBin(itemId, index, e);
                        }}
                        variant='text'
                        color='primary'
                        style={{ paddingTop: 20 }}>
                        Transfer
                      </Button>
                    </>
                  </Popover>

                  <IconButton
                    style={{ padding: "2px" }}
                    onClick={(e) => {
                      restoreGalleryFromBin(itemId, index, uiData, e);
                    }}>
                    <Undo />
                  </IconButton>

                  <IconButton
                    onClick={(e) => {
                      deleteGalleryFromBin(itemId, index, e);
                    }}
                    className={"less-pad"}>
                    <DeleteForever />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </AccordionSummary>
      <AccordionDetails>{null}</AccordionDetails>
    </Accordion>
  );
};
export default function DeleteGallery() {
  const deleteGallery = useSelector((state) => state.listStore.binGallery);

  const dispatch = useDispatch();
  const { uiData } = useTranslations();
  const [expanded, setExpanded] = useState(false);
  const setDeleteGallery = useCallback(
    (newGallery) => {
      dispatch(setBinGallery(newGallery));
    },
    [dispatch]
  );
  const restoreGalleryFromBin = useCallback(
    (itemId, index, uiData, e) => {
      e.stopPropagation();
      dispatch(restoreGallery({ itemId, index, uiData }));
    },
    [dispatch]
  );
  const deleteGalleryFromBin = useCallback(
    (itemId, index, e) => {
      e.stopPropagation();
      dispatch(deleteItemFile({ itemId, index }));
    },
    [dispatch]
  );
  const transferFromBin = useCallback(
    (itemId, index, e) => {
      e.stopPropagation();
      dispatch(transferFile({ itemId, index }));
    },
    [dispatch]
  );
  return deleteGallery.length !== 0 ? (
    <div
      className={`accordion-root app__mainBody__list__accordion__list app__mainBody__list__accordion__comments`}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          onClick={() => setExpanded(!expanded)}
          className='app__mainBody__list__header'
          style={{ backgroundColor: "#f44336" }}>
          <Typography className={"accordion-heading"}>
            {uiData.transtext_PhotosAndAttachments.tr_text}{" "}
            {uiData.transtext_Trash.tr_text} ({deleteGallery.length})
          </Typography>
          <Tooltip
            title={
              "These pins and their content may be restored to the Gallery they originated from; moved to a different list; or deleted completely. Images and notes may be recycled to an exisiting list item. Any content in this area will not be exported."
            }
            enterTouchDelay={50}>
            <IconButton style={{ padding: "0px 12px" }}>
              <Help />
            </IconButton>
          </Tooltip>
        </AccordionSummary>
        <AccordionDetails className='app__mainBody__list__body'>
          <ReactSortable
            list={deleteGallery}
            setList={setDeleteGallery}
            handle={".item-handle-icon"}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {deleteGallery.map((item, index) => {
              const content =
                item.file.contentType === "image"
                  ? getImage(item.file.id)
                  : getFile(item.file.id);
              return (
                <DeleteGalleryItem
                  key={index}
                  itemId={item.id}
                  index={index}
                  restoreGalleryFromBin={restoreGalleryFromBin}
                  deleteGalleryFromBin={deleteGalleryFromBin}
                  contentType={item.file.contentType}
                  content={content}
                  type={item.file.type}
                  transferFromBin={transferFromBin}
                />
              );
            })}
          </ReactSortable>
        </AccordionDetails>
      </Accordion>
    </div>
  ) : null;
}

export const SingleDiagnosisList = () => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.single_diagnosis.name].itemsOrder
  );
  const items = itemsOrder.map(({ id: itemId }) => {
    return (
      <MenuItem key={itemId} value={itemId}>
        <NameAndPinRendererWithHierarchy
          isNameEditable={false}
          hierarchyButton={false}
          itemId={itemId}
        />
      </MenuItem>
    );
  });
  return [
    <ListSubheader style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
      {uiData[LIST_TYPES.single_diagnosis.translation_key].tr_text}
    </ListSubheader>,
    items,
  ];
};

export const OrderedList = () => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.ordered.name].itemsOrder
  );
  const items = itemsOrder.map(({ id: itemId }) => {
    return (
      <MenuItem key={itemId} value={itemId}>
        <NameAndPinRendererWithHierarchy
          isNameEditable={false}
          hierarchyButton={false}
          itemId={itemId}
        />
      </MenuItem>
    );
  });
  return [
    <ListSubheader style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
      {uiData[LIST_TYPES.ordered.translation_key].tr_text}
    </ListSubheader>,
    items,
  ];
};

export const CommentsList = () => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.comments.name].itemsOrder
  );
  const items = itemsOrder.map(({ id: itemId }) => {
    return (
      <MenuItem key={itemId} value={itemId}>
        <NameAndPinRendererWithHierarchy
          isNameEditable={false}
          hierarchyButton={false}
          itemId={itemId}
        />
      </MenuItem>
    );
  });
  return [
    <ListSubheader style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
      {uiData[LIST_TYPES.comments.translation_key].tr_text}
    </ListSubheader>,
    items,
  ];
};
export const DeferList = () => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.defer.name].itemsOrder
  );
  const items = itemsOrder.map(({ id: itemId }) => {
    return (
      <MenuItem key={itemId} value={itemId}>
        <NameAndPinRendererWithHierarchy
          isNameEditable={false}
          hierarchyButton={false}
          itemId={itemId}
        />
      </MenuItem>
    );
  });
  return [
    <ListSubheader style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
      {uiData[LIST_TYPES.defer.translation_key].tr_text}
    </ListSubheader>,
    items,
  ];
};

export const GroupedProcedureList = (subtype) => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.grouped_procedure.name][subtype]
        .itemsOrder
  );
  const items = itemsOrder.map(({ id: itemId }) => {
    return (
      <MenuItem key={itemId} value={itemId}>
        <NameAndPinRendererWithHierarchy
          isNameEditable={false}
          hierarchyButton={false}
          itemId={itemId}
        />
      </MenuItem>
    );
  });
  return [
    <ListSubheader style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
      {uiData[GROUPED_PROCEDURE_TYPES[subtype].translation_key].tr_text}
    </ListSubheader>,
    items,
  ];
};

export const GroupedDiagnosisList = (subtype) => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.grouped_diagnosis.name][subtype]
        .itemsOrder
  );
  const items = itemsOrder.map(({ id: itemId }) => {
    return (
      <MenuItem key={itemId} value={itemId}>
        <NameAndPinRendererWithHierarchy
          isNameEditable={false}
          hierarchyButton={false}
          itemId={itemId}
        />
      </MenuItem>
    );
  });
  return [
    <ListSubheader style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
      {uiData[GROUPED_DIAGNOSIS_TYPES[subtype].translation_key].tr_text}
    </ListSubheader>,
    items,
  ];
};

export const PainterDistributionList = (subtype) => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.painted_distribution.name][subtype]
        .itemsOrder
  );
  const items = itemsOrder.map(({ id: itemId }) => {
    return (
      <MenuItem key={itemId} value={itemId}>
        <NameAndPinRendererWithHierarchy
          isNameEditable={false}
          hierarchyButton={false}
          itemId={itemId}
        />
      </MenuItem>
    );
  });
  return [
    <ListSubheader style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
      {uiData[PAINTED_DISTRIBUTION_TYPES[subtype].translation_key]?.tr_text ||
        PAINTED_DISTRIBUTION_TYPES[subtype].default_label}
    </ListSubheader>,
    items,
  ];
};
