import { Button } from "../../Common/Button/Button";
import style from "../Toolbar/Toolbar.module.css"; 

type ToolbarProps = {
    eventHandlers: {
        addText: Function,
        addImage: Function,
        editFontFamily: Function,
        editFontSize: Function
    }
}

function Toolbar({eventHandlers}: ToolbarProps) {
    return (
        <div className = {style.toolbar}>
            <section className = {style.section}>
                <Button clickHandler={eventHandlers.addText} destination="addText"/>
                <Button clickHandler={eventHandlers.addImage} destination="addImage"/>
            </section>
            <section className = {style.section}>
                <Button clickHandler={eventHandlers.editFontFamily} destination="editFontFamily"/>
                <Button clickHandler={eventHandlers.editFontSize} destination="editFontSize"/>
            </section>
        </div>
    );
}

export {
    Toolbar
}