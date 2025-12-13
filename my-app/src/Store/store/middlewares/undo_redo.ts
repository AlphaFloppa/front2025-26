import type { Dispatch, Middleware } from "redux";
import type { Action, AppState } from "../store";
import type { Slide } from "../../Model/slide";
import type { Selection } from "../../Model/selection";
import { verify } from "../../Services/editFunctions";
import { presentation } from "../../Services/data/generalData";

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
        title: presentation.name,
        slides: presentation.slides,
        selection: {
            selectedSlides: [presentation.slides[0].id],
            selectedSlideObjects: []
        }
    },
    future: []
}

let isLastActionModelChange = false;

const undoRedoMiddleware: Middleware<{}, AppState, Dispatch<Action>> =
    ({ dispatch, getState }) => (next) => (action) => {
        //@ts-ignore
        const { type } = action;
        const { title, slides, selection } = getState();
        if (isLastActionModelChange) {
            history = {
                ...history,
                past: [...history.past, history.present]
            };
        }
        console.log(history);
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
        console.log(history);
        console.log(type);
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
            console.log(newState);

            history = {
                past: newPast,
                future: newFuture,
                present: newState,
            }

            dispatch(
                {
                    type: "SET_STATE",
                    payload: {
                        state: newState
                    }
                } as Action
            )
        } else if (type === "REDO") {
            isLastActionModelChange = false;
            if (history.future.length === 0) {
                return;
            }

            const newState = verify(history.future.at(-1));
            const newPast = [...history.past, history.present]
            const newFuture = [...history.future.slice(0, -1)];
            console.log(newState);

            history = {
                past: newPast,
                present: newState,
                future: newFuture
            }

            dispatch(
                {
                    type: "SET_STATE",
                    payload: {
                        state: newState
                    }
                } as Action
            )
        } else {
            if (
                ![
                    "ENABLE_MODAL_WINDOW",
                    "DISABLE_MODAL_WINDOW",
                    "ENABLE_CONTEXT_MENU",
                    "DISABLE_CONTEXT_MENU"
                ].some(menuActionType => type === menuActionType)
            ) {
                console.log("case model change");
                isLastActionModelChange = true;
            } else {
                isLastActionModelChange = false;
            }
            if (history.future.length !== 0) {
                history = {
                    ...history,
                    future: []
                };
            }
            return next(action);
        }
    }

export {
    undoRedoMiddleware
}