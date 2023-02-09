import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import {
  LIST_TYPES,
  PAINTED_DISTRIBUTION_TYPES,
} from "../../../constants/listsConstants";
import useTranslations from "../../../hooks/useTranslations";
import { reorderItems } from "../../../store/slices/lists";
import DistributionToolbar from "../../subtoolbar/DistributionSubToolbar";
import { CommonItemWrapper } from "../ItemTemplates";
import { CommonListWrapper } from "../ListTemplates";
const PainterDistributionItem = ({ itemId, locked, subtype }) => {
  return (
    <div className="listContent__item">
      <CommonItemWrapper
        itemId={itemId}
        subtype={subtype}
        listType={LIST_TYPES.painted_distribution.name}
        subtypeOptions={LIST_TYPES.painted_distribution.options}
        locked={locked}
      />
    </div>
  );
};
export const DistributionPainterList = ({ subtype }) => {
  const { uiData, pinTitles } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.painted_distribution.name][subtype]
        .itemsOrder
  );
  const {
    locked,
    backgroundColor,
    color,
    visibility,
    pattern,
    opacity,
    grouped,
    isBkgColor,
  } = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.painted_distribution.name][subtype].attr
  );
  const dispatch = useDispatch();
  const onReorder = useCallback(
    (newItemsOrder) => {
      dispatch(
        reorderItems({
          listType: LIST_TYPES.painted_distribution.name,
          listSubtype: subtype,
          newItemsOrder,
        })
      );
    },
    [dispatch, subtype]
  );

  const [changeTitle, setChangeTitle] = useState(
    `${
      uiData[PAINTED_DISTRIBUTION_TYPES[subtype].translation_key]?.tr_text ||
      PAINTED_DISTRIBUTION_TYPES[subtype].default_label
    }`
  );

  useEffect(() => {
    setChangeTitle(
      pinTitles[PAINTED_DISTRIBUTION_TYPES[subtype].translation_key]?.isChanged
        ? pinTitles[PAINTED_DISTRIBUTION_TYPES[subtype].translation_key]
            ?.changed
        : uiData[PAINTED_DISTRIBUTION_TYPES[subtype].translation_key]
            ?.tr_text || PAINTED_DISTRIBUTION_TYPES[subtype].default_label
    );
    //eslint-disable-next-line
  }, [uiData]);

  return (
    <CommonListWrapper
      listType={LIST_TYPES.painted_distribution.name}
      listSubtype={subtype}
      title={
        uiData[PAINTED_DISTRIBUTION_TYPES[subtype].translation_key]?.tr_text ||
        PAINTED_DISTRIBUTION_TYPES[subtype].default_label
      }
      inBracketTitle={itemsOrder.length}
      target={PAINTED_DISTRIBUTION_TYPES[subtype].translation_key}
      OgTitle={PAINTED_DISTRIBUTION_TYPES[subtype].default_label}
      changeTitle={changeTitle}
      setChangeTitle={setChangeTitle}
      locked={locked}
      opacity={opacity}
      grouped={grouped}
      pattern={pattern}
      isBkgColor={isBkgColor}
      printButton={false}
      backgroundColor={backgroundColor}
      color={color}
      extendedPalette={true}
      visibility={visibility}
      listItemContainer={
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <DistributionToolbar
              listType={LIST_TYPES.painted_distribution.name}
              listSubtype={subtype}
              pattern={pattern}
              opacity={opacity}
              grouped={grouped}
              locked={locked}
              changeTitle={changeTitle}
            />
          </div>
          <div style={{ width: "100%" }}>
            <ReactSortable
              list={itemsOrder}
              setList={onReorder}
              handle=".item-handle-icon"
              filter=".NoSort"
            >
              {itemsOrder.map(({ id: itemId }, index) => (
                <PainterDistributionItem
                  key={itemId}
                  itemId={itemId}
                  subtype={subtype}
                  locked={locked}
                />
              ))}
            </ReactSortable>
          </div>
        </div>
      }
    />
  );
};

export default DistributionPainterList;
