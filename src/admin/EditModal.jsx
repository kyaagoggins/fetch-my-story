import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid2, Fab, TextField, MenuItem } from "@mui/material";
import React, { useState} from "react";
import styles from "./Admin.module.css"
import LoopIcon from '@mui/icons-material/Loop';

/*
Edit Modal Component is the Modal for when a pet is clicked on in the admin home area. The Edit modal displays information 
that is specific to the individual pet that was selected, hence the need to pass the pet state from the admin home 
*/
function EditModal({ open, handleClose, title, pet, needDesc, needPhotos }) {

    //sets url for sms messaging
    const [smsUrl, setSmsUrl] = useState('');
    const [petUrl, setPetUrl] = useState('');

    //states for the view bio modal to handle closing and opening
    const [viewBioOpen, setViewBioOpen] = useState(false);
    //handle open/close modal 
    const handleOpenBio = () => setViewBioOpen(true);
    const handleCloseBio = () => setViewBioOpen(false);

    //states for the request bio modal to handle closing and opening
    const [requestBioOpen, setRequestBioOpen] = useState(false);
    //handle open/close modal 
    const handleOpenReq = () => setRequestBioOpen(true);
    const handleCloseReq = () => setRequestBioOpen(false);

    //states for the view photos modal to handle closing and opening
    const [viewPhotosOpen, setViewPhotosOpen] = useState(false);
    //handle open/close modal 
    const handleOpenPhotos = () => setViewPhotosOpen(true);
    const handleClosePhotos = () => setViewPhotosOpen(false);

    //states for the add photos modal to handle closing and opening
    const [addPhotoOpen, setAddPhotoOpen] = useState(false);
    //handle open/close modal 
    const handleAddPhoto = () => setAddPhotoOpen(true);
    const handleCloseAddPhoto = () => setAddPhotoOpen(false);

    /*function to decode the pet descriptions
    This function gets the pet descriptions, and replaces the text where there is any parsed characters
    and replaces it for the correct character. Such as /&quot;/ meaning "" (quotation marks)
     */
    function decodeAndFormatDescription(description) {
        // Decode HTML entities tool
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
      //return the now properly formatted description 
        return formatted;
      }

    /* View Bio Modal
    This is the modal that gets displayed when 'View Current Bio' button is selected. 
    This modal displays the encoded description of the specific pet as it is gathered from the api
    This modal includes the pets name as well as the description
    **/
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

    //requested bool state to keep track if request submit has been selected
    //This can be useful for a dev team to use to do specific things when the request submit is selected
    const [requested, setRequested] = useState(false);

    //function to handle checking input fields and requesting a bio
    /* Request Bio Function
    This function has no parameters passed and is triggered by the send request button in the request bio modal
    This function expects input from the user and will retrieve the link to the bio form for this specific pet id 
    **/
    function requestBio () {
        //get modal inputs
        let fosterNum = document.getElementById("fosterNum").value;
        let phoneNum = document.getElementById("phoneNum").value;

        //error handling if fields are not filled out
        if (fosterNum == "" || phoneNum == "" || phoneType == "") {
            let errorReq = document.getElementById("errorReq");
            errorReq.style.display="block";
            setTimeout(() => {
                errorReq.style.display="none";
            }, 3000);
        } else {
            //send request to foster with that info 

            /*create link for foster sms with this pets info
            This gathers what the current pet is and sets the global variable in react for the current pet key */
            const petKey = `pet-${pet.id}`;
            localStorage.setItem(petKey, JSON.stringify(pet));

            //creates the link to the bio form for the specific pet id
            const link = `${window.location.origin}/foster-sms?petId=${pet.id}`;
            /*This link is for testing purposes, as there is no way to test the mobile handling
            while this version is hosted on the server. 
            const link = `http://localhost:5175/foster-sms?petId=${pet.id}`; */
 
            /* sets the pet url as the link created 
            for testing purposes, while still hosted on the server, the link was logged in the console 
            to redirect to 
            */
            setPetUrl(link); 
            //console.log(link);

            /*sets requested to true
            Sets the sms url, which is the entirety of the sms message to toggle the text application
            This smsUrl includes the phone number, the text message, and the url to the pet bio form 
            Because there is no way to test the messaging code due to this being hosted on a server, for the remainder of this code
            reference the cloud version, as it is tested and inherently working end to end on that version
            */
            setRequested(true);
            setSmsUrl(`sms:${phoneNum || ''}?body=${localStorage.getItem('textMessage') + " " + petUrl}`);
            
        }
    }

    /* Request Bio Modal
    This is the modal that gets displayed when 'Request Bio' button is selected. 
    This modal displays inputs for the user to complete to gather the information required to send the message to the user 
    This modal includes the pets name, as well as an error display that is hidden, and shown if the user selects submit while
    an input field is empty 
    **/
    const requestBioModal = (
        <>
        <Dialog open={requestBioOpen} onClose={handleCloseReq} className={styles.modal}>
        <DialogTitle>Request - {title}</DialogTitle>
            <DialogContent className={styles.modal}>
                <br></br>
                <Grid2>
                    <TextField id="fosterNum" label="Enter the foster's phone number" size="small" className={styles.textInput}></TextField>
                    <TextField id="phoneNum" label="Enter your phone number" size="small" className={styles.textInput}></TextField>
                    <br></br>
                    {/* Error that is hidden and will be shown based on the input fields  */}
                    <Typography display="none" id="errorReq" className={styles.editText}>Please fill out all fields.</Typography>
                </Grid2>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseReq}>Close</Button>
                {/* Requested bool also allows for there to be a spinning wheel if the send request is appropriately selected  */}
                <Button variant="outlined" onClick={requestBio} endIcon={requested ? <LoopIcon /> : null}>Send Request</Button>
            </DialogActions>
        </Dialog>
        </>
    );

    /* View Photos Modal
    This is the modal that gets displayed when 'View Photos' button is selected. 
    This modal displays the pets name and the photos associated with that pet 
    If there are multiple photos for this pet, the user is able to scroll through these images 
    If not pets are found, the modal will display a message stating this 
    **/
    const viewPhotosModal = (
        <>
        <Dialog open={viewPhotosOpen} onClose={handleClosePhotos} className={styles.modal}>
        <DialogTitle>Photos - {title}</DialogTitle>
            <DialogContent className={styles.modal}>
                {/* Map function to display each photo that the pet has in the api */}
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

    //bool to tell if photos were requested to allow for the loop icon
    const [reqAdd, setReqAdd] = useState(false);

        /* Add Photos Modal
        This is the modal that gets displayed when 'Add Photos' is selected. 
        This modal displays the pets name, as well as an error display that is hidden and shown if the user selects submit while an input
        field is empty. 
        When the fields are filled out and send request is selected, it calls request bio and has the same workflow as the bio request.
        This is a placeholder for the shelter's dev team to choose what specifically works for their case as far as photos, as we were 
        informed not to dive too deep into the photo portion. Due to this, the form has a question about when they'd like their photos 
        to be scheduled, which will be filled out in the bio generated form 
        */
        const addPhotoModal = (
            <>
            <Dialog open={addPhotoOpen} onClose={handleCloseAddPhoto} className={styles.modal}>
            <DialogTitle>Request Photos - {title}</DialogTitle>
                <DialogContent className={styles.modal}>
                    <br></br>
                    <Grid2>
                        <TextField id="fosterNumPhotos" label="Enter the foster's phone number" size="small" className={styles.textInput}></TextField>
                        <TextField id="phoneNumPhotos" label="Enter your phone number" size="small" className={styles.textInput}></TextField>
                        <br></br>
                        {/* Error handling if the inputs are empty   */}
                        <Typography display="none" id="errorAdd" className={styles.editText}>Please fill out all fields.</Typography>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleCloseAddPhoto}>Close</Button>
                    {/* currently references request bio and sends to the user  */}
                    <Button variant="outlined" onClick={requestBio} endIcon={reqAdd ? <LoopIcon /> : null}>Send Request</Button>
                </DialogActions>
            </Dialog>
            </>
        );

    /* Edit Modal Component HTML View 
    The above code is all functions and modals corresponding to the edit modal 
    The below code is all of the views possible for the edit modal 
    */
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
                {/* display the pets photos if they are present, if not display no photos  */}
                {pet.photos[0]?.large ? (
                    <img src={pet.photos[0]?.large || 'placeholder.jpg'} alt={pet.name} width='100%'/>
                ) : (
                    <h3>No Photos Found</h3>
                )}
                
            </Grid2>
            {/* If the pet has the need description flag, this is the display that will show
                the else condition is the display if the pet already has a description and is not flagged
            */}
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
            {/* If the pet has the needs photos flag, this is the display that will show
                the else condition is the display if the pet currently has photos and is not flagged 
            */}
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
            {/* if both buttons are present, here is additional styling applied  */}
            {needDesc || needPhotos ? (
                <Grid2 className={styles.editModalButtons} gap={3}>
                <br></br>
                {/* Area to put buttons for potential rejection and publishing  */}
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