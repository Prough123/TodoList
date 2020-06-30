import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string,
}

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

export type FilterValueType = "all" | "active" | "completed"


type TasksStateType = {
    [key: string]: Array<TaskType>
}



function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "kek", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), isDone: false, title: 'Bs4'},
            {id: v1(), isDone: true, title: 'reactjs'},
            {id: v1(), isDone: true, title: 'reactjs'}
        ],
        [todoListID2]: [
            {id: v1(), isDone: true, title: 'Html Css'},
            {id: v1(), isDone: false, title: 'Js'},
            {id: v1(), isDone: false, title: 'Scss'},
            {id: v1(), isDone: false, title: 'Pug'},
            {id: v1(), isDone: false, title: 'Bs4'},
            {id: v1(), isDone: true, title: 'reactjs'},
            {id: v1(), isDone: true, title: 'reactjs'}
            ]
});


    function removeTask(id: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter((t) => t.id !== id);
        setTasks({...tasks})
    }


    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function changeFilter(id: string, value: FilterValueType) {

        let todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    }

    function addTodoList(title: string) {

        let newTodoListID = v1();

        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }

        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodoListID]:[]
        })
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(task => task.id === id);
        if(task){
            task.title = title
            setTasks({...tasks})
        }
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl =>
            {

                let allTasks = tasks[tl.id]

                let tasksForTodoList = allTasks;

                if (tl.filter !== "active") {
                    tasksForTodoList = allTasks.filter(t => t.isDone === false)
                }

                if (tl.filter === "completed") {
                    tasksForTodoList = allTasks.filter(t => t.isDone === true)
                }


                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                    />
                )
            })}


        </div>
    );
}

export default App;
