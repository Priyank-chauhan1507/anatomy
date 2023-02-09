import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore, HelpOutlined } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import NameRenderer from "./components/NameRenderer";
import { SNS_RENDERER } from "./constants/itemConstants";
import { LIST_TYPES } from "./constants/listsConstants";
import { TranslationContext } from "./contexts/translation";
import { useSNS } from "./hooks/listAndItemHooks";
import svgSurfaceAreaPercentCoverage, {
  getSurfaceAreaCoverage,
} from "./utils/svgSurfaceAreaPercentCoverage.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  name: {
    position: "relative",
  },
  hoverContainer: {
    position: "absolute",
    zIndex: 100,
    top: "100%",
    left: "0",
    display: "flex",
  },
  summary: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  extraPad: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  devBox: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  attrSectionTitle: {
    // textAlign: "center",
    fontSize: 14,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  attrLine: {
    // display: "flex",
    width: "100%",
    // justifyContent: "center",
    marginBottom: 4,
  },
  attrHead: {
    fontSize: 13,
    fontStyle: "italic",
  },

  subAttrHead: {
    fontSize: 12,
    fontStyle: "italic",
  },
  attrValue: {
    fontSize: 13,
    fontWeight: 400,
    margin: "0 4px",
  },
  subAttrValue: {
    fontSize: 12,
    fontWeight: 400,
    margin: "0 4px",
  },
  enhancedName: {
    // textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: theme.spacing(1),
  },
}));
const MetadataAccordian = ({ itemId }) => {
  const { egz, hierarchy, coords, names, pathId, listType, files, layerInfo } =
    useSelector((state) => state.listStore.itemsMap[itemId]);

  const [surfaceArea, setSurfaceArea] = React.useState({});

  useEffect(() => {
    const parentSvg = document.getElementById(layerInfo.HMAP_ID)?.firstElementChild;
    // const parentSvg = document.getElementById(layerInfo.HMAP_ID);
    console.log(parentSvg?.firstElementChild);
    const childSvg = document.getElementById(pathId);
    if (childSvg && parentSvg)
      setSurfaceArea(getSurfaceAreaCoverage(parentSvg, childSvg));
  }, [pathId, layerInfo]);

  const sns = useSNS(itemId);
  const [hasPhotos, setHasPhotos] = React.useState(false);
  const [hasPhotosTags, setHasPhotosTags] = React.useState(false);
  useEffect(() => {
    let hasPhotos = false;
    let hasPhotosTags = false;
    //eslint-disable-next-line
    files.some(({ fileType, tags }) => {
      if (fileType === "image") {
        hasPhotos = true;
        if (tags.length > 0) {
          hasPhotosTags = true;
        }
        return true;
      }
    });
    setHasPhotosTags(hasPhotosTags);
    setHasPhotos(hasPhotos);
  }, [files]);

  const classes = useStyles({
    egz,
    names,
    hierarchy,

    sns,
  });

  const { uiData, anatomicData, lateralityData } =
    useContext(TranslationContext);
  return (
    <Accordion
      className="listContent__additionalMetaData"
      style={{ backgroundColor: "#999", margin: "16px auto" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        classes={{
          content: classes.summary,
        }}
      >
        <div>
          {uiData.transtext_Metadata.tr_text +
            " " +
            uiData.transtext_EnglishOnly.tr_text}
        </div>
      </AccordionSummary>
      <AccordionDetails
        classes={{ root: classes.summary + " " + classes.extraPad }}
      >
        <div>
          <p style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={uiData.label_SNS_EmojiGroup_help.tr_text}>
              <HelpOutlined />
            </Tooltip>
            <span>{uiData.label_SNS_EmojiGroup.tr_text}</span>
          </p>

          <p className={classes.attrSectionTitle}>Pin-Point Meta Data:</p>
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>Pin X : </span>
            <span className={classes.attrValue}>
              {coords.svgCoords.x.toFixed(0) || "NA"}
            </span>
            <span className={classes.attrHead}>Pin Y : </span>
            <span className={classes.attrValue}>
              {coords.svgCoords.y.toFixed(0) || "NA"}
            </span>
            <span className={classes.attrHead}>Pin Z : </span>
            <span className={classes.attrValue}>{"NULL"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>
              Pin-Point Over Map Element :
            </span>
            <span className={classes.attrValue}>
              {pathId ? "TRUE" : "FALSE"}
            </span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>
              Pin-Point Has Associated Distribution :
            </span>
            <span className={classes.attrValue}>
              {listType !== LIST_TYPES.painted_distribution.name
                ? "FALSE"
                : "TRUE"}
            </span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>Pin-Point ID :</span>
            <span className={classes.attrValue}>{itemId}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>Test ID :</span>
            <span className={classes.attrValue}>{"test_" + itemId}</span>
          </p>

          <br />

          {/* Divider */}
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point is in list type :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point is in list subtype :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point is in list thrash :
            </span>
            <span className={classes.subAttrValue}>{"FALSE"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point needs a printable label :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point associated procedures needs consent form :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point associated procedures has signed consent form :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point associated procedures signed consent form is for
              Procedure Name :
            </span>
            <span className={classes.subAttrValue}>{""}</span>
          </p>

          <br />

          {/* Divider */}

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point list has order :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point order in parent list :
            </span>
            <span className={classes.subAttrValue}>{"1"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point order marker :
            </span>
            <span className={classes.subAttrValue}>{"A"}</span>
          </p>

          <br />

          {/* Divider */}
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>Pin-point has photos :</span>
            <span className={classes.subAttrValue}>
              {hasPhotos ? "TRUE" : "FALSE"}
            </span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point photos have tags :
            </span>
            <span className={classes.subAttrValue}>
              {hasPhotosTags ? "TRUE" : "FALSE"}
            </span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>Pin-point photo tags :</span>
            <span className={classes.subAttrValue}>{""}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Count of Photos associated with Pin-Point :
            </span>
            <span className={classes.subAttrValue}>{"0"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point has attachments :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point attachments have tags :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point attachments tags :
            </span>
            <span className={classes.subAttrValue}>{""}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Count of attachment associated with tags :
            </span>
            <span className={classes.subAttrValue}>{"0"}</span>
          </p>

          <br />

          {/* Divider */}
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point has custom user input :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point photos custom selection 1 Description :
            </span>
            <span className={classes.subAttrValue}>{""}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point photos custom selection 1 :
            </span>
            <span className={classes.subAttrValue}>{""}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-Point has associated measurement :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point has more than one associated measurement :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point has associated measurement contained in Custom Selection
              :
            </span>
            <span className={classes.subAttrValue}>{"1,2"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point associated measurement unit :
            </span>
            <span className={classes.subAttrValue}>{"cm"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point has associated count :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point associated count :
            </span>
            <span className={classes.subAttrValue}>{"0"}</span>
          </p>

          {/* Divider  */}
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point auto pin description :
            </span>
            <span className={classes.subAttrValue}>{""}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point has custom pin description :
            </span>
            <span className={classes.subAttrValue}>{"TRUE"}</span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point custom pin description :
            </span>
            <span className={classes.subAttrValue}>{""}</span>
          </p>

          <br />
          {/* Divider */}
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>
              PIN-POINT DIAGNOSIS INFORMATION :
            </span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point Associated Diagnosis :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point Associated Diagnosis customized :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point Associated Diagnosis Extensions :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point Associated Diagnosis category :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point Associated Diagnosis category :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point Associated Diagnosis extensions are customized :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <br />
          {/* Divider */}

          <p className={classes.attrLine}>
            <span className={classes.attrHead}>AUTORELATION :</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point shares same anatomic name as another Pin-point :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              HMAPS for Pin-Sharing same name :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              EGP ID is same for Pins sharing same name :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point sharing same anatomic name are on same HMAP :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point sharing same anatomic name are over EGP :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>EGP width :</span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>EGP Height :</span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              PinX of other same Pin Name :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              PinY of other same Pin Name :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              PinID of other same Pin Name :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point sharing same anatomic-name are over EGP-T :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              X-Difference of this Pin-point compared to other same name
              pin-point :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              X-Sign of this Pin-point relative to same name Pin-point :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Y-Difference of this Pin-point compared to other same name
              pin-point :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Y-Sign of this Pin-point relative to same name Pin-point :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <br />
          {/* Divider */}
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>
              PIN-POINT PARENT LIST INFORMATION :
            </span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point parent list is grouped :
            </span>
            <span className={classes.subAttrValue}>FALSE</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point parent groups has photos :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point parent groups has photos have tag :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point parent groups has photo tags :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Count of Pin-point parent group photos :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point parent groups has attachments :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point parent groups has attachments have tag :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Pin-point parent groups has attachments tags :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.subAttrHead}>
              Count of Pin-point parent group attachments :
            </span>
            <span className={classes.subAttrValue}></span>
          </p>

          {/* Divider */}
          <p className={classes.attrSectionTitle}>
            User Name Builder Preference:
          </p>
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>Auto Enhance Modifiers :</span>
            <span className={classes.attrValue}>{"TRUE"}</span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.attrHead}>
              Pin-point map has heirarchy level under list :
            </span>
            <span className={classes.attrValue}>
              {hierarchy.map(({ names }) => {
                return <NameRenderer names={names} sns={sns} noEdit />;
              })}
            </span>
          </p>

          <p className={classes.attrLine}>
            <span className={classes.attrHead}>
              Selected heirarchy level to display under Pin-point :
            </span>
            <span className={classes.attrValue}>
              {SNS_RENDERER.anatomic_site.renderer(
                { anatomicData },
                names,
                null,
                {},
                {}
              )}
            </span>
          </p>
          <p className={classes.attrLine}>
            <span className={classes.attrHead}>
              Laterity Position in Name Builder :
            </span>
            <span className={classes.attrValue}>{"Beginning"}</span>
          </p>
        </div>
        {anatomicData[egz.amid] && (
          <div>
            <p className={classes.attrSectionTitle}>
              Pin-Point Anatomic Site Data:
            </p>
            <p className={classes.enhancedName}>
              <NameRenderer names={names} sns={sns} noEdit breakWord />
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>AnatomyMapper ID : </span>
              <span className={classes.attrValue}>
                <a
                  href={`https://anatomymapper.com/Terms#${egz.amid}`}
                  target="_blank"
                  style={{ color: "inherit" }}
                  rel="noreferrer"
                >
                  {egz.amid}
                </a>
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>
                AnatomyMapper Laterality :{" "}
              </span>
              <span className={classes.attrValue}>
                {names.laterality[0] || "NA"}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>
                Closest{" "}
                <a
                  href={`https://anatomymapper.com/Terms/Delphi`}
                  target="_blank"
                  style={{ color: "inherit" }}
                  rel="noreferrer"
                >
                  Delphi
                </a>{" "}
                Term :
              </span>
              <span className={classes.attrValue}>
                {anatomicData[egz.amid].closest_delphi_term}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>ICD11 :</span>
              <span className={classes.attrValue}>
                <a
                  href={`https://icd.who.int/browse11/l-m/en#/http%3a%2f%2fid.who.int%2ficd%2fentity%2f${
                    anatomicData[egz.amid].foundation_id
                  }`}
                  target="_blank"
                  style={{ color: "inherit" }}
                  rel="noreferrer"
                >
                  {anatomicData[egz.amid].icd_code}
                </a>
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Foundation ID :</span>
              <span className={classes.attrValue}>
                <a
                  href={`https://icd.who.int/browse11/l-m/en#/http%3a%2f%2fid.who.int%2ficd%2fentity%2f${
                    anatomicData[egz.amid].foundation_id
                  }`}
                  target="_blank"
                  style={{ color: "inherit" }}
                  rel="noreferrer"
                >
                  {anatomicData[egz.amid].foundation_id}
                </a>
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Closest SNOMED CT Term :</span>
              <span className={classes.attrValue}>
                {anatomicData[egz.amid].snomed_term_closest_match}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Closest SCTID :</span>
              <span className={classes.attrValue}>
                <a
                  href={`https://browser.ihtsdotools.org/?perspective=full&conceptId1=${
                    anatomicData[egz.amid].sctid
                  }`}
                  target="_blank"
                  style={{ color: "inherit" }}
                  rel="noreferrer"
                >
                  {anatomicData[egz.amid].sctid}
                </a>
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>
                Other SNOMED CT Term Matches :
              </span>
              <span className={classes.attrValue}>
                {anatomicData[egz.amid].other_snomed_terms}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Other SCTIDs :</span>
              <span className={classes.attrValue}>
                {anatomicData[egz.amid].scitds}
              </span>
            </p>
            {egz.side !== "R" && (
              <p className={classes.attrLine}>
                <span className={classes.attrHead}>
                  Left
                  <a
                    href={`https://anatomymapper.com/maps/NYU`}
                    target="_blank"
                    style={{ color: "inherit" }}
                    rel="noreferrer"
                  >
                    NYU
                  </a>{" "}
                  Best Match :
                </span>
                <span className={classes.attrValue}>
                  <a
                    href={`https://anatomymapper.com/Terms/NYU#${
                      anatomicData[egz.amid].left_nyu_best_match
                    }`}
                    target={"_blank"}
                    style={{ color: "inherit" }}
                    rel="noreferrer"
                  >
                    {anatomicData[egz.amid].left_nyu_best_match}
                  </a>
                </span>
              </p>
            )}
            {egz.side !== "R" && (
              <p className={classes.attrLine}>
                <span className={classes.attrHead}>
                  Left
                  <a
                    href={`https://anatomymapper.com/maps/NYU`}
                    target="_blank"
                    style={{ color: "inherit" }}
                    rel="noreferrer"
                  >
                    NYU
                  </a>{" "}
                  Overlapping Matches :
                </span>
                <span className={classes.attrValue}>
                  <a
                    href={`https://anatomymapper.com/Terms/NYU#${
                      anatomicData[egz.amid].left_nyu_overlapping_matches
                    }`}
                    target="_blank"
                    style={{ color: "inherit" }}
                    rel="noreferrer"
                  >
                    {anatomicData[egz.amid].left_nyu_overlapping_matches}
                  </a>
                </span>
              </p>
            )}
            {egz.side !== "L" && (
              <p className={classes.attrLine}>
                <span className={classes.attrHead}>
                  Right
                  <a
                    href={`https://anatomymapper.com/maps/NYU`}
                    target="_blank"
                    style={{ color: "inherit" }}
                    rel="noreferrer"
                  >
                    NYU
                  </a>{" "}
                  Best Match :
                </span>
                <span className={classes.attrValue}>
                  <a
                    href={`https://anatomymapper.com/Terms/NYU#${
                      anatomicData[egz.amid].right_nyu_best_match
                    }`}
                    target="_blank"
                    style={{ color: "inherit" }}
                    rel="noreferrer"
                  >
                    {anatomicData[egz.amid].right_nyu_best_match}
                  </a>
                </span>
              </p>
            )}
            {egz.side !== "L" && (
              <p className={classes.attrLine}>
                <span className={classes.attrHead}>
                  Right
                  <a
                    href={`https://anatomymapper.com/maps/NYU`}
                    target="_blank"
                    style={{ color: "inherit" }}
                    rel="noreferrer"
                  >
                    NYU
                  </a>{" "}
                  Overlapping Matches :
                </span>
                <span className={classes.attrValue}>
                  <a
                    href={`https://anatomymapper.com/maps/Terms/NYU#${
                      anatomicData[egz.amid].right_nyu_overlapping_matches
                    }`}
                    target="_blank"
                    style={{ color: "inherit" }}
                    rel="noreferrer"
                  >
                    {anatomicData[egz.amid].right_nyu_overlapping_matches}
                  </a>
                </span>
              </p>
            )}
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Hierarchy Level :</span>
              <span className={classes.attrValue}>{egz.level}</span>
            </p>

            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Prefix : </span>
              <span className={classes.attrValue}>
                {names.prefix.length
                  ? names.prefix
                      .map((p, i) =>
                        SNS_RENDERER.prefix.renderer(
                          { lateralityData },
                          names,
                          i,
                          {},
                          {}
                        )
                      )
                      .join(",")
                  : ""}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Suffix : </span>
              <span className={classes.attrValue}>
                {names.suffix.length
                  ? names.suffix
                      .map((p, i) =>
                        SNS_RENDERER.suffix.renderer(
                          { lateralityData },
                          names,
                          i,
                          {},

                          {}
                        )
                      )
                      .join(",")
                  : ""}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>EGZ : </span>
              <span className={classes.attrValue}>
                {egz.egzt > 0 ? "TRUE" : "FALSE"}
              </span>
            </p>
            {egz.egz.egzt > 0 && (
              <div>
                <p className={classes.attrLine}>
                  <span className={classes.attrHead}>EGZT : </span>
                  <span className={classes.attrValue}>{egz.egz.egzt}</span>
                  <span className={classes.attrHead}>EGZX : </span>
                  <span className={classes.attrValue}>{egz.egz.egzx}</span>
                  <span className={classes.attrHead}>EGZY : </span>
                  <span className={classes.attrValue}>{egz.egz.egzy}</span>
                </p>

                <p className={classes.attrLine}>
                  <span className={classes.attrHead}>Deviation X :</span>
                  <span className={classes.attrValue}>
                    {Math.round(egz.deviation.dev_x) + "%"}
                  </span>
                  <span className={classes.attrHead}>Deviation Y :</span>
                  <span className={classes.attrValue}>
                    {Math.round(egz.deviation.dev_y) + "%"}
                  </span>
                </p>

                <p className={classes.attrLine}>
                  <span className={classes.attrHead}>Enhance Mod X :</span>
                  <span className={classes.attrValue}>
                    {egz.deviation.enhanceModX}
                  </span>
                  <span className={classes.attrHead}>Enhance Mod Y :</span>
                  <span className={classes.attrValue}>
                    {egz.deviation.enhanceModY}
                  </span>
                </p>
              </div>
            )}
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>
                Diagram ID, Hierarchial Map ID :
              </span>
              <span className={classes.attrValue}>
                {layerInfo.D_ID}, {layerInfo.HMAP_ID}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>
                Group IDs, Hierarchial Group IDs :
              </span>
              <span className={classes.attrValue}>
                {layerInfo.G_IDs.join(", ")}, {layerInfo.HG_IDs.join(", ")}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>IDs from Map :</span>
              <span className={classes.attrValue}>
                {layerInfo.PATH_IDS.join(", ")}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Diagram Area :</span>
              <span className={classes.attrValue}>
                {surfaceArea?.parentArea?.toFixed(2)}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Path Area :</span>
              <span className={classes.attrValue}>
                {surfaceArea?.childArea?.toFixed(2)}
              </span>
            </p>
            <p className={classes.attrLine}>
              <span className={classes.attrHead}>Percentage Coverage :</span>
              <span className={classes.attrValue}>
                {surfaceArea?.percentCoverage?.toFixed(2)} %
              </span>
            </p>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MetadataAccordian;
