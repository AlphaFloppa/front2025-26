import type {Presentation} from "../Model/presentation";
import type {Slide} from "../Model/slide";
import type {Size, Position} from "../Model/slideContent"
import type {SlideObject} from "../Model/slideContent";
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

//move slide set by indexes array
function replaceSlide(presentation: Presentation, payload: {order: string[]}): Presentation {
    return {
        ...presentation,
        slides: payload.order.map( 
            slideId => presentation.slides.filter(slide => slide.id === slideId)[0] ?? {
                id: slideId,
                header: "",
                objects: [],
                background: {
                    type: "color",
                    code: "#FFFFFF"
                }
            })
    };
}

function removeObjectFromSlide(presentation: Presentation, payload: {slideId: string, removingObjectId: string}): Presentation{
    return {
        ...presentation,
        slides: presentation.slides.map(slide => 
                    slide.id === payload.slideId         //только ===
                        ? {
                            ...slide,
                            objects: slide.objects.filter(slideObj => slideObj.id != payload.removingObjectId)
                        } 
                        : slide
                )
    };
}

function addObjectToSlide(                    //одна функция под текст и картинку
    presentation: Presentation, 
    payload: {slideId: string, object: SlideObject}
): Presentation{                //собрать текст снаружи
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
            slide.id == payload.slideId 
                ? {
                    ...slide,
                    background: payload.bg
                }       
                : slide
        )
    };
}


export {
    renamePresentation,
    removeObjectFromSlide,
    removeSlide,
    resizeSlideObject,
    replaceSlide,
    editBackground,
    editFontFamily,
    editFontSize,
    editText,
    addObjectToSlide,
    addSlide,
    moveSlideObject   
}