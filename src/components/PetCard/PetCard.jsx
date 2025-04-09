import { Button, Grid2, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./PetCard.module.css"
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import EditModal from "../../admin/EditModal";


function PetCard ({ pet, needs }) {

    //state variables 
    const [needDescription, setNeedDescription] = useState(false);
    const [needPhotos, setNeedPhotos] = useState(false);
    const [needApproval, setNeedApproval] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    //handle open/close modal 
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    //return different needs for icon display based on passed param
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
        {/* edit modal parameters passed to open */}
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