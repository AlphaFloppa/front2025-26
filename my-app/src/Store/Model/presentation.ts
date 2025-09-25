import type {Slide} from "./slide.js";
export type {Presentation};

type Presentation = {
    slides: Slide[],
    name: string
}