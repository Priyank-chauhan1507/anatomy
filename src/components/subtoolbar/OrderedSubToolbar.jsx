import { IconButton, MenuItem, Select, Tooltip } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ORDERS, PIN_SHAPES } from "../../constants/itemConstants";
import useToasterMessage from "../../hooks/useToasterMessage";
import useTranslations from "../../hooks/useTranslations";
import { changeAttributeOfAList } from "../../store/slices/lists";
import { openQrBuilderModal } from "../../store/slices/modals";
import { getPinShape } from "../../utils/pinUtils";
import GroupDocumentation from "../GroupDocumentation/GroupDocumentation";
import BaseSubToolbar from "./Basetoolbar";
import "./SubToolbar.css";

const PIN_SHAPES_OPTIONS = Object.values(PIN_SHAPES);
const ORDER_OPTIONS = Object.values(ORDERS);
ORDER_OPTIONS.sort((a, b) => a.sort - b.sort);

const SubToolbar = ({
  locked,
  shape,
  order,
  onlyOnMap,
  itemId,
  grouped,
  color,
  listType,
  listSubtype,
  changeTitle,
}) => {
  const { uiData } = useTranslations();
  const dispatch = useDispatch();
  const toaster = useToasterMessage();
  const onChangeAttribute = useCallback(
    (e) => {
      if (locked) {
        toaster({
          message: uiData.alert_ListLocked?.tr_text,
          type: "info",
        });
        return;
      }
      const { name, value } = e.target;
      dispatch(changeAttributeOfAList({ listType, listSubtype, name, value }));
    },
    [dispatch, listType, listSubtype, locked, uiData]
  );

  const openQrModalHandler = () => {
    dispatch(openQrBuilderModal({ listType, listSubtype, title: changeTitle }));
  };

  const leftItems = uiData
    ? [
        {
          label: uiData.label_ListSubToolbar_PinType?.tr_text,
          control: (
            <Select
              value={shape}
              displayEmpty
              variant="outlined"
              inputProps={{ "aria-label": "Without label" }}
              name={"shape"}
              onChange={onChangeAttribute}
              style={{ opacity: locked ? "0.5" : "" }}
              renderValue={(selected) => getPinShape(selected, color)}
            >
              {PIN_SHAPES_OPTIONS.filter(
                (data) => data.name !== "anchor_pin"
              ).map(({ name }) => {
                return (
                  <MenuItem
                    key={name}
                    value={name}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {getPinShape(name, color)}
                  </MenuItem>
                );
              })}
            </Select>
          ),
        },
        {
          label: uiData.label_ListSubToolbar_Order?.tr_text,
          control: (
            <Select
              displayEmpty
              variant="outlined"
              value={order}
              name={"order"}
              onChange={onChangeAttribute}
              style={{ opacity: locked ? "0.5" : "" }}
              // renderValue={(selected) => selected}
            >
              {ORDER_OPTIONS.reverse().map(
                ({ name, translation_key, default_label }) => {
                  return (
                    <MenuItem key={name} value={name}>
                      {uiData[translation_key]?.tr_text || default_label}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          ),
        },
        {
          label: uiData.label_ListSubToolbar_Grouped?.tr_text,
          control: (
            <Select
              displayEmpty
              variant="outlined"
              name={"grouped"}
              value={grouped}
              onChange={onChangeAttribute}
              style={{ opacity: locked ? "0.5" : "" }}
            >
              <MenuItem value={true}>{uiData.label_Yes?.tr_text}</MenuItem>
              <MenuItem value={false}>{uiData.label_No?.tr_text}</MenuItem>
            </Select>
          ),
        },
        {
          label: uiData.label_ListSubToolbar_OnlyOnMap?.tr_text,
          control: (
            <Select
              displayEmpty
              variant="outlined"
              name={"onlyOnMap"}
              value={onlyOnMap}
              onChange={onChangeAttribute}
              style={{ opacity: locked ? "0.5" : "" }}
              //if value is yes means can plot on sea, no means cannot plot on sea
            >
              <MenuItem value={true}>{uiData.label_Yes?.tr_text}</MenuItem>
              <MenuItem value={false}>{uiData.label_No?.tr_text}</MenuItem>
            </Select>
          ),
        },
      ]
    : [];
  const rightItems = [
    {
      control: (
        <IconButton id="SettingsIcon" onClick={openQrModalHandler}>
          <Tooltip title={uiData.label_ListSubToolbar_settings_help?.tr_text}>
            <SettingsIcon />
          </Tooltip>
        </IconButton>
      ),
    },
  ];
  return (
    <>
      {uiData && (
        <BaseSubToolbar leftItems={leftItems} rightItems={rightItems} />
      )}
      <GroupDocumentation
           itemId= {itemId}
        changeTitle={changeTitle}
        listType={listType}
        listSubtype={listSubtype}
      />
    </>
  );
};

export default SubToolbar;
