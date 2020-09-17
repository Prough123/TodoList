import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist.api";


export default {
    title: 'API'
}


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
       todolistAPI.getTodoLists().then((res) => {
            const data = res.data
            setState(data[0].order)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'React'
        todolistAPI.createTodoList(title).then((res) => {
            const data = res.data
            setState(data.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = '0ffdb707-cdd0-4dbd-8139-1bf78f2d392f'

        todolistAPI.deleteTodo(todoId).then((res) => {
            setState(res)
        }).catch((error) => {

        }).finally(() => {

        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'ASDasdadadasd'
        const todoId = '03c9a001-ae9a-42a0-842a-ce57f8c1a826'
        todolistAPI.updateTodo(todoId,title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


