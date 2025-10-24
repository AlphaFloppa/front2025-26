type Position = {
    x: number,
    y: number
}

type Size = {
    width: number,
    height: number
}

type BaseObject = {
    id: string, 
    position: Position,
    size: Size,
    layer: number
}

type Image = {
    type: "image"
    src: string,
}

type Text = BaseObject & {
    font: Font,
    color: string, 
    content: string,              
    type: "text"
}

type Font = {
    fontFamily: string,
    fontSize: number
}

type ImageObject = Image & BaseObject

type Background = {
    type: "color",
    code: string
} | Image

type SlideObject = Text | ImageObject

export type {
    SlideObject,
    Background,
    Size,
    Position,
    Image,
    Text,
    ImageObject
}