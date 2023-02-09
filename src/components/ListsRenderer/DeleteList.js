import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Close,
  DeleteForever,
  ExpandMore,
  Help,
  Reorder,
  Undo,
} from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { LIST_TYPES } from "../../constants/listsConstants";
import useTranslations from "../../hooks/useTranslations";
import {
  deleteItem,
  onShow,
  restoreItem,
  setBinList,
} from "../../store/slices/lists";
import {
  translateListSubtype,
  translateListType,
} from "../../utils/translationHelpers";
import NameRenderer from "../NameRenderer";
import { accordionItemStyle, accordionStyle } from "./ItemTemplates";

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
const DeleteItem = ({
  itemId,
  index,
  restoreItemFromBin,
  deleteItemFromBin,
}) => {
  //eslint-disable-next-line
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { names, listType, listSubtype, show } = useSelector(
    (state) => state.listStore.itemsMap[itemId]
  );
  const item = useSelector((state) => state.listStore.itemsMap);
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);
  const { hideOppositeGenderAnatomy, isOralAnatomyVisible } = useSelector(
    (state) => state.userSettings.mapSettings
  );
  const sns = useSelector(
    (state) =>
      state.listStore.customSNS[itemId] ||
      (listType === LIST_TYPES.painted_distribution.name
        ? state.listStore.distributionSNS
        : state.listStore.globalSNS)
  );

  const { uiData } = useTranslations();

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary style={accordionStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
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
                <IconButton
                  onClick={(e) => {
                    if (
                      item[itemId].layerInfo.HG_IDs.includes(
                        "HG-Oral_Anatomy"
                      ) &&
                      !isOralAnatomyVisible
                    ) {
                      setModal(!modal);
                    } else if (
                      patientInfo.gender === "female" &&
                      item[itemId].layerInfo.HG_IDs.includes(
                        "HG-Male_Anatomy"
                      ) &&
                      hideOppositeGenderAnatomy
                    ) {
                      setModal(!modal);
                    } else if (
                      patientInfo.gender === "male" &&
                      item[itemId].layerInfo.HG_IDs.includes(
                        "HG-Female_Anatomy"
                      ) &&
                      hideOppositeGenderAnatomy
                    ) {
                      setModal(!modal);
                    } else {
                      if (show === false) {
                        const AnatomicName = true;
                        dispatch(onShow({ AnatomicName, itemId }));
                      }
                      restoreItemFromBin(index, e);
                    }
                  }}>
                  <Undo />
                </IconButton>
                <Warning modal={modal} setModal={setModal} />
                <div style={{ marginRight: "auto" }}>
                  <NameRenderer
                    names={names}
                    noEdit
                    sns={sns}
                    breakWord={false}
                  />
                  <span>{`[${translateListType(listType, {
                    uiData,
                  })}], [${translateListSubtype(listType, listSubtype, {
                    uiData,
                  })}]`}</span>
                </div>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingInline: 16,
                }}
              ></div> */}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            top: "-15px",
            right: 24,
            display: "flex",
            flexDirection: "column",
          }}>
          <IconButton className={"item-handle-icon"} onClick={(e) => {}}>
            <Reorder
              style={{
                cursor: "move",
                color: "#707070",
                marginLeft: "5px",
              }}
            />
          </IconButton>
          <IconButton
            onClick={(e) => {
              deleteItemFromBin(index, e);
            }}
            className={"less-pad"}>
            <DeleteForever />
          </IconButton>
          {/* <IconButton
            className={"less-pad"}
            onClick={(e) => setExpanded((prev) => !prev)}
          >
            {!expanded ? <ExpandMore /> : <ExpandLess />}
          </IconButton> */}
        </div>
      </AccordionSummary>
      <AccordionDetails>{null}</AccordionDetails>
    </Accordion>
  );
};
export default function DeleteList() {
  const deleteList = useSelector((state) => state.listStore.binList);

  const dispatch = useDispatch();
  const { uiData } = useTranslations();
  const [expanded, setExpanded] = useState(false);
  const setDeleteList = useCallback(
    (newList) => {
      dispatch(setBinList(newList));
    },
    [dispatch]
  );

  // let del=[]
  // let obj={}
  // deleteList.forEach((item)=>{
  //     if(obj[item.id]===undefined)
  //     {
  //       del.push(item)
  //       obj[item.id]=true
  //     }
  // })
  //dispatch(setBinList(del));
  const restoreItemFromBin = useCallback(
    (index, e) => {
      e.stopPropagation();

      dispatch(restoreItem({ index }));
    },
    [dispatch]
  );
  const deleteItemFromBin = useCallback(
    (index, e) => {
      e.stopPropagation();
      dispatch(deleteItem(index));
    },
    [dispatch]
  );
  return deleteList.length !== 0 ? (
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
            {uiData.label_ListHeader_Unlisted.tr_text} ({deleteList.length})
          </Typography>
          <Tooltip
            title={uiData.label_ListHeader_Unlisted_help.tr_text}
            enterTouchDelay={50}>
            <IconButton style={{ padding: "0px 12px" }}>
              <Help />
            </IconButton>
          </Tooltip>
        </AccordionSummary>
        <AccordionDetails className='app__mainBody__list__body'>
          <ReactSortable
            list={deleteList}
            setList={setDeleteList}
            handle={".item-handle-icon"}
            style={{ width: "100%" }}>
            {deleteList.map((item, index) => {
              return (
                <DeleteItem
                  key={item.id}
                  itemId={item.id}
                  index={index}
                  restoreItemFromBin={restoreItemFromBin}
                  deleteItemFromBin={deleteItemFromBin}
                />
              );
            })}
          </ReactSortable>
        </AccordionDetails>
      </Accordion>
    </div>
  ) : null;
}
const Warning = ({ modal, setModal }) => {
  const { uiData } = useTranslations();
  //  const dispatch = useDispatch();

  const onCloseModal = () => {
    setModal(false);
  };
  return (
    <Modal
      open={modal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      style={{ outline: "none", border: "none" }}>
      <Box style={styledeleteModal}>
        <div>
          <IconButton
            style={{ position: "relative", left: "90%", top: "5%" }}
            onClick={() => {
              onCloseModal();
            }}>
            <Close />
          </IconButton>
          <h3 style={{}}>
            {uiData.alert_HiddenDiagramNeedsToBeVisibleToRestoreDistSeg.tr_text}
          </h3>

          <div style={{ display: "flex", justifyContent: "center" }}></div>
        </div>
      </Box>
    </Modal>
  );
};
