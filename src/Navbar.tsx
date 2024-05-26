import React, {useState} from 'react';
import {styled} from '@mui/system';
import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ConstructionIcon from '@mui/icons-material/Construction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import {useAppSelector} from "./state/store";



const DrawerContainer = styled('div')({
    width: 250,
});

export const Navbar = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const userRole = useAppSelector(state => state.auth.user?.role);
    const [drawerOpen, setDrawerOpen] = useState(false);
    if (!isAuthenticated) {
        return <></>;
    }
    const text = userRole === 'manager' ? 'Customers' : 'Profile';
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
                onClick={toggleDrawer}>
                <MenuIcon/>
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <DrawerContainer>
                    <IconButton onClick={toggleDrawer}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <List>{userRole !== 'customer' && <ListItem component={Link} to="/worked">
                        <ListItemIcon><ConstructionIcon/></ListItemIcon>
                        <ListItemText primary="Today Works"/>
                    </ListItem>}
                        {userRole === 'manager' && <ListItem component={Link} to="/phone-orders">
                            <ListItemIcon><PhoneIcon/></ListItemIcon>
                            <ListItemText primary="Phone Orders"/>
                        </ListItem>}
                        <ListItem component={Link} to="/orders">
                            <ListItemIcon><DescriptionIcon/></ListItemIcon>
                            <ListItemText primary="Orders"/>
                        </ListItem>
                        <ListItem component={Link} to="/invoices">
                            <ListItemIcon><AssignmentIcon/></ListItemIcon>
                            <ListItemText primary="Invoices"/>
                        </ListItem>
                        <ListItem component={Link} to="/customer">
                            <ListItemIcon><PersonIcon/></ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>

                    </List>
                </DrawerContainer>
            </Drawer>
        </div>
    );
};


