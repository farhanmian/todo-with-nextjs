import React, { useRef, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';
import styles from '../../../styles/Layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sendCategory } from '../../../store/reducers/todoReducer';

import { Menu, Person, AssignmentTurnedIn, Delete, ListAlt, CloseRounded, Add, Category } from '@mui/icons-material';
import { List, makeStyles, ListItemText, ListItemIcon, Divider, Typography, Button, TextField } from '@material-ui/core';
import { ListItemButton } from '@mui/material';
import { Transition as ReactTransition } from 'react-transition-group';
import { todoActions } from '../../../store/actions/todoActions';

const useStyles = makeStyles({
    navIcon: {
        cursor: 'pointer',
        color: '#fff',
        fontSize: 50,
        position: 'absolute',
        left: '0%'
    },
    colorWhite: {
        color: '#fff'
    },
    textField: {
        '& > *': {
            color: '#fff',
            '& > input': {
                textTransform: 'capitalize'
            }
        }
    },
    categoryFormSubmitBtn: {
        padding: 4,
        marginLeft: '.5rem'
    },
    listItemText: {
        '& > *': {
            textTransform: 'capitalize'
        }
    }
})

const Layout: React.FC<{ props: Object }> = (props) => {
    const dispatch = useDispatch();
    const categoriesData = useSelector((state: { categories: [] }) => state.categories);
    const classes = useStyles();

    const categoryInputRef = useRef<HTMLInputElement>();
    const { pathname } = useRouter();
    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(pathname === '/' ? 0 : 1);
    const [createCategory, setCreateCategory] = useState(false);
    // const [categories, setCategories] = useState([]);
    
    
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const categoryTitle = categoryInputRef.current.value.toLocaleLowerCase();
        
        setCreateCategory(false);
        dispatch(todoActions.addCategory(categoryTitle))
        dispatch(sendCategory(categoryTitle));
    }

    
    return (
        <main className="app">
            <nav className={styles.nav}>

                <ReactTransition ref={() => { React.createRef() }} in={drawerVisibility} timeout={300} mountOnEnter unmountOnExit>
                    {state => (
                        <CloseRounded
                            style={{
                                transition: 'all .3s',
                                opacity: state === 'exiting' ? .1 : 1,
                                transform: state === 'exiting' ? 'rotate(90deg)' : 'rotate(0)'
                            }}
                            className={classes.navIcon}
                            onClick={() => { setDrawerVisibility(drawer => !drawer) }}
                        />
                    )}
                </ReactTransition>

                <ReactTransition ref={() => { React.createRef() }} in={!drawerVisibility} timeout={300} mountOnEnter unmountOnExit>
                    {state => (
                        <Menu
                            style={{
                                transition: 'all .3s',
                                opacity: state === 'exiting' ? .1 : 1,
                                transform: state === 'exiting' ? 'rotate(45deg)' : 'rotate(0)'
                            }}
                            className={classes.navIcon}
                            onClick={() => { setDrawerVisibility(drawer => !drawer) }}
                        />
                    )}
                </ReactTransition>

                <Typography className={`${styles.heading} ${classes.colorWhite}`} variant="h4">
                    {pathname === '/'
                        ? <React.Fragment>Todo<span>List</span></React.Fragment>
                        : <React.Fragment>Completed<span>Todos</span></React.Fragment>}
                </Typography>

            </nav>
            <div className={styles.todoContainer}>
                {props.children}
            </div>

            <div className={`${styles.drawer} ${drawerVisibility ? styles.drawerActive : ''}`}>

                <List className={styles.drawerInnerContainer} component="nav">

                    {
                        categoriesData.map((category, i) => {

                            return <Link key={category} href={`${category === 'todos' ? '/' : `/${category}`}`}>
                                <ListItemButton
                                    selected={selectedIndex === i}
                                    onClick={(event) => handleListItemClick(event, i)}
                                >
                                    <ListItemIcon>
                                        {category === 'todos' ? <ListAlt className={classes.colorWhite} /> : <Category className={classes.colorWhite} /> }
                                    </ListItemIcon>
                                    <ListItemText className={classes.listItemText} style={{ color: '#fff' }} primary={`${category === 'todos' ? 'Todo' : `${category}`}`} />
                                </ListItemButton>
                            </Link>
                        })
                    }


                    {createCategory &&
                        <div className={styles.categoryFormContainer}>
                            <ListItemButton
                                style={{ width: '100%', height: '100%' }}
                                selected={selectedIndex === 0} // index
                                onClick={(event) => handleListItemClick(event, 0)} //index
                            >
                                <form onSubmit={formSubmitHandler} className={styles.categoryForm}>
                                    <ListItemIcon>
                                        <Category className={classes.colorWhite} />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <TextField inputRef={categoryInputRef} variant="standard" color="primary" className={classes.textField} />
                                    </ListItemText>
                                    <Button className={classes.categoryFormSubmitBtn} type="submit" variant="outlined" color="primary" >Add</Button>
                                </form>
                            </ListItemButton>
                        </div>
                    }

                    <Link href="/completed">
                        <ListItemButton
                            selected={selectedIndex === categoriesData.length}
                            onClick={(event) => handleListItemClick(event, categoriesData.length)}
                        >
                            <ListItemIcon>
                                <AssignmentTurnedIn className={classes.colorWhite} />
                            </ListItemIcon>
                            <ListItemText style={{ color: '#fff' }} primary="Completed" />
                        </ListItemButton>
                    </Link>
                </List>
                <Divider />

                <Button style={{ position: 'absolute' }} className={styles.addCategoryBtn} color="primary" onClick={() => { setCreateCategory((prevState) => !prevState) }}>
                    <Add fontSize="large" className={classes.colorWhite} />
                </Button>
            </div>

        </main >
    )
}

export default Layout;


/*
<Link href="/">
    <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
    >
        <ListItemIcon>
            <ListAlt className={classes.colorWhite} />
        </ListItemIcon>
        <ListItemText style={{ color: '#fff' }} primary="Todo" />
</ListItemButton>
</Link>

**/