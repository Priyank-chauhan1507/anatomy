import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslations from "../../hooks/useTranslations";
import { changePatientImage } from "../../store/slices/userSettings";
import calculateAge from "../../utils/calculateAge";
import AvatarComponent from "../AvatarComponent/AvatarComponent";
// import { getGenderSymbol } from "../../App";
// import { getDate } from "../utils/cf";
import { makeStyles, Typography } from "@material-ui/core";
import { getDate } from "../../utils/cf";
import { getGenderSymbol, numberToRoman } from "../../utils/helpers";
const useStyles = makeStyles(() => ({
  profileInfoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  profileInfoAvatarContainer: {
    padding: "0px",
  },
}));
export function patientInfoString(patientInfo, encountedDateTime, uiData) {
  return (
    <span style={{ fontSize: "0.7rem", marginBottom: "1.4rem" }}>
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
      {patientInfo.DOB && (
        <>
          {calculateAge(patientInfo.DOB, encountedDateTime) !== "" && (
            <span>({calculateAge(patientInfo.DOB, encountedDateTime)})</span>
          )}
          &nbsp;
        </>
      )}
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
        <span>
          <i>{uiData?.label_PT_AdditionalPatientInfo.tr_text}:</i>{" "}
          {patientInfo.additionalInfo} &nbsp;
        </span>
      )}
      {patientInfo.skinType && (
        <span>
          {"(" + numberToRoman(parseFloat(patientInfo.skinType)) + ")"}
          &nbsp;
        </span>
      )}
      {patientInfo.monkType && <span>{`MST-${patientInfo.monkType}`}</span>}
      {patientInfo.country && (
        <span style={{ paddingInline: 4 }}>
          <img
            src={`${
              process.env.REACT_APP_BACKEND_URL
            }/static/media/svgFlags/${patientInfo.country.toLowerCase()}.svg`}
            width="20"
            alt=""
            style={{ paddingTop: 2 }}
          />
        </span>
      )}
      {encountedDateTime && (
        <span style={{ display: "inline-block" }}>
          {uiData.label_FNB_EncounterDate?.emoji_code}{" "}
          {getDate(encountedDateTime)}{" "}
        </span>
      )}
    </span>
  );
}

const PatientInfo = ({
  color,
  withBorder = false,
  isAvatarModal = true,
  isSmallAvatar = false,
}) => {
  const patientData = useSelector((state) => state.userSettings.patientInfo);
  const encounterInfo = useSelector(
    (state) => state.userSettings.encounterInfo
  );
  //let encounterDate = encounterInfo.dateTime ? new Date(encounterInfo.dateTime) : new Date();
  const classes = useStyles();

  const patientImg = useSelector((state) => state.userSettings.patientImg);
  const { uiData } = useTranslations();
  const dispatch = useDispatch();
  const patientInfoJSX = patientInfoString(
    patientData,
    encounterInfo.dateTime,
    uiData
  );

  return uiData ? (
    <div
      className={classes.profileInfoContainer}
      style={{
        borderBottom: withBorder ? "1px solid #000" : "none",
        paddingBottom: 8,
        marginBottom: 8,
      }}
    >
      <div
        className={classes.profileInfoAvatarContainer}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
      >
        <AvatarComponent
          gender={patientData.gender}
          patientInfoEle={patientInfoJSX}
          src={patientImg}
          onSave={(newImg) => {
            dispatch(changePatientImage(newImg));
          }}
          isAvatarModal={isAvatarModal}
          isSmallAvatar={isSmallAvatar}
        />
      </div>
      <Typography
        component={"div"}
        className={"accordion-heading"}
        style={{ color }}
      >
        <strong style={{ fontSize: "1rem", verticalAlign: "middle" }}>
          {uiData.label_PT_PatientInfo?.tr_text}:
        </strong>{" "}
        {patientData &&
          patientInfoString(patientData, encounterInfo.dateTime, uiData)}
      </Typography>
    </div>
  ) : null;
};

export default PatientInfo;
