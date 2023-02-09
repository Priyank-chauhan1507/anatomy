import {
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Help, Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ICD_SEARCH_ENDPOINT } from "../../../assets/data-files/constants";
import useFetchWithDebounce from "../../../hooks/useFetchWithDebounce";
import CustomizedDialogs from "../../Dialog/Dialog";
// import DescriptiveBox from "../../NameBuilder/DescriptiveBox";
import useTranslations from "../../../hooks/useTranslations";
import { NameAndPinRendererWithHierarchy } from "../../ListItemComponents/NameAndPinRendererWithHierarchy";
import { PinDescriptionRenderer } from "../../ListsRenderer/ItemTemplates";
import PatientInfo from "../../PatientInfo/PatientInfo";
import { SVGRegionRendererWithPoint } from "../../SVGRegionRenderer";
import ICDDiagnosisTile from "./ICDDiagnosisTile";
import { DiagnosisRenderer } from "../../ListItemComponents/ItemDiagnosis";

export default function ICD11SearchModal({
  initialSearchTerm,
  open,
  icdCode,
  onClose,
  itemId,
  onSelect,
}) {
  const layerInfo = useSelector(
    (state) => state.listStore.itemsMap[itemId].layerInfo
  );
  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);
  const [code, setCode] = useState("");
  const { diagnosisLanguage } = useTranslations();
  const [foundationId, setFoundationId] = useState("");
  const { isLoading, apiData } = useFetchWithDebounce(
    ICD_SEARCH_ENDPOINT +
      "?searchTerm=" +
      encodeURI(searchTerm) +
      "&lang=" +
      diagnosisLanguage,
    1000
  );
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const addRecentDiagnosis = (item) => {
    let recent = localStorage.getItem("recentDiagnosisSearch");

    if (!recent || recent === "null") {
      recent = [];
      recent.push(item.theCode);
    } else {
      recent = JSON.parse(recent);
      if (recent.indexOf(item.theCode) === -1) {
        if (recent.length === 10) {
          recent.splice(0, 1);
        }
        recent.push(item.theCode);
      }
    }
    localStorage.setItem("recentDiagnosisSearch", JSON.stringify(recent));
  };

  const handleRowClick = async (index, item) => {
    onClose();
    onSelect(item);
    addRecentDiagnosis(item);
    // if (!isAssociated) {
    //   let newDiagnois = {
    //     ...diagnosisData.primary.diagnosis,
    //     // code: item.theCode.split(".")[0],
    //     code: item.theCode,
    //     text: item.title,
    //     description: item.description,
    //   };
    //   handleDiagnosisDataChange("primary", {
    //     ...diagnosisData.primary,
    //     diagnosis: newDiagnois,
    //     exts: [],
    //   });
    //   onClose();
    // } else {
    //   // let tempAddl = [...diagnosisData.addl];
    //   // let newDiagnois = {
    //   //   ...diagnosisData.addl[associatedIndex].diagnosis,
    //   //   // code: item.theCode.split(".")[0],
    //   //   code: item.theCode,
    //   //   text: item.title,
    //   //   description: item.description,
    //   // };
    //   // tempAddl[associatedIndex].diagnosis = newDiagnois;
    //   // tempAddl[associatedIndex].exts = [];
    //   // handleDiagnosisDataChange(
    //   //   "addl",
    //   //   tempAddl,
    //   //   associatedIndex,
    //   //   newDiagnois.code
    //   // );

    //   let test = [...diagnoses];
    //   let testNewDiagnois = {
    //     ...test[associatedIndex].diagnosis,
    //     // code: item.theCode.split(".")[0],
    //     code: item.theCode,
    //     text: item.title,
    //     description: item.description,
    //   };
    //   test[associatedIndex].diagnosis = testNewDiagnois;
    //   test[associatedIndex].exts = [];

    //   handleDiagnosesDataChange(associatedIndex, test[associatedIndex]);
    //   onClose();
    // }
  };
  const { uiData } = useTranslations();
  return (
    <CustomizedDialogs
      open={open}
      onClose={onClose}
      title={uiData?.label_SearchForICD11?.tr_text}
      body={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PatientInfo color={"#000"} />
            {itemId && <NameAndPinRendererWithHierarchy itemId={itemId} />}
            {itemId && (
              <SVGRegionRendererWithPoint
                gID={layerInfo.D_ID}
                itemId={itemId}
              />
            )}
            {itemId && <PinDescriptionRenderer itemId={itemId} />}
            <Grid container>
              <Grid item xs={7}>
                <p
                  style={{
                    display: "flex",
                    height: "100%",
                    paddingLeft: "8px",
                  }}>
                  {uiData?.label_CurrentDiagnosisToReplace?.tr_text}
                </p>
              </Grid>
              <Grid item xs={4}>
                <DiagnosisRenderer
                  icd={icdCode}
                  toggle={true}
                  isPrimary={true}
                />
              </Grid>
            </Grid>
            <div style={{ marginBottom: "20px" }}></div>
            <Typography variant='h6' className={"diag--heading"}>
              {uiData?.label_ICD11Search?.tr_text}
            </Typography>

            <Grid container className='diag--searchBox'>
              <Grid item xs={8} style={{ paddingRight: 56 }}>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 10,
                  }}>
                  {uiData?.label_DiagnosisAbbreviation?.tr_text}{" "}
                  <span>
                    <Tooltip title={""}>
                      <Help />
                    </Tooltip>
                  </span>
                </p>
                <Autocomplete
                  value={searchTerm}
                  onInputChange={(e, newVal) => {
                    setSearchTerm(newVal);
                  }}
                  options={
                    apiData
                      ? apiData.data.words.map(
                          ({ dontChangeResult, label }) => {
                            return !dontChangeResult
                              ? searchTerm + " " + label
                              : label;
                          }
                        )
                      : []
                  }
                  fullWidth
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position='start'>
                              {!isLoading ? (
                                <IconButton>
                                  <Search />
                                </IconButton>
                              ) : (
                                <CircularProgress
                                  style={{ width: 30, height: 30 }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    {uiData?.label_Code_FoundationID?.tr_text}{" "}
                    <span>
                      <Tooltip
                        title={uiData?.label_Code_FoundationID_help?.tr_text}>
                        <Help />
                      </Tooltip>
                    </span>
                  </p>
                </Grid>
                <TextField
                  label={uiData?.label_Code?.tr_text}
                  size={"small"}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
                <TextField
                  label={uiData?.label_FoundationID?.tr_text}
                  size={"small"}
                  value={foundationId}
                  onChange={(e) => {
                    setFoundationId(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container className={"diag--search__table"}>
              <Grid item xs={12}>
                <Typography
                  variant={"body1"}
                  style={{ textAlign: "center", fontWeight: "bold" }}>
                  {uiData?.label_SearchResults?.tr_text}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={8} className={"diag__border-box"}>
                        <Typography
                          variant='body1'
                          align='center'
                          className={"diag__border-box"}>
                          ICD 11 {uiData?.label_DiagnosisAbbreviation?.tr_text}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} className={"diag__border-box"}>
                        <Typography
                          variant='body1'
                          align='center'
                          className={"diag__border-box"}>
                          ICD 11 {uiData?.label_Code?.tr_text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    {apiData && apiData.data.destinationEntities.length > 0 ? (
                      apiData.data.destinationEntities.map((item, index) => {
                        return (
                          <ICDDiagnosisTile
                            key={item.theCode}
                            isLoading={isLoading}
                            icdCode={item.theCode}
                            title={item.title}
                            onClick={() => handleRowClick(index, item)}
                          />
                        );
                      })
                    ) : (
                      <Grid container className={"diag__border-box"}>
                        <Grid item xs={12}>
                          <Typography variant='body1' align='center'>
                            {uiData?.label_NoResults?.tr_text}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    />
  );
}
