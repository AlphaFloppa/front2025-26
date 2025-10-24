import style from "../Button/Button.module.css";

//todo type buttonstyle = primary | secondary
const defineButtonStyle = (destination: ButtonDestination): string => {  
    return(
        {
            "editFontSize": style.editFontSize, 
            "editFontFamily": style.editFontFamily, 
            "addText": style.addText,
            "addImage": style.addImage, 
            "addSlide": style.addSlide,
            "apply": style.applyBtn,
            "cancel": style.cancelBtn
        }[destination]
    ) as string;
}

type ButtonDestination = "editFontSize" | "editFontFamily" | "addText" | "addImage" | "addSlide" | "apply" | "cancel";

type ButtonProps = {
    clickHandler: Function,
    destination: ButtonDestination
}

function Button({clickHandler, destination}: ButtonProps) {
    return (
        <button 
            className={`${defineButtonStyle(destination)} ${style.button}`}
            onClick={function () { clickHandler() }}
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