import React, {useEffect, useState} from 'react'
import './TaskLists.sass'
import {useDispatch, useSelector} from "react-redux";
import {changeActiveTaskAC, removeTaskAC} from "../../redux/TaskReducer";

export const TaskLists = () => {

    const taskLists = useSelector(state => state.TaskReducer.tasks);
    const activeTask = useSelector(state=> state.TaskReducer.activeTask);
    const dispatch = useDispatch()

    const chooseTask = (id) => {
        dispatch(changeActiveTaskAC(id))
    }

    const removeTask = (e, id)=>{
        e.stopPropagation();
        const storageTasks = JSON.parse(localStorage.getItem("Tasks"));
        const resultTasks = storageTasks.filter((el) => el.id !== id);
        let serialObj = JSON.stringify(resultTasks);
        localStorage.setItem('Tasks', serialObj);
        dispatch(removeTaskAC(id))
    }

    return (
        <div className="Task-Lists">
            {/*<button className="btn btn-dark">Добавить заметку</button>*/}
            <ul className="lists-roll">
                {
                    taskLists.length && taskLists.map((el, i) => {
                        return (
                            <li key={i} className={activeTask === el.id ? "active" : null} onClick={() => chooseTask(el.id)}>
                                <span>{el.titleValue}</span>
                                <div>
                                    <span className="remove-task" onClick={(e)=>removeTask(e, el.id)}>x</span>

                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
