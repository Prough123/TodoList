import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist.api";


export default {
    title: 'API'
}


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)


    todolistAPI.getTodoLists().then((res) => {
        const data = res.data
        setState(data)
    })

    return <div> {JSON.stringify(state)}
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createTodolist = () => {
        todolistAPI.createTodoList(title).then((res) => {
            const data = res.data
            setState(data.data)
        })

    }


    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>create Todolist</button>
        </div>
    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    let todoId = '0ffdb707-cdd0-4dbd-8139-1bf78f2d392f'
    const deleteTodolist = () => {
        todolistAPI.deleteTodo(todoId).then((res) => {
            setState(res)
        }).catch((error) => {

        }).finally(() => {

        })
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todoid'}/>
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todoId, setTodoId] = useState<string>('')
    const updateTodolistTitle = () => {
        todolistAPI.updateTodo(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todoId'} onChange={(e) => setTodoId(e.currentTarget.value)}/>
            <input type="text" placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolistTitle}>update todolist</button>
        </div>
    </div>
}


export const GetTodoListsTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')

    const getTodoListsTask = () => {
        todolistAPI.getTasks(todoId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todoId'} onChange={(e) => setTodoId(e.currentTarget.value)}/>
            <button onClick={getTodoListsTask}> get task</button>
        </div>

    </div>
}

export const CreateTodoListTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const createTodoListTask = () => {
        todolistAPI.createTask(todoId, taskTitle)
            .then((res) => {
                setState(res.data.messages)
            })
    }
    return <div>{JSON.stringify(state)}
        <input type="text" placeholder={'todoId'} onChange={(e) => setTodoId(e.currentTarget.value)}/>
        <input type="text" placeholder={'taskTitle'} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
        <button onClick={createTodoListTask}>create task</button>
    </div>
}

export const UpdateTodoListTask = () => {
    const [state, setState] = useState<any>(null)

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskDescr, setTaskDescr] = useState<string>('')
    const [taskStatus, setTaskStatus] = useState<number>(1)
    const [taskPriority, setTaskPriority] = useState<number>(1)
    const [taskStartDate, setTaskStartDate] = useState<string>('')
    const [taskDeadLine, setTaskDeadLine] = useState<string>('')

    const [taskId, setTaskId] = useState<string>('')
    const [todoId, setTodoId] = useState<string>('')

    const updateTodoListTask = () => {
        todolistAPI.updateTask(todoId, taskId, {
            deadLine: null,
            description: taskDescr,
            priority: taskPriority,
            startDate: null,
            status: taskStatus,
            title: taskTitle

        })
            .then((res) => {
                setState(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>

            <input type="text" placeholder={'taskID'} value={taskId}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input type="text" placeholder={'todoId'} value={todoId}
                   onChange={(e) => setTodoId(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskTitle'} value={taskTitle}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskDescr'} value={taskDescr}
                   onChange={(e) => setTaskDescr(e.currentTarget.value)}/>
            <input type="number" placeholder={'taskStatus'} value={taskStatus}
                   onChange={(e) => setTaskStatus(+e.currentTarget.value)}/>
            <input type="number" placeholder={'taskPriority'} value={taskPriority}
                   onChange={(e) => setTaskPriority(+e.currentTarget.value)}/>
            <input type="text" placeholder={'taskstartDate'} value={taskStartDate}
                   onChange={(e) => setTaskStartDate(e.currentTarget.value)}/>
            <input type="text" placeholder={'taskDeadLine'} value={taskDeadLine}
                   onChange={(e) => setTaskDeadLine(e.currentTarget.value)}/>
            <button onClick={updateTodoListTask}></button>
        </div>
    </div>
}


