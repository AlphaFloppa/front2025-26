import type { Presentation } from "../Model/presentation";
import type { Slide } from "../Model/slide";
import type { Size, Position } from "../Model/slideContent"
import type { SlideObject, Text, ImageObject } from "../Model/slideContent";
import type { Background } from "../Model/slideContent";

function addSlide(slides: Slide[], payload: { slide: Slide }): Slide[] {
    return [
        ...slides,
        payload.slide,
    ];
}

function removeSlide(slides: Slide[], payload: { id: string }): Slide[] {
    return slides.filter(slide => slide.id != payload.id);
}

function verify<T>(value: T | undefined | null) {
    if (!value) {
        throw new Error()
    }
    return value
}


//move slide set by indexes array
function replaceSlide(presentation: Presentation, payload: { order: string[] }): Presentation {
    return {
        ...presentation,
        slides: payload.order.map(
            slideId => verify(presentation.slides.find(slide => slide.id === slideId))          //verify
        )
    };
}

function removeObjectsFromSlide(slides: Slide[], payload: { slideId: string, removingObjectsIds: string[] }): Slide[] {
    function disposeImagesUrls(
        slides: Slide[],
        payload: { targetSlideId: string, objectsIds: string[] }
    ): void {
        slides.forEach(slide =>
            slide.id === payload.targetSlideId
            && slide.objects.filter(object =>
                payload.objectsIds.find(objectId => objectId === object.id))
                .forEach(
                    object => { object.type === "image" && window.URL.revokeObjectURL(object.src) }
                )
        )
    }

    disposeImagesUrls(
        slides,
        {
            targetSlideId: payload.slideId,
            objectsIds: payload.removingObjectsIds
        }
    )
    return slides.map(
        slide => slide.id === payload.slideId
            ? {
                ...slide,
                objects: slide.objects.filter(
                    slideObj => !payload.removingObjectsIds.find(id => slideObj.id === id)
                )
            }
            : slide
    );
}

function addObjectToSlide(                    //одна функция под текст и картинку
    slides: Slide[],
    payload: { slideId: string, object: SlideObject }
): Slide[] {
    return slides.map(slide =>
        slide.id == payload.slideId
            ? {
                ...slide,
                objects:
                    [
                        ...slide.objects,
                        payload.object
                    ]
            }
            : slide
    )
};

function moveSlideObject(
    slides: Slide[],
    payload: { slideId: string, objectIds: string[], changes: Position }
): Slide[] {
    return slides.map(slide =>
        slide.id === payload.slideId
            ? {
                ...slide,
                objects: slide.objects.map(
                    object => payload.objectIds.some(id => id === object.id)
                        ? {
                            ...object,
                            position: {
                                x: object.position.x + payload.changes.x,
                                y: object.position.y + payload.changes.y
                            }
                        } :
                        object
                )
            }
            : slide
    )
};

function resizeSlideObject(
    slides: Slide[],
    payload: { slideId: string, objectId: string, changes: Size, isControlUpper: boolean, isControlLeft: boolean }                 //Size obj in params
): Slide[] {
    return slides.map(slide =>
        slide.id == payload.slideId ?
            {
                ...slide,
                objects: slide.objects.map(
                    object => object.id === payload.objectId ?
                        {
                            ...object,
                            position: {
                                x: payload.isControlLeft
                                    ? object.position.x - payload.changes.width / 2
                                    : object.position.x + payload.changes.width / 2,
                                y: payload.isControlUpper
                                    ? object.position.y - payload.changes.height / 2
                                    : object.position.y + payload.changes.height / 2,
                            },
                            size: {
                                width: object.size.width + payload.changes.width,
                                height: object.size.height + payload.changes.height,
                            }
                        } :
                        object
                )
            } :
            slide
    )
};

function editText(
    slides: Slide[],
    payload: { slideId: string, objectId: string, value: string }
): Slide[] {
    return slides.map(slide =>
        slide.id == payload.slideId ?
            {
                ...slide,
                objects: slide.objects.map(
                    object => object.id == payload.objectId
                        ? {
                            ...object,
                            content: payload.value
                        }
                        : object
                )
            } :
            slide
    )
};


function editFontFamily(
    slides: Slide[],
    payload: { slideId: string, objectId: string, value: string }
): Slide[] {
    return slides.map(slide =>
        slide.id == payload.slideId ?
            {
                ...slide,
                objects: slide.objects.map(
                    object => object.id == payload.objectId && object.type == "text" ?
                        {
                            ...object,
                            font: {
                                fontFamily: payload.value,
                                fontSize: object.font.fontSize,
                            }
                        } :
                        object
                )
            } :
            slide
    )
};


function editFontSize(
    slides: Slide[],
    payload: { slideId: string, objectId: string, value: number }
): Slide[] {
    return slides.map(slide =>
        slide.id == payload.slideId
            ? {
                ...slide,
                objects: slide.objects.map(
                    object => object.id == payload.objectId && object.type == "text"
                        ? {
                            ...object,
                            font: {
                                fontFamily: object.font.fontFamily,
                                fontSize: payload.value,
                            }
                        }
                        : object
                )
            }
            : slide
    )
};

function editBackground(
    slides: Slide[],
    payload: { slideId: string, bg: Background }
): Slide[] {
    return slides.map(slide =>
        slide.id === payload.slideId
            ? {
                ...slide,
                background: payload.bg
            }
            : slide
    )
};

function createSlide(payload: { id: string }): Slide {
    return {
        id: payload.id,
        header: "New slide",
        objects: [],
        background: {
            type: "color",
            code: "#FFFFFF"
        }
    };
}

function createPresentation(): Presentation {
    return {
        slides: [],
        name: "Unnamed1"
    }
}

function createTextObject(payload: { id: string, position: Position }): Text {
    return {
        type: "text",
        font: {
            fontFamily: "sans-serif",
            fontSize: 25
        },
        color: "#FFFFFF",
        content: "Текст",
        size: {
            width: 20,
            height: 10
        },
        layer: 1,
        ...payload
    };
}

function createImageObject(payload: { id: string, position: Position, src: string }): ImageObject {
    return {
        type: "image",
        size: {
            width: 100,
            height: 100
        },
        layer: 1,
        ...payload
    }
}

export {
    removeObjectsFromSlide,
    removeSlide,
    resizeSlideObject,
    replaceSlide,
    editBackground,
    editFontFamily,
    editFontSize,
    editText,
    addObjectToSlide,
    addSlide,
    moveSlideObject,
    createSlide,
    verify,
    createPresentation,
    createImageObject,
    createTextObject
}