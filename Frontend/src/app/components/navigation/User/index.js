'use client'
import { Avatar, Icon, IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react";
import Logout from '../../LogoutButton';
import { useRouter } from "next/navigation";

export default function User() {
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const redirectToProfile = () => {
        handleClose();
        router.push('/profile');
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <Avatar>
                </Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}

                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={redirectToProfile}>Ver Perfil</MenuItem>
                <Logout />
            </Menu>
        </>
    )
}