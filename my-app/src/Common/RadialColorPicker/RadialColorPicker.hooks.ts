import { useCallback, useRef } from "react";

//преобразует функцию под выполнение не чаще частоты анимации
const useAnimationFrame = (callback: Function) => {
    let animationId = useRef(0);
    let actualArgs = useRef<any[]>([]);

    const result = useCallback((...args: any[]) => {
        actualArgs.current = args;

        if (animationId.current) {
            cancelAnimationFrame(animationId.current);
        }

        animationId.current = requestAnimationFrame(() => {
            callback(...actualArgs.current);
        });
    }, []);

    return result;
}

export { 
    useAnimationFrame
}