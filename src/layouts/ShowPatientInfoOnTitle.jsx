import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import calculateAge from "../utils/calculateAge";
import { getDate } from "../utils/cf";
import { getGenderSymbol } from "../utils/helpers";

const getPatientInfo = (
  patientInfo,
  dateTime = new Date() /*Encounter Date time*/
) => {
  return `${patientInfo.firstName && patientInfo.firstName + ""}
    ${patientInfo.lastName && patientInfo.lastName + " "}
    ${patientInfo.preferredName && "(" + patientInfo.preferredName + ")"}
    ${
      patientInfo.DOB && dateTime
        ? "(" + calculateAge(patientInfo.DOB, dateTime) + ") "
        : ""
    }
    ${
      patientInfo.gender ? "(" + getGenderSymbol(patientInfo.gender) + ") " : ""
    }
    ${patientInfo.DOB ? "| (DOB :" + getDate(patientInfo.DOB) + ")" : ""}`;
};

export default function ShowPatientInfoOnTitle() {
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);
  const showTabTitleAsPatientInfo = useSelector(
    (state) => state.userSettings.generalSettings.showTabTitleAsPatientInfo
  );
  const timeoutRef = React.useRef(null);
  useEffect(() => {
    if (showTabTitleAsPatientInfo) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        document.title = getPatientInfo(patientInfo);
      }, 1000);
      //   document.title = patientInfo.name+" - "+patientInfo.id;
    } else {
      document.title = "Anatomy Mapper";
    }
  }, [showTabTitleAsPatientInfo, patientInfo]);
  return null;
}
