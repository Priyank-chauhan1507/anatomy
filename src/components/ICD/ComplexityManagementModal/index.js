import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import CustomizedDialogs from "../../Dialog/Dialog";
// import DescriptiveBox from "../../NameBuilder/DescriptiveBox";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import HelpIcon from "@material-ui/icons/Help";
import LinkIcon from "@material-ui/icons/Link";
import WarningIcon from "@material-ui/icons/Warning";
import { useDiagnosis } from "../../../hooks/useDiagnosis";
import useTranslations from "../../../hooks/useTranslations";
import { NameAndPinRendererWithHierarchy } from "../../ListItemComponents/NameAndPinRendererWithHierarchy";

function ComplexityManagementModal({
  open,
  onClose,
  sI,
  eC,
  pM,
  onChange,
  itemId,
  icd,
}) {
  const { diagnosisComplexity } = useTranslations();
  const { data, isLoaded } = useDiagnosis(icd);

  return (
    <CustomizedDialogs
      open={open}
      onClose={onClose}
      title={"Evaluation and Management - Complexity"}
      body={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {itemId && <NameAndPinRendererWithHierarchy itemId={itemId} />}

            <Typography variant="h6" className={"diag--heading"}>
              {isLoaded ? data.diagnosis : "Loading..."}
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {diagnosisComplexity.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <input
                          type="radio"
                          name="thisRadio"
                          onChange={() => onChange(row.description, "eC")}
                          checked={eC === row.description}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {row.description}
                      </TableCell>
                      <TableCell align="right">
                        <span>
                          <Tooltip title={row.description_help}>
                            <HelpIcon style={{ cursor: "pointer" }} />
                          </Tooltip>
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span>
                          <Tooltip title={row.derm_examples}>
                            <ChromeReaderModeIcon
                              style={{ cursor: "pointer" }}
                            />
                          </Tooltip>
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span>
                          <Tooltip title={row.derm_help_link}>
                            <a
                              href={"https://www." + row.derm_help_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <LinkIcon
                                style={{ cursor: "pointer", color: "black" }}
                              />
                            </a>
                          </Tooltip>
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span>
                          <Tooltip title={row.disclaimer}>
                            <WarningIcon style={{ cursor: "pointer" }} />
                          </Tooltip>
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" mt={2}>
              <input type="checkbox" />
              <TextField
                fullWidth
                label={"Separate and Identifiable Documentation"}
                value={sI}
                onChange={(e) => {
                  onChange(e.target.value, "sI");
                }}
                style={{ marginLeft: "5px" }}
                variant={"outlined"}
              />
            </Box>
            <Box display="flex" mt={2}>
              <input type="checkbox" />
              <TextField
                fullWidth
                label={"Presciption Medication Managemet"}
                value={pM}
                onChange={(e) => {
                  onChange(e.target.value, "pM");
                }}
                style={{ marginLeft: "5px" }}
                variant={"outlined"}
              />
            </Box>
          </Grid>
        </Grid>
      }
    />
  );
}

export default ComplexityManagementModal;
