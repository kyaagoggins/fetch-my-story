import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid2 } from "@mui/material";
import React from "react";
import styles from "./Admin.module.css"

function EditModal({ open, handleClose, title, pet }) {
    return (
        <>
        <Dialog open={open} onClose={handleClose} className={styles.modal}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className={styles.modalContent}>
            <Grid2 className={styles.imgContainer}>
                <img src={pet.photos[0]?.large || 'placeholder.jpg'} alt={pet.name} width='100%'/>
                <Typography>{pet.name}</Typography>
            </Grid2>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Close</Button>
                <Button variant="outlined" onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default EditModal;