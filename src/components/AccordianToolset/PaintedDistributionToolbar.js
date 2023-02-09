import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LIST_TYPES } from "../../constants/listsConstants";
import { REGION_PATTERNS } from "../../constants/itemConstants";
import { changeAttributeOfAList } from "../../store/slices/lists";
import { chooseList } from "../../utils/helpers";
import Colors from "../ColorComponent/Colors";

const PATTERNS = Object.values(REGION_PATTERNS);

const PaintedDistributionToolbar = ({ subtype }) => {
  const { backgroundColor, color, pattern, opacity, locked, isBkgColor } =
    useSelector(
      (state) =>
        chooseList(
          state.listStore.lists,
          LIST_TYPES.painted_distribution.name,
          subtype
        ).attr
    );
  const dispatch = useDispatch();
  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          marginRight: "clamp(4px, 0.55vw, 10px)",
          width: "clamp(20px, 2.31vw, 30px)",
        }}
      >
        <Colors
          backgroundColor={backgroundColor}
          foregroundColor={color}
          containerStyles={{
            border: "1px solid #fff",
            opacity,
          }}
          onColorChange={null}
          onFgColorChange={(newColor, e) => {
            e?.stopPropagation();
            dispatch(
              changeAttributeOfAList({
                listType: LIST_TYPES.painted_distribution.name,
                listSubtype: subtype,
                name: "color",
                value: newColor,
              })
            );
          }}
          onBkgColorChange={(newColor, e) => {
            e?.stopPropagation();
            dispatch(
              changeAttributeOfAList({
                listType: LIST_TYPES.painted_distribution.name,
                listSubtype: subtype,
                name: "backgroundColor",
                value: newColor,
              })
            );
          }}
          color=""
          listType={LIST_TYPES.painted_distribution.name}
          listSubtype={subtype}
          extendedPalette
          locked={locked}
          opacity={opacity}
          pattern={pattern}
          isBkgColor={isBkgColor}
        />
      </div>

      <TextField
        style={{ marginRight: "10px" }}
        size={"small"}
        select
        value={pattern}
        onChange={(e) => {
          dispatch(
            changeAttributeOfAList({
              listType: LIST_TYPES.painted_distribution.name,
              listSubtype: subtype,
              name: "pattern",
              value: e.target.value,
            })
          );
        }}
      >
        {PATTERNS.map(({ name, label }) => {
          return (
            <MenuItem key={name} value={name}>
              {label}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  );
};

export default PaintedDistributionToolbar;
