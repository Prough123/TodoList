import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

type PropsType = {
    id:string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (id: string ,value: FilterValueType) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter: FilterValueType
    removeTodoList: (id: string) => void
    changeTaskTitle:(id: string, title: string, todoListID: string) => void
}



function Todolist(props: PropsType) {


    let jsxTasks = props.tasks.map(t => {
        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(t.id, newIsDoneValue, props.id)
        }

        const onTitleChangeHandler = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle,props.id)
        }
        return (
            <li key={t.id} className={props.filter !== "completed" && t.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={t.isDone} onChange={onStatusChangeHandler}/>
                <EditableSpan title={t.title} saveTitle={onTitleChangeHandler}/>
                <button onClick={() => {
                    props.removeTask(t.id, props.id)}}>x</button>
            </li>

        )
    });


    const createTaskTitle = (title:string) => {
        props.addTask(title, props.id);
    }
    const onAllChangeFilter = () => {
        props.changeFilter(props.id,  'all')
    }
    const onActiveChangeFilter = () => {
        props.changeFilter(props.id,"active")
    }
    const onCompletedChangeFilter = () => {
        props.changeFilter(props.id,"completed")
    }
    const onRemoveTodoList = () => props.removeTodoList(props.id)

    return (
        <div>
            <h3>{props.title}<button onClick={onRemoveTodoList}>x</button></h3>
            <AddItemForm addItem={createTaskTitle}/>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllChangeFilter}>All</button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveChangeFilter}>Active</button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
