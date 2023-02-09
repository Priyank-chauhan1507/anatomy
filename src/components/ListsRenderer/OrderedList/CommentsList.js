import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { LIST_TYPES } from "../../../constants/listsConstants";
import useTranslations from "../../../hooks/useTranslations";
import { reorderItems } from "../../../store/slices/lists";
import SubToolbar from "../../subtoolbar/OrderedSubToolbar";
import { CommonItemWrapper } from "../ItemTemplates";
import { CommonListWrapper } from "../ListTemplates";
const CommentItem = ({ itemId, locked }) => {
  return (
    <div className="listContent__item">
      <CommonItemWrapper
        expandedComp={null}
        itemId={itemId}
        listType={LIST_TYPES.comments.name}
        subtypeOptions={LIST_TYPES.comments.options}
        locked={locked}
      />
    </div>
  );
};

export const CommentsList = () => {
  const { uiData, pinTitles } = useTranslations();
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.comments.name].itemsOrder
  );
  const { locked, color, visibility, shape, order, grouped, onlyOnMap } =
    useSelector(
      (state) => state.listStore.lists[LIST_TYPES.comments.name].attr
    );
  const dispatch = useDispatch();
  const onReorder = useCallback(
    (newItemsOrder) => {
      dispatch(
        reorderItems({ listType: LIST_TYPES.comments.name, newItemsOrder })
      );
    },
    [dispatch]
  );

  const [changeTitle, setChangeTitle] = useState(`${uiData[LIST_TYPES.comments.translation_key].tr_text}`)

  useEffect(() => {
    setChangeTitle(
      pinTitles[LIST_TYPES.comments.translation_key]?.isChanged ?
        pinTitles[LIST_TYPES.comments.translation_key]?.changed
        : uiData[LIST_TYPES.comments.translation_key].tr_text
    )
    //eslint-disable-next-line
  }, [uiData])

  return (
    <CommonListWrapper
      listType={LIST_TYPES.comments.name}
      title={uiData[LIST_TYPES.comments.translation_key].tr_text}
      inBracketTitle={itemsOrder.length}
      target={LIST_TYPES.comments.translation_key}
      OgTitle={LIST_TYPES.comments.default_label}
      changeTitle={changeTitle}
      setChangeTitle={setChangeTitle}
      locked={locked}
      color={color}
      printButton = {false}
      visibility={visibility}
      listItemContainer={
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <SubToolbar
              locked={locked}
              shape={shape}
              order={order}
              color={color}
              grouped={grouped}
              onlyOnMap={onlyOnMap}
              listType={LIST_TYPES.comments.name}
              listSubtype={null}
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
                <CommentItem key={itemId} itemId={itemId} locked={locked} />
              ))}
            </ReactSortable>
          </div>
        </div>
      }
    />
  );
};

export default CommentsList;
