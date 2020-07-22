import {TodoListType, FilterValueType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}


export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    id: string
}


export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}


export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValueType
    id: string
}

type ActionType =
    RemoveTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType
    | AddTodolistActionType



export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: action.id,
                title: action.title,
                filter: "all",
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if (tl.id === action.id) {
                    tl.filter = action.filter
                }
                return tl;
            })
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}

export const AddTodoListAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle, id: v1()}
}

export const ChangeTodoListTitle = (todoListId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todoListId,
        title: newTodolistTitle
    }
}

export const ChangeTodoListFilter = (todoListId: string, newFilter: FilterValueType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todoListId,
        filter: newFilter
    }
}