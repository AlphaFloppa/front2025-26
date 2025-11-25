import type { Slide as SlideType } from "../../Store/Model/slide"
import { LiteSlide as Slide } from "../../Common/slide/previewSlide/Slide";
import style from "./SlidesList.module.css";
import { useContextMenu, useContextMenuTemplate } from "../../Common/ContextMenu/ContextMenu.hooks";

type SlidesListProps = {
    list: SlideType[],
    onClickHandler?: Function,
    onContextMenuHandler?: Function
}

function SlidesList({ list }: SlidesListProps) {
    const { createSlideListCM } = useContextMenuTemplate();
    const { turnOn: enableCM, turnOff: disableCM} = useContextMenu();
    const slideContextMenuHandler = (                       //сборка вне и прокидывание в пропсах
        e: React.MouseEvent<HTMLDivElement>,
        slide: SlideType
    ) => {
        const { clientX: x, clientY: y } = e;
        e.preventDefault();
        enableCM(
            {
                position: {x, y},
                template: createSlideListCM([() => { disableCM(); }], slide)
            }
        )
    };
    return (
        <ol className={style.slideList}>
            {
                list.map(
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