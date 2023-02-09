import { CircularProgress } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { stringify } from "zipson";
import { PREVIEW_ITEM_SVG_SIZE } from "../../constants/itemConstants";
import useTranslations from "../../hooks/useTranslations";

const ItemQRCode = ({ itemId }) => {
  const timeoutRef = useRef();
  const item = useSelector((state) => state.listStore.itemsMap[itemId]);
  const { listType, listSubtype } = item;
  // const listAttr = useSelector(
  //   (state) => chooseList(state.listStore.lists, listType, listSubtype).attr
  // );
  const { language } = useTranslations();
  const [qrValue, setQRValue] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(false);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const urlParamsObject = {
        lng: language,
        lt: listType,
        lst: listSubtype,
        // attr: listAttr,
        items: [],
      };
      urlParamsObject.items.push({
        coords: `${item.coords.absCoords.x},${item.coords.absCoords.y},${item.coords.svgCoords.x},${item.coords.svgCoords.y}`,
        pathId: item.pathId,
        em: item.names.enhance_modifier.toString(),
        pre: item.names.prefix.toString(),
        suf: item.names.suffix.toString(),
      });

      setLoader(false);
      const link =
        window.location.origin +
        `?secret=1t5a53cr3t123&data=${stringify(urlParamsObject)}`;
      setQRValue(encodeURI(link));
    }, 2000);
    //eslint-disable-next-line
  }, [language]);

  return (
    <div style={{ position: "relative" }}>
      {loader && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}>
          <CircularProgress size={40} />
        </div>
      )}
      <QRCode
        size={PREVIEW_ITEM_SVG_SIZE}
        value={qrValue}
        style={{ opacity: loader ? 0.5 : 1 }}
      />
    </div>
  );
};

export default ItemQRCode;
