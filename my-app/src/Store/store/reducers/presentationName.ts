import type { Action } from "../store";

const name = "New Presentation";

const presentationNameReducer = (state: string = name, { type, payload }: Action) => { 
    switch (type) { 
        case "CHANGE_PRESENTATION_NAME":
            return payload.newName
    }
    return state;
}

export { 
    presentationNameReducer
}