import * as Services from "../editFunctions";
import maxPresentation from "../../Model/tests/maxPresentation.json";
import minPresentation from "../../Model/tests/minPresentation.json";
import type { Presentation } from "../../Model/presentation";

let presentation: Presentation = minPresentation;
presentation = Services.renamePresentation(
    presentation, 
    {
        newName: "b"
    }
);
console.log("new name\n", presentation);
presentation = 
    Services.addSlide(
        presentation,
        {
            slide: {
                id: "abc",
                header: "header",
                objects: [],
                background: {
                    type: "color",
                    code: "#FFFFFF"
                }
            }
        }
    );
presentation = 
    Services.addSlide(
        presentation,
        {
            slide: {
                id: "def",
                header: "header2",
                objects: [],
                background: {
                    type: "image",
                    src: "https://images.google.com/6edfrea9u"
                }
            }
        }
    );
console.log("new slides\n", presentation);
presentation = Services.replaceSlide(
    presentation, 
    {
        order: ["def", "abc"]
    }
);
console.log("new order of slides\n", presentation);
presentation = Services.removeSlide(
    presentation, 
    {
        id: "abc"
    }
);
console.log("remove slide\n", presentation.slides);
presentation = 
    Services.addObjectToSlide(
        presentation, 
        {
            slideId: "def", 
            object: {
                position: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 19,
                    height: 20
                },
                font: {
                    fontFamily: "Nekki",
                    fontSize: 16
                },
                type: "text",
                content: "brrrr",
                color: "black",
                id: "rrrr7t7t7t"
            }
        }
    );
console.log("fill slide content\n", presentation.slides.map(slide => slide.objects));
presentation = Services.moveSlideObject(
    presentation, 
    {
        slideId: "def", 
        objectId: "rrrr7t7t7t", 
        props: {
            x: 0, 
            y: 1
        }
    }
);
console.log(
    "move object on slide\n", 
    presentation.slides.map(
        slide => slide.objects.map(
            slideObject => slideObject.size
        )
    )
);
presentation = Services.resizeSlideObject(
    presentation, 
    {
        slideId: "def", 
        objectId: "rrrr7t7t7t", 
        props: {
            width: 2, 
            height: 84
        }
    }
);
console.log(
    "resize object on slide\n", 
    presentation.slides.map(
        slide => slide.objects.map(
            slideObject => slideObject.size
        )
    )
);
presentation = Services.editText(
    presentation, 
    {
        slideId: "def", 
        objectId: "rrrr7t7t7t", 
        value: "pupupu"
    }
);
console.log(
    "edit text on slide\n", 
    presentation.slides.map(
        slide => slide.objects.filter(
            slideObject => slideObject.type === "text"
        ).map(textObject => textObject.font)
    )
);
presentation = Services.editFontFamily(
    presentation, 
    {
        slideId: "def",
        objectId: "rrrr7t7t7t",
        value: "SentoraNine"
    }
);
console.log(
    "edit text font family on slide\n", 
    presentation.slides.map(
        slide => slide.objects.filter(
            slideObject => slideObject.type === "text"
        ).map(textObject => textObject.font)
    )
);
presentation = Services.editFontSize(
    presentation, 
    {
        slideId: "def",
        objectId: "rrrr7t7t7t",
        value: 14
    }
);
console.log(
    "edit text font size on slide\n", 
    presentation.slides.map(
        slide => slide.objects.filter(
            slideObject => slideObject.type === "text"
        ).map(textObject => textObject.font)
    )
);
presentation = Services.editBackground(
    presentation, 
    {
        slideId: "def",
        bg: {
            type: "color",
            code: "#CC77AA"
        }
    }
);
console.log("edit bg of slide\n", presentation.slides.map(slide => slide.background));
presentation = Services.removeObjectFromSlide(
    presentation, 
    {
        slideId: "def", 
        removingObjectId: "rrrr7t7t7t"
    }
);
console.log("remove object from slide\n", presentation.slides.map(slide => slide.objects));