import styles from '../styles/Home.module.css';
import React, { useEffect } from 'react';
import TodoList from '../Components/TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../store/actions/todoActions';
import { fetchTodoData } from '../store/reducers/todoReducer';

import { makeStyles, Typography, List } from '@material-ui/core';
import { CSSTransition } from 'react-transition-group';
import Loading from '../Components/Partials/Loading/Loading';
import TodoForm from '../Components/Partials/TodoForm/TodoForm';

import { TodoType } from '../store/types/types';


const useStyles = makeStyles({

  list: {
    marginTop: 50,
    padding: 0,
    paddingRight: 5
  },
  addTodoHeading: {
    color: '#fff',
    marginTop: 50,
    fontFamily: ' cursive',
    overflow: 'hidden',
    textDecoration: 'underline'
  },
  completedTodo: {
    transform: 'translateX(0)',
    transition: 'all 1s',
  }

});


const Home = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isLoading = useSelector((state: { isLoading: boolean }) => state.isLoading);
  const todos = useSelector((state: { todos: TodoType[] }) => state.todos);

  useEffect(() => {
    todos.length === 0 && dispatch(fetchTodoData(todoActions.replaceTodos, todoActions.isLoading, todoActions.replaceCategories));
  }, []);


  const defaultTodo = todos.filter((todo: TodoType) => todo.category === 'todos');
  const defaultActiveTodos = defaultTodo.filter((todo: TodoType) => todo.isComplete === false);

  return (
    <React.Fragment>
      
      <TodoForm />

      <List className={`${classes.list} ${styles.todoList}`}>
        {
          !isLoading ?
            <React.Fragment>
              {defaultTodo.map((todo: TodoType) => {
                return (
                  <CSSTransition ref={() => { React.createRef() }} key={todo.id} in={!todo.isComplete} mountOnEnter unmountOnExit timeout={1300} classNames={styles.completedTodo}>
                    <TodoList listItemStyle={{ position: `${todo.isComplete ? 'absolute' : 'relative'}` }} todo={todo} listItemClass={`${todo.isComplete ? `${styles.completedTodo} ${classes.completedTodo}` : ''}`} />
                  </CSSTransition>
                )
              })}
              
              {defaultActiveTodos.length === 0 && <Typography className={`${classes.addTodoHeading} todoNotFoundHeading`} variant="h4">No Todo Found! <br /> Add Todos</Typography>}
            </React.Fragment>
            : <Loading />
        }
      </List>

    </React.Fragment>

  )
}


export default Home;

