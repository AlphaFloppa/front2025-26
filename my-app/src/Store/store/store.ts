import type { ContextMenuState } from "./contextMenu/slice";
import type { ModalWindowState } from "./modalWindow/slice";
import contextMenuReducer from "./contextMenu/reducer";
import modalWindowReducer from "./modalWindow/reducer";
import selectionReducer from "./selection/reducer";
import slidesReducer from "./slides/reducer";
import presentationTitleReducer from "./presentationTitle/reducer";
import setPresentationIdReducer from "./init";
import { undoRedoMiddleware } from "./middlewares/undo_redo";
import { type Slide } from "../Model/slide";
import type { Selection } from "../Model/selection";
import { configureStore } from "@reduxjs/toolkit";
import { DBMiddleWare } from "./middlewares/db_usage";

type Action = {
    type: string,
    payload: any
}

type AppState = {
    presentationId: string,
    title: string,
    slides: Slide[],
    selection: Selection,
    contextMenu: ContextMenuState,
    modalWindow: ModalWindowState
}

const finalReducer = {
    presentationId: setPresentationIdReducer,
    title: presentationTitleReducer,
    slides: slidesReducer,
    selection: selectionReducer,
    contextMenu: contextMenuReducer,
    modalWindow: modalWindowReducer
};

const store = configureStore(
    {
        reducer: finalReducer,
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(undoRedoMiddleware).concat(DBMiddleWare)
        },
    }
);

export {
    store,
    type Action,
    type AppState
}