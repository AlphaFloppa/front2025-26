import { bindActionCreators, combineReducers, createStore } from "redux";
import { slideReducer } from "./reducers/slideReducers";
import { presentationNameReducer } from "./reducers/presentationName";
import { selectionReducer } from "./reducers/selectionReducers";
import { useSelector, type TypedUseSelectorHook, useDispatch } from "react-redux";
import * as TitleActionCreators from './action-creators/presentationName';
import * as SlidesActionCreators from './action-creators/slide';
import * as SelectionActionsCreators from "./action-creators/selection";

type Action = {
    type: string,
    payload: any
}

const finalReducer = combineReducers(
    {
        title: presentationNameReducer,
        slides: slideReducer,
        selection: selectionReducer
    }
);

const store = createStore(finalReducer);

type RootState = ReturnType<typeof finalReducer>;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
        {
            ...TitleActionCreators,
            ...SlidesActionCreators,
            ...SelectionActionsCreators
        },
        dispatch
    )
}

export { 
    store,
    useAppSelector as useSelector,
    useAppActions as useDispatch,
    type Action
}