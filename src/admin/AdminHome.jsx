import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Grid2 } from "@mui/material";
import PetCard from "../components/PetCard/PetCard";

const AdminHome = ({ }) => {

    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/pets', {
                    params: { id: 'GA612' }
                });
                setPets(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching pet data');
                setIsLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (isLoading) {
        return <p>Loading pets...</p>;
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <Grid2 container spacing={2}>
            <h1>Admin Home</h1>
            <br></br>
            {pets.length === 0 ? (
                <p>No pets found, are you sure your PetFinder ID is correct?</p>
            ) : (
                
                <Grid2 container className="petList">
                    {pets.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                    <Link to="/admin/settings">Settings</Link>
                </Grid2>
            )}
        </Grid2>
    )
};
export default AdminHome;