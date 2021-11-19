import React, { useEffect } from "react";
import styles from '../styles/Category.module.css';
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import TodoList from "../Components/TodoList/TodoList";
import { todoActions } from '../store/actions/todoActions';
import Loading from '../Components/Partials/Loading/Loading';
import { fetchTodoData } from '../store/reducers/todoReducer';
import { Typography, makeStyles, List } from "@material-ui/core";
import TodoForm from "../Components/Partials/TodoForm/TodoForm";

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
    const categoriesData = useSelector((state: { categories: string[] }) => state.categories)
    const pathName = useRouter().query.category;
    const router = useRouter();

    useEffect(() => {
        todos.length === 0 && dispatch(fetchTodoData(todoActions.replaceTodos, todoActions.isLoading, todoActions.replaceCategories));
    }, []);
    useEffect(() => {
        categoriesData.length > 0 && categoriesData.map(category => {
            category === pathName || 'completed' ? '' : router.replace('/');
        });
    }, [categoriesData]);


    const completedTodos = pathName === 'completed' && todos.filter(todo => todo.isComplete === true);
    const otherTodos = todos.filter(todo => todo.category === pathName);
    const otherActiveTodos = otherTodos.filter(todo => todo.isComplete === false);


    const showCompletedTodos = (
        completedTodos.length > 0 ? completedTodos.map((todo: TodoType) => {
            return (
                <TodoList listItemClass="" key={todo.id} listItemStyle={null} todo={todo} />
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
            <List className={`${classes.list} ${styles.todoList}`}>
                {!isLoading ? completedTodos ? showCompletedTodos : showOtherTodos : <Loading />}
            </List>

            {pathName !== 'completed' && <TodoForm />}
        </React.Fragment>
    )
}

export default Complete;