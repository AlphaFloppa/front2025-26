import { type Slide as SlideType } from "../../Store/Model/slide";
import { forwardRef, useCallback } from "react";
import { useEditor } from "../../hooks/editor.hooks";
import { SlideRender } from "../SlideRender";

type SlideProps = {
    slide: SlideType
}

const Slide = forwardRef<HTMLDivElement | null, SlideProps>(
    ({ slide }: SlideProps, ref) => {
        const { useDispatch } = useEditor();
        const { disableContextMenu, selectSlide, nullifySlideObjectSelection } = useDispatch();
        const onClick = useCallback(
            () => {
                disableContextMenu();
                nullifySlideObjectSelection();
                selectSlide(
                    {
                        id: slide.id
                    }
                )
            },
            [disableContextMenu, selectSlide, slide]
        );
        return (
            <SlideRender
                ref={ ref }
                type={"preview"}
                slide={slide}
                onClick={onClick}
            />
        )
    }
)

export {
    Slide as LiteSlide,
}