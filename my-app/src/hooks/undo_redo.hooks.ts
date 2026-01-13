import { useCallback, useEffect } from "react";
import { useEditor } from "./editor.hooks";

const useUndoRedo = () => {
    const { useDispatch } = useEditor();
    const { undo, redo } = useDispatch();
    const keyboardHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.code === "KeyZ" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault;    
                if (!e.shiftKey) {
                    undo();
                } else { 
                    redo();
                }
            } 
        },
        [undo, redo]
    );
    useEffect(
        () => {
            window.addEventListener("keyup", keyboardHandler);

            return () => {
                window.removeEventListener("keyup", keyboardHandler);
            }
        }
    );
}

export { 
    useUndoRedo
}