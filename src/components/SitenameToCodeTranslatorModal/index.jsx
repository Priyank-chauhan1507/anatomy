import {
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Add,
  AddCircle,
  CheckBox,
  FileCopyOutlined,
  Help,
  HelpOutlined,
  Remove,
  Reorder,
  Visibility,
  VisibilityOffOutlined,
} from "@material-ui/icons";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { DEFAULT_SNS, SNS_RENDERER } from "../../constants/itemConstants";
import useTranslations from "../../hooks/useTranslations";
import { changeItemSNSOrder } from "../../store/slices/lists";
import {
  toggleSiteNameToCodeTranslatorModal,
  toggleSNSModal,
} from "../../store/slices/modals";
import CustomizedDialogs from "../Dialog/Dialog";
import NameRenderer from "../NameRenderer";
import {
  DetailsOfVisualPreview,
  NameStringComponent,
} from "../StringToNameTranslatorModal";
import AutoComplete from "../NameBuilder/AutoComplete";
import { LabelRenderer as LabelRendererSNS } from "../SNSConfigurationModal";

const LabelRenderer = ({ help, label, style, pre, post }) => {
  return help ? (
    <span style={{ display: "flex", gap: 5 }}>
      <span style={style}>
        {pre}
        {label}
        {post}
      </span>
      <Tooltip title={help}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginTop: "2px",
          }}
        >
          <HelpOutlined fontSize={"small"} />
        </span>
      </Tooltip>
    </span>
  ) : (
    <span>
      <span style={style}>
        {pre}
        {label}
        {post}
      </span>
    </span>
  );
};

