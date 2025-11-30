import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ConstructionIcon from '@mui/icons-material/Construction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import { useAppSelector } from "./state/store";


const GlassDrawer = styled(Drawer)(() => ({
    '& .MuiPaper-root': {
        background: 'rgba(20, 20, 20, 0.55)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.2)',
        width: 260,
        color: '#fff',
    }
}));

const StyledListItem = styled(ListItem)(() => ({
    color: '#fff',
    transition: '0.25s',
    borderRadius: 8,
    margin: '4px 8px',

    '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)',
        transform: 'translateX(4px)',
    }
}));

export const Navbar = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const userRole = useAppSelector(state => state.auth.user?.role);

    const [drawerOpen, setDrawerOpen] = useState(false);

    if (!isAuthenticated) return null;

    const text = userRole === 'manager' ? 'Customers' : 'Profile';

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>

            <GlassDrawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>

                <IconButton onClick={toggleDrawer(false)} sx={{ color: '#fff', ml: 1, mt: 1 }}>
                    <ArrowBackIcon />
                </IconButton>

                <List>

                    {userRole !== 'customer' && (
                        <StyledListItem>
                            <ListItemButton
                                component={Link}
                                to="/worked"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemIcon sx={{ color: '#ff4d4d' }}>
                                    <ConstructionIcon />
                                </ListItemIcon>
                                <ListItemText primary="Today Works" />
                            </ListItemButton>
                        </StyledListItem>
                    )}

                    {userRole === 'manager' && (
                        <StyledListItem>
                            <ListItemButton
                                component={Link}
                                to="/phone-orders"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemIcon sx={{ color: '#00eaff' }}>
                                    <PhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Phone Orders" />
                            </ListItemButton>
                        </StyledListItem>
                    )}

                    <StyledListItem>
                        <ListItemButton
                            component={Link}
                            to="/orders"
                            onClick={toggleDrawer(false)}
                        >
                            <ListItemIcon sx={{ color: '#ffcc00' }}>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Orders" />
                        </ListItemButton>
                    </StyledListItem>

                    <StyledListItem>
                        <ListItemButton
                            component={Link}
                            to="/invoices"
                            onClick={toggleDrawer(false)}
                        >
                            <ListItemIcon sx={{ color: '#00ff88' }}>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Invoices" />
                        </ListItemButton>
                    </StyledListItem>

                    <StyledListItem>
                        <ListItemButton
                            component={Link}
                            to="/customer"
                            onClick={toggleDrawer(false)}
                        >
                            <ListItemIcon sx={{ color: '#fff' }}>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </StyledListItem>

                </List>
            </GlassDrawer>
        </div>
    );
};
