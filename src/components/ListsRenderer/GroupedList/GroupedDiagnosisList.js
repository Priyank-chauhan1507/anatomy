import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GROUPED_DIAGNOSIS_TYPES,
  LIST_TYPES
} from "../../../constants/listsConstants";
import useTranslations from "../../../hooks/useTranslations";
import SubToolbar from "../../subtoolbar/OrderedSubToolbar";
import { CommonItemWrapper } from "../ItemTemplates";

import { useDispatch } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { reorderItems } from "../../../store/slices/lists";
import { openICDModal } from "../../../store/slices/modals";
import { CommonListWrapper } from "../ListTemplates";

const GroupDiagnosisItem = ({ itemId, locked, subtype }) => {

  const item = useSelector((state) => state.listStore.itemsMap[itemId])
  const dispatch = useDispatch();
  useEffect(() => {
    if (item.listSubtype === 'custom_look_up_diag') {
      dispatch(openICDModal({
        itemId: itemId, isGrouped: false
      }))
    }
    //eslint-disable-next-line
  }, [item.listSubtype])

  return (
    <div className="listContent__item">
      <CommonItemWrapper
        itemId={itemId}
        subtype={subtype}
        listType={LIST_TYPES.grouped_diagnosis.name}
        subtypeOptions={LIST_TYPES.grouped_diagnosis.options}
        locked={locked}
      />
    </div>
  );
};

export const GroupedDiagnosisList = ({ subtype }) => {
  const { uiData, pinTitles } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.grouped_diagnosis.name][subtype]
        .itemsOrder
  );
  const { locked, color, shape, order, grouped, onlyOnMap, visibility } =
    useSelector(
      (state) =>
        state.listStore.lists[LIST_TYPES.grouped_diagnosis.name][subtype].attr
    );
  const dispatch = useDispatch();
  const onReorder = useCallback(
    (newItemsOrder) => {
      dispatch(
        reorderItems({
          listType: LIST_TYPES.grouped_diagnosis.name,
          listSubtype: subtype,
          newItemsOrder,
        })
      );
    },
    [dispatch, subtype]
  );

  const [changeTitle, setChangeTitle] = useState(`${
   uiData[GROUPED_DIAGNOSIS_TYPES[subtype].translation_key]?.tr_text
  }`)

  useEffect(() => {
    setChangeTitle(
      pinTitles[GROUPED_DIAGNOSIS_TYPES[subtype].translation_key]?.isChanged 
    ? pinTitles[GROUPED_DIAGNOSIS_TYPES[subtype].translation_key]?.changed 
    :uiData[GROUPED_DIAGNOSIS_TYPES[subtype].translation_key]?.tr_text
    )
    //eslint-disable-next-line
  }, [uiData])

  return (
    <CommonListWrapper
      listType={LIST_TYPES.grouped_diagnosis.name}
      title={uiData[GROUPED_DIAGNOSIS_TYPES[subtype].translation_key]?.tr_text}
      inBracketTitle={itemsOrder.length}
      target={GROUPED_DIAGNOSIS_TYPES[subtype].translation_key}
      OgTitle={GROUPED_DIAGNOSIS_TYPES[subtype].default_label}
      changeTitle={changeTitle}
      setChangeTitle={setChangeTitle}
      listSubtype={subtype}
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
              onlyOnMap={onlyOnMap}
              listType={LIST_TYPES.grouped_diagnosis.name}
              listSubtype={subtype}
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
                <GroupDiagnosisItem
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

export default GroupedDiagnosisList;
