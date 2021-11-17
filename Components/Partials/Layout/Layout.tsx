import React, { useState } from 'react';
import styles from '../../../styles/Layout.module.css';
import { Menu, Person, AssignmentTurnedIn, Delete, ListAlt, CloseRounded } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link'
import { Transition as ReactTransition } from 'react-transition-group';
import { useRouter } from 'next/dist/client/router';

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
    }
})

const Layout: React.FC<{ props: Object }> = (props) => {
    const classes = useStyles();
    const { pathname } = useRouter();
    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(pathname === '/' ? 0 : 1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };



    return (
        <main className="app">
            <nav className={styles.nav}>

                <ReactTransition in={drawerVisibility} timeout={300} mountOnEnter unmountOnExit>
                    {state => (
                        <CloseRounded
                            style={{
                                transition: 'all .3s',
                                opacity: state === 'exiting' ? .1 : 1,
                                // transform: state === 'exiting' ? 'rotate(90deg)' : 'rotate(0)'
                            }}
                            className={classes.navIcon}
                            onClick={() => { setDrawerVisibility(drawer => !drawer) }}
                        />
                    )}
                </ReactTransition>

                <ReactTransition in={!drawerVisibility} timeout={300} mountOnEnter unmountOnExit>
                    {state => (
                        <Menu
                            style={{
                                transition: 'all .3s',
                                opacity: state === 'exiting' ? .1 : 1,
                                // transform: state === 'exiting' ? 'rotate(45deg)' : 'rotate(0)'
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
                    <Link href="/completed">
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <AssignmentTurnedIn className={classes.colorWhite} />
                            </ListItemIcon>
                            <ListItemText style={{ color: '#fff' }} primary="Completed" />
                        </ListItemButton>
                    </Link>
                </List>
                <Divider />
                <List className={styles.drawerInnerContainer} component="nav">
                    <Link href="trash">
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemIcon>
                                <Delete className={classes.colorWhite} />
                            </ListItemIcon>
                            <ListItemText style={{ color: '#fff' }} primary="Trash" />
                        </ListItemButton>
                    </Link>
                </List>
            </div>

        </main>
    )
}

export default Layout;