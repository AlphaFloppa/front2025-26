import type { Presentation } from "../../Store/Model/presentation"
import type { Slide } from "../../Store/Model/slide"
import {PreviewArea} from "./../PreviewArea/PreviewArea"
import './App.css'

export function App(
  props: {
    static: {
      btnIcons:{
        addText: Image,
            addImg: Image,
            editFontFamily: Image,
            editFontSize: Image
      }
    }
    eventHandlers: {
      addText: Function,
      addImage: Function,
      editFontFamily: Function,
      editFontSize: Function,
      changePresentationName: Function,
      addSlideBtn: Function
    },
    addSlideBtnIconSrc: string, 
    activeSlide: Slide,
    presentation: Presentation
  }
) {
  return
    <>
      <div className='workspace-wrapper'>
        <PreviewArea 
          presentationName = {props.presentation.name} 
          eventHandlers = {{
            addBtn: () => props.eventHandlers.addSlideBtn,
            changePresentationName: () => props.eventHandlers.changePresentationName
          }}
          addSlideBtnIconSrc = {props.addSlideBtnIconSrc}
          slides = {props.presentation.slides}
        />
        <WorkPlace
          slide = {props.activeSlide}
        />
      </div>
      <Toolbar
        icons = {{...props.static.btnIcons}}
        eventHandlers = {{...props.eventHandlers}}
      />
    </>
}