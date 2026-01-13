import type { ContextMenu } from "../../Model/contextMenu";
import type { Position } from "../../Model/slideContent";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type State = {
    isEnabled: boolean,
    template?: ContextMenu,
    position?: Position,
    positionAtSlide?: Position
}

type enableContextMenuActionPayload = {
    template: ContextMenu,
    position: Position,
    positionAtSlide: Position
}

const initialState: State = {
    isEnabled: false
}

const contextMenuSlice = createSlice(
    {
        name: "contextMenu",
        initialState,
        reducers: {
            enableContextMenu: (state: State, { payload }: PayloadAction<enableContextMenuActionPayload>) => { 
                if (!state.isEnabled) { 
                    return {
                        isEnabled: true,
                        template: payload.template,
                        position: payload.position,
                        positionAtSlide: payload.positionAtSlide
                    }
                }
            },
            disableContextMenu: (state: State) => { 
                state.isEnabled = false;
            }
        }
    }
);


export default contextMenuSlice;
export type {
    State as ContextMenuState
}