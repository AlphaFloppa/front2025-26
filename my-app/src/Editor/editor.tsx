import { PreviewArea } from "../PreviewArea/PreviewArea";
import { Toolbar } from "../Toolbar/Toolbar";
import style from "./editor.module.css";
import { SlideComponent as Slide } from "../slide/Slide";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { ModalWindow } from "..//ModalWindow/modalWindow";
import { useEditor } from "../hooks/editor.hooks";
import { useUndoRedo } from "../hooks/undo_redo.hooks";
import { useEffect } from "react";
import { UpperPanel } from "../UpperPanel/upperPanel";

function Editor() {
  const { useDispatch, useSelector } = useEditor();
  const firstSlideId = useSelector(state => state.slides.length !== 0 ? state.slides[0].id : "");
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
  const activeSlideId = useSelector(state => state.selection.selectedSlides[0]);
  const activeSlide = (
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
      <UpperPanel/>
      <div className={style.workspaceWrapper}>
        <PreviewArea />
        <div className={style.workplace}>
          <div className={style.slideWrapper}>
            {
              activeSlide
                && (
                  <Slide
                    slide={activeSlide}
                  />
                )
            }
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