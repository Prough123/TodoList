import React, {ChangeEvent, useCallback} from 'react';
import {FilterValueType, TasksStateType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import {Task} from "./Task";
import {changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from "./state/tasks-reducer";
import {ChangeTodoListTitle} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    changeFilter: (id: string, value: FilterValueType) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValueType
    removeTodoList: (id: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}


const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    console.log("todolist add")
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])

    let tasksForTodoList = tasks;

    if (props.filter !== "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
    }

    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }

    const changeStatus = useCallback((id: string, isDone: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(id, isDone, todoListID)
        dispatch(action)

    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, title: string, todoListID: string) => {
        dispatch(changeTitleStatusAC(id, title, todoListID))
    }, [dispatch])
    const removeTask = useCallback((id: string, todoListID: string) => {
        let action = removeTaskAC(id, todoListID)
        dispatch(action)
    }, [dispatch])

    let jsxTasks = tasksForTodoList.map(t => {

        return <Task
            key={t.id}
            task={t}
            todolistId={props.id}
            changeStatus={changeStatus}
            removeTask={removeTask}
            changeTaskTitle={changeTaskTitle}
            filter={props.filter}/>
    });


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])
    const onAllChangeFilter = () => {
        props.changeFilter(props.id, 'all')
    }
    const onActiveChangeFilter = () => {
        props.changeFilter(props.id, "active")
    }
    const onCompletedChangeFilter = () => {
        props.changeFilter(props.id, "completed")
    }


    const onRemoveTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.removeTodoList, props.id])

    return (
        <div>
            <h3>{props.title}
                <IconButton onClick={onRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
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
})

export default Todolist;
