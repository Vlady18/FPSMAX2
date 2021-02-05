import {Map, List, fromJS, updateIn } from 'immutable';
import {addStorageTask, getStorageTasks, removeStorageTask, updateStorageTask} from "../utils/task-storage";
const ADD_TASK = "ADD_TASK";
const CHANGE_TASK = "CHANGE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const INITIALIZE_APP = "INITIALIZE_APP";
const CHANGE_ACTIVE_TASK = "CHANGE_ACTIVE_TASK";

const initialState = Map({
    tasks: List([]),
    activeTask: null
})

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_APP:
            return {
                ...state,
                tasks: action.tasks
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        case CHANGE_TASK:
            return{
                ...state,
                tasks: state.tasks.map(task => task.id === action.task.id
                    ? {...task, titleValue: action.task.titleValue, descriptionValue: action.task.descriptionValue}
                    : task
                )
            }
        case REMOVE_TASK:
            return{
                ...state,
                tasks: state.tasks.filter((el)=> el.id !== action.id),
                activeTask: state.activeTask === action.id ? null : state.activeTask

    }
        case CHANGE_ACTIVE_TASK:
            return {
                ...state,
                activeTask: action.id
            }
        default:
            return state
    }
}

export const addTask = (task) => {
    return {
        type: ADD_TASK,
        task
    }
}
export const changeTaskAC = (task) => {
    return {
        type: CHANGE_TASK,
        task
    }
}

export const removeTaskAC = (id) => {
    return {
        type: REMOVE_TASK,
        id
    }
}

export const changeActiveTaskAC = (id) => {
    return {
        type: CHANGE_ACTIVE_TASK,
        id
    }
}

export const initializeAppAC = (tasks) => {
    return {
        type: INITIALIZE_APP,
        tasks
    }
}

export const changeTaskThunkCreator = (task, activeTask) => async (dispatch)=>{
    updateStorageTask(activeTask, task.titleValue, task.descriptionValue);
    dispatch(changeTaskAC(task))
}

export const addTaskThunkCreator = (task) => async (dispatch )=>{
    addStorageTask(task)
    dispatch(addTask(task))
}

export const removeTaskThunkCreator = (id) => async (dispatch )=>{
    removeStorageTask(id)
    dispatch(removeTaskAC(id))
}

export const initializeAppThunkCreator = () => async (dispatch )=>{
    const storagePairs = getStorageTasks() || [];
    dispatch(initializeAppAC(storagePairs))
}