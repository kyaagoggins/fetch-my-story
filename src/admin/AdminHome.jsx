import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Grid2, IconButton, Fab, Badge } from "@mui/material";
import PetCard from "../components/PetCard/PetCard";
import styles from './Admin.module.css';
import SettingsIcon from '@mui/icons-material/Settings';
import EditModal from "./EditModal";

const AdminHome = ({ }) => {

    //state variables for stored values
    const [pets, setPets] = useState([]);
    const [attentionPets, setAttentionPets] = useState([]);
    const [approvalPets, setApprovalPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    

    //function to get the pets from the API
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/pets', {
                    params: { id: 'GA612' }
                });
                console.log(response);
                //check the pets returned and if the description is missing, save it to a different state
                response.data.forEach((pet) => {
                    const descMatch = pet.description?.toLowerCase().includes('update') || pet.description?.toLowerCase().includes('coming soon');
                    const noPhotos = !pet.photos || pet.photos.length === 0;

                    if (descMatch && noPhotos) {
                        setAttentionPets((prevPets) => [...prevPets, { ...pet, needsDesc: true, needsPhotos: true }]);
                    } else if (descMatch) {
                        setAttentionPets((prevPets) => [...prevPets, { ...pet, needsDesc: true, needsPhotos: false }]);
                    } else if (noPhotos) {
                        setAttentionPets((prevPets) => [...prevPets, { ...pet, needsDesc: false, needsPhotos: true }]);
                    } else {
                        setPets((prevPets) => [...prevPets, { ...pet, needsDesc: false, needsPhotos: false }]);
                    }
                }) 
                
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching pet data');
                setIsLoading(false);
            }
        };
        fetchPets();
    }, []);

    //while the page is loading
    if (isLoading) {
        return <p>Loading pets...</p>;
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        //entire page container
        <Grid2 container spacing={2} className={styles.adminHome} rowSpacing={5}>
            <div className={styles.adminNav}><h1>Admin Home</h1>
             {/* container for buttons spacing */}
            <Grid2 container className={styles.buttons} spacing={2}> 
                 {/* settings button  */}
                <IconButton component={Link} to="/admin/settings" variant="contained" className={styles.settingsButton}>
                    <SettingsIcon/>
                </IconButton>
                 {/* home button  */}
               <Fab variant="extended" className={styles.button}>Current Pets</Fab>
            </Grid2></div>
            <br></br>
             {/* this shows when pets are not found  */}
            {pets.length === 0 ? (
                <p>No pets found, are you sure your PetFinder ID is correct?</p>
            ) : (
                <>
                 {/* otherwise this shows - grids for pet categories  */}
                    {attentionPets.length > 0 && (
                        <Grid2 container className={styles.petList} spacing={5}>
                            <div className={styles.title}><h2>Needs Attention</h2></div>
                            {attentionPets.map((pet) => (
                                <PetCard key={pet.id} pet={pet} needs={'attention'}/>   
                            ))}
                        </Grid2>
                    )}
                    {approvalPets.length > 0 && (
                        <Grid2 container className={styles.petList} spacing={5}>
                            <div className={styles.title}><h2>Needs Approval</h2></div>
                            {approvalPets.map((pet) => (
                            <PetCard key={pet.id} pet={pet} needs={'approval'}/>
                            ))}
                        </Grid2>
                    )}
                    {pets.length > 0 && (
                        <Grid2 container className={styles.petList} spacing={5}>
                            <div className={styles.title}><h2>Completed</h2></div>
                            {pets.map((pet) => (
                                <PetCard key={pet.id} pet={pet} />
                            ))}
                        </Grid2>
                    )}
                </>  
            )}
        </Grid2>
    )
};
export default AdminHome;