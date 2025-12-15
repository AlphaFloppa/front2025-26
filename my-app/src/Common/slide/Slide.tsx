import React, { useRef, type MouseEventHandler, useMemo, useEffect, useCallback } from "react";
import type { Slide as SlideType } from "../../Store/Model/slide";
import { useStyle } from "./slide.styles";
import { SlideObject } from "../slideObject/SlideObject";
import slideObjectStyle from "../slideObject/SlideObject.module.css";
import { verify } from "../../Store/Services/editFunctions";
import style from "../slide/Slide.module.css"
import { type Position } from "../../Store/Model/slideContent";
import { useEditor } from "../../hooks/editor.hooks";
import { useDnd, type dragHandlerArgs, type finishHandlerArgs, type startHandlerArgs } from "../../hooks/dnd.hooks";
import { useContextMenuTemplate } from "../ContextMenu/ContextMenu.hooks";

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
    useStyle(
        slide,
        slideDOMNodeRef,
        false
    );
    const { createWorkplaceSlideCM } = useContextMenuTemplate();
    const clickHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            if (isEnabled) {
                disableContextMenu();
                return;
            }
            //отключение всех контекстных меню вне зависимости от точки нажатия
            if (e.target === e.currentTarget && selectedSlideObjectsIds.length !== 0) {
                //обнуляем все выделения объектов при нажатии конкретно на область слайда но не объекта
                //TODO: вынести отсюда логику проверки slectedObjects is empty для отказа от генерации бессмысоенных store change 
                // куда неизвестно
                nullifySlideObjectSelection();
            }
        },
        [disableContextMenu, nullifySlideObjectSelection, selectedSlideObjectsIds, isEnabled]
    );
    const contextMenuHandler = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (isEnabled) {
                disableContextMenu();
                return;
            }
            const {
                clientX: x,
                clientY: y,
                nativeEvent: { offsetX, offsetY }
            } = e;
            enableContextMenu(
                createWorkplaceSlideCM(),
                { x, y },
                {
                    x: offsetX,
                    y: offsetY
                }
            )
        },
        [enableContextMenu, createWorkplaceSlideCM, isEnabled, disableContextMenu]
    );
    const startHandler = useCallback(
        (
            {
                userRef: slideObjectRef
            }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
        ) => {
            console.debug(slideObjectRef);
            if (slideObjectRef.current) {
                slideObjectRef.current.classList.add(slideObjectStyle.dragging);
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
            console.info(...slideObjectRefs);
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
                finishOffsetX: x,
                finishOffsetY: y,
                usersRefs: slideObjectRefs
            }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
        ) => {
            slideObjectRefs.forEach(
                slideObjectRef => {
                    if (slideObjectRef.current) {
                        slideObjectRef.current.classList.remove(slideObjectStyle.dragging);
                        slideObjectRef.current.style.setProperty("--DnDDragOffsetX", `0px`);
                        slideObjectRef.current.style.setProperty("--DnDDragOffsetY", `0px`);
                    }
                }
            );

            if (x === 0 && y === 0) { 
                return;
            }
            //итоговые смещения за процесс относительно слайда, в %
            moveSlideObjects(
                slide.id,
                selectedSlideObjectsIds,
                {
                    x,
                    y
                }
            );
        },
        [selectedSlideObjectsIds]
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
            onClick={clickHandler}
            onContextMenu={contextMenuHandler}
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