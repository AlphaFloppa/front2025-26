import { Button } from "../../Common/Button/Button"
import type {Image} from "../../Store/Model/slideContent"
import style as toolbarStyle from "../Toolbar/Toolbar.module.css"; 
import style as btnStyle from "../Button/Button.module.css";

export function Toolbar(
    props: {
        icons: {
            addText: Image,
            addImg: Image,
            editFontFamily: Image,
            editFontSize: Image
        },
        eventHandlers: {
            addText: Function,
            addImage: Function,
            editFontFamily: Function,
            editFontSize: Function
        }
    }
) {
    return
        <div className = {toolbarStyle.toolbar}>
            <section className = {toolbarStyle.section}>
                <Button class =  clickHandler={() => props.eventHandlers.addText} icon={props.icons.addText}/>
                <Button class = "image" clickHandler={() => props.eventHandlers.addImage} icon={props.icons.addImg}/>
            </section>
            <section className = {toolbarStyle.section}>
                <Button class = "font-family" clickHandler={() => props.eventHandlers.editFontFamily} icon={props.icons.addText}/>
                <Button class = "font-size" clickHandler={() => props.eventHandlers.editFontSize} icon={props.icons.addText}/>
            </section>
        </div>
}