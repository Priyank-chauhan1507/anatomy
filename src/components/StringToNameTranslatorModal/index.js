import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Item,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Tooltip,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  AddCircle,
  FileCopyOutlined,
  Help,
  Remove,
  Reorder,
} from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { modifiers } from "../../constants/listsConstants";
import { TranslationContext } from "../../contexts/translation";
import useTranslations from "../../hooks/useTranslations";
import {
  toggleSNSModal,
  toggleStringToNameTranslatorModal,
} from "../../store/slices/modals";
import {
  getAnatomyMapperIdString,
  getFoundationIdString,
  getICDCodeString,
} from "../../utils/cf";
import {
  selectARegionInAPath,
  parsePath,
  patchSVGWithPattern,
} from "../../utils/regionUtils";
import CustomizedDialogs from "../Dialog/Dialog";
import VisualPreviewPopup from "./VisualPreviewPopup";

const formatAPIResult = (data, laterality, enhance_modifiers, magMapping) => {
  const devPlanes = [];
  enhance_modifiers = enhance_modifiers || [];
  return data
    .filter((datum) => {
      if (laterality && datum.laterality === laterality) {
      } else {
        if (!laterality) {
        } else {
          return false;
        }
      }
      const egzt = datum.data_egzt;
      let isThisValid = true;
      let devPlane = [];
      enhance_modifiers.some((em) => {
        if (magMapping[em]) {
          const someValue = magMapping[em].find(({ egztId }) => egzt == egztId);
          if (someValue) {
            devPlane.push(someValue.name);
          } else {
            isThisValid = false;
            return true;
          }
        } else {
          isThisValid = false;
          return true;
        }
      });

      if (isThisValid) {
        devPlane.sort((a, b) => {
          a = a.slice(1);
          b = b.slice(1);
          return a.localeCompare(b);
        });
        devPlanes.push(devPlane.join(""));
      }

      return isThisValid;
    })
    .map((v) => {
      return {
        ...v,
        devPlane: devPlanes.shift(),
      };
    });
};

const useStyles = makeStyles((theme) => ({
  visualPreview: {
    display: "flex",
    flexWrap: "wrap",
    cursor: "pointer",
    "&>svg": {
      border: "2px solid #616161",
      borderRadius: "5px",
      padding: "10px",
      overflow: "hidden",
      width: "100%",
      height: "100%",

      "&>.AMCopyrightLogoWatermark": {
        display: "none",
      },
    },
  },
  withoutDimensions: {
    width: 0,
    height: 0,
  },
  // backDrop: {
  //   backdropFilter: "blur(10px)",
  //   backgroundColor: "rgba(0,0,30,0.4)",
  // },
}));

function getNameStringForCopy(nameString, sns) {
  // const sequence = [
  //   "laterality",
  //   "prefix",
  //   "enhance_modifier",
  //   "anatomic_site",
  //   "suffix",
  // ];

  const sequence = Object.values(sns.orderList).map((el) => el.id);

  // const { laterality, enhance_modifier, anatomic_site, prefix, suffix } =
  //   nameString;
  // var finalNameString = laterality + " ";
  // if (prefix.length > 0) finalNameString += prefix.join(" ");
  // if (enhance_modifier.length > 0)
  //   finalNameString += "(" + enhance_modifier.join(" ") + ")";
  // finalNameString += anatomic_site;
  // if (suffix.length > 0) finalNameString += "{" + suffix.join(" ") + "}";

  var finalNameString = "";

  sequence.forEach((id) => {
    if (typeof nameString[id] == "string")
      finalNameString += " " + nameString[id] + " ";
    else if (nameString[id]?.length > 0) {
      if (id === "prefix") finalNameString += nameString[id].join(" ");
      if (id === "enhance_modifier")
        finalNameString += "(" + nameString[id].join(" ") + ")";
      if (id === "suffix")
        finalNameString += "{" + nameString[id].join(" ") + "}";
    }
  });

  return finalNameString;
}

