import type { Slide as SlideType } from "../../Store/Model/slide"
import { LiteSlide as Slide } from "../../Common/slide/previewSlide/Slide";
import style from "./SlidesList.module.css";
import { useEditor } from "../../hooks/editor.hooks";
import { useDnd, type dragHandlerArgs, type finishHandlerArgs, type startHandlerArgs } from "../../hooks/dnd.hooks";
import { useMemo, createRef } from "react";
import { useEffect, useRef } from "react";
import { verify } from "../../Store/Services/editFunctions";

const SlidesList = () => {
    const { useSelector, useDispatch } = useEditor();
    const { moveSlide } = useDispatch();
    const slidesList = useSelector(state => state.slides);
    const selectedSlideId = useSelector(state => state.selection.selectedSlides[0]);
    const listRef = useRef<HTMLOListElement | null>(null);
/*  const slidesRefsList = useMemo(
        () => slidesList.map(
            () => createRef<HTMLLIElement | null>()
        ),
        [slidesList.length]
    );*/
    const slideRef = useMemo(
        () => createRef<HTMLLIElement | null>(),
        [selectedSlideId]
    );
    const startHandler = (
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
    };
    const dragHandler = (
        { globalOffsetX, globalOffsetY, usersRefs, containerRef }: dragHandlerArgs<HTMLOListElement | null, HTMLLIElement | null>
    ) => {
        if (!containerRef.current) {
            return;
        }
        //const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
        usersRefs.map(
            ({ current: node }) => {
                if (!node) { 
                    return;
                }
                //const { width, height } = node.getBoundingClientRect();
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
    };
    const dropHandler = (
        { e, usersRefs }: finishHandlerArgs<HTMLOListElement | null, HTMLLIElement | null>
    ) => {
        if (!e) { 
            return;
        }
        usersRefs.map(
            ref => {
                ref.current?.style.setProperty(
                    "position",
                    "initial"
                );
            }
        );
        console.log("before: ", slidesList.map(slide => slide.id));
        const movingSlideId = verify(usersRefs[0].current?.getAttribute("data-id"));
        console.log("moving ID " + movingSlideId);
        const targetCatcher = document.elementsFromPoint(e.clientX, e.clientY).find(
            (node) => node.classList.contains("catcher")
        );
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
            
    };
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
            const cleanup = listenerEffect(
                {
                    containerRef: listRef,
                    usersRefs: [slideRef]
                }
            );

            return cleanup;
        }
    )
    return (
        <ol className={style.slideList} ref={listRef}>
            {
                slidesList.map(
                    (slide: SlideType, index) => {
                        return (
                            <li
                                key={slide.id}
                                className={style.slideContainer}
                                ref={slide.id === selectedSlideId ? slideRef : null}
                                data-id={ slide.id }
                            >
                                <div className={style.slideWrapper}>
                                    <Slide
                                        slide={slide}
                                    />
                                    <span className={style.slideHeader}>
                                        {slide.header}
                                    </span>
                                    <div className={`catcher ${style.catcher}`} data-index={ index }>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                )
            }
        </ol>
    );
}

export {
    SlidesList
}