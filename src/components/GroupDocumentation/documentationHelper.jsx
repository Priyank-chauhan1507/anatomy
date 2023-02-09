import JPGIcon from "../../assets/img/jpg.png";
import PNGIcon from "../../assets/img/png.png";
import AIIcon from "../../assets/img/ai.png";
import CSVIcon from "../../assets/img/csv.png";
import DOCIcon from "../../assets/img/doc.png";
import DOCXIcon from "../../assets/img/docx.png";
import JSONIcon from "../../assets/img/json.png";
import OTHERIcon from "../../assets/img/other.png";
import PDFIcon from "../../assets/img/pdf.png";
import PSDIcon from "../../assets/img/psd.png";
import RTFIcon from "../../assets/img/rtf.png";
import SVGIcon from "../../assets/img/svg.png";
import TXTIcon from "../../assets/img/txt.png";
import XMLIcon from "../../assets/img/xml.png";
import ZIPIcon from "../../assets/img/zip.png";

export const getFileIcon = (filename) => {
  const extension = filename.split(".")[1].toLowerCase();

  switch (extension) {
    case "jpg":
      return JPGIcon;
    case "png":
      return PNGIcon;
    case "doc":
      return DOCIcon;
    case "docx":
      return DOCXIcon;
    case "ai":
      return AIIcon;
    case "csv":
      return CSVIcon;
    case "json":
      return JSONIcon;
    case "pdf":
      return PDFIcon;
    case "psd":
      return PSDIcon;
    case "rtf":
      return RTFIcon;
    case "svg":
      return SVGIcon;
    case "txt":
      return TXTIcon;
    case "xml":
      return XMLIcon;
    case "zip":
      return ZIPIcon;
    default:
      return OTHERIcon;
  }
};
