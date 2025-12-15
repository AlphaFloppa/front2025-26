import type { Middleware } from "redux"
import type { AppState } from "../store";
import type { Dispatch } from "redux";
import type { Action } from "../store";
import { useDB } from "../../../hooks/db.hooks";

const DBMiddleWare: Middleware<{}, AppState, Dispatch<Action>> =
    ({ dispatch, getState }) => (next) => (action) => {
        //@ts-ignore
        const { type } = action;
        const { update } = useDB();
        if (
            ![
                "ENABLE_MODAL_WINDOW",
                "DISABLE_MODAL_WINDOW",
                "ENABLE_CONTEXT_MENU",
                "DISABLE_CONTEXT_MENU",
                "NULLIFY_SLIDE_SELECTION",
                "NULLIFY_SLIDE_OBJECT_SELECTION",
                "SELECT_SLIDE",
                "SELECT_SLIDE_OBJECT"
            ].some(actionType => actionType === type)
        ) {
            next(action);
            const updatedState = getState();
            update()
        }
    }