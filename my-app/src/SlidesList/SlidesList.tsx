import type { Slide as SlideType } from "../Store/Model/slide"
import { LiteSlide as Slide } from "../slide/previewSlide/Slide";
import style from "./SlidesList.module.css";
import { useEditor } from "../hooks/editor.hooks";
import { useDnd, type dragHandlerArgs, type finishHandlerArgs, type startHandlerArgs } from "../hooks/dnd.hooks";
import { createRef, useCallback } from "react";
import { useEffect, useRef } from "react";
import { verify } from "../Store/Services/editFunctions";
import { Button } from "../Button/Button";

const SlidesList = () => {
    const { useSelector, useDispatch } = useEditor();
    const { moveSlide, removeSlide } = useDispatch();
    const slidesList = useSelector(state => state.slides);
    console.log("now", ...slidesList.map(slide => slide.id));
    const selectedSlideId = useSelector(state => state.selection.selectedSlides[0]);
    const listRef = useRef<HTMLOListElement | null>(null);
    const slideRef = createRef<HTMLLIElement | null>();
    const startHandler = useCallback(
        (
            { userRef, startOffsetX, startOffsetY }: startHandlerArgs<HTMLOListElement | null, HTMLLIElement | null>
        ) => {
            userRef.current?.style.setProperty(
                "position",
                "absolute"
            );
            userRef.current?.style.setProperty(
                "left",
                startOffsetX.toString() + "px"
            );
            userRef.current?.style.setProperty(
                "top",
                startOffsetY.toString() + "px"
            );
        },
        []
    );
    const dragHandler = useCallback(
        (
            { globalOffsetX, globalOffsetY, usersRefs, containerRef }: dragHandlerArgs<HTMLOListElement | null, HTMLLIElement | null>
        ) => {
            if (!containerRef.current) {
                return;
            }
            usersRefs.map(
                ({ current: node }) => {
                    if (!node) {
                        return;
                    }
                    node?.style.setProperty(
                        "left",
                        globalOffsetX.toString() + "px"
                    );
                    node?.style.setProperty(
                        "top",
                        globalOffsetY.toString() + "px"
                    );
                }
            )
        },
        []
    );
    const dropHandler = useCallback(
        (
            { e, usersRefs }: finishHandlerArgs<HTMLOListElement | null, HTMLLIElement | null>
        ) => {
            if (!e) {
                return;
            }
            usersRefs.map(
                ref => {
                    ref.current?.style.setProperty(
                        "position",
                        "relative"
                    );
                    ref.current?.style.setProperty(
                        "left",
                        "0"
                    );
                    ref.current?.style.setProperty(
                        "top",
                        "0"
                    );
                }
            );
            console.log("before: ", slidesList.map(slide => slide.id));
            const movingSlideId = verify(usersRefs[0].current?.getAttribute("data-id"));
            console.log("moving ID " + movingSlideId);
            const targetCatcher = document.elementsFromPoint(e.clientX, e.clientY).find(
                (node) => node.classList.contains("catcher")
            );
            if (!targetCatcher) { 
                return;
            }
            const newIndex = parseInt(verify(targetCatcher?.getAttribute("data-index"))) + 1;
            console.log("newIndex " + newIndex);
            const removedIdArray = slidesList.map(slide => slide.id).filter(id => id !== movingSlideId);
            const newIdArray = [
                ...removedIdArray.slice(0, newIndex),
                movingSlideId,
                ...removedIdArray.slice(newIndex)
            ];
            console.log("newArray ", newIdArray);
            moveSlide(
                {
                    order: newIdArray
                }
            );
        },
        [slidesList, moveSlide]
    );
    const { listenerEffect } = useDnd(
        {
            containerRef: listRef,  //unused in hook
            onStart: startHandler,
            onDrag: dragHandler,
            onFinish: dropHandler
        }
    );
    useEffect(
        () => {
            if (slidesList.length > 1) {
                const cleanup = listenerEffect(
                    {
                        containerRef: listRef,
                        usersRefs: [slideRef]
                    }
                );
                return cleanup;
            }

        }
    );
    return (
        <ol className={style.slideList} ref={listRef}>
            {
                slidesList.length > 0
                ?
                    slidesList.map(
                        (slide: SlideType, index) => {
                            return (
                                <li
                                    key={slide.id}
                                    className={style.slideContainer}
                                    ref={slide.id === selectedSlideId ? slideRef : null}
                                    data-id={slide.id}
                                >
                                    <span className={style.index}>
                                        {index + 1}
                                    </span>
                                    <div className={style.slideWrapper}>
                                        <Slide
                                            slide={slide}
                                        />
                                        <div className={`catcher ${style.catcher}`} data-index={index}>
                                        </div>
                                    </div>
                                    <Button
                                        destination="deleteSlide"
                                        clickHandler={
                                            () => {
                                                removeSlide(
                                                    {
                                                        id: slide.id
                                                    }
                                                )
                                            }
                                        }
                                    />
                                </li>
                            )
                        }
                    )
                    :
                    (
                        <span className={ style.noSlidesMessage}>
                            Слайдов нет
                        </span>
                    )
                }
        </ol>
    );
}

export {
    SlidesList
}