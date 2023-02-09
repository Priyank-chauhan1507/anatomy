import { IconButton, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import LinkIcon from "@material-ui/icons/Link";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { updateItemFiles } from "../../store/slices/lists";
import { copyImg, openItemImageModal } from "../../store/slices/modals";
import { getFile, getImage } from "../../utils/fileCache";
import useTranslations from "../../hooks/useTranslations";
import { TranslationContext } from "../../contexts/translation";
import TagSelector from "../TagSelector";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import PdfThumbnail from "../ItemImageModal/PdfThumbnail";

export default function ItemFiles({ itemId }) {
  const files = useSelector((state) => state.listStore.itemsMap[itemId].files);

  const { uiData } = useTranslations(TranslationContext);
  const dispatch = useDispatch();
  const setFiles = (files) => {
    dispatch(updateItemFiles({ itemId, files }));
  };
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

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }
  // const Errors =(error) => alert('Error while retrieving document source! ' + error.message);

  const handleFileTags = (value, index) => {
    const newFiles = [...files];
    newFiles[index] = {
      ...newFiles[index],
      tags: value,
    };
    setFiles(newFiles);
  };
  const handleFileNote = (value, index) => {
    const newImags = [...files];
    newImags[index] = {
      ...newImags[index],
      notes: value,
    };
    setFiles(newImags);
  };

  const handleTransferTags = (i) => {
    const newFiles = [...files];

    const tags = newFiles[i].tags;
    for (let j = i + 1; j < newFiles.length; j++) {
      newFiles[j] = {
        ...newFiles[j],
        tags: [...tags],
      };
    }
    setFiles(newFiles);
  };

  const handleTransferNotes = (i) => {
    const newFiles = [...files];

    const notes = newFiles[i].notes;
    for (let j = i + 1; j < newFiles.length; j++) {
      newFiles[j] = {
        ...newFiles[j],
        notes: notes,
      };
    }
    setFiles(newFiles);
  };

  function cpyImg(img) {
    dispatch(copyImg(img));
  }

  return (
    <div
      style={{
        border: "1px solid #000",
        height: 200,
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
      }}>
      <ReactSortable
        list={files}
        setList={setFiles}
        className='images-box'
        handle='.uploaded-img'>
        {files &&
          files.map(
            ({ id, name, type, tags, notes, contentType, original }, i) => {
              const content =
                contentType === "image" ? getImage(id) : getFile(id);

              return (
                <div key={id} style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyItems: "space-evenly",
                      flexWrap: "wrap",
                      width: 125,
                      marginLeft: "12px",
                    }}>
                    <div
                      className='image-list-item'
                      style={{ position: "relative" }}>
                      {
                        contentType === "image" ? (
                          <>
                            {!original && (
                              <LinkIcon
                                style={{
                                  position: "absolute",
                                  top: "5px",
                                  left: "5px",
                                  cursor: "pointer",
                                  opacity: 1,
                                  color: "red",
                                }}
                              />
                            )}
                            <img
                              className='uploaded-img'
                              src={content}
                              alt='img'
                              // className={'sorting-handle'}
                              onClick={() => {
                                dispatch(
                                  openItemImageModal({ itemId, index: i })
                                );
                              }}
                            />
                            <FileCopyIcon
                              style={{
                                margin: "5% 0 0 6%",
                                cursor: "pointer",
                                opacity: 0.7,
                              }}
                              onClick={() => cpyImg(files[0])}
                            />
                          </>
                        ) : type === "application/pdf" ? (
                          content && (
                            <div style={{ height: "80px", width: "80px" }}   onClick={() => {
                              dispatch(
                                openItemImageModal({ itemId, index: i })
                              );
                            }}>
                              <PdfThumbnail fileUrl={content}/>
                              
                            </div>
                          )
                        ) : (
                          <InsertDriveFileOutlinedIcon
                            className={"uploaded-img"}
                            onClick={() => {
                              dispatch(
                                openItemImageModal({ itemId, index: i })
                              );
                            }}
                            style={{ height: "80px", width: "80px" }}
                          />
                        ) // show doctype icon or preview
                      }
                    </div>
                    <div style={{ width: 125 }}>
                      <TagSelector
                        tags={tags}
                        showOnlyEmoji={true}
                        onChangeTags={(newTags) => {
                          handleFileTags(newTags, i);
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", marginRight: "2%" }}>
                      <TextField
                        style={{ width: 125 }}
                        label={uiData?.transtext_Notes?.tr_text}
                        autoComplete='off'
                        type='text'
                        onChange={(e) => {
                          handleFileNote(e.target.value, i);
                        }}
                        //   onChange={(e) => handleFileNote(e.target.value, i)}
                        value={notes}

                        // fullWidth
                      />
                      {files.length - 1 !== i && (
                        <IconButton
                          onClick={() => {
                            handleTransferNotes(i);
                          }}
                          style={{
                            paddingTop: "2px",
                            paddingBottom: "2px",
                            marginTop: "5%",
                          }}>
                          <ArrowForwardIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <div className='image-actions'>
                    {i !== files.length - 1 && (
                      <IconButton
                        onClick={() => {
                          handleTransferTags(i);
                        }}
                        style={{
                          paddingTop: "2px",
                          paddingBottom: "2px",
                          marginTop: "90px",
                        }}>
                        <ArrowForwardIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              );
            }
          )}
      </ReactSortable>
    </div>
  );
}

//   content && <Document file={openViewer(content)} onLoadSuccess={onDocumentLoadSuccess}   className={"uploaded-img"}
// onClick={() => {
//     // openViewer(content);
//   dispatch(openItemImageModal({ itemId, index: i }));
// }}
// style={{ height: '80px', width: '80px' }}>
// <Page pageNumber={pageNumber} />
// </Document>
