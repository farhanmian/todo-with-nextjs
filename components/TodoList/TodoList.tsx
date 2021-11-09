import React from 'react';
import styles from '../../styles/TodoList.module.css';
import { List, ListItem, ListItemIcon, ListItemText, makeStyles, SvgIcon } from '@material-ui/core'
import { CheckCircleOutlineOutlined, CancelOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
// import { todoActions } from '../../store/actions/todoActions';
import Trash from '../../static/icons/Trash';


const useStyles = makeStyles({
    list: {
        marginTop: 50,
        padding: 0,
        paddingRight: 5
    },
    listItem: {
        padding: 10,
        backgroundColor: '#1E0057',
        marginBlock: 10,
        borderRadius: 15,
        transition: 'all .2s'
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
    tick: {
        color: '#FFF'
    },
    cancel: {
        color: '#f10'
    },
    trash: {
        width: 20,
        marginLeft: 'auto'
    }
});

const TodoList: React.FC<{todoCompleteHandler: (id: number)=> void, removeTodoHandler: (id: number)=> void}> = (props) => {
    const classes = useStyles();
    const todos = useSelector((state: { todos: [] }) => state.todos);


    return (
        <List className={`${classes.list} ${styles.todoList}`}>

            {
                todos &&
                todos.map((todo: { id: number, todo: string, isComplete: boolean }, i) => (
                    <ListItem style={{ backgroundColor: todo.isComplete ? '#2F2F2F' : '' }} id={`${todo.id}`} className={classes.listItem} key={todo.id}>
                        <ListItemText style={{ textDecoration: todo.isComplete ? 'line-through 2px' : '' }} className={classes.listItemText}>

                            <ListItemIcon>
                                {!todo.isComplete && <CheckCircleOutlineOutlined onClick={() => { props.todoCompleteHandler(todo.id) }} className={classes.tick} />}
                                {todo.isComplete && <CancelOutlined className={classes.cancel} onClick={() => { props.todoCompleteHandler(todo.id) }} />}
                            </ListItemIcon>

                            {todo.todo}

                            <ListItemIcon onClick={() => { props.removeTodoHandler(todo.id) }} style={{marginLeft: 'auto', minWidth: 'max-content'}}>
                                <SvgIcon className={classes.trash}>
                                    <Trash color="#fff" />
                                </SvgIcon>
                            </ListItemIcon>
                        </ListItemText>
                    </ListItem>
                ))
            }
        </List>
    )
}


export default TodoList;