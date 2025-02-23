import React, { useEffect, useState } from "react";
import styles from './FosterSMS.module.css';
import { Button, Container, Grid2, TextField } from '@mui/material'
import Question from "./components/Question/Question";
import LoopIcon from '@mui/icons-material/Loop';

export default function FosterSMS () {
    const [description, setDescription] = useState('');
    const [petName, setPetName] = useState('Momo');
    const [petBreed, setPetBreed] = useState('Tuxedo Long Hair');
    const [petSpecies, setPetSpecies] = useState('cat');
    const [petSex, setPetSex] = useState('male');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setDescription(`${petName} is a ${petSex} ${petBreed} ${petSpecies}.`);

        //set petname in ui
    const petNameElements = document.getElementsByClassName("petName");
    for (let i = 0; i < petNameElements.length; i++) {
      petNameElements[i].textContent = petName;
    }
    }, [petName, petSex, petBreed, petSpecies]); //runs when these are changed
    
    function handleQuestion(id, answer, desc) {
        const element = document.getElementById(id);
        if (element) element.style.display = "none";
        console.log(answer);
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

    function submit() {
        setSubmitted(true);
        let whatElse = document.getElementById("whatElse").value;
        document.getElementById("whatElseGrid").style.display="none";
        setDescription(description + " " + whatElse + ".");
        document.getElementById("info").innerHTML =`Thanks for giving ${petName} a better description! Please wait while we use AI to clean this up a bit...`;
    }

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
                
                
                <Grid2 item size={8} id='whatElseGrid'>
                <h4>What else should people know about {petName}?</h4>
                <TextField className={styles.else} id='whatElse'></TextField>
                </Grid2>

                <Grid2 item size={6} className={styles.submit}>
                    <Button variant='contained' id='submitButton' onClick={submit} endIcon={submitted ? <LoopIcon /> : null}>Submit</Button>
                </Grid2>
                
            </Grid2>
        </Container>
    );
}