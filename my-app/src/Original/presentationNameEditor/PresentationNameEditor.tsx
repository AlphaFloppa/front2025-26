import { useEditor } from "../../hooks/editor.hooks";
import style from "../presentationNameEditor/PresentationNameEditor.module.css";

const PresentationNameEditor = () => {                          //обернуть в react.memo
    const { useSelector, useDispatch } = useEditor();
    const { changeTitle } = useDispatch();
    const currentName = useSelector(state => state.title);
    return (
        <div className={style.container}>
            <input
                type="text"
                className={style.input}
                value={currentName}
                onChange={
                    (e) => {
                        changeTitle(
                            {
                                title: e.target.value
                            }
                        )
                    }
                }
            />
        </div>
    );
}

export {
    PresentationNameEditor
}