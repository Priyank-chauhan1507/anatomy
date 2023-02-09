import { CircularProgress, makeStyles } from "@material-ui/core";
import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TranslationContext } from "../../contexts/translation";
import useToasterMessage from "../../hooks/useToasterMessage";
import { setSVGLoaded } from "../../store/slices/app";
import calculateAge from "../../utils/calculateAge";
import { getDate, getRootSVG } from "../../utils/cf";

import { getGenderSymbol, numberToRoman } from "../../utils/helpers";
const useStyles = makeStyles((theme) => ({
  withDimensions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

    top: "initial !important",
    height: "initial !important",
    "&>svg": {
      width: "100%",
      outlineStyle: "dashed",
      outlineWidth: "1px",
      outlineColor: "#aaa",
      overflow: "hidden",
      aspectRatio: "auto !important",
    },
  },
  withoutDimensions: {
    width: 0,
    height: 0,
  },
}));

const getDateOfServiceNode = () =>
  document.getElementById("PtInfoLine2") || null;
const getPTInfoNode = () => document.getElementById("PtInfoLine1") || null;

const showFemaleAnatomy = (isShow = true) => {
  setTimeout(() => {
    const display = isShow ? "block" : "none";
    if (
      document.getElementById("HG-Female_Anatomy") &&
      document.getElementById("G-Female_Anatomy")
    ) {
      document.getElementById("HG-Female_Anatomy").style.display = display;
      document.getElementById("G-Female_Anatomy").style.display = display;
    }
  }, 1000);
};

const showMaleAnatomy = (isShow = true) => {
  setTimeout(() => {
    const display = isShow ? "block" : "none";

    if (
      document.getElementById("HG-Male_Anatomy") &&
      document.getElementById("G-Male_Anatomy")
    ) {
      document.getElementById("HG-Male_Anatomy").style.display = display;
      document.getElementById("G-Male_Anatomy").style.display = display;
    }
  }, 1000);
};

const showOralAnatomy = (isShow = true) => {
  setTimeout(() => {
    const display = isShow ? "block" : "none";
    if (
      document.getElementById("HG-Oral_Anatomy") &&
      document.getElementById("G-Oral_Anatomy")
    ) {
      document.getElementById("HG-Oral_Anatomy").style.display = display;
      document.getElementById("G-Oral_Anatomy").style.display = display;
    }
  }, 1000);
};
//sets the patient info on the SVG image at top left corner
export const setPatientInfoOnMap = (
  patientInfo,
  uiData,
  encounterDate = new Date()
) => {
  const {
    gender,
    firstName,
    lastName,
    DOB,
    skinType,
    MRN,
    //flag,
    monkType,
    //country,
  } = patientInfo;
  var dateOfBirth =
    getDate(DOB) !== ""
      ? `&nbsp;${uiData ? uiData.label_PT_Birthdate.emoji_code : ""} ` +
        getDate(DOB)
      : "";
  var age =
    calculateAge(DOB, encounterDate) !== ""
      ? `(${calculateAge(DOB, encounterDate)})`
      : "";

  if (!DOB) {
    dateOfBirth = "";
    age = "";
  }
  const piT = `${
    firstName || lastName ? firstName + " " + lastName + " " : " "
  }  ${age}  ${
    gender ? "(" + getGenderSymbol(gender) + ")" : ""
  } ${dateOfBirth} `;

  const dos = `${
    getDate(encounterDate) !== ""
      ? uiData.label_FNB_EncounterDate.emoji_code +
        " " +
        getDate(encounterDate) +
        "&nbsp;"
      : ""
  }${MRN?.length > 0 ? uiData.label_PT_MRN.emoji_code + " " + MRN : ""} ${
    skinType ? "&nbsp; (" + numberToRoman(skinType) + ")" : ""
    //eslint-disable-next-line
  } ${monkType ? "&nbsp;" + "MST-" + monkType : ""} ${"&nbsp; "} `;
  const pitNode = getPTInfoNode()?.querySelector("text");
  const dosNode = getDateOfServiceNode()?.querySelector("text");
  const parDos = getDateOfServiceNode();
  // getDateOfServiceNode()?.querySelector('text')?.innerHTML = dos;
  // getPTInfoNode()?.querySelector('text').innerHTML = piT;

  if (pitNode) {
    pitNode.innerHTML = piT;
  }
  if (dosNode) {
    dosNode.innerHTML = dos;
  }
  if (parDos) {
    const rootSVG = getRootSVG();
    const NS = rootSVG.getAttribute("xmlns");
    const previousSVGEle = document.getElementById("patientInfoSVGFlagSVG");
    if (previousSVGEle) {
      previousSVGEle.remove();
    }
    if (patientInfo.country) {
      let image = document.createElementNS(NS, "image");
      image.setAttribute(
        "href",
        `${
          process.env.REACT_APP_BACKEND_URL
        }/static/media/svgFlags/${patientInfo.country.toLowerCase()}.svg`
      );
      image.setAttribute("width", "75");
      image.setAttribute("id", "patientInfoSVGFlagSVG");
      image.setAttribute("height", "45");
      const { x, y, width } = parDos.getBBox();
      image.setAttribute("x", x + width);
      image.setAttribute("y", y);
      parDos.appendChild(image);
    }
  }
};

