import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GROUPED_DIAGNOSIS_TYPES,
  LIST_TYPES,
  ORDERS,
} from "../constants/listsConstants";
import { getDirectionInWords } from "../utils/cf";
import { isEqual } from "lodash";
const ARContext = createContext({ ar: {} });
ARContext.displayName = "Auto Related Same Name Context";
const getFullName = () => {};
function ARProvider({ children }) {
  const [ar, setAr] = useState({});
  const isSNSUpdateRequired = useSelector(
    (state) => state.listStore.isSNSUpdateRequired
  );
  const itemsMap = useSelector((state) => state.listStore.itemsMap);
  const customSNS = useSelector((state) => state.listStore.customSNS);
  const globalSNS = useSelector((state) => state.listStore.globalSNS);
  const commentList = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.comments.name]
  );
  const deferList = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.defer.name]
  );
  const singleDiagnosisList = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.single_diagnosis.name]
  );
  const orderedList = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.ordered.name]
  );
  const groupedList = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.grouped_procedure.name]
  );
  const groupedDiagnosis = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.grouped_diagnosis.name]
  );

  useEffect(() => {
    if (isSNSUpdateRequired) {
      const fullNameCache = {};
      const newARs = {};
      const meta = {
        [LIST_TYPES.grouped_procedure.name]: {},
        [LIST_TYPES.grouped_diagnosis.name]: {},
        [LIST_TYPES.single_diagnosis.name]: {
          order: singleDiagnosisList.attr.order,
        },
        [LIST_TYPES.comments.name]: {
          order: commentList.attr.order,
        },
        [LIST_TYPES.defer.name]: {
          order: deferList.attr.order,
        },
        [LIST_TYPES.ordered.name]: {
          order: orderedList.attr.order,
        },
      };
      const groupedArr = Object.keys(groupedList).map((key) => {
        meta[LIST_TYPES.grouped_procedure.name][key] = {
          order: groupedList[key].attr.order,
        };
        return groupedList[key].itemsOrder;
      });
      const groupedDiagnosisArr = Object.keys(groupedDiagnosis).map((key) => {
        meta[LIST_TYPES.grouped_diagnosis.name][key] = {
          order: groupedDiagnosis[key].attr.order,
        };
        return groupedDiagnosis[key].itemsOrder;
      });

      const mergedListItems = [
        ...singleDiagnosisList.itemsOrder.map(({ id }, index) => ({
          id,
          index,
        })),
        ...commentList.itemsOrder.map(({ id }, index) => ({ id, index })),
        ...deferList.itemsOrder.map(({ id }, index) => ({ id, index })),
        ...orderedList.itemsOrder.map(({ id }, index) => ({ id, index })),
        ...groupedArr.map(({ id }, index) => ({ id, index })),
        ...groupedDiagnosisArr.map(({ id }, index) => ({ id, index })),
      ];

      mergedListItems.forEach(({ id, index }) => {
        const { names, egz, listType, listSubtype, pathId } = itemsMap[id];
        const { sns } = customSNS[id] || globalSNS;
        const fullName = getFullName(names, sns);
        const item = {
          id,
          listType,
          listSubtype,
          index,
          pathId,
          deviation: egz.deviation,
        };
        if (fullNameCache[fullName]) {
          fullNameCache[fullName].push(item);
        } else {
          fullNameCache[fullName] = [item];
        }
      });

      Object.keys(fullNameCache).forEach((list) => {
        if (list.length === 1) {
          return;
        } else {
          list.forEach(
            ({
              index,
              id,
              listType,
              listSubtype,
              pathId,
              deviation: selfDeviation,
            }) => {
              const selfOrder =
                listType === LIST_TYPES.grouped_diagnosis.name ||
                listType === LIST_TYPES.grouped_procedure.name
                  ? meta[listType][listSubtype].order[index]
                  : meta[listType].order[index];
              newARs[id] = {
                self: {
                  id,
                  listType,
                  listSubtype,
                  pathId,
                  label: ORDERS[selfOrder]
                    ? ORDERS[selfOrder].resolve(index)
                    : "",
                },
                relations: [],
              };
              list.forEach(
                ({
                  id: id2,
                  index: index2,
                  listType: listTypeRel,
                  listSubtype: listSubtypeRel,
                  pathId: pathId2,
                  deviation: relDeviation,
                }) => {
                  const relOrder =
                    listType === LIST_TYPES.grouped_diagnosis.name ||
                    listType === LIST_TYPES.grouped_procedure.name
                      ? meta[listType][listSubtype].order[index]
                      : meta[listType].order[index];
                  const item = {
                    id: id2,
                    listType: listTypeRel,
                    listSubtype: listSubtypeRel,
                    pathId: pathId2,
                    label: ORDERS[relOrder]
                      ? ORDERS[relOrder].resolve(index2)
                      : "",
                  };
                  if (pathId === pathId2) {
                    item.relation = {
                      sameMap: false,
                    };
                  } else {
                    const { x, y } = getDirectionInWords(
                      relDeviation,
                      selfDeviation
                    );
                    item.relation = {
                      sameMap: true,
                      x: x,
                      y: y,
                    };
                  }
                  newARs[id].relations.push(item);
                }
              );
            }
          );
        }
      });
    }
  }, [isSNSUpdateRequired]);

  return <ARContext.Provider value={{ ar }}>{children}</ARContext.Provider>;
}

const emptyArr = [];

export const useAR = (id) => {
  const { ar } = React.useContext(ARContext);
  return ar[id] || emptyArr;
};

export default ARProvider;
