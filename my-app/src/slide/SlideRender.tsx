import { forwardRef, type MouseEventHandler, useCallback, useMemo, useRef } from "react";
import style from "./Slide.module.css";
import type { Slide } from "../Store/Model/slide"
import { SlideObject } from "../slideObject/SlideObject";
import { LiteSlideObject } from "../slideObject/previewSlideObject/slideObject";
import { StaticSlideObject } from "../slideObject/staticSlideObject/SlideObject";
import { useStyle } from "./slide.styles";
import { useEditor } from "../hooks/editor.hooks";

type RenderProps = {
    type: "editable",
    size?: null,
    slide: Slide,
    slideObjectRefs: Map<string, React.RefObject<HTMLDivElement | null>>,
    onClick: MouseEventHandler<HTMLDivElement>,
    onContextMenu: MouseEventHandler<HTMLDivElement>
} | {
    type: "preview" | "static",
    size?: "mini" | "ordinary",
    slide: Slide,
    slideObjectRefs?: Map<string, React.RefObject<HTMLDivElement | null>>,
    onClick?: MouseEventHandler<HTMLDivElement>,
    onContextMenu?: MouseEventHandler<HTMLDivElement>
}

const SlideRender = forwardRef<HTMLDivElement | null, RenderProps>(
    (
        { type, size, slide, slideObjectRefs, onClick, onContextMenu },
        ref
    ) => {
        const { useSelector } = useEditor();
        const isSelected = useSelector(state => state.selection.selectedSlides[0]) === slide.id;
        const slideRef = useRef<HTMLDivElement | null>(null);
        const slideRefAssigner = useCallback(
            (node: HTMLDivElement) => {
                slideRef.current = node;
                if (ref && typeof ref !== "function") {
                    ref.current = node
                }
            },
            [slideRef, ref]
        );
        const stylish = useCallback(
            (type: "static" | "preview" | "editable") => {
                switch (type) {
                    case "static":
                        return `${style.static} ${size && style.miniStatic}`;
                    case "preview":
                        return `${style.preview} ${style.mini}`;
                    case "editable":
                        return style.editable;
                }
            },
            [style, size],
        );
        const className = useMemo(
            () =>
            `
                ${slide.background.type === "color"
                    ? style.colorBg
                    : style.imageBg
                }
                ${style.slide}
                ${type === "preview" && style.preview}
                ${stylish(type)}
                ${isSelected && style.selected}
            `,
            [slide, stylish, type, isSelected]
        );
        useStyle(
            slide,
            slideRef
        );
        return (
            <div
                ref={slideRefAssigner}
                className={className}
                onClick={onClick}
                onContextMenu={onContextMenu}
            >
                {                                           
                    slide.objects.map(
                        (slideObject) => {
                            switch (type) {
                                case "editable":
                                    return (
                                        <SlideObject
                                            ref={slideObjectRefs.get(slideObject.id)}
                                            object={slideObject}
                                            key={slideObject.id}
                                            containerRef={slideRef}
                                        />
                                    );
                                case "static":
                                    return (
                                        <StaticSlideObject object={slideObject} />
                                    );
                                case "preview":
                                    return (
                                        <LiteSlideObject object={slideObject} />
                                    )
                            }
                        }

                    )
                }
            </div>
        );
    }
);

export {
    SlideRender
}