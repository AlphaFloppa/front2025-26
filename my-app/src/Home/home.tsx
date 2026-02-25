import { useCallback, useEffect, useState } from "react";
import style from "./style.module.css"
import { useDB } from "../hooks/db.hooks";
import { useEditor } from "../hooks/editor.hooks";
import { useUser } from "../hooks/user.hooks";
import { useNavigate } from "react-router-dom";
import { Ajv } from "ajv";
import { schema } from "./validateSchema";
import type { Presentation } from "../Store/Model/presentation";
import { StaticSlide as Slide } from "../slide/staticSlide/Slide";
import { verify } from "../Store/Services/editFunctions";

type PresentationEntity = {
    id: string,
    presentation: Presentation
}

const validate = (presentationJSON: string) => {
    const presentationData = JSON.parse(presentationJSON);
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    return [validate(presentationData), validate.errors];
}

const Home = () => {
    const { useDispatch } = useEditor();
    const { initializePresentation } = useDispatch();
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const { getAll, create } = useDB();
    const openPresentation = useCallback(
        (id: string, presentation: Presentation) => {
            initializePresentation(
                {
                    id,
                    presentation
                }
            );
            navigate("/editor");
        },
        [initializePresentation]
    );
    const createEmptyPresentation = useCallback(
        (): Presentation => (
            {
                title: "Новая презентация",
                slides: [
                    {
                        id: Date.now().toString(),
                        objects: [],
                        header: "1",
                        background: {
                            type: "color",
                            code: "#FFFFFF"
                        }
                    }
                ]
            }
        ),
        []
    );
    const createPresentation = useCallback(
        () => {
            const newPresentation = createEmptyPresentation();
            create(
                newPresentation
            ).then(
                (id) => {
                    openPresentation(
                        verify(id),
                        newPresentation
                    )
                }
            )
        },
        [create, openPresentation]
    );
    const [presentationEntities, setPresentationEntities] = useState<PresentationEntity[]>([]);
    useEffect(
        () => {
            getAll()
                .then(
                    records => {
                        setPresentationEntities(
                            records.filter(
                                ({ presentationJSON }) => {
                                    const [isValid] = validate(presentationJSON);
                                    return isValid;
                                }
                            ).map(
                                ({ id, presentationJSON }) => ({
                                    id,
                                    presentation: JSON.parse(presentationJSON)
                                })
                            )
                        );
                    }
                );

        },
        []
    );

    return (
        <>
            <div
                className={style.exitWrapper}
                onClick={
                    () => { 
                        logout();
                        navigate("/login")
                    }
                }
            >
                <div className={style.logoutBtn}></div>
                Logout
            </div>
            <span className={style.email}>
                {user?.email}
            </span>
            {
                <div
                    className={style.container}
                >
                    <div
                        className={style.slidePreviewWrapper}
                        onClick={createPresentation}
                    >
                        <div
                            className={style.createNewPresentationBtn}
                        >
                        </div>
                        <span>
                            Создать новую
                        </span>
                    </div>
                    {
                        presentationEntities.map(
                            ({ id, presentation }) => {
                                return (
                                    <>
                                        <div
                                            key={id}
                                            className={style.slidePreviewWrapper}
                                            onClick={
                                                () => {
                                                    openPresentation(id, presentation);
                                                }
                                            }
                                        >
                                            <Slide type="mini" slide={presentation.slides[0]} />
                                            <span className={style.header}>{presentation.title}</span>
                                        </div>
                                    </>
                                )
                            }
                        )
                    }
                </div>
            }
        </>
    );
}

export {
    Home
}