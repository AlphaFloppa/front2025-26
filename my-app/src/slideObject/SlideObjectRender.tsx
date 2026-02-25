import { forwardRef, useState, type ChangeEvent, type MouseEventHandler, useRef, useCallback } from "react";
import type { SlideObject } from "../Store/Model/slideContent";
import { useEditor } from "../hooks/editor.hooks";
import style from "./SlideObject.module.css";
import controlsStyle from "./slideObjectControl.module.css";
import { useStyle } from "./slideObject.styles";

type ControlRefs = {
    rightUpper: React.RefObject<HTMLDivElement | null>,
    rightMiddle: React.RefObject<HTMLDivElement | null>
    rightLower: React.RefObject<HTMLDivElement | null>
    leftLower: React.RefObject<HTMLDivElement | null>
    leftMiddle: React.RefObject<HTMLDivElement | null>
    leftUpper: React.RefObject<HTMLDivElement | null>
    upperMiddle: React.RefObject<HTMLDivElement | null>
    lowerMiddle: React.RefObject<HTMLDivElement | null>
}

type SlideObjectRenderProps = {
    type: "editable",
    object: SlideObject,
    controlsRefs: ControlRefs
    onClick: MouseEventHandler<HTMLElement>,
    onContextMenu: MouseEventHandler<HTMLElement>
} | {
    type: "static" | "preview",
    object: SlideObject,
    controlsRefs?: null,
    onClick?: null,
    onContextMenu?: null
}

const SlideObjectRender = forwardRef<HTMLElement, SlideObjectRenderProps>((
    { type, object, controlsRefs, onClick, onContextMenu }: SlideObjectRenderProps,
    ref
) => {
    const { useSelector, useDispatch } = useEditor();
    const { editText } = useDispatch();
    const activeSlideId = useSelector(state => state.selection.selectedSlides[0]);
    const { selectedSlideObjects: selectedSlideObjectIds } = useSelector(state => state.selection);
    const isSelected = selectedSlideObjectIds.some(selectedSlideObjectId => selectedSlideObjectId === object.id);
    const objectRef = useRef<HTMLElement | null>(null);

    const slideObjectRefAssigner = useCallback(
        (node: HTMLDivElement) => {
            objectRef.current = node;
            if (ref && typeof ref !== "function") {
                ref.current = node
            }
        },
        [objectRef, ref]
    );

    const [textValue, setTextValue] = useState<string>(object.type === "text" ? object.content : "");
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(e.currentTarget.value);
    };
    const onBlur = useCallback(
        () => {
            editText(
                {
                    id: activeSlideId,
                    objectId: object.id,
                    newText: textValue
                }
            )
        },
        [editText, textValue, activeSlideId, object]
    );
    useStyle(
        object,
        objectRef
    )

    return (
        <>
            {
                object.type === "text"
                    ? (
                        <div
                            ref={slideObjectRefAssigner}
                            className={
                                `
                                    ${style.textWrapper} 
                                    ${type !== "static" && style.focusable} 
                                    ${isSelected && type !== "static" && style.selected}
                                    ${type === "static" && style.static}
                                    ${type === "preview" && style.preview}
                                `
                            }
                            onClick={type === "editable" ? onClick : () => { }}
                            onContextMenu={type === "editable" ? onContextMenu : () => { }}
                        >
                            {
                                isSelected && type === "editable" &&
                                (
                                    <>
                                        <div ref={controlsRefs.leftUpper} className={`${controlsStyle.LU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.leftMiddle} className={`${controlsStyle.LM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.leftLower} className={`${controlsStyle.LL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.rightUpper} className={`${controlsStyle.RU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.rightMiddle} className={`${controlsStyle.RM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.rightLower} className={`${controlsStyle.RL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.upperMiddle} className={`${controlsStyle.UM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.lowerMiddle} className={`${controlsStyle.LowerM} ${controlsStyle.controlPoint}`}></div>
                                    </>
                                )
                            }
                            {
                                type === "editable"
                                    ? (
                                        <textarea
                                            className={style.text}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={textValue}
                                        >
                                        </textarea>
                                    )
                                    : (
                                        <span
                                            className={`${style.text} ${style.focusable}`}
                                        >
                                            {object.content}
                                        </span>
                                    )
                            }
                        </div>

                    )
                    : (
                        <div
                            ref={slideObjectRefAssigner}
                            tabIndex={type === "editable" ? 0 : -1}
                            className={
                                `
                                    ${style.image} 
                                    ${type !== "static" && style.focusable} 
                                    ${isSelected && type !== "static" && style.selected}
                                    ${type === "static" && style.static}            
                                    ${type === "preview" && style.preview}
                                `
                            }
                            onClick={type === "editable" ? onClick : () => { }}
                            onContextMenu={type === "editable" ? onContextMenu : () => { }}
                        >
                            {
                                isSelected && type === "editable" &&
                                (
                                    <>
                                        <div ref={controlsRefs.leftUpper} className={`${controlsStyle.LU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.leftMiddle} className={`${controlsStyle.LM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.leftLower} className={`${controlsStyle.LL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.rightUpper} className={`${controlsStyle.RU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.rightMiddle} className={`${controlsStyle.RM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.rightLower} className={`${controlsStyle.RL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.upperMiddle} className={`${controlsStyle.UM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={controlsRefs.lowerMiddle} className={`${controlsStyle.LowerM} ${controlsStyle.controlPoint}`}></div>
                                    </>
                                )
                            }
                        </div>
                    )}
        </>
    );
});

export { SlideObjectRender }