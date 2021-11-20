import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';
import styles from '../../../styles/Layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sendCategory, deleteCategory } from '../../../store/reducers/todoReducer';
import { CSSTransition } from 'react-transition-group';

import { Menu, AssignmentTurnedIn, Delete, ListAlt, CloseRounded, Add, Category } from '@mui/icons-material';
import { List, makeStyles, ListItemText, ListItemIcon, Divider, Typography, Button, TextField, ClickAwayListener } from '@material-ui/core';
import { ListItemButton } from '@mui/material';
import { Transition as ReactTransition } from 'react-transition-group';
import { todoActions } from '../../../store/actions/todoActions';
import { TodoType } from '../../../store/types/types';


const useStyles = makeStyles({
    navIcon: {
        cursor: 'pointer',
        color: '#fff',
        fontSize: 50,
        position: 'absolute',
        left: '0%'
    },
    drawerInnerContainer: {
        paddingLeft: 5
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
    },
    moreOptionBtn: {
        position: 'absolute',
        right: '0%',
        minWidth: 'max-content',
        padding: 3,
        marginRight: 10
    },
    deleteCategoryName: {
        textTransform: 'capitalize',
        color: 'transparent',
        backgroundImage: 'linear-gradient(to top right,#CD69DA, #FDA3A4)',
        backgroundClip: 'text',
        fontWeight: 'bold'
    },
    confirmationBtn: {
        margin: 10
    },
    addCategoryHeading: {
        fontSize: '1.1rem'
    },
    addMoreCategoryBtn: {
        '& > span': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end'
        }
    }

})

