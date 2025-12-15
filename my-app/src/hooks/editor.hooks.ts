import { useSelector, useDispatch } from "../Store/store/store";

const useEditor = () => {

    return {
        useDispatch,
        useSelector
    }
}

export {
    useEditor
}