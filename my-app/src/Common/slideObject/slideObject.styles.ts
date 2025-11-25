import type { CSSProperties } from "react";
import type { SlideObject } from "../../Store/Model/slideContent"; 

const setObjectConstantProps = (object: SlideObject) =>
    (
        {
            "--definedPosition": `${object.position.y}% ${object.position.x}%`,
            "--definedWidth": `${object.size.width}%`,
            "--definedHeight": `${object.size.height}%`,
            "--definedLayer": `${object.layer}`
        }
    ) as CSSProperties;

const setObjectVariableProps = (object: SlideObject) =>
(
    object.type === "text"
        ? (
            {
                "--definedTextColor": `${object.color}`,
                "--definedTextFontFamily": `${object.font.fontFamily}`,
                "--definedTextFontSize": `${object.font.fontSize / 20}em`
            } as CSSProperties
        )
        : (
            {
                "--definedImageSource": `url(${object.src})`
            } as CSSProperties
        )
);

const setObjectProps = (object: SlideObject) =>
    (
        {
            ...setObjectConstantProps(object),
            ...setObjectVariableProps(object),
        }
    ) as CSSProperties;

export { 
    setObjectProps
}