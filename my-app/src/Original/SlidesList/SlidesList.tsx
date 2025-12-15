import type { Slide as SlideType } from "../../Store/Model/slide"
import { LiteSlide as Slide } from "../../Common/slide/previewSlide/Slide";
import style from "./SlidesList.module.css";
import { useContextMenuTemplate } from "../../Common/ContextMenu/ContextMenu.hooks";
import { useEditor } from "../../hooks/editor.hooks";

const SlidesList = () => {                      //обернуть в react.memo
    const { useDispatch, useSelector } = useEditor();
    const { createSlideListCM } = useContextMenuTemplate();
    const { enableContextMenu, disableContextMenu } = useDispatch();
    const slidesList = useSelector(state => state.slides);
    const slideContextMenuHandler = (                    
        e: React.MouseEvent<HTMLDivElement>,
        slide: SlideType
    ) => {
        const { clientX: x, clientY: y } = e;
        e.preventDefault();
        enableContextMenu(
            createSlideListCM([() => { disableContextMenu(); }], slide),
            { x, y }
        )
    };
    return (
        <ol className={style.slideList}>
            {
                slidesList.map(
                    (slide: SlideType) => {
                        return (
                            <li key={slide.id} className={style.slideWrapper}>
                                <Slide
                                    slide={slide}
                                    eventHandlers={{
                                        contextMenuHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { slideContextMenuHandler(e, slide) }
                                    }}
                                />
                                <span className={style.slideHeader}>
                                    {slide.header}
                                </span>
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