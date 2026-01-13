import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type State = string

type SetIdPayload = { 
    id: string
}

const setPresentationIdSlice = createSlice(
    {
        name: "presentationId",
        initialState: "0",
        reducers: {
            setId: (_: State, { payload }: PayloadAction<SetIdPayload>) => {
                return payload.id
            }
        }
    }
);

export { 
    type State as SetIdState
}

export const { 
    setId: setPresentationId
} = setPresentationIdSlice.actions

export default setPresentationIdSlice.reducer;