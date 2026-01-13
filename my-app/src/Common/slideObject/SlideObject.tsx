import { forwardRef, useRef, useState } from "react";
import type { Position, Size, SlideObject as SlideObjectType } from "../../Store/Model/slideContent";
import style from "../slideObject/SlideObject.module.css";
import controlsStyle from "./slideObjectControl.module.css";
import { useContextMenuTemplate } from "../ContextMenu/ContextMenu.hooks";
import type React from "react";
import { useEditor } from "../../hooks/editor.hooks";
import { useResize } from "../../hooks/resize.hooks";
import { useStyle } from "./slideObject.styles";
import { verify } from "../../Store/Services/editFunctions";
import { getClickRelativePositionAtSlide } from "../slide/Slide";

type SlideObjectProps = {
    object: SlideObjectType,
    containerRef: React.RefObject<HTMLDivElement | null>
}

const SlideObject = forwardRef<HTMLDivElement | null, SlideObjectProps>(
    ({ object, containerRef }: SlideObjectProps, ref) => {
        const {
            useDispatch,
            useSelector
        } = useEditor();
        const {
            selectSlideObject,
            enableContextMenu,
            disableContextMenu,
            resizeSlideObject,
            editText
        } = useDispatch();
        const { createSlideObjectCM } = useContextMenuTemplate();
        const { isEnabled } = useSelector(state => state.contextMenu);
        const { selectedSlides, selectedSlideObjects } = useSelector(state => state.selection);
        const activeSlideId = selectedSlides[0];
        const objectDOMNodeRef = useRef<HTMLTextAreaElement | HTMLDivElement | null>(null);
        const [textValue, setTextValue] = useState<string>(object.type === "text" ? object.content : "");
        const [isResizing, setIsResizing] = useState<boolean>(false);
        const [resizeIntermediatePosition, setResizeIntermediatePosition] = useState<Position>({ x: 0, y: 0 });
        const [resizeIntermediateSize, setResizeIntermediateSize] = useState<Size>({ width: 0, height: 0 });
        useStyle(
            isResizing
                ? {
                    ...object,
                    position: resizeIntermediatePosition,
                    size: resizeIntermediateSize
                }
                : object,
            objectDOMNodeRef
        );

        const LUControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const LMControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const LLControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const RUControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const RMControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const RLControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const UMControlDOMNodeRef = useRef<HTMLDivElement | null>(null);
        const LowerMControlDOMNodeRef = useRef<HTMLDivElement | null>(null);

        useResize(
            {
                controlsRefs:
                {
                    leftUpper: {
                        objectRef: LUControlDOMNodeRef
                    },
                    leftMiddle: {
                        objectRef: LMControlDOMNodeRef
                    },
                    leftLower: {
                        objectRef: LLControlDOMNodeRef,
                    },
                    rightUpper: {
                        objectRef: RUControlDOMNodeRef,
                    },
                    rightMiddle: {
                        objectRef: RMControlDOMNodeRef
                    },
                    rightLower: {
                        objectRef: RLControlDOMNodeRef,
                    },
                    upperMiddle: {
                        objectRef: UMControlDOMNodeRef
                    },
                    lowerMiddle: {
                        objectRef: LowerMControlDOMNodeRef
                    },
                },
                controlsOwnContainerRef: containerRef,
                onResize: (
                    { deltaWidth, deltaHeight, isControlUpper, isControlLeft }:         //delta is accumulative
                        { deltaWidth: number, deltaHeight: number, isControlUpper: boolean, isControlLeft: boolean }
                ) => {
                    const { width, height } = verify(containerRef.current?.getBoundingClientRect());
                    const deltaByPercents = getClickRelativePositionAtSlide(
                        {
                            offsetX: deltaWidth,
                            offsetY: deltaHeight
                        },
                        containerRef.current
                    );
                    setResizeIntermediatePosition(
                        {
                            x: (
                                isControlLeft
                                    ? object.position.x - deltaByPercents.x / 2
                                    : object.position.x + deltaByPercents.x / 2
                            ),
                            y: (
                                isControlUpper
                                    ? object.position.y - deltaByPercents.y / 2
                                    : object.position.y + deltaByPercents.y / 2
                            )
                        }

                    );
                    setResizeIntermediateSize(
                        {
                            width: object.size.width + (deltaWidth / width * 100),
                            height: object.size.height + (deltaHeight / height * 100)
                        }
                    );
                },
                onStart: () => {
                    setIsResizing(true);
                    setResizeIntermediatePosition(object.position);
                    setResizeIntermediateSize(object.size);
                },
                onFinish: (
                    { deltaWidth, deltaHeight, isControlUpper, isControlLeft }:
                        { deltaWidth: number, deltaHeight: number, isControlUpper: boolean, isControlLeft: boolean, isControlMiddle: boolean }
                ) => {
                    const { width, height } = verify(containerRef.current?.getBoundingClientRect())
                    resizeSlideObject(
                        {
                            id: activeSlideId,
                            objectId: object.id,
                            sizeChanges: {
                                width: deltaWidth / width * 100,
                                height: deltaHeight / height * 100
                            },
                            positionChanges: getClickRelativePositionAtSlide(
                                {
                                    offsetX: isControlLeft ? - deltaWidth / 2 : deltaWidth / 2,
                                    offsetY: isControlUpper ? - deltaHeight / 2 : deltaHeight / 2
                                },
                                containerRef.current
                            )
                        }
                    )
                    setIsResizing(false);
                }
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
            const { nativeEvent: { offsetX, offsetY } } = e;
            const positionAtSlide = getClickRelativePositionAtSlide(
                {
                    offsetX,
                    offsetY
                },
                containerRef.current
            )
            enableContextMenu(
                {
                    template: createSlideObjectCM(),
                    position: {
                        x, y
                    },
                    positionAtSlide
                }
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
                                    if (ref && typeof ref !== "function") {
                                        ref.current = node;
                                    }
                                }
                            }
                            className={`${style.textWrapper} ${style.focusable} ${isSelected ? style.selected : null}`}
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    if (isEnabled) {
                                        disableContextMenu();
                                    }
                                    if (
                                        !selectedSlideObjects.some(id => id === object.id)
                                    ) {
                                        selectSlideObject(
                                            {
                                                id: object.id,
                                                isCtrlPressed: e.ctrlKey
                                            }
                                        );
                                    }
                                }
                            }
                            onContextMenu={slideObjectContextMenuHandler}
                        >
                            {
                                isSelected &&
                                (
                                    <>
                                        <div ref={LUControlDOMNodeRef} className={`${controlsStyle.LU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={LMControlDOMNodeRef} className={`${controlsStyle.LM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={LLControlDOMNodeRef} className={`${controlsStyle.LL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RUControlDOMNodeRef} className={`${controlsStyle.RU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RMControlDOMNodeRef} className={`${controlsStyle.RM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RLControlDOMNodeRef} className={`${controlsStyle.RL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={UMControlDOMNodeRef} className={`${controlsStyle.UM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={LowerMControlDOMNodeRef} className={`${controlsStyle.LowerM} ${controlsStyle.controlPoint}`}></div>
                                    </>
                                )
                            }
                            <textarea
                                className={style.text}
                                onChange={
                                    (e) => {
                                        setTextValue(e.currentTarget.value);
                                    }
                                }
                                onBlur={
                                    () => {
                                        editText(
                                            {
                                                id: activeSlideId,
                                                objectId: object.id,
                                                newText: textValue
                                            }
                                        )
                                    }
                                }
                                value={textValue}
                            >
                            </textarea>
                        </div>

                    )
                    : (
                        <div
                            ref={
                                (node) => {
                                    objectDOMNodeRef.current = node;
                                    if (ref && typeof ref !== "function") {
                                        ref.current = node;
                                    }
                                }
                            }
                            tabIndex={0}
                            className={`${style.image} ${style.focusable} ${isSelected && style.selected}`}
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    if (isEnabled) {
                                        disableContextMenu();
                                    }
                                    if (
                                        !selectedSlideObjects.some(id => id === object.id)
                                    ) {
                                        selectSlideObject(
                                            {
                                                id: object.id,
                                                isCtrlPressed: e.ctrlKey
                                            }
                                        );
                                    }
                                }
                            }
                            onContextMenu={slideObjectContextMenuHandler}
                        >
                            {
                                isSelected &&
                                (
                                    <>
                                        <div ref={LUControlDOMNodeRef} className={`${controlsStyle.LU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={LMControlDOMNodeRef} className={`${controlsStyle.LM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={LLControlDOMNodeRef} className={`${controlsStyle.LL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RUControlDOMNodeRef} className={`${controlsStyle.RU} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RMControlDOMNodeRef} className={`${controlsStyle.RM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={RLControlDOMNodeRef} className={`${controlsStyle.RL} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={UMControlDOMNodeRef} className={`${controlsStyle.UM} ${controlsStyle.controlPoint}`}></div>
                                        <div ref={LowerMControlDOMNodeRef} className={`${controlsStyle.LowerM} ${controlsStyle.controlPoint}`}></div>
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