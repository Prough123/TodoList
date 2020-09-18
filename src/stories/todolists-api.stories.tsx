import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist.api";


export default {
    title: 'API'
}


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    const getTodolist = () => {
        todolistAPI.getTodoLists().then((res) => {
            const data = res.data
            setState(data)
        })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={getTodolist}>get todolist</button>
        </div>
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
//
// export const UpdateTodoListTask =() => {
//     const [state, setState] = useState<any>(null)
//     useEffect(()=>{
//         const todoId = '3234c549-f5c9-45f0-b76c-02a1fdd72069';
//         const taskId = 'a44a03e1-2947-43e2-9296-88405f9990d9';
//         const title = 'Sergey Krytoi';
//         const description = 'Жил был даун Василий';
//         const completed = true;
//         const status = 1;
//         const priority = 100;
//         const startDate = '2020-05-13';
//         const deadline = '2020-06-13';
//         todolistAPI.updateTask(todoId,taskId,title,description,completed,status,priority,startDate,deadline)
//             .then((res) => {
//                 setState(res.data.data)
//             })
//             .catch((error)=> {
//                 console.log(error)
//             })
//     },[])
//     return <div>{JSON.stringify(state)}</div>
// }


