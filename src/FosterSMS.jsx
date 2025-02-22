import React, { useEffect, useState } from "react";
import './FosterSMS.module.css';
import { Button, Container, Grid2 } from '@mui/material'
import Question from "./components/Question/Question";

export default function FosterSMS () {
    const [description, setDescription] = useState('');
    const [petName, setPetName] = useState('Momo');
    const [petNameText, setPetNameText] = useState(document.getElementsByClassName("pet-name"));
    const [petBreed, setPetBreed] = useState('Tuxedo Long Hair');
    const [petSpecies, setPetSpecies] = useState('cat');
    const [petSex, setPetSex] = useState('male');

    useEffect(() => {
        setDescription(`${petName} is a ${petSex} ${petBreed} ${petSpecies}.`);

        //set petname in ui
    const petNameElements = document.getElementsByClassName("pet-name");
    for (let i = 0; i < petNameElements.length; i++) {
      petNameElements[i].textContent = petName;
    }
    }, [petName, petSex, petBreed, petSpecies]); //runs when these are changed
    
    


  function handleQuestion(id, answer) {
    const element = document.getElementById(id);
    if (element) element.style.display = "none";
    console.log(answer);
        // let tempDescription = document.getElementById("description").innerHTML;
        // if(answer=="Yes") {                	
        //     document.getElementById("description").innerHTML = tempDescription+" 						"+petName+" likes kids.";
        // }
        // else if (answer=="No") {
        //     document.getElementById("description").innerHTML = tempDescription+" 						"+petName+" DOES NOT like kids.";
        // }

    }

    return (
        <Container className="phone-border">
            <h1>Pet Description Generator</h1>
            <Grid2 className="text-gen-box" id='description'>{description}</Grid2>

            <p className="disclaimer">*This description uses generative AI. Gen AI is experimental.</p>
            <p id='info'>Answer a few questions to help us create an awesome pet description for <span className="pet-name"></span>.</p>

            <Grid2 container className="questionaire">
                <Question id={'kids'} petName={petName} askQuestion={handleQuestion} />
                

            </Grid2>
        </Container>
    );
}