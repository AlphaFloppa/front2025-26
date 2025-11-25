import React, { useState } from "react";
import type { Presentation } from "../../Store/Model/presentation";
import { PreviewArea } from "./../PreviewArea/PreviewArea";
import { Toolbar } from "../Toolbar/Toolbar";
import * as Services from "../../Store/Services/editFunctions";
import style from "./App.module.css";
import { SlideComponent as Slide } from "../../Common/slide/Slide";
import { ContextMenu } from "../../Common/ContextMenu/ContextMenu";
import { ModalWindow } from "../../Common/ModalWindow/modalWindow";
import { useContextMenu, useContextMenuTemplate } from "../../Common/ContextMenu/ContextMenu.hooks";
import { useModalWindow } from "../../Common/ModalWindow/ModalWindow.hooks";
import { useEditor } from "../../hooks/editor.hooks";
import { addSlide, editBackground } from "../../Store/store/action-creators/slide";

function App() {
  const { state: { presentation, selection }, dispatchSlidesChange, dispatchTitleChange } = useEditor();
  const { createWorkplaceSlideCM } = useContextMenuTemplate();
  const { turnOn: enableCM, turnOff: disableCM, state: { isEnabled: isCMEnabled, position: CMPosition, template: CMTemplate } } = useContextMenu();
  const { enableMW, state: { isEnabled: isMWEnabled, type, onApply, onCancel } } = useModalWindow();
  const slideContextMenuHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX: x,  clientY: y } = event;
    enableCM(
      {
        position: { x, y },
        template: createWorkplaceSlideCM(
          [
            () => {                           //для colorpicker
              disableCM();
              enableMW(
                {
                  type: "colorpicker",
                  onApply: (colorCode: string) => { 
                    dispatchSlidesChange(
                      editBackground(
                        selection.selectedSlides[0],
                        {
                          type: "color",
                          code: colorCode
                        }
                      )
                    )
                  },
                  onCancel: () => {
                    alert("MW was closed with canselling changes");
                   }
                }
              )
            },
            () => { disableCM(); },
            () => { disableCM(); }
          ],
          event
        )
      }
    )
  }
  const activeSlideId = selection.selectedSlides[0];
  const activeSlide = Services.verify(presentation.slides.find(slide => slide.id === activeSlideId));
  return (
    <div
      className={style.root}
    >
      { 
        isMWEnabled 
        && (
          <ModalWindow
            destination={type === "colorpicker" ? type : (() => { throw new TypeError })()}
            onApply={onApply ?? (( __: string) => { })}
            onCancel={onCancel ?? (() => { })}
          />
        )
      }
      {
        isCMEnabled
        && (
            <ContextMenu
              position={ CMPosition ?? {x: 0, y: 0} }
              menu={ CMTemplate ?? { options: [] } }
            />
          )
      }
      <div className={style.toolbar2}></div>
      <div className={style.workspaceWrapper}>
        <PreviewArea
          presentation={presentation}
          eventHandlers={{
            addBtn: () => {
              dispatchSlidesChange(
                addSlide(
                  Date.now().toString(),
                  "newSlide"
                )
              )
            },
            changePresentationName: (newName: string) => {
              dispatchTitleChange(newName)
            }
          }}
        />
        <div className = {style.workPlace}>
          <Slide
            slide={activeSlide}
            eventHandlers={{
              click: () => {},
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