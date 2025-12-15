import { bindActionCreators, combineReducers, createStore } from "redux";
import { slideReducer } from "./reducers/slideReducers";
import { presentationNameReducer } from "./reducers/presentationName";
import { selectionReducer } from "./reducers/selectionReducers";
import { ContextMenuReducer, type ContextMenuState } from "./reducers/contextMenuReducer";
import { ModalWindowReducer, type ModalWindowState } from "./reducers/modalWindowReducer";
import { useSelector, type TypedUseSelectorHook, useDispatch } from "react-redux";
import * as TitleActionCreators from './action-creators/presentationName';
import * as SlidesActionCreators from './action-creators/slide';
import * as SelectionActionCreators from "./action-creators/selection";
import * as ContextMenuActionCreators from "./action-creators/contextMenu";
import * as ModalWindowActionCreators from "./action-creators/modalWindow";
import * as UndoRedoActionCreators from "./action-creators/undo_redo";
import * as setStateActionCreators from "./action-creators/setter";
import { undoRedoMiddleware } from "./middlewares/undo_redo";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { type Slide } from "../Model/slide";
import type { Selection } from "../Model/selection";

type Action = {
    type: string,
    payload: any
}

type AppState = {
    title: string,
    slides: Slide[], 
    selection: Selection,
    contextMenu: ContextMenuState,
    modalWindow: ModalWindowState
}

const finalReducer = combineReducers(
    {
        title: presentationNameReducer,
        slides: slideReducer,
        selection: selectionReducer,
        contextMenu: ContextMenuReducer,
        modalWindow: ModalWindowReducer
    }
);

const store = createStore(
    finalReducer,
    {},
    composeWithDevTools({})(applyMiddleware(undoRedoMiddleware))
);

type RootState = ReturnType<typeof finalReducer>;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
        {
            ...TitleActionCreators,
            ...SlidesActionCreators,
            ...SelectionActionCreators,
            ...ContextMenuActionCreators,
            ...ModalWindowActionCreators,
            ...UndoRedoActionCreators,
            ...setStateActionCreators
        },
        dispatch
    )
}

export { 
    store,
    useAppSelector as useSelector,
    useAppActions as useDispatch,
    type Action,
    type AppState
}