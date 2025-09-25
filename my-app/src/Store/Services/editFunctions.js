"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
function renamePresentation(presentation, payload) {
    return __assign(__assign({}, presentation), { name: payload.newName });
}
function addSlide(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: __spreadArray(__spreadArray([], presentation.slides, true), [
            payload.slide,
        ], false) });
}
function removeSlide(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.filter(function (slide) { return slide.id != payload.id; }) });
}
//move slide set by indexes array
function replaceSlide(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: payload.order.map(function (slideId) {
            var _a;
            return (_a = presentation.slides.filter(function (slide) { return slide.id === slideId; })[0]) !== null && _a !== void 0 ? _a : {
                id: slideId,
                header: "",
                objects: [],
                background: {
                    type: "color",
                    code: "#FFFFFF"
                }
            };
        }) });
}
function removeObjectFromSlide(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return slide.id === payload.slideId //только ===
                ? __assign(__assign({}, slide), { objects: slide.objects.filter(function (slideObj) { return slideObj.id != payload.removingObjectId; }) }) : slide;
        }) });
}
function addObjectToSlide(//одна функция под текст и картинку
presentation, payload) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return slide.id == payload.slideId ? __assign(__assign({}, slide), { objects: __spreadArray(__spreadArray([], slide.objects, true), [
                    payload.object
                ], false) }) :
                slide;
        }) });
}
function moveSlideObject(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return slide.id == payload.slideId
                ? __assign(__assign({}, slide), { objects: slide.objects.map(function (object) { return object.id == payload.objectId ? __assign(__assign({}, object), { position: __assign({}, payload.props) }) :
                        object; }) }) :
                slide;
        }) });
}
function resizeSlideObject(presentation, payload //Size obj in params
) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return slide.id == payload.slideId ? __assign(__assign({}, slide), { objects: slide.objects.map(function (object) { return object.id == payload.objectId ? __assign(__assign({}, object), { size: __assign({}, payload.props) }) :
                    object; }) }) :
                slide;
        }) });
}
function editText(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return slide.id == payload.slideId ? __assign(__assign({}, slide), { objects: slide.objects.map(function (object) { return object.id == payload.objectId
                    ? __assign(__assign({}, object), { text: payload.value }) : object; }) }) :
                slide;
        }) });
}
function editFontFamily(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return slide.id == payload.slideId ? __assign(__assign({}, slide), { objects: slide.objects.map(function (object) { return object.id == payload.objectId && object.type == "text" ? __assign(__assign({}, object), { font: {
                        fontFamily: payload.value,
                        fontSize: object.font.fontSize,
                    } }) :
                    object; }) }) :
                slide;
        }) });
}
function editFontSize(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return slide.id == payload.slideId
                ? __assign(__assign({}, slide), { objects: slide.objects.map(function (object) { return object.id == payload.objectId && object.type == "text"
                        ? __assign(__assign({}, object), { font: {
                                fontFamily: object.font.fontFamily,
                                fontSize: payload.value,
                            } }) : object; }) }) : slide;
        }) });
}
function editBackground(presentation, payload) {
    return __assign(__assign({}, presentation), { slides: presentation.slides.map(function (slide) {
            return slide.id == payload.slideId
                ? __assign(__assign({}, slide), { background: payload.bg }) : slide;
        }) });
}
function createPresentation() {
    return {
        slides: [],
        name: "a"
    };
}
var presentation = createPresentation();
presentation = renamePresentation(presentation, {
    newName: "b"
});
console.log("new name\n", presentation);
presentation =
    addSlide(presentation, {
        slide: {
            id: "abc",
            header: "header",
            objects: [],
            background: {
                type: "color",
                code: "#FFFFFF"
            }
        }
    });
presentation =
    addSlide(presentation, {
        slide: {
            id: "def",
            header: "header2",
            objects: [],
            background: {
                type: "image",
                src: "https://images.google.com/6edfrea9u"
            }
        }
    });
console.log("new slides\n", presentation);
presentation = replaceSlide(presentation, {
    order: ["def", "abc"]
});
console.log("new order of slides\n", presentation);
presentation = removeSlide(presentation, {
    id: "abc"
});
console.log("remove slide\n", presentation.slides);
presentation =
    addObjectToSlide(presentation, {
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
    });
console.log("fill slide content\n", presentation.slides.map(function (slide) { return slide.objects; }));
presentation = moveSlideObject(presentation, {
    slideId: "def",
    objectId: "rrrr7t7t7t",
    props: {
        x: 0,
        y: 1
    }
});
console.log("move object on slide\n", presentation.slides.map(function (slide) { return slide.objects; }));
presentation = resizeSlideObject(presentation, {
    slideId: "def",
    objectId: "rrrr7t7t7t",
    props: {
        width: 2,
        height: 84
    }
});
console.log("resize object on slide\n", presentation.slides.map(function (slide) { return slide.objects; }));
presentation = editText(presentation, {
    slideId: "def",
    objectId: "rrrr7t7t7t",
    value: "pupupu"
});
console.log("edit text on slide\n", presentation.slides.map(function (slide) { return slide.objects.filter(function (slideObject) { return slideObject.type === "text"; }); }));
presentation = editFontFamily(presentation, {
    slideId: "def",
    objectId: "rrrr7t7t7t",
    value: "SentoraNine"
});
console.log("edit text font family on slide\n", presentation.slides.map(function (slide) { return slide.objects.filter(function (slideObject) { return slideObject.type === "text"; }); }));
presentation = editFontSize(presentation, {
    slideId: "def",
    objectId: "rrrr7t7t7t",
    value: 14
});
console.log("edit text font size on slide\n", presentation.slides.map(function (slide) { return slide.objects.filter(function (slideObject) { return slideObject.type === "text"; }); }));
presentation = editBackground(presentation, {
    slideId: "def",
    bg: {
        type: "color",
        code: "#CC77AA"
    }
});
console.log("edit bg of slide\n", presentation.slides.map(function (slide) { return slide.background; }));
presentation = removeObjectFromSlide(presentation, {
    slideId: "def",
    removingObjectId: "rrrr7t7t7t"
});
console.log("remove object from slide\n", presentation.slides.map(function (slide) { return slide.objects; }));
