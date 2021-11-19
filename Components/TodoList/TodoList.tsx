import React from 'react';
import styles from '../../styles/TodoList.module.css';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { CircleOutlined, DeleteOutlineOutlined, SettingsBackupRestoreRounded } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { todoActions } from '../../store/actions/todoActions';
import { deleteTodo } from '../../store/reducers/todoReducer';
import { updateTodoData } from '../../store/reducers/todoReducer';
import { Typography } from '@mui/material';
import { TodoType } from '../../store/types/types';


const useStyles = makeStyles({
    listItem: {
        backgroundColor: '#21212B',
        padding: 15,
        marginBottom: 30,
        borderRadius: 15,
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
    },
    todoCategory: {
        color: 'grey',
        marginLeft: '1rem'
    },
    todoText: {
        fontSize: '1.3rem'
    }
});

const TodoList: React.FC<{ todo: TodoType, listItemStyle: {}, listItemClass: string }> = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    
    const todoCompleteHandler = (todo: TodoType) => {
        const updatedTodo: TodoType = {
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
            <ListItemText className={classes.listItemText}>

                <ListItemIcon onClick={() => { todoCompleteHandler(props.todo) }}>
                    {!props.todo.isComplete && <CircleOutlined fontSize="large" className={`${classes.circleIcon} ${styles.todoCircleIcon}`} />}
                    {props.todo.isComplete && <SettingsBackupRestoreRounded fontSize="large" className={`${classes.restoreIcon} ${styles.todoRestoreIcon}`} />}
                </ListItemIcon>

                <Typography className={classes.todoText} style={{ textDecoration: props.todo.isComplete ? 'line-through 2px' : '', }}>
                    {props.todo.todo}
                </Typography>
                {props.todo.isComplete &&
                    <Typography className={classes.todoCategory} variant="subtitle1"> ( {props.todo.category} ) </Typography>
                }

                <ListItemIcon onClick={() => { removeTodoHandler(props.todo.id, props.todo.category) }} style={{ marginLeft: 'auto', minWidth: 'max-content' }}>
                    <DeleteOutlineOutlined fontSize="large" className={classes.trash} />
                </ListItemIcon>
            </ListItemText>
        </ListItem>
    )
}


export default TodoList;