import React, {useReducer, useState} from "react";
import {v1} from "uuid";
import {FilterValueType, TasksStateType, TodoListType} from "../App";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import AddItemForm from "../AddItemForm";
import Todolist from "../Todolist";
import {
    AddTodoListAC,
    ChangeTodoListFilter,
    ChangeTodoListTitle,
    RemoveTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";


function AppWithReducer() {
    let todoListID1 = v1();
    let todoListID2 = v1();


    let [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "kek", filter: "all"},
    ])

    let [tasks, dispatchToTask] = useReducer(tasksReducer, {
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
        let action = removeTaskAC(id, todoListID)
        dispatchToTask(action)
    }


    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title, todoListID)
        dispatchToTask(action)
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let action = changeTaskStatusAC(id, isDone, todoListID)
        dispatchToTask(action)

    }

    function changeFilter(id: string, value: FilterValueType) {
        let action = ChangeTodoListFilter(id, value)

        dispatchToTodoList(action)
    }

    function removeTodoList(id: string) {
        let action = RemoveTodoListAC(id)
        dispatchToTodoList(action);
        dispatchToTask(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchToTodoList(action);
        dispatchToTask(action)

    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        dispatchToTask(changeTitleStatusAC(id, title, todoListID))
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let action = ChangeTodoListTitle(todoListID, newTitle)
        dispatchToTodoList(action)
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
                                    {/*    id={tl.id}*/}
                                    {/*    title={tl.title}*/}
                                    {/*    tasks={tasksForTodoList}*/}
                                    {/*    removeTask={removeTask}*/}
                                    {/*    changeFilter={changeFilter}*/}
                                    {/*    addTask={addTask}*/}
                                    {/*    changeStatus={changeStatus}*/}
                                    {/*    filter={tl.filter}*/}
                                    {/*    removeTodoList={removeTodoList}*/}
                                    {/*    changeTaskTitle={changeTaskTitle}*/}
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

export default AppWithReducer;

