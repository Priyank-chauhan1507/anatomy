import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { LIST_TYPES } from "../../../constants/listsConstants";
import useTranslations from "../../../hooks/useTranslations";
import { reorderItems, setItemVisibility } from "../../../store/slices/lists";
import { chooseList } from "../../../utils/helpers";
import SubToolbar from "../../subtoolbar/OrderedSubToolbar";
import { CommonItemWrapper } from "../ItemTemplates";
import { CommonListWrapper } from "../ListTemplates";
const DeferItem = ({ itemId, locked }) => {
  return (
    <div className="listContent__item">
      <CommonItemWrapper
        expandedComp={null}
        itemId={itemId}
        listType={LIST_TYPES.defer.name}
        subtypeOptions={LIST_TYPES.defer.options}
        locked={locked}
      />
    </div>
  );
};

export const DeferList = ({ subtype }) => {
  const { uiData, pinTitles } = useTranslations();
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.defer.name].itemsOrder
  );
  const { locked, color, visibility, shape, order, grouped, onlyOnMap } =
    useSelector(
      (state) => state.listStore.lists[LIST_TYPES.defer.name].attr
    );
  const dispatch = useDispatch();
  const onReorder = useCallback(
    (newItemsOrder) => {
      dispatch(
        reorderItems({ listType: LIST_TYPES.defer.name, newItemsOrder })
      );
    },
    [dispatch]
  );

  const [changeTitle, setChangeTitle] = useState(`${uiData[LIST_TYPES.defer.translation_key].tr_text}`)

  useEffect(() => {
    setChangeTitle(
      pinTitles[LIST_TYPES.defer.translation_key]?.isChanged ?
        pinTitles[LIST_TYPES.defer.translation_key]?.changed
        : uiData[LIST_TYPES.defer.translation_key].tr_text
    )
    //eslint-disable-next-line
  }, [uiData])

  const pinListSettings = useSelector((state) =>
    chooseList(state.listStore.lists, LIST_TYPES.defer.name, subtype).attr
      .pinListSettings
  )

  useEffect(() => {
    if (pinListSettings["show_pin_description"])
      Object.keys(itemsOrder).forEach((key) => {
        dispatch(
          setItemVisibility({ name: "pinDescriptionVisibility", itemId: itemsOrder[key].id, toggle: 1 })
        )
      })
    else
      Object.keys(itemsOrder).forEach((key) => {
        dispatch(
          setItemVisibility({ name: "pinDescriptionVisibility", itemId: itemsOrder[key].id, toggle: 0 })
        )
      })
  }, [pinListSettings, itemsOrder])

  return (
    <CommonListWrapper
      listType={LIST_TYPES.defer.name}
      title={uiData[LIST_TYPES.defer.translation_key].tr_text}
      inBracketTitle={itemsOrder.length}
      target={LIST_TYPES.defer.translation_key}
      OgTitle={LIST_TYPES.defer.default_label}
      changeTitle={changeTitle}
      setChangeTitle={setChangeTitle}
      locked={locked}
      color={color}
      printButton={false}
      visibility={visibility}
      listItemContainer={
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <SubToolbar
              locked={locked}
              shape={shape}
              changeTitle={changeTitle}
              order={order}
              color={color}
              grouped={grouped}
              onlyOnMap={onlyOnMap}
              listType={LIST_TYPES.defer.name}
              listSubtype={null}
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
                <DeferItem key={itemId} itemId={itemId} locked={locked} />
              ))}
            </ReactSortable>
          </div>
        </div>
      }
    />
  );
};

export default DeferList;