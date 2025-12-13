import type { Presentation } from "../../Model/presentation"

let presentation: Presentation = {
    name: "Моя первая презентация",
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
                    position: { x: 200, y: 400 },
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
                    position: { x: 700, y: 500 },
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
                    position: { x: 500, y: 97 },
                    size: { width: 30, height: 30 },
                    src: "./src/assets/react.svg",
                    layer: 3
                },
                {
                    id: "obj_1_4",
                    type: "image",
                    position: { x: 700, y: 800 },
                    size: { width: 15, height: 8 },
                    src: "https://share.google/images/sXVZJYBvAKGZTgPjt",
                    layer: 4
                },
                {
                    id: "obj_1_5",
                    type: "text",
                    position: { x: 500, y: 200 },
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