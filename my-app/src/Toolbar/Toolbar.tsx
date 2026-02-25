import { Button } from "../Button/Button";
import style from "../Toolbar/Toolbar.module.css";
import { useEditor } from "../hooks/editor.hooks";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Toolbar = () => {
    const deltaTextSize = 3;
    const MAXSIZE = 200;
    const MINSIZE = 0;
    const { useDispatch, useSelector } = useEditor();
    const { undo, redo, editFontSize, enableModalWindow, editTextColor } = useDispatch();
    const navigate = useNavigate();
    const selectedSlideId = useSelector(state => state.selection.selectedSlides[0]);
    const selectedObjectId = useSelector(state => state.selection.selectedSlideObjects[0]);
    const selectedObject = useSelector(state => state.slides)
        .find(({ id }) => id === selectedSlideId)?.objects
        .find(({ id }) => id === selectedObjectId);
    let fontSize = null;
    if (selectedObject && selectedObject.type === "text") {
        fontSize = selectedObject.font.fontSize;
    }
    const colorizeTextHandler = () => {
        const onApply = (colorCode: string) => {
            editTextColor(
                {
                    id: selectedSlideId,
                    objectId: selectedObjectId,
                    newColor: colorCode
                }
            )
        }
        enableModalWindow(
            {
                type: "colorpicker",
                onApply,
                onCancel: () => { }
            }
        )
    }
    const fontSizeIncrement = useCallback(
        () => {
            if (!fontSize || fontSize + deltaTextSize > MAXSIZE) {
                return;
            }
            editFontSize(
                {
                    id: selectedSlideId,
                    objectId: selectedObjectId,
                    newFontSize: fontSize + deltaTextSize
                }
            )
        },
        [fontSize, selectedSlideId, selectedObjectId, editFontSize]
    );
    const fontSizeDecrement = useCallback(
        () => {
            if (!fontSize || fontSize - deltaTextSize < MINSIZE) {
                return;
            }
            editFontSize(
                {
                    id: selectedSlideId,
                    objectId: selectedObjectId,
                    newFontSize: fontSize - deltaTextSize
                }
            )
        },
        [fontSize, selectedSlideId, selectedObjectId, editFontSize]
    );
    return (
        <div className={style.toolbar}>
            <section className={style.section}>
                <Button clickHandler={undo} destination="undo" />
                <Button clickHandler={redo} destination="redo" />
            </section>
            {
                selectedObject && selectedObject.type === "text" &&
                (
                    <>
                        <section className={style.section}>
                            <Button clickHandler={fontSizeDecrement} destination="decrementFontSize" />
                            <span style={{ color: "white", fontSize: "1.3rem" }}>
                                {fontSize}
                            </span>
                            <Button clickHandler={fontSizeIncrement} destination="incrementFontSize" />
                            <Button destination="colorizeText" clickHandler={colorizeTextHandler} />
                        </section>
                    </>
                )
            }
            <section className={style.section}>
                <Button clickHandler={() => navigate("/overview")} destination="overview" />
            </section >
        </div>
    );
}

export {
    Toolbar
}