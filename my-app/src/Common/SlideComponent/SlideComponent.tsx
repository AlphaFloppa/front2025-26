import type { Slide } from "../../Store/Model/slide";

export function SlideComponent(
    props: {
        slide: Slide,
        slideIndex: number
    }
) {
    return
        <>
            <div 
                className="slidePreview" 
                onClick={() => console.log("id is ", props.slide.id.toString(), ", index is " + props.slideIndex)}
                style = {
                    "background: " + 
                        props.slide.background.type === "color" 
                        ? props.slide.background.code
                        : "url(" + props.slide.background.src + ")"}
            >
                {
                    props.slide.objects.map(
                        (slideObject) => 
                            <div class = "slideObject"
                                >
                            </div>
                    )
                }
            </div>
            <span className = "slide-header">
                {props.slide.header}
            </span>
        </>
}