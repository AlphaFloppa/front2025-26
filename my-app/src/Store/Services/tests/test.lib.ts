import { describe, it, expect } from 'vitest';
import {
    renamePresentation,
    addSlide,
    removeSlide,
    replaceSlide,
    removeObjectsFromSlide,
    addObjectToSlide,
    moveSlideObject,
    resizeSlideObject,
    editText,
    editFontFamily,
    editFontSize,
    editBackground,
    createSlide,
    createPresentation,
    createTextObject,
    createImageObject
} from '../editFunctions';

import type { Presentation } from '../../Model/presentation';
import type { Slide } from '../../Model/slide';
import type { Background } from '../../Model/slideContent';

function test(mockPresentation: Presentation, mockSlide: Slide) {
    describe('Presentation Functions', () => {

        describe('renamePresentation', () => {
            it('should rename presentation', () => {
                const result = renamePresentation(mockPresentation, { newName: 'New Name' });
                expect(result.name).toBe('New Name');
            });
        });

        describe('addSlide', () => {
            it('should add slide to presentation', () => {
                const length = mockPresentation.slides.length;
                const result = addSlide(mockPresentation, { slide: mockSlide });
                expect(result.slides).toHaveLength(length + 1);
                expect(result.slides.at(-1)).toEqual(mockSlide);
            });

            //изменение не по ссылке то есть
            it('should not modify original slides array', () => {
                const originalSlidesCount = mockPresentation.slides.length;
                addSlide(mockPresentation, { slide: mockSlide });
                expect(mockPresentation.slides).toHaveLength(originalSlidesCount);
            });
        });

        describe('removeSlide', () => {
            it('should remove slide by id', () => {
                const presentationWithSlides = {
                    ...mockPresentation,
                    slides: [mockSlide, { ...mockSlide, id: 'slide2' }]
                };

                const result = removeSlide(presentationWithSlides, { id: 'slide1' });
                expect(result.slides).toHaveLength(1);
                expect(result.slides[0].id).toBe('slide2');
            });

            it('should do nothing if slide by id didnt found', () => {
                const presentationWithSlides = {
                    ...mockPresentation,
                    slides: [mockSlide]
                };

                const result = removeSlide(presentationWithSlides, { id: 'nonexistent' });
                expect(result.slides).toHaveLength(1);
            });
        });

        describe('replaceSlide', () => {
            it('should reorder slides', () => {
                const slide1 = { ...mockSlide, id: 'slide1' };
                const slide2 = { ...mockSlide, id: 'slide2' };
                const presentation = { ...mockPresentation, slides: [slide1, slide2] };

                const result = replaceSlide(presentation, { order: ['slide2', 'slide1'] });
                expect(result.slides[0].id).toBe('slide2');
                expect(result.slides[1].id).toBe('slide1');
            });

            it('should throw error if slide not found', () => {
                const presentation = { ...mockPresentation, slides: [mockSlide] };

                expect(() => replaceSlide(presentation, { order: ['nonexistent'] })).toThrow();
            });
        });

        describe('removeObjectsFromSlide', () => {
            it('should remove objects from specified slide', () => {
                const textObject = createTextObject({ id: 'text1', position: { x: 0, y: 0 } });
                const imageObject = createImageObject({ id: 'img1', position: { x: 10, y: 10 }, src: 'test.jpg' });

                const slide = {
                    ...mockSlide,
                    objects: [textObject, imageObject]
                };

                const presentation = { ...mockPresentation, slides: [slide] };

                const result = removeObjectsFromSlide(presentation, {
                    slideId: 'slide1',
                    removingObjectsId: ['text1']
                });

                expect(result.slides[0].objects).toHaveLength(1);
                expect(result.slides[0].objects[0].id).toBe('img1');
            });

            it('should not modify other slides', () => {
                const slide1 = { ...mockSlide, id: 'slide1', objects: [createTextObject({ id: 'text1', position: { x: 0, y: 0 } })] };
                const slide2 = { ...mockSlide, id: 'slide2', objects: [createTextObject({ id: 'text2', position: { x: 0, y: 0 } })] };

                const presentation = { ...mockPresentation, slides: [slide1, slide2] };

                const result = removeObjectsFromSlide(presentation, {
                    slideId: 'slide1',
                    removingObjectsId: ['text1']
                });

                expect(result.slides[1].objects).toHaveLength(1);
            });
        });

        describe('addObjectToSlide', () => {
            it('should add object to specified slide', () => {
                const textObject = createTextObject({ id: 'text1', position: { x: 0, y: 0 } });
                const presentation = { ...mockPresentation, slides: [mockSlide] };

                const result = addObjectToSlide(presentation, {
                    slideId: 'slide1',
                    object: textObject
                });

                expect(result.slides[0].objects).toHaveLength(1);
                expect(result.slides[0].objects[0]).toEqual(textObject);
            });
        });

        describe('moveSlideObject', () => {
            it('should move object to new position', () => {
                const textObject = createTextObject({ id: 'text1', position: { x: 0, y: 0 } });
                const slide = { ...mockSlide, objects: [textObject] };
                const presentation = { ...mockPresentation, slides: [slide] };

                const newPosition = { x: 100, y: 100 };
                const result = moveSlideObject(presentation, {
                    slideId: 'slide1',
                    objectId: 'text1',
                    props: newPosition
                });

                expect(result.slides[0].objects[0].position).toEqual(newPosition);
            });
        });

        describe('resizeSlideObject', () => {
            it('should resize object', () => {
                const textObject = createTextObject({ id: 'text1', position: { x: 0, y: 0 } });
                const slide = { ...mockSlide, objects: [textObject] };
                const presentation = { ...mockPresentation, slides: [slide] };

                const newSize = { width: 200, height: 200 };
                const result = resizeSlideObject(presentation, {
                    slideId: 'slide1',
                    objectId: 'text1',
                    props: newSize
                });

                expect(result.slides[0].objects[0].size).toEqual(newSize);
            });
        });

        describe('editText', () => {
            it('should update text content', () => {
                const textObject = createTextObject({ id: 'text1', position: { x: 0, y: 0 } });
                const slide = { ...mockSlide, objects: [textObject] };
                const presentation = { ...mockPresentation, slides: [slide] };

                const result = editText(presentation, {
                    slideId: 'slide1',
                    objectId: 'text1',
                    value: 'New Text'
                });

                expect(result.slides[0].objects[0].content).toBe('New Text');
            });
        });

        describe('editFontFamily', () => {
            it('should update font family for text objects', () => {
                const textObject = createTextObject({ id: 'text1', position: { x: 0, y: 0 } });
                const slide = { ...mockSlide, objects: [textObject] };
                const presentation = { ...mockPresentation, slides: [slide] };

                const result = editFontFamily(presentation, {
                    slideId: 'slide1',
                    objectId: 'text1',
                    value: 'Arial'
                });

                expect(result.slides[0].objects[0].font.fontFamily).toBe('Arial');
            });

            it('should not modify non-text objects', () => {
                const imageObject = createImageObject({ id: 'img1', position: { x: 0, y: 0 }, src: 'test.jpg' });
                const slide = { ...mockSlide, objects: [imageObject] };
                const presentation = { ...mockPresentation, slides: [slide] };

                const result = editFontFamily(presentation, {
                    slideId: 'slide1',
                    objectId: 'img1',
                    value: 'Arial'
                });

                expect(result.slides[0].objects[0]).toEqual(imageObject);
            });
        });

        describe('editFontSize', () => {
            it('should update font size for text objects', () => {
                const textObject = createTextObject({ id: 'text1', position: { x: 0, y: 0 } });
                const slide = { ...mockSlide, objects: [textObject] };
                const presentation = { ...mockPresentation, slides: [slide] };

                const result = editFontSize(presentation, {
                    slideId: 'slide1',
                    objectId: 'text1',
                    value: 30
                });

                expect(result.slides[0].objects[0].font.fontSize).toBe(30);
            });
        });

        describe('editBackground', () => {
            it('should update slide background', () => {
                const presentation = { ...mockPresentation, slides: [mockSlide] };
                const newBackground = { type: 'color', code: '#000000' } as Background;

                const result = editBackground(presentation, {
                    slideId: 'slide1',
                    bg: newBackground
                });

                expect(result.slides[0].background).toEqual(newBackground);
            });
        });

        describe('create functions', () => {
            it('createSlide should create slide with default values', () => {
                const slide = createSlide({ id: 'new-slide' });
                expect(slide.id).toBe('new-slide');
                expect(slide.header).toBe('New slide');
                expect(slide.objects).toEqual([]);
                expect(slide.background).toEqual({ type: 'color', code: '#FFFFFF' });
            });

            it('createPresentation should create presentation with default values', () => {
                const presentation = createPresentation();
                expect(presentation.name).toBe('Unnamed1');
                expect(presentation.slides).toEqual([]);
            });

            it('createTextObject should create text object with default values', () => {
                const position = { x: 10, y: 20 };
                const textObject = createTextObject({ id: 'text1', position });

                expect(textObject.type).toBe('text');
                expect(textObject.id).toBe('text1');
                expect(textObject.position).toEqual(position);
                expect(textObject.content).toBe('Текст');
                expect(textObject.font.fontFamily).toBe('sans-serif');
            });

            it('createImageObject should create image object with default values', () => {
                const position = { x: 10, y: 20 };
                const src = 'test.jpg';
                const imageObject = createImageObject({ id: 'img1', position, src });

                expect(imageObject.type).toBe('image');
                expect(imageObject.id).toBe('img1');
                expect(imageObject.position).toEqual(position);
                expect(imageObject.src).toBe(src);
                expect(imageObject.size).toEqual({ width: 100, height: 100 });
            });
        });
    });
}

export {
    test
}