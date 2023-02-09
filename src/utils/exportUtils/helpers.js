import JSZipUtils from "jszip-utils";
import store from "../../store";
import { format } from "date-fns";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

export const getBinaryContent = (content) => {
  return new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(content, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const getFileNameForPDFExport = () => {
  const state = store.getState();
  const { encounterInfo, patientInfo, language, userSettings } =
    state.userSettings;
  const nameArr = [
    encounterInfo.dateTime
      ? format(new Date(encounterInfo.dateTime), "yyyy-MM-dd")
      : "",
    patientInfo.lastName,
    patientInfo.firstName,
    patientInfo.DOB ? format(new Date(patientInfo.DOB), "yyyy-MM-dd") : "",
    "AnatomyMapper",
    language,
    userSettings.clinicCountryOpts?.paper_size,
  ];
  const filteredNameArr = nameArr.filter((item) => item !== "");

  return filteredNameArr.join("_");
};

export const getCanvasImage = () => {
  return window.window.sketchRef.toDataURL();
};

export const convertSVGElementToXML = (ele) => {
  var svgString = new XMLSerializer().serializeToString(ele);

  // Remove any characters outside the Latin1 range
  var decoded = unescape(encodeURIComponent(svgString));

  // Now we can use btoa to convert the svg to base64
  var base64 = btoa(decoded);
  return `data:image/svg+xml;base64,${base64}`;
};

export const downloadPDFUsingTemplate = (Template, args, filename) => {
  const doc = <Template {...args} />;
  return new Promise((resolve, reject) => {
    pdf(doc)
      .toBlob()
      .then((b) => {
        saveAs(b, filename);
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getPDFUsingTemplate = (Template, args) => {
  const doc = <Template {...args} />;
  return pdf(doc).toBlob();
};

export const applyAllStyle = (
  cloneNode,
  originalNode = document.getElementById("d")
) => {
  const styles = getComputedStyle(originalNode);

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];
    cloneNode.style[style] = styles[style];
  }

  if (originalNode.childNodes.length > 0) {
    for (let i = 0; i < originalNode.childNodes.length; i++) {
      const child = originalNode.childNodes[i];
      const cloneChild = cloneNode.childNodes[i];
      if (child.nodeName === "#text") continue;
      applyAllStyle(cloneChild, child);
    }
  } else {
    return cloneNode;
  }
};

export const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
