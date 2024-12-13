'use client'
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Cart from "../Cart";
import User from "../User";
import Sidebar from "../Sidebar";

export default function Navbar() {
    const [open, setOpen] = useState(true);

    const handleDrawerClose= () => {
        setOpen(false);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    return (
        <Box name="NavBar" sx={{ display: 'flex'}}>
            <AppBar position="fixed">
                <Toolbar sx={{backgroundColor:"#16193B"}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ color: '#FFF',  fontFamily:'Skeina', fontSize: '40px', fontWeight: 500}}>UrbanMarket</Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Cart />
                        <User />
                    </Box>
                </Toolbar>
            </AppBar>
            <Sidebar open={open} handleDrawerState={handleDrawerClose}>

            </Sidebar>
        </Box>
    );
}