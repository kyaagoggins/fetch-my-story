import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid2, Fab, TextField, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Admin.module.css"
import LoopIcon from '@mui/icons-material/Loop';

function EditModal({ open, handleClose, title, pet, needDesc, needPhotos }) {

    const navigate = useNavigate();

    //sets url for sms message 
    const [smsUrl, setSmsUrl] = useState('');

    const [viewBioOpen, setViewBioOpen] = useState(false);
    //handle open/close modal 
    const handleOpenBio = () => setViewBioOpen(true);
    const handleCloseBio = () => setViewBioOpen(false);

    const [requestBioOpen, setRequestBioOpen] = useState(false);
    //handle open/close modal 
    const handleOpenReq = () => setRequestBioOpen(true);
    const handleCloseReq = () => setRequestBioOpen(false);


    const [viewPhotosOpen, setViewPhotosOpen] = useState(false);
    //handle open/close modal 
    const handleOpenPhotos = () => setViewPhotosOpen(true);
    const handleClosePhotos = () => setViewPhotosOpen(false);

    const [addPhotoOpen, setAddPhotoOpen] = useState(false);
    //handle open/close modal 
    const handleAddPhoto = () => setAddPhotoOpen(true);
    const handleCloseAddPhoto = () => setAddPhotoOpen(false);

    //function to decode the pet descriptions 
    function decodeAndFormatDescription(description) {
        //console.log(description);
        // Decode HTML entities
        const parser = new DOMParser();
        const decoded = parser.parseFromString(description, 'text/html').body.textContent;
      
        // Manually decode specific entities that DOMParser might miss
    const fullyDecoded = decoded.replace(/&amp;#39;/g, "'")
                                .replace(/&#39;/g, "'")
                                .replace(/&quot;/g, '"')
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                                .replace(/&amp;/g, '&')
                                .replace(/&nbsp;/g, ' ')
                                .replace(/&apos;/g, "'");

        // Replace \n with <br />
        const formatted = fullyDecoded.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ));
      
        return formatted;
      }

    //select options for phone types 
    const phoneTypes = [
        {
            value: ''
        },
        {
            value: "Android"
        },
        {
            value: "iPhone"
        }
    ];

    //view bio modal 
    const viewBioModal = (
        <>
        <Dialog open={viewBioOpen} onClose={handleCloseBio} className={styles.modal}>
        <DialogTitle>Description - {title}</DialogTitle>
            <DialogContent className={styles.modal}>
                <Grid2>
                    <Typography className={styles.editText}>{decodeAndFormatDescription(pet.description)}</Typography>
                </Grid2>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseBio}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    );

    //requested bool state 
    const [requested, setRequested] = useState(false);

    //function to handle checking input fields and requesting a bio
    function requestBio () {
        //get modal inputs
        let fosterNum = document.getElementById("fosterNum").value;
        let phoneNum = document.getElementById("phoneNum").value;
        let phoneType = document.getElementById("phoneType").value;

        //error handling if fields are not filled out
        if (fosterNum == "" || phoneNum == "" || phoneType == "") {
            let errorReq = document.getElementById("errorReq");
            errorReq.style.display="block";
            setTimeout(() => {
                errorReq.style.display="none";
            }, 3000);
        } else {
            //send request stuff to foster with that info 

            setRequested(true);
            if (phoneType === "Android") setSmsUrl(`sms:${phoneNum || ''}?body=${localStorage.getItem('textMessage')}`);
            if (phoneType === "iPhone") setSmsUrl(`sms:${phoneNum || ''}&body=${localStorage.getItem('textMessage')}`);
            
            
            setTimeout(() => {
                window.location.href = smsUrl;
            }, 3000)
        }
    }

    //request bio modal 
    const requestBioModal = (
        <>
        <Dialog open={requestBioOpen} onClose={handleCloseReq} className={styles.modal}>
        <DialogTitle>Request - {title}</DialogTitle>
            <DialogContent className={styles.modal}>
                <br></br>
                <Grid2>
                    <TextField id="fosterNum" label="Enter the foster's phone number" size="small" className={styles.textInput}></TextField>
                    <TextField id="phoneNum" label="Enter your phone number" size="small" className={styles.textInput}></TextField>
                    <TextField id="phoneType" select label="Select your phone type" size="small" className={styles.textInput}>
                        {phoneTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>
                        ))}

                    </TextField>
                    <br></br>
                    <Typography display="none" id="errorReq" className={styles.editText}>Please fill out all fields.</Typography>
                </Grid2>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseReq}>Close</Button>
                <Button variant="outlined" onClick={requestBio} endIcon={requested ? <LoopIcon /> : null}>Send Request</Button>
            </DialogActions>
        </Dialog>
        </>
    );

    //view photos modal 
    const viewPhotosModal = (
        <>
        <Dialog open={viewPhotosOpen} onClose={handleClosePhotos} className={styles.modal}>
        <DialogTitle>Photos - {title}</DialogTitle>
            <DialogContent className={styles.modal}>
                {pet.photos && pet.photos.length > 0 ? (
                    pet.photos.map((photo, index) => (
                    <Grid2 key={index} className={styles.imgContainer} margin={'10px 0px 10px 0px'}>
                    <img src={photo?.large} alt={pet.name} width='100%'/>
                    <br></br>
                    </Grid2>
                ))
                ) : (
                    <h3>No Photos Found</h3>
                )}
                
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClosePhotos}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    );

    const [reqAdd, setReqAdd] = useState(false);

        //request add photos modal 
        const addPhotoModal = (
            <>
            <Dialog open={addPhotoOpen} onClose={handleCloseAddPhoto} className={styles.modal}>
            <DialogTitle>Request Photos - {title}</DialogTitle>
                <DialogContent className={styles.modal}>
                    <br></br>
                    <Grid2>
                        <TextField id="fosterNumPhotos" label="Enter the foster's phone number" size="small" className={styles.textInput}></TextField>
                        <TextField id="phoneNumPhotos" label="Enter your phone number" size="small" className={styles.textInput}></TextField>
                        <TextField id="phoneTypePhotos" select label="Select your phone type" size="small" className={styles.textInput}>
                            {phoneTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>
                            ))}
    
                        </TextField>
                        <br></br>
                        <Typography display="none" id="errorAdd" className={styles.editText}>Please fill out all fields.</Typography>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleCloseAddPhoto}>Close</Button>
                    <Button variant="outlined" onClick={requestPhotos} endIcon={reqAdd ? <LoopIcon /> : null}>Send Request</Button>
                </DialogActions>
            </Dialog>
            </>
        );

        //function to handle checking input fields and requesting photos
        function requestPhotos () {
            //get modal inputs
            let fosterNum = document.getElementById("fosterNumPhotos").value;
            let phoneNum = document.getElementById("phoneNumPhotos").value;
            let phoneType = document.getElementById("phoneTypePhotos").value;
    
            //error handling if fields are not filled out
            if (fosterNum == "" || phoneNum == "" || phoneType == "") {
                let errorAdd = document.getElementById("errorAdd");
                errorAdd.style.display="block";
                setTimeout(() => {
                    errorAdd.style.display="none";
                }, 3000);
            } else {
                //send request stuff to foster with that info 
                setReqAdd(true);
                setTimeout(() => {handleCloseAddPhoto()}, 3000)
            }
        }


    return (
        <>
        {/* include modals for page */}
        {viewBioModal}
        {requestBioModal}
        {viewPhotosModal}
        {addPhotoModal}
        <Dialog open={open} onClose={handleClose} className={styles.modal}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className={styles.modalContent}>
            <Grid2 className={styles.imgContainer}>
                {pet.photos[0]?.large ? (
                    <img src={pet.photos[0]?.large || 'placeholder.jpg'} alt={pet.name} width='100%'/>
                ) : (
                    <h3>No Photos Found</h3>
                )}
                
            </Grid2>
            {/* need description view for modal - else is the view for not needing desc */}
            {needDesc ? (
                <Grid2 id="needsDescDiv">
                    <br></br>
                    <Typography className={styles.editText}>{pet.name} needs a new description.</Typography>
                    <br></br>
                    <Fab variant="extended" size="small" onClick={handleOpenBio} className={styles.editButtonsDuo}>View Current Bio</Fab>
                    <Fab variant="extended" size="small" onClick={handleOpenReq} className={styles.editButtonsDuo}>Request Bio</Fab>
                </Grid2>
            ) : (
                <Grid2 id="goodDescDiv">
                    <br></br>
                    <Typography className={styles.editText}>{pet.name} has a great description! Take a look!</Typography>
                    <br></br>
                    <Fab variant="extended" size="small" onClick={handleOpenBio} className={styles.bioButtonsSingle}>View Current Bio</Fab>
                </Grid2>
            )}
            {/* view for if pet doesnt needs photos - else view for not needing photos */}
            {needPhotos ? (
                <Grid2 id="needsPhotosDiv">
                <br></br>
                <Typography className={styles.editText}>{pet.name} needs new photos.</Typography>
                <br></br>
                <Fab variant="extended" size="small" onClick={handleOpenPhotos} className={styles.editButtonsDuo}>View Photos</Fab>
                <Fab variant="extended" size="small" onClick={handleAddPhoto} className={styles.editButtonsDuo}>Add Photos</Fab>
            </Grid2>
            ) : (
                <Grid2 id="goodPhotosDiv">
                    <br></br>
                    <Typography className={styles.editText}>{pet.name} has great pictures! Looking good!</Typography>
                    <br></br>
                    <Fab variant="extended" size="small" onClick={handleOpenPhotos} className={styles.photoButtonsSingle}>View Photos</Fab>
                </Grid2>
            )}
            <br></br>
            {needDesc || needPhotos ? (
                <Grid2 className={styles.editModalButtons} gap={3}>
                <br></br>
                {/* <Fab variant="extended" size="medium" onClick={handleClose} className={styles.publishButton}>Publish</Fab> */}
                <Fab variant="extended" size="medium" onClick={handleOpenReq} className={styles.rejectButton}>Reject</Fab>
            </Grid2>
            ) : (<br></br>)}
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