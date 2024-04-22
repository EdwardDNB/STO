import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import {Link} from 'react-router-dom';


export const Header = () => {
    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <Link to="/worked" style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }}><IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton></Link>

                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    <Link to="/news" style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        marginRight: '1rem'
                    }}>News</Link>
                    <Link to="/" style={{
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>Home</Link>
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    </Box>
}