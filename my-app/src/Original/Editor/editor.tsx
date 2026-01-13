import { PreviewArea } from "../PreviewArea/PreviewArea";
import { Toolbar } from "../Toolbar/Toolbar";
import * as Services from "../../Store/Services/editFunctions";
import style from "./editor.module.css";
import { SlideComponent as Slide } from "../../Common/slide/Slide";
import { ContextMenu } from "../../Common/ContextMenu/ContextMenu";
import { ModalWindow } from "../../Common/ModalWindow/modalWindow";
import { useEditor } from "../../hooks/editor.hooks";
import { useUndoRedo } from "../../hooks/undo_redo.hooks";
import { useEffect } from "react";

function Editor() {
  const { useDispatch, useSelector } = useEditor();
  const firstSlideId = useSelector(state => state.slides[0].id);
  const { selectSlide } = useDispatch();
  useEffect(
    () => {
      selectSlide(
        {
          id: firstSlideId
        }
      )
    },
    []
  );
  //селектим первый слайд при загрузке компонента (открытие презентации)
  const activeSlideId = useSelector(state => state.selection.selectedSlides[0]);
  const activeSlide = Services.verify(
    useSelector(
      state => state.slides
    ).find(
      slide => slide.id === activeSlideId
    )
  );
  useUndoRedo();
  
  return (
    <div
      className={style.root}
    >
      <ModalWindow />
      <ContextMenu />
      <div className={style.workspaceWrapper}>
        <PreviewArea />
        <div className={style.workplace}>
          <div className={style.slideWrapper}>
            <Slide
              slide={activeSlide}
            />
          </div>
        </div>
      </div>
      <Toolbar />
    </div>
  );
}

export {
  Editor
}