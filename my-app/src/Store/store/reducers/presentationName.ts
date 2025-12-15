import type { Action } from "../store";
import { presentation } from "../../Services/data/generalData";

const title = presentation.title;

const presentationNameReducer = (state: string = title, { type, payload }: Action): string => { 
    switch (type) { 
        case "CHANGE_PRESENTATION_NAME":
            return payload.newName
        case "SET_STATE":
            return payload.state.title
    }
    return state;
}

export { 
    presentationNameReducer
}