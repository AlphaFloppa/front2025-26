import style from "../presentationNameEditor/PresentationNameEditor.module.css";

type PresentationNameEditorProps = {
    currentName: string, 
    changeHandler: Function
}

function PresentationNameEditor({currentName, changeHandler}: PresentationNameEditorProps){
    return (
        <div className={style.container}>
            <input type="text" className={style.input} value={currentName} onChange={(e) => { changeHandler(e.target.value) } } />
        </div>
    );
}

export {
    PresentationNameEditor
}