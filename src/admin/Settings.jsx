import React, { useState, useEffect } from 'react'; 
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid2, Fab, TextField, MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Settings.module.css';
                           
function Settings() {
  const [display, changeDisplay] = useState('petQuestions');
  //ai prompt from global data
  const [AIPrompt, setAIPrompt] = useState(localStorage.getItem('prompt') || "generate a pet adoption description using the following info: ");

  //these are the default questions that will show on the screen
  //defaulted to use global state or defaults
  const [petQuestions, setPetQuestions] = useState(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('petQuestions')) || [
    {id: 1, text: "Does PET like kids", value: '', result: "likes kids"},
    {id: 2, text: "Does PET like cats", value: '', result: "likes cats"},
    {id: 3, text: "Does PET like dogs", value: '', result: "likes dogs"},
    {id: 4, text: "Is PET playful", value: '', result: "playful"},
    {id: 5, text: "Is PET gentle", value: '', result: "gentle"},
    {id: 6, text: "Does PET like to cuddle", value: '', result: "likes to cuddle"},
    {id: 7, text: "Does PET need photos", value: '', result: "photos"},
  ];
  return storedQuestions;
  });

  // Update localStorage whenever petQuestions changes
  useEffect(() => {
    localStorage.setItem('petQuestions', JSON.stringify(petQuestions));
  }, [petQuestions]);

  //constructor for questions
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  //edit question submit function
  const changePetQuestion = () => {
    const questionText = document.getElementById("questionText").value;
    const questionResult = document.getElementById("questionResult").value;

    if (!selectedQuestion) return;

    //sets edit question
    const editedPetQuestion = {
      ...selectedQuestion,
      text: questionText,
      result: questionResult,
      value: localStorage.getItem('question' + selectedQuestion.id) 
    }

    //sets all petQuestions
    const updatedPetQuestions = petQuestions.map(q =>
      q.id === selectedQuestion.id ? editedPetQuestion : q
    );
    setPetQuestions(updatedPetQuestions);
    
    //updated global storage
    localStorage.setItem(`question${selectedQuestion.id}`, questionText);
    localStorage.setItem(`question${selectedQuestion.id}Result`, questionResult);
    
    setEditQuestionOpen(false);
    setSelectedQuestion(null);
  };

  //new question handles and bools
  const [newQuestionOpen, setNewQuestionOpen] = useState(false);
  const handleNewQuestionOpen = () => setNewQuestionOpen(true);
  const handleNewQuestionClose = () => {setNewQuestionOpen(false);}

  //edit question handles and bools
  const [editQuestionOpen, setEditQuestionOpen] = useState(false);
      //handle open/close modal 
    const handleEditQuestionOpen = (question) => {
      setSelectedQuestion(question);
      setEditQuestionOpen(true); 
    }
      const handleEditQuestionClose = () => {setEditQuestionOpen(false); setSelectedQuestion(null);}

  //question modal - both edit and add new - needed so result can be defined
  const QuestionModal = ({question, edit}) => (
    <>
    <Dialog open={edit ? editQuestionOpen : newQuestionOpen} onClose={edit ? handleEditQuestionClose : handleNewQuestionClose} className={styles.modal}>
    <DialogTitle>{edit ? 'Edit' : 'New' } Question</DialogTitle>
        <DialogContent className={styles.modal}>
            <br></br>
            <Grid2>
                <TextField id="questionText" label={edit ? "Edit Question Text" : "New Question Text" } defaultValue={edit ? question.text : ''} size="medium" className={styles.textInput}></TextField>
                <Typography id="questionResultText" className={styles.editText}>Enter the added description of this question</Typography>
                <TextField id="questionResult" label="Ex. PET likes dogs" defaultValue={edit ? question.result : ''} size="medium" className={styles.textInput}></TextField>
            </Grid2>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={edit ? handleEditQuestionClose : handleNewQuestionClose}>Close</Button>
            <Button variant="outlined" onClick={edit ? changePetQuestion : addNewQuestion}>Submit</Button>
        </DialogActions>
    </Dialog>
    </>
  );

  //add new question 
  const addNewQuestion = () => {
    const questionResult = document.getElementById("questionResult").value;
    const questionText = document.getElementById("questionText").value;

    if (questionText) {
      const newQuestion = { id: petQuestions.length + 1, text: questionText, value: '', result: questionResult };
      setPetQuestions([...petQuestions, newQuestion]);

      // Reset and close the modal
      setNewQuestionOpen(false);
    }
  };

  //constructor to delete pet questions
  const deletePetQuestion = (id) => {
    const updatedPetQuestions = petQuestions.filter((q) => q.id !== id);
    setPetQuestions(updatedPetQuestions);
    localStorage.removeItem(`question${id}`);
    localStorage.removeItem(`question${id}Result`);
  };

  //update this to write questions to file or database
  const commitQuestions = () => {
    console.log('Your questions have been updated!');
    //your code here
  };

    //update this to write to or update twillio
  const commitText = () => {
    console.log('Your text message has been updated!');

    //your code here
  };

    //update this to write to file or database
  const commitAIPrompt = () => {
    localStorage.setItem('prompt', AIPrompt);
    console.log('Your AI prompt has been updated!');

    //your code here
  };

  //constructor for cancel buttons for question, text message, and AI
  const cancelQuestionChange = () => {
    setNewPetQuestion('');
  };

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

  //constructor to handle text
  const [textMessage, setTextMessage] = useState('');
  
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

//constructor to switch the display page for breadcrumbs
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
  
return (
  <>
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