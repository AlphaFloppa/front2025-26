import { forwardRef, useRef } from "react";
import type { SlideObject as SlideObjectType } from "../../Store/Model/slideContent";
import style from "../slideObject/SlideObject.module.css";
import controlsStyle from "./slideObjectControl.module.css";
import { useContextMenuTemplate } from "../ContextMenu/ContextMenu.hooks";
import type React from "react";
import { useEditor } from "../../hooks/editor.hooks";
import { useResize } from "../../hooks/resize.hooks";
import { useStyle } from "./slideObject.styles";

type SlideObjectProps = {
    object: SlideObjectType,
    containerRef: React.RefObject<HTMLDivElement | null>,
    eventHandlers?: {
        mouseDownHandler?: Function,
        contextMenuHandler?: Function
    }
}

const SlideObject = forwardRef<HTMLDivElement | null, SlideObjectProps>(
    ({ object, containerRef }: SlideObjectProps, ref) => {
        const {
            useDispatch,
            useSelector
        } = useEditor();
        const { selectSlideObject, enableContextMenu, disableContextMenu, resizeSlideObject } = useDispatch();
        const { createSlideObjectCM } = useContextMenuTemplate();
        const { isEnabled } = useSelector(state => state.contextMenu);
        const { selectedSlides, selectedSlideObjects } = useSelector(state => state.selection);
        const activeSlideId = selectedSlides[0];
        const objectDOMNodeRef = useRef<HTMLTextAreaElement | HTMLDivElement | null>(null);
        useStyle(
            object,
            objectDOMNodeRef,
            containerRef
        );

        const LUControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const LLControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const RUControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const RLControlDOMNodeRef = useRef<HTMLDivElement | null>(null);

        useResize(
            {
                controlsRefs:
                {
                    leftUpper: {
                        objectRef: LUControlDOMNodeRef
                    },
                    leftLower: {
                        objectRef: LLControlDOMNodeRef,
                    },
                    rightUpper: {
                        objectRef: RUControlDOMNodeRef,
                    },
                    rightLower: {
                        objectRef: RLControlDOMNodeRef,
                    }
                },
                controlsOwnContainerRef: containerRef,
                onResize: (
                    { deltaWidth, deltaHeight, isControlUpper, isControlLeft }:
                        { deltaWidth: number, deltaHeight: number, isControlUpper: boolean, isControlLeft: boolean }
                ) => {
                    resizeSlideObject(
                        activeSlideId,
                        object.id,
                        {
                            width: deltaWidth,
                            height: deltaHeight
                        },
                        isControlUpper,
                        isControlLeft
                    )
                },
                onStart: () => { },
                onFinish: () => { }
            }
        );

        const isSelected = selectedSlideObjects.some(selectedSlideObjectId => selectedSlideObjectId === object.id);

        const slideObjectContextMenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!isSelected || isEnabled) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            const { clientX: x, clientY: y } = e;
            enableContextMenu(
                createSlideObjectCM(),
                {
                    x,
                    y
                },
                undefined
            )
        };

        return (
            <>
                {object.type === "text"
                    ? (
                        <div
                            ref={
                                (node) => {
                                    objectDOMNodeRef.current = node;
                                    if (ref) {
                                        if (typeof ref !== "function") {
                                            ref.current = node;
                                        }
                                    }
                                }
                            }
                            className={`${style.textWrapper} ${style.focusable} ${isSelected ? style.selected : null}`}
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    disableContextMenu();
                                    selectSlideObject(object.id, e.ctrlKey);
                                    //другая нагрузка
                                }
                            }
                            onContextMenu={slideObjectContextMenuHandler}
                        >
                            {
                                isSelected &&
                                (
                                    <>
                                        <div ref={LUControlDOMNodeRef} className={`${controlsStyle.LU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={LLControlDOMNodeRef} className={`${controlsStyle.LL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RUControlDOMNodeRef} className={`${controlsStyle.RU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RLControlDOMNodeRef} className={`${controlsStyle.RL} ${controlsStyle.controlPoint}`}></div>
                                    </>
                                )
                            }
                            <textarea
                                readOnly
                                tabIndex={0}
                                className={style.text}
                                onChange={() => { }}
                                value={object.content}
                            >
                            </textarea>
                        </div>

                    )
                    : (
                        <div
                            ref={
                                (node) => {
                                    objectDOMNodeRef.current = node;
                                    if (ref) {
                                        if (typeof ref !== "function") {
                                            ref.current = node;
                                        }
                                    }
                                }
                            }
                            tabIndex={0}
                            className={`${style.image} ${style.focusable} ${isSelected ? style.selected : null}`}
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    selectSlideObject(object.id, e.ctrlKey);
                                    //другая нагрузка
                                }
                            }
                            onContextMenu={slideObjectContextMenuHandler}
                        >
                            {
                                isSelected &&
                                (
                                    <>
                                        <div ref={LUControlDOMNodeRef} className={`${controlsStyle.LU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={LLControlDOMNodeRef} className={`${controlsStyle.LL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RUControlDOMNodeRef} className={`${controlsStyle.RU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RLControlDOMNodeRef} className={`${controlsStyle.RL} ${controlsStyle.controlPoint}`}></div>
                                    </>
                                )
                            }
                        </div>
                    )}
            </>
        );
    })

export {
    SlideObject
}