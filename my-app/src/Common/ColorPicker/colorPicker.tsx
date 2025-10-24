import { Button } from "../Button/Button";
import { RadialColorPicker } from "../RadialColorPicker/RadialColorPicker";
import { useRef } from "react";
import style from "./colorPicker.module.css";

type ColorPickerProps = {
    applyHandler: Function,
    cancelHandler: Function
}

function ColorPicker({ applyHandler, cancelHandler }: ColorPickerProps) { 
    const radialGradient = useRef<HTMLSpanElement | null>(null);
    return (
        <div className={ style.menu }>
            <RadialColorPicker ref={ radialGradient } />
            <Button
                clickHandler={
                    () => {
                        if (radialGradient.current) { 
                            applyHandler(radialGradient.current.style.color)
                        }
                    }
                }
                destination="apply"
            
            />
            <Button
                clickHandler={cancelHandler}
                destination="cancel"
            />
        </div>
    )
}

export {
    ColorPicker
}