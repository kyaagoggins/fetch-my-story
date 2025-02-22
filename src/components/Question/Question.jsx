import { Grid2, Button } from "@mui/material";
import React from "react";

function Question ({
    questionId,
    petName,
    askQuestion,
}) {
    return (
        <Grid2 item id={questionId}>
            <h4>Does <span>{petName}</span> like kids?</h4>
            <Button onClick={() => askQuestion(questionId, 'Yes')}>Yes</Button>
            <Button onClick={() => askQuestion(questionId, 'No')}>No</Button>
            <Button>Unsure</Button>
        </Grid2>
    );
}

export default Question;
