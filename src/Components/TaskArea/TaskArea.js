import React, {useEffect, useState} from 'react'
import './TaskArea.sass'
import {useDispatch, useSelector} from "react-redux";
import {addTask, changeActiveTaskAC, changeTaskAC} from "../../redux/TaskReducer";

export const TaskArea = () => {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const dispatch = useDispatch();
    const activeTask = useSelector(state=> state.TaskReducer.activeTask);
    const taskLists = useSelector(state=>state.TaskReducer.tasks);
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

    const onSubmit = (e) => {
        e.preventDefault();
        if(titleValue === ''){
            return
        }
        let newObj = {
            id: activeTask ? activeTask : Math.random(),
            titleValue,
            descriptionValue
        }
        if(activeTask){
            dispatch(changeTaskAC(newObj))
            const storageTasks = JSON.parse(localStorage.getItem("Tasks"));
            const tasksChange = storageTasks.filter((el, i) => {
                if(el.id === activeTask){
                    storageTasks[i].titleValue = titleValue;
                    storageTasks[i].descriptionValue = descriptionValue;
                }
                return storageTasks;
            });
            let serialObj = JSON.stringify(tasksChange);
            localStorage.setItem('Tasks', serialObj);
        } else{
            dispatch(addTask(newObj))
            const storageTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
            storageTasks.push(newObj);
            let serialObj = JSON.stringify(storageTasks);
            localStorage.setItem('Tasks', serialObj);
        }
        setDescriptionValue('');
        setTitleValue('');
        dispatch(changeActiveTaskAC(null))
    }
    return (
        <div className="Task-Area">
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <input type="text"
                           className="form-control"
                           value={titleValue} placeholder="Введите заголовок заметки"
                           onChange={(e) => setTitleValue(e.target.value)}
                    />
                </div>
                <div className="textarea-wrap input-group mt-3">
                    <textarea value={descriptionValue}
                              placeholder="Введите описание заметки"
                              onChange={(e) => setDescriptionValue(e.target.value)}
                              className="form-control"
                    />
                    <button className="btn btn-dark" type="submit">Button</button>
                </div>
            </form>
        </div>
    )
}