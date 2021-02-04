const ADD_TASK = "ADD_TASK";
const CHANGE_TASK = "CHANGE_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const INITIALIZE_APP = "INITIALIZE_APP";
const CHANGE_ACTIVE_TASK = "CHANGE_ACTIVE_TASK";

const initialState = {
    tasks: [],
    activeTask: null
}


export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_APP:
            return {
                ...state,
                tasks: action.tasks
            }
        case ADD_TASK:
            const index = state.tasks.findIndex((el, i) => el.id === action.task.id)
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