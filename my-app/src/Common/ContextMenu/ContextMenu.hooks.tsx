import { useRef, useState, createContext, type JSX, useContext } from "react";
import type { ContextMenu } from "../../Store/Model/contextMenu";
import type { Position } from "../../Store/Model/slideContent";
import type { Slide } from "../../Store/Model/slide";
import { verify } from "../../Store/Services/editFunctions";
import { useEditor } from "../../hooks/editor.hooks";
import { getClickRelativePositionAtSlide } from "../slide/Slide";
import * as Services from "../../Store/Services/editFunctions"


const useContextMenuTemplate = () => {
    const { useDispatch, useSelector } = useEditor();
    const slideContextMenuTemplate: ContextMenu = {  //вынести это все в useCMTemplate для возможности использования там useEditor
        options: [
            {
                name: "Изменить фон",
                clickHandler: () => { }
            },
            {
                name: "Создать текст",
                clickHandler: ({ nativeEvent: { offsetX, offsetY }, ...e }: React.MouseEvent<HTMLDivElement>) => {                //принимает event ПКМ по слайду
                    const target = e.target as HTMLDivElement;
                    useDispatch().
                        addObjectToSlide(
                            Services.createTextObject(
                                {
                                    id: Date.now().toString(),
                                    position: getClickRelativePositionAtSlide(
                                        {
                                            offsetX,
                                            offsetY
                                        },
                                        target
                                    )
                                }

                            )
                        )
                }
            },
            {
                name: "Импортировать изображение",
                clickHandler: ({ nativeEvent: { offsetX, offsetY }, ...e }: React.MouseEvent<HTMLDivElement>, uploadedImageUrl: string) => {    //принимает event ПКМ по слайду
                    const target = e.target as HTMLDivElement;
                    useDispatch().
                        addObjectToSlide(
                            Services.createImageObject(
                                {
                                    id: Date.now().toString(),
                                    position: getClickRelativePositionAtSlide(
                                        {
                                            offsetX,
                                            offsetY
                                        },
                                        target
                                    ),
                                    src: uploadedImageUrl
                                },
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
                    useDispatch().
                        removeObjectsFromSlide(
                            useSelector(state => state.selection).selectedSlideObjects[0],
                            useSelector(state => state.selection).selectedSlideObjects
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
                    useDispatch().
                        removeSlide(
                            slideId
                        )
                }
            }
        ]
    }

    const createTemplate = (initialTemplate: ContextMenu, additionalClickHandlersArray?: Array<Function>, payload?: any) => {
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
    };

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

type turnOnProps = {
    position: Position,
    template: ContextMenu
}

//берет данные из контекста и возвращает функции включения выключения и данные о контектсном меню сейчас
//при использовании функций изменяется состояние в хранилище-компоненте-провайдере => ререндер
//контекст лишь дает возможность хуку везде влиять/использовать данные из хранилища ContextMenuStorage
const useContextMenu = () => {
    const {
        isEnabled: [isEnabled, setIsEnabled],
        position: positionStore,
        template: templateStore,
        setPosition,
        setTemplate
    } = verify(useContext(ContextMenuContext));

    const turnOn = ({ position, template }: turnOnProps) => {
        setPosition(position);
        setTemplate(template);
        setIsEnabled(true);
    }

    const turnOff = () => {
        setIsEnabled(false);
    }

    return {
        turnOn: turnOn,
        turnOff: turnOff,
        state: {
            isEnabled: isEnabled,
            position: positionStore,
            template: templateStore
        }
    }
};

const ContextMenuContext = createContext<ContextMenuStorageData | null>(null);

type ContextMenuStorageData = {
    isEnabled: [isEnabled: boolean, setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>],
    position?: Position,
    setPosition: Function
    template?: ContextMenu,
    setTemplate: Function
};

function ContextMenuProvider({ users }: { users: JSX.Element }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const positionStore = useRef<Position | undefined>(undefined);      //TODO: возможно правильнее изменить рефы на state
    const templateStore = useRef<ContextMenu | undefined>(undefined);
    const setPosition = (position: Position) => {
        positionStore.current = position
    }
    const setTemplate = (template: ContextMenu) => {
        templateStore.current = template
    }
    const value: ContextMenuStorageData = {
        isEnabled: [isEnabled, setIsEnabled],
        position: positionStore.current,
        setPosition: setPosition,
        template: templateStore.current,
        setTemplate: setTemplate
    };

    return (
        <ContextMenuContext.Provider value={value} >
            {users}
        </ContextMenuContext.Provider>
    );
}

export {
    useContextMenuTemplate,
    useContextMenu,
    ContextMenuProvider,
}