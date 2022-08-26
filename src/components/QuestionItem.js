import React from "react";

function QuestionItem({ question, handleDeleteClick, updateIndex }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  console.log('options:', options)

  function handleDelete (){

    handleDeleteClick(id)
  }

  function answerSelect(e){

    fetch(`http://localhost:4000/questions/${id}`, {

      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "correctIndex": e.target.value
      })})
      .then(r => r.json())
      .then(data => updateIndex(id, e.target.value))

    // console.log('data', data)
    }

 

  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={answerSelect}>{options}</select>
      </label>
      <button onClick={handleDelete} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