function StringToNameTranslator() {
  const { uiData, language, languagesData, lateralityData, anatomicData } =
    useTranslations();
  const modalOpen = useSelector(
    (s) => s.modals.stringToNameTranslatorModal.state
  );
  const sns = useSelector((s) => s.listStore.globalSNS);
  const dispatch = useDispatch();

  const lateralities = ["bilateral", "left", "right", "median", "unilateral"];

  const laterality_labels = {};
  lateralities.forEach((l) => {
    const { icd_code, foundation_id, laterality_id } = lateralityData[l];
    if (icd_code?.length > 0)
      laterality_labels[icd_code] = lateralityData[l].text;
    if (foundation_id?.length > 0)
      laterality_labels[foundation_id] = lateralityData[l].text;
    if (laterality_id?.length > 0)
      laterality_labels[laterality_id] = lateralityData[l].text;
  });
  const modifier_labels = {};
  Object.values(lateralityData.modifierTerms).forEach((obj) => {
    modifier_labels[obj.modifier_id] = obj?.tr_text;
    modifier_labels[obj.icd_code] = obj?.tr_text;
    modifier_labels[obj.foundation_id] = obj?.tr_text;
  });

  const site_labels = {};
  if (anatomicData) {
    Object.values(anatomicData).forEach((obj) => {
      site_labels[obj.amid] = obj.synonym_language;
      site_labels[obj.icd_code] = obj.synonym_language;
      site_labels[obj.foundation_id] = obj.synonym_language;
    });
  }

  const amid_values = {};
  if (anatomicData) {
    Object.values(anatomicData).forEach((obj) => {
      amid_values[obj.amid] = obj.amid;
      amid_values[obj.icd_code] = obj.amid;
      amid_values[obj.foundation_id] = obj.amid;
    });
  }

  const laterality_values = {};
  lateralities.forEach((l) => {
    const { icd_code, foundation_id, laterality_id } = lateralityData[l];
    if (icd_code?.length > 0)
      laterality_values[icd_code] = lateralityData[l].laterality_id;
    if (foundation_id?.length > 0)
      laterality_values[foundation_id] = lateralityData[l].laterality_id;
    if (laterality_id?.length > 0)
      laterality_values[laterality_id] = lateralityData[l].laterality_id;
  });

  const classes = useStyles();

  const [strings, setStrings] = useState([{ codeString: "", nameString: {} }]);
  const copyNameStrings = () => {
    const allNameStrings = strings
      .map((s) => {
        return getNameStringForCopy(s.nameString, sns);
      })
      .join("\n");
    navigator.clipboard.writeText(allNameStrings);
  };

  const onClose = () => {
    dispatch(toggleStringToNameTranslatorModal());
  };

  const openSNSModal = () => {
    dispatch(toggleSNSModal());
  };
  return (
    <CustomizedDialogs
      open={modalOpen}
      title={
        <Typography style={{ fontWeight: "bold" }}>
          {uiData.label_CodeTranslator_title?.tr_text}
        </Typography>
      }
      onClose={onClose}
      body={
        <div style={{ minWidth: 450, maxWidth: 600 }}>
          <div
            style={{
              width: "100%",
            }}
          >
            <List style={{ width: "100%" }} disablePadding>
              <ListItem style={{ padding: 0 }} disableGutters>
                <Tooltip
                  title={uiData.label_CodeTranslator_language_help?.tr_text}
                >
                  <Help />
                </Tooltip>
                &nbsp;
                <ListItemText
                  primary={
                    <Typography>
                      {uiData.label_USER_Language?.emoji_code}{" "}
                      {languagesData[language]?.languages_name_native}
                    </Typography>
                  }
                  style={{ flexGrow: 0 }}
                />
                &nbsp;
              </ListItem>
              <ListItem style={{ padding: 0 }} disableGutters>
                <Tooltip
                  title={
                    uiData.label_CodeTranslator_ChangeDisplaySequence_help
                      ?.tr_text
                  }
                >
                  <Help />
                </Tooltip>
                &nbsp;
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openSNSModal}
                >
                  {uiData.transtext_Settings?.emoji_code}{" "}
                  {uiData.label_CodeTranslator_ChangeDisplaySequence?.tr_text}
                </Button>
                &nbsp;
              </ListItem>
              <ListItem style={{ padding: 0 }} disableGutters>
                <Tooltip
                  title={
                    uiData.label_CodeTranslator_PasteCodeStrings_help?.tr_text
                  }
                >
                  <Help />
                </Tooltip>
                &nbsp;
                <ListItemText
                  primary={
                    uiData.label_CodeTranslator_PasteCodeStrings?.tr_text
                  }
                  style={{ flexGrow: 0 }}
                />
                &nbsp;
              </ListItem>
            </List>
            <IconButton
              color="primary"
              onClick={() => {
                setStrings((prev) => [
                  ...prev,
                  { codeString: "", nameString: {} },
                ]);
              }}
            >
              <AddCircle />
            </IconButton>

            <ReactSortable
              list={strings}
              setList={setStrings}
              animation={200}
              delayOnTouchStart={true}
              delay={2}
              onEnd={() => {}}
              handle=".sorting-handle"
            >
              {strings.map(({ nameString, codeString }, index) => {
                return (
                  <TranslatorComponent
                    key={index}
                    sns={sns}
                    nameString={nameString}
                    codeString={codeString}
                    index={index}
                    setStrings={setStrings}
                    strings={strings}
                    modifier_labels={modifier_labels}
                    laterality_labels={laterality_labels}
                    site_labels={site_labels}
                    amid_values={amid_values}
                    laterality_values={laterality_values}
                  />
                );
              })}
            </ReactSortable>
            <Divider />
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={copyNameStrings}>
                <FileCopyOutlined />
              </IconButton>
              <Typography>
                {uiData.label_CodeTranslator_CopyAll?.tr_text}
              </Typography>
            </div>
            <List
              style={{
                width: "100%",
                display: strings.length > 0 ? "block" : "none",
                backgroundColor: "grey",
              }}
            >
              {strings.map((s, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={
                      <NameStringComponent
                        nameString={s.nameString}
                        sns={sns}
                        noScroll
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      }
      // BackdropProps={{
      //   classes: {
      //     root: classes.backDrop,
      //   },
      // }}
    />
  );
}

export function NameStringComponent({ nameString, sns, noScroll = false }) {
  // const sequence = [
  //   "laterality",
  //   "prefix",
  //   "enhance_modifier",
  //   "anatomic_site",
  //   "suffix",
  // ];
  const sequence = Object.values(sns.orderList).map((el) => el.id);

  const nameStringComponent = {
    laterality: <u style={{ color: "red" }}>{nameString.laterality}</u>,
    prefix:
      nameString?.prefix?.length > 0 ? (
        <>
          {nameString.prefix.map((pre, index) => (
            <span style={{ color: "red" }}>
              {pre}
              {index !== nameString.prefix.length - 1 ? " " : ""}
            </span>
          ))}
        </>
      ) : (
        <></>
      ),
    enhance_modifier:
      nameString?.enhance_modifier?.length > 0 ? (
        <>
          {` (`}
          {nameString.enhance_modifier.map((em, index) => (
            <span style={{ color: "blue" }}>
              {em}
              {index !== nameString.enhance_modifier.length - 1 ? " " : ""}
            </span>
          ))}
          {`)`}
        </>
      ) : (
        <></>
      ),
    anatomic_site: <b style={{ color: 'red' }}> {nameString.anatomic_site}</b>,
    suffix:
      nameString?.suffix?.length > 0 ? (
        <>
          {` {`}
          {nameString.suffix.map((post, index) => (
            <span style={{ color: "red" }}>
              {post}
              {index !== nameString.suffix.length - 1 ? " " : ""}
            </span>
          ))}
          {`}`}
        </>
      ) : (
        <></>
      ),
    // optional_separator: <span>;</span>,
  };
  const nameStringFinal = Object.values(nameString).filter((item) => {
    return item?.length;
  });
  return (
    <Typography
      style={!noScroll ? { whiteSpace: "nowrap", overflow: "auto" } : {}}
    >
      {Boolean(nameStringFinal.length) &&
        // eslint-disable-next-line
        sequence.map((id, index) => {
          if (
            id !== "optional_separator" ||
            (id === "optional_separator" && index !== nameStringFinal.length)
          ) {
            return <>{nameStringComponent[id]} </>;
          }
        })}
    </Typography>
  );
}

export function DetailsOfVisualPreview({ codeStringData }) {
  return (
    <div style={{ marginBottom: "20px", color: "#808080" }}>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <div style={{ textTransform: "capitalize" }}>
            &lt;&lt;Anatomy mapper&nbsp;&reg;&nbsp;ID site codes&gt;&gt;
          </div>
        </Grid>
        <Grid item xs={5}>
          <div style={{ wordBreak: "break-word" }}>
            &lt;&lt;{codeStringData.anatomyMapperSiteCode}&gt;&gt;
          </div>
        </Grid>
        <Grid item xs={7}>
          <div style={{ textTransform: "capitalize" }}>
            &#123;(ICD anatomic site codes)&#125;
          </div>
        </Grid>
        <Grid item xs={5}>
          <div style={{ wordBreak: "break-word" }}>
            &#123;({codeStringData.ICDAnatomicSiteCode})&#125;
          </div>
        </Grid>
        <Grid item xs={7}>
          <div style={{ textTransform: "capitalize" }}>
            &#123;&#35;Foundation ID anatomic site codes&#35;&#125;
          </div>
        </Grid>
        <Grid item xs={5}>
          <div style={{ wordBreak: "break-word" }}>
            &#123;&#35;{codeStringData.foundationIDAnatomicSiteCode}&#35;&#125;
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export const SVGComponent = ({
  data,
  onClick = () => {},
  width = 100,
  height = 100,
}) => {
  const [svgText, setSVGText] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();
  const ref = useRef();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchSVG = async () => {
      setLoader(true);
      try {
        const res = await axios({
          url: `${process.env.REACT_APP_BACKEND_URL}/SurfaceAnatomy/Diagrams_and_Maps/${data.file_name}`,
          method: "GET",
          responseType: "text/plain",
          headers: {
            "Content-Type": "text/plain",
            "access-control-allow-origin": "*",
          },
          signal: abortController.signal,
        });
        setSVGText(res.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    fetchSVG();

    return () => {
      abortController.abort();
    };
  }, [data.file_name]);

  return loader ? (
    <div
      style={{
        width: width,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  ) : !error ? (
    <object
      aria-labelledby="svg-component"
      dangerouslySetInnerHTML={{ __html: svgText }}
      ref={(r) => {
        ref.current = r;
        const svg = r?.querySelector("svg");

        if (svg) {
          const pathElement = svg.getElementById(data.path_id);

          if (pathElement) {
            if (data.devPlane) {
              const { width: pathWidth, height: pathHeight } =
                pathElement.getBBox();
              const pathInfo = parsePath(data.path_id);

              const modifierPattern = selectARegionInAPath(
                pathWidth,
                pathHeight,
                pathInfo.egz.egzx,
                pathInfo.egz.egzy,
                data.devPlane,
                "red"
              );

              console.log(modifierPattern);
              patchSVGWithPattern(svg, modifierPattern, pathElement);
            }
            pathElement.style.fill = "red";
            pathElement.style.opacity = "0.6";
          }
        }
      }}
      style={{
        width: width,
        height: height,
      }}
      className={classes.visualPreview}
      onClick={() => {
        onClick(data, svgText);
      }}
    ></object>
  ) : null;
};

export function VisualPreviewComponent({
  amid,
  laterality,
  enhanced_modifiers,
  nameString,
}) {
  const timeout = useRef();

  const containerRef = useRef();
  const [loader, setLoader] = useState(false);
  const [showVisualPreviewPopup, setShowVisualPreviewPopup] = useState(false);
  const [svgData, setSVGData] = useState({});
  const [results, setResults] = useState([]);

  const { egztData, magMapping } = useContext(TranslationContext);

  useEffect(() => {
    // containerRef.current.innerHTML = "";

    if (amid) {
      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setLoader(true);

        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/public/api/edu/edu-private-surfacelib?amid=${amid}`
        )
          .then((res) => res.json())
          .then(async (res) => {
            setLoader(false);
            if (res.status === "success" && Array.isArray(res.result)) {
              const newResults = formatAPIResult(
                res.result,
                laterality,
                enhanced_modifiers,
                magMapping
              );

              console.log("NEW RESULTS = ", newResults);

              setResults(newResults);
            } else {
              setResults([]);
            }
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setLoader(false);
          });
      }, 600);
    }
  }, [amid, laterality, enhanced_modifiers]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Help />
        &nbsp;
        <div style={{ fontWeight: "600", fontStyle: "italic" }}>
          Visual definition Examples of General Area or Region
        </div>
      </div>

      {loader && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <CircularProgress size={40} />
        </div>
      )}

      {!loader && results.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBlock: 10,
            flexWrap: "wrap",
          }}
        >
          {results.map((svgComp) => {
            return (
              <SVGComponent
                key={svgComp.file_name}
                data={svgComp}
                onClick={(data, svgText) => {
                  setSVGData(data);
                  setShowVisualPreviewPopup(true);
                  // setSvgText(svgText);
                }}
              />
            );
          })}
        </div>
      )}

      <VisualPreviewPopup
        show={showVisualPreviewPopup}
        handleClose={() => setShowVisualPreviewPopup(false)}
        nameString={nameString}
        svgData={svgData}
      />
    </>
  );
}

export function TranslatorComponent({
  nameString,
  codeString,
  index,
  setStrings,
  strings,
  laterality_labels,
  modifier_labels,
  site_labels,
  sns,
  amid_values,
  laterality_values,
}) {
  const { uiData } = useTranslations();

  const { anatomicData, lateralityData } = useContext(TranslationContext);

  const [codeStringData, setCodeStringData] = useState({
    anatomyMapperSiteCode: "",
    ICDAnatomicSiteCode: "",
    foundationIDAnatomicSiteCode: "",
  });
  const [amid, setAmid] = useState("");
  const [laterality, setLaterality] = useState("");
  const [enhanced_modifiers, setEnhancedModifiers] = useState([]);

  const [visibilityMap, setVisibilityMap] = useState(new Set());

  useEffect(() => {
    const newVisibilityMap = new Set();
    sns.orderList.forEach(({ id, visible }) => {
      if (visible) {
        newVisibilityMap.add(id);
      }
    });
    setVisibilityMap(newVisibilityMap);
  }, [sns]);

  useEffect(() => {
    var finalNameString = {
      amid: "",
      anatomic_site: "",
      laterality: [],
      enhance_modifier: [],
      prefix: [],
      suffix: [],
    };

    const reg = new RegExp("[a-zA-Z.0-9]+[a-zA-Z0-9-&_(){]*}{0,1}");

    var tempCodeString = "";
    if (codeString.match(reg))
      tempCodeString = codeString.match(reg)[0]; //trimmed
    else return finalNameString;
    // eslint-disable-next-line
    const [siteWithLaterality, modifiers] = tempCodeString.split("__");
    // var [site, laterality] = siteWithLaterality.split("&");
    var site = "";
    var laterality = "";
    const siteWithLaterality_regex = new RegExp("[A-Z0-9.&-]+(__)*");

    var siteAndLaterality = "";
    if (tempCodeString.match(siteWithLaterality_regex))
      siteAndLaterality = tempCodeString
        .match(siteWithLaterality_regex)[0]
        .split("__")[0];
    else return finalNameString;

    if (siteAndLaterality.indexOf("-") >= 0) {
      site = siteAndLaterality.split("-")[0];
      laterality = siteAndLaterality.split("-")[1];
    } else {
      site = siteAndLaterality.split("&")[0];
      laterality = siteAndLaterality.split("&")[1];
    }

    const prefix_regex = new RegExp("__[A-Za-z0-9&]+");
    var prefixes = [];
    if (tempCodeString.match(prefix_regex))
      prefixes = tempCodeString
        .match(prefix_regex)[0]
        .split("__")[1]
        .split("&");
    //done
    const enhanced_modifiers =
      modifiers &&
      modifiers.indexOf("(") >= 0 &&
      modifiers.lastIndexOf(")") >= 0
        ? modifiers
            .slice(modifiers.indexOf("(") + 1, modifiers.lastIndexOf(")"))
            .split("&")
        : [];

    const suffixes =
      modifiers &&
      modifiers.indexOf("{") >= 0 &&
      modifiers.lastIndexOf("}") >= 0
        ? modifiers
            .slice(modifiers.indexOf("{") + 1, modifiers.lastIndexOf("}"))
            .split("&")
        : [];

    const lateralities = ["bilateral", "left", "right", "median", "unilateral"];
    const lateralityValues = [];
    lateralities.forEach((l) => {
      const { icd_code, foundation_id, laterality_id } = lateralityData[l];
      if (icd_code?.length > 0 && icd_code === laterality)
        lateralityValues.push(l);
      else if (foundation_id?.length > 0 && foundation_id === laterality)
        lateralityValues.push(l);
      else if (laterality_id?.length > 0 && laterality_id === laterality)
        lateralityValues.push(l);
    });

    const prefixesValues = [],
      suffixesValues = [],
      enhanced_modifiersValues = [];
    prefixes.map((prefix) => {
      Object.keys(lateralityData.modifierTerms).forEach(function (key, index) {
        const { icd_code, foundation_id, modifier_id } =
          lateralityData.modifierTerms[key];
        if (icd_code?.length > 0 && icd_code === prefix)
          prefixesValues.push(modifier_id);
        else if (foundation_id?.length > 0 && foundation_id === prefix)
          prefixesValues.push(modifier_id);
        else if (modifier_id && modifier_id == prefix)
          prefixesValues.push(modifier_id);
      });
    });

    suffixes.map((suffix) => {
      Object.keys(lateralityData.modifierTerms).forEach(function (key, index) {
        const { icd_code, foundation_id, modifier_id } =
          lateralityData.modifierTerms[key];
        if (icd_code?.length > 0 && icd_code === suffix)
          suffixesValues.push(modifier_id);
        else if (foundation_id?.length > 0 && foundation_id === suffix)
          suffixesValues.push(modifier_id);
        else if (modifier_id && modifier_id == suffix)
          suffixesValues.push(modifier_id);
      });
    });

    enhanced_modifiers.map((em) => {
      Object.keys(lateralityData.modifierTerms).forEach(function (key, index) {
        const { icd_code, foundation_id, modifier_id } =
          lateralityData.modifierTerms[key];
        if (icd_code?.length > 0 && icd_code === em)
          enhanced_modifiersValues.push(modifier_id);
        else if (foundation_id?.length > 0 && foundation_id === em)
          enhanced_modifiersValues.push(modifier_id);
        else if (modifier_id && modifier_id == em)
          enhanced_modifiersValues.push(modifier_id);
      });
    });

    finalNameString.amid = amid_values[site];
    finalNameString.anatomic_site =
      amid_values[site] + "-" + (laterality && laterality_values[laterality]);
    finalNameString.enhance_modifier = enhanced_modifiersValues;
    finalNameString.laterality = lateralityValues;
    finalNameString.prefix = prefixesValues;
    finalNameString.suffix = suffixesValues;

    setEnhancedModifiers(enhanced_modifiersValues);
    const ICDAnatomicSiteCode = getICDCodeString(
      anatomicData[amid]?.icd_code,
      { ...finalNameString },
      lateralityData,
      undefined,
      visibilityMap
    );

    const foundationIDAnatomicSiteCode = getFoundationIdString(
      anatomicData[amid]?.foundation_id,
      { ...finalNameString },
      lateralityData,
      undefined,
      visibilityMap
    );

    const anatomyMapperSiteCode = getAnatomyMapperIdString(
      anatomicData[amid]?.amid,
      { ...finalNameString },
      lateralityData,
      undefined,
      visibilityMap
    );

    // const anatomyMapperSiteCode = finalNameString.anatomic_site

    setCodeStringData((prev) => ({
      ...prev,
      ICDAnatomicSiteCode,
      foundationIDAnatomicSiteCode,
      anatomyMapperSiteCode,
    }));
  }, [codeString]);

  const getNameString = (cd) => {
    var finalNameString = {
      amid: "",
      laterality: "",
      enhance_modifier: [],
      prefix: [],
      anatomic_site: "",
      suffix: [],
    };
    const reg = new RegExp("[a-zA-Z.0-9]+[a-zA-Z0-9-&_(){]*}{0,1}");

    var codeString = "";
    if (cd.match(reg)) codeString = cd.match(reg)[0]; //trimmed
    else return finalNameString;
    // eslint-disable-next-line
    const [siteWithLaterality, modifiers] = codeString.split("__");
    // var [site, laterality] = siteWithLaterality.split("&");
    var site = "";
    var laterality = "";
    const siteWithLaterality_regex = new RegExp("[A-Z0-9.&-]+(__)*");

    var siteAndLaterality = "";
    if (codeString.match(siteWithLaterality_regex))
      siteAndLaterality = codeString
        .match(siteWithLaterality_regex)[0]
        .split("__")[0];
    else return finalNameString;

    if (siteAndLaterality.indexOf("-") >= 0) {
      site = siteAndLaterality.split("-")[0];
      laterality = siteAndLaterality.split("-")[1];
    } else {
      site = siteAndLaterality.split("&")[0];
      laterality = siteAndLaterality.split("&")[1];
    }

    const prefix_regex = new RegExp("__[A-Z0-9&]+");
    var prefixes = [];
    if (codeString.match(prefix_regex))
      prefixes = codeString.match(prefix_regex)[0].split("__")[1].split("&");
    //done
    const enhanced_modifiers =
      modifiers &&
      modifiers.indexOf("(") >= 0 &&
      modifiers.lastIndexOf(")") >= 0
        ? modifiers
            .slice(modifiers.indexOf("(") + 1, modifiers.lastIndexOf(")"))
            .split("&")
        : [];

    const suffixes =
      modifiers &&
      modifiers.indexOf("{") >= 0 &&
      modifiers.lastIndexOf("}") >= 0
        ? modifiers
            .slice(modifiers.indexOf("{") + 1, modifiers.lastIndexOf("}"))
            .split("&")
        : [];

    if (laterality_labels[laterality]) {
      finalNameString.laterality = laterality_labels[laterality];
      // let tempCodeStringData = { ...codeStringData }
      // tempCodeStringData.laterality = laterality
    }

    if (laterality) {
      setLaterality(laterality_values[laterality]);
    } else {
      setLaterality("");
    }
    // eslint-disable-next-line
    const em_name_strings = enhanced_modifiers.map((em) => {
      if (em?.length > 0 && modifier_labels[em]) return modifier_labels[em];
    });
    if (em_name_strings.length > 0)
      finalNameString.enhance_modifier = em_name_strings;
    // eslint-disable-next-line
    const prefixes_strings = prefixes.map((em) => {
      if (em?.length > 0 && modifier_labels[em]) return modifier_labels[em];
    });
    if (prefixes_strings.length > 0) finalNameString.prefix = prefixes_strings;

    if (site_labels[site]) finalNameString.anatomic_site = site_labels[site];
    if (amid_values[site]) {
      finalNameString.amid = amid_values[site];
      // let tempCodeStringData = { ...codeStringData }
      // tempCodeStringData.amid = amid_values[site]
      setAmid(amid_values[site]);
    }

    // eslint-disable-next-line
    const suffixes_strings = suffixes.map((em) => {
      if (em?.length > 0 && modifier_labels[em]) return modifier_labels[em];
    });
    if (suffixes_strings.length > 0) finalNameString.suffix = suffixes_strings;

    return finalNameString;
  };

  const copyIndividualNameString = () => {
    navigator.clipboard.writeText(getNameStringForCopy(nameString, sns));
  };
  const checkError = () => {
    if (codeString.length === 0) return false;

    const pattern1 =
      /[0-9]{1,3}(?:.[0-9]{1,2})?(?:-[BLRMU])?(?:__)?(?:[0-9]{1,2}&?)*(?:\((?:[0-9]{1,2}&?)*\))*(?:{(?:[0-9]{1,2}&?)*})*/;

    if (
      codeString.match(pattern1) &&
      (codeString.length - 4 === codeString.match(pattern1)[0].length ||
        codeString.length === codeString.match(pattern1)[0].length)
    ) {
      return false;
    }
    const pattern2 =
      /[0-9]{9,10}&[0-9]{9,10}__(?:[0-9]{9,10}&?)*(?:\((?:[0-9]{9,10}&?)*\))*(?:{(?:[0-9]{9,10}&?)*})*/;
    if (
      codeString.match(pattern2) &&
      (codeString.length - 4 === codeString.match(pattern2)[0].length ||
        codeString.length === codeString.match(pattern2)[0].length)
    ) {
      return false;
    }

    const pattern3 =
      /X[A-Z0-9]{5}&X[A-Z0-9]{3}__(?:X[A-Z0-9]{3}&?)*(?:\((?:X[A-Z0-9]{3}&?)*\))*(?:{(?:X[A-Z0-9]{3}&?)*})*/;

    if (
      codeString.match(pattern3) &&
      (codeString.length - 4 === codeString.match(pattern3)[0].length ||
        codeString.length === codeString.match(pattern3)[0].length)
    ) {
      return false;
    }

    return true;
  };
  return (
    <div
      style={{
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
      }}
      disableGutters
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        {strings.length !== 1 && (
          <IconButton
            onClick={() => {
              setStrings((prev) => {
                const newStrings = [...prev].filter((_, i) => index !== i);
                return newStrings;
              });
            }}
          >
            <Remove />
          </IconButton>
        )}
        <TextField
          variant="outlined"
          fullWidth
          label={uiData.label_CodeTranslator_codestring?.tr_text}
          helperText={
            checkError() &&
            uiData.alert_CodeTranslator_codestring_error?.tr_text
          }
          error={checkError()}
          value={codeString}
          onChange={(e) =>
            setStrings((prev) => {
              const newStrings = [...prev];
              return newStrings.map((s, i) => {
                if (index === i) {
                  s.codeString = e.target.value;
                  s.nameString = { ...getNameString(e.target.value) };
                }
                return s;
              });
            })
          }
        />

        <Reorder className="sorting-handle" style={{ cursor: "move" }} />
      </div>
      {!checkError() && (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <IconButton onClick={copyIndividualNameString}>
            <FileCopyOutlined />
          </IconButton>
          <NameStringComponent nameString={nameString} sns={sns} />
        </div>
      )}

      <DetailsOfVisualPreview codeStringData={codeStringData} />

      {
        // !checkError() &&
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <VisualPreviewComponent
              amid={amid}
              laterality={laterality}
              enhanced_modifiers={enhanced_modifiers}
              nameString={nameString}
            />
          </div>
        </>
      }
      <Divider />
    </div>
  );
}

export default StringToNameTranslator;
