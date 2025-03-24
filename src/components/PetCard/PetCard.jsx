import { Button, Grid2 } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./PetCard.module.css"
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import EditModal from "../../admin/EditModal";


function PetCard ({ pet, needs }) {

    const [needDescription, setNeedDescription] = useState(false);
    const [needApproval, setNeedApproval] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    useEffect(() => {
        switch(needs) {
            case 'description': 
                setNeedDescription(true);
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
        <Grid2 size={4} className={styles.petCard}>
            { needDescription && (
                <span id='badge' className={styles.badge} onClick={handleOpenEdit}><EditIcon /></span>
            )}
            { needApproval && (
                <span id='badge' className={styles.badge} onClick={handleOpenEdit}><DoneOutlineIcon /></span>
            )}
            <Grid2 className={styles.imgContainer}>
                <img src={pet.photos[0]?.large || 'placeholder.jpg'} alt={pet.name} width='100%'/>
            </Grid2>
            <div><p>{pet.name}</p></div>
        </Grid2>
        <EditModal 
            open={openEdit}
            handleClose={handleCloseEdit}
            title={pet.name}
            pet={pet}
            needDesc={needDescription}
            needPhotos={false}
        />  

    </>
    );
}

export default PetCard;