import React, { useState, useEffect } from 'react'; 
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid2, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Settings.module.css';
            
/* This component is the Admin Settings Page
  This page displays all of the customizable portions of the application and allows for the editing and changing of those elements
  In this component is where the user has the ability to change the questions in the form, the text message, and the ai prompt. 
*/
function Settings() {
  //retrieve pet questions for the display
  const [display, changeDisplay] = useState('petQuestions');

  //ai prompt from global stored data
  const [AIPrompt, setAIPrompt] = useState(localStorage.getItem('prompt') || "generate a pet adoption description using the following info: ");

  //constructor to handle text message customization
  const [textMessage, setTextMessage] = useState(localStorage.getItem('textMessage') || 'Hi! When you have a minute can you use this link to give your foster pet a better description, thanks!');

  //these are the default questions that will show on the screen
  //defaulted to use global state or defaults
  const [petQuestions, setPetQuestions] = useState(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('petQuestions')) || [
    {id: 1, text: "Does PET like kids", result: "likes kids"},
    {id: 2, text: "Does PET like cats", result: "likes cats"},
    {id: 3, text: "Does PET like dogs", result: "likes dogs"},
    {id: 4, text: "Is PET playful", result: "playful"},
    {id: 5, text: "Is PET gentle", result: "gentle"},
    {id: 6, text: "Does PET like to cuddle", result: "likes to cuddle"},
    {id: 7, text: "Does PET need photos", result: "photos"},
  ];
  return storedQuestions;
  });

  // Update localStorage whenever petQuestions changes
  useEffect(() => {
    localStorage.setItem('petQuestions', JSON.stringify(petQuestions));
  }, [petQuestions]);

  //constructor for questions that are currently being edited 
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  /* Change Pet Question function
    This allows for the editing of a currently selected question
  */
  const changePetQuestion = () => {
    //retrieves the data that the user inputted in the input values 
    const questionText = document.getElementById("questionText").value;
    const questionResult = document.getElementById("questionResult").value;

    if (!selectedQuestion) return;

    //sets edit question as the questioon that is selected and continues to use the state
    const editedPetQuestion = {
      ...selectedQuestion,
      text: questionText,
      result: questionResult,
    }

    //sets all petQuestions once a question has been changed
    const updatedPetQuestions = petQuestions.map(q =>
      q.id === selectedQuestion.id ? {...q, text: questionText, result: questionResult} : q
    );
    //updates current pet questions 
    setPetQuestions(updatedPetQuestions);
    
    //updates global storage of pet questions
    localStorage.setItem('petQuestions', JSON.stringify(updatedPetQuestions));
    
    //closes the modal and sets no selected question
    setEditQuestionOpen(false);
    setSelectedQuestion(null);
  };

  //new question handles to open and close the modal and bools
  const [newQuestionOpen, setNewQuestionOpen] = useState(false);
  const handleNewQuestionOpen = () => setNewQuestionOpen(true);
  const handleNewQuestionClose = () => {setNewQuestionOpen(false);}

  //edit question handles to open and close the modal and bools
  const [editQuestionOpen, setEditQuestionOpen] = useState(false);
      //handle open/close modal - sets selected question as the one chosen 
    const handleEditQuestionOpen = (question) => {
      setSelectedQuestion(question);
      setEditQuestionOpen(true); 
    }
      const handleEditQuestionClose = () => {setEditQuestionOpen(false); setSelectedQuestion(null);}

  //question modal - both edit and add new - needed so result can be defined
  /* Question Modal
    This is the modal that gets displayed when a question is being edited or added 
    This modal displays inputs for the user to complete to gather information on the new values for the submitted question 
    This modal acts as both the edit and new workflows, changing values based on if a question is being passsed at all or created
    **/
  const QuestionModal = ({question, edit}) => (
    <>
    <Dialog open={edit ? editQuestionOpen : newQuestionOpen} onClose={edit ? handleEditQuestionClose : handleNewQuestionClose} className={styles.modal}>
    <DialogTitle>{edit ? 'Edit' : 'New' } Question</DialogTitle>
        <DialogContent className={styles.modal}>
            <br></br>
            <Grid2>
                <TextField id="questionText" label={edit ? "Edit Question Text" : "New Question Text" } defaultValue={edit ? question.text : ''} size="medium" className={styles.textInput}></TextField>
                <Typography id="questionResultText" className={styles.editText}>Enter the added description of this question</Typography>
                <TextField id="questionResult" label="Ex. likes dogs" defaultValue={edit ? question.result : ''} size="medium" className={styles.textInput}></TextField>
            </Grid2>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={edit ? handleEditQuestionClose : handleNewQuestionClose}>Close</Button>
            <Button variant="outlined" onClick={edit ? changePetQuestion : addNewQuestion}>Submit</Button>
        </DialogActions>
    </Dialog>
    </>
  );

  //add new question function - allows for the creation and initialization of a new question
  const addNewQuestion = () => {
    const questionResult = document.getElementById("questionResult").value;
    const questionText = document.getElementById("questionText").value;

    if (questionText) {
      //sets new question as the values gathered
      const newQuestion = { id: petQuestions.length + 1, text: questionText, result: questionResult };
      setPetQuestions([...petQuestions, newQuestion]);

      // Reset and close the modal
      setNewQuestionOpen(false);
    }
  };

  //constructor to delete pet questions 
  const deletePetQuestion = (id) => {
    const updatedPetQuestions = petQuestions.filter((q) => q.id !== id);
    setPetQuestions(updatedPetQuestions);
    //updates the global storage as well to account for the current questions 
    localStorage.removeItem(`question${id}`);
    localStorage.removeItem(`question${id}Result`);
  };

  /* This is the submit button if any additional changes need to be submitted
    This is a placeholder here for if the development team needs any allowance for database values to be sent or changed
  */
  const commitQuestions = () => {
    console.log('Your questions have been updated!');
  };

  /* This is the submit text message changes button
  For now, the text message gets saved in the global storage of the frontend of the app
  If the development team is using a database, this is where additional code would be placed to update database values
  */
  const commitText = () => {
    localStorage.setItem('textMessage', textMessage);
    console.log('Your text message has been updated!');
  };

  /* This is the submit ai prompt changes button
  For now, the ai prompt gets saved in the global storage of the frontend of the app
  If the development team is using a database, this is where additional code would be placed to update database values
  */
  const commitAIPrompt = () => {
    localStorage.setItem('prompt', AIPrompt);
    console.log('Your AI prompt has been updated!');
  };

  //constructor for cancel buttons for text message and AI
  const cancelTextChange = () => {
    setTextMessage('');
  };
  const cancelNewAIPrompt = () => {
    setAIPrompt('');
  };
  
  //constructor for question list with edit and delete buttons
  const petQuestionsPage = () => (
    <div className={styles['gray-box']}>
      <ul className={styles['list']}>
        {petQuestions.map((question) => (
          <li key={question.id} className={styles['list-margin']}>
            <span>{question.text}</span>
            <button onClick={() => handleEditQuestionOpen(question)} className={styles['edit-button']}>Edit</button>
            <button onClick={() => deletePetQuestion(question.id)} className={styles['delete-button']}> <DeleteIcon /></button>
          </li>
        )
        )}
      </ul>
            <button onClick={handleNewQuestionOpen} className={styles['add-question']}>Add Question
            </button>

      <div className={styles['button-container']}>
          <div className={styles['align-button']}>
            <button onClick={commitQuestions} className={styles['commit-question-button']}>Submit
            </button>
          </div>
          <div className={styles['align-button']}>
            <button onClick={cancelQuestionChange} className={styles['cancel-question-button']}>Cancel
            </button>
          </div>
      </div>     
    </div>
  );
  
  //constructor for text message page with submit button
  const textMessagePage = () => (
    <div className={styles['gray-box']}>
        <textarea 
          placeholder="Type the new message here..." rows="8" cols="50"
          value={textMessage}
          onChange={(t) => setTextMessage(t.target.value)}
        > 
        </textarea>
      <div className={styles['button-container']}>
          <div className={styles['align-button']}>
          
              <button onClick={commitText} className={styles['commit-text-button']}>Submit
              </button>
          </div>
          <div className={styles['align-button']}>
              <button onClick={cancelTextChange} className={styles['cancel-text-button']}>Cancel
              </button>
          </div>
      </div>
    </div>
  );
  
  //constructor for ai page with submit button
  //add best practices or ideas for ai button?  
  const AIPage = () => (
    <div className={styles['gray-box']}>
        <textarea placeholder="Type the new AI prompt here..." rows="12" cols="50"
          value={AIPrompt}
          onChange={(a) => setAIPrompt(a.target.value)}
        >
        </textarea>
      <div className={styles['button-container']}>
          <div className={styles['align-button']}>
            <button onClick={commitAIPrompt} className={styles['commit-AI-button']}>Submit
            </button>
          </div> 
          <div className={styles['align-button']}>
            <button onClick={cancelNewAIPrompt} className={styles['cancel-AI-button']}>Cancel
            </button>
          </div> 
        </div>     
    </div>
  );