const Layout: React.FC<{ props: Object }> = (props) => {
    const dispatch = useDispatch();
    const categoriesData = useSelector((state: { categories: string[] }) => state.categories);
    const classes = useStyles();
    const pathname = useRouter().asPath;
    const router = useRouter();
    const categoryInputRef = useRef<HTMLInputElement>();

    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const [createCategory, setCreateCategory] = useState(false);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteCategoryName, setDeleteCategoryName] = useState('');

    const [selectedIndex, setSelectedIndex] = useState(pathname === '/' ? 0 : 1);


    useEffect(() => {
        const currentPath: string = pathname.replace('/', '');
        const currentIndex = pathname !== '/[category]' && pathname === '/' ? categoriesData.indexOf('todos') : pathname === '/completed' ? categoriesData.length : categoriesData.indexOf(currentPath)
        setSelectedIndex(currentIndex);

    }, [categoriesData, pathname])

    const handleListItemClick = (event: React.MouseEvent, index: number) => {
        setSelectedIndex(index);
    };

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        
        const categoryTitle: string | undefined = categoryInputRef.current?.value.toLocaleLowerCase();
        const todo: TodoType = {
            id: 0,
            todo: 'What\'s your plan for today!',
            isComplete: false,
            category: categoryTitle ? categoryTitle : ''
        }
        if (categoryTitle?.trim().length === 0) {
            categoryInputRef.current?.focus();
            return;
        }
        setCreateCategory(false);
        dispatch(todoActions.addCategory(categoryTitle ? categoryTitle : ''))
        dispatch(sendCategory(categoryTitle ? categoryTitle : ''));

        dispatch(todoActions.addTodo(todo));
    }

    const showDeleteConfirmationHandler = (category: string) => {
        setDeleteCategoryName(category);
        setShowDeleteConfirmation(true);
    }

    const addCategoryHandler = () => {
        setCreateCategory((prevState) => !prevState);
        setSelectedIndex(categoriesData.length);
    }

    const deleteCategoryHandler = () => {
        console.log(deleteCategoryName);
        dispatch(deleteCategory(deleteCategoryName));
        dispatch(todoActions.removeCategory(deleteCategoryName));
        setShowDeleteConfirmation(false);
        router.replace('/');
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
                        : pathname !== '/[category]' && <React.Fragment>{pathname.replace('/', '')}<span>Todos</span></React.Fragment>}
                </Typography>

            </nav>
            <div className={styles.todoContainer}>
                {props.children}
            </div>

            <CSSTransition ref={() => { React.createRef() }} in={drawerVisibility} mountOnEnter unmountOnExit timeout={300} classNames={styles.drawer}>
                <ClickAwayListener onClickAway={() => { setDrawerVisibility(false) }} >
                    <div className={`${styles.drawer} ${drawerVisibility ? styles.drawerActive : ''}`}>

                        <List className={`${styles.drawerInnerContainer} ${classes.drawerInnerContainer}`} component="nav">

                            {
                                categoriesData.map((category, i) => {

                                    return <div key={category} className={styles.categoryContainer}>
                                        <Link href={`${category === 'todos' ? '/' : `/${category}`}`}>
                                            <ListItemButton
                                                style={{ height: '100%' }}
                                                selected={selectedIndex === i}
                                                onClick={(event) => handleListItemClick(event, i)}
                                            >
                                                <ListItemIcon>
                                                    {category === 'todos' ? <ListAlt className={classes.colorWhite} /> : <Category className={classes.colorWhite} />}
                                                </ListItemIcon>
                                                <ListItemText className={classes.listItemText} style={{ color: '#fff' }} primary={category} />
                                            </ListItemButton>
                                        </Link>
                                        <Button onClick={() => { showDeleteConfirmationHandler(category) }} className={classes.moreOptionBtn} disableElevation >
                                            <Delete sx={{ color: '#eee' }} />
                                        </Button>
                                    </div>
                                })
                            }


                            {createCategory &&
                                <ClickAwayListener onClickAway={()=> {setCreateCategory(false)}}>
                                    <div className={styles.categoryFormContainer}>
                                        <ListItemButton
                                            style={{ width: '100%', height: '100%', cursor: 'auto' }}
                                            selected={selectedIndex === categoriesData.length} // index
                                            onClick={(event) => handleListItemClick(event, categoriesData.length)} //index
                                        >
                                            <form onSubmit={formSubmitHandler} className={styles.categoryForm}>
                                                <span className={styles.categoryFormInnerContainer}>
                                                    <ListItemIcon>
                                                        <Category className={classes.colorWhite} />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        <TextField inputRef={categoryInputRef} autoFocus variant="standard" color="primary" className={classes.textField} />
                                                    </ListItemText>
                                                </span>
                                                <span className={styles.categoryFormSubmitBtnContainer}>
                                                    <Button className={classes.categoryFormSubmitBtn} type="submit" variant="outlined" color="primary" >Add</Button>
                                                    <Button onClick={() => { setCreateCategory(false) }} className={classes.categoryFormSubmitBtn} variant="outlined" color="primary" >Cancel</Button>
                                                </span>
                                            </form>
                                        </ListItemButton>
                                    </div>
                                </ClickAwayListener>
                            }

                            <Link href="/completed">
                                <ListItemButton
                                    selected={selectedIndex === categoriesData.length + 1}
                                    onClick={(event) => handleListItemClick(event, categoriesData.length + 1)}
                                >
                                    <ListItemIcon>
                                        <AssignmentTurnedIn className={classes.colorWhite} />
                                    </ListItemIcon>
                                    <ListItemText style={{ color: '#fff' }} primary="Completed" />
                                </ListItemButton>
                            </Link>
                        </List>
                        <Divider />

                        <Button style={{ position: 'absolute' }} className={`${styles.addCategoryBtn} ${classes.addMoreCategoryBtn}`} color="primary" onClick={addCategoryHandler}>
                            <Typography noWrap className={classes.addCategoryHeading} variant="h6">Add More Categories</Typography>
                            <Add fontSize="large" className={classes.colorWhite} />
                        </Button>


                        {/* deleteCategory confirmation */}

                        {showDeleteConfirmation &&
                            <div className={styles.deleteCategoryConfirmationContainer}>
                                <ClickAwayListener onClickAway={() => { setShowDeleteConfirmation(false) }}>
                                    <div className={styles.deleteCategoryConfirmationInnerContainer}>
                                        <Typography variant="h6" color="primary" >Are you sure you want to delete <span className={classes.deleteCategoryName}>{deleteCategoryName}</span> category!</Typography>
                                        <Button className={classes.confirmationBtn} onClick={deleteCategoryHandler} variant="outlined" color="primary">Yes</Button>
                                        <Button className={classes.confirmationBtn} onClick={() => { setShowDeleteConfirmation(false) }} variant="outlined" color="primary" >Cancel</Button>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        }

                    </div>
                </ClickAwayListener>
            </CSSTransition>

        </main >
    )
}

export default Layout;
