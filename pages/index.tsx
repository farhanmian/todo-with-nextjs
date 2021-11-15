import styles from '../styles/Home.module.css';
import React, { useRef, useEffect, useState } from 'react';
import TodoList from '../Components/TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../store/actions/todoActions';
import { sendTodoData } from '../store/reducers/todoReducer';
import { fetchTodoData } from '../store/reducers/todoReducer';
import { makeStyles, Typography, TextField, List, Button } from '@material-ui/core';
import { CSSTransition } from 'react-transition-group';
import Loading from '../Components/Partials/Loading/Loading';


const useStyles = makeStyles({
  btn: {
    backgroundColor: '#f2f2f2',
    color: '#000',
    padding: 5,
    marginLeft: 15,
    borderRadius: 5,
    textTransform: 'capitalize',

  },
  textField: {
    '& input': {
      color: '#fff',
      textTransform: 'capitalize',
      transition: 'all .2s',
      '&:focus': {
        backgroundColor: 'rgba(255,255,255,.1)'
      },
      '&::placeholder': {
        textOverflow: 'ellipsis !important',
        color: 'blue'
      }
    },
  },
  inputLabel: {
    color: '#ccc'
  },

  icon: {
    width: '100%',
    color: '#fff',
  },
  addBtn: {
    minWidth: 55,
    maxWidth: 55,
    maxHeight: 55,
    borderRadius: 15,
    padding: 5,
    fontSize: 30,
    position: 'absolute',
    bottom: '1%',
    lfet: '50%',
    transform: 'translate(-50%)',
  },
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

});


let isInitial = true;
const Home = () => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector((state: { isLoading: boolean }) => state.isLoading);
  const inputRef = useRef<HTMLInputElement>(null);
  const todos = useSelector((state: { todos: [] }) => state.todos);

  useEffect(() => {
    todos.length === 0 && dispatch(fetchTodoData(todoActions.replaceTodos, todoActions.isLoading))
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


  const formVisibilityHandler = () => {
    setShowForm((showForm) => !showForm)
  }

  return (
    <React.Fragment>
      <Typography className={styles.heading} variant="h4" color="primary">
        Todo<span>List</span>
      </Typography>

      <Button onClick={formVisibilityHandler} className={`${classes.addBtn} ${styles.addBtn}`} variant="contained">
        +
      </Button>

      {showForm &&
        <form className={styles.form} onSubmit={addTodoHandler}>
          <div className={styles.formInnerContainer}>
            <div className={styles.formOvlay} />
            <TextField InputLabelProps={{ className: classes.inputLabel }} inputRef={inputRef} className={classes.textField} size="small" label="Write Todo" variant="filled" color="primary" />
            <Button type="submit" variant="contained" className={classes.btn} disableElevation >Add Todo</Button>
          </div>
        </form>
      }

      <List className={`${classes.list} ${styles.todoList}`}>
        {
          !isLoading ?
            todos.length !== 0 ? todos.map((todo: { id: number, todo: string, isComplete: boolean }) => {
              return (
                <CSSTransition in={!todo.isComplete} timeout={1300} mountOnEnter unmountOnExit classNames={styles.completedTodo}>
                  <TodoList  listItemStyle={{ position: `${todo.isComplete ? 'absolute' : 'relative'}` }} todo={todo} listItemClass={`${todo.isComplete ? styles.completedTodo : ''}`} />
                </CSSTransition>
              )
            }) : <Typography className={classes.addTodoHeading} variant="h4">No Todo Found! <br /> Add Todos</Typography>
            : <Loading />
        }
      </List>

    </React.Fragment>

  )
}


export default Home;
