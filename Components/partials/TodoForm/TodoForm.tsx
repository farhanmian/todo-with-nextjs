import React, { Fragment, useState, useRef } from "react";
import styles from '../../../styles/TodoForm.module.css';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { Add } from "@material-ui/icons";

import { useDispatch } from 'react-redux';
import { todoActions } from "../../../store/actions/todoActions";
import { sendTodoData } from '../../../store/reducers/todoReducer';
import { useRouter } from "next/dist/client/router";
import { ClickAwayListener } from "@mui/material";
import { CSSTransition } from "react-transition-group";


const useStyles = makeStyles({
    btn: {
        padding: 5,
        marginLeft: 15,
        borderRadius: 5,
        textTransform: 'capitalize',
        fontSize: '1rem'
    },
    addBtn: {
        minWidth: 55,
        maxWidth: 55,
        maxHeight: 55,
        minHeight: 55,
        borderRadius: 15,
        padding: 5,
        fontSize: 30,
        position: 'absolute',
        bottom: '1%',
        lfet: '50%',
        transform: 'translate(-50%)',
    },
    inputLabel: {
        color: '#ccc'
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

});

const TodoForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const pathName = useRouter().asPath;


    const formVisibilityHandler = () => {
        setShowForm((showForm) => !showForm)
    }

    const addTodoHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (inputRef.current?.value.trim().length === 0) {
            inputRef.current.focus();
            return;
        }

        const todo = {
            todo: inputRef.current ? inputRef.current?.value : '',
            id: Math.ceil(Math.random() * 1000),
            isComplete: false,
            category: pathName === '/' ? 'todos' : pathName.replace('/', '')
        }
        dispatch(todoActions.addTodo(todo));
        dispatch(sendTodoData(todo));
        inputRef.current ? inputRef.current.value = '' : null;
    }


    return (
        <Fragment>
            <Button onClick={formVisibilityHandler} className={`${classes.addBtn} ${styles.addBtn}`} variant="contained">
                <Add style={{ transition: 'all .4s', transform: showForm ? 'rotate(45deg)' : 'rotate(0deg)' }} />
            </Button>

            <CSSTransition ref={() => { React.createRef() }} in={showForm} mountOnEnter unmountOnExit timeout={400} classNames={styles.form}>
                <ClickAwayListener onClickAway={() => { setShowForm(false) }}>
                    <form className={`${styles.form} ${!showForm && styles.formClose}`} onSubmit={addTodoHandler}>
                        <div className={styles.formInnerContainer}>
                            <div className={styles.formOvlay} />
                            <TextField autoFocus InputLabelProps={{ className: classes.inputLabel }} inputRef={inputRef} className={classes.textField} size="small" label="Write Todo" variant="filled" color="primary" />
                            <Button type="submit" variant="outlined" className={`${classes.btn} ${styles.formSubmitBtn}`} disableElevation color="primary" >Add Todo</Button>
                        </div>
                    </form>
                </ClickAwayListener>
            </CSSTransition>
        </Fragment>
    )
}

export default TodoForm;