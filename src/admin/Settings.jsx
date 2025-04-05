import React, { useState } from 'react'; 
import DeleteIcon from '@mui/icons-material/Delete';


import styles from './Settings.module.css';


function Settings() {
  const [display, changeDisplay] = useState('petQuestions');

  //these are the default questions that will show on the screen; this needs to be rewritten to add questions from database
  const [petQuestions, setPetQuestions] = useState([
    "Does PET like dogs?",
    "Does PET like cats?",
    "Does PET like children?",
    "Does PET like to cuddle?",
    "Does PET like to play?",
    "Does PET take any medications?",
    "Anything else you'd like to add?",
  ]);


  //constructor for questions
  const [newPetQuestion, setNewPetQuestion] = useState('');

  const changePetQuestion = (index, editedPetQuestion) => {
    const editedPetQuestions = [...petQuestions];
    editedPetQuestions[index] = editedPetQuestion;
    setPetQuestions(editedPetQuestions);
  };

  // constructor for new question
  const addNewPetQuestion = (q) => {
    setNewPetQuestion(q.target.value);
  };

  //constructor to set new question
  const setPetQuestion = () => {
    if (newPetQuestion.trim()) {
      setPetQuestions([...petQuestions, newPetQuestion]);
      setNewPetQuestion('');
    }
  };

  //constructor to delete pet questions
  const deletePetQuestion = (index) => {
  const updatedPetQuestions = petQuestions.filter((_, i) => i !== index);
  setPetQuestions(updatedPetQuestions);
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
  //trash can?
  const petQuestionsPage = () => (
    <div className={styles['gray-box']}>
      <ul className={styles['list']}>
        {petQuestions.map((question, index) => (
          <li key={index} className={styles['list-margin']}>
            <span>{question}</span>
            <button onClick={() => {
              const editedPetQuestion = prompt("Edit Question:", question);
                if (editedPetQuestion) changePetQuestion(index, editedPetQuestion);
            }} className={styles['edit-button']}>Edit</button>
              <button onClick={() => deletePetQuestion(index)} className={styles['delete-button']}> <DeleteIcon /></button>
          </li>
        )
        )}
      </ul>
        <input className={styles['question-input-box']}
          type="text"
          placeholder="Type the new question here..."
          value={newPetQuestion}
          onChange={addNewPetQuestion}        
         />
            <button onClick={setPetQuestion} className={styles['add-question']}>Add Question
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

  //constructor to handle changes
  const [AIPrompt, setAIPrompt] = useState('');
  
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