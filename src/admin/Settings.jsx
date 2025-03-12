//updated 3/12--susan App.jsx

import React, { useState } from 'react'; 
import 'fetch-my-story\src\admin\Settings.Module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

/*import { createRoot } from 'react-dom/client'
<link 
  rel="stylesheet" 
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
/>
*/
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
  
  //constructor for question list with edit and delete buttons
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
              <button onClick={() => deletePetQuestion(index)} class="delete-button"> <i className="fas fa-trash-alt"> </i></button>
          </li>
        )
        )}
      </ul>
        <input class="question-input-box"
          type="text"
          value={newPetQuestion}
          onChange={addNewPetQuestion}
          placeholder="Type the new question here..."
          
          />
            <button onClick={setPetQuestion} class="add-question">Add Question</button>
    </div>
);

//constructor for text message page with submit button
  const textMessagePage = () => (
    <div class="gray-box">
        <textarea placeholder="Type the new message here..." rows="8" cols="50"> 
        </textarea>
      <button className="submit-btn">Submit</button>
    </div>
);

//constructor for ai page with submit button
  const AIPage = () => (
    <div class="gray-box">
      <textarea placeholder="Type the new AI prompt here..." rows="12" cols="50">
      </textarea>
    <button className="submit-btn">Submit</button>
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