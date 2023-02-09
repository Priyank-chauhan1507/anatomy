import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { LIST_TYPES } from "../../../constants/listsConstants";
import useTranslations from "../../../hooks/useTranslations";
import { reorderItems } from "../../../store/slices/lists";
import { openICDModal } from "../../../store/slices/modals";
import SubToolbar from "../../subtoolbar/OrderedSubToolbar";
import { CommonItemWrapper } from "../ItemTemplates";
import { CommonListWrapper } from "../ListTemplates";

const SingleDiagnosisItem = ({ itemId, locked }) => {

  const item = useSelector((state) => state.listStore.itemsMap[itemId])
  const dispatch = useDispatch();
  useEffect(() => {
    if (item.listSubtype === 'custom_look_up_diag') {
      dispatch(openICDModal({
        itemId: itemId, isGrouped: false
      }))
    }//eslint-disable-next-line
  }, [item.listSubtype])

  return (
    <div className="listContent__item">
      <CommonItemWrapper
        expandedComp={null}
        itemId={itemId}
        listType={LIST_TYPES.single_diagnosis.name}
        subtypeOptions={LIST_TYPES.single_diagnosis.options}
        locked={locked}
      />
    </div>
  );
};

export const SingleDiagnosisList = () => {
  const { uiData, pinTitles } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.single_diagnosis.name].itemsOrder
  );
  const dispatch = useDispatch();
  const { locked, color, visibility, shape, order, grouped, onlyOnMap } =
    useSelector(
      (state) => state.listStore.lists[LIST_TYPES.single_diagnosis.name].attr
    );
  const onReorder = useCallback(
    (newItemsOrder) => {
      dispatch(
        reorderItems({
          listType: LIST_TYPES.single_diagnosis.name,
          newItemsOrder,
        })
      );
    },
    [dispatch]
  );

  const [changeTitle, setChangeTitle] = useState(`${uiData[LIST_TYPES.single_diagnosis.translation_key].tr_text}`)

  useEffect(() => {
    setChangeTitle(
      pinTitles[LIST_TYPES.single_diagnosis.translation_key]?.isChanged ?
        pinTitles[LIST_TYPES.single_diagnosis.translation_key]?.changed
        : uiData[LIST_TYPES.single_diagnosis.translation_key].tr_text
    )//eslint-disable-next-line
  }, [uiData])

  return (
    <CommonListWrapper
      listType={LIST_TYPES.single_diagnosis.name}
      title={uiData[LIST_TYPES.single_diagnosis.translation_key].tr_text}
      target={LIST_TYPES.single_diagnosis.translation_key}
      OgTitle={LIST_TYPES.single_diagnosis.default_label}
      changeTitle={changeTitle}
      setChangeTitle={setChangeTitle}
      inBracketTitle={itemsOrder.length}
      locked={locked}
      printButton = {false}
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
              grouped={grouped}
              changeTitle={changeTitle}
              onlyOnMap={onlyOnMap}
              listType={LIST_TYPES.single_diagnosis.name}
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
                <SingleDiagnosisItem
                  key={itemId}
                  itemId={itemId}
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

export default SingleDiagnosisList;
