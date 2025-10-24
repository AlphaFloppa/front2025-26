import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "./RadialColorPicker.hooks";
import style from "./RadialColorPicker.module.css";

const RBGToHex = ({r, g, b}: { r: number, g: number, b: number }) => { 
    return "#" + [r, g, b].reduce((accumulator, value) => {
        return accumulator + value.toString(16).padStart(2, '0')
    }, '');
};

const getMixedColor = ([lower, upper]: { r: number, g: number, b: number }[], offsetProgress: number) => { 
    const newR = Math.round(lower.r + (upper.r - lower.r) * offsetProgress);
    const newG = Math.round(lower.g + (upper.g - lower.g) * offsetProgress);
    const newB = Math.round(lower.b + (upper.b - lower.b) * offsetProgress);
    return {
        r: newR,
        g: newG,
        b: newB
    };
};

const AngleToColor = (angle: number): string | null => {
    const rainbowColors = [
        { name: "chartreuse", rgb: { r: 127, g: 255, b: 0 }, angle: 0 },
        { name: "yellow", rgb: { r: 255, g: 255, b: 0 }, angle: 30 },
        { name: "orange", rgb: { r: 255, g: 165, b: 0 }, angle: 60 },
        { name: "red", rgb: { r: 255, g: 0, b: 0 }, angle: 90 },
        { name: "crimson", rgb: { r: 220, g: 20, b: 60 }, angle: 120 },
        { name: "pink", rgb: { r: 255, g: 105, b: 180 }, angle: 150 },
        { name: "magenta", rgb: { r: 255, g: 0, b: 255 }, angle: 180 },
        { name: "blue", rgb: { r: 0, g: 0, b: 255 }, angle: 210 },
        { name: "cyanBlue", rgb: { r: 0, g: 128, b: 255 }, angle: 240 },
        { name: "cyan", rgb: { r: 0, g: 255, b: 255 }, angle: 270 },
        { name: "springGreen", rgb: { r: 0, g: 255, b: 127 }, angle: 300 },
        { name: "green", rgb: { r: 0, g: 255, b: 0 }, angle: 330 },
        { name: "chartreuse", rgb: { r: 127, g: 255, b: 0 }, angle: 360 },
    ];
    for (let i = 0; i <= 11; ++i) { 
        if (angle >= rainbowColors[i].angle && angle < rainbowColors[i + 1].angle) { 
            const lowerColor = rainbowColors[i];
            const upperColor = rainbowColors[i + 1];
            const offsetAtPrevProgress = (angle - rainbowColors[i].angle) / 30;
            return RBGToHex(
                getMixedColor([lowerColor.rgb, upperColor.rgb], offsetAtPrevProgress)
            );
        }
    }
    return null;
};



const RadialColorPicker = forwardRef<HTMLSpanElement, {}>(
    (props, ref) => {
        const [color, setColor] = useState<string | null>("#ff0000");
        const [isDragged, setIsDragged] = useState(false);
        const outputText = useRef<HTMLSpanElement>(null);
        useEffect(() => {
            if (outputText.current) {
                outputText.current.textContent = color ?? "";
                outputText.current.style.color = color ?? "";
            }
        }, [color]);
        const colorPickHandler = ({ nativeEvent: { offsetX: x, offsetY: y, target: colorPickerDIV } }: React.MouseEvent<HTMLDivElement>) => {
            const {
                clientWidth: width,
                clientHeight: height
            } = colorPickerDIV as HTMLDivElement;
            const coordinateOffsetY = -y + height / 2;
            const coordinateOffsetX = x - width / 2;
            const targetAngle = Math.atan2(coordinateOffsetY, coordinateOffsetX) * 180 / Math.PI;
            const normalizedTargetAngle = targetAngle < 0 ? targetAngle + 360 : targetAngle;
            const targetColor = AngleToColor(normalizedTargetAngle);
            setColor(targetColor);
        };
        const optimizatedColorPickHandler = useAnimationFrame(colorPickHandler);

        return (
            <div className={style.container}>
                <div className={style.gradientBox}
                    onMouseDown={
                        (e) => {
                            e.stopPropagation();
                            setIsDragged(true);
                            if (outputText.current) {
                                outputText.current.style.willChange = "color";
                            }
                            optimizatedColorPickHandler(e);
                        }
                    }
                    onMouseMove={
                        (e) => {
                            if (!isDragged) {
                                return;
                            }
                            e.stopPropagation();
                            optimizatedColorPickHandler(e);
                        }
                    }
                    onMouseUp={
                        () => {
                            setIsDragged(false);
                            if (outputText.current) {
                                outputText.current.style.willChange = "auto";
                            }
                        }
                    }
                >
                    <span
                        ref={(node) => {
                            if (node) {
                                outputText.current = node;
                                if (typeof ref !== "function" && ref) {                                
                                    ref.current = node;
                                }
                            }
                        }}
                        className={style.colorCode}>
                    </span>
                </div>
            </div>
        );
});

export {
    RadialColorPicker
}