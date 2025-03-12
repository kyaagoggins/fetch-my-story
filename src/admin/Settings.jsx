import React, { useState } from 'react'; //state allows changes
import './Settings.module.css';

function Settings() {
  const [display, changeDisplay] = useState('petQuestions');

  //these are the default questions that will show on the screen
  const [petQuestions, setPetQuestions] = useState([
    "Does PET like dogs?",
    "Does PET like cats?",
    "Does PET like children?",
    "Does PET like to cuddle?",
    "Does PET like to play?",
    "Does PET take any medications?",
    "Anything else you'd like to add?",
  ]);


  //change question variable
  const [newPetQuestion, setNewPetQuestion] = useState('');

  const changePetQuestion = (index, editedPetQuestion) => {
    const editedPetQuestions = [...petQuestions];
    editedPetQuestions[index] = editedPetQuestion;
    setPetQuestions(editedPetQuestions);
  };

  // new question variable
  const addNewPetQuestion = (q) => {
    setNewPetQuestion(q.target.value);
  };

  //new question setter
  const setPetQuestion = () => {
    if (newPetQuestion.trim()) {
      setPetQuestions([...petQuestions, newPetQuestion]);
      setNewPetQuestion('');
    }
  };

  //makes edit button for questions
const petQuestionsPage = () => (
  <div>
    <h2>
      Adjust Questions
    </h2>
      <ul>
        {petQuestions.map((question, index) => (
          <li key={index}>
            <span>{question}</span>
            <button onClick={() => {
              const editedPetQuestion = prompt("Edit Question:", question);
                if (editedPetQuestion) changePetQuestion(index, editedPetQuestion);
            }}>Edit</button>
          </li>
        )
        )}
      </ul>
        <input
          type="text"
          value={newPetQuestion}
          onChange={addNewPetQuestion}
          placeholder="Type the new question here..."
          />
            <button onClick={setPetQuestion}>Add Question</button>
  </div>
);

//change text message page //add old test message here in a new box
const textMessagePage = () => (
  <div>
    <h2>
      Change the Text Message
    </h2>
      <textarea placeholder="Type the new message here..." rows="8" cols="100"> 
      </textarea>
  </div>
);

const AIPage = () => (
  <div>
    <h2>
      Configure the AI Prompt
    </h2>
      <textarea placeholder="Type the new AI prompt here..." rows="12" cols="100">
      </textarea>
  </div>
);

return (
  <>
    <h1>
      Admin Settings
    </h1>

    <div className="adminSettings-banner"> 
      <btn onClick={() => changeDisplay('petQuestions')}>
        Adjust Questions
      </btn>

      <btn onClick={() => changeDisplay('textMessage')}>
        Change Text Message
      </btn>

      <btn onClick={() => changeDisplay('aiPrompt')}>
        Configure AI Prompt
      </btn>

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
