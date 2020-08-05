import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string,
}

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

export type FilterValueType = "all" | "active" | "completed"


export type TasksStateType = {
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
            [newTodoListID]: []
        })
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(task => task.id === id);
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if(todoList){
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {

                        let allTasks = tasks[tl.id]

                        let tasksForTodoList = allTasks;

                        if (tl.filter !== "active") {
                            tasksForTodoList = allTasks.filter(t => t.isDone === false)
                        }

                        if (tl.filter === "completed") {
                            tasksForTodoList = allTasks.filter(t => t.isDone === true)
                        }


                        return (<Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    {/*<Todolist*/}
                                    {/*    changeFIlter={changeFilter}*/}
                                    {/*    id={tl.id}*/}
                                    {/*    title={tl.title}*/}
                                    {/*    addTask={addTask}*/}
                                    {/*    filter={tl.filter}*/}
                                    {/*    removeTodoList={removeTodoList}*/}
                                    {/*    changeTodoListTitle={changeTodoListTitle}*/}
                                    {/*/>*/}
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
