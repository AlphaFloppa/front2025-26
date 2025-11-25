import type { SlideObject } from '../../Model/slideContent';
import type { Presentation } from '../../Model/presentation';
import type { Slide } from '../../Model/slide';
import { test } from "./test.lib";
import { describe } from 'vitest';

const minPresentation: Presentation = {
  name: 'Test Presentation',
  slides: []
};

const slide: Slide = {
  id: 'slide1',
  header: 'Test Slide',
  objects: [],
  background: {
    type: 'color',
    code: '#FFFFFF'
  }
};

const maxPresentation: Presentation = {
  name: "presentation",
  slides: [
    {
      id: "slide1",
      header: "a",
      objects: [
        {
          id: "obj_1",
          type: "text",
          content: "abc",
          position: {
            x: 0, y: 1
          },
          size: {
            width: 50,
            height: 25
          },
          layer: 1,
          font: {
            fontFamily: "Arial",
            fontSize: 18
          },
          color: "#FFDDAA"
        },
        {
          id: "obj_5",
          type: "image",
          position: {
            x: 0, y: 1
          },
          size: {
            width: 50,
            height: 25
          },
          layer: 1,
          src: "test2.svg"
        }
      ] as SlideObject[],
      background: {
        type: "color",
        code: "#FFDD3E"
      }
    },
    {
      id: "slide2",
      header: "b",
      objects: [
        {
          id: "obj_8",
          type: "text",
          content: "ABC",
          position: {
            x: 0, y: 1
          },
          size: {
            width: 47,
            height: 91
          },
          layer: 1,
          font: {
            fontFamily: "sans-serif",
            fontSize: 19
          },
          color: "#FFDDBA"
        },
        {
          id: "obj_7",
          type: "image",
          position: {
            x: 30, y: 15
          },
          size: {
            width: 40,
            height: 75
          },
          layer: 1,
          src: "test88.svg"
        }
      ] as SlideObject[],
      background: {
        type: "image",
        src: "test.svg"
      }
    }
  ]
}

describe("Тестирование с минимальными данными", () => { test(minPresentation, slide) });
describe("Тестирование с максимальными данными", () => { test(maxPresentation, slide) });