import type { CSSProperties } from "react";
import type { Position } from "../../Store/Model/slideContent";
import style from "./ContextMenu.module.css";
import type { ContextMenu as ContextMenuType } from "../../Store/Model/contextMenu";
import { useRef, useState, useEffect, useContext } from "react";
import { verify } from "../../Store/Services/editFunctions";
import { useContextMenu } from "./ContextMenu.hooks";

type ContextMenuProps = {
    position: Position,
    menu: ContextMenuType
};

const fileToUrl = (file: File): string => window.URL.createObjectURL(file);

const definePosition = (position: Position): CSSProperties =>
(
    {
        "--windowPosY": `${position.y}px`,
        "--windowPosX": `${position.x}px`
    } as CSSProperties
);

function ContextMenu({ position, menu: { options } }: ContextMenuProps) {
    const { turnOff: disableCM } = useContextMenu();
    let inputRef = useRef(null);
    let storage = useRef("");
    let [isInputRefEnabled, setIsInputRefEnabled] = useState(false);
    useEffect(() => {
        setIsInputRefEnabled(true);
    });
    return (
        <div className={style.list} style={{ ...definePosition(position)}}>
            {
                options.map(
                    ({ name, clickHandler, isForUpload }) =>
                        <span className={style.option}
                            onClick={
                                isForUpload
                                    ? (isInputRefEnabled
                                        ? (e) => {
                                            e.stopPropagation();  
                                            //@ts-ignore
                                            inputRef.current.value = "";
                                            //@ts-ignore
                                            inputRef.current.click();       //инициирование события на input для записи в useRef файла                                            
                                        }
                                        : () => { })
                                    : (e) => { e.stopPropagation(); clickHandler(e); }
                            }
                        >
                            {name}
                            {
                                isForUpload
                                    ? <input
                                        type="file"
                                        ref={inputRef}
                                        style={{ display: "none" }}
                                        value={""}
                                        onClick={(e) => { console.log(e)}}
                                        onChange={
                                            (e) => {
                                                const importedFile = verify(e.currentTarget.files)[0];
                                                storage.current = fileToUrl(importedFile);
                                                clickHandler(storage.current);
                                                //запись в useRef опции
                                            }}
                                        />
                                    : null
                            }
                        </span>
                )
            }
        </div>
    );
}

export {
    ContextMenu
}