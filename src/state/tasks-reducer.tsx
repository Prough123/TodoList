import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}

export type addTaskActionType = {
    type: "ADD-TASK",
    title: string,
    todoListId: string

}

export  type  changeTaskStatus = {
    type: "CHANGE-TASK-STATUS"
    id: string
    isDone: boolean
    todoListID: string
}

export  type  changeTaskTitle = {
    type: "CHANGE-TITLE-TASK"
    id: string
    title: string
    todoListID: string
}

let initialStateTask: TasksStateType = {}


type ActionType = RemoveTaskActionType | addTaskActionType | changeTaskStatus | changeTaskTitle | AddTodolistActionType |  RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType = initialStateTask, action: ActionType) => {
    let copyState = {...state}
    switch (action.type) {
        case 'REMOVE-TASK':
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            copyState[action.todoListId] = [newTask, ...copyState[action.todoListId]]
            return copyState
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todoListID]: [...state[action.todoListID].map(task => {
                    if (task.id !== action.id) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })]
            }
        case 'CHANGE-TITLE-TASK':
            return {
                ...state, [action.todoListID]: [...state[action.todoListID].map(task => {
                    if (task.id !== action.id) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })]
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.id]: []
            }
        case 'REMOVE-TODOLIST':
            delete copyState[action.id]
            return copyState

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}


export const addTaskAC = (title: string, todoListId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}

}


export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): changeTaskStatus => {
    return {type: 'CHANGE-TASK-STATUS', id, todoListID, isDone}
}

export const changeTitleStatusAC = (id: string, title: string, todoListID: string): changeTaskTitle => {
    return {type: 'CHANGE-TITLE-TASK', id, title, todoListID}
}