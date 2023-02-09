import moment from "moment";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import useTranslations from "../../hooks/useTranslations";
import { getGenderSymbol, numberToRoman } from "../../utils/helpers";
import "./preview.css";

const Preview = forwardRef(
  (
    {
      exportImages,
      orderedListContents,
      isMetaRequired,
      unorderedListContents,
      patientInfoRequired,
    },
    ref
  ) => {
    const getDate = (DOB__obj) => {
      let birthDate = new Date(DOB__obj);

      if (Object.prototype.toString.call(birthDate) === "[object Date]") {
        // it is a date
        if (isNaN(birthDate.getTime())) {
          // date is not valid
          return "- - -";
        } else {
          // date is valid
          return `${birthDate.getFullYear()}-${
            birthDate.getMonth() + 1
          }-${birthDate.getDate()}`;
        }
      } else {
        // not a date
        return "- - -";
      }
    };
    const { uiData } = useTranslations();
    const patientInfo = useSelector((state) => state.userSettings.patientInfo);
    const patientInfoOnProofOfConcept = (patientInfo) => {
      return (
        <span style={{ fontSize: "1rem" }}>
          PATIENT INFO: {"  "}
          {patientInfo.firstName && <strong>{patientInfo.firstName}</strong>}
          &nbsp;
          {patientInfo.lastName && <strong>{patientInfo.lastName}</strong>}
          &nbsp;
          {patientInfo.preferredName?.length > 0 && (
            <>
              <strong>({patientInfo.preferredName})</strong>
              &nbsp;
            </>
          )}
          (
          {patientInfo.DOB && (
            <>
              {moment().diff(patientInfo.DOB, "years")}
              &nbsp;
            </>
          )}
          ){" "}
          {patientInfo.gender && (
            <>
              <span>({getGenderSymbol(patientInfo.gender)})</span>
              &nbsp;
            </>
          )}
          {patientInfo.DOB && (
            <span style={{ display: "inline-block" }}>
              &nbsp;
              {uiData && getDate(patientInfo.DOB) !== ""
                ? `${uiData.label_FNB_PtDOB.emoji_code} `
                : ""}
              {getDate(patientInfo.DOB)}
              &nbsp;
            </span>
          )}
          <br />
          {patientInfo.MRN && (
            <span>
              {uiData?.label_FNB_MRN.emoji_code} {patientInfo.MRN}
            </span>
          )}{" "}
          {patientInfo.additionalInfo && (
            <span>({patientInfo.additionalInfo}) &nbsp;</span>
          )}
          {patientInfo.skinType && (
            <span>
              {"(" + numberToRoman(parseFloat(patientInfo.skinType)) + ")"}
              &nbsp;
            </span>
          )}
          {patientInfo.monkType && <span>{patientInfo.monkType}</span>}
          {patientInfo.flag && <span> {patientInfo.flag} </span>}
        </span>
      );
    };

    return (
      <div className='exportModal'>
        <div className='modalBox'>
          <h2 style={{ margin: "16px 0" }}>PREVIEW OF THE PDF</h2>

          <div className='pr-container'>
            <div id='pdf-preview' ref={ref}>
              {isMetaRequired && (
                <p className='summary'>
                  Summary of Items: Shave biopsy (3), Punch biopsy (1),
                  Cryo-Wart (9), Cryo-AK (4), Diagnosis-Acne(2)
                </p>
              )}
              {patientInfoRequired && (
                <p classname='patient-info'>
                  {patientInfoOnProofOfConcept(patientInfo)}
                </p>
              )}

              <div
                // style={{
                //     width: "730px",
                //     aspectRatio: "11/8.5",
                //     position: "relative",
                // }}
                className={
                  isMetaRequired ? "export-map-div" : "anatomic-image-div"
                }>
                <img
                  src={exportImages.map}
                  alt=''
                  className={
                    isMetaRequired ? "export-map-image" : "anatomic-image"
                  }
                  // style={{
                  //     objectFit: "contain",
                  //     width: "100%",
                  //     height: "100%",
                  //     position: "absolute",
                  //     top: 0,
                  //     left: 0,
                  // }}
                />
                {isMetaRequired && (
                  <img
                    src={exportImages.canvas}
                    alt=''
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </div>
              {isMetaRequired && (
                <>
                  <div className='html2pdf__page-break'></div>

                  <div className='tables ordered-list '>
                    <h2
                      style={{
                        textTransform: "uppercase",
                      }}>
                      ordered PROCEDURE GENERATED ON {getDate(new Date())}
                    </h2>

                    <table>
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Location</th>
                          <th>Type</th>
                          <th>User Entered Notes</th>
                          <th>Photo(s)</th>
                        </tr>
                      </thead>

                      {orderedListContents.map(
                        ({
                          id,
                          biopsy__type,
                          anatomic__site,
                          user__notes,
                          user__image,
                        }) => (
                          <tr key={id}>
                            <td>{id}</td>
                            <td>{anatomic__site?.getFullName()}</td>
                            <td>{biopsy__type}</td>

                            <td>{user__notes}</td>
                            <td>
                              {user__image &&
                                user__image.map((imgData) => {
                                  // this will map for each image data for a list item
                                  return (
                                    <div
                                      style={{
                                        marginBottom: "10px",
                                      }}>
                                      <img
                                        src={imgData.user_img}
                                        alt=''
                                        style={{
                                          height: "50px",
                                        }}></img>
                                      <p
                                        style={{
                                          textAlign: "center",
                                          wordBreak: "break-all",
                                        }}>
                                        {imgData.user_image_note &&
                                          imgData.user_image_note}
                                      </p>
                                    </div>
                                  );
                                })}
                            </td>
                          </tr>
                        )
                      )}
                    </table>
                    <h2 style={{ margin: "20px 0" }}>
                      NOTES ABOUT ordered PROCEDURE GENERATED ON :{" "}
                      {getDate(new Date())}
                    </h2>
                    <div id='pageBreak'>
                      {orderedListContents.map(
                        ({ id, biopsy__type, anatomic__site, user__notes }) => (
                          <ul>
                            <li
                              type='A'
                              style={{
                                margin: "10px 0",
                              }}
                              key={id}>
                              {id} - {anatomic__site?.getFullName()} -{" "}
                              {biopsy__type} - {user__notes}.
                              <p
                                style={{
                                  color: "grey",
                                  fontSize: "14px",
                                  marginTop: "8px",
                                }}>
                                Note: this is a additional information, this is
                                a dummy text this is a additional information,
                                this is a dummy text this is a additional
                                information, this is a dummy text this is a
                                additional information, this is a dummy text
                              </p>
                            </li>
                          </ul>
                        )
                      )}
                    </div>
                  </div>
                  <div className='html2pdf__page-break'></div>

                  {unorderedListContents.length > 0 && (
                    <div className='tables unordered-list' id='pageBreak'>
                      <h2
                        style={{
                          textTransform: "uppercase",
                        }}>
                        UNordered LIST GENERATED ON {getDate(new Date())}
                      </h2>

                      <div>
                        {unorderedListContents.map(
                          ({
                            id,
                            biopsy__type,
                            anatomic__site,
                            user__notes,
                            user__image,
                          }) => (
                            <div key={id}>
                              <div key={biopsy__type}>
                                <h3
                                  style={{
                                    margin: "14px 0 4px 0",
                                  }}>
                                  Type: {biopsy__type} (total: 3 anatomic sites
                                  documented; 9 treated)
                                </h3>
                                <table>
                                  <tr>
                                    <th>Location</th>
                                    <th></th>
                                    <th>User Entered Notes</th>
                                    <th>Photo(s)</th>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{
                                        textAlign: "start",
                                      }}>
                                      {anatomic__site?.getFullName()}
                                    </td>
                                    <td
                                      style={{
                                        width: "117px",
                                      }}>
                                      this is some DUMMY TEXT that is written
                                      here
                                    </td>
                                    <td>{user__notes}</td>
                                    <td>
                                      {user__image &&
                                        user__image.map((imgData) => {
                                          return (
                                            <div
                                              style={{
                                                marginBottom: "10px",
                                              }}>
                                              <img
                                                src={imgData.user_img}
                                                alt=''
                                                style={{
                                                  height: "50px",
                                                }}></img>
                                              <p
                                                style={{
                                                  textAlign: "center",
                                                  wordBreak: "break-all",
                                                }}>
                                                {imgData.user_image_note &&
                                                  imgData.user_image_note}
                                              </p>
                                            </div>
                                          );
                                        })}
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <div id='pageBreak' className='ordered-list '>
                    <h3>Photo Appendix :</h3>
                    {orderedListContents.map(
                      ({
                        id,
                        biopsy__type,
                        anatomic__site,
                        user__notes,
                        user__image,
                      }) => (
                        <div>
                          <div className='html2pdf__page-break'></div>

                          <h3>
                            Photos for{" "}
                            {`${id}: ${anatomic__site?.getFullName()}`} :
                          </h3>
                          <table>
                            <tr
                              style={{
                                border: "1px solid black",
                                padding: "1vw",
                              }}>
                              <td
                                style={{
                                  borderRight: "1px solid black",
                                  padding: "1vw",
                                }}>
                                {id}
                              </td>
                              <td
                                style={{
                                  borderRight: "1px solid black",
                                  padding: "1vw",
                                }}>
                                {anatomic__site?.getFullName()}
                              </td>
                              <td
                                style={{
                                  borderRight: "1px solid black",
                                  padding: "1vw",
                                }}>
                                {biopsy__type} Biopsy
                              </td>

                              <td
                                style={{
                                  border: "1px solid black",
                                  padding: "1vw",
                                }}>
                                {user__notes}
                              </td>
                            </tr>
                          </table>
                          <br />
                          <br />
                          {user__image &&
                            user__image.map(({ user_img, user_image_note }) => {
                              // this will map for each image data for a list item
                              return (
                                <>
                                  <h4
                                    style={{
                                      marginBottom: "10px",
                                      textAlign: "center",
                                      wordBreak: "break-all",
                                    }}>
                                    {user_image_note && user_image_note}
                                  </h4>
                                  <img
                                    src={user_img}
                                    alt=''
                                    style={{
                                      height: "auto",
                                      width: "35rem",
                                      display: "block",
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                      marginBottom: "20px",
                                    }}></img>
                                </>
                              );
                            })}
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Preview;
