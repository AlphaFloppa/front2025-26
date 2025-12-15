import type { ContextMenu } from "../../Model/contextMenu";
import type { Position } from "../../Model/slideContent";

type ContextMenuAction = {
    type: "ENABLE_CONTEXT_MENU" | "DISABLE_CONTEXT_MENU",
    payload?: {}
}

const enableContextMenu = (template: ContextMenu, position: Position, positionAtSlide?: Position): ContextMenuAction => ({
    type: "ENABLE_CONTEXT_MENU",
    payload: {
        template,
        position,
        positionAtSlide
    }
});

const disableContextMenu = (): ContextMenuAction => ({
    type: "DISABLE_CONTEXT_MENU"
});

export {
    enableContextMenu,
    disableContextMenu,
    type ContextMenuAction
}