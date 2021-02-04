import {combineReducers} from "redux";
import {TaskReducer} from "./TaskReducer";

export const rootReducers = combineReducers({
    TaskReducer: TaskReducer,

})