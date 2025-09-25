import type { Slide } from "../../Store/Model/slide"
import { SlideComponent }from "../../Common/SlideComponent";

export function SlidesList(props: {list: Slide[]}){
    return
        <>
            <ol>
                {
                    props.list.map(
                        (slide, slideIndex) => 
                            <li key = {slideIndex} className="slide">
                                <SlideComponent slide = {slide} index = {slideIndex}/>
                            </li>
                    )
                }
            </ol>
        </>;
}