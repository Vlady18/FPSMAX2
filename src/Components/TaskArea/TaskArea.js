import React, {useCallback, useEffect, useState} from 'react'
import css from './TaskArea.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {
    addTaskThunkCreator,
    changeActiveTaskAC,
    changeTaskThunkCreator
} from "../../redux/TaskReducer";

export const TaskArea = () => {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const dispatch = useDispatch();
    const activeTask = useSelector(state=> state.TaskReducer.activeTask);
    const taskLists = useSelector(state=>state.TaskReducer.tasks) || [];
    useEffect(()=>{
        const activeTaskObj = taskLists.filter((el, i)=>el.id === activeTask)[0];
        if(!activeTask) {
            setTitleValue('');
            setDescriptionValue('');
        }
        else{
            setTitleValue(activeTaskObj.titleValue);
            setDescriptionValue(activeTaskObj.descriptionValue);
        }
    }, [activeTask])

    const onSubmit = useCallback((event ) => {
        event.preventDefault();
        if(titleValue === ''){
            return
        }
        const task = {
            id: activeTask ? activeTask : Math.random(),
            titleValue,
            descriptionValue
        }
        if(activeTask){
            dispatch(changeTaskThunkCreator(task, activeTask))
        } else{
            dispatch(addTaskThunkCreator(task))
        }
        setDescriptionValue('');
        setTitleValue('');
        dispatch(changeActiveTaskAC(null))
    }, [titleValue, descriptionValue]);


    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     if(titleValue === ''){
    //         return
    //     }
    //     const task = {
    //         id: activeTask ? activeTask : Math.random(),
    //         titleValue,
    //         descriptionValue
    //     }
    //     if(activeTask){
    //         dispatch(changeTaskThunkCreator(task, activeTask))
    //     } else{
    //         dispatch(addTaskThunkCreator(task))
    //     }
    //     setDescriptionValue('');
    //     setTitleValue('');
    //     dispatch(changeActiveTaskAC(null))
    // }
    return (
        <div className={css["Task-Area"]}>
            <form onSubmit={onSubmit}>
                <div className={css["input-group"]}>
                    <input type="text"
                           value={titleValue} placeholder="Введите заголовок заметки"
                           onChange={(e) => setTitleValue(e.target.value)}
                    />
                </div>
                <div className={css["textarea-wrap"]}>
                    <textarea value={descriptionValue}
                              placeholder="Введите описание заметки"
                              onChange={(e) => setDescriptionValue(e.target.value)}
                    />
                    <button type="submit">Button</button>
                </div>
            </form>
        </div>
    )
}