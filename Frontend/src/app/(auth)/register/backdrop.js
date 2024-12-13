import { Backdrop } from "@mui/material";

export default function BackdropRegister({ handleClose, open }) {
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
            </Backdrop>
        </>
    );
}
