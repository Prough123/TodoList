import React, {useCallback, useReducer, useState} from "react";
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
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";


const AppWithRedux = React.memo(() => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useDispatch()


    // const removeTask = useCallback((id: string, todoListID: string) => {
    //     let action = removeTaskAC(id, todoListID)
    //     dispatch(action)
    // }, [dispatch])


    const addTask = useCallback((title: string, todoListID: string) => {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    // const changeStatus = useCallback((id: string, isDone: boolean, todoListID: string) => {
    //     let action = changeTaskStatusAC(id, isDone, todoListID)
    //     dispatch(action)
    //
    // }, [dispatch])

    const changeFilter = useCallback((id: string, value: FilterValueType) => {
        let action = ChangeTodoListFilter(id, value)

        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        let action = RemoveTodoListAC(id)
        dispatch(action);
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action);

    }, [dispatch])

    // const changeTaskTitle = useCallback((id: string, title: string, todoListID: string) => {
    //     dispatch(changeTitleStatusAC(id, title, todoListID))
    // }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, todoListID: string) => {
        let action = ChangeTodoListTitle(todoListID, newTitle)
        dispatch(action)
    }, [])


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

                        return (<Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
})

export default AppWithRedux;

