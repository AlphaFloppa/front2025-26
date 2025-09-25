import type { Image } from "../../Store/Model/slideContent";

export function Button(
    props: {
        clickHandler: Function, 
        icon: Image,
        class: string
    }
) {
    return
        <button className = {props.class} onClick = {() => props.clickHandler}>
            <img src = {props.icon.src}/>
        </button>;
}