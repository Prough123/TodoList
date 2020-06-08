import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
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
}

function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>("")

    let jsxTasks = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>x
                </button>
            </li>

        )
    });

    const onAddTaskClick = () => {
        props.addTask(title);
        setTitle("")
    }

    const onAllChangeFilter = () => {
        props.changeFilter("all")
    }
    const onActiveChangeFilter = () => {
        props.changeFilter("active")
    }
    const onCompletedChandeFilter = () => {
        props.changeFilter("completed")
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
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
                       onKeyPress={onKeyPressAddTask}/>
                <button onClick={onAddTaskClick}>+</button>
            </div>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button onClick={onAllChangeFilter}>All</button>
                <button onClick={onActiveChangeFilter}>Active</button>
                <button onClick={onCompletedChandeFilter}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
