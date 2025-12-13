import { useCallback, useMemo } from "react";
import type { ContextMenu } from "../../Store/Model/contextMenu";
import type { Slide } from "../../Store/Model/slide";
import { useEditor } from "../../hooks/editor.hooks";
import * as Services from "../../Store/Services/editFunctions"
import type { Position } from "../../Store/Model/slideContent";

type useContextMenuTemplateResult = {
    createWorkplaceSlideCM: (additionalClickHandlersArray?: Function[] | undefined, payload?: any) => ContextMenu;
    createSlideListCM: (additionalClickHandlersArray?: Array<Function>, payload?: any) => ContextMenu;
    createSlideObjectCM: (additionalClickHandlersArray?: Array<Function>, payload?: any) => ContextMenu;
}

const useContextMenuTemplate = (): useContextMenuTemplateResult => {
    const { useDispatch, useSelector } = useEditor();
    const {
        addObjectToSlide,
        removeSlide,
        removeObjectsFromSlide,
        enableModalWindow,
        editBackground,
        disableContextMenu
    } = useDispatch();
    const { selectedSlides, selectedSlideObjects } = useSelector(state => state.selection);
    const activeSlideId = selectedSlides[0];
    const slideContextMenuTemplate: ContextMenu = useMemo(
        () => ({
            options: [
                {
                    name: "Изменить фон",
                    clickHandler: () => {
                        enableModalWindow(
                            "colorpicker",
                            (colorCode: string) => {
                                editBackground(
                                    activeSlideId,
                                    {
                                        type: "color",
                                        code: colorCode
                                    }
                                )
                            },
                            () => { }
                        );
                        disableContextMenu();
                    },
                },
                {
                    name: "Создать текст",
                    clickHandler: (position: Position) => {                //принимает event ПКМ по слайду
                        addObjectToSlide(
                            activeSlideId,
                            Services.createTextObject(
                                {
                                    id: Date.now().toString(),
                                    position
                                }
                            )
                        );
                        disableContextMenu();
                    }
                },
                {
                    name: "Импортировать изображение",
                    clickHandler: (position: Position, uploadedImageUrl: string) => {   
                        addObjectToSlide(
                            activeSlideId,
                            Services.createImageObject(
                                {
                                    id: Date.now().toString(),
                                    position,
                                    src: uploadedImageUrl
                                },
                            )
                        );
                        disableContextMenu();
                    },
                    isForUpload: true
                }
            ]
        }),
        [addObjectToSlide, editBackground, enableModalWindow, activeSlideId]
    );

    const objectContextMenuTemplate: ContextMenu = useMemo(
        () => ({
            options: [
                {
                    name: "Удалить",
                    clickHandler: () => {
                        removeObjectsFromSlide(
                            activeSlideId,
                            selectedSlideObjects
                        );
                        disableContextMenu();
                    }
                }
            ]
        }),
        [removeObjectsFromSlide, activeSlideId, selectedSlideObjects]
    );

    const miniSlideContextMenuTemplate: ContextMenu = useMemo(
        () => ({
            options: [
                {
                    name: "Удалить",
                    clickHandler: ({ id: slideId }: Slide) => {
                        removeSlide(
                            slideId
                        );
                        disableContextMenu();
                    }
                }
            ]
        }),
        [removeSlide]
    );

    const createTemplate = useCallback(
        (
            initialTemplate: ContextMenu,
            additionalClickHandlersArray?: Array<Function>,
            payload?: any
        ) => {
            if (!additionalClickHandlersArray) {
                return initialTemplate;
            }

            const workplaceSlideCM: ContextMenu = {
                options: additionalClickHandlersArray.map(
                    (additionalClickHandler, index) => {
                        const option = initialTemplate.options[index];
                        return {
                            ...option,
                            clickHandler: (
                                option.isForUpload
                                    ? (uploadedImageUrl: string) => {
                                        if (payload) {
                                            option.clickHandler(payload, uploadedImageUrl);
                                        } else {
                                            option.clickHandler(uploadedImageUrl);
                                        }
                                        //TODO: изменить генерацию так чтобы можно было вызывать нативный handler из кастомной нагрузки
                                        //причем нагрузка везде разная
                                        //ведь разным handlers из templates нужны разные аргументы
                                        //возможно придется вернуться к разным creators для разных templates
                                        additionalClickHandler();
                                    }
                                    : () => {
                                        if (payload) {
                                            option.clickHandler(payload);
                                        } else {
                                            option.clickHandler();
                                        }
                                        additionalClickHandler();
                                    }
                            ) as Function
                        }
                    }
                )
            }
            return workplaceSlideCM;
        },
        []
    );

    return {
        createWorkplaceSlideCM: (additionalClickHandlersArray?: Array<Function>, payload?: any) => (
            createTemplate(slideContextMenuTemplate, additionalClickHandlersArray, payload)
        ),
        createSlideListCM: (additionalClickHandlersArray?: Array<Function>, payload?: any) => (
            createTemplate(miniSlideContextMenuTemplate, additionalClickHandlersArray, payload)
        ),
        createSlideObjectCM: (additionalClickHandlersArray?: Array<Function>, payload?: any) => (
            createTemplate(objectContextMenuTemplate, additionalClickHandlersArray, payload)
        ),
    }
}

export {
    useContextMenuTemplate,
    type useContextMenuTemplateResult
}