import type { CSSProperties } from "react";
import type { SlideObject as SlideObjectType } from "../../Store/Model/slideContent";
import style from "../slideObject/SlideObjectType.module.css";
import { verify } from "../../Store/Services/editFunctions";
import { dispatchSlideObjectSelection, editor } from "../../Store/Model/editor";
import { useContextMenu, useContextMenuTemplate } from "../ContextMenu/ContextMenu.hooks";

type SlideObjectProps = {
    object: SlideObjectType,
    isFocusable: boolean,
    eventHandlers: {
        clickHandler?: Function,
        contextMenuHandler?: Function
    }
}

const setObjectConstantProps = (object: SlideObjectType)=>
    (
        {
            "--definedPosition": `${object.position.y}% ${object.position.x}%`,
            "--definedWidth": `${object.size.width}px`,
            "--definedHeight": `${object.size.height}px`,
            "--definedLayer": `${object.layer}`
        }
    ) as CSSProperties;

const setObjectVariableProps = (object: SlideObjectType)=>
    (
        object.type === "text"
            ? (
                {
                    "--definedTextColor": `${object.color}`,
                    "--definedTextFontFamily": `${object.font.fontFamily}`,
                    "--definedTextFontSize": `${object.font.fontSize/20}em`
                } as CSSProperties
            )
            : (
                {
                    "--definedImageSource": `url(${object.src})`
                } as CSSProperties
            )
    );

const setObjectProps = (object: SlideObjectType) =>
    (
        {
            ...setObjectConstantProps(object),
            ...setObjectVariableProps(object)
        }
    ) as CSSProperties;

function SlideObject({ object, isFocusable, eventHandlers: { clickHandler, contextMenuHandler } }: SlideObjectProps) {         //TODO: verify object by verify()
    const { slideListSlideCM: CMTemplate } = useContextMenuTemplate();
    const { turnOn: enableCM } = useContextMenu();
    return(
        object.type === "text"
        ? (
            <textarea
                tabIndex={isFocusable ? 0 : -1}
                contentEditable={isFocusable}
                className={`${style.text} ${isFocusable ? style.focusable : null}`}
                style={setObjectProps(object)}
                onClick={
                    isFocusable
                    ? ({ stopPropagation }) => {
                        stopPropagation();
                        dispatchSlideObjectSelection(object.id);            //отметка объекта в модуле editor как выделенного
                        verify(clickHandler)();               //другая нагрузка
                    }
                    : undefined
                }
                onContextMenu={
                    isFocusable && !editor.contextMenu.isEnabled                //если не в превью и нет активного меню
                        ? ({ stopPropagation, preventDefault, clientX: x, clientY: y}) => {
                            if (!editor.selection.selectedSlideObjects.find(            //если не выделен
                                selectedObjectId => selectedObjectId === object.id)
                            ) { 
                                return;
                            }
                            preventDefault();
                            stopPropagation();
                            enableCM(
                                {
                                    position: { x, y },
                                    template: CMTemplate
                                }
                            )
                            verify(contextMenuHandler)();
                        }
                        : undefined
                }
            >
                {object.content}
            </textarea>
        )
        : (
                <div
                    tabIndex={isFocusable ? 0 : -1}
                    className={`${style.image} ${isFocusable ? style.focusable : null}`}
                    style={setObjectProps(object)}
                    onClick={
                        isFocusable
                            ? ({ stopPropagation }) => {
                                stopPropagation();
                                dispatchSlideObjectSelection(object.id);            //отметка объекта в модуле editor как выделенного
                                verify(clickHandler)();               //другая нагрузка
                            }
                            : undefined
                    }
                    onContextMenu={
                        isFocusable && !editor.contextMenu.isEnabled                //если не в превью и нет активного меню
                            ? ({ stopPropagation, preventDefault, clientX: x, clientY: y }) => {
                                if (!editor.selection.selectedSlideObjects.find(            //если не выделен
                                    selectedObjectId => selectedObjectId === object.id)
                                ) {
                                    return;
                                }
                                preventDefault();
                                stopPropagation();
                                enableCM(
                                    {
                                        position: { x, y },
                                        template: CMTemplate
                                    }
                                )
                                verify(contextMenuHandler)();
                            }
                            : undefined
                    }
                >
                </div>
        )
    );
}

export {
    SlideObject
}