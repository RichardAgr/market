import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";

export default function AlertDialogDelete({handleClose, handleConfirm, text, openDialog}) {
    return (
        <>
            <Dialog
                open={openDialog}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    Eliminar cuenta
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>Sí</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
