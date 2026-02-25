import { type SlideObject as SlideObjectType } from "../../Store/Model/slideContent";
import { SlideObjectRender } from "../SlideObjectRender";

type SlideObjectProps = {
    object: SlideObjectType
}

const SlideObject = ({ object }: SlideObjectProps) => {
    return (
        <SlideObjectRender
            type={"static"}
            object={object}
        />
    );
}

export {
    SlideObject as StaticSlideObject
}