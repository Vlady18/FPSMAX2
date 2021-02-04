import React from 'react'
import classes from './TasksLayout.module.sass'
import {TaskArea} from "../../Components/TaskArea/TaskArea";
import {TaskLists} from "../../Components/TaskLists/TaskLists";

export const TasksLayout = ()=>{
    return(
        <div className={classes['Tasks-Layout']}>
            <TaskLists />
            <TaskArea />
        </div>
    )
}