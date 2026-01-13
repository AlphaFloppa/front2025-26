import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type State = {
    isEnabled: boolean,
    type?: string,
    onApply?: Function,
    onCancel?: Function
}

type enableModalWindowActionPayload = {
    type: string,
    onApply: Function,
    onCancel: Function
}

const initialState: State = {
    isEnabled: false
};

const modalWindowSlice = createSlice(
    {
        name: "modalWindow",
        initialState,
        reducers: {
            enableModalWindow: (state: State, { payload }: PayloadAction<enableModalWindowActionPayload>) => {
                return {
                    isEnabled: true,
                    type: payload.type,
                    onApply: payload.onApply,
                    onCancel: payload.onCancel
                }
            },
            disableModalWindow: (state: State) => {
                state.isEnabled = false
            }
        }
    }
);

export default modalWindowSlice;
export type { 
    State as ModalWindowState
}