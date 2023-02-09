import { Link } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactSortable } from "react-sortablejs";
import useTranslations from "../../hooks/useTranslations";
import { updateLinks } from "../../store/slices/lists";
import {
  getEmojiCodeForLinkType,
  translateTags,
} from "../../utils/translationHelpers";
import LinkIcon from '@material-ui/icons/Link';

function ItemLinkViewer({ itemId }) {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.listStore.itemsMap[itemId].links);
  const { uiData, tags: t } = useTranslations();

  const handleLinkReorder = (newLinks) => {
    return dispatch(
      updateLinks({ newLinks, data: { isGrouped: false, itemId } })
    );
  };
  return  (
 
    Boolean(links.length) && (<div
      style={{
        display: "flex",
        background: "#ccc",
        width: "100%",
        borderRadius: 8,
        padding: 4,
      }}
    >
      <ReactSortable
        list={links}
        setList={handleLinkReorder}
        delay={200}
        style={{ width: "100%" }}
      >
        {links.map(({id,link, desc, type, tags, original }) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: 4,
                cursor: "move",
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
                  display:"flex",
                  alignItems: "center"
                }}
                key={link}
              >
                {`${getEmojiCodeForLinkType(type, { uiData })} ${desc}`}
                {!original && <LinkIcon style={{color:"red", marginTop:"3px", marginLeft:"3px"}}/>}
              </Link>
              <div style={{ padding: 2, background: "#fff", borderRadius: 3 }}>
                {tags.map((tag) => {
                  return <span>{translateTags(tag, { tags: t }, true)}</span>;
                })}
              </div>
            </div>
          );
        })}
      </ReactSortable>
    </div>
   ) )
      
      
}

export default ItemLinkViewer;
