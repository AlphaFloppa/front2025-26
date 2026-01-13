import * as contextMenuActionCreators from "../contextMenu/actionCreators";
import * as modalWindowActionCreators from "../modalWindow/actionCreators";
import * as undoRedoActionCreators from "../undo_redo/actionCreators";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import slidesSetState, {
    addSlide,
    removeSlide,
    moveSlide,
    removeObjectsFromSlide,
    addObjectToSlide,
    moveSlideObjects,
    resizeSlideObject,
    editText,
    editFontFamily,
    editFontSize,
    editBackground
} from "../slides/actionCreators";

import selectionSetState, {
    nullifySlideObjectSelection,
    nullifySlideSelection,
    selectSlide,
    selectSlideObject
} from "../selection/actionCreators";
import titleSetState, {
    changeTitle
} from "../presentationTitle/actionCreators";
import {
    setPresentationId
} from "../init";
import type{ State as UndoRedoState } from "../middlewares/undo_redo";
import type { Presentation } from "../../Model/presentation";

type AppDispatch = (action: any) => any;
type PresentationState = {
    id: string,
    presentation: Presentation
};

const setState = (newState: UndoRedoState) => {
    return (dispatch: AppDispatch) => {
        dispatch(
            slidesSetState(
                {
                    state: {
                        slides: newState.slides
                    }
                }
            )
        );

        dispatch(
            selectionSetState(
                {
                    state: {
                        selection: newState.selection
                    }
                }
            )
        );

        dispatch(
            titleSetState(
                {
                    title: newState.title
                }
            )
        );
    };
};

const initializePresentation = (state: PresentationState) => {
    return (dispatch: AppDispatch) => {
        dispatch(
            slidesSetState(
                {
                    state: {
                        slides: state.presentation.slides
                    }
                }
            )
        );

        dispatch(
            titleSetState(
                {
                    title: state.presentation.title
                }
            )
        );

        dispatch(
            setPresentationId(
                {
                    id: state.id
                }
            )
        )
    }
};

const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
        {
            setPresentationId,
            addSlide,
            removeSlide,
            moveSlide,
            removeObjectsFromSlide,
            addObjectToSlide,
            moveSlideObjects,
            resizeSlideObject,
            editText,
            editFontFamily,
            editFontSize,
            editBackground,
            nullifySlideObjectSelection,
            nullifySlideSelection,
            selectSlide,
            selectSlideObject,
            changeTitle,            
            ...contextMenuActionCreators,
            ...modalWindowActionCreators,
            ...undoRedoActionCreators,
            setState,
            initializePresentation
        },
        dispatch
    )
}

export { 
    useAppActions as useDispatch,
    setState
}