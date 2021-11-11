import styles from '../styles/Home.module.css';
import React, { useRef, useEffect } from 'react';
import TodoList from '../components/todoList/todoList';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../store/actions/todoActions';
import { sendTodoData } from '../store/reducers/todoReducer';
import { fetchTodoData } from '../store/reducers/todoReducer';
import { makeStyles, Typography, Button } from '@material-ui/core';


let isInitial = true;
const useStyles = makeStyles({
  heading: {
    color: '#fff'
  },
  btn: {
    backgroundColor: '#f2f2f2',
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
    border: '1px solid #fff',
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    color: '#fff',
    '&:focus': {
      outline: 'none'
    }
  },
  icon: {
    width: '100%',
    color: '#fff',
  }
});


const Home = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const todos = useSelector((state: { todos: [] }) => state.todos);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchTodoData(todoActions.replaceTodos, todoActions.isLoading))
  }, []);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendTodoData(todos));
  }, [todos])



  const addTodoHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current.value.trim().length === 0) {
      return;
    }

    dispatch(todoActions.addTodo(inputRef.current.value));
    inputRef.current.value = '';
  }

  const todoCompleteHandler = (id: number) => {
    dispatch(todoActions.isCompleteTodo(id));
  }
  const removeTodoHandler = (id: number) => {
    dispatch(todoActions.removeTodo(id))
  }

  return (
    <div className={styles.todo}>
      <Typography className={`${styles.heading} ${classes.heading}`} variant="h4" color="textPrimary">
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


export default Home;
