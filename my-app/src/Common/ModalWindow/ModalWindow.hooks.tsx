import React, { useContext, useRef, useState, type JSX } from "react";
import { verify } from "../../Store/Services/editFunctions";

type ModalWindowTypes = "colorpicker";

type ModalWindowStorageData = {
    isEnabled: [isEnabled: boolean, setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>],
    type: [type: ModalWindowTypes | undefined, setType: Function]
    applyHandler: [onApply: Function | undefined, setOnApply: Function],
    cancelHandler: [onCancel: Function | undefined, setOnCancel: Function]
};

const ModalWindowContext = React.createContext<ModalWindowStorageData | null>(null);

type enableMWProps = {
    type: "colorpicker",
    onApply: ((colorCode: string) => void),
    onCancel: ((colorCode?: string) => void)
}

//возвращает функции по включению, по выключению
const useModalWindow = () => {      
    const {
        isEnabled: [isEnabled, setIsEnabled],
        type: [type, setType],
        applyHandler: [onApply, setOnApply],
        cancelHandler: [onCancel, setOnCancel]
    } = verify(useContext(ModalWindowContext));

    //устанавливает данные в контексте-хранилище для дальнейшего их прокидывания компоненту ModalWindow
    const enableMW = ({ type, onApply, onCancel }: enableMWProps) => { 
        setType(type);
        setOnApply(onApply);
        setOnCancel(onCancel);
        setIsEnabled(true);
    };

    //устанавливает флаг в false(а больше ничего и не надо)
    const disableMW = () => { 
        setIsEnabled(false);
    };

    return {
        enableMW,
        disableMW,
        state: {
            isEnabled,
            type,                                //TODO: условное содержание type в объекте в зависимости от isEnabled
            onApply,
            onCancel
        }
    }
};

function ModalWindowProvider({ users }: { users: JSX.Element }) {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const type = useRef<ModalWindowTypes | undefined>(undefined);
    const onApply = useRef <Function | undefined>(undefined);
    const onCancel = useRef<Function | undefined>(undefined);

    const setType = (newType: ModalWindowTypes) => {
        type.current = newType;
    };

    const setOnApply = (newOnOpen: Function) => {
        onApply.current = newOnOpen;
    };

    const setOnCancel = (newOnClose: Function) => {
        onCancel.current = newOnClose;
    };

    const data: ModalWindowStorageData = {
        isEnabled: [isEnabled, setIsEnabled],
        type: [type.current, setType],
        applyHandler: [onApply.current, setOnApply],
        cancelHandler: [onCancel.current, setOnCancel]
    };

    return (
        <ModalWindowContext.Provider value={data}>
            { users }
        </ModalWindowContext.Provider>
    );
}



export {
    useModalWindow,
    ModalWindowProvider
}

export type { 
    ModalWindowTypes
}