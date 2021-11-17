import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from '../store/actions/todoActions';
import { sendTodoData } from '../store/reducers/todoReducer';
import { fetchTodoData } from '../store/reducers/todoReducer';
import styles from '../styles/Completed.module.css';
import Loading from '../Components/Partials/Loading/Loading';
import TodoList from "../Components/TodoList/TodoList";
import { List } from "@material-ui/core";

import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    list: {
        marginTop: 50,
        padding: 0,
        paddingRight: 5
    },
    addTodoHeading: {
        color: '#fff',
        marginTop: 50,
        fontFamily: 'cursive',
        overflow: 'hidden',
        textDecoration: 'underline'
    },
})


const Complete = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: { isLoading: boolean }) => state.isLoading);
    const todos = useSelector((state: { todos: Array<{ isComplete: boolean, id: number, todo: string }> }) => state.todos);

    useEffect(() => {
        todos.length === 0 && dispatch(fetchTodoData(todoActions.replaceTodos, todoActions.isLoading))
    }, []);


    const completedTodos = todos.filter(todo => todo.isComplete === true);

    return (
        <List className={`${classes.list} ${styles.todoList}`}>
            {
                !isLoading ?
                    completedTodos.length !== 0 ? completedTodos.map((todo: { isComplete: boolean, todo: string, id: number }) => {
                        return (
                            <TodoList listItemClass="" key={todo.id} listItemStyle={null} todo={todo} />
                        )
                    }) : <Typography className={classes.addTodoHeading} variant="h4">No Completed Todo Found!</Typography>
                    : <Loading />
            }
        </List>
    )
}

export default Complete;