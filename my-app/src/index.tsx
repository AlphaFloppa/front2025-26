import { createRoot } from "react-dom/client";
import style from "./index.module.css";
import { App } from "./Original/App/App.tsx";
import { verify } from "./Store/Services/editFunctions.ts";
import { ContextMenuProvider } from "./Common/ContextMenu/ContextMenu.hooks.tsx";
import { ModalWindowProvider } from "./Common/ModalWindow/ModalWindow.hooks.tsx";
import { Provider } from "react-redux";
import { store } from "./Store/store/store.ts";

const container = verify(document.getElementById("root"));
container.classList.add(style.root);
const root = createRoot(container);

let render: Function = () => {
  root.render(
    <Provider store={store}>
      <ModalWindowProvider users={<ContextMenuProvider users={<App />} />} />
    </Provider>
  );
};

window.addEventListener("load", () => {
  render();
});
