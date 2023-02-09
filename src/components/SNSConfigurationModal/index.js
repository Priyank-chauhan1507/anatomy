import {
  Button,
  Checkbox,
  Grid,
  // FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import {
  Help,
  RefreshOutlined,
  Reorder,
  Visibility,
  VisibilityOffOutlined,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
// import { globalSNSInitialState, SnsBuilderContext } from "../../App";
import { DEFAULT_SNS } from "../../constants/itemConstants";
import { TranslationContext } from "../../contexts/translation";
import { changeSNSSequence, updateSNS } from "../../store/slices/lists";
import { toggleSNSModal } from "../../store/slices/modals";
import CustomizedDialogs from "../Dialog/Dialog";

export const LabelRenderer = ({
  id,
  help,
  label,
  style,
  pre,
  post,
  checked,
  isCheckboxVisible,
  onChange,
  child,
  onChangeValue,
  value,
  notAllowed = false,
  isChild = false,
}) => {
  return (
    <span style={{ width: "100%" }}>
      <span
        style={{
          display: "flex",
          gap: 5,
          width: isChild ? "91.5%" : "100%",
          justifyContent: "space-between",

          marginLeft: "auto",
          fontSize: isChild && "smaller",
        }}
      >
        <div style={{ width: 40 }}>
          <Checkbox
            style={{ display: !isCheckboxVisible && "none" }}
            color={"primary"}
            icon={<VisibilityOffOutlined />}
            checkedIcon={<Visibility />}
            checked={checked}
            // disabled={notAllowed}
            onChange={(e) => onChange(e, isChild)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            flex: 1,
            gap: 10,
          }}
        >
          <Tooltip title={help}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginTop: "2px",
              }}
            >
              <Help fontSize={"small"} />
            </span>
          </Tooltip>
          <span style={style}>
            {pre}
            {label}
            {post}
          </span>
          {value != null && (
            <TextField
              label={label}
              value={value}
              onChange={onChangeValue}
              variant="outlined"
            />
          )}
        </div>

        {!isChild && (
          <div>
            <IconButton
              className={"sorting-handle"}
              style={{ cursor: "move", padding: 6 }}
            >
              <Reorder />
            </IconButton>
          </div>
        )}
      </span>
      {child && (
        <LabelRenderer
          id={child.id}
          help={child.help}
          pre={child.pre}
          post={child.post}
          label={child.label}
          style={child.style}
          checked={child.visible}
          isCheckboxVisible={!child.isCheckboxVisible}
          onChange={onChange}
          notAllowed={notAllowed}
          isChild
        />
      )}
    </span>
  );
};
export const NameLineSNS = ({
  label,
  list = [],
  uiData,
  snsSequence,
  setSnsSequence,
  onListChange,
  onRestoreSNS,
}) => {
  return (
    uiData && (
      <>
        <div
          style={{
            display: "flex",

            marginBottom: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              // justifyContent: "space-between",
              // gap: 6,

              marginBottom: 10,
            }}
          >
            <span>
              <Grid container>
                <Grid item xs={6}>
                  <span>{uiData.label_SNS_LoadDefaultSequence?.tr_text} </span>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    label={uiData.transtext_Sequence?.tr_text}
                    // defaultValue={
                    //   language == "en"
                    //     ? "laterality_then_site"
                    //     : "site_then_laterality"
                    // }
                    value={snsSequence}
                    onChange={(e) => setSnsSequence(e.target.value)}
                    size={"small"}
                    color={"primary"}
                    variant={"outlined"}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value={"laterality_then_site"}>
                      {
                        uiData.label_SNS_LoadDefaultSequence_LateralityThenSite
                          ?.tr_text
                      }
                    </MenuItem>
                    <MenuItem value={"site_then_laterality"}>
                      {
                        uiData.label_SNS_LoadDefaultSequence_SiteThenLaterality
                          ?.tr_text
                      }
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </span>
            <span>
              <Tooltip title={uiData.label_FolderEP_RestoreDefaults?.tr_text}>
                <IconButton
                  color={"primary"}
                  onClick={onRestoreSNS}
                  style={{ padding: 0 }}
                >
                  <RefreshOutlined />
                </IconButton>
              </Tooltip>
            </span>
          </div>
          <ReactSortable
            list={list}
            setList={(newState) => onListChange(newState)}
            animation={200}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              flexWrap: "wrap",
            }}
            delayOnTouchStart={true}
            delay={2}
            handle=".sorting-handle"
          >
            {list.map(
              (
                {
                  id,
                  translation_key,
                  default_label,
                  pre,
                  post,
                  style,
                  visible,
                  help,
                  alwaysSelected,
                  child,
                  notAllowed,
                  value,
                },
                index
              ) => {
                return (
                  <LabelRenderer
                    key={id}
                    id={id}
                    help={
                      uiData[help.translation_key]?.tr_text ||
                      help.default_label
                    }
                    child={
                      child
                        ? {
                            ...child,
                            label:
                              uiData[child.translation_key]?.tr_text ||
                              child.default_label,
                            help:
                              uiData[child.help.translation_key]?.tr_text ||
                              child.help.default_label,
                          }
                        : null
                    }
                    pre={pre}
                    post={post}
                    label={uiData[translation_key]?.tr_text || default_label}
                    style={style}
                    checked={visible}
                    isCheckboxVisible={!alwaysSelected}
                    value={value}
                    notAllowed={notAllowed}
                    onChangeValue={(e) => {
                      const newList = [...list];
                      newList[index] = {
                        ...newList[index],
                        value: e.target.value,
                      };

                      onListChange(newList);
                    }}
                    onChange={(e, isChild = false) => {
                      const newList = [...list];
                      const newChild = { ...newList[index].child };
                      const hasChild = newList[index].child;
                      if (!isChild) {
                        if (!e.target.checked && hasChild)
                          newList[index] = {
                            ...newList[index],
                            visible: e.target.checked,
                            child: {
                              ...newChild,
                              visible: e.target.checked,
                            },
                          };
                        else
                          newList[index] = {
                            ...newList[index],
                            visible: e.target.checked,
                          };
                      } else {
                        const isParentOff = !newList[index].visible;
                        newList[index] = {
                          ...newList[index],
                          child: {
                            ...newChild,
                            visible: isParentOff ? false : e.target.checked,
                          },
                        };
                      }

                      onListChange(newList);
                    }}
                  />
                );
              }
            )}
          </ReactSortable>
        </div>
      </>
    )
  );
};

