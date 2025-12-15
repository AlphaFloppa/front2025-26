import { useEffect, useRef } from "react";
import { useDB } from "../../hooks/db.hooks";
import { useEditor } from "../../hooks/editor.hooks";
import { useUser } from "../../hooks/user.hooks";

const Home = () => {
    const { useDispatch } = useEditor();
    const { setState: setPresentation } = useDispatch();
    const { user } = useUser();
    const { getAll } = useDB();
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(
        () => {
            getAll()
                .then(
                    records => {
                        records.map(
                            presentationEntity => {
                                const presentationPrev = document.createElement("div")
                                presentationPrev.style.setProperty(
                                    "width",
                                    "100px"
                                );
                                presentationPrev.style.setProperty(
                                    "height",
                                    "100px"
                                );
                                presentationPrev.style.setProperty(
                                    "cursor",
                                    "pointer"
                                );
                                presentationPrev.addEventListener(
                                    "click",
                                    () => {
                                        setPresentation(
                                            presentationEntity.presentation
                                        );
                                        window.location.replace("/dev");
                                        //TODO:
                                        //загружается в editor generalData
                                        //а не данные с db
                                    }
                                )

                                containerRef.current?.append(presentationPrev)
                            }
                        )
                    }
                );

        },
        []
    )

    return (
        <>
            <p style={{ fontSize: "40px" }}>
                {"Your email: " + user?.email}
            </p>
            <div
                ref={containerRef}
                style={
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        border: "5px solid black"
                    }
                }
            >
            </div>
        </>
    );
}

export {
    Home
}