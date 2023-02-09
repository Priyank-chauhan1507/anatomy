import { isEmpty } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDiagnosis } from "../../hooks/useDiagnosis";
import useTranslations from '../../hooks/useTranslations';
import { openICDModal } from "../../store/slices/modals";
import { chooseList } from "../../utils/helpers";
import "./Textwrap.css";

const formatDiagnosis = (diagnosis, code, uiData) => {
  return `${uiData?.label_DiagnosisAbbreviation?.tr_text}: ${diagnosis} (${code}) `;
};

export const DiagnosisRenderer = ({ isPrimary, icd, exts, toggle, textWrap = true }) => {
  const { data, isLoaded } = useDiagnosis(icd);
  const {uiData} = useTranslations();
  const postCoordinationObj = isEmpty(data.postCoordination)
    ? {}
    : data.postCoordination;
  return (
    <div style={{ fontSize: isPrimary ? 16 : 14 }}>
      {isLoaded ? (
        <>
          {toggle ? (
            <div>
              {formatDiagnosis(data.diagnosis, icd, uiData)}
            </div>
          ) : (
            <div /*className={textWrap ? "textwrap" : ''}*/
            style={{
              fontSize:"75%"
            }}>
              {formatDiagnosis(data.diagnosis, icd, uiData)}
            </div>
          )}

          <div style={{}}>
            {exts &&
              exts.map((ext) => {
                return (
                  <div
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
                    }}
                  >
                    {postCoordinationObj[ext.id][ext.opt]}
                  </div>
                );
              })}
          </div>
        </>
      ) : (
       uiData?.listItem_NoDiagnosis?.tr_text
        // "No Diagnosis Available"
        // ""
      )}
    </div>
  );
};

export default function ItemDiagnosis({
  itemId,
  isGrouped,
  listType,
  listSubtype,
}) {
  const toggle = true;
  const dispatch = useDispatch();
  const onOpenDiagnosis = () => {
    dispatch(openICDModal({ itemId, isGrouped, listType, listSubtype }));
  };

  const diagnoses = useSelector((state) =>
    isGrouped
      ? chooseList(state.listStore.lists, listType, listSubtype).attr
        .grouped_documentation.diagnoses
      : state.listStore.itemsMap[itemId].diagnoses
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        cursor: "pointer",
      }}
      onClick={onOpenDiagnosis}
    >
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
        : diagnoses && diagnoses.map(({ icd, exts }, index) => {
          //eslint-disable-next-line
          if(icd === ""){return}
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
    </div>
  );
}

// {
//   /* <div>
//   {
//     exts.map((ext) => {
//       <div style={{
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
//     </div>
//   })
// }
// </div> */
// }
