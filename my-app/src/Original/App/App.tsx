import React, { useState } from "react";
import type { Presentation } from "../../Store/Model/presentation";
import { PreviewArea } from "./../PreviewArea/PreviewArea";
import { Toolbar } from "../Toolbar/Toolbar";
import * as Services from "../../Store/Services/editFunctions";
import style from "./App.module.css";
import { SlideComponent as Slide } from "../../Common/slide/Slide";
import { dispatchContextMenuOff, dispatchContextMenuOn, dispatchPresentation, nullifySlideObjectsSelection } from "../../Store/Model/editor";
import { editor, type Editor } from "../../Store/Model/editor"; 
import { ContextMenu } from "../../Common/ContextMenu/ContextMenu";
import type { ContextMenu as ContextMenuType} from "../../Store/Model/contextMenu";
import { getClickRelativePositionAtSlide } from "../../Common/slide/Slide";
import { ModalWindow } from "../../Common/ModalWindow/modalWindow";
import { useContextMenu } from "../../Common/ContextMenu/ContextMenu.hooks";

type AppProps = {
  editor: Editor
};

let addSlideBtnHandler = (presentation: Presentation): Presentation => 
  Services.addSlide(
    presentation,
    {
      slide: Services.createSlide(
        { id: Date.now().toString() }
      )
    }
  )

const ModalWindowContext = React.createContext<Function>(() => { });

function App(
  { editor: { presentation, selection, eventHandlers, contextMenu } }: AppProps
) {
  const [MWState, setMWState] = useState<{ isEnabled: boolean, destination?: "colorpicker" }>({ isEnabled: false });
  const { turnOn: enableCM, turnOff: disableCM, state: { isEnabled: isCMEnabled, position: CMPosition, template: CMTemplate } } = useContextMenu();
  const activeSlideId = selection.selectedSlides[0];
  const activeSlide = Services.verify(presentation.slides.find(slide => slide.id === activeSlideId));
  return (
    <>
    <ModalWindowContext.Provider value={setMWState}>
    {MWState.isEnabled && <ModalWindow destination={MWState.destination ?? "others"} />}
    <div
      className={style.root}
      onClick={                   
        (e) => {
          dispatchContextMenuOff();              
          //отключение всех контекстных меню вне зависимости от точки нажатия
          // (у опций менюшек отключение всплытия поэтому на них это не сработает)
          if (e.target === e.currentTarget) {       //обнуляем все выделения объектов при нажатии конкретно на область слайда
            nullifySlideObjectsSelection();         // но не объекта
          }
        }
      }
    >
      {
        isCMEnabled
        && (
            <ContextMenu
              position={ CMPosition }
              menu={ CMTemplate }
            />
          )
      }
      <div className={style.toolbar2}></div>
      <div className={style.workspaceWrapper}>
        <PreviewArea
          presentation={presentation}
          eventHandlers={{
            addBtn: () => {
              dispatchPresentation(
                () => addSlideBtnHandler(presentation) 
              )
            },
            changePresentationName: (newName: string) => {
              console.info(newName);
              dispatchPresentation(
                () => Services.renamePresentation(presentation, { newName: newName })
              )
            }
          }}
        />
        <div className = {style.workPlace}>
          <Slide
            slide={activeSlide} slideIndex={0}
            eventHandlers={{
              click: () => {
                console.info("id = " + activeSlide.id + "\nindex = " + editor.presentation.slides.indexOf(activeSlide))
              },
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
      </ModalWindowContext.Provider>
    </>
  );
}

export {
  App,
  ModalWindowContext
}

/*
const slideContextMenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {        //обработчик нажатия ПКМ по слайду
    let { currentTarget } = e;
    const slideContextMenuTemplate: ContextMenu = {     //модель контекстного меню
        options: [                                     
            {
                name: "Изменить фон",
                clickHandler: () => { }
            },
            {
                name: "Создать текст",
                clickHandler: () => {
                    dispatchPresentation(
                        () => addObjectToSlide(
                                  editor.presentation,
                                    {
                                        slideId: editor.selection.selectedSlides[0],
                                        object: createTextObject(
                                            {
                                                id: Date.now().toString(),
                                                position: getClickRelativePositionAtSlide(e, currentTarget)
                                            }
                                        )
                                    }
                                )
                    )
                }
            },
            {
                name: "Импортировать изображение",
                clickHandler: (uploadedImageUrl: string) => {              //компонент гарантирует передачу файла в обработчик извне
                    console.log(uploadedImageUrl);
                    dispatchPresentation(
                        () => addObjectToSlide(
                            editor.presentation,
                            {
                                slideId: editor.selection.selectedSlides[0],
                                object: createImageObject(
                                    {
                                        id: Date.now().toString(),
                                        position: getClickRelativePositionAtSlide(e, currentTarget), 
                                        src: uploadedImageUrl
                                    }
                                )
                            }
                        )
                    )
                },
                isForUpload: true
            }
        ]
    };
    dispatchContextMenuOn(slideContextMenuTemplate, { x: e.clientX, y: e.clientY })   //изменение view для отображения по шаблону
}*/