import { Button } from "../../Common/Button/Button"
import type {Image} from "../../Store/Model/slideContent"

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
        <div className = "toolbar">
            <section className="add-object">
                <Button class = "text" clickHandler={() => props.eventHandlers.addText} icon={props.icons.addText}/>
                <Button class = "image" clickHandler={() => props.eventHandlers.addImage} icon={props.icons.addImg}/>
            </section>
            <section className = "text-props-editor">
                <Button class = "font-family" clickHandler={() => props.eventHandlers.editFontFamily} icon={props.icons.addText}/>
                <Button class = "font-size" clickHandler={() => props.eventHandlers.editFontSize} icon={props.icons.addText}/>
            </section>
        </div>
}