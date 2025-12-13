import type { Action } from "../store";

const undo = (): Action => ({
    type: "UNDO",
    payload: {}
});

const redo = (): Action => ({
    type: "REDO",
    payload: {}
});

export { 
    undo,
    redo
}