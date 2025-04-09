import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from './FosterSMS.module.css';
import { Button, Container, Grid2, TextField, Typography } from '@mui/material'
import Question from "./components/Question/Question";
import LoopIcon from '@mui/icons-material/Loop';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function FosterSMS ({pet: propPet}) {

    //checks for a pet being passed
    const location = useLocation();
    const passedPet = location.state?.pet;

    //default pet for page loading 
    const defaultPet = {
        name: 'Momo',
        breeds: { primary: 'Tuxedo Long Hair' },
        species: 'cat',
        gender: 'male',
    }

    const pet = propPet || passedPet || defaultPet;

    //state variables
    const [description, setDescription] = useState('');
    const [petName, setPetName] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [petSpecies, setPetSpecies] = useState('');
    const [petSex, setPetSex] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [response, setResponse] = useState('');

    //runs on load 
    useEffect(() => {
        console.log('Loaded Pet', pet);

        setPetBreed(pet.breeds?.primary || 'Unknown Breed');
        setPetName(pet.name);
        setPetSpecies(pet.species);
        setPetSex(pet.gender);

        setDescription(`${petName} is a ${petSex} ${petBreed} ${petSpecies}.`);

        //set petname in ui
    const petNameElements = document.getElementsByClassName("petName");
    for (let i = 0; i < petNameElements.length; i++) {
      petNameElements[i].textContent = petName;
    }
    }, [petName, petSex, petBreed, petSpecies]); //runs when these are changed

    //handle date change 
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };
    
      //what happens on each question answer
    function handleQuestion(id, answer, desc) {
        const element = document.getElementById(id);
        if (element) element.style.display = "none";

        //handles case for thee photo question
        if (id == 'photos') {
            if (answer == 'Yes') {
                document.getElementById("photoDiv").style.display="flex";
            }
            return;
        }
        
        //functionality for all other questions
        if (answer == 'Yes') {
            setDescription(description + " " + petName + " " + desc + ".")
        }
        else if (answer == "No") {
            setDescription(description + " " + petName + " " + 'NOT ' + desc + ".")
        }
        else {
            setDescription(description);
        }
    }

    //submit description func
    function submit() {
        setSubmitted(true);
        let whatElse = document.getElementById("whatElse").value;
        document.getElementById("whatElseGrid").style.display="none";
        setDescription(description + " " + whatElse + ".");
        document.getElementById("info").innerHTML =`Thanks for giving ${petName} a better description! Please wait while we use AI to clean this up a bit...`;
        sendMessage();
    }

    //prompt for chatgpt
    const prompt = "generate a pet adoption description using the following info: ";

    //api call to chatgpt to get the response 
    const sendMessage = async () => {
        try {
          const res = await axios.post('http://localhost:3000/api/chat', {
            prompt: prompt + description,
          });
          setResponse(res.data.message);
          setDescription(res.data.message);
          console.log(res);
        } catch (err) {
          console.error('Error sending message:', err);
          setResponse('Something went wrong.');
        }
      };

    return (
        <Container className={styles.phoneBorder}>
            <h1>Pet Description Generator</h1>
            <Grid2 className={styles.descTextGen} id='description'>{description}</Grid2>

            <p className={styles.disclaimer}>*This description uses generative AI. Gen AI is experimental.</p>
            <p id='info'>Answer a few questions to help us create an awesome pet description for <span className="petName"></span>.</p>

            <Grid2 container className={styles.questionaire}>
                {/* can change to mapping to allow for custom addition of questions */}
                <Question questionId={'kids'} questionDesc={`Does ${petName} like kids`} questionResult={'like kids'} askQuestion={handleQuestion} />
                <Question questionId={'cats'} questionDesc={`Does ${petName} like cats`} questionResult={'like cats'} askQuestion={handleQuestion} />
                <Question questionId={'dogs'} questionDesc={`Does ${petName} like dogs`} questionResult={'like dogs'} askQuestion={handleQuestion} />
                <Question questionId={'playful'} questionDesc={`Is ${petName} playful`} questionResult={'playful'} askQuestion={handleQuestion} />
                <Question questionId={'gentle'} questionDesc={`Is ${petName} gentle`} questionResult={'gentle'} askQuestion={handleQuestion} />
                <Question questionId={'cuddle'} questionDesc={`Does ${petName} like to cuddle`} questionResult={'like to cuddle'} askQuestion={handleQuestion} />
                <Question questionId={'photos'} questionDesc={`Does ${petName} need photos`} questionResult={'photos'} askQuestion={handleQuestion} />
                
                {/* div for the photo question and date picker */}
                <Grid2 className={styles.photoQ} container display="none" id="photoDiv" direction="row">
                <Typography variant="" component="h4">When does {petName} need photos?</Typography>
                    <TextField
                    className={styles.date}
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    variant="outlined"
                    />
                </Grid2>

                {/* div for the what else question         */}
                <Grid2 size={8} id='whatElseGrid' container direction="row">
                <h4>What else should people know about {petName}?</h4>
                <TextField className={styles.else} id='whatElse'></TextField>
                </Grid2>

                <Grid2 size={6} className={styles.submit}>
                    <Button variant='contained' id='submitButton' onClick={submit} endIcon={submitted ? <LoopIcon /> : null}>Submit</Button>
                </Grid2>
                
            </Grid2>
        </Container>
    );
}