const NameLine = ({
  id,
  isLabel = false,
  pre,
  post,
  label,
  value,
  strict,
  onChange,
  isArray,
  isEditable,
  style,
  max = Infinity,
  autoCompleteOptions,
  help = null,
  child,
  notAllowed,
  onChangeVisibilityOfChild,
  renderOption,
}) => {
  useEffect(() => { }, [label]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (newValue) => {
    onChange(newValue.map(({ label, val }) => val));
    // if (isArray) {
    // onChange(newValue.map(({ label, val }) => val))
    // } else {
    // onChange(newValue)
    // }
  };

  const handleInputChange = (newValue) => {
    // if (isArray) {
    if (editIndex === -1) {
      handleChange([...value, { id: newValue, label: "", val: newValue }]);
    } else {
      const newArray = [...value];
      newArray[editIndex] = {
        id: newValue,
        val: newValue,
        label: "",
      };
      handleChange(newArray);
    }
    // } else {
    // handleChange(newValue)
    // }

    setInput("");
    setEditIndex(-1);
    setOpen(false);
  };
  if (isLabel)
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title={help}>
          <Help />
        </Tooltip>
        <span>{label}</span>
      </div>
    );
  return (
    <>
      <CustomizedDialogs
        open={open}
        onClose={() => setOpen(false)}
        title={label}
        body={
          <div style={{ width: 200 }}>
            {autoCompleteOptions.length !== 0 ? (
              <AutoComplete
                label="Type here..."
                value={input}
                onChange={(value) => setInput(value)}
                optionsList={autoCompleteOptions}
                renderOption={renderOption}
              />
            ) : (
              <TextField
                label={"Type Here.."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            )}
          </div>
        }
        footer={
          <div>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => {
                if (input) {
                  handleInputChange(input);
                } else {
                  if (strict) {
                    alert("Please select any value from dropdown");
                  } else {
                    alert("Can't leave field blank");
                  }
                }
              }}
            >
              {editIndex === -1 ? "ADD" : "SAVE"}
            </Button>
          </div>
        }
      />

      {!isArray && isEditable ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: 4,
            marginBottom: 4,

            // overflow: "auto",
            alignItems: "center",
          }}
          className={notAllowed ? "not-allowed-line" : ""}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={help}>
              <Help />
            </Tooltip>
          </div>
          <span style={{ fontSize: 48 }}>{pre}</span>
          <div style={{ flex: 1, padding: "10px 10px 0 10px" }}>
            <TextField
              value={value}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              //onChange={handleDefaultValueTextBox}
              label={label}
              fullWidth
              size={"small"}
              variant="outlined"
            />
          </div>
          <span style={{ fontSize: 48 }}>{post}</span>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: 10,
            marginBottom: 10,
            alignItems: "center",
          }}
          className={notAllowed ? "not-allowed-line" : ""}
        >
          <div
            style={{
              display: "flex",
              flex: "0 0 240px",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 6,
            }}
          >
            <LabelRenderer
              help={help}
              label={label}
              style={style}
              pre={pre}
              post={post}
            />
            {/* {isArray && isEditable && ( */}
            <span>
              <IconButton
                color={"primary"}
                onClick={() => {
                  setInput("");
                  setOpen(true);
                }}
                disabled={value?.length === max}
                style={{ padding: 0 }}
              >
                {" "}
                <Add />{" "}
              </IconButton>
            </span>
            {/* )} */}:
          </div>

          <div style={{ display: "flex", overflow: "auto" }}>
            <span
              style={{
                marginLeft: 8,
                fontSize: 20,
                marginRight: 4,
                color: style && style.color ? style.color : "black",
              }}
            >
              {"  " + pre + " "}
            </span>
            {isArray && isEditable ? (
              <ReactSortable
                list={value}
                setList={(newValue) => handleChange(newValue)}
                animation={200}
                style={{
                  display: "flex",
                  gap: 8,
                  flex: 1,
                  overflow: "auto",
                  minWidth: 40,
                }}
                // delayOnTouchStart={true}
                // delay={2}
                handle=".sorting-handle"
              >
                {value.map(({ id, label }, index) => {
                  return (
                    <span
                      className={"sorting-handle"}
                      key={id}
                      onClick={() => {
                        setEditIndex(index);
                        setInput(label);
                        setOpen(true);
                      }}
                    >
                      <Chip
                        label={label}
                        onDelete={() => {
                          const newList = [...value];
                          newList.splice(index, 1);
                          handleChange(newList);
                          // onChange(value.map(({id,label})=>label))
                        }}
                      />
                    </span>
                  );
                })}
              </ReactSortable>
            ) : (
              <span
                style={{
                  // cursor: "pointer",
                  // minWidth: 40,
                  ...style,

                  whiteSpace: "nowrap",
                }}
                onClick={() => {
                  // setEditIndex(4);
                  // setOpen(true);
                  // setInput(value);
                }}
              >
                {isArray ? (
                  value?.map(({ label }) => label).join(" ")
                ) : id === "anatomic_site" ? (
                  <ReactSortable
                    list={value}
                    setList={(newValue) => handleChange(newValue)}
                    animation={200}
                    style={{
                      display: "flex",
                      gap: 8,
                      flex: 1,
                      overflow: "auto",
                      minWidth: 40,
                    }}
                    // delayOnTouchStart={true}
                    // delay={2}
                    handle=".sorting-handle"
                  >
                    {value.map(({ id, label }, index) => {
                      return (
                        <span
                          className={"sorting-handle"}
                          key={id}
                          onClick={() => {
                            setEditIndex(index);
                            setInput(label);
                            setOpen(true);
                          }}
                        >
                          <Chip
                            label={label}
                            onDelete={() => {
                              const newList = [...value];
                              newList.splice(index, 1);
                              handleChange(newList);
                              // onChange(value.map(({id,label})=>label))
                            }}
                          />
                        </span>
                      );
                    })}
                  </ReactSortable>
                ) : (
                  value
                )}
              </span>
            )}
            <span
              style={{
                fontSize: 20,
                color: style && style.color ? style.color : "black",
              }}
            >
              {post + " "}
            </span>
          </div>
        </div>
      )}
      {child && (
        <LabelRendererSNS
          help={child.help}
          pre={child.pre}
          post={child.post}
          label={child.label}
          style={child.style}
          checked={child.visible}
          isCheckboxVisible={!child.isCheckboxVisible}
          onChange={onChangeVisibilityOfChild}
          isChild
        />
      )}
    </>
  );
};

