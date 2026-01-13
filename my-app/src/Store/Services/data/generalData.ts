import type { Presentation } from "../../Model/presentation"

let presentation: Presentation = {
    title: "Моя первая презентация",
    slides: [
        {
            id: "slide_1",
            header: "Заголовок первого слайда",
            background: {
                type: "color",
                code: "#aeb4c5ff"
            },
            objects: [
                {
                    id: "obj_1_1",
                    type: "text",
                    position: { x: 20, y: 40 },
                    size: { width: 10, height: 10 },
                    font: {
                        fontFamily: "Arial",
                        fontSize: 38
                    },
                    color: "#b64141ff",
                    content: "Добро пожаловать!",
                    layer: 1
                },
                {
                    id: "obj_1_2",
                    type: "text",
                    position: { x: 70, y: 50 },
                    size: { width: 7, height: 20 },
                    font: {
                        fontFamily: "Georgia",
                        fontSize: 30
                    },
                    color: "#2c5530ff",
                    content: "Это дополнительный текстовый объект",
                    layer: 2
                },
                {
                    id: "obj_1_3",
                    type: "image",
                    position: { x: 50, y: 40 },
                    size: { width: 30, height: 30 },
                    src: "./src/assets/react.svg",
                    layer: 3
                },
                {
                    id: "obj_1_5",
                    type: "text",
                    position: { x: 50, y: 20 },
                    size: { width: 10, height: 20 },
                    font: {
                        fontFamily: "Courier New",
                        fontSize: 50
                    },
                    color: "#ff6f00ff",
                    content: "Это пример третьего текстового объекта",
                    layer: 5
                }
            ]
        }
    ]
};

export {
    presentation
}