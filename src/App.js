import React, {useEffect} from 'react'
import {TasksLayout} from "./Container/TasksLayout/TasksLayout";
import {useDispatch} from "react-redux";
import {initializeAppAC} from "./redux/TaskReducer";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        const storagePairs = JSON.parse(localStorage.getItem("Tasks")) || [];
        dispatch(initializeAppAC(storagePairs))

    }, [])

    return (
        <div className="App">
            <TasksLayout/>
        </div>
    );
}

export default App;
