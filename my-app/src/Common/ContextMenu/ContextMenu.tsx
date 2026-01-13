import type { CSSProperties } from "react";
import type { Position } from "../../Store/Model/slideContent";
import style from "./ContextMenu.module.css";
import { useRef, useState, useEffect } from "react";
import { verify } from "../../Store/Services/editFunctions";
import { useEditor } from "../../hooks/editor.hooks";
import { storage } from "../../lib/appwrite";
import { ID } from "appwrite";

const fileToUrl = (file: File): string => window.URL.createObjectURL(file);

const saveFile = async (file: File) => {
    const bucketId = "696675960022b4188fcc";
    return storage.createFile(
        {
            bucketId,
            fileId: ID.unique(),
            file
        }
    ).then(
        result => storage.getFileView(
            {
                bucketId,
                fileId: result.$id
            }
        )
    )
}

const definePosition = (position: Position): CSSProperties =>
(
    {
        "--windowPosY": `${position.y}px`,
        "--windowPosX": `${position.x}px`
    } as CSSProperties
);

const ContextMenu = () => {
    const { useSelector } = useEditor();
    const { isEnabled, template, position, positionAtSlide } = useSelector(state => state.contextMenu);
    let inputRef = useRef(null);
    let storage = useRef("");               //а нужен ли вообще storage
    let [isInputRefEnabled, setIsInputRefEnabled] = useState(false);            //отказаться от этого механизма
    useEffect(() => {
        setIsInputRefEnabled(true);
    });
    if (!isEnabled) {
        return <></>
    }
    return (
        <div
            className={style.list}
            style={
                {
                    ...definePosition(
                        verify(position)
                    )
                }
            }>
            {
                verify(template).options.map(
                    ({ name, clickHandler, isForUpload }, index) =>
                        <span
                            key={index}
                            className={style.option}
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
                                    : (e) => {
                                        e.stopPropagation();
                                        clickHandler(positionAtSlide);
                                    }
                            }
                        >
                            {name}
                            {
                                isForUpload
                                && <input
                                    type="file"
                                    ref={inputRef}
                                    style={{ display: "none" }}
                                    value={""}
                                    onChange={
                                        (e) => {
                                            const importedFile = verify(e.currentTarget.files)[0];
                                            saveFile(importedFile).then(
                                                (url) => { 
                                                    clickHandler(positionAtSlide, url)
                                                }
                                            )
                                            //TODO: get rid of storage
                                            //запись в useRef опции
                                        }}
                                />
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