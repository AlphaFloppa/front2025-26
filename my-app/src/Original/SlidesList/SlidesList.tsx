import type { Slide as SlideType } from "../../Store/Model/slide"
import { SlideComponent as Slide } from "../../Common/slide/Slide";
import style from "./SlidesList.module.css";
import * as Services from "../../Store/Services/editFunctions";
import { editor } from "../../Store/Model/editor";
import { useContextMenu, useContextMenuTemplate} from "../../Common/ContextMenu/ContextMenu.hooks";

type SlidesListProps = {
    list: SlideType[],
    onClickHandler?: Function,
    onContextMenuHandler?: Function
}

//const slideClickHandler = (slideIndex: number) => { console.log("you pressed at slide №" + slideIndex.toString()) };

function SlidesList({ list, onClickHandler, onContextMenuHandler }: SlidesListProps) {
    const { slideListSlideCM: CMTemplate} = useContextMenuTemplate();
    const { turnOn: enableCM } = useContextMenu();
    const slideContextMenuHandler = (                       //сборка вне и прокидывание в пропсах
        { nativeEvent: { offsetX: x, offsetY: y }, preventDefault }: React.MouseEvent<HTMLDivElement>,
        slide: SlideType
    ) => {             
        preventDefault();
        enableCM(
            {
                position: {x, y},
                template: {
                    options: CMTemplate.options.map(
                        option => (
                            {
                                ...option,
                                clickHandler: () => {
                                    option.clickHandler(slide)
                                }
                            }
                        )
                    )                    
                }
            }
        )
    };
    return (
        <ol className={style.slideList}>
            {
                list.map(
                    (slide: SlideType, slideIndex: number) => 
                    (
                        <li key={slide.id} className={style.slideWrapper}>  
                            <Slide
                                slide={slide}
                                slideIndex={slideIndex}
                                eventHandlers={{
                                    contextMenu: (e) => { slideContextMenuHandler(e, slide) }
                                }}
                                isMini={true}
                            />
                            <span className={style.slideHeader}>
                                {slide.header}
                            </span>
                        </li>
                    )
                )
            }
         </ol>
    );
}

export {
    SlidesList
}