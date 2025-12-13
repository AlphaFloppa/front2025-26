import type { Action } from "../store"

type ModalWindowState = {
    isEnabled: boolean,
    type?: string,
    onApply?: Function,
    onCancel?: Function
}

const initialState: ModalWindowState = {
    isEnabled: false
};

const ModalWindowReducer = (state = initialState, { type, payload }: Action): ModalWindowState => {
    switch (type) {
        case "ENABLE_MODAL_WINDOW":
            return {
                isEnabled: true,
                type: payload.type,
                onApply: payload.onApply,
                onCancel: payload.onCancel
            }
        case "DISABLE_MODAL_WINDOW":
            return {
                isEnabled: false
            }
    };

    return state;
};

export { 
    ModalWindowReducer,
    type ModalWindowState
}