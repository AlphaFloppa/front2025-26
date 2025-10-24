import type { CSSProperties, MouseEventHandler, ReactHTMLElement } from "react";
import type { Slide as SlideType } from "../../Store/Model/slide";
import { SlideObject } from "../slideObject/SlideObject";
import { addObjectToSlide, verify } from "../../Store/Services/editFunctions";
import style from "../slide/Slide.module.css"
import type { ContextMenu } from "../../Store/Model/contextMenu";
import { type Position } from "../../Store/Model/slideContent";
import { dispatchContextMenuOn, dispatchPresentation, editor } from "../../Store/Model/editor";

type SlideProps = {
    slide: SlideType,
    slideIndex: number,
    eventHandlers: {
        click?: MouseEventHandler<HTMLDivElement>,
        contextMenu?: MouseEventHandler<HTMLDivElement>
    }
    isMini?: boolean
}

const getClickRelativePositionAtSlide = (     //определяет относительное смещение клика по слайду в %
    { nativeEvent: { offsetX: x, offsetY: y } }: React.MouseEvent<HTMLDivElement>, slide: EventTarget & HTMLDivElement
): Position =>
    ({
        x: (x / slide.clientWidth) * 100,
        y: (y / slide.clientHeight) * 100,
    });

const setCssProps = (slide: SlideType): CSSProperties =>        //устанавливает переменные для их использования в модуле css
(
    slide.background.type === "color"
        ? { "--definedBgColor": slide.background.code } as CSSProperties
        : { "--definedBgImage": slide.background.src } as CSSProperties
)

function Slide({ slide, slideIndex, eventHandlers: { click, contextMenu }, isMini = false }: SlideProps) {
    return (
        <div
            className={                                   //TODO: add basic class
                ` ${slide.background.type === "color"
                    ? style.colorBg
                    : style.imageBg}
                    ${style.slide}
                    ${isMini ? style.mini : null}
                `
            }
            style={setCssProps(slide)}
            onClick={
                (e) => { 
                    if (click) { 
                        click(e);
                    }
                }
            }
            onContextMenu={
                (e) => {                                //TODO: деструктуризация на stopPropagation, preventDefault
                    e.preventDefault();
                    e.stopPropagation();
                    if (contextMenu) {
                        contextMenu(e);
                    };
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
                                isFocusable={ !isMini }
                                eventHandlers={
                                    {
                                        clickHandler: () => { },
                                        contextMenuHandler: () => { }
                                    }
                                }
                            />
                        )
                    )
                }
            </div>
    );
}

export {
    Slide as SlideComponent,              //TODO: export function himself not type
    getClickRelativePositionAtSlide
}