import {
  Box,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  makeStyles,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  AddCircleOutlineOutlined,
  Help,
  Reorder,
  Search,
} from "@material-ui/icons";
import IndeterminateCheckBoxRounded from "@material-ui/icons/IndeterminateCheckBoxRounded";
import { isEmpty } from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import {
  default_diagnosis,
  LIST_TYPES,
} from "../../../constants/listsConstants";
import { TranslationContext } from "../../../contexts/translation";
import { useDiagnosis, useListOfDiagnosis } from "../../../hooks/useDiagnosis";
import useTranslations from "../../../hooks/useTranslations";
import { updateDiagnoses } from "../../../store/slices/lists";
import { closeICDModal } from "../../../store/slices/modals";
import { changeDiagnosisLanguageSetting } from "../../../store/slices/userSettings";
import { chooseList } from "../../../utils/helpers";
import Dialog from "../../Dialog/Dialog";
import { DiagnosisRenderer } from "../../ListItemComponents/ItemDiagnosis";
import { NameAndPinRendererWithHierarchy } from "../../ListItemComponents/NameAndPinRendererWithHierarchy";
import { PinDescriptionRenderer } from "../../ListsRenderer/ItemTemplates";
import PatientInfo from "../../PatientInfo/PatientInfo";
import {
  SVGRegionRenderer,
  SVGRegionRendererWithPoint,
} from "../../SVGRegionRenderer";
import ComplexityManagementModal from "../ComplexityManagementModal";
import DiagnosisExtensionModal from "../DiagnosisExtensionModal";
import "../index.css";
import ICD11SearchModal from "../SearchModal/ICDSearchModal";

