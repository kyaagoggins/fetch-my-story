import { Grid2, Button } from "@mui/material";
import React from "react";
import styles from './Question.module.css';

/* Question Component 
    This component corresponds to each individual question within the foster sms page 
*/ 
function Question ({
    //state variables being passed from parent for question functionaliy 
    questionId,
    questionDesc,
    questionResult,
    askQuestion,
}) {
    /* Question Component HTML View 
    The below code is all of the views possible for the question component 
    Includes yes, no, and unsure and handling for the specific questions needs 
    */
    return (
        // container for question
        <Grid2 item size={10} id={questionId} className={styles.questionGrid}>
            <h4>{questionDesc}?</h4>
            <Button variant='contained' className={styles.questionButton} onClick={() => askQuestion(questionId, 'Yes', questionResult)}>Yes</Button>
            <Button variant='contained' className={styles.questionButton} onClick={() => askQuestion(questionId, 'No', questionResult)}>No</Button>
            <Button variant='contained' className={styles.questionButton} onClick={() => askQuestion(questionId, 'Unsure', questionResult)}>Unsure</Button>
        </Grid2>
    );
}

export default Question;
