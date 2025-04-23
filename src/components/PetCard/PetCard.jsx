import { Grid2 } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./PetCard.module.css"
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import EditModal from "../../admin/EditModal";

/*
Pet Card Component
This is the view of the pet within the admin homepage display.
Each pet shown has a petCard component corresponding that displays either a photo, or a message, with notification bubbles when applicable
*/
function PetCard ({ pet, needs }) {

    //state variables for states being passed from the parent 
    //needs correspond to the pet needing description, approval, or photos
    //the development team has the option to add additional needs categories 
    const [needDescription, setNeedDescription] = useState(false);
    const [needPhotos, setNeedPhotos] = useState(false);
    const [needApproval, setNeedApproval] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    //handle open/close edit modal 
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    //return different needs for icon display based on passed parameters 
    useEffect(() => {
        switch(needs) {
            case 'attention': 
                if (pet.needsDesc) setNeedDescription(true);
                if (pet.needsPhotos) setNeedPhotos(true);
            break;
            case 'approval': 
                setNeedApproval(true);
            break;
            case 'nothing': 
            default:
                
            break;
        }
    })

    /* Pet Card Component HTML View 
    The above code is all functions and modals corresponding to the pet card 
    The below code is all of the views possible for the pet card 
    */
    return (
    <>
        {/* pet card div - clickable to open the edit modal  */}
        <Grid2 size={4} className={styles.petCard} id="petCard" role='button' onClick={handleOpenEdit}>
            {/* show icons based on props being passed from the admin page  */}
            { (needDescription || needPhotos) && (
                <span id='badge' className={styles.badge}><EditIcon /></span>
            )}
            { needApproval && (
                <span id='badge' className={styles.badge}><DoneOutlineIcon /></span>
            )}
            <Grid2 className={styles.imgContainer}>
                {pet.photos[0]?.large ? (
                   <img src={pet.photos[0]?.large} alt={pet.name} width='100%'/> 
                ) : (
                    <h3>No Photos Available</h3>
                )}
                
            </Grid2>
            <div><p>{pet.name}</p></div>
        </Grid2>
        {/* edit modal parameters passed to open specific pet info */}
        <EditModal 
            open={openEdit}
            handleClose={handleCloseEdit}
            title={pet.name}
            pet={pet}
            needDesc={needDescription}
            needPhotos={needPhotos}
        />  
    </>
    );
}

export default PetCard;