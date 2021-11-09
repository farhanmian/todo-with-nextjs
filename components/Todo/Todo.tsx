import React, { useRef } from 'react';
import { Typography, Button, makeStyles, TextField } from '@material-ui/core';
import styles from '../../styles/Todo.module.css';
import TodoList from '../TodoList/TodoList';
import { todoActions } from '../../store/actions/todoActions';
import { useDispatch, useSelector } from 'react-redux';
import { sendTodoData } from '../../store/reducers/todoReducer';
import { AddOutlined } from '@material-ui/icons';


const useStyles = makeStyles({
    btn: {
        height: 60,
        borderRadius: 100,
        backgroundColor: "#FF00FF",
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        '&:hover': {
            backgroundColor: '#FF00FF',
        }
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
    const todos = useSelector((state: {todos: [{id: number, todo: string, isComplete: boolean}]}) => state.todos) 
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);


    const addTodoHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputRef.current.value.trim().length === 0) {
            return;
        }
        const id = todos.length+1;
        dispatch(todoActions.addTodo({ id, todo: inputRef.current.value }));
        dispatch(sendTodoData({ id, todo: inputRef.current.value, isComplete: false }));
        inputRef.current.value = '';
    }

    const todoCompleteHandler = (id: number) => {
        dispatch(todoActions.isCompleteTodo(id));
    }
    const removeTodoHandler = (id: number) => {
        dispatch(todoActions.removeTodo(id))
        localStorage.removeItem(`${id}`);
    }

    const classes = useStyles();
    return (
        <div className={styles.todo}>
            <Typography className={styles.heading} variant="h4" color="textPrimary">
                Todo<span>List</span>
            </Typography>

            <form className={styles.form} onSubmit={addTodoHandler}>
                <input ref={inputRef} className={classes.textField} placeholder="add todo" />
            </form>

            <TodoList todoCompleteHandler={todoCompleteHandler} removeTodoHandler={removeTodoHandler} />

            {/* <Button className={classes.btn} variant="contained" disableElevation>
                <AddOutlined className={classes.icon} />
            </Button> */}

        </div>
    )
}
