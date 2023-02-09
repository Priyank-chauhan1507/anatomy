import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar } from "@material-ui/core";
import { Edit, RefreshOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { ORDERS, SNS_RENDERER } from "../../constants/itemConstants";
import { GROUPED_DIAGNOSIS_TYPES, GROUPED_PROCEDURE_TYPES, LIST_TYPES, PAINTED_DISTRIBUTION_TYPES } from "../../constants/listsConstants";
import { TranslationContext } from "../../contexts/translation";
import useTranslations from "../../hooks/useTranslations";
import { toggleExportTextListModal } from "../../store/slices/modals";
import { chooseList } from "../../utils/helpers";
import { getPinDescriptionText } from "../../utils/pinUtils";

function ExportTextListModal() {
  const {
    state: open,
  } = useSelector((state) => state.modals.exportTextListModal);


  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false)

  const listsOrder = useSelector((state) => state.listStore.listsOrder);
  // const setListsOrder = useCallback(
  //   (newList) => {
  //     dispatch(reorderLists(newList));
  //   },
  //   [dispatch]
  // );

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };


  const { uiData } = useTranslations();
  let inputValue = useRef(null);
  let quill = useRef(null);

  function TextList() {
    return (

      <div style={{ padding: '4px 0px' }} >

        {listsOrder.map(({ listType, listSubtype }) => {
          switch (listType) {
            case LIST_TYPES.ordered.name:
              return <OrderedList key={listType} />;
            case LIST_TYPES.grouped_procedure.name:
              return (
                <GroupedProcedureList
                  key={listType + "-" + listSubtype}
                  subtype={listSubtype}
                />
              );
            case LIST_TYPES.grouped_diagnosis.name:
              return (
                <GroupedDiagnosisList
                  key={listType + "-" + listSubtype}
                  subtype={listSubtype}
                />
              );
            case LIST_TYPES.single_diagnosis.name:
              return <SingleDiagnosisList key={listType} />;
            case LIST_TYPES.comments.name:
              return <CommentsList key={listType} />;
            case LIST_TYPES.defer.name:
              return <DeferList key={listType} />;
            case LIST_TYPES.painted_distribution.name:
              return (
                <PainterDistributionList
                  key={listType + "-" + listSubtype}
                  subtype={listSubtype}
                />
              );
            default:
              return null;
          }
        })}
      </div>

    )
  }

  const [editor, setEditor] = useState(false);

  const editorState = () => {
    if (!editor) {
      if (!text) {
        setEditor(true);
        setText(inputValue.current.innerHTML);
      }
      else setEditor(true);
    }
    else {
      setEditor(false);
    }
  }


  const resetList = () => {
    setText('');
    setEditor(false);
  }
  const handleText = (content) => {
    setText(content);
  }

  const copyHandler = () => {
    setCopied(true)
    if (!editor) {
      const innertext = document.getElementById("dialog-content-summary").innerText
      navigator.clipboard.writeText(innertext)
    }
    else {
      navigator.clipboard.writeText(quill.current.getEditor().getText())
    }
  }


  const [text, setText] = useState();

  return (
    <>
      <Dialog open={open} style={{ height: "500px" }} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => {
        dispatch(toggleExportTextListModal(), setEditor(false));
      }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>
            {uiData?.functionTitle_Export_TextLists?.tr_text}
          </DialogTitle>
          <IconButton disabled={!editor} color={"primary"} style={{ display: "relative", right: 20, top: 4 }} onClick={resetList}  >
            <RefreshOutlined />
          </IconButton>
        </div>

        <DialogContent className='dialog-copy-pins' id="dialog-content-summary"  >
          <>
            {!editor ? <div ref={inputValue}><TextList /></div> : <ReactQuill ref={quill} modules={modules} value={text} onChange={handleText} />}

          </>
        </DialogContent>
        <DialogActions style={{ padding: "0px 24px 12px 12px", display: "flex", justifyContent: "space-between" }}>
          <IconButton
            className={"edit-icon"}
            color={"primary"}
            size={"small"}
            onClick={editorState}>
            <Edit />
          </IconButton>

          <Button variant="contained" onClick={copyHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
            <span style={{ fontWeight: 600, margin: "2px" }}>{uiData?.label_CodeTranslator_CopyAll?.tr_text}</span></Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={copied} onClose={e => setCopied(false)} autoHideDuration={1500} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert variant="filled" severity="success">Copied</Alert>
      </Snackbar>
    </>
  )
}
export default ExportTextListModal;

