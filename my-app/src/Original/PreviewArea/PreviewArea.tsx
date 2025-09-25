import type { Slide } from "../../Store/Model/slide";

export function PreviewArea(
    props: {
        presentationName: string,
        addSlideBtnIconSrc: string,
        slides: Slide[], 
        eventHandlers:{
            addBtn: Function,
            changePresentationName: Function
        }
    }
){
    return
        <>
            <Button clickHandler = {() => props.eventHandlers.addBtn} iconSrc = {props.addSlideBtnIconSrc}/>
            <PresentationNameField 
                name = {props.presentationName} 
                changeHandler = {() => props.eventHandlers.changePresentationName}
            />
            <SlidesList list = {props.slides}/>
        </>;
}