import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AuthButton } from "./AuthButton";

export const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#1f1f1f",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
                }}
            >
                <Toolbar>

                    {/* Ліве меню (не чіпаємо логіку) */}
                    <Navbar />

                    {/* Центральна частина */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: "1.5rem"
                        }}
                    >
                        <Link
                            to="/news"
                            style={{
                                color: "inherit",
                                textDecoration: "none"
                            }}
                        >
                            News
                        </Link>

                        <Link
                            to="/"
                            style={{
                                color: "inherit",
                                textDecoration: "none"
                            }}
                        >
                            Home
                        </Link>
                    </Typography>

                    {/* Права частина — кнопка логіну */}
                    <AuthButton />

                </Toolbar>
            </AppBar>
        </Box>
    );
};
