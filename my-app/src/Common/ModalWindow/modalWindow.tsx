import { useContext } from "react";
import { dispatchPresentation, editor } from "../../Store/Model/editor";
import { editBackground } from "../../Store/Services/editFunctions";
import { ModalWindowContext } from "../../Original/App/App";
import { ColorPicker } from "../ColorPicker/colorPicker";


type ModalWindowProps = {
    destination: "colorpicker" | "others"
}

function ModalWindow({ destination }: ModalWindowProps) { 
    switch(destination){ 
        case "colorpicker": { 
            const turnMWOff = () => { useContext(ModalWindowContext)(false) };
            const applyHandler = (colorCode: string) => {
                dispatchPresentation(
                    () => editBackground(
                        editor.presentation,
                        {
                            slideId: editor.selection.selectedSlides[0],
                            bg: {
                                type: "color",
                                code: colorCode
                            }
                        }
                    ));
                turnMWOff();
            };
            const cancelHandler = turnMWOff;
            return (
                <dialog>
                    <ColorPicker
                        applyHandler={applyHandler}
                        cancelHandler={cancelHandler}
                    />
                </dialog>
            )
        }
        default: 
           return (<></>)
    }
}

export {
    ModalWindow
}