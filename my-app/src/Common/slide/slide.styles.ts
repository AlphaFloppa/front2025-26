import { useCallback, useEffect } from "react"
import type { Slide } from "../../Store/Model/slide"

//устанавливает переменные для их использования в модуле css
//TODO: внедрить useCallback
//с ним какие то пролемы возникают
const useStyle = 
    (
        slide: Slide,
        slideRef: React.RefObject<HTMLDivElement | null>,
        isMini: boolean
    ) => {
        useEffect(
            () => {
                slideRef.current?.style.setProperty(
                    "--k",
                    isMini
                        ? "0.2124"
                        : "1"
                );
                if (slide.background.type === "color") {
                    slideRef.current?.style.setProperty("--definedBgColor", slide.background.code)
                } else {
                    slideRef.current?.style.setProperty("--definedBgImage", slide.background.src)
                }
            }
        );
    };

export { useStyle }