import type {Presentation} from "../Model/presentation";
import type {Slide} from "../Model/slide";
import type {Size, Position} from "../Model/slideContent"
import type {SlideObject, Text, ImageObject} from "../Model/slideContent";
import type {Background} from "../Model/slideContent";

function renamePresentation(presentation: Presentation, payload: {newName: string}): Presentation {
    return {
        ...presentation, 
        name: payload.newName
    };
}

function addSlide(presentation: Presentation, payload: {slide: Slide}): Presentation {
    return {
        ...presentation,
        slides: [
            ...presentation.slides,
            payload.slide,
        ]
    };
}

function removeSlide(presentation: Presentation, payload: {id: string}): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.filter(slide => slide.id != payload.id)
    };
}

function verify<T>(value: T | undefined | null) {
    if (!value) {
        throw new Error()
    }
    return value
}


//move slide set by indexes array
function replaceSlide(presentation: Presentation, payload: {order: string[]}): Presentation {
    return {
        ...presentation,
        slides: payload.order.map( 
            slideId => verify(presentation.slides.find(slide => slide.id === slideId))          //verify
        )
    };
}

function removeObjectsFromSlide(presentation: Presentation, payload: { slideId: string, removingObjectsId: string[] }): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => 
                    slide.id === payload.slideId         //только ===
                        ? {
                            ...slide,
                        objects: slide.objects.filter(
                            slideObj => !payload.removingObjectsId.find(id => slideObj.id === id)
                        )
                        } 
                        : slide
                )
    };
}

function addObjectToSlide(                    //одна функция под текст и картинку
    presentation: Presentation, 
    payload: {slideId: string, object: SlideObject}
): Presentation{//собрать текст снаружи
    console.log(presentation);
    console.log(payload);
    return {
        ...presentation,
        slides: presentation.slides.map(slide =>                 //говорящие названия в funcs
                    slide.id == payload.slideId ?
                        {
                            ...slide,
                            objects: 
                                [
                                    ...slide.objects,
                                    payload.object
                                ]
                        } :
                        slide
                )
    };
}

function moveSlideObject(
    presentation: Presentation, 
    payload: {slideId: string, objectId: string, props: Position}
): Presentation{
    return {
        ...presentation,
        slides: presentation.slides.map(slide => 
                    slide.id == payload.slideId 
                    ? {
                            ...slide,
                            objects: slide.objects.map(
                                object => object.id == payload.objectId ? 
                                {
                                    ...object, 
                                    position: {...payload.props}
                                } :
                                object
                            )    
                        } :
                        slide
                )
    };
}

function resizeSlideObject(
    presentation: Presentation, 
    payload: {slideId: string, objectId: string, props: Size}                 //Size obj in params
): Presentation{
    return {
        ...presentation,
        slides: presentation.slides.map(slide => 
                    slide.id == payload.slideId ?
                        {
                            ...slide,
                            objects: slide.objects.map(
                                object => object.id == payload.objectId ? 
                                {
                                    ...object, 
                                    size: {
                                        ...payload.props
                                    }
                                } :
                                object
                            )    
                        } :
                        slide
                )
    };
}

function editText(
    presentation: Presentation, 
    payload: {slideId: string, objectId: string, value: string}
): Presentation{
    return {
        ...presentation,
        slides: presentation.slides.map(slide => 
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
}

function editFontFamily(
    presentation: Presentation, 
    payload: {slideId: string, objectId: string, value: string}
): Presentation{
    return {
        ...presentation,
        slides: presentation.slides.map(slide => 
                    slide.id == payload.slideId ?
                        {
                            ...slide,
                            objects: slide.objects.map(
                                object => object.id == payload.objectId && object.type == "text"? 
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
}

function editFontSize(
    presentation: Presentation, 
    payload: {slideId: string, objectId: string, value: number}
): Presentation{
    return {
        ...presentation,
        slides: presentation.slides.map(slide => 
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
}

function editBackground(
    presentation: Presentation,
    payload: {slideId: string, bg: Background}
): Presentation{
    return{
        ...presentation,
        slides: presentation.slides.map(slide => 
            slide.id === payload.slideId 
                ? {
                    ...slide,
                    background: payload.bg
                }       
                : slide
        )
    };
}

function disposeImagesUrls(presentation: Presentation, payload: { targetSlideId: string, objectsIds: string[] }) {
    presentation.slides.map(slide =>  
        slide.id === payload.targetSlideId
            ? slide.objects.filter(object => 
                payload.objectsIds.find(objectId => objectId === object.id))
                .map(object => { object.type === "image" ? window.URL.revokeObjectURL(object.src) : null})
            : null
    )
}

function createSlide(payload: {id: string}): Slide {
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
    renamePresentation,
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
    disposeImagesUrls,
    createImageObject,
    createTextObject
}