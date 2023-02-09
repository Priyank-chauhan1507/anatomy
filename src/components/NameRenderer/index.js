import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import { TranslationContext } from "../../contexts/translation";
import { SNS_RENDERER } from "../../constants/itemConstants";
const useStyles = makeStyles(() => {
  return {
    nameBox: {
      fontSize: "10",
      position: "relative",
      "& > .edit-icon": {
        opacity: 0,
        // position: "absolute",
        transition: "opacity .4s",
        "&  svg": {
          fontSize: 18,
        },
      },
      "&:hover > .edit-icon": {
        opacity: 1,
      },
    },
  };
});

export default function NameRenderer({
  noEdit = false,
  onClickEdit,
  sns,
  breakWord,
  parentComponent,
  names,
  auto_related_pin = true,
  pinListSettings,
}) {
  const classes = useStyles();
  const { lateralityData, uiData, anatomicData } =
    useContext(TranslationContext);

  const trData = { lateralityData, uiData, anatomicData };
  const [visibilityMap, setVisibilityMap] = useState(new Set());
  const [showEditIcon, setShowEditIcon] = useState(false);

  useEffect(() => {
    const newVisibilityMap = new Set();
    sns.orderList.forEach(({ id, visible }) => {
      if (visible) {
        newVisibilityMap.add(id);
      }
    });
    setVisibilityMap(newVisibilityMap);
  }, [sns]);

  const getStyle = (s, laterality_then_site) => {
    var style = { ...s };
    if (laterality_then_site >= 8) style["fontSize"] = "x-small";
    switch (parentComponent) {
      case "tooltip":
        return {
          ...style,
          color: laterality_then_site >= 8 ? "whitesmoke" : "white",
        };
      default:
        return style;
    }
  };

  const orderList = sns.orderList
    .map((item) => {
      const newItem = { ...item };
      var value = "";
      if (item.visible) {
        value = item.isArray
          ? names[item.id]?.map((_, i) =>
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

  const finalList = orderList.filter((item) => {
    return item.value !== "";
  });
  // getPinDetails(sns,names,trData)

  return (
    <p
      style={{ cursor: "pointer", display: "flex" }}
      className={classes.nameBox}
      onMouseEnter={() => {
        setShowEditIcon(true);
      }}
      onMouseLeave={() => {
        setShowEditIcon(false);
      }}>
      <span
        className='anatomicSiteName'
        style={{
          wordBreak: breakWord ? "break-word" : "normal",
          lineHeight: "1.1rem",
        }}>
        {finalList.map(
          ({ id, style, pre, post, laterality_then_site, value }, index) => {
            // if (
            //     id === "auto_related_name" &&
            //     auto_related_pin === false
            // )
            //     return null
            if (
              id !== "optional_separator" ||
              (id === "optional_separator" && index !== finalList.length - 1)
            ) {
              if (
                id === "enhance_modifier" &&
                !pinListSettings?.use_enhanced_mod
              ) {
                return "";
              } else {
                return (
                  Boolean(value) && (
                    <span
                      style={{
                        ...getStyle(style, laterality_then_site),
                      }}
                      key={id}>
                      {pre}
                      {value}
                      {post}
                    </span>
                  )
                );
              }
            } else return null;
          }
        )}
      </span>
      {!noEdit && (
        <IconButton
          color={"primary"}
          size={"small"}
          onClick={onClickEdit}
          style={{
            opacity: showEditIcon ? 1 : 0,
            transition: "opacity 0.5s",
          }}>
          <Edit />
        </IconButton>
      )}
    </p>
  );
}
