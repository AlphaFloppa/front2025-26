import { verify } from "../Services/editFunctions";
import type { Presentation } from "./presentation";
import type { Selection } from "./selection";
import { presentation, presentation as testPresentation } from '../Services/tests/data/generalData';
import type { Position } from "./slideContent";
import type { ContextMenu } from "./contextMenu";

type Editor = {
    presentation: Presentation,
    selection: Selection,
    eventHandlers: Function[],                  //функции вызывающиеся при критическом изменении (перерисовка)
    contextMenu: {
        isEnabled: boolean,
        x?: number,
        y?: number,
        template?: ContextMenu
    }
};

let editor: Editor = initializeEditor();

function initializeEditor(): Editor{ 
    return{
        presentation: testPresentation,
        selection: {
            selectedSlides: [presentation.slides[0].id],
            selectedSlideObjects: []
        },
        eventHandlers: [],
        contextMenu: {
            isEnabled: false
        }
    };
}
function addEditorEventHandler(fn: Function) { 
    editor.eventHandlers = [
        ...editor.eventHandlers,
        fn
    ]
}

function dispatchPresentation(fn: Function): void {
    editor.presentation = fn();
    console.log("after edition", editor);
    if (editor.eventHandlers) { 
        editor.eventHandlers.map((handler) => { handler() });
    }
}

function dispatchSlideSelection(slideId: string) { 
    let { selectedSlides: slides } = editor.selection;
    if (slides.find(slide => slide === slideId)) {
        return;
    }
    slides = [
        ...slides,
        slideId
    ];
    console.log(slides);
}

function nullifySlideSelection() {
    editor.selection.selectedSlides = [];
    /*if (editor.eventHandlers) {                                     //TODO: подумать нужен ли ререндер
        editor.eventHandlers.map((handler) => { handler() });
    }*/
}

function dispatchSlideObjectCtrlSelection(slideObjectId: string) {
    let { selectedSlideObjects: objects } = editor.selection;
    if (objects.find(selectedObject => selectedObject === slideObjectId)) { 
        return;
    }
    editor.selection.selectedSlideObjects = [
        ...objects,
        slideObjectId
    ];
}

function dispatchSlideObjectSelection(slideObjectId: string) { 
    let { selectedSlideObjects: objects } = editor.selection;
    if (objects.find(selectedObject => selectedObject === slideObjectId)) {
        return;
    }
    editor.selection.selectedSlideObjects = [
        slideObjectId
    ];
    console.log(editor.selection);
}

function nullifySlideObjectsSelection() { 
    editor.selection.selectedSlideObjects = [];
    /*if (editor.eventHandlers) {                                     //TODO: подумать нужен ли ререндер
        editor.eventHandlers.map((handler) => { handler() });
    }*/
}

function dispatchContextMenuOn(template?: ContextMenu, position?: Position): void { 
    if (editor.contextMenu.isEnabled) {
        return;
    }
    const contextMenuPosition = verify(position);
    const contextMenuTemplate = verify(template);
    editor.contextMenu = {
        isEnabled: true,
        ...contextMenuPosition,
        template: contextMenuTemplate
    };
    console.log(editor.presentation);
    if (editor.eventHandlers) {
        editor.eventHandlers.map((handler) => { handler() });
    }
}

function dispatchContextMenuOff(): void { 
    if (!editor.contextMenu.isEnabled) {
        return;
    }
    editor.contextMenu.isEnabled = false;
    if (editor.eventHandlers) {
        editor.eventHandlers.map((handler) => { handler() });
    }
}

export {
    editor
}

export { 
    dispatchPresentation,
    dispatchContextMenuOn,
    dispatchContextMenuOff,
    dispatchSlideSelection,
    dispatchSlideObjectSelection,
    addEditorEventHandler,
    nullifySlideObjectsSelection,
    nullifySlideSelection
}

export type { 
    Editor
}