import type {Background, SlideObject} from "./slideContent.js";
export type {Slide};

type Slide = {
    id: string,
    header: string,
    objects: SlideObject[],
    background: Background
}