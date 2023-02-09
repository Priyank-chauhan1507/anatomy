import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
  NoEncryption,
  LockOpen,
} from "@material-ui/icons";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { Alert } from "@material-ui/lab";
import { numberToRoman } from "../../utils/helpers";
import { FILE_NAME_BUILDER_OPTIONS_MAP } from "../../constants/userSettings";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ORDERS, SNS_RENDERER } from "../../constants/itemConstants";
import { LIST_TYPES } from "../../constants/listsConstants";
import useTranslations from "../../hooks/useTranslations";
import configureStore from "../../store/index";
import { toggleExportZipModal } from "../../store/slices/modals";
import { getDate, getEmojiGroupString } from "../../utils/cf";
import {
  getFileNameForPDFExport,
  getMarkedUpPDF,
} from "../../utils/exportUtils";
import { getBinaryContent } from "../../utils/exportUtils/helpers";
import { getFile, getImage } from "../../utils/fileCache";
import { chooseList } from "../../utils/helpers";
import BackdropWithLoader from "../BackdropForDownload";
import { CreateName } from "../ItemImageModal";

function ExportZipModal() {
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { uiData } = useTranslations();
  const [copied, setCopied] = useState(false);
  //eslint-disable-next-line
  const [visibilityMap, setVisibilityMap] = useState(new Set());
  const [loader, setLoader] = useState(false);

  const {
    //eslint-disable-next-line
    tags: t,
    tagsArray,
    language,

    lateralityData,
    anatomicData,
  } = useTranslations();

  const encounterInfo = useSelector(
    (state) => state.userSettings.encounterInfo
  );
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);

  const { state: open } = useSelector((state) => state.modals.exportZipModal);

  const dispatch = useDispatch();
  const password = useRef();

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const Allfiles = useSelector((state) => state.listStore.itemsMap);

  const urlToFile = async (url) => {
    const file = new File([url], "GalleryItem", { type: url.type });
    return file;
  };

  const shareZip = async () => {
    try {
      var zip = new window.JSZip();
      var count = 0;
      let arr = [];
      var zipFilename = "galleryItem.zip";
      const pdfContent = await getMarkedUpPDF();
      const pdfBlob = await getBinaryContent(pdfContent);
      zip.file(getFileNameForPDFExport() + ".pdf", pdfBlob, { blob: true });
      const patientInfo = configureStore.getState().userSettings.patientInfo;
      const clinicInfo = configureStore.getState().userSettings.userSettings;
      const encounterInfo =
        configureStore.getState().userSettings.encounterInfo;
      const { sequence, delimiter, useEmoji } =
        configureStore.getState().userSettings.fileNameSettings;
      const buckets = Object.values(Allfiles);
      for (const bucket of buckets) {
        let countt = 1;
        const ID = bucket.id;
        const listType = bucket.listType;
        const listSubtype = bucket.listSubtype;
        const names = bucket.names;
        const sns =
          configureStore.getState().listStore.customSNS[ID] ||
          (listType === LIST_TYPES.painted_distribution.name
            ? configureStore.getState().listStore.distributionSNS
            : configureStore.getState().listStore.globalSNS);
        const idx = configureStore.getState().listStore.itemsOrderMap[ID];

        const trData = { lateralityData, uiData, anatomicData };

        const { order } = chooseList(
          configureStore.getState().listStore.lists,
          listType,
          listSubtype
        ).attr;
        const item = configureStore.getState().listStore.itemsMap[ID];

        const orderList = sns.orderList
          .map((item) => {
            const newItem = { ...item };
            var value = "";
            if (item.visible) {
              value = item.isArray
                ? names[item.id]
                    .map((_, i) =>
                      SNS_RENDERER[item.id].renderer(trData, names, i, item, {
                        visibilityMeta: visibilityMap,
                      })
                    )
                    .join(" ")
                : SNS_RENDERER[item.id].renderer(trData, names, null, item, {
                    visibilityMeta: visibilityMap,
                  });
            }

            newItem.value = value;
            return newItem;
          })
          .filter(({ visible, value }) => {
            return visible && value !== "";
          });

        if (bucket.files.length !== 0) {
          if (
            bucket.listType === "single_diagnosis" ||
            bucket.listType === "comments" ||
            bucket.listType === "defer" ||
            bucket.listType === "ordered"
          ) {
            var img = zip.folder(bucket.listType);
          } else {
            var img = zip.folder(bucket.listSubtype);
          }
          let index = 0;
          for (const galleryItem of bucket.files) {
            let content =
              galleryItem.contentType === "image"
                ? getImage(galleryItem.id)
                : getFile(galleryItem.id);

            let obj = {
              ...patientInfo,
              ...item,
              ...galleryItem,
              ...clinicInfo,
              ...encounterInfo,
              amid: item.egz.amid,
              emojiGroup: getEmojiGroupString(
                anatomicData[item.names.amid].emoji_group,
                item.names,
                lateralityData
              ),
            };
            var Filename = CreateName(
              obj,
              ID,
              anatomicData,
              ORDERS,
              order,
              uiData,
              useEmoji,
              item,
              sequence,
              tagsArray,
              delimiter,
              galleryItem,
              idx,
              index,
              orderList
            );

            const fileContent = await getBinaryContent(content);
            let typeOfFile = {};
            if (arr.includes(Filename)) {
              Filename = countt + "._" + Filename;
            } else {
              arr.push(Filename);
            }

            if (galleryItem.contentType === "image") {
              typeOfFile = { binary: true };
            } else {
              typeOfFile = { blob: true };
            }

            img.file(Filename, fileContent, typeOfFile);

            index++;
          }
        }
        count++;
      }

      const zipContent = await zip.generateAsync({
        type: "blob",
        password: text,
        encryptStrength: 2,
      });

      const file = await urlToFile(zipContent);

      const files = [file];
      if (!navigator.canShare || !navigator.canShare({ files: files })) {
        return;
      } else {
      }
      try {
        await navigator.share({
          files: files,
          title: "GalleryItem Zip",
          text: "All Gallery item",
        });
      } catch (error) {}
    } catch (e) {}
  };

  const saveHandler = async (password) => {
    try {
      var zip = new window.JSZip();
      var count = 0;
      let arr = [];
      var zipFilename = "galleryItem.zip";

      setLoader(true);
      dispatch(toggleExportZipModal());
      document.getElementById("reset-zoom-pan").click();
      const pdfContent = await getMarkedUpPDF();
      const pdfBlob = await getBinaryContent(pdfContent);
      zip.file(getFileNameForPDFExport() + ".pdf", pdfBlob, { blob: true });
      const patientInfo = configureStore.getState().userSettings.patientInfo;
      const clinicInfo = configureStore.getState().userSettings.userSettings;
      const encounterInfo =
        configureStore.getState().userSettings.encounterInfo;
      const { sequence, delimiter, useEmoji } =
        configureStore.getState().userSettings.fileNameSettings;
      const buckets = Object.values(Allfiles);
      for (const bucket of buckets) {
        let countt = 1;
        const ID = bucket.id;
        const listType = bucket.listType;
        const listSubtype = bucket.listSubtype;
        const names = bucket.names;
        const sns =
          configureStore.getState().listStore.customSNS[ID] ||
          (listType === LIST_TYPES.painted_distribution.name
            ? configureStore.getState().listStore.distributionSNS
            : configureStore.getState().listStore.globalSNS);
        const idx = configureStore.getState().listStore.itemsOrderMap[ID];

        const trData = { lateralityData, uiData, anatomicData };

        const { order } = chooseList(
          configureStore.getState().listStore.lists,
          listType,
          listSubtype
        ).attr;
        const item = configureStore.getState().listStore.itemsMap[ID];

        const orderList = sns.orderList
          .map((item) => {
            const newItem = { ...item };
            var value = "";
            if (item.visible) {
              value = item.isArray
                ? names[item.id]
                    .map((_, i) =>
                      SNS_RENDERER[item.id].renderer(trData, names, i, item, {
                        visibilityMeta: visibilityMap,
                      })
                    )
                    .join(" ")
                : SNS_RENDERER[item.id].renderer(trData, names, null, item, {
                    visibilityMeta: visibilityMap,
                  });
            }

            newItem.value = value;
            return newItem;
          })
          .filter(({ visible, value }) => {
            return visible && value !== "";
          });

        if (bucket.files.length !== 0) {
          if (
            bucket.listType === "single_diagnosis" ||
            bucket.listType === "comments" ||
            bucket.listType === "defer" ||
            bucket.listType === "ordered"
          ) {
            var img = zip.folder(bucket.listType);
          } else {
            var img = zip.folder(bucket.listSubtype);
          }
          let index = 0;
          for (const galleryItem of bucket.files) {
            let content =
              galleryItem.contentType === "image"
                ? getImage(galleryItem.id)
                : getFile(galleryItem.id);

            let obj = {
              ...patientInfo,
              ...item,
              ...galleryItem,
              ...clinicInfo,
              ...encounterInfo,
              amid: item.egz.amid,
              emojiGroup: getEmojiGroupString(
                anatomicData[item.names.amid].emoji_group,
                item.names,
                lateralityData
              ),
            };
            var Filename = CreateName(
              obj,
              ID,
              anatomicData,
              ORDERS,
              order,
              uiData,
              useEmoji,
              item,
              sequence,
              tagsArray,
              delimiter,
              galleryItem,
              idx,
              index,
              orderList
            );

            const fileContent = await getBinaryContent(content);
            let typeOfFile = {};
            if (arr.includes(Filename)) {
              Filename = countt + "._" + Filename;
            } else {
              arr.push(Filename);
            }

            if (galleryItem.contentType === "image") {
              typeOfFile = { binary: true };
            } else {
              typeOfFile = { blob: true };
            }

            img.file(Filename, fileContent, typeOfFile);

            index++;
          }
        }

        count++;
      }
      var Foldername = "";
      if (password) {
        var today = new Date();

        var time =
          today.getHours() +
          "-" +
          today.getMinutes() +
          "-" +
          today.getSeconds();

        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();

        Foldername = "AnatomyMapper-Archive-_" + date + "_" + time;
      } else {
        let obj = {
          ...patientInfo,
          ...clinicInfo,
          ...encounterInfo,
        };
        Foldername = Create(
          obj,
          anatomicData,
          ORDERS,

          uiData,
          useEmoji,

          sequence,
          tagsArray,
          delimiter
        );
      }
      const zipContent = await zip.generateAsync({
        type: "blob",
        password: text,
        encryptStrength: 2,
      });

      saveAs(zipContent, Foldername);
      setLoader(false);
      setText("");
    } catch (e) {}
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const copyHandler = () => {
    setCopied(true);
    const innertext = text;
    navigator.clipboard.writeText(innertext);
  };

  return (
    <>
      {" "}
      <BackdropWithLoader open={loader} />
      <Dialog
        open={open}
        style={{ height: "500px" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          dispatch(toggleExportZipModal());
        }}>
        <DialogTitle>{uiData?.alert_EnterZipPassword?.tr_text}</DialogTitle>

        <DialogContent
          className='dialog-copy-pins'
          id='dialog-content-summary'
          style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            ref={password}
            onChange={changeHandler}
            id='filled-basic'
            fullWidth
            label={uiData?.label_Password?.tr_text}
            type={showPassword ? "text" : "password"}
            helperText={uiData?.label_validPassword?.tr_text}
            variant='filled'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  <IconButton onClick={copyHandler}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='20'
                      viewBox='0 0 24 24'
                      width='20'>
                      <path d='M0 0h24v24H0z' fill='none' />
                      <path d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' />
                    </svg>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          {
            <Button
              variant='contained'
              disabled={text.length}
              size='small'
              color='primary'
              onClick={() => {
                saveHandler(false);
              }}>
              {uiData?.label_downloadWithoutPassword?.tr_text}
            </Button>
          }
          {
            <Button
              variant='contained'
              disabled={!text.length}
              size='small'
              color='primary'
              onClick={() => {
                saveHandler(true);
              }}>
              {uiData?.label_SavePasswordAndDownload?.tr_text}
            </Button>
          }
        </DialogActions>
        <div
          style={{
            display: "flex",
            margin: "0 0 8px 7vw",
            justifyContent: "space-around",
          }}>
          <Button
            variant='outlined'
            color='primary'
            size='medium'
            disabled={text.length}
            onClick={shareZip}>
            <LockOpen fontSize='small' /> {uiData?.transtext_Share?.tr_text}
          </Button>
          <Button
            variant='outlined'
            color='primary'
            size='medium'
            disabled={!text.length}
            onClick={shareZip}>
            <NoEncryption fontSize='small' />
            {uiData?.transtext_Share?.tr_text}
          </Button>
        </div>
      </Dialog>
      <Snackbar
        open={copied}
        onClose={(e) => setCopied(false)}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert variant='filled' severity='success'>
          Copied
        </Alert>
      </Snackbar>
    </>
  );
}
export default ExportZipModal;
export function Create(
  obj,
  anatomicData,
  ORDERS,
  uiData,
  useEmoji,
  sequence,
  tagsArray,
  delimiter
) {
  const seq = sequence.filter((key) => {
    if (
      obj[key.id] === undefined ||
      obj[key.id] === "" ||
      obj[key.id] === null ||
      (Array.isArray(obj[key.id]) && obj[key.id].length === 0) ||
      (key.id === "emojiGroup" && !useEmoji)
    ) {
      return false;
    } else return true;
  });

  seq.forEach((key) => {
    if (
      key.id === "dateTime" ||
      key.id === "DOB" ||
      key.id === "fileCreationDate"
    ) {
      obj[key.id] = getDate(obj[key.id]);
    } else if (key.id === "skinType") {
      obj[key.id] = "(" + numberToRoman(parseFloat(obj[key.id])) + ")";
    } else if (key.id === "monkType") {
      obj[key.id] = `MST-${obj[key.id]}`;
    } else if (key.id === "coords" && typeof obj[key.id] !== "string") {
      obj[key.id].svgCoords.x = Math.round(obj[key.id].svgCoords.x);
      obj[key.id].svgCoords.y = Math.round(obj[key.id].svgCoords.y);
      obj[key.id] = `x-(${obj[key.id].svgCoords.x}) y-(${
        obj[key.id].svgCoords.y
      })`;
    } else if (key.id === "gender" && useEmoji) {
      let female_emoji = uiData["label_PT_Sex_Female"]["emoji_code"];
      let male_emoji = uiData["label_PT_Sex_Male"]["emoji_code"];
      let others_emoji = uiData["label_PT_Sex_Other"]["emoji_code"];
      if (obj[key.id] === "male") {
        obj[key.id] = male_emoji + " " + obj[key.id];
      } else if (obj[key.id] === "female") {
        obj[key.id] = female_emoji + " " + obj[key.id];
      } else {
        obj[key.id] = others_emoji + " " + obj[key.id];
      }
    } else if (obj[key.id] === undefined) {
      obj[key.id] = "NA";
    }
  });

  let fileName = seq
    .map((key) => {
      if (useEmoji && obj[key.id] && key.id !== "BucketOrder") {
        if (
          uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
            .emoji_code
        ) {
          if (key.id === "tags" && obj[key.id] !== "NA") {
            return (
              uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
                .emoji_code +
              " " +
              obj[key.id]
                .map((x) => {
                  return tagsArray[x - 1].emoji_code;
                })
                .join("")
            );
          } else {
            return (
              uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
                .emoji_code +
              " " +
              obj[key.id]
            );
          }
        } else return obj[key.id];
      } else if (
        obj[key.id] &&
        key.id !== "BucketOrder" &&
        uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
          .element_AdditionalProperties
      ) {
        return (
          uiData[FILE_NAME_BUILDER_OPTIONS_MAP[key.id].translation_key]
            .element_AdditionalProperties + obj[key.id]
        );
      } else {
        return obj[key.id];
      }
    })
    .join(useEmoji ? "\u2022" : delimiter);

  return fileName;
}
