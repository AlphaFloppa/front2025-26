import React from "react";
import { PreviewArea } from "./../PreviewArea/PreviewArea";
import { Toolbar } from "../Toolbar/Toolbar";
import * as Services from "../../Store/Services/editFunctions";
import style from "./App.module.css";
import { SlideComponent as Slide } from "../../Common/slide/Slide";
import { ContextMenu } from "../../Common/ContextMenu/ContextMenu";
import { ModalWindow } from "../../Common/ModalWindow/modalWindow";
import { useContextMenuTemplate, type useContextMenuTemplateResult } from "../../Common/ContextMenu/ContextMenu.hooks";
import { useEditor } from "../../hooks/editor.hooks";
import type { Presentation } from "../../Store/Model/presentation";

function App() {
  const { useDispatch, useSelector } = useEditor();
  const { createWorkplaceSlideCM } = useContextMenuTemplate();
  const { enableContextMenu, addSlide, changePresentationName } = useDispatch();
  const presentation: Presentation = {
    name: useSelector(state => state.title),
    slides: useSelector(state => state.slides)
  }
  const activeSlideId = useSelector(state => state.slides[0].id);
  const activeSlide = Services.verify(useSelector(state => state.slides).find(slide => slide.id === activeSlideId));
  const slideContextMenuHandler = ({ clientX: x, clientY: y }: React.MouseEvent<HTMLDivElement>) => {
    enableContextMenu(
      createWorkplaceSlideCM(),
      { x, y }
    )
  }
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
            eventHandlers={{
              click: () => { },
              contextMenu: slideContextMenuHandler
            }}
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