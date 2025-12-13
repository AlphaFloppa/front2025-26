import type { Presentation } from "../../Store/Model/presentation";
import { Button } from "../../Common/Button/Button";
import { PresentationNameEditor } from "../presentationNameEditor/PresentationNameEditor";
import { SlidesList } from "../SlidesList/SlidesList";
import style from "./PreviewArea.module.css";

type PreviewAreaProps = {
    presentation: Presentation,
    eventHandlers:{
        addBtn: Function,
        changePresentationName: Function
    }
}

function PreviewArea(
    { presentation: { name, slides }, eventHandlers}: PreviewAreaProps
) {
    return (
        <div className={style.previewArea}>
            <div className={style.buttonWrapper}>
                <Button clickHandler={() => { eventHandlers.addBtn() }} destination="addSlide" />
            </div>
            <PresentationNameEditor 
                currentName = {name} 
                changeHandler={eventHandlers.changePresentationName}
            />
            <SlidesList list = {slides}/>
        </div>
    );
}

export {
    PreviewArea
}