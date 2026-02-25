
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { eventTarget } from "../Store/store/middlewares/db_usage"
import { useEffect, useState } from "react";

const UpperPanel = () => {
    const messageLifeTime = 700;
    const messageDelay = 500;
    const navigate = useNavigate();
    const [isInProgress, setIsInProgress] = useState<boolean | null>(null);
    const startHandler = () => {
        setIsInProgress(true);
    };
    const endHandler = () => {
        setTimeout(
            () => { 
                setIsInProgress(false)
            },
            messageDelay
        )
    }
    if (isInProgress === false) {
        setTimeout(
            () => {
                setIsInProgress(null)
            },
            messageLifeTime
        )
    }
    useEffect(
        () => {
            eventTarget.addEventListener(
                "savingStart",
                startHandler
            );
            eventTarget.addEventListener(
                "savingComplete",
                endHandler
            );

            return () => {
                eventTarget.removeEventListener(
                    "savingStart",
                    startHandler
                );
                eventTarget.removeEventListener(
                    "savingComplete",
                    endHandler
                );
            }
        },
        []
    );

    return (
        <div className={style.container}>
            <div
                className={style.exitWrapper}
                onClick={
                    () => {
                        navigate("/");
                    }
                }
            >
                <div className={ style.exitWrapperBtn}></div>
                Выйти из редактора
            </div>
            {
                isInProgress
                ? (
                    <span className={style.message}>
                        Сохранение...
                    </span>
                )
                : (
                    isInProgress !== null && (
                        <span className={style.message}>
                            Сохранено
                        </span>
                    )
                )
            }
        </div>
    )
}

export {
    UpperPanel
}