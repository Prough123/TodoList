import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";


type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (id: string, value: FilterValueType) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter: FilterValueType
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
}


function Todolist(props: PropsType) {


    let jsxTasks = props.tasks.map(t => {
        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(t.id, newIsDoneValue, props.id)
        }

        const onTitleChangeHandler = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.id)
        }
        return (
            <div key={t.id} className={props.filter !== "completed" && t.isDone ? "is-done" : ""}>
                <Checkbox color={"primary"} checked={t.isDone} onChange={onStatusChangeHandler}/>
                {/*<input type="checkbox" checked={t.isDone} onChange={onStatusChangeHandler}/>*/}
                <EditableSpan title={t.title} saveTitle={onTitleChangeHandler}/>
                <button onClick={() => {
                    props.removeTask(t.id, props.id)
                }}>x
                </button>
            </div>

        )
    });


    const createTaskTitle = (title: string) => {
        props.addTask(title, props.id);
    }
    const onAllChangeFilter = () => {
        props.changeFilter(props.id, 'all')
    }
    const onActiveChangeFilter = () => {
        props.changeFilter(props.id, "active")
    }
    const onCompletedChangeFilter = () => {
        props.changeFilter(props.id, "completed")
    }
    const onRemoveTodoList = () => props.removeTodoList(props.id)

    return (
        <div>
            <h3>{props.title}
                {/*<button onClick={onRemoveTodoList}>x</button>*/}
                <IconButton onClick={onRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={createTaskTitle}/>
            <div>
                {jsxTasks}
            </div>
            <div>
                <Button
                    onClick={onAllChangeFilter}
                    color={"primary"}
                    variant={props.filter === "active" ? "outlined" : "text"}>All</Button>
                <Button
                    onClick={onActiveChangeFilter}
                    color={"primary"}
                    variant={props.filter === "active" ? "outlined" : "text"}>Active</Button>
                <Button
                    onClick={onCompletedChangeFilter}
                    color={"primary"}
                    variant={props.filter === "completed" ? "outlined" : "text"}>Completed</Button>
            </div>
        </div>
    );
}

export default Todolist;