const Notes = ({ itemId }) => {

  const notes = useSelector((state) => state.listStore.itemsMap[itemId].notes);
  //eslint-disable-next-line
  const [noteState, setNoteState] = useState(notes);
  const { uiData } = useTranslations();

  return (<>
    {noteState.length ? <div><span style={{ fontWeight: "bold" }}>{uiData.transtext_Notes.tr_text}: </span> {noteState}</div> : ""}</>
  )
};

const Ordered1 = ({ itemId }) => {
  return (
    <>
      <NameRenderer itemId={itemId} />
      <div><PinDescriptionRenderer itemId={itemId} /></div>
      <Notes itemId={itemId} />
    </>
  )
}

const OrderedList = () => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.ordered.name].itemsOrder
  );

  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem", }}>
        {uiData[LIST_TYPES.ordered.translation_key].tr_text} {itemsOrder.length && `(${itemsOrder.length})`}
      </div><br />

      {itemsOrder.map(({ id: itemId }) => (<>
        <Ordered1 key={itemId} itemId={itemId} /><br />
      </>
      ))}  <div>______________________________</div>
    </>)
}


const Comments1 = ({ itemId }) => {

  return (
    <>
      <NameRenderer itemId={itemId} />
      <div><PinDescriptionRenderer itemId={itemId} /></div>
      <Notes itemId={itemId} />
    </>
  )
}

const CommentsList = () => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.comments.name].itemsOrder
  );

  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem", }}>
        {uiData[LIST_TYPES.comments.translation_key].tr_text} {itemsOrder.length && `(${itemsOrder.length})`}
      </div><br />

      {itemsOrder.map(({ id: itemId }) => (<>
        <Comments1 key={itemId} itemId={itemId} /> <br /></>
      ))}<div>______________________________</div>
    </>)
}


const Defer1 = ({ itemId }) => {

  return (
    <>
      <NameRenderer itemId={itemId} />
      <div><PinDescriptionRenderer itemId={itemId} /></div>
      <Notes itemId={itemId} />
    </>
  )
}
const DeferList = () => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) => state.listStore.lists[LIST_TYPES.defer.name].itemsOrder
  );

  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem", }}>
        {uiData[LIST_TYPES.defer.translation_key].tr_text} {itemsOrder.length && `(${itemsOrder.length})`}
      </div><br />

      {itemsOrder.map(({ id: itemId }) => (<>
        <Defer1 key={itemId} itemId={itemId} /> <br /></>
      ))}<div>______________________________</div>
    </>)
}

const SingleDiagnosis1 = ({ itemId }) => {

  return (
    <>
      <NameRenderer itemId={itemId} />
      <div><PinDescriptionRenderer itemId={itemId} /></div>
      <Notes itemId={itemId} />
    </>
  )
}

const SingleDiagnosisList = () => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.single_diagnosis.name].itemsOrder
  );

  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        {uiData[LIST_TYPES.single_diagnosis.translation_key].tr_text} {itemsOrder.length && `(${itemsOrder.length})`}
      </div><br />
      {itemsOrder.map(({ id: itemId }) => (<>
        <SingleDiagnosis1 key={itemId} itemId={itemId} /><br /></>
      ))} <div>______________________________</div>
    </>)
}


const GroupedProcedure1 = ({ itemId }) => {

  return (
    <>
      <NameRenderer itemId={itemId} />
      <div><PinDescriptionRenderer itemId={itemId} /></div>
      <Notes itemId={itemId} />
    </>
  )
}
const GroupedProcedureList = ({ subtype }) => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.grouped_procedure.name][subtype]
        .itemsOrder);

  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        {uiData[GROUPED_PROCEDURE_TYPES[subtype].translation_key].tr_text} {itemsOrder.length && `(${itemsOrder.length})`}
      </div><br />
      {itemsOrder.map(({ id: itemId }) => (<>
        <GroupedProcedure1 key={itemId} itemId={itemId} /><br /></>
      ))}  <div>______________________________</div>
    </>)
}


