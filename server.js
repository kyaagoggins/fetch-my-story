import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

//import .env file for api keys 
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//petfinder api server code 

//get route for get pets 
app.get('/api/pets', async (request, result) => {
    try {
        const urlPetId = request.query.id;
        if (!urlPetId) {
            return result.status(400).json({ error: 'Missing PetFinder ID' });
        }

        //get token 
        //process.env is a .env file with the api keys stored as values
        //process.env.CLIENT_ID is CLIENT_ID=xxxxxxxx in .env
        const tokenResponse = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        });

        const accessToken = tokenResponse.data.access_token;

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

// code for chatgpt api

app.post('/api/chat', async (req, res) => {
  //prompt is request body being sent 
    const { prompt } = req.body;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
  
      const message = response.data.choices[0].message.content;
      res.json({ message });
    } catch (error) {
        console.error('Error from OpenAI:', error.message);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
        }
        res.status(500).json({ error: 'Failed to fetch from OpenAI' });
      }
  });

  //ensure the localhost port for the server is running 
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });