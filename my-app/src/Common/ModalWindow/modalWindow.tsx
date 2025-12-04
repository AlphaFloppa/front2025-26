import { useEffect, useRef } from "react";
import { ColorPickerWindow } from "../ColorPickerWindow/ColorPickerWindow";
import style from "./modalWindow.module.css";
import { useEditor } from "../../hooks/editor.hooks";            

function ModalWindow() {
    const { useSelector, useDispatch } = useEditor();
    const { isEnabled, type, onApply, onCancel } = useSelector(state => state.modalWindow);
    const { disableModalWindow } = useDispatch();
    if (!isEnabled) { 
        return <></>
    }
    switch (type) {
        case "colorpicker": {
            const dialogDOMNodeRef = useRef<HTMLDialogElement | null>(null);
            useEffect(
                () => {
                    dialogDOMNodeRef.current?.showModal();
                }
            )
            return (
                <dialog
                    className={style.dialog}
                    ref={dialogDOMNodeRef}
                >
                    <ColorPickerWindow
                        applyHandler={
                            (colorCode: string) => {
                                onApply?.(colorCode);
                                disableModalWindow();
                        }}
                        cancelHandler={
                            () => {
                                onCancel?.();
                                disableModalWindow();
                            }
                        }
                    />
                </dialog>
            )
        }
        default:
            {
                console.warn("вызвано другое модальное окно, не colorPicker");
                return (<></>);
            }
    }
}

export {
    ModalWindow
}