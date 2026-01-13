import { presentation } from "../../Services/data/generalData";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type State = string;

type changeTitleActionPayload = {
    title: string
}

const initialState: State = presentation.title

const presentationNameSlice = createSlice(
    {
        name: "presentationName",
        initialState,
        reducers: {
            changeTitle: (_: State, { payload }: PayloadAction<changeTitleActionPayload>) => {
                return payload.title;
            },
            setState: (_: State, { payload }: PayloadAction<changeTitleActionPayload>) => {
                //console.log("title slice setState"); 
                return payload.title
            }
        }
    }
);

export default presentationNameSlice;