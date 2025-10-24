import type { Presentation } from "../../../Model/presentation"

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
                    position: { x: 20, y: 50 },
                    size: { width: 80, height: 60 },
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
                    position: { x: 50, y: 50 },
                    size: { width: 50, height: 40 },
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
                    position: { x: 10, y: 35 },
                    size: { width: 150, height: 150 },
                    src: "./src/assets/react.svg",
                    layer: 3
                },
                {
                    id: "obj_1_4",
                    type: "image",
                    position: { x: 70, y: 80 },
                    size: { width: 80, height: 78 },
                    src: "https://share.google/images/sXVZJYBvAKGZTgPjt",
                    layer: 4
                },
                {
                    id: "obj_1_5",
                    type: "text",
                    position: { x: 50, y: 20 },
                    size: { width: 30, height: 80 },
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