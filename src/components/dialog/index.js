import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

const AlertDialog = ({ name, open, setOpen, deleteProduct }) => {


    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        deleteProduct();
        handleClose();
    }


    return (
       
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Delete the product ${name}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you confirm the product will be deleted and it will be imposible to recover it
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
          </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Confirm
          </Button>
                </DialogActions>
            </Dialog>
        
    );
}
export default AlertDialog;