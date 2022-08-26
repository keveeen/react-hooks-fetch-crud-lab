import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";



function QuestionList({  }) {

  const [questions, setQuestions] = useState ([])

  useEffect(()=>{

    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => setQuestions(data))
  }, [])

  console.log(questions)

  function handleDeleteClick(id){
console.log('id', id)
fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE', 
      })
      .then(r => r.json())
      .then(() => {
        const delState = questions.filter((item) => item.id !== id)
        setQuestions(delState)
        console.log('del state', delState)
      })

  }

  function updateIndex(id, newIndex){

    const upIndex = questions.map((item) => {
    
    if (item.id === id){

      item.correctIndex = newIndex
    }

    return item
    

  })
  console.log('upIndex:', upIndex)
  setQuestions(upIndex)

}
console.log('questions', questions)
  

  const questionList = questions.map((quest) =>{

      return <QuestionItem question={quest} key={quest.id} handleDeleteClick={handleDeleteClick} updateIndex={updateIndex} />

  })

  return (
    <section>
      <h1>Questions List</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
