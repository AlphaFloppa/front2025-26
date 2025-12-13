import { PreviewArea } from "./../PreviewArea/PreviewArea";
import { Toolbar } from "../Toolbar/Toolbar";
import * as Services from "../../Store/Services/editFunctions";
import style from "./App.module.css";
import { SlideComponent as Slide } from "../../Common/slide/Slide";
import { ContextMenu } from "../../Common/ContextMenu/ContextMenu";
import { ModalWindow } from "../../Common/ModalWindow/modalWindow";
import { useEditor } from "../../hooks/editor.hooks";
import type { Presentation } from "../../Store/Model/presentation";
import { useUndoRedo } from "../../hooks/undo_redo.hooks";

function App() {
  const { useDispatch, useSelector } = useEditor();
  const { addSlide, changePresentationName } = useDispatch();
  const name = useSelector(state => state.title);
  const slides = useSelector(state => state.slides);
  const activeSlideId = useSelector(state => state.slides[0].id);
  const presentation: Presentation = {
    name,
    slides
  };
  const activeSlide = Services.verify(useSelector(state => state.slides).find(slide => slide.id === activeSlideId));
  useUndoRedo();
  return (
    <div
      className={style.root}
    >
      <ModalWindow />
      <ContextMenu />
      <div className={style.toolbar2}></div>
      <div className={style.workspaceWrapper}>
        <PreviewArea
          presentation={presentation}
          eventHandlers={{
            addBtn: () => {
              addSlide(
                Date.now().toString(),
                "newSlide"
              )
            },
            changePresentationName
          }}
        />
        <div className={style.workPlace}>
          <Slide
            slide={activeSlide}
          />
        </div>
      </div>
      <Toolbar
        eventHandlers={
          {
            addText: () => console.info("addText was pressed"),
            addImage: () => console.info("addImage was pressed"),
            editFontFamily: () => console.info("editFontFamily was pressed"),
            editFontSize: () => console.info("editFontSize was pressed")
          }
        }
      />
    </div>
  );
}

export {
  App
}