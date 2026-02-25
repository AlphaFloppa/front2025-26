import { useEffect } from "react"
import type { Slide } from "../Store/Model/slide"

const useStyle = 
    (
        slide: Slide,
        slideRef: React.RefObject<HTMLDivElement | null>
    ) => {
        useEffect(
            () => {
                if (slide.background.type === "color") {
                    slideRef.current?.style.setProperty("--definedBgColor", slide.background.code)
                } else {
                    slideRef.current?.style.setProperty("--definedBgImage", slide.background.src)
                }
            }
        );
    };

export { useStyle }