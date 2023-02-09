import React, { useRef } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import "./index.css";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { TranslationContext } from "../../contexts/translation";


export default function Editor({ path, onExit, placeholderPhoto, menuItems = ["crop", "rotate"] }) {
  const editorRef = useRef();
  const { uiData } = useContext(TranslationContext);
  return uiData && (
    <div className={"theme-editor-container"}>
      {/* <div className={'img-placeholder'}>
        <img src={placeholderPhoto} alt={'face placeholder'} />
      </div> */}
      <ImageEditor
        includeUI={{
          loadImage: {
            path: path,
            name: "Placeholder Photo",
          },
          //   theme: {styles: defaultStyle},
          menu: menuItems.length > 1 ? menuItems : (menuItems[0] === "crop" ? ["crop"] : ["rotate"]),
          initMenu: menuItems[0] === "crop" ? "crop" : "rotate",
          uiSize: {
            width: "350px",
            height: "470px",
          },
          menuBarPosition: "bottom",
        }}
        ref={editorRef}
        cssMaxHeight={250}
        cssMaxWidth={250}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      />
      <div className={'action-buttons-container'}>
        <Button className={'done-button'} variant={'contained'} color={'primary'} onClick={() => {
          onExit(editorRef.current.getInstance().toDataURL('png', 1))
        }}>
          {uiData.transtext_Done.tr_text}
        </Button>

        <Button className={'done-button'} variant={'contained'} style={{ background: "orangered", color: '#fff' }} onClick={() => {
          onExit(path);

        }}>
          {uiData.transtext_Cancel.tr_text}
        </Button>
      </div>
    </div>
  );
}
