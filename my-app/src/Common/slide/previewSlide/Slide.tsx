import { useStyle } from "../slide.styles";
import { type Slide as SlideType } from "../../../Store/Model/slide";
import style from "../Slide.module.css";
import { LiteSlideObject as SlideObject } from "../../slideObject/previewSlideObject/slideObject";
import { forwardRef } from "react";
import { useEditor } from "../../../hooks/editor.hooks";
import { useRef } from "react";
import { useContextMenuTemplate } from "../../ContextMenu/ContextMenu.hooks";

type SlideProps = {
    slide: SlideType
}

const Slide = forwardRef<HTMLDivElement | null, SlideProps>(
    ({ slide }: SlideProps, containerRef) => {
        const { useDispatch, useSelector } = useEditor();
        const { enableContextMenu, disableContextMenu, selectSlide } = useDispatch();
        const { createSlideListCM } = useContextMenuTemplate();
        const isSelected = useSelector(state => state.selection.selectedSlides).some(id => id === slide.id);
        const slideDOMNodeRef = useRef<HTMLDivElement | null>(null);
        useStyle(
            slide,
            slideDOMNodeRef
        );
        const contextMenuHandler = (
            e: React.MouseEvent<HTMLDivElement>
        ) => {
            const { clientX: x, clientY: y } = e;
            e.preventDefault();
            enableContextMenu(
                {
                    template: createSlideListCM([() => { disableContextMenu(); }], slide),
                    position: { x, y },
                    positionAtSlide: {          //она все ранво не используется в template handler
                        x: 0,
                        y: 0
                    }
                }
            )
        };
        const clickHandler = () => {
            selectSlide(
                {
                    id: slide.id
                }
            )
        };
        return (
            <div
                ref={
                    (node) => { 
                        slideDOMNodeRef.current = node;
                        if (containerRef && typeof containerRef !== "function") { 
                            containerRef.current = node
                        }
                    }
                }
                className={                                   //TODO: add basic class
                    ` ${slide.background.type === "color"
                        ? style.colorBg
                        : style.imageBg}
                    ${style.slide}
                    ${style.mini}
                    ${isSelected && style.selected}
                `
                }
                onClick={
                    (e) => {
                        e.stopPropagation();
                        //отключение всех контекстных меню вне зависимости от точки нажатия                    
                        disableContextMenu();
                        clickHandler();
                    }
                }
                onContextMenu={
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        contextMenuHandler(e);
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
                            />
                        )
                    )
                }
            </div>
        );
    }
)

export {
    Slide as LiteSlide,
}