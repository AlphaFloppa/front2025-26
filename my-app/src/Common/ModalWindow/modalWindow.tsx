import { useEffect, useRef } from "react";
import { ColorPickerWindow } from "../ColorPickerWindow/ColorPickerWindow";
import style from "./modalWindow.module.css";
import { useModalWindow } from "./ModalWindow.hooks";


type ModalWindowProps = {
    destination: "colorpicker",
    onApply: Function,
    onCancel: Function
};                                

function ModalWindow({ destination, onApply, onCancel }: ModalWindowProps) {
    const { disableMW } = useModalWindow();
    switch (destination) {
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
                                onApply(colorCode);
                                disableMW();
                            }}
                        cancelHandler={
                            (colorCode: string) => {
                                onCancel(colorCode);
                                disableMW();
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