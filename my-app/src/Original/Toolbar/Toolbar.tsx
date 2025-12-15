import { Button } from "../../Common/Button/Button";
import style from "../Toolbar/Toolbar.module.css"; 

const Toolbar = () => {             //обернуть в React.memo
    return (
        <div className = {style.toolbar}>
            <section className = {style.section}>
                <Button clickHandler={() => { }} destination="addText"/>
                <Button clickHandler={() => { }} destination="addImage"/>
            </section>
            <section className = {style.section}>
                <Button clickHandler={() => { }} destination="editFontFamily"/>
                <Button clickHandler={() => { }} destination="editFontSize"/>
            </section>
        </div>
    );
}

export {
    Toolbar
}