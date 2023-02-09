import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import { updateLinks } from "../../store/slices/lists";
import { closeLinkGalleryModal } from "../../store/slices/modals";
import CustomizedDialogs from "../Dialog/Dialog";

import { NameAndPinRendererWithHierarchy } from "../ListItemComponents/NameAndPinRendererWithHierarchy";
import PatientInfo from "../PatientInfo/PatientInfo";

import { Link } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import useTranslations from "../../hooks/useTranslations";

import {
  getEmojiCodeForLinkType,
  translateTags,
} from "../../utils/translationHelpers";

import { Button, Checkbox, Typography } from "@material-ui/core";

const LinkBucket = ({ bucketList, handleAddLink, itemId }) => {
  // const dispatch = useDispatch();
  // const files = bucketList[1].links;
  const Allfiles = useSelector((state) => state.listStore.itemsMap);
  const { uiData, tags: t } = useTranslations();
  var fileList = [];
  //eslint-disable-next-line
  bucketList[1].links?.map((currFile) => {
    var pres = 0;
    //eslint-disable-next-line
    Allfiles[itemId]?.links.map((presFile) => {
      if (presFile.link === currFile.link) pres = 1;
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
            height: 100,
            display: "flex",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <ReactSortable
            list={fileList}
            className="images-box"
            style={{ width: "100%" }}
            handle=".uploaded-img"
          >
            {fileList &&
              fileList.map(
                (
                  { file: { id, link, desc, type, tags, original }, marked },
                  i
                ) => {
                  return (
                    <div key={i} style={{ display: "flex" }}>
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
                        <Link
                          target="_blank"
                          href={link}
                          style={{
                            textDecoration: "underline",
                            fontWeight: "bold",
                            fontSize: "110%",
                            marginRight: "auto",
                          }}
                          key={link}
                        >
                          {`${getEmojiCodeForLinkType(type, {
                            uiData,
                          })} ${desc}`}
                        </Link>
                        <div
                          style={{
                            padding: 2,
                            background: "#fff",
                            borderRadius: 3,
                          }}
                        >
                          {tags.map((tag) => {
                            return (
                              <span>
                                {translateTags(tag, { tags: t }, true)}
                              </span>
                            );
                          })}
                        </div>
                        <div style={{ display: "flex", marginRight: "2%" }}>
                          {!marked ? (
                            <Checkbox
                              onChange={() =>
                                handleAddLink({
                                  id,
                                  link,
                                  desc,
                                  type,
                                  tags,
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

const LinkGallery = () => {
  const dispatch = useDispatch();

  const {
    state: openModal,
    data: { itemId },
  } = useSelector((state) => state.modals.linkGalleryModal);
  useEffect(() => {
    if (!openModal) return;
    //eslint-disable-next-line
  }, []);
  //eslint-disable-next-line
  const { uiData, tags: t } = useTranslations();

  const [addLinkList, setAddLinkList] = useState([]);

  const Allfiles = useSelector((state) => state.listStore.itemsMap);

  const handleLinkReorder = (newLinks) => {
    dispatch(updateLinks({ newLinks, data: { isGrouped: false, itemId } }));
  };

  const handleAddLink = ({ id, link, desc, type, tags, original }) => {
    var pres = 0;
    var newList = [];

    //eslint-disable-next-line
    addLinkList.map((img) => {
      if (img.id === id) {
        pres = 1;
      } else newList.push(img);
    });

    if (pres !== 1) {
      const newFile = { id, link, desc, type, tags, original };
      newList.push(newFile);
    }

    setAddLinkList(newList);
  };

  const handleLinkFiles = () => {
    //get All the pin idx
    var linkImageId = [...Allfiles[itemId].links, ...addLinkList];

    handleLinkReorder(linkImageId);
    setAddLinkList([]);
  };

  const handleCloseModal = () => {
    setAddLinkList([]);
    dispatch(closeLinkGalleryModal());
  };

  return (
    <CustomizedDialogs
      open={openModal}
      title={
        <Typography style={{ fontWeight: "bold" }}>
          {uiData.transtext_Settings?.emoji_code} Link Gallery
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
              <LinkBucket
                bucketList={[itemId, Allfiles[itemId]]}
                handleAddLink={handleAddLink}
                itemId={itemId}
              />
            )}
            {Object.entries(Allfiles).map((bucketList) => {
              if (bucketList[0] !== itemId) {
                return (
                  <LinkBucket
                    bucketList={bucketList}
                    handleAddLink={handleAddLink}
                    itemId={itemId}
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
                Link these links
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default LinkGallery;
