import { setCssProps } from "../slide.styles";
import { type Slide as SlideType } from "../../../Store/Model/slide";
import { useContextMenu } from "../../ContextMenu/ContextMenu.hooks";
import style from "../Slide.module.css";
import { LiteSlideObject as SlideObject } from "../../slideObject/previewSlideObject/slideObject";

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
    const { turnOff: disableCM } = useContextMenu();
    return (
        <div
            className={                                   //TODO: add basic class
                ` ${slide.background.type === "color"
                    ? style.colorBg
                    : style.imageBg}
                    ${style.slide}
                    ${style.mini}
                `
            }
            style={setCssProps(slide)}
            onClick={
                (e) => {
                    e.stopPropagation();
                    //отключение всех контекстных меню вне зависимости от точки нажатия                    
                    disableCM();
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