const useDiagnosisBoxStyles = makeStyles({
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  codeBox: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 5,
    flexWrap: "nowrap",
    alignItems: "center",
  },
  code: {
    display: "flex",
    paddingLeft: "32px",
    flexWrap: "wrap",
    marginTop: "10px",
    alignItems: "center",
    "&  .code": {
      textAlign: "center",
      fontSize: 14,
    },
    "& .subcode": {
      opacity: ".7",
      textAlign: "center",
      fontSize: 12,
    },
  },
  textBox: {
    marginLeft: 24,
    "& > p": {
      fontWeight: "600",
    },
  },
});
function DiagnosisBox({
  code,
  subcode,
  searchText,
  searchHelp,
  codeText,
  codeHelp,
  onSearchClick,
  onCodeClick,
}) {
  const classes = useDiagnosisBoxStyles();

  return (
    <Grid container style={{ padding: 8 }} xs={12}>
      <Grid item xs={9} style={{ marginTop: 10 }}>
        <Grid container className={classes.searchBox}>
          <IconButton
            onClick={() => {
              onSearchClick();
            }}
            size={"small"}>
            <Search />
          </IconButton>
          <span>{searchText}</span>
          <Tooltip title={searchHelp}>
            <Help />
          </Tooltip>
        </Grid>
        <Grid container className={classes.textBox}>
          {code && (
            <DiagnosisRenderer toggle={true} icd={code} isPrimary={true} />
          )}
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid container className={classes.codeBox}>
          {/* <IconButton onClick={onCodeClick} size={"small"}>
            <Search />
          </IconButton> */}
          <span>{codeText}</span>
          <Tooltip title={codeHelp}>
            <Help />
          </Tooltip>
        </Grid>
        <Grid container className={classes.code}>
          <Grid item xs={12}>
            <Typography className='code'>{code}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={"subcode"}>{subcode}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useExtensionBoxStyles = makeStyles({
  mainBox: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  extChips: {
    "&>div": {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-around",
      gap: 5,
      padding: "8px",
      flexDirection: "column",
      flex: 1,
    },
  },
  codeBox: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 5,
    flexWrap: "nowrap",
    alignItems: "center",
  },
  code: {
    display: "flex",
    paddingLeft: "32px",
    flexWrap: "wrap",
    marginTop: "10px",
    alignItems: "center",
    "&  .code": {
      textAlign: "center",
      fontSize: 14,
    },
    "& .subcode": {
      opacity: ".7",
      textAlign: "center",
      fontSize: 12,
    },
  },
  textBox: {
    marginLeft: 24,
    "& > p": {
      fontWeight: "600",
    },
  },
});

function ExtensionBox({
  mainText,
  codeText,
  mainHelp,
  codeHelp,
  onCodeAdd,
  list = [],
  icd = "",
  onChangeExtensions,
  onAddExtension,
}) {
  const classes = useExtensionBoxStyles();
  const { data, isLoaded } = useDiagnosis(icd);
  const [diagExtList, setDiagExtList] = useState(list);

  const postCoordinationObj = isEmpty(data.postCoordination)
    ? {}
    : data.postCoordination;
  const onDeleteExtension = (index) => {
    const newList = [...list];
    newList.splice(index, 1);

    onChangeExtensions(newList);
  };

  useEffect(() => {
    setDiagExtList(list);
  }, [list]);

  if (isEmpty(data.postCoordination)) return null;
  else
    return (
      <Grid container style={{ padding: 8 }}>
        <Grid item xs={9} style={{ marginTop: 16 }}>
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={12} className={classes.mainBox}>
              <IconButton
                color={"primary"}
                size={"small"}
                onClick={() => {
                  onAddExtension();
                }}>
                <AddCircleOutlineOutlined />
              </IconButton>
              <span>{mainText}</span>
              <Tooltip title={mainHelp}>
                <Help />
              </Tooltip>
            </Grid>
            <Grid item xs={12} className={classes.extChips}>
              <ReactSortable list={diagExtList} setList={setDiagExtList}>
                {isLoaded &&
                  diagExtList.map(({ id, opt }, index) => {
                    return (
                      <Chip
                        key={index}
                        className={"extension-chip"}
                        onDelete={() => {
                          onDeleteExtension(index);
                        }}
                        label={postCoordinationObj[id][opt]}
                      />
                    );
                  })}
              </ReactSortable>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container className={classes.codeBox}>
            {/* <IconButton onClick={onCodeAdd}>
              <Search />
            </IconButton> */}
            <span>{codeText}</span>
            <Tooltip title={codeHelp}>
              <Help />
            </Tooltip>
          </Grid>
          <Grid container className={classes.code}>
            {diagExtList.map(({ id, opt }, index) => {
              return (
                <Grid item xs={12} key={index}>
                  <Typography className={"code"}>{opt}</Typography>
                  <Typography className='subcode'>{"-"}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    );
}

const useDiagnosisModalStyles = makeStyles({
  additionalDiagnosis: {
    "& .title-box": {
      display: "flex",
      alignItems: "center",
    },
    "& .action-box": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
});

function QuickSelect({ diagnosisList, onChangeHandler, index }) {
  const { uiData } = useTranslations();
  const diagnosisArr = useListOfDiagnosis(diagnosisList);
  const [quickSelectVal, setQuickSelectVal] = useState("");

  return (
    <Grid container>
      <Grid item xs={4}>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            paddingLeft: "17px",
          }}>
          {uiData?.label_QuickSelect?.tr_text}:
        </p>
      </Grid>
      <Grid item xs={4}>
        <TextField
          select
          fullWidth
          label={uiData?.label_QuickSelect?.tr_text}
          value={quickSelectVal}
          onChange={(e) => {
            setQuickSelectVal(e.target.value);
            diagnosisArr.forEach(({ data }) => {
              if (data.code === e.target.value) {
                onChangeHandler(data);
              }
            });
            // setAssociatedIndex(index)
          }}
          variant={"outlined"}>
          {diagnosisArr && diagnosisArr.length > 0 ? (
            diagnosisArr.map(({ data }) => (
              <MenuItem key={`${index}_${data.code}`} value={data.code}>
                <div className='textwrap'>{data.diagnosis}</div>({data.code})
              </MenuItem>
            ))
          ) : (
            <MenuItem>No Quick Select Available</MenuItem>
          )}
        </TextField>
      </Grid>
    </Grid>
  );
}

const DiagnosisModalContainer = ({
  itemId,
  isGrouped,
  listSubtype,
  listType,
}) => {
  const classes = useDiagnosisModalStyles();
  const clinicCountry = useSelector(
    (state) => state.userSettings.userSettings.clinicCountry
  );

  // const { diagnosisLanguages, diagnosisLanguage } = useTranslations();

  const diagnoses = useSelector((state) =>
    isGrouped
      ? chooseList(state.listStore.lists, listType, listSubtype).attr
          .grouped_documentation.diagnoses
      : state.listStore.itemsMap[itemId].diagnoses
  );
  const layerInfo = useSelector(
    (state) => state.listStore.itemsMap[itemId].layerInfo
  );
  const { pathId } = useSelector((state) =>
    itemId ? state.listStore.itemsMap[itemId] : { pathId: "" }
  );

  const lstType = useSelector(
    (state) => state.listStore.itemsMap[itemId].listType
  );

  const [isICD10, setIsICD10] = useState(false);
  const dispatch = useDispatch();
  const setDiagnoses = useCallback(
    (newDiagnoses) => {
      dispatch(
        updateDiagnoses({
          data: { itemId, isGrouped, listSubtype, listType },
          newDiagnoses,
        })
      );
    },
    //eslint-disable-next-line
    [dispatch, itemId]
  );
  const [openICD11Modal, setOpenICD11Modal] = useState({
    open: false,
    code: null,
  });
  const { uiData } = useContext(TranslationContext);

  // const [associated, setAssociated] = useState(false);
  const [associatedIndex, setAssociatedIndex] = useState(-1);

  const [openDiagnosisExtensionModal, setOpenDiagnosisExtensionModal] =
    useState(false);
  const [openComplexityManagementModal, setOpenComplexityManagementModal] =
    useState(false);
  const [recentDiagnosisSearch, setRecentDiagnosisSearch] = useState([]);
  // const [data,isLoaded] = useDiagnosis(quickSelectVal)

  const handleComplexityManagementClick = (index) => {
    setAssociatedIndex(index);
    setOpenComplexityManagementModal(true);
  };

  const handleChangeExtensions = (newExts, index) => {
    let temp = [...diagnoses];
    temp[index] = {
      ...temp[index],
      exts: newExts,
    };
    setDiagnoses(temp);
  };

  const onDeleteDiagnoses = (index) => {
    const temp = [...diagnoses];
    if (index === 0) {
      temp[index] = default_diagnosis;
    } else {
      temp.splice(index, 1);
    }
    setDiagnoses(temp);
  };

  const onAddAdditionalDiagnosis = () => {
    const temp = [...diagnoses];
    temp.push(default_diagnosis);
    setDiagnoses(temp);
  };

  const handleOtherFieldChange = (key, value, index) => {
    let temp = [...diagnoses];
    temp[index] = {
      ...diagnoses[index],
      [key]: value,
    };
    setDiagnoses(temp);
  };

  const handleQuickSelect = (data, index) => {
    const oldSelectedDiagnosis = diagnoses[index];
    const selectedDiagnosis = {
      ...oldSelectedDiagnosis,
      icd: data.code,
      foundation: "",
      exts: [],
    };
    const newDiagnoses = [...diagnoses];
    newDiagnoses[index] = selectedDiagnosis;
    setDiagnoses(newDiagnoses);
  };

  useEffect(() => {
    const recent = localStorage.getItem("recentDiagnosisSearch");
    if (recent !== "null") {
      setRecentDiagnosisSearch(JSON.parse(recent));
    }
  }, []);

  const isClinicInUSA = clinicCountry.toLowerCase() === "us";

  return (
    <>
      <ICD11SearchModal
        open={openICD11Modal.open}
        icdCode={openICD11Modal.code}
        onClose={() => {
          setOpenICD11Modal({
            open: false,
            code: null,
          });
          setAssociatedIndex(-1);
        }}
        onChange={(newICD) => {}}
        initialSearchTerm={""}
        searchUsingICD={false}
        itemId={itemId}
        onSelect={(item) => {
          const splittedURL = item.id.split("/");
          const foundationId = splittedURL[splittedURL.length - 1];
          const oldSelectedDiagnosis = diagnoses[associatedIndex];
          const selectedDiagnosis = {
            ...oldSelectedDiagnosis,
            icd: item.theCode,
            foundation: foundationId || "",
            exts: [],
          };
          const newDiagnoses = [...diagnoses];
          newDiagnoses[associatedIndex] = selectedDiagnosis;
          setDiagnoses(newDiagnoses);
        }}
      />
      {openDiagnosisExtensionModal && (
        <DiagnosisExtensionModal
          open={openDiagnosisExtensionModal}
          onClose={() => {
            setOpenDiagnosisExtensionModal(false);
            setAssociatedIndex(-1);
            // setAssociated(false);
          }}
          icd={diagnoses[associatedIndex].icd}
          exts={diagnoses[associatedIndex].exts}
          itemId={itemId}
          onChangeExtensions={(newExts) => {
            handleChangeExtensions(newExts, associatedIndex);
          }}
        />
      )}
      {openComplexityManagementModal && (
        <ComplexityManagementModal
          open={openComplexityManagementModal}
          onClose={() => {
            setOpenComplexityManagementModal(false);
            setAssociatedIndex(-1);
          }}
          eC={diagnoses[associatedIndex].eC}
          itemId={itemId}
          icd={diagnoses[associatedIndex].icd}
          sI={diagnoses[associatedIndex].sI}
          pM={diagnoses[associatedIndex].pM}
          onChange={(value, key) => {
            handleOtherFieldChange(key, value, associatedIndex);
          }}
        />
      )}

      <Grid container>
        <Grid item xs={12}>
          <PatientInfo color={"#000"} />
        </Grid>
        <Grid item xs={12}>
          {itemId && <NameAndPinRendererWithHierarchy itemId={itemId} />}
          {itemId &&
            (lstType === LIST_TYPES.painted_distribution.name ? (
              <SVGRegionRenderer
                gID={layerInfo.D_ID}
                pathId={pathId}
                hMapId={layerInfo.HMAP_ID}
              />
            ) : (
              <SVGRegionRendererWithPoint
                gID={layerInfo.D_ID}
                itemId={itemId}
              />
            ))}
          {itemId && <PinDescriptionRenderer itemId={itemId} />}
        </Grid>
        <Grid item xs={12} style={{ marginBottom: 16 }}>
          <Grid container>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isICD10}
                    onChange={(e) => {
                      setIsICD10(e.target.checked);
                    }}
                    name='isICD10'
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    color={"primary"}
                  />
                }
                label={
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}>
                    {uiData?.label_UseICD10?.tr_text}{" "}
                    <span>
                      <Tooltip title={uiData?.label_UseICD10_help?.tr_text}>
                        <Help />
                      </Tooltip>
                    </span>
                  </p>
                }
              />
            </Grid>
            {/* <Grid item xs={4}>
              <TextField
                select
                fullWidth
                label={"Diagnosis Language"}
                value={diagnosisLanguage}
                onChange={(e) => {
                  dispatch(changeDiagnosisLanguageSetting(e.target.value));
                }}
                variant={"outlined"}
              >
                {diagnosisLanguages.map(
                  ({
                    diagnosis_and_extensions_language: code,
                    languages: lang,
                  }) => {
                    return (
                      <MenuItem key={code} value={code}>
                        {lang}
                      </MenuItem>
                    );
                  }
                )}
              </TextField>
            </Grid> */}
          </Grid>
        </Grid>
        <ReactSortable
          list={diagnoses}
          // delay={200}
          setList={(newState) => {
            setDiagnoses(newState);
          }}
          onEnd={() => {}}
          handle={".sorting-handle"}
          style={{ width: "100%" }}>
          {diagnoses.map((d, index) => {
            return (
              <Grid
                item
                xs={12}
                className={classes.additionalDiagnosis}
                key={d.icd || index}
                // key={new Date()}
              >
                {index === 0 && (
                  <Grid>
                    <Typography variant='h6' className={"diag--heading"}>
                      {uiData?.transtext_PrimaryDiagnosis?.tr_text} (ICD 11)
                    </Typography>
                  </Grid>
                )}
                <Grid container>
                  <Grid item xs={8} className='title-box'>
                    <IconButton
                      onClick={() => {
                        onDeleteDiagnoses(index);
                      }}>
                      <IndeterminateCheckBoxRounded />
                    </IconButton>
                    <Typography component={"span"}>
                      {/* {"Additional Diagnosis"} */}
                      {index === 0
                        ? uiData?.transtext_PrimaryDiagnosis?.tr_text
                        : uiData?.transtext_AdditionalDiagnosis?.tr_text}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} className={"action-box"}>
                    <IconButton
                      style={{ cursor: "grab" }}
                      className={"sorting-handle"}>
                      <Reorder />
                    </IconButton>
                  </Grid>
                </Grid>
                <QuickSelect
                  diagnosisList={recentDiagnosisSearch}
                  onChangeHandler={(value) => {
                    setAssociatedIndex(index);
                    handleQuickSelect(value, index);
                    // setQuickSelectVal(value)
                  }}
                  index={index}
                />
                <DiagnosisItem
                  index={index}
                  d={d}
                  searchText={
                    index === 0
                      ? uiData?.transtext_PrimaryDiagnosis?.tr_text
                      : uiData?.transtext_AdditionalDiagnosis?.tr_text
                  }
                  searchHelp={
                    index === 0
                      ? uiData?.transtext_PrimaryDiagnosis?.tr_text
                      : uiData?.transtext_AdditionalDiagnosis?.tr_text
                  }
                  codeText={
                    index === 0
                      ? uiData?.label_PrimaryCode?.tr_text
                      : ` ${uiData?.transtext_Additional?.tr_text}  ${uiData?.label_Code?.tr_text} `
                  }
                  codeHelp={
                    index === 0
                      ? uiData?.label_PrimaryCode_help?.tr_text
                      : ` ${uiData?.transtext_Additional?.tr_text}  ${uiData?.label_Code?.tr_text} `
                  }
                  extensionBoxText={
                    index === 0
                      ? ` ${uiData?.transtext_Primary?.tr_text}  ${uiData?.transtext_DxExtensions?.tr_text} `
                      : ` ${uiData?.transtext_Additional?.tr_text}  ${uiData?.transtext_DxExtensions?.tr_text} `
                  }
                  extensionBoxHelp={
                    uiData?.listItem_DiagnosisExtensions?.tr_text
                  }
                  onSearchClick={() => {
                    setAssociatedIndex(index);
                    setOpenICD11Modal({
                      open: true,
                      code: d.icd,
                    });
                  }}
                  onAddExtension={() => {
                    setAssociatedIndex(index);
                    setOpenDiagnosisExtensionModal(true);
                  }}
                  // handleDeleteExtension={handleDeleteExtension}
                  onChangeExtensions={(newExts) => {
                    handleChangeExtensions(newExts, index);
                  }}
                />
                <Grid container>
                  {isClinicInUSA && (
                    <Box
                      style={{
                        display: "flex",
                        marginBottom: "10px",
                        width: "100%",
                      }}
                      onClick={() => {
                        handleComplexityManagementClick(index);
                      }}>
                      <img
                        src={`${
                          process.env.REACT_APP_BACKEND_URL
                        }/static/media/svgFlags/${clinicCountry.toLowerCase()}.svg`}
                        width='35'
                        // alt={name}
                        alt=''
                      />
                      <TextField
                        fullWidth
                        label={"Select Evaluation and management complexity"}
                        value={diagnoses[index].eC}
                        onChange={(e) => {}}
                        variant={"outlined"}
                        style={{ marginLeft: "5px" }}
                        disabled
                      />
                    </Box>
                  )}
                </Grid>{" "}
                {index === 0 && (
                  <Grid container>
                    {" "}
                    <IconButton
                      color={"primary"}
                      onClick={onAddAdditionalDiagnosis}>
                      <AddCircleOutlineOutlined />
                    </IconButton>{" "}
                    <Typography
                      variant='h6'
                      className={"diag--heading"}
                      style={{ width: "90%" }}>
                      {uiData.transtext_Additional.tr_text} Associated Diagnosis
                      (ICD 11){" "}
                      {diagnoses?.length - 1 > 0
                        ? `- ${diagnoses?.length - 1}`
                        : null}
                    </Typography>
                  </Grid>
                )}
                <Divider />
              </Grid>
            );
          })}
        </ReactSortable>
      </Grid>
    </>
  );
};

