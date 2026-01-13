import { Button } from "../../Common/Button/Button";
import { useEditor } from "../../hooks/editor.hooks";
import { PresentationNameEditor } from "../presentationNameEditor/PresentationNameEditor";
import { SlidesList } from "../SlidesList/SlidesList";
import style from "./PreviewArea.module.css";

const PreviewArea = () => {
    const { useDispatch } = useEditor();
    const { addSlide } = useDispatch();
    const addSlideHandler = () => {
        addSlide(
            {
                id: crypto.randomUUID(),
            }
        )
    };
    return (
        <div className={style.previewArea}>
            <div className={style.upperContainer}>
                <PresentationNameEditor />
                <div className={style.buttonWrapper}>
                    <Button
                        clickHandler={ addSlideHandler }
                        destination="addSlide"
                    />
                </div>
            </div>
            <SlidesList />
        </div>
    );
}

export {
    PreviewArea
}