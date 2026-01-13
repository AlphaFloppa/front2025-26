import { useStyle } from "../slide.styles";
import { type Slide as SlideType } from "../../../Store/Model/slide";
import style from "../Slide.module.css";
import { useRef } from "react";
import { StaticSlideObject as SlideObject } from "../../slideObject/staticSlideObject/SlideObject";

type SlideProps = {
    slide: SlideType
}

const Slide = (
    { slide }: SlideProps
) => { 
    const slideDOMNodeRef = useRef<HTMLDivElement | null>(null);
    useStyle(
        slide,
        slideDOMNodeRef
    );
    return (
        <div
            ref={slideDOMNodeRef}
            className={                                   //TODO: add basic class
                ` ${slide.background.type === "color"
                    ? style.colorBg
                    : style.imageBg}
                    ${style.slide}
                `
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
    Slide as StaticSlide
}