function DiagnosisItem({
  searchText,
  searchHelp,
  codeText,
  codeHelp,
  d,
  extensionBoxText,
  extensionBoxHelp,
  onChangeExtensions,
  onSearchClick,
  onAddExtension,
}) {
  const { uiData } = useTranslations();
  return (
    <Grid container>
      <Box display='flex' flexDirection='column' width='100%'>
        <DiagnosisBox
          searchText={searchText}
          searchHelp={searchHelp}
          codeText={codeText}
          codeHelp={codeHelp}
          code={d.icd}
          subcode={d.foundation}
          onCodeClick={() => {}}
          onSearchClick={onSearchClick}
          isAssociated={true}
        />

        {d.icd && (
          <ExtensionBox
            mainText={extensionBoxText}
            mainHelp={extensionBoxHelp}
            codeText={uiData.label_ExtCodes.tr_text}
            codeHelp={uiData.label_ExtCodes_help.tr_text}
            onAddExtension={onAddExtension}
            onCodeAdd={() => {}}
            onChangeExtensions={onChangeExtensions}
            list={d.exts}
            icd={d.icd}
            isAssociated={true}
          />
        )}
      </Box>
    </Grid>
  );
}

function DiagnosisModal() {
  const dispatch = useDispatch();
  const {
    state: open,
    data: { itemId, isGrouped, listSubtype, listType },
  } = useSelector((state) => state.modals.icd);
  const handleCloseICDModal = () => {
    dispatch(closeICDModal());
  };
  const { uiData } = useTranslations();
  const { diagnosisLanguages, diagnosisLanguage } = useTranslations();

  const langSelector = (
    <TextField
      select
      fullWidth
      size='small'
      label={"Diagnosis Language"}
      value={diagnosisLanguage}
      onChange={(e) => {
        dispatch(changeDiagnosisLanguageSetting(e.target.value));
      }}
      variant={"outlined"}>
      {diagnosisLanguages.map(
        ({ diagnosis_and_extensions_language: code, languages: lang }) => {
          return (
            <MenuItem key={code} value={code}>
              {lang}
            </MenuItem>
          );
        }
      )}
    </TextField>
  );

  return (
    <Dialog
      open={open}
      onClose={handleCloseICDModal}
      title={`${uiData?.label_DiagnosisAbbreviation?.tr_text}  ${uiData?.transtext_and?.tr_text}  ${uiData?.transtext_DxExtensions?.tr_text}`}
      langSelector={langSelector}
      body={
        (itemId || listType) && (
          <DiagnosisModalContainer
            itemId={itemId}
            isGrouped={isGrouped}
            listType={listType}
            listSubtype={listSubtype}
          />
        )
      }
    />
  );
}

export default DiagnosisModal;