export default function SNSConfigurationModal() {
  const globalSNS = useSelector((state) => state.listStore.globalSNS);
  const modalOpen = useSelector((state) => state.modals.snsModal.state);
  const [snsState, setSnsState] = useState(globalSNS);
  const dispatch = useDispatch();
  const { uiData, language, languagesData } = useContext(TranslationContext);
  // const { snsSequence, languageChangedRecently, setLanguageChangedRecently } =
  //   useContext(SnsBuilderContext);
  // const [applyToAll, setApplyToAll] = useState(false);

  useEffect(() => {
    setSnsState(globalSNS);
  }, [globalSNS]);

  useEffect(() => {
    // if (language === "es") {
    //   dispatch(changeSNSSequence("site_then_laterality"));
    // } else {
    //   dispatch(changeSNSSequence("laterality_then_site"));
    // }

    if (languagesData[language] !== undefined) {
      const sequence = languagesData[language].sns_default;

      if (sequence === "SL") {
        dispatch(changeSNSSequence("site_then_laterality"));
      } else if (sequence === "LS") {
        dispatch(changeSNSSequence("laterality_then_site"));
      }
    } else {
    }
  }, [language, dispatch, languagesData]);

  // useEffect(() => {
  //   if(isSingleVisible){
  //     onSave(snsState);
  //   }else{
  //     onSaveGlobally(snsState);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [snsState]);

  const handleChange = (newValue, name) => {
    setSnsState({
      ...snsState,
      [name]: newValue,
    });
  };

  const handleSNSSequenceChange = (newValue) => {
    // setSnsState({ ...snsState, snsSequence: newValue });
    dispatch(changeSNSSequence(newValue));
  };

  const handleRestoreSNS = () => {
    setSnsState({
      orderList: Object.values(DEFAULT_SNS),
      autoEnhance: true,
      autoRelate: true,
      snsSequence: "laterality_then_site",
    });
  };

  const onCloseSNS = (all) => {
    dispatch(updateSNS({ newSNS: snsState, all }));
    dispatch(toggleSNSModal());
  };

  return (
    uiData && (
      <CustomizedDialogs
        open={modalOpen}
        onClose={() => onCloseSNS(false)}
        title={uiData.label_SNS_WindowTitle?.tr_text}
        body={
          <div
            style={{
              width: 400,
              marginBottom: 8,
            }}
          >
            <NameLineSNS
              list={snsState.orderList}
              onRestoreSNS={handleRestoreSNS}
              snsSequence={snsState.snsSequence}
              setSnsSequence={handleSNSSequenceChange}
              uiData={uiData}
              // label={"Anatomic Site Name Order : "}
              onListChange={(newList) => handleChange(newList, "orderList")}
            />
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button
                variant={"contained"}
                color={"secondary"}
                onClick={() => onCloseSNS(true)}
                size="small"
                style={{ margin: "auto" }}
              >
                {uiData?.label_SNS_ApplyToAllSites?.tr_text}
              </Button>
            </div>
          </div>
        }
        footer={null}
      />
    )
  );
}
