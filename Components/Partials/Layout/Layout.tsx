import { useState } from 'react';
import { Menu, Person, AssignmentTurnedIn, Delete } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import styles from '../../../styles/Layout.module.css';
import { makeStyles } from '@mui/styles';
import Link from 'next/link'



const Layout = (props) => {

    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <main className="app">
            <nav className="nav">
                <Menu
                    fontSize="large"
                    sx={{ fontSize: 50, color: '#fff' }}
                    onClick={() => { setDrawerVisibility(drawer => !drawer) }}
                />
            </nav>
            <div className={styles.todoContainer}>
                {props.children}
            </div>

            <div className={`drawer ${drawerVisibility ? 'drawerActive' : ''}`}>
                <List className="drawerInnerContainer" component="nav">
                    <Link href="/">
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <Person sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <ListItemText style={{ color: '#fff' }} primary="Personal" />
                        </ListItemButton>
                    </Link>
                    <Link href="/completed">
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <AssignmentTurnedIn sx={{ color: '#fff' }} />
                            </ListItemIcon>
                            <ListItemText style={{ color: '#fff' }} primary="Completed" />
                        </ListItemButton>
                    </Link>
                </List>
                <Divider />
                <List className="drawerInnerContainer" component="nav">
                    <Link href="trash">
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemIcon>
                                <Delete sx={{ color: '#fff' }} />
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