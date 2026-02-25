import { useCallback } from "react";
import { useEditor } from "../hooks/editor.hooks";
import style from "../presentationNameEditor/PresentationNameEditor.module.css";

const PresentationNameEditor = () => {                          //обернуть в react.memo
    const { useSelector, useDispatch } = useEditor();
    const { changeTitle } = useDispatch();
    const currentName = useSelector(state => state.title);
    const changeHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            changeTitle(
                {
                    title: e.target.value
                }
            )
        },
        [changeTitle]
    );
    return (
        <div className={style.container}>
            <input
                type="text"
                className={style.input}
                value={currentName}
                onChange={changeHandler}
            />
        </div>
    );
}

export {
    PresentationNameEditor
}