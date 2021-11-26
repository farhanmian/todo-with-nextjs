import React, { useEffect } from "react";
import styles from '../styles/Category.module.css';
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import TodoList from "../Components/partials/TodoList/TodoList";
import { todoActions } from '../store/actions/todoActions';
import Loading from '../Components/partials/Loading/Loading';
import { fetchTodoData } from '../store/reducers/todoReducer';
import { Typography, makeStyles, List } from "@material-ui/core";
import TodoForm from "../Components/partials/TodoForm/TodoForm";

import { TodoType } from "../store/types/types";

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
    completedTodo: {
        transform: 'translateX(0)',
        transition: 'all 1s',
    }
})


const Complete = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector((state: { isLoading: boolean }) => state.isLoading);
    const todos = useSelector((state: { todos: Array<TodoType> }) => state.todos);
    const pathName = useRouter().asPath;
    const pathNameWithoutSlash = pathName.replace('/', '');


    useEffect(() => {
        todos.length === 0 && dispatch(fetchTodoData(todoActions.replaceTodos, todoActions.isLoading, todoActions.replaceCategories));
    }, []);

    useEffect(() => {
        if (!window.navigator.onLine) {
            throw new Error('check your internet connection!');
        }
    })

    const completedTodos = pathNameWithoutSlash === 'completed' && todos.filter(todo => todo.isComplete === true);
    const otherTodos = todos.filter(todo => todo.category === pathNameWithoutSlash);
    const otherActiveTodos = otherTodos.filter(todo => todo.isComplete === false);


    const showCompletedTodos = (
        completedTodos && completedTodos.length > 0 ? completedTodos.map((todo: TodoType) => {
            return (
                <TodoList listItemClass="" key={todo.id} listItemStyle={{ position: 'relative' }} todo={todo} />
            )
        }) : <Typography className={classes.addTodoHeading} variant="h4">No Completed Todo Found!</Typography>
    );
    const showOtherTodos = (
        <React.Fragment>
            {otherTodos.map((todo: TodoType) => {
                return (
                    <CSSTransition ref={() => { React.createRef() }} key={todo.id} in={!todo.isComplete} mountOnEnter unmountOnExit timeout={1300} classNames={styles.completedTodo}>
                        <TodoList listItemStyle={{ position: `${todo.isComplete ? 'absolute' : 'relative'}` }} todo={todo} listItemClass={`${todo.isComplete ? `${styles.completedTodo} ${classes.completedTodo}` : ''}`} />
                    </CSSTransition>
                )
            })}
            {otherActiveTodos.length === 0 && <Typography className={`${classes.addTodoHeading} todoNotFoundHeading`} variant="h4">No Todo Found! <br /> Add Todos</Typography>}
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <List className={`${classes.list} ${styles.todoList} todoList`}>
                {!isLoading ? completedTodos ? showCompletedTodos : showOtherTodos : <Loading />}
            </List>

            {pathNameWithoutSlash !== 'completed' && <TodoForm />}
        </React.Fragment>
    )
}

export default Complete;
