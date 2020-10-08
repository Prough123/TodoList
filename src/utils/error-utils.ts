import {setAppErrorAC, setAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {addTaskAC, RequestStatusesCode} from "../features/TodolistsList/tasks-reducer";
import {Dispatch} from "redux";
import  {ResponseType} from "../api/todolists-api";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<UtilsACTypes>) => {
    if (data.resultCode === RequestStatusesCode.error) {
        if (data.messages.length) {
            dispatch(setAppErrorAC(data.messages[0]))
        } else {
            dispatch(setAppErrorAC('ERROR'))
        }
    }
}


export const handleServerNetworkError = (message: string, dispatch:Dispatch<UtilsACTypes>) => {
    dispatch(setAppErrorAC(message))
}

type UtilsACTypes = SetAppStatusACType | setAppErrorACType
