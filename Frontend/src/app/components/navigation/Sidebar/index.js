import { Box, Divider, Drawer, IconButton, ListItemButton, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from "next/link";
import SellIcon from '@mui/icons-material/Sell';
import { useRouter } from 'next/navigation'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ReportingListItem from './ReportingListItem'

export default function Sidebar({ open, handleDrawerState }) {
    const drawerWidth = "200px";
    const router = useRouter();
    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                boxSizing: 'border-box', '.MuiPaper-root': { marginTop: '64px', width: `calc(${open ? drawerWidth : "60px"})` },
                flexShrink: '0', whiteSpace: 'nowrap', overflowX: 'hidden',
                transition: 'width 0.2s ease-in-out', position: 'relative',
            }}
        >
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                padding: '0.5rem'
            }}>
                <IconButton onClick={handleDrawerState}>
                    {open && <ChevronLeftIcon />}
                </IconButton>
            </Box>
            <Divider />

            {open && <Typography sx={{ margin: '0.2rem' }}>Administracion y Analisis</Typography>}
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                //Use the onClick to navigate to the page
                //onClick={() => { router.push('/sales') }}
                >

                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <SellIcon />
                    </ListItemIcon>

                    <ListItemText sx={{ opacity: open ? 1 : 0 }} >Ventas</ListItemText>
                </ListItemButton>
            </ListItem>

            <Divider />
            
            <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        //Use the onClick to navigate to the page
                        onClick={() => { router.push('/support') }}
                    >

                        <ListItemIcon
                            text
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <SupportAgentOutlinedIcon />
                        </ListItemIcon>

                        <ListItemText sx={{ opacity: open ? 1 : 0 }} >Soporte al cliente</ListItemText>
                    </ListItemButton>
            </ListItem>
            <ReportingListItem open={open}/>
            <Divider />
        </Drawer>
    );
}