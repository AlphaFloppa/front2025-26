import type { CSSProperties } from "react"
import type { Slide } from "../../Store/Model/slide"

const setCssProps = (slide: Slide): CSSProperties =>        //устанавливает переменные для их использования в модуле css
(
    slide.background.type === "color"
        ? { "--definedBgColor": slide.background.code } as CSSProperties
        : { "--definedBgImage": slide.background.src } as CSSProperties
)

export { setCssProps }