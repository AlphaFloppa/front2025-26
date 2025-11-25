import React, { useEffect } from "react";
import { useDnd, type dragHandlerArgs, type finishHandlerArgs, type startHandlerArgs } from "./dnd.hooks";

//TODO: добавить will change из slideobject
//накидать стилей на курсор
//не работает редактирование текста

type onStartArgs = {
    controlRef: React.RefObject<HTMLDivElement | null>
}

type onResizeArgs = {
    deltaWidth: number,
    deltaHeight: number,
    controlRef: React.RefObject<HTMLDivElement | null>,
    isControlUpper: boolean,
    isControlLeft: boolean
}

type onFinishArgs = onStartArgs;

type ResizeArgs = {
    controlsRefs: {
        rightUpper: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        rightLower: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        leftLower: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        leftUpper: {
            objectRef: React.RefObject<HTMLDivElement | null>
        }
    },
    controlsOwnContainerRef: React.RefObject<HTMLDivElement | null>,
    onStart: (payload: onStartArgs) => void,
    onResize: (payload: onResizeArgs) => void,
    onFinish: (payload: onFinishArgs) => void
}

const useResize = (
    {
        controlsRefs,
        controlsOwnContainerRef: containerRef,
        onStart,
        onResize,
        onFinish
    }: ResizeArgs
) => {

    const { listenerEffect: LUListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {
                    userRef: controlRef
                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {
                    controlRef
                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                    globalOffsetY: y,
                    usersRefs
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const resizeControlRef = usersRefs[0];
                const deltaWidth = -x;
                const deltaHeight = -y;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight,
                        controlRef: resizeControlRef,
                        isControlUpper: true,
                        isControlLeft: true
                    }
                );
            },
            onFinish: (
                {
                    usersRefs
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const controlRef = usersRefs[0];
                onFinish(
                    {
                        controlRef
                    }
                )
            }
        });

    const { listenerEffect: LLListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {
                    userRef: controlRef
                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {
                    controlRef
                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                    globalOffsetY: y,
                    usersRefs
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const resizeControlRef = usersRefs[0];
                const deltaWidth = -x;
                const deltaHeight = y;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight,
                        controlRef: resizeControlRef,
                        isControlUpper: false,
                        isControlLeft: true
                    }
                );
            },
            onFinish: (
                {
                    usersRefs
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const controlRef = usersRefs[0];
                onFinish(
                    {
                        controlRef
                    }
                )
            }
        });

    const { listenerEffect: RUListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {
                    userRef: controlRef
                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {
                    controlRef
                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                    globalOffsetY: y,
                    usersRefs
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const resizeControlRef = usersRefs[0];
                const deltaWidth = x;
                const deltaHeight = -y;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight,
                        controlRef: resizeControlRef,
                        isControlUpper: true,
                        isControlLeft: false
                    }
                );
            },
            onFinish: (
                {
                    usersRefs
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const controlRef = usersRefs[0];
                onFinish(
                    {
                        controlRef
                    }
                )
            }
        });

    const { listenerEffect: RLListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {
                    userRef: controlRef
                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {
                    controlRef
                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                    globalOffsetY: y,
                    usersRefs
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const resizeControlRef = usersRefs[0];
                const deltaWidth = x;
                const deltaHeight = y;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight,
                        controlRef: resizeControlRef,
                        isControlUpper: false,
                        isControlLeft: false
                    }
                );
            },
            onFinish: (
                {
                    usersRefs
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const controlRef = usersRefs[0];
                onFinish(
                    {
                        controlRef
                    }
                )
            }
        });

    useEffect(
        () => {
            const cleanUpArray = Array<Function>();
            cleanUpArray.push(LUListenerEffect(
                {
                    containerRef,
                    usersRefs: [controlsRefs.leftUpper.objectRef]
                }
            ));
            cleanUpArray.push(LLListenerEffect(
                {
                    containerRef,
                    usersRefs: [controlsRefs.leftLower.objectRef]
                }
            ));
            cleanUpArray.push(RUListenerEffect(
                {
                    containerRef,
                    usersRefs: [controlsRefs.rightUpper.objectRef]
                }
            ));
            cleanUpArray.push(RLListenerEffect(
                {
                    containerRef,
                    usersRefs: [controlsRefs.rightLower.objectRef]
                }
            ));

            return () => {
                cleanUpArray.forEach(cleanUp => {
                    cleanUp();
                })
            }
        }
    )
}

export {
    useResize
}