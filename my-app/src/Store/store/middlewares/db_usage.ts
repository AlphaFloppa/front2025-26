import type { Middleware } from "redux"
import type { AppState } from "../store";
import type { Dispatch } from "redux";
import type { Action } from "../store";
import { useDB } from "../../../hooks/db.hooks";
import type { Presentation } from "../../Model/presentation";

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

const DBMiddleWare: Middleware<{}, AppState, Dispatch<Action>> =
    ({ getState }) => (next) => (action) => {
        //@ts-ignore
        const { type } = action;
        const { update } = useDB();
        if (
            !ignoreActionsList.some(actionType => actionType === type)
        ) {
            next(action);
            const updatedState = getState();
            const presentationId = updatedState.presentationId;
            const updatedPresentation: Presentation = {
                title: updatedState.title,
                slides: updatedState.slides
            };
            update(
                updatedPresentation,
                presentationId
            );
        }
    }

export {
    DBMiddleWare
}