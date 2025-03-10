import { Grid2, Button } from "@mui/material";
import React from "react";
import styles from './Question.module.css';

function Question ({
    questionId,
    questionDesc,
    questionResult,
    askQuestion,
}) {
    return (
        <Grid2 item size={10} id={questionId} className={styles.questionGrid}>
            <h4>{questionDesc}?</h4>
            <Button variant='contained' className={styles.questionButton} onClick={() => askQuestion(questionId, 'Yes', questionResult)}>Yes</Button>
            <Button variant='contained' className={styles.questionButton} onClick={() => askQuestion(questionId, 'No', questionResult)}>No</Button>
            <Button variant='contained' className={styles.questionButton} onClick={() => askQuestion(questionId, 'Unsure', questionResult)}>Unsure</Button>
        </Grid2>
    );
}

export default Question;
