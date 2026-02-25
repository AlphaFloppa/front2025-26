import { useEditor } from "../hooks/editor.hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { StaticSlide as Slide } from "../slide/staticSlide/Slide";
import style from "./viewer.module.css";
import { useNavigate } from "react-router-dom";

const Viewer = () => {
    const { useSelector } = useEditor();
    const navigate = useNavigate();
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    const slides = useSelector(state => state.slides);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const enableFullscreen = async () => {
        await wrapperRef.current?.requestFullscreen();
    }
    const navigateHandler = useCallback(
        () => {
            navigate("/editor");
        },
        []
    );
    const SlidesSwitchingKeyboardHandler = useCallback(
        (e: Event) => {
            const event = e as KeyboardEvent;
            e.preventDefault();
            const { key } = event;
            switch (key) {
                case "ArrowRight": {
                    if (currentSlideIndex === slides.length - 1) {
                        navigateHandler();
                    }
                    setCurrentSlideIndex(
                        (currentState) => currentState === slides.length - 1 ? currentState : currentState + 1
                    );
                    break;
                }
                case "ArrowLeft": {
                    setCurrentSlideIndex(
                        (currentState) => currentState === 0 ? currentState : currentState - 1
                    );
                    break;
                }
            }
        },
        [currentSlideIndex, slides, setCurrentSlideIndex]
    );
    useEffect(
        () => {
            enableFullscreen()
                .then(
                    () => {
                        window.addEventListener("keydown", SlidesSwitchingKeyboardHandler);
                        setTimeout(
                            () => {
                                window.addEventListener("fullscreenchange", navigateHandler);
                            }, 1001
                        );
                    }
                );
            
            return () => {
                window.removeEventListener("fullscreenchange", navigateHandler);
                window.removeEventListener("keydown", SlidesSwitchingKeyboardHandler);
            }
        },
        []
    );
    return (
        <div
            className={style.fullscreenSlideWrapper}
            ref={wrapperRef}
        >
            <Slide slide={slides[currentSlideIndex]} />
        </div>
    )
}

export {
    Viewer
}