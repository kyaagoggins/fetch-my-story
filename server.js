import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

//import .env file for api keys 
/* create a file called .env within the source of the application to store all secret api keys 
*/
dotenv.config();

//defines the backend port
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//petfinder api server code 

//get route for get pets 
/* This route corresponds to calling the petfinder api and retrieving the pets corresponding to the organization id passed
*/
app.get('/api/pets', async (request, result) => {
    try {
      //attempts to get response from api 
      //gives the petId as the organization sent from the request
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

        //access token retrieved from corresponding api keys 
        const accessToken = tokenResponse.data.access_token;

        //fetch list of pets for the given organization 
        //this can be where a shelter defines the specific organization id here, rather than 
        //dynamically within the application code 
        const petResponse = await axios.get(`https://api.petfinder.com/v2/animals?organization=${urlPetId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        //returns rresult 
        result.json(petResponse.data.animals);
    } catch (error) {
      //error handling if unable to communicate with this route 
        console.error(error);
        result.status(500).json({ error: 'An error occurred while fetching pet data.' });
    }
});

// code for chatgpt api

/* post route for the chatgpt api 
  This route is given a request, that is sent to the chatgpt api as a prompt
  the api then returns the ai response from this prompt 
*/
app.post('/api/chat', async (req, res) => {
  //prompt is request body being sent 
    const { prompt } = req.body;
  
    try {
      //connect to the api route with specific key information
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          //token creation with api key specific information 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
  
      //response is returned and sent back 
      const message = response.data.choices[0].message.content;
      res.json({ message });
    } catch (error) {
      //error handling if there is failed communication to the api 
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