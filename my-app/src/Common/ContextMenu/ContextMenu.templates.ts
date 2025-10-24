import { dispatchContextMenuOff, dispatchPresentation, editor } from "../../Store/Model/editor";
import { getClickRelativePositionAtSlide } from "../slide/Slide";
import { addObjectToSlide, createTextObject, createImageObject, disposeImagesUrls, removeObjectsFromSlide, removeSlide} from "../../Store/Services/editFunctions";
import type { ContextMenu } from "../../Store/Model/contextMenu";
import type React from "react";
import type { Slide } from "../../Store/Model/slide";

const slideContextMenuTemplate: ContextMenu = {     //модель контекстного меню
    options: [                                     
        {
            name: "Изменить фон",
            clickHandler: () => { }
        },
        {
            name: "Создать текст",
            clickHandler: (e: React.MouseEvent<HTMLDivElement>) => {                //принимает event ПКМ по слайду
                const { currentTarget } = e;
                dispatchPresentation(
                    () => addObjectToSlide(
                        editor.presentation,
                            {
                                slideId: editor.selection.selectedSlides[0],
                                object: createTextObject(
                                    {
                                        id: Date.now().toString(),
                                        position: getClickRelativePositionAtSlide(e, currentTarget)
                                    }
                                )
                            }
                        )
                )
            }
        },
        {
            name: "Импортировать изображение",
            clickHandler: (e: React.MouseEvent<HTMLDivElement>, uploadedImageUrl: string) => {    //принимает event ПКМ по слайду
                const { currentTarget } = e;
                dispatchPresentation(
                    () => addObjectToSlide(
                        editor.presentation,
                        {
                            slideId: editor.selection.selectedSlides[0],
                            object: createImageObject(
                                {
                                    id: Date.now().toString(),
                                    position: getClickRelativePositionAtSlide(e, currentTarget), 
                                    src: uploadedImageUrl
                                }
                            )
                        }
                    )
                )
            },
            isForUpload: true
        }
    ]
};

const objectContextMenuTemplate: ContextMenu = {
    options: [
        {
            name: "Удалить",
            clickHandler: () => {
                let {
                    selectedSlides: slides,
                    selectedSlideObjects: objects
                } = editor.selection;
                disposeImagesUrls(editor.presentation, { targetSlideId: slides[0], objectsIds: objects });
                dispatchPresentation(
                    () => removeObjectsFromSlide(
                        editor.presentation, { slideId: slides[0], removingObjectsId: objects }
                    )
                )
            }
        }
    ]
}

const miniSlideContextMenuTemplate: ContextMenu = {
    options: [
        {
            name: "Удалить",
            clickHandler: ({ id: slideId }: Slide) => {
                dispatchContextMenuOff();
                dispatchPresentation(() => removeSlide(editor.presentation, { id: slideId }))
            }
        }
    ]
}

export { 
    miniSlideContextMenuTemplate,
    slideContextMenuTemplate,
    objectContextMenuTemplate
}