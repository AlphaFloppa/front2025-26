import type { ContextMenu } from "../../Model/contextMenu";
import type { Position } from "../../Model/slideContent";

const enableContextMenu = (template: ContextMenu, position: Position) => ({
    type: "ENABLE_CONTEXT_MENU",
    payload: {
        template,
        position
    }
});

const disableContextMenu = () => ({
    type: "DISABLE_CONTEXT_MENU"
});

export {
    enableContextMenu,
    disableContextMenu
}