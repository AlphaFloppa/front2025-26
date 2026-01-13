import { type SlideObject as SlideObjectType } from "../../../Store/Model/slideContent";
import style from "../SlideObject.module.css";
import { useStyle } from "../slideObject.styles";
import type React from "react";
import { useRef } from "react";

type SlideObjectProps = {
    object: SlideObjectType
}

const SlideObject = ({ object }: SlideObjectProps) => {
    const objectDOMNodeRef = useRef<HTMLTextAreaElement | HTMLDivElement | null>(null);
    useStyle(
        object,
        objectDOMNodeRef
    );
    return (
        <>
            {
                object.type === "text"
                    ? (
                        <div
                            ref={objectDOMNodeRef as React.RefObject<HTMLDivElement>}
                            className={style.textWrapper}
                        >
                            <span
                                className={`${style.text} ${style.focusable}`}
                            >
                                {object.content}
                                </span>
                        </div>

                    )
                    : (
                        <div
                            ref={objectDOMNodeRef as React.RefObject<HTMLDivElement>}
                            className={`${style.image} ${style.focusable}`}
                        >
                        </div>
                    )
            }
        </>
    );
}

export {
    SlideObject as LiteSlideObject
}