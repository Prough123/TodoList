import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fa125444-29b8-4972-9c66-f923562d12f2'
    }
})

type TodoType ={
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type CreateResponseType = {
    resultCode: number
    messages: Array<string>,
    data: {
        item: TodoType
    }
}
type DeleteAndUpdateResponseType = {
    resultCode: number
    messages: Array<string>,
    data: {}
}

type CommonResponseType<T ={}> = {
    resultCode: number,
    messages: Array<string>,
    data:T
}

export const todolistAPI = {
    getTodoLists() {
        return instance.get<Array<TodoType>>('todo-lists',)
    },
    createTodoList(title: string = 'angular') {
        return instance.post<CommonResponseType<{ item: TodoType}>>('todo-lists', {title},)
    },
    deleteTodo(todoId: string) {

        return instance.delete<CommonResponseType>(`todo-lists/${todoId}`,)
    },
    updateTodo(todoId: string, title: string) {

        return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title},)
    }
}