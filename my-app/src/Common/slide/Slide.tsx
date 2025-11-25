import React, { useRef, type MouseEventHandler, useMemo, useEffect, useCallback } from "react";
import type { Slide as SlideType } from "../../Store/Model/slide";
import { setCssProps } from "./slide.styles";
import { SlideObject } from "../slideObject/SlideObject";
import slideObjectStyle from "../slideObject/SlideObject.module.css";
import { verify } from "../../Store/Services/editFunctions";
import style from "../slide/Slide.module.css"
import { type Position } from "../../Store/Model/slideContent";
import { useEditor } from "../../hooks/editor.hooks";
import { useContextMenu } from "../ContextMenu/ContextMenu.hooks";
import { useDnd, type dragHandlerArgs, type finishHandlerArgs, type startHandlerArgs } from "../../hooks/dnd.hooks";

type SlideProps = {
    slide: SlideType,
    eventHandlers: {
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

function Slide({ slide, eventHandlers: { click, contextMenu } }: SlideProps) {
    const {
        state: {
            selection: { selectedSlideObjects: selectedSlideObjectsIds }
        },
        nullifySlideObjectsSelection,
        dispatchObjectsMoving
    } = useEditor();

    const slideDOMNodeRef = useRef<HTMLDivElement | null>(null);

    const startHandler = useCallback(
        (
            {
                userRef: slideObjectRef
            }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
        ) => {
            if (slideObjectRef.current) {
                console.log(slideObjectStyle);
                slideObjectRef.current.classList.add(slideObjectStyle.dragging);            //TODO: не работает накидывание иногда
                slideObjectRef.current.style.willChange = "transform";
                slideObjectRef.current.style.setProperty("--DnDDragOffsetX", `0px`);
                slideObjectRef.current.style.setProperty("--DnDDragOffsetY", `0px`);
            }
        },
        []
    );

    const dragHandler = useCallback(
        (
            {
                globalOffsetX,
                globalOffsetY,
                usersRefs: slideObjectRefs
            }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
        ) => {
            slideObjectRefs.forEach(
                slideObjectRef => {
                    if (slideObjectRef.current) {
                        slideObjectRef.current.style.setProperty("--DnDDragOffsetX", `${globalOffsetX}px`);
                        slideObjectRef.current.style.setProperty("--DnDDragOffsetY", `${globalOffsetY}px`);
                    }
                }
            )
        },
        []
    );

    const finishHandler = useCallback(
        (
            {
                finishOffsetX: offsetX,
                finishOffsetY: offsetY,
                containerRef: slideRef,
                usersRefs: slideObjectRefs
            }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
        ) => {
            slideObjectRefs.forEach(
                slideObjectRef => {
                    if (slideObjectRef.current) {
                        slideObjectRef.current.classList.remove(slideObjectStyle.dragging);
                        slideObjectRef.current.style.willChange = "auto";
                        slideObjectRef.current.style.setProperty("--DnDDragOffsetX", `0px`);
                        slideObjectRef.current.style.setProperty("--DnDDragOffsetY", `0px`);
                    }
                }
            );
            //итоговые смещения за процесс относительно слайда, в %
            const {
                x: relativeXOffset,
                y: relativeYOffset
            } = getClickRelativePositionAtSlide({ offsetX, offsetY }, verify(slideRef.current));
            dispatchObjectsMoving(
                {
                    relativeXOffset,
                    relativeYOffset,
                    targetObjectsIds: selectedSlideObjectsIds
                }
            );
        },
        [dispatchObjectsMoving]
    );

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

    const { turnOff: disableCM } = useContextMenu();
    return (
        <div
            ref={slideDOMNodeRef}
            className={                                   //TODO: add basic class
                ` ${slide.background.type === "color"
                    ? style.colorBg
                    : style.imageBg}
                    ${style.slide}
                `
            }
            style={setCssProps(slide)}
            onClick={
                (e) => {
                    disableCM();
                    //отключение всех контекстных меню вне зависимости от точки нажатия
                    if (e.target === e.currentTarget) {       //обнуляем все выделения объектов при нажатии конкретно на область слайда
                        nullifySlideObjectsSelection();         // но не объекта
                    }
                    if (click) {
                        click(e);
                    }
                }
            }
            onContextMenu={
                (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    disableCM();
                    if (contextMenu) {
                        contextMenu(e);
                    };
                }
            }
        >
            {                                           //здесь рендерятся объекты
                slide.objects.map(
                    (slideObject) =>
                    (
                        <SlideObject
                            ref={slideObjectsRefMap.get(slideObject.id)}
                            object={slideObject}
                            key={slideObject.id}
                            containerRef={slideDOMNodeRef}
                            eventHandlers={{}}
                        />

                    )
                )
            }
        </div>
    );
}

export {
    Slide as SlideComponent,              //TODO: export function himself not type
    getClickRelativePositionAtSlide
}