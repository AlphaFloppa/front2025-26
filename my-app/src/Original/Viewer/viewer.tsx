import { useEditor } from "../../hooks/editor.hooks";
import { useEffect, useRef, useState } from "react";
import { StaticSlide as Slide } from "../../Common/slide/staticSlide/Slide";
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
    const navigateHandler = () => {
        navigate(-1);
    }
    const SlidesSwitchingKeyboardHandler = (e: Event) => {
        const event = e as KeyboardEvent;
        e.preventDefault();
        const { key } = event;
        switch (key) {
            case "ArrowRight": {
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
    }
    useEffect(
        () => { 
            enableFullscreen()
                .then(
                    () => { 
                        /*const addHandler = () => {
                            window.addEventListener("fullscreenchange", navigateHandler);
                        }
                        window.addEventListener("fullscreenchange", addHandler);
                        window.removeEventListener("fullscreenchange", addHandler);*/
                        setTimeout(
                            () => {
                                window.addEventListener("fullscreenchange", navigateHandler);
                            }, 100
                        );
                    }
            );
            
            return () => { 
                window.removeEventListener("fullscreenchange", navigateHandler);
            }
        },
        []
    )
    useEffect(
        () => {
            window.addEventListener("keydown", SlidesSwitchingKeyboardHandler);
            return () => {
                window.addEventListener("keydown", SlidesSwitchingKeyboardHandler);
            }
        },
        []
    )
    return (
        <div className={style.fullscreenSlideWrapper} ref={wrapperRef}>
            <Slide slide={slides[currentSlideIndex]} />
        </div>
    )
}

export {
    Viewer
}