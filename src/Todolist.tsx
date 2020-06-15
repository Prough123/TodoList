import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";


type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    let jsxTasks = props.tasks.map(t => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(t.id, newIsDoneValue)
        }
        return (
            <li key={t.id} className={props.filter !== "completed" && t.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>x
                </button>
            </li>

        )
    });

    const onAddTaskClick = () => {
        if (title.trim() !== "") {
            props.addTask(title);

        } else {
            setError("title is required")
        }
        setTitle("")


    }

    const onAllChangeFilter = () => {
        props.changeFilter("all")
    }
    const onActiveChangeFilter = () => {
        props.changeFilter("active")
    }
    const onCompletedChangeFilter = () => {
        props.changeFilter("completed")
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {

            onAddTaskClick()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={title}
                       onChange={onTitleChange}
                       onKeyPress={onKeyPressAddTask}
                       className={error ? "error" : ""}/>
                <button onClick={onAddTaskClick}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
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
