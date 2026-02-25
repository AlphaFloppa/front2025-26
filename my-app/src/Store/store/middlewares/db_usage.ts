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
    "selection/nullifySlideSelection",
    "selection/nullifySlideObjectSelection",
    "selection/selectSlideObject",
    "slides/setState",
    "presentationName/setState",
    "presentationId/setId",
    "selection/selectSlide"
];

const eventTarget = new EventTarget();

const DBMiddleWare: Middleware<{}, AppState, Dispatch<Action>> =
    ({ getState }) => (next) => (action) => {
        //@ts-ignore
        const { type } = action;
        console.info(type);
        const { update } = useDB();
        next(action);
        if (
            !ignoreActionsList.some(actionType => actionType === type)
        ) {
            const { title, slides, presentationId } = getState();
            const updatedPresentation: Presentation = {
                title,
                slides
            };
            eventTarget.dispatchEvent(
                new CustomEvent(
                    "savingStart",
                )
            );
            update(
                updatedPresentation,
                presentationId
            )
                .then(
                    () => {
                        eventTarget.dispatchEvent(
                            new CustomEvent(
                                "savingComplete",
                            )
                        );
                    }
            )
                /*.catch(
                    (exception) => { 
                        console.log(exception);
                        eventTarget.dispatchEvent(
                            new CustomEvent(
                                "savingComplete",           //replace with savingerror
                            )
                        );
                    }
                )*/
        }
    }

export {
    DBMiddleWare,
    eventTarget
}