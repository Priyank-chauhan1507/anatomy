import { format } from "date-fns";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Logo from "../assets/logo.png";
import BackdropWithLoader from "../components/BackdropForDownload";
import PatientInfo from "../components/PatientInfo/PatientInfo";
import Preview from "../components/PDFPreview/Preview";
import { downloadFile } from "../utils/convertToJson";
import {
  getMarkedUpPDF,
  getPartOfRootSVG,
  getRootSVGImage,
} from "../utils/exportUtils";
import useTranslations from "./useTranslations";

const ExportContext = createContext({
  exportPDFWithMap: () => {},
  exportBlankMap: () => {},
  exportMarkedUpMap: () => {},
});

const PDFHeader = forwardRef((props, ref) => {
  const encounterDateTime = useSelector(
    (state) => state.userSettings.encounterInfo.dateTime
  );
  const { uiData } = useTranslations();
  return (
    <div
      style={{
        overflow: "hidden",
        // position: "fixed",
        // top: 0,
        // left: 0,
        // zIndex: 100000,
        // background: "#fff",
        // height: "730px", // TESTING TO SEE HOW HEADER LOOKS
        height: "0px",
      }}>
      <div
        id='headerPDF'
        style={{ width: "730px", marginBottom: "1rem" }}
        ref={ref}>
        <div className='pdf-header-content'>
          <div className='org'>
            <div id='brand' style={{ color: "blue" }}>
              <span>
                <img src={Logo} alt='' id='logo' />
              </span>
              <h1>anatomy mapper</h1>
            </div>
            <p>https://AnatomyMapper.com</p>
          </div>
          <div className='pdf-info'>
            <p>
              <PatientInfo color={"#000"} />
              {encounterDateTime instanceof Date && !isNaN(encounterDateTime) && (
                <span
                  style={{
                    display: "flex",
                    marginLeft: 72,
                  }}>
                  <strong style={{ paddingRight: 8 }}>
                    {uiData.label_ENC_Encounter.tr_text}{" "}
                    {uiData.label_ENC_Date.tr_text}:
                  </strong>
                  {format(new Date(encounterDateTime), "yyyy-MM-dd")} at{" "}
                  {format(new Date(encounterDateTime), "hh:mm:ss")}
                </span>
              )}
            </p>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
});

// const selectedC = {
//   paper_size: "Letter",
// };

const ExportProvider = (props) => {
  const [exportImages, setExportImages] = useState({});
  const [loader, setLoader] = useState(false);
  const { language } = useTranslations();
  const headerRef = useRef();
  const previewRef1 = useRef();
  const previewRef2 = useRef();

  const [metaReq, setMetaReq] = useState(true);
  const encounterInfo = useSelector(
    (state) => state.userSettings.encounterInfo
  );
  const patientInfo = useSelector((state) => state.userSettings.patientInfo);
  const selectedC = useSelector(
    (state) => state.userSettings.userSettings.clinicCountryOpts
  );
  const getFileName = useCallback(() => {
    const nameArr = [
      encounterInfo.dateTime
        ? format(new Date(encounterInfo.dateTime), "yyyy-MM-dd")
        : "",
      patientInfo.lastName,
      patientInfo.firstName,
      patientInfo.DOB ? format(new Date(patientInfo.DOB), "yyyy-MM-dd") : "",
      "AnatomyMapper",
      language,
    ];
    const filteredNameArr = nameArr.filter((item) => item !== "");

    return filteredNameArr.join("_");
  }, [language, encounterInfo, patientInfo]);

  const exportPDFWithMapData = useCallback(async (id) => {
    // document.body.append(node)
    // var headerNode = headerRef.current
    if (id) {
      const svgImage = await getPartOfRootSVG(id, "0.5", "#fff");
      setExportImages({
        ...exportImages,
        map: svgImage,
      });
    } else {
      setLoader(true);
      const svgImage = await getRootSVGImage();
      const canvasImage = window.window.sketchRef.toDataURL();
      setExportImages({
        map: svgImage,
        canvas: canvasImage,
      });
    }
  }, []);

  const exportPDFWithMap = (id = null, meta = true) => {
    setLoader(true);
    // exportPDFWithMapData(id)

    if (meta === false) {
      setMetaReq(meta);
      setTimeout(() => exportPDFWithMapData(id), 500);
    } else {
      setMetaReq(true);
      setTimeout(() => exportPDFWithMapData(id), 500);
    }
  };

  const exportBlankMap = useCallback(() => {
    if (selectedC.paper_size === "Letter") {
      downloadFile(
        `${process.env.REACT_APP_BACKEND_URL}/SurfaceAnatomy/BlankSurfaceMaps/Letter/AnatomyMapper_BlankSurfaceMap_${language}-Letter.pdf`,
        `AnatomyMapper_BlankSurfaceMap_${language}_Letter.pdf`
      );
    } else {
      downloadFile(
        `${process.env.REACT_APP_BACKEND_URL}/SurfaceAnatomy/BlankSurfaceMaps/A4/AnatomyMapper_BlankSurfaceMap_${language}-A4.pdf`,
        `AnatomyMapper_BlankSurfaceMap_${language}_A4.pdf`
      );
    }
  }, [selectedC, language]);

  const exportMarkedUpMap = useCallback(async () => {
    setLoader(true);
    setTimeout(async () => {
      try {
        const pdfOutput = await getMarkedUpPDF();
        const nameOfFile = getFileName();
        saveAs(pdfOutput, nameOfFile);

        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    }, 0);
  }, [getFileName]);
  const savePDFWithMap = useCallback(
    (cb) => {
      var element;
      if (metaReq) element = previewRef1.current;
      else element = previewRef2.current;
      var opt = {
        margin: [2.1, 0.3, 0.55, 0.3],
        filename: "anatomymapper.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
        pagebreak: { mode: "avoid-all", before: "#pdf-preview" },
      };

      var clonedElement = element.cloneNode(true);
      clonedElement.style.display = "block";

      html2pdf()
        .from(clonedElement)
        .set(opt)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          var totalPages = pdf.internal.getNumberOfPages();
          pdf.deletePage(1);
          html2pdf()
            .from(headerRef.current)
            .set(opt)
            .toImg()
            .get("img")
            .then(function (img) {
              var width = pdf.internal.pageSize.getWidth() - 0.6;
              var height =
                (headerRef.current.clientHeight /
                  headerRef.current.clientWidth) *
                width;

              for (var i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.addImage(img, "PNG", 0.46, 0.3, width, height);
              }

              pdf.save(getFileName());
            })
            .catch((e) => {})
            .finally(() => cb());
        })
        .catch((e) => {});
    },
    [getFileName, previewRef1, previewRef2, metaReq]
  );

  useEffect(() => {
    if (loader && exportImages.map) {
      // ;
      setTimeout(() => {
        savePDFWithMap(() => {
          setExportImages({});
        });
        setLoader(false);
      }, 10);
    }
  }, [exportImages, loader, savePDFWithMap]);

  return (
    <>
      <PDFHeader ref={headerRef} />
      <Preview
        key={"true-meta"}
        ref={previewRef1}
        exportImages={exportImages}
        isMetaRequired={true}
        orderedListContents={[]}
        unorderedListContents={[]}
        patientInfoRequired={false}
      />
      <Preview
        key={"false-meta"}
        ref={previewRef2}
        exportImages={exportImages}
        isMetaRequired={false}
        orderedListContents={[]}
        unorderedListContents={[]}
        patientInfoRequired={false}
      />
      <BackdropWithLoader open={loader} />
      <ExportContext.Provider
        value={{
          exportPDFWithMap,
          exportBlankMap,
          exportMarkedUpMap,
          setLoader,
        }}>
        {props.children}
      </ExportContext.Provider>
    </>
  );
};

export default ExportProvider;

export const useExport = () => {
  return useContext(ExportContext);
};
