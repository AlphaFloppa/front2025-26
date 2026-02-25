import React, { useState, useRef, useCallback } from "react";
import type { Position } from "../Store/Model/slideContent.js";

type startHandlerArgs<containerType extends HTMLElement | null, userType extends HTMLElement | null> = {
    startOffsetX: number,
    startOffsetY: number,
    containerRef: React.RefObject<containerType>,
    userRef: React.RefObject<userType>
}

type dragHandlerArgs<containerType extends HTMLElement | null, userType extends HTMLElement | null> = {
    globalOffsetX: number,
    globalOffsetY: number,
    containerRef: React.RefObject<containerType>,
    usersRefs: React.RefObject<userType>[]
}

type finishHandlerArgs<containerType extends HTMLElement | null, userType extends HTMLElement | null> = {
    finishOffsetX: number,
    finishOffsetY: number,
    containerRef: React.RefObject<containerType>,
    usersRefs: React.RefObject<userType>[],
    e?: MouseEvent
};

type addDndArgs<containerType extends HTMLElement | null, userType extends HTMLElement | null> = {
    containerRef: React.RefObject<containerType>,
    usersRefs: React.RefObject<userType>[]
}

type DnDProps<containerType extends HTMLElement | null, userType extends HTMLElement | null> = {
    containerRef?: React.RefObject<containerType>,
    onStart?: (payload: startHandlerArgs<containerType, userType>) => void,
    onDrag?: (payload: dragHandlerArgs<containerType, userType>) => void,
    onFinish?: (payload: finishHandlerArgs<containerType, userType>) => void
}

type DndResult<containerType extends HTMLElement | null, userType extends HTMLElement | null> = {
    listenerEffect: (payload: addDndArgs<containerType, userType>) => () => void
}

const useDnd = <containerType extends HTMLElement | null, userType extends HTMLElement | null>(
    {
        onStart,
        onDrag,
        onFinish
    }: DnDProps<containerType, userType>
): DndResult<containerType, userType> => {
    const [isDragging, setIsDragging] = useState(false);
    const startPosition = useRef<Position>({ x: 0, y: 0 });

    const mouseDownHandler = useCallback(
        (
            e: MouseEvent,
            containerRef: React.RefObject<containerType>,
            userRef: React.RefObject<userType>
        ) => {
            if (e.button !== 0) {
                return;
            }
            e.stopPropagation();
            const { clientX, clientY } = e;
            setIsDragging(true);

            const startOffsetX = clientX - (containerRef.current?.getBoundingClientRect().x ?? 0);
            const startOffsetY = clientY - (containerRef.current?.getBoundingClientRect().y ?? 0);

            startPosition.current = {
                x: startOffsetX,
                y: startOffsetY
            }

            onStart?.({
                startOffsetX,
                startOffsetY,
                containerRef,
                userRef
            });
        },
        [onStart]
    );

    const mouseMoveHandler = useCallback(
        (
            { clientX: x, clientY: y }: MouseEvent,
            containerRef: React.RefObject<containerType>,
            usersRefs: React.RefObject<userType>[]
        ) => {

            const globalOffsetX = (x - (containerRef.current?.getBoundingClientRect().x ?? 0)) - startPosition.current.x;
            const globalOffsetY = (y - (containerRef.current?.getBoundingClientRect().y ?? 0)) - startPosition.current.y;

            onDrag?.({
                globalOffsetX,
                globalOffsetY,
                containerRef,
                usersRefs
            });
        },
        [onDrag]
    );

    const mouseUpHandler = useCallback(
        (
            e: MouseEvent,
            containerRef: React.RefObject<containerType>,
            usersRefs: React.RefObject<userType>[]
        ) => {
            const { clientX, clientY } = e;
            const finishOffsetX = ((clientX - (containerRef.current?.getBoundingClientRect().x ?? 0)) - startPosition.current.x);
            const finishOffsetY = ((clientY - (containerRef.current?.getBoundingClientRect().y ?? 0)) - startPosition.current.y);

            onFinish?.({
                finishOffsetX,
                finishOffsetY,
                containerRef,
                usersRefs,
                e
            });

            setIsDragging(false);
        },
        [onFinish]
    );

    const listenerEffect = useCallback(
        (
            {
                containerRef,
                usersRefs
            }: addDndArgs<containerType, userType>
        ) => {
            const MDlistenersArray = usersRefs.map(
                userRef => ((e: MouseEvent) => {
                    mouseDownHandler(e, containerRef, userRef)
                }) as EventListener
            );

            const MMlistener = ((e: MouseEvent) => {
                mouseMoveHandler(e, containerRef, usersRefs)
            }) as EventListener;

            const MUlistener = ((e: MouseEvent) => {
                mouseUpHandler(e, containerRef, usersRefs)
            }) as EventListener;

            if (!isDragging) {
                usersRefs.forEach(
                    (ref, index) => { ref.current?.addEventListener("mousedown", MDlistenersArray[index]) }
                );
            }

            if (isDragging) {
                containerRef.current?.addEventListener("mousemove", MMlistener);
            }

            if (isDragging) {
                containerRef.current?.addEventListener("mouseup", MUlistener);
            }

            return () => {
                usersRefs.forEach(
                    (ref, index) => { ref.current?.removeEventListener("mousedown", MDlistenersArray[index]) }
                );

                containerRef.current?.removeEventListener("mousemove", MMlistener);

                containerRef.current?.removeEventListener("mouseup", MUlistener);
            }
        },
        [isDragging, mouseDownHandler, mouseMoveHandler, mouseUpHandler]
    );

    return {
        listenerEffect
    }
}

export {
    useDnd
}

export type {
    startHandlerArgs,
    dragHandlerArgs,
    finishHandlerArgs,
    addDndArgs,
    DndResult
}