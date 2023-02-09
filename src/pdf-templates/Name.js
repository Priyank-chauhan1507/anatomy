import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import { TranslationContext } from "../contexts/translation";
import { SNS_RENDERER } from "../constants/itemConstants";
import { View, Text } from "@react-pdf/renderer";
import store from "../store";
import { LIST_TYPES } from "../constants/listsConstants";
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

export default function Names({
  breakWord,
  parentComponent,
  names,
  id,
  pinListSettings,
}) {
  const useSNS = (itemId) => {
    const listType = store.getState().listStore.itemsMap[itemId].listType;
    return (
      store.getState().listStore.customSNS[itemId] ||
      (listType === LIST_TYPES.painted_distribution.name
        ? store.getState().listStore.distributionSNS
        : store.getState().listStore.globalSNS)
    );
  };
  const sns = useSNS(id);
  const classes = useStyles();
  const Store = store.getState();
  const lateralityData = Store.translation.laterality;
  const uiData = Store.translation.uiData;
  const anatomicData = Store.translation.anatomicData;

  const trData = { lateralityData, uiData, anatomicData };
  const [visibilityMap, setVisibilityMap] = useState(new Set());
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

  const finalList = orderList.filter((item) => {
    return item.value !== "";
  });
  // getPinDetails(sns,names,trData)

  return (
    <Text
      style={{ cursor: "pointer", display: "flex" }}
      className={classes.nameBox}>
      <Text
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
                    <Text
                      style={{
                        ...getStyle(style, laterality_then_site),
                      }}
                      key={id}>
                      {pre} {value} {post}
                    </Text>
                  )
                );
              }
            } else return null;
          }
        )}
      </Text>
    </Text>
  );
}
