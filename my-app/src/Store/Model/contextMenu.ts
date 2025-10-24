import { dispatchPresentation, editor} from "./editor";
import * as Services from "../Services/editFunctions";

type ContextMenuOption = {
    name: string,
    clickHandler: Function              //TODO: добавить поле isForUpload => условное отображение в компоненте
    isForUpload?: boolean  
};                                        

type ContextMenu = {
    options: Array<ContextMenuOption>
};

let slidePreview: ContextMenu = {
    options: [
        {
            name: "Удалить",
            clickHandler: function (slideId: string) {
                dispatchPresentation(
                    function () {
                        Services.removeSlide(editor.presentation, { id: slideId });
                    }
                )
            }
        }
    ]
};

export {
    slidePreview
};

export type { 
    ContextMenu,
    ContextMenuOption
}