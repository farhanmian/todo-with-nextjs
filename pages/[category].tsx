import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, makeStyles, List } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/dist/client/router";

import Loading from '../Components/Partials/Loading/Loading';
import TodoList from "../Components/TodoList/TodoList";

import { getCategoriesData, sendTodoData, fetchTodoData } from '../store/reducers/todoReducer';
import { todoActions } from '../store/actions/todoActions';
import styles from '../styles/Category.module.css';



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
    const todos = useSelector((state: { todos: Array<{ isComplete: boolean, id: number, todo: string, category: string }> }) => state.todos);
    const categoriesData = useSelector((state: {categories: []}) => state.categories)
    const pathName = useRouter().query.category;
    const router = useRouter();


    useEffect(() => {
        todos.length === 0 && dispatch(fetchTodoData(todoActions.replaceTodos, todoActions.isLoading));
        dispatch(getCategoriesData(todoActions.replaceCategories));
    }, []);

    useEffect(()=> {
        console.log(categoriesData);
        categoriesData.length > 0 && categoriesData.map(category => {
            category === pathName || 'completed' ? console.log('on the right path'): router.replace('/') ;
        })
    },[categoriesData]);


    const completedTodos = pathName === 'completed' && todos.filter(todo => todo.isComplete === true);
    const otherTodos = todos.filter(todo => todo.category === pathName);
    

    const showCompletedTodos = (
        completedTodos.length > 0 ? completedTodos.map((todo: { isComplete: boolean, todo: string, id: number, category: string }) => {
            return (
                <TodoList listItemClass="" key={todo.id} listItemStyle={null} todo={todo} />
            )
        }) : <Typography className={classes.addTodoHeading} variant="h4">No Completed Todo Found!</Typography>
    );


    return (
        <List className={`${classes.list} ${styles.todoList}`}>
            {
                !isLoading ?
                    completedTodos
                        ?
                        showCompletedTodos
                        :
                        otherTodos.map((todo: { isComplete: boolean, todo: string, id: number, category: string }) => {
                            return (
                                <CSSTransition ref={() => { React.createRef() }} key={todo.id} in={!todo.isComplete} mountOnEnter unmountOnExit timeout={1300} classNames={styles.completedTodo}>
                                    <TodoList listItemStyle={{ position: `${todo.isComplete ? 'absolute' : 'relative'}` }} todo={todo} listItemClass={`${todo.isComplete ? `${styles.completedTodo} ${classes.completedTodo}` : ''}`} />
                                </CSSTransition>
                            )
                        })

                    : <Loading />
            }
        </List>
    )
}

export default Complete;