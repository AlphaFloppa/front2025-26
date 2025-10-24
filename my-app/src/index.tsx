import { createRoot } from 'react-dom/client';
import style from './index.module.css';
import { App } from './Original/App/App.tsx';
import { RadialColorPicker } from "./Common/RadialColorPicker/RadialColorPicker.tsx";
import { verify } from './Store/Services/editFunctions.ts';
import { addEditorEventHandler, editor } from './Store/Model/editor.ts';

const container = verify(document.getElementById("root"));
container.classList.add(style.root);
const root = createRoot(container);

let render: Function = () => {
  root.render(
    <>
      <App editor = {editor} />
    </>
  );
}

const test: Function = () => { 
  root.render(
    <>
      <RadialColorPicker />
    </>
  )
};

addEditorEventHandler(render);
window.addEventListener("load", () => {
  test();
});