import React from 'react';
import styles from '../../styles/TodoList.module.css';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles, SvgIcon, Typography } from '@material-ui/core'
import { CheckCircleOutlineOutlined, CancelOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import Trash from '../../assets/icons/Trash';
import Loading from '../Loading/Loading';


const useStyles = makeStyles({
    list: {
        marginTop: 50,
        padding: 0,
        paddingRight: 5
    },
    listItem: {
        backgroundColor: '#fffffff0',
        padding: 10,
        marginBottom: 30,
        borderRadius: 15,
        transition: 'all .2s'
    },
    listItemText: {
        color: '#000',
        '& span': {
            fontSize: 20,
            textTransform: 'capitalize',
            display: 'flex',
            alignItems: 'center'
        }
    },
    tick: {
        color: '#000'
    },
    cancel: {
        color: '#f10'
    },
    trash: {
        width: 20,
        marginLeft: 'auto',
        '&:active': {
            '& > *': {
                filter: 'drop-shadow(7px 10px 25px #000)'
            }
        }
    },
    addTodoHeading: {
        color: '#fff',
        marginTop: 50,
        fontFamily: ' cursive',
        overflow: 'hidden',
        textDecoration: 'underline'
    }
});

const TodoList: React.FC<{ todoCompleteHandler: (id: number) => void, removeTodoHandler: (id: number) => void }> = (props) => {
    const classes = useStyles();
    const todos = useSelector((state: { todos: [] }) => state.todos);
    const isLoading = useSelector((state: { isLoading: boolean }) => state.isLoading);


    return (
        <List className={`${classes.list} ${styles.todoList}`}>

            {
                !isLoading ?
                    todos.length !== 0 ? todos.map((todo: { id: number, todo: string, isComplete: boolean }) => (
                        <ListItem style={{ backgroundColor: todo.isComplete ? '#2F2F2F' : '' }} id={`${todo.id}`} className={`${classes.listItem} ${styles.todoListItem}`} key={todo.id}>
                            <ListItemText style={{ textDecoration: todo.isComplete ? 'line-through 2px' : '' }} className={classes.listItemText}>

                                <ListItemIcon>
                                    {!todo.isComplete && <CheckCircleOutlineOutlined onClick={() => { props.todoCompleteHandler(todo.id) }} className={classes.tick} />}
                                    {todo.isComplete && <CancelOutlined className={classes.cancel} onClick={() => { props.todoCompleteHandler(todo.id) }} />}
                                </ListItemIcon>

                                {todo.todo}

                                <ListItemIcon onClick={() => { props.removeTodoHandler(todo.id) }} style={{ marginLeft: 'auto', minWidth: 'max-content' }}>
                                    <SvgIcon className={`${classes.trash} ${styles.trashIcon}`}>
                                        <Trash color={!todo.isComplete ? '#000' : '#f10'} />
                                    </SvgIcon>
                                </ListItemIcon>
                            </ListItemText>
                        </ListItem>
                    )) : <Typography className={classes.addTodoHeading} variant="h4">No Todo Found! <br /> Add Todos</Typography>
                    : <Loading />
            }
        </List>
    )
}


export default TodoList;