import type { ContextMenu } from "../../Model/contextMenu";
import type { Position } from "../../Model/slideContent";
import type { Action } from "../store";

type ContextMenuState = {
    isEnabled: boolean,
    template?: ContextMenu,
    position?: Position
}

const initialState: ContextMenuState = {
    isEnabled: false
}

const ContextMenuReducer = (state = initialState, { type, payload }: Action): ContextMenuState => {
    switch (type) {
        case "ENABLE_CONTEXT_MENU":
            return state.isEnabled
                ? state
                : {
                    isEnabled: true,
                    template: payload.template,
                    position: payload.position
                }
        case "DISABLE_CONTEXT_MENU":
            return {
                isEnabled: false
            }
    };

    return state
};

export {
    ContextMenuReducer
}