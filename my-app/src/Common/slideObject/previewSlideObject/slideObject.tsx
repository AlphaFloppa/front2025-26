import { type SlideObject as SlideObjectType } from "../../../Store/Model/slideContent";
import style from "../SlideObject.module.css";
import { useEditor } from "../../../hooks/editor.hooks";
import { useStyle } from "../slideObject.styles";
import type React from "react";
import { useRef } from "react";

type SlideObjectProps = {
    object: SlideObjectType,
    containerRef: React.RefObject<HTMLDivElement | null>
}

const SlideObject = ({ object, containerRef }: SlideObjectProps) => {
    const { useSelector } = useEditor();
    const isSelected = useSelector(state => state.selection.selectedSlideObjects).some(
        selectedSlideObjectId => selectedSlideObjectId === object.id
    );
    const objectDOMNodeRef = useRef<HTMLTextAreaElement | HTMLDivElement | null>(null);
    useStyle(
        object,
        objectDOMNodeRef,
        containerRef
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
                            <textarea
                                readOnly={true}
                                tabIndex={-1}
                                contentEditable={false}
                                className={`${style.text} ${style.focusable} ${isSelected ? style.selected : null}`}
                                value={object.content}
                            >
                                </textarea>
                        </div>

                    )
                    : (
                        <div
                            ref={objectDOMNodeRef as React.RefObject<HTMLDivElement>}
                            className={`${style.image} ${style.focusable} ${isSelected ? style.selected : null}`}
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