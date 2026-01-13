import { Button } from "../../Common/Button/Button";
import style from "../Toolbar/Toolbar.module.css"; 
import { useEditor } from "../../hooks/editor.hooks";
import { useNavigate } from "react-router-dom";

const Toolbar = () => {             //обернуть в React.memo
    const { useDispatch } = useEditor();
    const { undo, redo } = useDispatch();
    const navigate = useNavigate();
    return (
        <div className={style.toolbar}>
            <section className={style.section}>
                <Button clickHandler={() => { undo() }} destination="undo" />
                <Button clickHandler={() => { redo() }} destination="redo" />
            </section>
            <section className = {style.section}>
                <Button clickHandler={() => { }} destination="addText"/>
                <Button clickHandler={() => { }} destination="addImage"/>
            </section>
            <section className = {style.section}>
                <Button clickHandler={() => { }} destination="editFontFamily"/>
                <Button clickHandler={() => { }} destination="editFontSize"/>
            </section>
            <section className={style.section}>
                <Button clickHandler={ () => navigate("/overview") } destination="overview"/>
            </section >
        </div>
    );
}

export {
    Toolbar
}