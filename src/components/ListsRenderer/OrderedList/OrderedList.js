import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { LIST_TYPES } from "../../../constants/listsConstants";
import useTranslations from "../../../hooks/useTranslations";
import { reorderItems } from "../../../store/slices/lists";
import SubToolbar from "../../subtoolbar/OrderedSubToolbar";
import { CommonItemWrapper } from "../ItemTemplates";
import { CommonListWrapper } from "../ListTemplates";

const OrderedItem = ({ itemId, locked, diagnosis }) => {
  return (
    <div className="listContent__item">
      <CommonItemWrapper
        itemId={itemId}
        listType={LIST_TYPES.ordered.name}
        subtypeOptions={LIST_TYPES.ordered.options}
        locked={locked}
      />
    </div>
  );
};

export const OrderedList = () => {
  const { uiData, pinTitles } = useTranslations();
  // const itemsMap = useSelector(state => state.listStore.itemsMap)
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.ordered.name].itemsOrder
  );
  const { locked, color, visibility, shape, order, grouped, onlyOnMap } =
    useSelector((state) => state.listStore.lists[LIST_TYPES.ordered.name].attr);
  const dispatch = useDispatch();
  const onReorder = useCallback(
    (newItemsOrder) => {
      dispatch(
        reorderItems({
          listType: LIST_TYPES.ordered.name,
          newItemsOrder: [...newItemsOrder],
        })
      );
    },
    [dispatch]
  );

  const [changeTitle, setChangeTitle] = useState(
    `${uiData[LIST_TYPES.ordered.translation_key]?.tr_text}`
  );
  useEffect(() => {
    setChangeTitle(
      pinTitles[LIST_TYPES.ordered.translation_key]?.isChanged
        ? pinTitles[LIST_TYPES.ordered.translation_key]?.changed
        : uiData[LIST_TYPES.ordered.translation_key]?.tr_text
    );
    //eslint-disable-next-line
  }, [uiData]);

  return (
    <CommonListWrapper
      listType={LIST_TYPES.ordered.name}
      title={uiData[LIST_TYPES.ordered.translation_key]?.tr_text}
      inBracketTitle={itemsOrder.length}
      target={LIST_TYPES.ordered.translation_key}
      OgTitle={uiData[LIST_TYPES.ordered.translation_key]?.tr_text}
      changeTitle={changeTitle}
      setChangeTitle={setChangeTitle}
      locked={locked}
      color={color}
      visibility={visibility}
      listItemContainer={
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <SubToolbar
              locked={locked}
              shape={shape}
              order={order}
              color={color}
              changeTitle={changeTitle}
              grouped={grouped}
              onlyOnMap={onlyOnMap}
              listType={LIST_TYPES.ordered.name}
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
                <OrderedItem key={itemId} itemId={itemId} locked={locked} />
              ))}
            </ReactSortable>
          </div>
        </div>
      }
    />
  );
};

export default OrderedList;
