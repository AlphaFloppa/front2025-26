import { Button } from "../Button/Button";
import { RadialColorPicker } from "../RadialColorPicker/RadialColorPicker";
import { useCallback, useState } from "react";
import style from "./colorPicker.module.css";


type ColorPickerProps = {
    applyHandler: (colorCode: string) => void,
    cancelHandler: () => void
}

function ColorPickerWindow({ applyHandler, cancelHandler }: ColorPickerProps) {
    const [targetColor, setTargetColor] = useState<string>("");
    const changeHandler = useCallback(
        (code: string) => {
            setTargetColor(code);
        },
        [setTargetColor]
    );
    return (
        <div className={style.menu}>
            <RadialColorPicker onChange={changeHandler} />
            <div className={style.buttonsGroup}>
                <Button
                    clickHandler={cancelHandler}
                    destination="cancel"
                />
                <Button
                    clickHandler={
                        () => {
                            applyHandler(targetColor)
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