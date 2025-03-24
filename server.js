import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.get('/api/pets', async (request, result) => {
    try {
        const urlPetId = request.query.id;
        if (!urlPetId) {
            return result.status(400).json({ error: 'Missing PetFinder ID' });
        }


        //fetch list of pets 
        const petResponse = await axios.get(`https://api.petfinder.com/v2/animals?organization=${urlPetId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        result.json(petResponse.data.animals);
    } catch (error) {
        console.error(error);
        result.status(500).json({ error: 'An error occurred while fetching pet data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});