import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task:TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type SetTaskAT = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType | SetTaskAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoId] = action.tasks
            return stateCopy
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTaskAC = (tasks: Array<TaskType>, todoId: string): SetTaskAT => {
    return {type: 'SET-TASKS', tasks, todoId}
}


export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTaskAC(res.data.items, todoId))
        })
}

export const removeTaskTC = (id: string, todolistId:string) => (dispatch:Dispatch) => {
    todolistsAPI.deleteTask(todolistId,id)
        .then((res) => {
            dispatch(removeTaskAC(id, todolistId ))
        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch:Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task){
        todolistsAPI.updateTask(todolistId, taskId, {
            title:task.title,
            startDate:task.startDate,
            priority:task.priority,
            description:task.description,
            deadline:task.deadline,
            status:status
        }).then(() => {
            dispatch(changeTaskStatusAC(taskId,status,todolistId))
        })
    }
}


export const updateTaskTitleTC = (taskId: string, todolistId: string, newTitle:string) => (dispatch:Dispatch, getState:() => AppRootStateType)=> {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if(task){
        todolistsAPI.updateTask(todolistId,taskId, {
            title:newTitle,
            startDate:task.startDate,
            priority:task.priority,
            description:task.description,
            deadline:task.deadline,
            status:task.status
        }).then(()=> {
            dispatch(changeTaskTitleAC(taskId,newTitle,todolistId))
        })
    }
}

export const addTaskTC = (title:string, todolistId: string) => (dispatch:Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}