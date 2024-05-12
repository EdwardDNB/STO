import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import {Link} from 'react-router-dom';
import {Navbar} from "./Navbar";
import {AuthButton} from "./AuthButton";


export const Header = () => {
    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                    <Navbar/>
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
                <AuthButton />
            </Toolbar>
        </AppBar>
    </Box>
}

