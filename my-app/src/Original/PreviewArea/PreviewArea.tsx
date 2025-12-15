import { Button } from "../../Common/Button/Button";
import { useEditor } from "../../hooks/editor.hooks";
import { PresentationNameEditor } from "../presentationNameEditor/PresentationNameEditor";
import { SlidesList } from "../SlidesList/SlidesList";
import style from "./PreviewArea.module.css";

const PreviewArea = () => {
    const { useDispatch } = useEditor();
    const { addSlide } = useDispatch();
    return (
        <div className={style.previewArea}>
            <div className={style.buttonWrapper}>
                <Button
                    clickHandler={
                        () => {
                            addSlide(
                                Date.now.toString(),
                                "newSlide"
                            )
                        }
                    }
                    destination="addSlide"
                />
            </div>
            <PresentationNameEditor />
            <SlidesList />
        </div>
    );
}

export {
    PreviewArea
}