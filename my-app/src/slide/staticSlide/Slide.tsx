import { type Slide as SlideType } from "../../Store/Model/slide";
import { SlideRender } from "../SlideRender";

type SlideProps = {
    type?: "mini" | "ordinary"
    slide: SlideType
}

const Slide = (
    { slide, type }: SlideProps
) => { 
    return (
        <SlideRender
            type={"static"}
            size={ type && "mini"}
            slide={slide}
        />
    )
}

export {
    Slide as StaticSlide
}