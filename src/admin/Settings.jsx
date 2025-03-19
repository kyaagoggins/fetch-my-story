import React, { useState } from 'react'; 
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import './Settings.module.css';
//import 'primeicons/primeicons.css';

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
    setAiPrompt('');
  };
  
  
  //constructor for question list with edit and delete buttons
  //trash can?
  const petQuestionsPage = () => (
    <div class="gray-box">
      <ul class="list">
        {petQuestions.map((question, index) => (
          <li key={index} class="list-margin">
            <span>{question}</span>
            <button onClick={() => {
              const editedPetQuestion = prompt("Edit Question:", question);
                if (editedPetQuestion) changePetQuestion(index, editedPetQuestion);
            }} class="edit-button">Edit</button>
              <button onClick={() => deletePetQuestion(index)} class="delete-button"> <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i> <span className="pi pi-trash"></span></button>
          </li>
        )
        )}
      </ul>
        <input class="question-input-box"
          type="text"
          placeholder="Type the new question here..."
          value={newPetQuestion}
          onChange={addNewPetQuestion}        
         />
            <button onClick={setPetQuestion} class="add-question">Add Question
            </button>

      <div class="button-container">
          <div class="align-button">
            <button onClick={commitQuestions} class="commit-question-button">Submit
            </button>
          </div>
          <div class="align-button">
            <button onClick={cancelQuestionChange} class="cancel-question-button">Cancel
            </button>
          </div>
      </div>     
    </div>
  );

  //constructor to handle text
  const [textMessage, setTextMessage] = useState('');
  

  //constructor for text message page with submit button
  const textMessagePage = () => (
    <div class="gray-box">
        <textarea 
          placeholder="Type the new message here..." rows="8" cols="50"
          value={textMessage}
          onChange={(t) => setTextMessage(t.target.value)}
        > 
        </textarea>
      <div class="button-container">
          <div class="align-button">
          
              <button onClick={commitText} class="commit-text-button">Submit
              </button>
          </div>
          <div class="align-button">
              <button onClick={cancelTextChange} class="cancel-text-button">Cancel
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
    <div class="gray-box">
        <textarea placeholder="Type the new AI prompt here..." rows="12" cols="50"
          value={AIPrompt}
          onChange={(a) => setAIPrompt(a.target.value)}
        >
        </textarea>
      <div class="button-container">
          <div class="align-button">
            <button onClick={commitAIPrompt} class="commit-AI-button">Submit
            </button>
          </div> 
          <div class="align-button">
            <button onClick={cancelNewAIPrompt} class="cancel-AI-button">Cancel
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
  
    <h1 class="admin-header">

      Admin Settings {display !== 'petQuestions' && display !== 'textMessage' && display !== 'aiPrompt' ? '' : ` > ${getCurrentPage()}`}
    </h1>

    <div class="adminSettings-banner"> 
      <button 
    onClick={() => changeDisplay('petQuestions')} 
    className={display === 'petQuestions' ? 'active' : ''}>
    Adjust Questions
  </button>

  <button 
    onClick={() => changeDisplay('textMessage')} 
    className={display === 'textMessage' ? 'active' : ''}>
    Change Text Message
  </button>

  <button 
    onClick={() => changeDisplay('aiPrompt')} 
    className={display === 'aiPrompt' ? 'active' : ''}>
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
  
  </>
  );

}

export default Settings;