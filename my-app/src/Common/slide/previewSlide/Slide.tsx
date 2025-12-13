import { useStyle } from "../slide.styles";
import { type Slide as SlideType } from "../../../Store/Model/slide";
import style from "../Slide.module.css";
import { LiteSlideObject as SlideObject } from "../../slideObject/previewSlideObject/slideObject";
import { useEditor } from "../../../hooks/editor.hooks";
import { useEffect, useRef } from "react";

type SlideProps = {
    slide: SlideType,
    eventHandlers: {
        clickHandler?: Function,
        contextMenuHandler?: Function
    }
}

const Slide = (
    {
        slide,
        eventHandlers: {
            clickHandler: click,
            contextMenuHandler: contextMenu
        }
    }: SlideProps
) => {
    const { useDispatch } = useEditor();
    const { disableContextMenu } = useDispatch();
    const slideDOMNodeRef = useRef<HTMLDivElement | null>(null);
    useStyle(
        slide,
        slideDOMNodeRef, 
        true
    );
    return (
        <div
            ref={slideDOMNodeRef}
            className={                                   //TODO: add basic class
                ` ${slide.background.type === "color"
                    ? style.colorBg
                    : style.imageBg}
                    ${style.slide}
                    ${style.mini}
                `
            }
            onClick={
                (e) => {
                    e.stopPropagation();
                    //отключение всех контекстных меню вне зависимости от точки нажатия                    
                    disableContextMenu();
                    click?.(e);
                }
            }
            onContextMenu={
                (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    contextMenu?.(e);
                }
            }
        >
            {                                           //здесь рендерятся объекты
                slide.objects.map(
                    (slideObject) =>
                    (
                        <SlideObject
                            object={slideObject}
                            key={slideObject.id}
                            containerRef={ slideDOMNodeRef }
                        />
                    )
                )
            }
        </div>
    );
}

export {
    Slide as LiteSlide,
}