import type { Action } from "../store";
import { presentation } from "../../Services/data/generalData";

const name = presentation.name;

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