import {
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ExpandMore } from "@material-ui/icons"
import React, { useContext } from "react"
import { useSelector } from "react-redux"
import { TranslationContext } from "../../contexts/translation"

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
        fontWeight: "bold",
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
}))
const GreyAccordion = ({ itemId }) => {
    const classes = useStyles()

    const { names, egz } = useSelector(
        (state) => state.listStore.itemsMap[itemId]
    )
    //const sns = useSNS(itemId)

    const { uiData, anatomicData, lateralityData } =
        useContext(TranslationContext)

    const laterality = names.laterality[0]

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
                    <p className={classes.attrSectionTitle}>
                        English Site Additional MetaData:
                    </p>

                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>
                            AnatomyMapper ID :{" "}
                        </span>
                        <span className={classes.attrValue}>
                            <a
                                href={`https://anatomymapper.com/Terms#${egz.amid}`}
                                target="_blank"
                                style={{ color: "inherit" }}
                                rel='noreferrer'
                            >
                                {egz.amid}
                            </a>
                        </span>
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>
                            AnatomyMapper Laterality :{" "}
                        </span>
                        {laterality && (
                            <span className={classes.attrValue}>
                                {lateralityData[laterality]?.laterality_id}{" "}
                                {lateralityData[laterality]?.emoji_code}
                            </span>
                        )}
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>
                            English Synonyms :{" "}
                        </span>
                        <span className={classes.attrValue}>
                            {anatomicData[egz.amid]?.synonym}
                        </span>
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>
                            Closest{" "}
                            <a
                                href={`https://anatomymapper.com/Terms/Delphi`}
                                target="_blank"
                                style={{ color: "inherit" }}
                                rel='noreferrer'
                            >
                                Delphi
                            </a>{" "}
                            Term :
                        </span>
                        <span className={classes.attrValue}>
                            {anatomicData[egz.amid]?.closest_delphi_term}
                        </span>
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>ICD11 :</span>
                        <span className={classes.attrValue}>
                            <a
                                href={`https://icd.who.int/browse11/l-m/en#/http%3a%2f%2fid.who.int%2ficd%2fentity%2f${
                                    anatomicData[egz.amid]?.foundation_id
                                }`}
                                target="_blank"
                                style={{ color: "inherit" }}
                                rel='noreferrer'
                            >
                                {anatomicData[egz.amid]?.icd_code}
                            </a>
                        </span>
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>
                            Foundation ID :
                        </span>
                        <span className={classes.attrValue}>
                            <a
                                href={`https://icd.who.int/browse11/l-m/en#/http%3a%2f%2fid.who.int%2ficd%2fentity%2f${
                                    anatomicData[egz.amid]?.foundation_id
                                }`}
                                target="_blank"
                                style={{ color: "inherit" }}
                                rel='noreferrer'
                            >
                                {anatomicData[egz.amid]?.foundation_id}
                            </a>
                        </span>
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>
                            Closest SNOMED CT Term :
                        </span>
                        <span className={classes.attrValue}>
                            {anatomicData[egz.amid]?.snomed_term_closest_match}
                        </span>
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>
                            Closest SCTID :
                        </span>
                        <span className={classes.attrValue}>
                            <a
                                href={`https://browser.ihtsdotools.org/?perspective=full&conceptId1=${
                                    anatomicData[egz.amid]?.sctid
                                }`}
                                target="_blank"
                                style={{ color: "inherit" }}
                                rel='noreferrer'
                            >
                                {anatomicData[egz.amid]?.sctid}
                            </a>
                        </span>
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>
                            Other SNOMED CT Term Matches :
                        </span>
                        <span className={classes.attrValue}>
                            {anatomicData[egz.amid]?.other_snomed_terms}
                        </span>
                    </p>
                    <p className={classes.attrLine}>
                        <span className={classes.attrHead}>Other SCTIDs :</span>
                        <span className={classes.attrValue}>
                            {anatomicData[egz.amid]?.scitds}
                        </span>
                    </p>
                    {laterality &&
                        lateralityData[laterality].laterality_id !== "R" &&
                        anatomicData[egz.amid]?.left_nyu_best_match?.length >
                            0 && (
                            <p className={classes.attrLine}>
                                <span className={classes.attrHead}>
                                    Left
                                    <a
                                        href={`https://anatomymapper.com/NYU`}
                                        target="_blank"
                                        style={{ color: "inherit" }}
                                        rel='noreferrer'
                                    >
                                        NYU
                                    </a>{" "}
                                    Best Match :
                                </span>
                                <span className={classes.attrValue}>
                                    <a
                                        href={`https://anatomymapper.com/Terms/NYU#${
                                            anatomicData[egz.amid]
                                                ?.left_nyu_best_match
                                        }`}
                                        target="_blank"
                                        style={{ color: "inherit" }}
                                        rel='noreferrer'
                                    >
                                        {
                                            anatomicData[egz.amid]
                                                ?.left_nyu_best_match
                                        }
                                    </a>
                                </span>
                            </p>
                        )}
                    {lateralityData[laterality] &&
                        lateralityData[laterality].laterality_id !== "R" &&
                        anatomicData[egz.amid]?.left_nyu_overlapping_matches
                            ?.length > 0 && (
                            <p className={classes.attrLine}>
                                <span className={classes.attrHead}>
                                    Left
                                    <a
                                        href={`https://anatomymapper.com/NYU`}
                                        target="_blank"
                                        style={{ color: "inherit" }}
                                        rel='noreferrer'
                                    >
                                        NYU
                                    </a>{" "}
                                    Overlapping Matches :
                                </span>
                                <span className={classes.attrValue}>
                                    <a
                                        href={`https://anatomymapper.com/Terms/NYU#${
                                            anatomicData[egz.amid]
                                                ?.left_nyu_overlapping_matches
                                        }`}
                                        target="_blank"
                                        style={{ color: "inherit" }}
                                        rel='noreferrer'
                                    >
                                        {
                                            anatomicData[egz.amid]
                                                ?.left_nyu_overlapping_matches
                                        }
                                    </a>
                                </span>
                            </p>
                        )}
                    {lateralityData[laterality] &&
                        lateralityData[laterality].laterality_id !== "L" &&
                        anatomicData[egz.amid]?.right_nyu_best_match?.length >
                            0 && (
                            <p className={classes.attrLine}>
                                <span className={classes.attrHead}>
                                    Right
                                    <a
                                        href={`https://anatomymapper.com/NYU`}
                                        target="_blank"
                                        style={{ color: "inherit" }}
                                        rel='noreferrer'
                                    >
                                        NYU
                                    </a>{" "}
                                    Best Match :
                                </span>
                                <span className={classes.attrValue}>
                                    <a
                                        href={`https://anatomymapper.com/Terms/NYU#${
                                            anatomicData[egz.amid]
                                                ?.right_nyu_best_match
                                        }`}
                                        target="_blank"
                                        style={{ color: "inherit" }}
                                        rel='noreferrer'
                                    >
                                        {
                                            anatomicData[egz.amid]
                                                ?.right_nyu_best_match
                                        }
                                    </a>
                                </span>
                            </p>
                        )}
                    {lateralityData[laterality] &&
                        lateralityData[laterality].laterality_id !== "L" &&
                        anatomicData[egz.amid]?.right_nyu_overlapping_matches
                            .length > 0 && (
                            <p className={classes.attrLine}>
                                <span className={classes.attrHead}>
                                    Right
                                    <a
                                        href={`https://anatomymapper.com/NYU`}
                                        target="_blank"
                                        style={{ color: "inherit" }}
                                        rel='noreferrer'
                                    >
                                        NYU
                                    </a>{" "}
                                    Overlapping Matches :
                                </span>
                                <span className={classes.attrValue}>
                                    <a
                                        href={`https://anatomymapper.com/Terms/NYU#${
                                            anatomicData[egz.amid]
                                                ?.right_nyu_overlapping_matches
                                        }`}
                                        target="_blank"
                                        style={{ color: "inherit" }}
                                        rel='noreferrer'
                                    >
                                        {
                                            anatomicData[egz.amid]
                                                ?.right_nyu_overlapping_matches
                                        }
                                    </a>
                                </span>
                            </p>
                        )}
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default GreyAccordion
