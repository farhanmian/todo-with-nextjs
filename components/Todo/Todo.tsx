import React, { useRef } from 'react';
import { Typography, Button, makeStyles, TextField } from '@material-ui/core';
import styles from '../../styles/Todo.module.css';
import TodoList from '../TodoList/TodoList';
import { todoActions } from '../../store/actions/todoActions';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles({
    btn: {
        backgroundColor: '#f7f5f5',
        color: '#000',
        padding: 5,
        marginLeft: 15,
        borderRadius: 5,
        textTransform: 'capitalize',
        
    },
    textField: {
        width: 250,
        padding: '10px 5px',
        borderRadius: 10,
        border: 'none',
        textTransform: 'capitalize'
    },
    icon: {
        width: '100%',
        color: '#fff',
    }
});



export default function Todo() {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);


    const addTodoHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputRef.current.value.trim().length === 0) {
            return;
        }
        
        dispatch(todoActions.addTodo(inputRef.current.value ));
        inputRef.current.value = '';
    }

    const todoCompleteHandler = (id: number) => {
        dispatch(todoActions.isCompleteTodo(id));
    }
    const removeTodoHandler = (id: number) => {
        dispatch(todoActions.removeTodo(id))
    }

    const classes = useStyles();
    return (
        <div className={styles.todo}>
            <Typography className={styles.heading} variant="h4" color="textPrimary">
                Todo<span>List</span>
            </Typography>

            <form className={styles.form} onSubmit={addTodoHandler}>
                <input ref={inputRef} className={classes.textField} placeholder="add todo" />
                <Button variant="contained" className={classes.btn} disableElevation >Add Todo</Button>
            </form>

            <TodoList todoCompleteHandler={todoCompleteHandler} removeTodoHandler={removeTodoHandler} />

        </div>
    )
}
