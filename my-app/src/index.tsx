import { createRoot } from "react-dom/client";
import style from "./index.module.css";
import { App } from "./Original/App/app.tsx";
import { verify } from "./Store/Services/editFunctions.ts";
import { Provider } from "react-redux";
import { store } from "./Store/store/store.ts";

const container = verify(document.getElementById("root"));
container.classList.add(style.root);
const root = createRoot(container);

let render: Function = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

window.addEventListener("load", () => {
  render();
});
