import { useSelector } from "../Store/store/hooks/useSelector";
import { useDispatch } from "../Store/store/hooks/useDispatch";

const useEditor = () => {

    return {
        useDispatch,
        useSelector
    }
}

export {
    useEditor
}