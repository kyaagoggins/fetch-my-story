import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid2, IconButton } from "@mui/material";
import PetCard from "../components/PetCard/PetCard";
import styles from './Admin.module.css';
import SettingsIcon from '@mui/icons-material/Settings';

/* This component is the Admin Homepage 
    This is the homepage of FMS Pro 
    This page displays all of the pets that are gathered from the petfinder api, and places them in categories 
    depending on their information and needs 
*/
const AdminHome = ({ }) => {

    //state variables for stored values
    //these state variables handle the pet categories and error or loading handling
    const [pets, setPets] = useState([]);
    const [attentionPets, setAttentionPets] = useState([]);
    //approval pets is an option for the dev team to create a new section if they want the option to approve and reject pets 
    const [approvalPets, setApprovalPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    

    //function to get the pets from the API
    /* Fetch pets function is an asynchronous function that makes the api call to the backend server route that has been defined 
        in params, this is where the petfinder id of the shelter is inputted, and where the pets for that specific pet will be returned 
        Use Effect here allows this function to run once this page is loaded in
    */
    useEffect(() => {
        const fetchPets = async () => {
            // this try catch attempts to communicate with the backend route to get the pets for the decided petfinder id 
            try {
                const response = await axios.get('http://localhost:3000/api/pets', {
                    params: { id: 'GA612' }
                });
                /* This loop determines what pet gets sorted into what category
                    This can be edited by the dev team to provide more specific flagging to the specific shelter, as well
                    as the ability to add additional categories and flags 
                */
               //for the server purposes check the pets returned and if the description is missing, save it to a different state
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
                //when the data is no longer loading, set this state value 
                setIsLoading(false);
            } catch (error) {
                //catches if there is an error retrieving the data - returns an error to the user and stops loading 
                setError('Error fetching pet data');
                setIsLoading(false);
            }
        };
        //calls fetch pets when the page is loaded 
        fetchPets();
    }, []);

    //while the page is loading -  this will display until all of the data has returned 
    if (isLoading) {
        return <p>Loading pets...</p>;
    }

    //if an error occurs, this will be displayed to the user 
    if (error) {
        return <p>{error}</p>
    }

    /* This is what is displayed for the Admin Home component
    The above code includes all functionality for this component 
    The below code includes the display 
    Once the page data has loaded successfully, this is the display that is shown 
    */
    return (
        //entire page container
        <Grid2 container spacing={2} className={styles.adminHome} rowSpacing={5}>
            <div className={styles.adminNav}><h1>Admin Home</h1>
             {/* container for buttons spacing */}
            <Grid2 container className={styles.buttons} spacing={2}> 
                 {/* settings button directs to the settings page */}
                <IconButton component={Link} to="/admin/settings" variant="contained" className={styles.settingsButton}>
                    <SettingsIcon/>
                </IconButton>
            </Grid2></div>
            <br></br>
             {/* this shows when no pets are found but the api call successfully occurred */}
            {pets.length === 0 ? (
                <p>No pets found, are you sure your PetFinder ID is correct?</p>
            ) : (
                <>
                 {/* successful api call - otherwise this shows - grids for pet categories  */}
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