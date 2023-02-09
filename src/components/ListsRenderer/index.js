import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { ORDERS } from "../../constants/itemConstants";
import { LIST_TYPES } from "../../constants/listsConstants";
import { TranslationContext } from "../../contexts/translation";
import store from "../../store";
import { setSelectedItemId } from "../../store/slices/app";
import { reorderLists, updateItemName } from "../../store/slices/lists";
import { getDirectionInWords, getFullName } from "../../utils/cf";
import { chooseList } from "../../utils/helpers";
import DeleteList from "./DeleteList";
import DeleteGallery from "./GalleryThrash";
import PaintedDistributionList from "./GroupedList/DistributionPainter";
import GroupedDiagnosisList from "./GroupedList/GroupedDiagnosisList";
import GroupedProcedureList from "./GroupedList/GroupedProcedureList";
import CommentsList from "./OrderedList/CommentsList";
import DeferList from "./OrderedList/DeferList";
import OrderedList from "./OrderedList/OrderedList";
import SingleDiagnosisList from "./OrderedList/SingleDiagnosisList";

const ListsRenderer = () => {
  const ar_name_updated_at = useSelector(
    (state) => state.listStore.ar_name_updated_at
  );
  const listsOrder = useSelector((state) => {
    return state.listStore.listsOrder;
  });
  const dispatch = useDispatch();
  const setListsOrder = useCallback(
    (newList) => {
      dispatch(reorderLists(newList));
    },
    [dispatch]
  );
  const { lateralityData, uiData, anatomicData } =
    useContext(TranslationContext);
  const trData = { lateralityData, uiData, anatomicData };

  // Logic for auto_related_same_name
  useEffect(() => {
    setTimeout(() => {
      const state = store.getState();
      const listStore = state.listStore;
      const { binList, itemsOrderMap, itemsMap, lists } = listStore;
      const deleteList = new Set();
      for (let i of binList) {
        deleteList.add(i.id);
      }

      for (let key1 in itemsMap) {
        let temp = [];
        if (deleteList.has(key1)) continue;
        for (let key2 in itemsMap) {
          if (deleteList.has(key2)) continue;
          let arr1 = chooseList(
            lists,
            itemsMap[key1].listType,
            itemsMap[key1].listSubtype
          ).attr.pinListSettings.auto_relate_pins;
          let arr2 = chooseList(
            lists,
            itemsMap[key2].listType,
            itemsMap[key2].listSubtype
          ).attr.pinListSettings.auto_relate_pins;

          if (!arr1 || !arr2) continue;
          const sns1 =
            listStore.customSNS[key1] ||
            (itemsMap[key1].listType === LIST_TYPES.painted_distribution.name
              ? listStore.distributionSNS
              : listStore.globalSNS);
          const sns2 =
            listStore.customSNS[key2] ||
            (itemsMap[key2].listType === LIST_TYPES.painted_distribution.name
              ? listStore.distributionSNS
              : listStore.globalSNS);
          const name1 = getFullName(sns1, itemsMap[key1].names, trData);
          const name2 = getFullName(sns2, itemsMap[key2].names, trData);
          if (key1 !== key2 && name1 === name2) {
            let { x, y } = getDirectionInWords(
              itemsMap[key1].egz.deviation,
              itemsMap[key2].egz.deviation
            );

            let key;
            if (x && y) key = [x, y];
            else if (x) key = [x];
            else if (y) key = [y];
            else key = ["too close"];
            const { order: order1 } = chooseList(
              lists,
              itemsMap[key2].listType,
              itemsMap[key2].listSubtype
            ).attr;
            const { order: order2 } = chooseList(
              lists,
              itemsMap[key1].listType,
              itemsMap[key1].listSubtype
            ).attr;
            const label1 = ORDERS[order1].resolve(itemsOrderMap[key1]);
            const label2 = ORDERS[order2].resolve(itemsOrderMap[key2]);
            temp = [...temp, [label1, key, label2]];
          }
        }
        dispatch(updateItemName({ itemId: key1, name: temp }));
      }
    }, 1000);
    //eslint-disable-next-line
  }, [ar_name_updated_at]);

  return (
    <div className='app__mainBody__list__accordion'>
      <ReactSortable
        list={listsOrder}
        setList={setListsOrder}
        onEnd={() => {}}
        handle='.sorting-handle'>
        {listsOrder.length > 0 &&
          listsOrder.map(({ listType, listSubtype }) => {
            switch (listType) {
              case LIST_TYPES.ordered.name:
                return <OrderedList key={listType} />;
              case LIST_TYPES.grouped_procedure.name:
                return (
                  <GroupedProcedureList
                    key={listType + "-" + listSubtype}
                    subtype={listSubtype}
                  />
                );
              case LIST_TYPES.grouped_diagnosis.name:
                return (
                  <GroupedDiagnosisList
                    key={listType + "-" + listSubtype}
                    subtype={listSubtype}
                  />
                );
              case LIST_TYPES.single_diagnosis.name:
                return <SingleDiagnosisList key={listType} />;
              case LIST_TYPES.comments.name:
                return <CommentsList key={listType} />;
              case LIST_TYPES.defer.name:
                return <DeferList key={listType} subtype={listSubtype} />;
              case LIST_TYPES.painted_distribution.name:
                return (
                  <PaintedDistributionList
                    key={listType + "-" + listSubtype}
                    subtype={listSubtype}
                  />
                );
              default:
                return null;
            }
          })}
      </ReactSortable>
      <DeleteList />
      <DeleteGallery />
    </div>
  );
};

export default ListsRenderer;
