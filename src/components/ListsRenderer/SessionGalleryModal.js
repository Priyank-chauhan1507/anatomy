import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { TranslationContext } from "../../contexts/translation";
import { onAddFile, updateItemFiles } from "../../store/slices/lists";
import { closeSessionGalleryModal } from "../../store/slices/modals";
import { getFile, getImage } from "../../utils/fileCache";
import CustomizedDialogs from "../Dialog/Dialog";

import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy";
import PatientInfo from "../PatientInfo/PatientInfo";

import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import LinkIcon from "@material-ui/icons/Link";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import { openItemImageModal } from "../../store/slices/modals";
import PdfThumbnail from "../ItemImageModal/PdfThumbnail";
import { Button, Checkbox, Typography } from "@material-ui/core";

const AssetBucket = ({ bucketList, handleAddImage, itemId, setFiles }) => {
  const dispatch = useDispatch();
  const files = bucketList[1].files;
  
  const Allfiles = useSelector((state) => state.listStore.itemsMap);

  var fileList = [];
  //eslint-disable-next-line
  bucketList[1].files?.map((currFile) => {
    var pres = 0;
    //eslint-disable-next-line
    Allfiles[itemId]?.files.map((presFile) => {
      if (presFile.id === currFile.id) pres = 1;
    });

    if (pres === 0) {
      fileList.push({ file: currFile, marked: false });
    } else {
      fileList.push({ file: currFile, marked: true });
    }
  });
  if (fileList.length === 0) return null;
  else
    return (
      <div style={{ margin: "5px" }}>
        <Typography style={{ fontWeight: "bold" }}>
          List-type: {`${bucketList[1].listType}`}{" "}
          <NameAndPinRendererWithHierarchy itemId={bucketList[0]} />{" "}
          {itemId === bucketList[0] && "( current list )"}
        </Typography>

        <div
          style={{
            border: "1px solid #000",
            height: 200,
            display: "flex",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <ReactSortable
            list={fileList}
            setList={() => setFiles(bucketList[0], files)}
            className="images-box"
            handle=".uploaded-img"
          >
            {fileList &&
              fileList.map(
                (
                  {
                    file: {
                      id,
                      name,
                      type,
                      tags,
                      notes,
                      contentType,
                      original,
                    },
                    marked,
                  },
                  i
                ) => {
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
                        }}
                      >
                        <div className="image-list-item">
                          {
                            contentType === "image" ? (
                              <>
                                <img
                                  className="uploaded-img"
                                  src={content}
                                  alt="img"
                                  // className={'sorting-handle'}
                                  onClick={() => {
                                    dispatch(
                                      openItemImageModal({ itemId, index: i })
                                    );
                                  }}
                                />
                                {/* <FileCopyIcon style={{margin:'5% 0 0 6%',cursor:'pointer',opacity:0.7}} onClick={()=>cpyImg(files[0])} /> */}
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
                        <div style={{ display: "flex", marginRight: "2%" }}>
                          {!marked ? (
                            <Checkbox
                              onChange={() =>
                                handleAddImage({
                                  id,
                                  name,
                                  type,
                                  tags,
                                  notes,
                                  contentType,
                                  original: false,
                                })
                              }
                            />
                          ) : original ? (
                            <Checkbox
                              checked={true}
                              checkedIcon={<TripOriginIcon />}
                            />
                          ) : (
                            <Checkbox
                              checked={true}
                              checkedIcon={<LinkIcon />}
                            />
                          )}
                          {`${name}`.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </ReactSortable>
        </div>
      </div>
    );
};

const SessionGallery = () => {
  const dispatch = useDispatch();
  // const [openModalDelete,setOpenModalDelete]= useState(false)
  // const [currentAsset, setCurrentAsset] =useState(null)

  const {
    state: openModal,
    //eslint-disable-next-line
    data: { itemId, listType },
  } = useSelector((state) => state.modals.sessionGalleryModal);
  useEffect(() => {
    if (!openModal) return;
    //eslint-disable-next-line
  }, []);

  const [addImageList, setAddImageList] = useState([]);
  // const itemsOrder = useSelector(
  //     (state) =>{ return listType ? state.listStore.lists[listType].itemsOrder : null}
  //   );

  const Allfiles = useSelector((state) => state.listStore.itemsMap);
  // const { locked, color, visibility, shape, order, grouped, onlyOnMap } =
  // useSelector(
  //     (state) => state.listStore.lists[LIST_TYPES.ordered.name].attr
  // )

  const setFiles = (currItemId, files) => {
    dispatch(updateItemFiles({ itemId: currItemId, files: files }));
  };

  const handleAddImage = ({ id, name, type, tags, notes, contentType }) => {
    var pres = 0;
    var newList = [];
    //eslint-disable-next-line
    addImageList.map((img) => {
      if (img.id === id) {
        pres = 1;
      } else newList.push(img);
    });

    if (pres !== 1) {
      const newFile = { id, name, type, tags, notes, contentType };
      newList.push(newFile);
    }

    setAddImageList(newList);
  };

  const handleLinkFiles = () => {
    //get All the pin idx
    //eslint-disable-next-line
    addImageList.map((img) => {
      dispatch(onAddFile({ itemId, file: img }));
    });
    setAddImageList([]);
    //dispatch(closeSessionGalleryModal())
  };

  const { uiData } = useContext(TranslationContext);

  const handleCloseModal = () => {
    setAddImageList([]);
    dispatch(closeSessionGalleryModal());
  };

  return (
    <CustomizedDialogs
      open={openModal}
      title={
        <Typography style={{ fontWeight: "bold" }}>
          {uiData.transtext_Settings?.emoji_code} Encounter Gallery
        </Typography>
      }
      onClose={handleCloseModal}
      body={
        <div style={{ minWidth: 450, maxWidth: 600 }}>
          <div
            style={{
              width: "100%",
            }}
          >
            <PatientInfo
              color={"black"}
              withBorder={true}
              isAvatarModal={false}
              isSmallAvatar={true}
            />
            {Allfiles[itemId] && itemId && (
              <AssetBucket
                bucketList={[itemId, Allfiles[itemId]]}
                handleAddImage={handleAddImage}
                itemId={itemId}
                setFiles={setFiles}
              />
            )}
            {Object.entries(Allfiles).map((bucketList) => {
              if (bucketList[0] !== itemId) {
                return (
                  <AssetBucket
                    bucketList={bucketList}
                    handleAddImage={handleAddImage}
                    itemId={itemId}
                    setFiles={setFiles}
                  />
                );
              } else return null;
            })}
            <div
              style={{
                display: "flex",
                margin: "4px",
                justifyContent: "center",
              }}
            >
              <Button variant="outlined" onClick={handleLinkFiles}>
                Link Files
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SessionGallery;