function getNameStringForCopy(nameString, sns) {
  const sequence = Object.values(sns.orderList).map((el) => el.id);

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

export default function SitenameToCodeTranslator() {
  const dispatch = useDispatch();

  const { uiData, language, languagesData, lateralityData, anatomicData } =
    useTranslations();

  const modalOpen = useSelector(
    (state) => state.modals.siteNameToCodeTranslatorModal.state
  );

  const [strings, setStrings] = useState([
    {
      input: "",
      breakDown: {},
      names: {
        lateralityCode: [],
        laterality: [],
        amid: "",
        prefix: [],
        suffix: [],
        enhance_modifier: [],
        anatomic_site: [],
      },
      nameString: {},
    },
  ]);

  function getNameString(names) {
    var finalNameString = {
      amid: "",
      laterality: "",
      enhance_modifier: [],
      prefix: [],
      anatomic_site: [],
      suffix: [],
    };

    const lateralities = ["bilateral", "left", "right", "median", "unilateral"];

    const laterality_labels = {};
    lateralities.forEach((l) => {
      const { icd_code, foundation_id, laterality_id, key } = lateralityData[l];
      if (icd_code?.length > 0)
        laterality_labels[icd_code] = lateralityData[l].text;
      if (foundation_id?.length > 0)
        laterality_labels[foundation_id] = lateralityData[l].text;
      if (laterality_id?.length > 0)
        laterality_labels[laterality_id] = lateralityData[l].text;
      if (key?.length > 0) laterality_labels[key] = lateralityData[l].text;
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

    const laterality_name_strings = names.laterality.map((l) => {
      if (l?.length > 0 && laterality_labels[l]) return laterality_labels[l];
    });
    if (laterality_name_strings.length > 0)
      finalNameString.laterality = laterality_name_strings[0];

    const em_name_strings = names.enhance_modifier.map((em) => {
      if (em?.length > 0 && modifier_labels[em]) return modifier_labels[em];
    });
    if (em_name_strings.length > 0)
      finalNameString.enhance_modifier = em_name_strings;
    // eslint-disable-next-line
    const prefixes_strings = names.prefix.map((em) => {
      if (em?.length > 0 && modifier_labels[em]) return modifier_labels[em];
    });
    if (prefixes_strings.length > 0) finalNameString.prefix = prefixes_strings;

    const anatomic_sites = names.anatomic_site.map((as) => {
      if (as?.length > 0 && site_labels[as]) return site_labels[as];
    });
    if (anatomic_sites.length > 0)
      finalNameString.anatomic_site = anatomic_sites;

    // if (site_labels[site]) finalNameString.anatomic_site = site_labels[site];
    // if (amid_values[site]) {
    //   finalNameString.amid = amid_values[site];
    // }

    // eslint-disable-next-line
    const suffixes_strings = names.suffix.map((em) => {
      if (em?.length > 0 && modifier_labels[em]) return modifier_labels[em];
    });
    if (suffixes_strings.length > 0) finalNameString.suffix = suffixes_strings;

    return finalNameString;
  }

  const sns = useSelector((state) => state.listStore.globalSNS);

  const onClose = () => {
    dispatch(toggleSiteNameToCodeTranslatorModal());
  };

  const openSNSModal = () => {
    dispatch(toggleSNSModal());
  };

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

  const onChangeOrder = useCallback(
    (newOrderList) => {
      // dispatch(changeItemSNSOrder({ itemId, newOrderList }))
    },
    [dispatch]
    // [itemId, dispatch]
  );

  const handleChange = useCallback(
    (value, name, index) => {
      // let tempName = names
      if (strings[index]) {
        let tempName = [...strings];
        const newNames = {
          ...strings[index].names,
          [name]: value,
        };
        tempName[index] = {
          ...strings[index],
          names: newNames,
          nameString: getNameString(newNames),
        };
        setStrings(tempName);
      }
      // setNames(tempName)
    },
    [dispatch, strings]
  );

  const getLabel = useCallback(
    (id, isChild = false, index) => {
      if (id === DEFAULT_SNS.anatomic_site.id) {
        return (
          <span>
            {uiData[DEFAULT_SNS.anatomic_site?.translation_key]?.tr_text ||
              DEFAULT_SNS.anatomic_site.default_label}
            <a
              href={`https://anatomymapper.com/terms/#${strings[index].names.amid}`}
              target={"_blank"}
              rel={"noreferrer"}
            >
              ({strings[index].names.amid})
            </a>
          </span>
        );
      } else {
        if (isChild) {
          return (
            <span>
              {uiData[DEFAULT_SNS[id]?.child.translation_key]?.tr_text || ""}
            </span>
          );
        }
        return (
          <span>
            {uiData[DEFAULT_SNS[id].translation_key]?.tr_text ||
              DEFAULT_SNS[id].default_label}
          </span>
        );
      }
    },
    // [names.amid, uiData]
    [uiData, strings]
  );

  const getHelp = useCallback(
    (id, isChild = false) => {
      if (isChild) {
        return (
          uiData[DEFAULT_SNS[id].child.help.translation_key]?.tr_text || ""
        );
      }
      return uiData[DEFAULT_SNS[id].help.translation_key]?.tr_text;
    },
    [uiData]
  );

  const getOptions = useCallback(
    (id) => {
      return SNS_RENDERER[id].getOptions
        ? SNS_RENDERER[id].getOptions({
          uiData,
          lateralityData,
          anatomicData,
        })
        : [];
    },
    [uiData, lateralityData, anatomicData]
  );

  const getOptionRenderer = useCallback(
    (id) => {
      return (val) => {
        if (SNS_RENDERER[id].renderLabel) {
          return SNS_RENDERER[id].renderLabel(
            { uiData, lateralityData, anatomicData },
            val
          );
        } else {
          return val;
        }
      };
    },
    [uiData, lateralityData, anatomicData]
  );

  const getValue = (id, snsIndex, index) => {
    if (id === "anatomic_site") {
      return strings[index].names[id].map((val, i) => {
        return {
          label: anatomicData[val].synonym_language,
          val,
          id: val,
          index: i,
        };
      });
    }
    if (DEFAULT_SNS[id].isArray && strings[index].names[id]) {
      return strings[index].names[id].map((val, i) => {
        return {
          label: SNS_RENDERER[id].renderer(
            { uiData, lateralityData, anatomicData },
            strings[index].names,
            i,
            sns.orderList[snsIndex],
            { visibilityMeta: visibilityMap }
          ),
          val,
          id: val,
          index: i,
        };
      });
    } else {
      if (strings[index].names[id]) {
        return SNS_RENDERER[id].renderer(
          { uiData, lateralityData, anatomicData },
          strings[index].names,
          null,
          sns.orderList[snsIndex],
          { visibilityMeta: visibilityMap }
        );
      }
    }
  };

  const copyIndividualNameString = (index) => {
    navigator.clipboard.writeText(
      getNameStringForCopy(strings[index].nameString, sns)
    );
  };

  return (
    <>
      <CustomizedDialogs
        open={modalOpen}
        onClose={onClose}
        title={"Anatomic site name to code translator"}
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
                    {
                      input: "",
                      breakDown: {},
                      names: {
                        lateralityCode: [],
                        laterality: [],
                        amid: "",
                        prefix: [],
                        suffix: [],
                        enhance_modifier: [],
                        anatomic_site: [],
                      },
                      nameString: {},
                    },
                  ]);
                }}
              >
                <AddCircle />
              </IconButton>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {strings.map(({ input }, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 20,
                        }}
                      >
                        {strings.length !== 1 && (
                          <IconButton
                            onClick={() => {
                              setStrings((prev) => {
                                const newStrings = [...prev].filter(
                                  (_, i) => index !== i
                                );
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
                          // helperText={
                          //   checkError() && uiData.alert_CodeTranslator_codestring_error.tr_text
                          // }
                          // error={checkError()}
                          value={input}
                          onChange={(e) =>
                            setStrings((prev) => {
                              const newStrings = [...prev];
                              return newStrings.map((s, i) => {
                                if (index === i) {
                                  s.input = e.target.value;
                                  // s.breakDown = { ...getBreakDown(e.target.value) };
                                }
                                return s;
                              });
                            })
                          }
                        />
                      </div>
                      {/* {strings[index] && <NameRenderer sns={sns} names={strings[index]?.names} />} */}
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => copyIndividualNameString(index)}
                        >
                          <FileCopyOutlined />
                        </IconButton>
                        <NameStringComponent
                          sns={sns}
                          nameString={strings[index]?.nameString}
                        />
                      </div>
                      <ReactSortable
                        list={sns.orderList}
                        setList={onChangeOrder}
                        animation={200}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flex: 1,
                          flexWrap: "wrap",
                          marginBottom:'20px'
                        }}
                        delayOnTouchStart={true}
                        delay={2}
                        handle=".sorting-handle"
                      >
                        {sns.orderList.map(
                          (
                            {
                              id,
                              pre,
                              post,
                              isArray,
                              isLabel,
                              isEditable,
                              strict,
                              style,
                              max,
                              alwaysSelected,
                              visible,
                              child,
                              notAllowed = false,
                            },
                            snsIndex
                          ) => {
                            return (
                              <div
                                style={{
                                  display: notAllowed ? "none" : "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  width: "100%",
                                }}
                                className={{}}
                                key={id}
                              >
                                {Object.keys(strings[index]?.names).includes(
                                  id
                                ) && (
                                  <>
                                    <div
                                      style={{
                                        flex: 1,
                                        overflow: "hidden",
                                      }}
                                    >
                                      <NameLine
                                        id={id}
                                        key={id}
                                        pre={pre}
                                        post={post}
                                        notAllowed={notAllowed}
                                        value={getValue(id, snsIndex, index)}
                                        isLabel={isLabel}
                                        isArray={isArray}
                                        isEditable={isEditable}
                                        label={getLabel(id, false, index)}
                                        help={getHelp(id)}
                                        style={style}
                                        strict={strict}
                                        autoCompleteOptions={getOptions(id)}
                                        renderOption={getOptionRenderer(id)}
                                        max={id === "anatomic_site" ? 1 : max}
                                        onChange={(value) => {
                                          handleChange(value, id, index);
                                        }}
                                        visible={visible}
                                        child={
                                          child
                                            ? {
                                                ...child,
                                                label: getLabel(
                                                  id,
                                                  true,
                                                  index
                                                ),
                                                help: getHelp(id, true),
                                              }
                                            : null
                                        }
                                      />
                                    </div>

                                    <div>
                                      <IconButton
                                        className={"sorting-handle"}
                                        style={{
                                          cursor: "move",
                                          padding: 0,
                                        }}
                                      >
                                        <Reorder />
                                      </IconButton>
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          }
                        )}
                      </ReactSortable>
                      {/* <DetailsOfVisualPreview /> */}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}