const GroupedDiagnosis1 = ({ itemId }) => {

  return (
    <>
      <NameRenderer itemId={itemId} />
      <div><PinDescriptionRenderer itemId={itemId} /></div>
      <Notes itemId={itemId} />
    </>
  )
}

const GroupedDiagnosisList = ({ subtype }) => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.grouped_diagnosis.name][subtype]
        .itemsOrder
  );

  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        {uiData[GROUPED_DIAGNOSIS_TYPES[subtype].translation_key].tr_text} {itemsOrder.length && `(${itemsOrder.length})`}
      </div><br />
      {itemsOrder.map(({ id: itemId }) => (<>
        <GroupedDiagnosis1 key={itemId} itemId={itemId} /><br /></>
      ))} <div>______________________________</div>
    </>)
}


const PainterDistribution1 = ({ itemId }) => {

  return (
    <>
      <NameRenderer itemId={itemId} />
      <div><PinDescriptionRenderer itemId={itemId} /></div>
      <Notes itemId={itemId} />
    </>
  )
}
const PainterDistributionList = ({ subtype }) => {
  const { uiData } = useTranslations();
  const itemsOrder = useSelector(
    (state) =>
      state.listStore.lists[LIST_TYPES.painted_distribution.name][subtype]
        .itemsOrder
  );

  return (
    <>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        {
          uiData[PAINTED_DISTRIBUTION_TYPES[subtype].translation_key]?.tr_text ||
          PAINTED_DISTRIBUTION_TYPES[subtype].default_label
        } {itemsOrder.length && `(${itemsOrder.length})`}
      </div><br />
      {itemsOrder.map(({ id: itemId }) => (<>
        <PainterDistribution1 key={itemId} itemId={itemId} /><br /></>
      ))}<div>______________________________</div>
    </>)
}

const NameRenderer = ({ itemId }) => {

  const { names, listType, listSubtype } = useSelector(
    (state) => state.listStore.itemsMap[itemId]
  )
  const index = useSelector((state) => state.listStore.itemsOrderMap[itemId])
  //eslint-disable-next-line
  const { order, shape } = useSelector(
    (state) => chooseList(state.listStore.lists, listType, listSubtype).attr
  )
  const sns = useSelector(
    (state) =>
      state.listStore.customSNS[itemId] ||
      (listType === LIST_TYPES.painted_distribution.name
        ? state.listStore.distributionSNS
        : state.listStore.globalSNS)
  )
  const { lateralityData, uiData, anatomicData } =
    useContext(TranslationContext);
  const trData = { lateralityData, uiData, anatomicData };
  const [visibilityMap, setVisibilityMap] = useState(new Set());

  useEffect(() => {
    const newVisibilityMap = new Set();
    sns.orderList.forEach(({ id, visible }) => {
      if (visible) {
        newVisibilityMap.add(id);
      }
    });
    setVisibilityMap(newVisibilityMap);
  }, [sns]);

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
    .filter(({ visible }) => {
      return visible;
    });

  return (
    <>
      {<span style={{ fontWeight: "bold", }}> {order && order !== "--" ? `${ORDERS[order].resolve(index)}.` : "--"}</span>}
      <span> {orderList.map(
        ({ id, pre, post, value }, Index) => {
          if (
            id !== "optional_separator" ||
            (id === "optional_separator" && Index !== orderList.length - 1)
          ) {
            return (
              Boolean(value) && (
                <span key={id} style={{ fontWeight: 500, wordSpacing: "2px" }}> {pre}  {value}  {post}  </span>

              )
            );
          } else return null;
        }
      )}</span>
    </>
  )
}

const PinDescriptionRenderer = ({ itemId }) => {
  const { uiData } = useTranslations();
  const descriptions = useSelector(
    (state) => state.listStore.itemsMap[itemId].descriptions
  );
  const descriptionText = getPinDescriptionText(descriptions);
  const color = useSelector((state) => {
    if (!itemId) return "";
    const { listType, listSubtype } = state.listStore.itemsMap[itemId];
    return chooseList(state.listStore.lists, listType, listSubtype).attr.color;
  });
  return (
    <div
      style={{ color: descriptionText === "" ? "" : color, }}>
      {descriptionText
        ? descriptionText
        : uiData.label_PinDescription_No.tr_text || "No pin description"}
    </div>
  )
};