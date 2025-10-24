import { useRef, useState, createContext, type JSX, useContext} from "react";
import type { ContextMenu } from "../../Store/Model/contextMenu";
import type { Position } from "../../Store/Model/slideContent";
import { miniSlideContextMenuTemplate, slideContextMenuTemplate, objectContextMenuTemplate } from "./ContextMenu.templates";

//возвращает набор заранее готовый шаблонов меню
const useContextMenuTemplate = () => ({ 
    workplaceSlideCM: slideContextMenuTemplate,
    slideListSlideCM: miniSlideContextMenuTemplate,
    objectCM: objectContextMenuTemplate
})

type turnOnProps = {
    position: Position,
    template: ContextMenu
}

//берет данные из контекста и возвращает функции включения выключения и данные о контектсном меню сейчас
//при использовании функций изменяется состояние в хранилище-компоненте-провайдере => ререндер
//контекст лишь дает возможность хуку везде влиять/использовать данные из хранилища ContextMenuStorage
const useContextMenu = () => {          
    let {
        isEnabled: [isEnabled, setIsEnabled] = [false, () => { }],
        position: positionStore = {x: 0, y: 0},
        template: templateStore = {options: []}
    } = useContext(ContextMenuContext) || {};

    const turnOn = ({ position, template }: turnOnProps) => {
        positionStore = position;
        templateStore = template;
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

const ContextMenuContext = createContext<ContextMenuStorageData | undefined>(undefined);

type ContextMenuStorageData = {
    isEnabled: [isEnabled: boolean, setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>],
    position?: Position,
    template?: ContextMenu
};

const ContextMenuStorage = (users: JSX.Element) => { 
    const [isEnabled, setIsEnabled] = useState(false);
    const positionStore = useRef<Position | undefined>(undefined);
    const templateStore = useRef<ContextMenu | undefined>(undefined);
    const value: ContextMenuStorageData = {
        isEnabled: [isEnabled, setIsEnabled],
        position: positionStore.current,
        template: templateStore.current
    };

    return (
        <ContextMenuContext.Provider value={ value } >
            { users }
        </ContextMenuContext.Provider>  
    );
}

export { 
    useContextMenuTemplate,
    useContextMenu,
    ContextMenuStorage
}