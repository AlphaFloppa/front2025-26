import type { Dispatch, Middleware } from "redux";
import type { Action, AppState } from "../store";
import type { Slide } from "../../Model/slide";
import type { Selection } from "../../Model/selection";
import { verify } from "../../Services/editFunctions";
import { presentation } from "../../Services/data/generalData";
import { setState } from "../hooks/useDispatch";

type State = {
    title: string,
    slides: Slide[],
    selection: Selection
}

type History = {
    past: Array<State>,
    present: State,
    future: Array<State>
}

let history: History = {
    past: [],
    present: {
        title: presentation.title,
        slides: presentation.slides,
        selection: {
            selectedSlides: [presentation.slides[0].id],
            selectedSlideObjects: []
        }
    },
    future: []
}

const ignoreActionsList = [
    "enableModalWindow",
    "disableModalWindow",
    "enableContextMenu",
    "disableContextMenu",
    "nullifySlideSelection",
    "nullifySlideObjectSelection",
    "selectSlide",
    "selectSlideObject",
    "setState"
];

let isLastActionModelChange = false;

const undoRedoMiddleware: Middleware<{}, AppState, Dispatch<Action>> =
    ({ dispatch, getState }) => (next) => (action) => {
        //@ts-ignore
        const { type } = action;
        //console.log(type);
        const { title, slides, selection } = getState();
        if (isLastActionModelChange) {              //запись в past
            history = {
                ...history,
                past: [...history.past, history.present]
            };
        }
        history = {
            ...history,
            present: {
                title,
                slides: slides.map(
                    slide => ({
                        ...slide,
                        objects: [...slide.objects]
                    })
                ),
                selection
            }
        }
        //console.debug(history);
        //обновить present до актуального состояния даже если action обычный

        if (type === "SET_STATE") {
            return next(action)
        }
        if (type === "UNDO") {
            isLastActionModelChange = false;
            if (history.past.length === 0) {
                return;
            }

            const newPast = [...history.past.slice(0, -1)];
            const newFuture = [...history.future, history.present]
            const newState = verify(history.past.at(-1));
            //console.debug(newState);

            history = {
                past: newPast,
                future: newFuture,
                present: newState,
            }

            setState(newState)(dispatch);

        } else if (type === "REDO") {
            isLastActionModelChange = false;
            if (history.future.length === 0) {
                return;
            }

            const newState = verify(history.future.at(-1));
            const newPast = [...history.past, history.present]
            const newFuture = [...history.future.slice(0, -1)];
            //console.debug(newState);

            history = {
                past: newPast,
                present: newState,
                future: newFuture
            }

            setState(newState)(dispatch);

        } else {
            if (
                ignoreActionsList.some(ignoringType => type.includes(ignoringType))
            ) {
                isLastActionModelChange = false;
            } else {
                //console.log("case model change");
                isLastActionModelChange = true;
                if (history.future.length !== 0) {
                    history = {
                        ...history,
                        future: []
                    };
                }
            }
            return next(action);
        }
    }

export {
    undoRedoMiddleware
}

export type { 
    State
}