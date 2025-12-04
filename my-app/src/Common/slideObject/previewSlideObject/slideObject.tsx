import { type SlideObject as SlideObjectType } from "../../../Store/Model/slideContent";
import style from "../SlideObject.module.css";
import { useEditor } from "../../../hooks/editor.hooks";
import { setObjectProps } from "../slideObject.styles";

type SlideObjectProps = {
    object: SlideObjectType,
}

const SlideObject = ({ object }: SlideObjectProps) => {
    const { useSelector } = useEditor();
    const isSelected = useSelector(state => state.selection.selectedSlideObjects).some(
        selectedSlideObjectId => selectedSlideObjectId === object.id
    );
    return (
        <>
            {
                object.type === "text"
                    ? (

                        <textarea
                            readOnly={true}
                            tabIndex={-1}
                            contentEditable={false}
                            className={`${style.text} ${style.focusable} ${isSelected ? style.selected : null}`}
                            style={setObjectProps(object)}
                            value={object.content}
                        >
                        </textarea>

                    )
                    : (
                        <div
                            className={`${style.image} ${style.focusable} ${isSelected ? style.selected : null}`}
                            style={setObjectProps(object)}
                        >
                        </div>
                    )
            }
        </>
    );
}

export {
    SlideObject as LiteSlideObject
}