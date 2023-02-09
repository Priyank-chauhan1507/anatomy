import React , {useState} from 'react'
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PdfThumbnail = ({fileUrl}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const [pdf, setPdf] = useState();
  const openViewer = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      var a = e.target.result;
      setPdf(a);
    };

    return pdf;
  };
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
      const Errors =(error) => alert('Error while retrieving document source! ' + error.message);

  return (
    <>
   {fileUrl && <div style={{ height: "80px", width: "80px" }}>
    <Document
      file={openViewer(fileUrl)}
     onLoadSuccess={onDocumentLoadSuccess}
     onSourceError ={Errors}
   >
      <Page
        pageNumber={1}
        renderAnnotationLayer={true}
        renderTextLayer={false}
       height={80}
      />
    </Document>
  </div>
}
</>
  )
}

export default PdfThumbnail














