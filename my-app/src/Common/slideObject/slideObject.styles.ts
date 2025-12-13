import type { SlideObject } from "../../Store/Model/slideContent";
import type React from "react";
import { getClickRelativePositionAtSlide } from "../slide/Slide";
import { useCallback, useEffect } from "react";

const setObjectConstantProps = (
    object: SlideObject,
    objectRef: React.RefObject<HTMLDivElement | HTMLTextAreaElement | null>,
    containerRef: React.RefObject<HTMLDivElement | null>
) => {
    const position = getClickRelativePositionAtSlide(
        {
            offsetX: object.position.x,
            offsetY: object.position.y
        },
        containerRef.current
    );
    objectRef.current?.style.setProperty(
        "--definedPositionX",
        `${position.x}%`
    );
    objectRef.current?.style.setProperty("--definedPositionY", `${position.y}%`);
    objectRef.current?.style.setProperty("--definedWidth", `${object.size.width}%`);
    objectRef.current?.style.setProperty("--definedHeight", `${object.size.height}%`);
    objectRef.current?.style.setProperty("--definedLayer", `${object.layer}`);
};

const setObjectVariableProps = (
    object: SlideObject,
    objectRef: React.RefObject<HTMLDivElement | HTMLTextAreaElement | null>
) => {
    if (object.type === "text") {
        objectRef.current?.style.setProperty("--definedTextColor", `${object.color}`);
        objectRef.current?.style.setProperty("--definedTextFontFamily", `${object.font.fontFamily}`);
        objectRef.current?.style.setProperty("--definedTextFontSize", `${object.font.fontSize / 20}em`);
    }
    else {
        objectRef.current?.style.setProperty("--definedImageSource", `url(${object.src})`)
    }
};

const useStyle =
    (
        object: SlideObject,
        objectRef: React.RefObject<HTMLDivElement | HTMLTextAreaElement | null>,
        containerRef: React.RefObject<HTMLDivElement | null>
    ) => {
        useEffect(
            () => {
                setObjectConstantProps(object, objectRef, containerRef);
                setObjectVariableProps(object, objectRef);
            }
        )
    };

export {
    useStyle
}