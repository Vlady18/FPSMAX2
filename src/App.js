import React, {useEffect} from 'react'
import {TasksLayout} from "./Container/TasksLayout/TasksLayout";
import {useDispatch} from "react-redux";
import {initializeAppThunkCreator} from "./redux/TaskReducer";

function App() {


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppThunkCreator())
    }, [])

    return (
        <div className="App">
            <TasksLayout/>
        </div>
    );
}

export default App;
