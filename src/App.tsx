import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string,
}

export type FilterValueType = "all" | "active" | "completed"


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), isDone: true, title: 'Html Css'},
        {id: v1(), isDone: false, title: 'Js'},
        {id: v1(), isDone: false, title: 'Scss'},
        {id: v1(), isDone: false, title: 'Pug'},
        {id: v1(), isDone: false, title: 'Bs4'},
        {id: v1(), isDone: true, title: 'reactjs'},
        {id: v1(), isDone: true, title: 'reactjs'}

    ])

    let [filter, setFilter] = useState<FilterValueType>("all")


    function removeTask(id: string) {
        let filtredTasks = tasks.filter((t) => t.id !== id);
        setTasks(filtredTasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }


    function addTask (title: string){
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    function changeStatus(id: string, isDone: boolean){
        let task = tasks.find(task => task.id === id)
        if(task){
            task.isDone = isDone;
            setTasks([...tasks])
        }

    }

    let tasksForTodoList = tasks;

    if (filter !== "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask = {addTask}
                changeStatus={changeStatus}
                filter={filter}
            />

        </div>
    );
}

export default App;
