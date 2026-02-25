import React, { useRef, type MouseEventHandler, useMemo, useEffect, useCallback } from "react";
import type { Slide as SlideType } from "../Store/Model/slide";
import slideObjectStyle from "../slideObject/SlideObject.module.css";
import { verify } from "../Store/Services/editFunctions";
import { type Position } from "../Store/Model/slideContent";
import { useEditor } from "../hooks/editor.hooks";
import { useDnd, type dragHandlerArgs, type finishHandlerArgs, type startHandlerArgs } from "../hooks/dnd.hooks";
import { useContextMenuTemplate } from "../ContextMenu/ContextMenu.hooks";
import { SlideRender } from "./SlideRender";

type SlideProps = {
    slide: SlideType,
    eventHandlers?: {
        click?: MouseEventHandler<HTMLDivElement>,
        contextMenu?: MouseEventHandler<HTMLDivElement>
    }
}

const getClickRelativePositionAtSlide = (     //определяет относительное смещение клика по слайду в %
    { offsetX: x, offsetY: y }: { offsetX: number, offsetY: number }, slide: HTMLDivElement | null
): Position =>
({
    x: (x / verify(slide).clientWidth) * 100,
    y: (y / verify(slide).clientHeight) * 100,
});

function Slide({ slide }: SlideProps) {
    const {
        useSelector,
        useDispatch
    } = useEditor();
    const { nullifySlideObjectSelection, moveSlideObjects, disableContextMenu, enableContextMenu } = useDispatch();
    const { isEnabled } = useSelector(state => state.contextMenu);
    const selectedSlideObjectsIds = useSelector(state => state.selection.selectedSlideObjects);
    const slideDOMNodeRef = useRef<HTMLDivElement | null>(null);
    const { createWorkplaceSlideCM } = useContextMenuTemplate();
    const onClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            if (isEnabled) {
                disableContextMenu();
                return;
            }
            if (e.target === e.currentTarget && selectedSlideObjectsIds.length !== 0) {
                nullifySlideObjectSelection();
            }
        },
        [disableContextMenu, nullifySlideObjectSelection, selectedSlideObjectsIds, isEnabled]
    );
    const onContextMenu = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (isEnabled) {
                disableContextMenu();
                return;
            }
            const {
                clientX,
                clientY,
                nativeEvent: { offsetX, offsetY }
            } = e;
            enableContextMenu(
                {
                    template: createWorkplaceSlideCM(),
                    position: {
                        x: clientX,
                        y: clientY
                    },
                    positionAtSlide: getClickRelativePositionAtSlide(
                        {
                            offsetX,
                            offsetY
                        },
                        slideDOMNodeRef.current
                    )
                }
            )
        },
        [enableContextMenu, createWorkplaceSlideCM, isEnabled, disableContextMenu]
    );
    const startHandler = 
        (
            {
                userRef: slideObjectRef
            }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
        ) => {
            slideObjectRef.current?.classList.add(slideObjectStyle.dragging);
            slideObjectRef.current?.style.setProperty("--DnDDragOffsetX", `0px`);
            slideObjectRef.current?.style.setProperty("--DnDDragOffsetY", `0px`);
        };

    const dragHandler = 
        (
            {
                globalOffsetX,
                globalOffsetY,
                usersRefs: slideObjectRefs
            }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
        ) => {
            console.debug(slideObjectRefs);
            slideObjectRefs.forEach(
                slideObjectRef => {
                    slideObjectRef.current?.style.setProperty("--DnDDragOffsetX", `${globalOffsetX}px`);
                    slideObjectRef.current?.style.setProperty("--DnDDragOffsetY", `${globalOffsetY}px`);
                }
            )
        };

    const finishHandler =
        (
            {
                finishOffsetX: x,
                finishOffsetY: y,
                usersRefs: slideObjectRefs
            }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
        ) => {
            slideObjectRefs.forEach(
                slideObjectRef => {
                    slideObjectRef.current?.classList.remove(slideObjectStyle.dragging);
                    slideObjectRef.current?.style.setProperty("--DnDDragOffsetX", `0px`);
                    slideObjectRef.current?.style.setProperty("--DnDDragOffsetY", `0px`);
                }
            );

            if (x === 0 && y === 0) {
                return;
            }
            moveSlideObjects(
                {
                    id: slide.id,
                    objectsIds: selectedSlideObjectsIds,
                    changes: getClickRelativePositionAtSlide(
                        {
                            offsetX: x,
                            offsetY: y
                        },
                        slideDOMNodeRef.current
                    )
                }
            );
        };

    const { listenerEffect } = useDnd(
        {
            containerRef: slideDOMNodeRef,
            onStart: startHandler,
            onDrag: dragHandler,
            onFinish: finishHandler
        }
    );

    const slideObjectsRefMap = useMemo(          
        () => {
            const map = new Map<string, React.RefObject<HTMLDivElement | null>>();
            selectedSlideObjectsIds.map(
                selectedSlideObjectsId => {
                    map.set(
                        selectedSlideObjectsId,
                        { current: null }
                    )
                }
            );

            return map
        },
        [selectedSlideObjectsIds]
    );

    useEffect(
        () => {
            const cleanup = listenerEffect(
                {
                    containerRef: slideDOMNodeRef,
                    usersRefs: Array.from(slideObjectsRefMap.values())
                }
            );

            return cleanup;
        }
    )

    return (
        <SlideRender
            ref={slideDOMNodeRef}
            type={"editable"}
            slide={slide}
            slideObjectRefs={slideObjectsRefMap}
            onClick={onClick}
            onContextMenu={onContextMenu}
        />
    );
}

export {
    Slide as SlideComponent,              //TODO: export function himself not type
    getClickRelativePositionAtSlide
}