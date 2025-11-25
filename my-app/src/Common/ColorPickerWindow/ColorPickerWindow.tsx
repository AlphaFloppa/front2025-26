import { Button } from "../Button/Button";
import { RadialColorPicker } from "../RadialColorPicker/RadialColorPicker";
import { useRef } from "react";
import style from "./colorPicker.module.css";

type ColorPickerProps = {
    applyHandler: Function,
    cancelHandler: Function
}

function ColorPickerWindow({ applyHandler, cancelHandler }: ColorPickerProps) {
    const radialGradient = useRef<HTMLSpanElement | null>(null);
    return (
        <div className={style.menu}>
            <RadialColorPicker ref={radialGradient} />
            <div className={style.buttonsGroup}>
                <Button
                    clickHandler={
                        () => {
                            cancelHandler();
                        }
                    }
                    destination="cancel"
                />
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
            </div>
        </div>
    )
}

export {
    ColorPickerWindow
}