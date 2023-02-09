import { isEmpty } from "lodash";
import React, { useState, useEffect } from "react";
import store from "../store";
import { chooseList } from "../utils/helpers";
import { View, Text } from "@react-pdf/renderer";
const formatDiagnosis = (diagnosis, code, uiData) => {
  return `${uiData?.label_DiagnosisAbbreviation?.tr_text}: ${diagnosis} (${code}) `;
};
var diagnosisData = {};
var initialDiagnosis = {
  data: {},
  isLoaded: false,
  isError: false,
};
const fetchDiagnosisData = async (icd_code = "", lang = "") => {
  return await new Promise((resolve, reject) => {
    if (diagnosisData[lang] && diagnosisData[lang][icd_code]) {
      const data = diagnosisData[lang][icd_code];
      if (data.isLoaded) {
        resolve(data);
      } else {
        const timeInterval = setInterval(() => {
          const data = diagnosisData[lang][icd_code];
          if (data.isLoaded) {
            clearInterval(timeInterval);
            resolve(data);
          }
        }, 1000);
      }
    } else {
      if (!diagnosisData[lang]) {
        diagnosisData[lang] = {};
      }
      diagnosisData[lang][icd_code] = {
        data: {},
        isLoaded: false,
        isError: false,
      };
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/icd/diagnosis?lang=${lang}&icdCode=${icd_code}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!diagnosisData[lang]) {
            diagnosisData[lang] = {};
          }
          diagnosisData[lang][icd_code] = {
            ...diagnosisData[lang][icd_code],
            isLoaded: true,
            data: data,
          };
          resolve(diagnosisData[lang][icd_code]);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

const useDiagnosis = (icd_code = "") => {
  const [diagnosis, setDiagnosis] = useState(initialDiagnosis);
  const { diagnosisLanguage } = store.getState().translation;

  useEffect(() => {
    if (icd_code) {
      fetchDiagnosisData(icd_code, diagnosisLanguage)
        .then((data) => {
          setDiagnosis(data);
        })
        .catch((err) => {});
    }
  }, [icd_code, diagnosisLanguage]);

  return diagnosis;
};

export const DiagnosisRenderer = ({
  isPrimary,
  icd,
  exts,
  toggle,
  textWrap = true,
}) => {
  const Store = store.getState();
  const { data, isLoaded } = useDiagnosis(icd);
  const uiData = Store.translation.uiData;
  const postCoordinationObj = isEmpty(data.postCoordination)
    ? {}
    : data.postCoordination;
  return (
    <View style={{ fontSize: isPrimary ? 16 : 14 }}>
      {isLoaded ? (
        <>
          {toggle ? (
            <View>
              <Text>{formatDiagnosis(data.diagnosis, icd, uiData)}</Text>
            </View>
          ) : (
            <View /*className={textWrap ? "textwrap" : ''}*/
              style={{
                fontSize: "75%",
              }}>
              <Text> {formatDiagnosis(data.diagnosis, icd, uiData)}</Text>
            </View>
          )}

          <View style={{}}>
            {exts &&
              exts.map((ext) => {
                return (
                  <View
                    style={{
                      color: "rgba(0, 0, 0, 0.87)",
                      maxWidth: "90%",
                      display: "inline-flex",
                      fontSize: "0.8125rem",
                      alignItems: "center",
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      borderRadius: 16,
                      verticalAlign: "middle",
                      justifyContent: "center",
                      backgroundColor: "#e0e0e0",
                      margin: "5px 5px",
                      padding: 5,
                    }}>
                    <Text>{postCoordinationObj[ext.id][ext.opt]}</Text>
                  </View>
                );
              })}
          </View>
        </>
      ) : (
        <Text style={{ fontSize: "12px" }}>
          {uiData?.listItem_NoDiagnosis?.tr_text}
        </Text>
        // "No Diagnosis Available"
        // ""
      )}
    </View>
  );
};

export default function ItemDiagnosis({ itemId, isGrouped }) {
  const Store = store.getState();
  const itemMap = Store.listStore.itemsMap;
  // const listType = itemMap[itemId].listType;
  // const listSubtype = itemMap[itemId].listSubtype;
  const toggle = true;
  const diagnoses = itemMap[itemId].diagnoses;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        cursor: "pointer",
      }}>
      {diagnoses && diagnoses.length < 1
        ? [{ icd: "", exts: [] }].map(({ icd, exts }, index) => {
            return (
              <>
                <DiagnosisRenderer
                  toggle={toggle}
                  key={icd}
                  icd={icd}
                  isPrimary={index === 0}
                  exts={exts}
                />
              </>
            );
          })
        : diagnoses &&
          diagnoses.map(({ icd, exts }, index) => {
            //eslint-disable-next-line
            if (icd === "") {
              return;
            }
            return (
              <>
                <DiagnosisRenderer
                  toggle={toggle}
                  key={icd}
                  icd={icd}
                  isPrimary={index === 0}
                  exts={exts}
                />
              </>
            );
          })}
    </View>
  );
}

// {
//   /* <View>
//   {
//     exts.map((ext) => {
//       <View style={{
//         color: "rgba(0, 0, 0, 0.87)",
//         height: 32,
//         display:'inline-flex',
//         fontSize: '0.8125rem',
//         alignItems: 'center',
//         fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//         whiteSpace: 'nowrap',
//         borderRadius: 16,
//         verticalAlign: 'middle',
//         justifyContent: 'center',
//         backgroundColor: '#e0e0e0'
//     }}>
//       {ext.id}
//     </View>
//   })
// }
// </View> */
// }
