import React, {ChangeEvent, useCallback} from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import EditableSpan from "./EditableSpan";
import {FilterValueType, TaskType} from "./App";


export type taskPropsType = {
    todolistId: string
    filter: FilterValueType
    task: TaskType
    removeTask: (id: string, todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
}

export const Task = React.memo((props: taskPropsType) => {
    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue, props.todolistId)
    }

    const onTitleChangeHandler = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }
    return (
        <div  className={props.filter !== "completed" && props.task.isDone ? "is-done" : ""}>
            <Checkbox color={"primary"} checked={props.task.isDone} onChange={onStatusChangeHandler}/>
            <EditableSpan title={props.task.title} saveTitle={onTitleChangeHandler}/>
            <button onClick={() => {
                props.removeTask(props.task.id, props.todolistId)
            }}>x
            </button>
        </div>

    )
})