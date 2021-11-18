import React from 'react';
import styles from '../../styles/TodoList.module.css';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { CircleOutlined, CheckCircle, DeleteOutlineOutlined, SettingsBackupRestoreRounded, Category } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { todoActions } from '../../store/actions/todoActions';
import { deleteTodo } from '../../store/reducers/todoReducer';
import { updateTodoData } from '../../store/reducers/todoReducer';


const useStyles = makeStyles({
    listItem: {
        backgroundColor: '#21212B',
        padding: 15,
        marginBottom: 30,
        borderRadius: 15,
        // border: '1px solid #fff',
        transition: 'all .3s'
    },
    listItemText: {
        color: '#fff',
        '& span': {
            fontSize: 20,
            textTransform: 'capitalize',
            display: 'flex',
            alignItems: 'center'
        }
    },
    trash: {
        marginLeft: 'auto',
        color: '#eee',
        '&:active': {
            '& > *': {
                filter: 'drop-shadow(7px 10px 25px #000)'
            }
        }
    },
    circleIcon: {
        color: '#FC76A1',
        transition: 'all .3s',
        '&:active': {
            transform: 'scale(.9)'
        }
    },
    restoreIcon: {
        color: '#FC76A1',
        transition: 'all .3s',
        '&:active': {
            transform: 'scale(.9)'
        }
    },
    cancelIcon: {
        color: '#eee',
        opacity: 0,
        backfaceVisibility: 'hidden',
        transition: 'all .3s !important',
        position: 'absolute',
        zIndex: 0,
    },
    addTodoHeading: {
        color: '#fff',
        marginTop: 50,
        fontFamily: ' cursive',
        overflow: 'hidden',
        textDecoration: 'underline'
    }
});

const TodoList: React.FC<{ todo: { todo: string, isComplete: boolean, id: number, category: string }, listItemStyle: {}, listItemClass: string }> = (props) => {
   
    const classes = useStyles();
    const dispatch = useDispatch()
    const todos = useSelector((state: { todos: [] }) => state.todos);
    const isLoading = useSelector((state: { isLoading: boolean }) => state.isLoading);

    const todoCompleteHandler = (todo: {isComplete: boolean, todo: string, id: number, category: string}) => {
        
        const updatedTodo = {
            id: todo.id,
            todo: todo.todo,
            category: todo.category,
            isComplete: !todo.isComplete,
        }
        dispatch(updateTodoData(updatedTodo));
        dispatch(todoActions.isCompleteTodo(todo.id));
    }
    const removeTodoHandler = (id: number, category: string) => {
        dispatch(todoActions.removeTodo(id));
        dispatch(deleteTodo(id, category))
    }


    return (
        <ListItem ref={React.createRef} style={props.listItemStyle} id={`${props.todo.id}`} className={`${classes.listItem} ${styles.todoListItem} ${props.listItemClass}`} >
            <ListItemText style={{ textDecoration: props.todo.isComplete ? 'line-through 2px' : '', }} className={classes.listItemText}>

                <ListItemIcon onClick={() => { todoCompleteHandler(props.todo) }}>
                    {!props.todo.isComplete && <CircleOutlined fontSize="large" className={`${classes.circleIcon} ${styles.todoCircleIcon}`} />}
                    {props.todo.isComplete && <SettingsBackupRestoreRounded fontSize="large" className={`${classes.restoreIcon} ${styles.todoRestoreIcon}`} />}
                </ListItemIcon>

                {props.todo.todo}

                <ListItemIcon onClick={() => { removeTodoHandler(props.todo.id, props.todo.category) }} style={{ marginLeft: 'auto', minWidth: 'max-content' }}>
                    <DeleteOutlineOutlined fontSize="large" className={classes.trash} />
                </ListItemIcon>
            </ListItemText>
        </ListItem>
    )
}


export default TodoList;