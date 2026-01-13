import React, { useEffect } from "react";
import { useDnd, type dragHandlerArgs, type finishHandlerArgs, type startHandlerArgs } from "./dnd.hooks";

//TODO: добавить will change из slideobject
//накидать стилей на курсор
//не работает редактирование текста

type onStartArgs = {

}

type onResizeArgs = {
    deltaWidth: number,
    deltaHeight: number,
    isControlUpper: boolean,
    isControlMiddle: boolean,
    isControlLeft: boolean
}

type onFinishArgs = {
    deltaWidth: number,
    deltaHeight: number,
    isControlUpper: boolean,
    isControlMiddle: boolean,
    isControlLeft: boolean
};

type ResizeArgs = {
    controlsRefs: {
        rightUpper: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        rightMiddle: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        rightLower: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        leftLower: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        leftMiddle: {
            objectRef: React.RefObject<HTMLDivElement | null>
        }
        leftUpper: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        upperMiddle: {
            objectRef: React.RefObject<HTMLDivElement | null>
        },
        lowerMiddle: {
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

                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {

                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                    globalOffsetY: y,
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = -x;
                const deltaHeight = -y;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight,
                        isControlUpper: true,
                        isControlMiddle: false,
                        isControlLeft: true
                    }
                );
            },
            onFinish: (
                {
                    finishOffsetX: x,
                    finishOffsetY: y,
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = -x;
                const deltaHeight = -y;
                onFinish(
                    {
                        deltaWidth,
                        deltaHeight,
                        isControlUpper: true,
                        isControlMiddle: false,
                        isControlLeft: true
                    }
                )
            }
        }
    );

    const { listenerEffect: LMListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {

                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {

                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = -x;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight: 0,
                        isControlUpper: false,
                        isControlMiddle: true,
                        isControlLeft: true
                    }
                );
            },
            onFinish: (
                {
                    finishOffsetX: x
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = -x;
                onFinish(
                    {
                        deltaWidth,
                        deltaHeight: 0,
                        isControlUpper: false,
                        isControlMiddle: true,
                        isControlLeft: true
                    }
                )
            }
        }
    );

    const { listenerEffect: LLListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {

                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {
                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                    globalOffsetY: y,
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = -x;
                const deltaHeight = y;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight,
                        isControlUpper: false,
                        isControlMiddle: false,
                        isControlLeft: true
                    }
                );
            },
            onFinish: (
                {
                    finishOffsetX: x,
                    finishOffsetY: y,
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = -x;
                const deltaHeight = y;
                onFinish(
                    {
                        deltaWidth,
                        deltaHeight,
                        isControlUpper: false,
                        isControlMiddle: false,
                        isControlLeft: true
                    }
                )
            }
        }
    );

    const { listenerEffect: RUListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {

                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {
                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                    globalOffsetY: y,
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = x;
                const deltaHeight = -y;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight,
                        isControlUpper: true,
                        isControlMiddle: false,
                        isControlLeft: false
                    }
                );
            },
            onFinish: (
                {
                    finishOffsetX: x,
                    finishOffsetY: y,
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = x;
                const deltaHeight = -y;
                onFinish(
                    {
                        deltaWidth,
                        deltaHeight,
                        isControlUpper: true,
                        isControlMiddle: false,
                        isControlLeft: false
                    }
                )
            }
        }
    );

    const { listenerEffect: RMListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {

                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {

                }
            ),
            onDrag: (
                {
                    globalOffsetX: x,
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = x;
                onResize(
                    {
                        deltaWidth,
                        deltaHeight: 0,
                        isControlUpper: false,
                        isControlMiddle: true,
                        isControlLeft: false
                    }
                );
            },
            onFinish: (
                {
                    finishOffsetX: x
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaWidth = x;
                onFinish(
                    {
                        deltaWidth,
                        deltaHeight: 0,
                        isControlUpper: false,
                        isControlMiddle: true,
                        isControlLeft: false
                    }
                )
            }
        }
    );

    const { listenerEffect: RLListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {
                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {}
            ),
            onDrag: (
                {
                    globalOffsetX: deltaWidth,
                    globalOffsetY: deltaHeight,
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                onResize(
                    {
                        deltaWidth,
                        deltaHeight,
                        isControlUpper: false,
                        isControlMiddle: false,
                        isControlLeft: false
                    }
                );
            },
            onFinish: (
                {
                    finishOffsetX: deltaWidth,
                    finishOffsetY: deltaHeight,
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                onFinish(
                    {
                        deltaWidth,
                        deltaHeight,
                        isControlUpper: false,
                        isControlMiddle: false,
                        isControlLeft: false
                    }
                )
            }
        }
    );

    const { listenerEffect: UMListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {

                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {

                }
            ),
            onDrag: (
                {
                    globalOffsetY: y,
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaHeight = -y;
                onResize(
                    {
                        deltaWidth: 0,
                        deltaHeight,
                        isControlUpper: true,
                        isControlMiddle: true,
                        isControlLeft: false
                    }
                );
            },
            onFinish: (
                {
                    finishOffsetY: y
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                const deltaHeight = -y;
                onFinish(
                    {
                        deltaWidth: 0,
                        deltaHeight,
                        isControlUpper: true,
                        isControlMiddle: true,
                        isControlLeft: false
                    }
                )
            }
        }
    );

    const { listenerEffect: LowerMListenerEffect } = useDnd<HTMLDivElement | null, HTMLDivElement | null>(
        {
            onStart: (
                {

                }: startHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => onStart(
                {

                }
            ),
            onDrag: (
                {
                    globalOffsetY: deltaHeight,
                }: dragHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                onResize(
                    {
                        deltaWidth: 0,
                        deltaHeight,
                        isControlUpper: false,
                        isControlMiddle: true,
                        isControlLeft: false
                    }
                );
            },
            onFinish: (
                {
                    finishOffsetY: deltaHeight
                }: finishHandlerArgs<HTMLDivElement | null, HTMLDivElement | null>
            ) => {
                onFinish(
                    {
                        deltaWidth: 0,
                        deltaHeight,
                        isControlUpper: false,
                        isControlMiddle: true,
                        isControlLeft: false
                    }
                )
            }
        }
    );

    useEffect(
        () => {
            const cleanUpArray = Array<Function>();
            cleanUpArray.push(
                LUListenerEffect(
                    {
                        containerRef,
                        usersRefs: [controlsRefs.leftUpper.objectRef]
                    }
                )
            );
            cleanUpArray.push(
                LMListenerEffect(
                    {
                        containerRef,
                        usersRefs: [controlsRefs.leftMiddle.objectRef]
                    }
                )
            );
            cleanUpArray.push(
                LLListenerEffect(
                    {
                        containerRef,
                        usersRefs: [controlsRefs.leftLower.objectRef]
                    }
                )
            );
            cleanUpArray.push(
                RUListenerEffect(
                    {
                        containerRef,
                        usersRefs: [controlsRefs.rightUpper.objectRef]
                    }
                )
            );
            cleanUpArray.push(
                RMListenerEffect(
                    {
                        containerRef,
                        usersRefs: [controlsRefs.rightMiddle.objectRef]
                    }
                )
            );
            cleanUpArray.push(
                RLListenerEffect(
                    {
                        containerRef,
                        usersRefs: [controlsRefs.rightLower.objectRef]
                    }
                )
            );
            cleanUpArray.push(
                UMListenerEffect(
                    {
                        containerRef,
                        usersRefs: [controlsRefs.upperMiddle.objectRef]
                    }
                )
            );
            cleanUpArray.push(
                LowerMListenerEffect(
                    {
                        containerRef,
                        usersRefs: [controlsRefs.lowerMiddle.objectRef]
                    }
                )
            );

            return () => {
                cleanUpArray.forEach(
                    cleanUp => {
                        cleanUp();
                    }
                )
            }
        }
    )
}

export {
    useResize
}