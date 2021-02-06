import React, {useEffect, useState} from 'react'
import css from './TaskLists.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {changeActiveTaskAC, removeTaskThunkCreator} from "../../redux/TaskReducer";

export const TaskLists = () => {

    const taskLists = useSelector(state => state.TaskReducer.tasks);
    const activeTask = useSelector(state => state.TaskReducer.activeTask);
    const dispatch = useDispatch()

    const chooseTask = (id) => {
        dispatch(changeActiveTaskAC(id))
    }

    const removeTask = (e, id) => {
        e.stopPropagation();
        dispatch(removeTaskThunkCreator(id))
    }

    return (
        <div className={css["Task-Lists"]}>
            <ul className={css["lists-roll"]}>
                {
                    taskLists && taskLists.map((el, i) => {
                        return (
                            <li key={i} className={activeTask === el.id ? css["active"] : null}
                                onClick={() => chooseTask(el.id)}>
                                <span>{
                                    el.titleValue.length >= 15
                                        ? el.titleValue.substring(0, 15) + '...'
                                        : el.titleValue
                                }</span>
                                <div>
                                    <span className={css["remove-task"]} onClick={(e) => removeTask(e, el.id)}>x</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
