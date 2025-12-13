import { useCallback, useEffect } from "react";
import { useEditor } from "./editor.hooks";

const useUndoRedo = () => {
    const { useDispatch } = useEditor();
    const { undo, redo } = useDispatch();
    const undoHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.code === "KeyZ" && e.ctrlKey) {
                e.preventDefault;
                undo();
            }
        },
        [undo]
    );
    const redoHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.code === "KeyX" && e.ctrlKey) {
                e.preventDefault;
                redo();
            }
        },
        [redo]
    );
    useEffect(
        () => {
            window.addEventListener("keyup", undoHandler);
            window.addEventListener("keyup", redoHandler);

            return () => {
                window.removeEventListener("keyup", undoHandler);
                window.removeEventListener("keyup", redoHandler);
            }
        }
    );
}

export { 
    useUndoRedo
}