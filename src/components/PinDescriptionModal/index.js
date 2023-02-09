import { TextField } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TranslationContext } from "../../contexts/translation";
import {
  onResetPinDescription,
  updateDescriptions,
} from "../../store/slices/lists";
import { closePinDescriptionModal } from "../../store/slices/modals";
import { chooseList } from "../../utils/helpers";
import CustomizedDialogs from "../Dialog/Dialog";
import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy";

import { setItemVisibility } from "../../store/slices/lists";
import {
  ItemRegionPreview,
  PinDescriptionRenderer,
} from "../ListsRenderer/ItemTemplates";
import PatientInfo from "../PatientInfo/PatientInfo";

import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CachedIcon from "@material-ui/icons/Cached";

const emptyDescriptions = ["", "", ""];
function PinDescriptionModal() {
  const {
    state: openModal,
    data: { itemId },
  } = useSelector((state) => state.modals.pinDescriptionModal);
  // const { listType } = useSelector(
  //     (state) => state.listStore.itemsMap[itemId]
  // )
  const descriptions = useSelector((state) => {
    return itemId
      ? state.listStore.itemsMap[itemId].descriptions
      : emptyDescriptions;
  });

  const color = useSelector((state) => {
    if (!itemId) return "";
    const { listType, listSubtype } = state.listStore.itemsMap[itemId];
    return chooseList(state.listStore.lists, listType, listSubtype).attr.color;
  });

  const [desc, setDesc] = useState([]);
  const [localDescChange, setLocalDescChange] = useState(false);
  const { uiData } = useContext(TranslationContext);
  const dispatch = useDispatch();
  // const isFirstDescriptionEdited = useSelector((state) => {
  //     return itemId
  //         ? state.listStore.itemsMap[itemId].isFirstDescriptionEdited
  //         : false
  // })
  const onCloseModal = useCallback(() => {
    dispatch(updateDescriptions({ itemId, descriptions: desc }));
    dispatch(closePinDescriptionModal());
  }, [dispatch, desc, itemId]);

  useEffect(() => {
    setDesc(descriptions);
  }, [descriptions]);
  const pinDescriptionVisibility = useSelector(
    (state) => state.listStore.itemsMap[itemId]
  );
  const onVisibilityChange = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(
        setItemVisibility({
          name: "pinDescriptionVisibility",
          itemId,
          toggle: null,
        })
      );
    },
    // eslint-disable-next-line
    [itemId, pinDescriptionVisibility]
  );

  const onDescriptionReset = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(onResetPinDescription({ itemId, uiData }));
    },
    // eslint-disable-next-line
    [itemId]
  );
  useEffect(() => {
    if (descriptions[0] !== desc[0]) setLocalDescChange(true);
    else setLocalDescChange(false);
    // eslint-disable-next-line
  }, [desc]);

  return (
    <CustomizedDialogs
      open={openModal}
      title={uiData.label_PinDescription_Editor?.tr_text}
      onClose={onCloseModal}
      body={
        itemId && (
          <div style={{ minWidth: 450, maxWidth: 600 }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <PatientInfo color={"#000"} withBorder />
              <NameAndPinRendererWithHierarchy itemId={itemId} />
              <div
                style={{
                  color: color,
                  margin: "5px 0 25px 10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  className="app__mainBody__list__action__btns"
                  style={{
                    minWidth: "30px",
                    maxWidth: "30px",
                    marginRight: 0,
                  }}
                  onClick={onVisibilityChange}
                >
                  {pinDescriptionVisibility.pinDescriptionVisibility ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
                <PinDescriptionRenderer
                  itemId={itemId}
                  localDescChange={localDescChange}
                  localDesc={desc}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "0px 10px",
                }}
              >
                <CachedIcon
                  style={{ cursor: "pointer" }}
                  onClick={onDescriptionReset}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                {desc?.map((val, ind) => (
                  <TextField
                    label={"Pin Desc " + (ind + 1)}
                    variant="outlined"
                    size="small"
                    style={{ width: "30%" }}
                    inputProps={{ style: { color: color } }}
                    value={val}
                    onChange={(e) =>
                      setDesc((prev) => {
                        const newArr = [...prev];
                        newArr[ind] = e.target.value;
                        return newArr;
                      })
                    }
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <ItemRegionPreview
                itemId={itemId}
                // listType={listType}
              />
            </div>
          </div>
        )
      }
    />
  );
}

export default PinDescriptionModal;
