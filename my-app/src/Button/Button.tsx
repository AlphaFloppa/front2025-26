import style from "../Button/Button.module.css";

const defineButtonStyle = (destination: ButtonDestination): string => {  
    return(
        {
            "incrementFontSize": style.incrementFontSize,
            "decrementFontSize": style.decrementFontSize,
            "editFontFamily": style.editFontFamily, 
            "addText": style.addText,
            "addImage": style.addImage, 
            "addSlide": style.addSlide,
            "apply": style.applyBtn,
            "cancel": style.cancelBtn,
            "undo": style.undo,
            "redo": style.redo,
            "overview": style.overview,
            "deleteSlide": style.deleteSlide,
            "colorizeText": style.colorizeText
        }[destination]
    ) as string;
}

type ButtonDestination = (
    "incrementFontSize" |
    "decrementFontSize" |
    "editFontFamily" |
    "addText" |
    "addImage" |
    "addSlide" |
    "apply" |
    "cancel" |
    "undo" |
    "redo" |
    "overview" |
    "deleteSlide" |
    "colorizeText"
);

type ButtonProps = {
    clickHandler: Function,
    destination: ButtonDestination
}

function Button({clickHandler, destination}: ButtonProps) {
    return (
        <button 
            className={`${defineButtonStyle(destination)} ${style.button}`}
            onClick={() => { clickHandler() }}
        >
            { destination === "apply"
                ? "Apply"
                : destination === "cancel"
                    ? "Cancel"
                    : ""
            }
        </button>
    );
}


export {
    Button
}