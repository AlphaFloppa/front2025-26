import { forwardRef, useCallback, useRef, useState, type MouseEvent } from "react";
import type { Position, Size, SlideObject as SlideObjectType } from "../Store/Model/slideContent";
import { useContextMenuTemplate } from "../ContextMenu/ContextMenu.hooks";
import type React from "react";
import { useEditor } from "../hooks/editor.hooks";
import { useResize } from "../hooks/resize.hooks";
import { verify } from "../Store/Services/editFunctions";
import { getClickRelativePositionAtSlide } from "../slide/Slide";
import { SlideObjectRender } from "./SlideObjectRender";

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
        } = useDispatch();
        const { createSlideObjectCM } = useContextMenuTemplate();
        const { isEnabled } = useSelector(state => state.contextMenu);
        const { selectedSlides, selectedSlideObjects } = useSelector(state => state.selection);
        const activeSlideId = selectedSlides[0];
        const isSelected = selectedSlideObjects.some(selectedSlideObjectId => selectedSlideObjectId === object.id);

        const [isResizing, setIsResizing] = useState<boolean>(false);
        const [resizeIntermediatePosition, setResizeIntermediatePosition] = useState<Position>({ x: 0, y: 0 });
        const [resizeIntermediateSize, setResizeIntermediateSize] = useState<Size>({ width: 0, height: 0 });
        const LUControlRef = useRef<HTMLDivElement | null>(null);
        const LMControlRef = useRef<HTMLDivElement | null>(null);
        const LLControlRef = useRef<HTMLDivElement | null>(null);
        const RUControlRef = useRef<HTMLDivElement | null>(null);
        const RMControlRef = useRef<HTMLDivElement | null>(null);
        const RLControlRef = useRef<HTMLDivElement | null>(null);
        const UMControlRef = useRef<HTMLDivElement | null>(null);
        const LowerMControlRef = useRef<HTMLDivElement | null>(null);

        const onStart = useCallback(
            () => {
                setIsResizing(true);
                setResizeIntermediatePosition(object.position);
                setResizeIntermediateSize(object.size);
            },
            [
                setIsResizing,
                setResizeIntermediatePosition,
                setResizeIntermediateSize,
                object
            ]
        );
        const onResize = useCallback(
            (
                { deltaWidth, deltaHeight, isControlUpper, isControlLeft }:
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
            [setResizeIntermediatePosition, setResizeIntermediateSize, object]
        );
        const onFinish = useCallback(
            (
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
            },
            [resizeSlideObject, activeSlideId, object]
        );
        useResize(
            {
                controlsRefs:
                {
                    leftUpper: {
                        objectRef: LUControlRef
                    },
                    leftMiddle: {
                        objectRef: LMControlRef
                    },
                    leftLower: {
                        objectRef: LLControlRef,
                    },
                    rightUpper: {
                        objectRef: RUControlRef,
                    },
                    rightMiddle: {
                        objectRef: RMControlRef
                    },
                    rightLower: {
                        objectRef: RLControlRef,
                    },
                    upperMiddle: {
                        objectRef: UMControlRef
                    },
                    lowerMiddle: {
                        objectRef: LowerMControlRef
                    },
                },
                controlsOwnContainerRef: containerRef,
                onStart,
                onResize,
                onFinish
            }
        );

        const onClick = useCallback(
            (e: MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                if (isEnabled) {
                    disableContextMenu();
                }
                if (
                    !isSelected
                ) {
                    selectSlideObject(
                        {
                            id: object.id,
                            isCtrlPressed: e.ctrlKey
                        }
                    );
                }
            },
            [isEnabled, disableContextMenu, selectSlideObject, object]
        );
        const onContextMenu = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
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
            },
            [isEnabled, isSelected, enableContextMenu, createSlideObjectCM]
        );

        return (
            <SlideObjectRender
                ref={ref}
                type={"editable"}
                object={
                    isResizing
                        ? {
                            ...object,
                            position: resizeIntermediatePosition,
                            size: resizeIntermediateSize
                        }
                        : object
                }
                onClick={onClick}
                onContextMenu={onContextMenu}
                controlsRefs={{
                    leftUpper: LUControlRef,
                    leftMiddle: LMControlRef,
                    leftLower: LLControlRef,
                    rightUpper: RUControlRef,
                    rightMiddle: RMControlRef,
                    rightLower: RLControlRef,
                    upperMiddle: UMControlRef,
                    lowerMiddle: LowerMControlRef,
                }}
            />
        )
    });

export {
    SlideObject
}