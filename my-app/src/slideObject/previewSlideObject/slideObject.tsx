import { type SlideObject as SlideObjectType } from "../../Store/Model/slideContent";
import { SlideObjectRender } from "../SlideObjectRender";

type SlideObjectProps = {
    object: SlideObjectType
}

const SlideObject = ({ object }: SlideObjectProps) => {
    return (
        <SlideObjectRender
            type="preview"
            object={object}
        />
    );
}

export {
    SlideObject as LiteSlideObject
}