//constructor to switch the display page for breadcrumbs and header changes
  const getCurrentPage = () => {
    switch (display) {
      case 'petQuestions':
        return 'Adjust Questions';
      case 'textMessage':
        return 'Change the Text Message';
      case 'aiPrompt':
        return 'Configure AI Prompt';
      default:
        return '';
    }
  };
  

  /* Admin Settings Component HTML View 
    The above code is all functions, modals, and tab views corresponding to the admin settings 
    The below code is all of the views for the admin settings 
    */
return (
  <>
  {/* functionality for including the modals as both edit and add  */}
  {selectedQuestion && <QuestionModal question={selectedQuestion} edit={true} />}
  {newQuestionOpen && <QuestionModal question={null} edit={false} />}
   <div className={styles.container}>
    <h1 className={styles['admin-header']}>

      Admin Settings {display !== 'petQuestions' && display !== 'textMessage' && display !== 'aiPrompt' ? '' : ` > ${getCurrentPage()}`}
    </h1>

    <div className={styles['adminsettings-banner']}> 
      <button 
    onClick={() => changeDisplay('petQuestions')} 
    className={display === 'petQuestions' ? styles.active : ''}>
    Adjust Questions
  </button>

  <button 
    onClick={() => changeDisplay('textMessage')} 
    className={display === 'textMessage' ? styles.active : ''}>
    Change Text Message
  </button>

  <button 
    onClick={() => changeDisplay('aiPrompt')} 
    className={display === 'aiPrompt' ? styles.active : ''}>
    Configure AI Prompt
  </button>

    </div>

  {/* show tab displays depending on heading choice  */}
    {
    display === 'petQuestions' && petQuestionsPage()
    }
    {
    display === 'textMessage' && textMessagePage()
    }
    {
    display === 'aiPrompt' && AIPage()
    }
  </div>
  </>
  );

}

export default Settings;