const stylePatientInfoNodesOnMap = () => {
  const pitNode = getPTInfoNode();
  const dosNode = getDateOfServiceNode();

  if (pitNode) {
    pitNode.style.opacity = "100%";
  }
  if (dosNode) {
    dosNode.style.opacity = "100%";
  }
};

function LoadSVG({ url, svgProps = {}, onLoadSVG }) {
  const toaster = useToasterMessage();
  const classes = useStyles();
  const { uiData } = useContext(TranslationContext);
  const dispatch = useDispatch();
  const isSVGLoaded = useSelector((state) => state.app.isSVGLoaded);
  const isOralAnatomyVisible = useSelector(
    (state) => state.userSettings.mapSettings.isOralAnatomyVisible
  );
  const hideOppositeGenderAnatomy = useSelector(
    (state) => state.userSettings.mapSettings.hideOppositeGenderAnatomy
  );
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);
  const encounterDate = useSelector(
    (state) => state.userSettings.encounterInfo.dateTime
  );

  const gender = patientInfo.gender;

  const containerRef = useRef();
  useEffect(() => {
    document.getElementById("LegacyLabelsTargetsForDeletion")?.remove();
  });
  useEffect(() => {
    const myHeaders = new Headers({
      "Content-Type": "text/plain",
      // 'X-Custom-Header': 'hello world'
    });
    // if(hasSVGLoaded) setSVGLoaded(false);
    setSVGLoaded(false);
    fetch(url, {
      headers: myHeaders,
    })
      .then((resp) => {
        return resp.text();
      })
      .then((svg) => {
        const int = setInterval(() => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;

            var foreign = document.createElement("foreignObject");
            // foreign.setAttribute("width", 200);
            // foreign.setAttribute("height", 200);
            foreign.innerHTML = `<canvas id='main-svg-canvas'>
              Sorry, Canvas HTML5 element is not supported by your browser :(
            </canvas>`;
            // foreign.appendChild(iDivele);
            // containerRef.current.childNodes[0].appendChild(foreign);

            clearInterval(int);
            dispatch(setSVGLoaded(true));
          } else {
          }
        }, 500);
        // containerR.current.getElementById('CopyrightAnatomyMapper') &&containerRef.current.getElementById('CopyrightAnatomyMapper').style= 'visibility:hidden;pointer-events:none;';
      })
      .catch((e) => {
        toaster()({
          message: "Could not load the SVG",
          type: "info",
        });
        dispatch(setSVGLoaded(false));
      });
    //eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    setPatientInfoOnMap(patientInfo, uiData, encounterDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    patientInfo.firstName,
    patientInfo.lastName,
    patientInfo.preferredName,
    patientInfo.gender,
    patientInfo.MRN,
    patientInfo.DOB,
    patientInfo.skinType,
    patientInfo.country,
    patientInfo.monkType,
    encounterDate,
  ]);

  useEffect(() => {
    // for safari svg border issue

    if (isSVGLoaded) {
      stylePatientInfoNodesOnMap();
      setPatientInfoOnMap(patientInfo, uiData, encounterDate);
      const svg = document.querySelector("#loaded-svg-cont>svg");

      if (svg) {
        svg.style.backgroundColor = "#fff";
        svg.style.outlineColor = "#ccc";
        svg.style.aspectRatio = "1";
        svg.style.zIndex = "5000";
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSVGLoaded]);

  useEffect(() => {
    return () => {
      dispatch(setSVGLoaded(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSVGLoaded) {
      showOralAnatomy(isOralAnatomyVisible);
    }
  }, [isSVGLoaded, isOralAnatomyVisible]);

  useEffect(() => {
    if (isSVGLoaded) {
      if (gender) {
        if (hideOppositeGenderAnatomy) {
          if (gender === "male") {
            showMaleAnatomy(true);
            showFemaleAnatomy(false);
          } else if (gender === "female") {
            showMaleAnatomy(false);
            showFemaleAnatomy(true);
          } else {
            showMaleAnatomy(true);
            showFemaleAnatomy(true);
          }
        } else {
          showFemaleAnatomy(true);
          showMaleAnatomy(true);
        }
      } else {
        showFemaleAnatomy(true);
        showMaleAnatomy(true);
      }
    }
  }, [isSVGLoaded, hideOppositeGenderAnatomy, gender]);

  return [
    !isSVGLoaded && (
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}>
        <CircularProgress />
      </div>
    ),
    <>
      <object
        aria-labelledby={"SVG Map"}
        id={"loaded-svg-cont"}
        ref={containerRef}
        {...svgProps}
        // {...(isSelectModeActive ? selectEvents : {})}
        // style={{width: '100%'}}
        className={
          isSVGLoaded ? classes.withDimensions : classes.withoutDimensions
        }></object>
    </>,
  ];
}

export default LoadSVG;
