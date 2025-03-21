import { Button, Grid2 } from "@mui/material";
import React from "react";
import styles from "./PetCard.module.css"


function PetCard ({ pet }) {
    return (
        <Grid2 item size={4} className={styles.petCard}>
            <Grid2 item className={styles.imgContainer}>
                <img src={pet.photos[0]?.large || 'placeholder.jpg'} alt={pet.name} width='100%'/>
            </Grid2>
            <p>{pet.name}</p>
            <Button onClick={() => console.log(`Generate for ${pet.id}`)}>Generate New Bio</Button>
            <Button onClick={() => console.log(`Request for ${pet.id}`)}>Request Bio</Button>
        </Grid2>
    );
}

export default PetCard;