import {
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDiagnosis } from "../../../hooks/useDiagnosis";
import useTranslations from "../../../hooks/useTranslations";
import CustomizedDialogs from "../../Dialog/Dialog";
import { NameAndPinRendererWithHierarchy } from "../../ListItemComponents/NameAndPinRendererWithHierarchy";
import PatientInfo from "../../PatientInfo/PatientInfo";
// import DescriptiveBox from "../../NameBuilder/DescriptiveBox";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function DiagnosisExtensionModal({
  open,
  onClose,
  itemId,
  icd,
  exts,
  onChangeExtensions,

  //   diagnosisCode,
}) {
  const classes = useStyles();
  const thisRef = useRef();
  const tableRef = useRef();
  // const [currentSelectedExtensions, setCurrentSelectedExtensions] = useState(
  //   []
  // );
  const { data, isLoaded } = useDiagnosis(icd);

  const [allPostCoordination, setAllPostCoordination] = useState([]);
  const postCoordinationObj = isEmpty(data.postCoordination)
    ? {}
    : data.postCoordination;

  useEffect(() => {
    if (!isEmpty(data.postCoordination)) {
      const { postCoordination: newPostCordinationObj } = data;
      const postCoordinationEntries = Object.entries(newPostCordinationObj);
      const newPostCoordination = postCoordinationEntries.map(
        ([key, value]) => {
          return {
            id: key,
            options: Object.keys(value),
          };
        }
      );
      setAllPostCoordination(newPostCoordination);
    }
    // setAllPostCoordination(postCoordination);
  }, [data]);

  const handleDeleteExtension = (index) => {
    const newExts = [...exts];
    newExts.splice(index, 1);
    onChangeExtensions(newExts);
    // onChangeExtensions(currentSelectedExtensions);
    // onClose();
  };
  const handleSelectionChange = (tId, tOpt) => {
    const newExts = [...exts];
    const extFoundIndex = newExts.findIndex(
      ({ id, opt }) => tId === id && tOpt === opt
    );
    if (extFoundIndex === -1) {
      newExts.push({ id: tId, opt: tOpt });
    } else {
      newExts.splice(extFoundIndex, 1);
    }
    // newExts[index].selected = selection;
    onChangeExtensions(newExts);
      };
      const {uiData}= useTranslations();
  return (
    <CustomizedDialogs
      open={open}
      onClose={onClose}
      title={ uiData?.transtext_DxExtensions?.tr_text}
      body={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container xs={12} className="diag--searchBox">
              <Box
                item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // position: "relative",
                  // height: "100vh",
                }}
                ref={thisRef}
              >
                <Box
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 2px 2px rgba(0,0,0,.2)",
                  }}
                  id="top"
                >
                  <Typography variant="h6" className={"diag--heading"}>
                    {isLoaded ? data.diagnosis : "Loading..."}
                  </Typography>
                  <PatientInfo color={"#000"} />
                 {itemId && <NameAndPinRendererWithHierarchy itemId={itemId} />}

                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 10,
                    }}
                  >
                    {/* TODO:Add code string here */}
                    {uiData?.drawingTools_Select?.tr_text}  { uiData?.transtext_DxExtensions?.tr_text}:{" "}
                  </p>
                  <Box>
                    {isLoaded &&
                      exts.map(({ id, opt }, index) => {
                        return (
                          <Chip
                            key={index}
                            onDelete={() => handleDeleteExtension(index)}
                            label={postCoordinationObj[id][opt]}
                            style={{ margin: "5px" }}
                          />
                        );
                      })}
                  </Box>
                </Box>
                {/* </Grid> */}
                <Box ref={tableRef} id="table">
                  {allPostCoordination.map(({ id, options }, index) => {
                    return (
                      <Box key={index}>
                        {/* <Typography>{postCoordination[0]}</Typography> */}
                        <Divider />
                        <TableContainer component={Paper}>
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  {id}
                                </TableCell>
                                <TableCell align="center">ICD11{uiData.label_Code.tr_text}</TableCell>
                                {/* <TableCell align="center">
                                { uiData?.label_FoundationID?.tr_text}
                                </TableCell> */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {options.map((opt, thisIndex) => (
                                <TableRow key={opt + id}>
                                  <TableCell component="th" scope="row">
                                    <input
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleSelectionChange(id, opt)
                                      }
                                      checked={exts.some(
                                        (item) =>
                                          item.opt === opt && item.id === id
                                      )}
                                    />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    align="left"
                                  >
                                    {postCoordinationObj[id][opt]}
                                  </TableCell>
                                  <TableCell align="center">{opt}</TableCell>
                                  {/* <TableCell align="center">{"-"}</TableCell> */}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      }
    />
  );
}

export default DiagnosisExtensionModal;
