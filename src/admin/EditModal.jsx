import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid2, Fab } from "@mui/material";
import React from "react";
import styles from "./Admin.module.css"

function EditModal({ open, handleClose, title, pet, needDesc, needPhotos }) {
    return (
        <>
        <Dialog open={open} onClose={handleClose} className={styles.modal}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className={styles.modalContent}>
            <Grid2 className={styles.imgContainer}>
                <img src={pet.photos[0]?.large || 'placeholder.jpg'} alt={pet.name} width='100%'/>
            </Grid2>
            {needDesc ? (
                <Grid2 id="needsDescDiv">
                    <br></br>
                    <Typography className={styles.editText}>{pet.name} needs a new description.</Typography>
                    <br></br>
                    <Fab variant="extended" size="small" onClick={handleClose} className={styles.editButtonsDuo}>View Current Bio</Fab>
                    <Fab variant="extended" size="small" onClick={handleClose} className={styles.editButtonsDuo}>Request Bio</Fab>
                </Grid2>
            ) : (
                <Grid2 id="goodDescDiv">
                    <br></br>
                    <Typography className={styles.editText}>{pet.name} has a great description! Take a look!</Typography>
                    <br></br>
                    <Fab variant="extended" size="small" onClick={handleClose} className={styles.editButtonsSingle}>View Current Bio</Fab>
                </Grid2>
            )}
            {needPhotos ? (
                <Grid2 id="needsPhotosDiv">
                <br></br>
                <Typography className={styles.editText}>{pet.name} needs new photos.</Typography>
                <br></br>
                <Fab variant="extended" size="small" onClick={handleClose} className={styles.editButtonsDuo}>View Photos</Fab>
                <Fab variant="extended" size="small" onClick={handleClose} className={styles.editButtonsDuo}>Add Photos</Fab>
            </Grid2>
            ) : (
                <Grid2 id="goodPhotosDiv">
                    <br></br>
                    <Typography className={styles.editText}>{pet.name} has great pictures! Looking good!</Typography>
                    <br></br>
                    <Fab variant="extended" size="small" onClick={handleClose} className={styles.editButtonsSingle}>View Photos</Fab>
                </Grid2>
            )}
            <br></br>
            <Grid2 className={styles.editModalButtons} gap={3}>
                    <br></br>
                    <Fab variant="extended" size="medium" onClick={handleClose} className={styles.publishButton}>Publish</Fab>
                    <Fab variant="extended" size="medium" onClick={handleClose} className={styles.rejectButton}>Reject</Fab>
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