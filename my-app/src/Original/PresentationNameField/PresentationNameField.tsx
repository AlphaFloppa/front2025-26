export function PresentationNameField(props: {name: string, eventHandler: Function}){
    return
        <div className="textarea-container">
            <input type = "text" className="beautiful-textarea" value = {props.name} onChange={() => props.eventHandler}/>
        </div>;
}