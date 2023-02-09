import { IconButton, MenuItem, TextField, Select } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { REGION_PATTERNS } from "../../constants/itemConstants";
import useTranslations from "../../hooks/useTranslations";
import { changeAttributeOfAList } from "../../store/slices/lists";
import { openQrBuilderModal } from "../../store/slices/modals";
import BaseSubToolbar from "./Basetoolbar";
import GroupDocumentation from "../GroupDocumentation/GroupDocumentation";
import useToasterMessage from "../../hooks/useToasterMessage";
const patterns = Object.values(REGION_PATTERNS);
const options = new Array(10)
  .fill(0.1)
  .map((v, index) => (v + index * 0.1).toFixed(1));
function DistributionToolbar({
  opacity,
  locked,
  pattern,
  itemId,
  listType,
  grouped,
  listSubtype,
  changeTitle,
}) {
  const dispatch = useDispatch();
  const { uiData } = useTranslations();
  const toaster = useToasterMessage();
  const onChangeAttributeOfAList = useCallback(
    (e) => {
      if (locked) {
        toaster({
          message: uiData.alert_ListLocked.tr_text,
          type: "info",
        });
        return;
      }
      dispatch(
        changeAttributeOfAList({
          listType,
          listSubtype,
          name: e.target.name,
          value: e.target.value,
        })
      );
    },
    [dispatch, listType, listSubtype, locked, uiData]
  );

  const openQrModalHandler = () => {
    dispatch(openQrBuilderModal({ listType, listSubtype, title: changeTitle }));
  };

  const leftItems = [
    {
      label: "Opacity",
      control: (
        <TextField
          value={opacity}
          type={"number"}
          inputMode={"decimal"}
          name={"opacity"}
          variant={"outlined"}
          onChange={onChangeAttributeOfAList}
          size={"small"}
          style={{ opacity: locked ? "0.5" : "" }}
          select
          fullWidth={false}
        >
          {options.map((v) => {
            return (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            );
          })}
        </TextField>
      ),
    },
    {
      label: "Pattern",
      control: (
        <TextField
          select
          value={pattern}
          size={"small"}
          variant={"outlined"}
          name={"pattern"}
          style={{ opacity: locked ? "0.5" : "" }}
          onChange={onChangeAttributeOfAList}
        >
          {patterns.map(({ name, label }) => {
            return (
              <MenuItem key={name} value={name}>
                {label}
              </MenuItem>
            );
          })}
        </TextField>
      ),
    },
    {
      label: "Grouped",
      control: (
        <Select
          displayEmpty
          variant="outlined"
          name={"grouped"}
          value={grouped}
          onChange={onChangeAttributeOfAList}
          style={{ opacity: locked ? "0.5" : "" }}
        >
          <MenuItem value={true}>{"Yes"}</MenuItem>
          <MenuItem value={false}>{"No"}</MenuItem>
        </Select>
      ),
    },
  ];

  const rightItems = [
    {
      control: (
        <IconButton onClick={openQrModalHandler}>
          <Settings />
        </IconButton>
      ),
      // help: 'Settings'
    },
  ];

  return (
    <>
      <BaseSubToolbar leftItems={leftItems} rightItems={rightItems} />
      <GroupDocumentation
      itemId={itemId}
        changeTitle={changeTitle}
        listType={listType}
        listSubtype={listSubtype}
      />
    </>
  );
}

export default DistributionToolbar;
