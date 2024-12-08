import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleUpdatedAnswer(updatedQuestion) {
    setQuestions(questions.map((question) => (question.id === updatedQuestion.id ? updatedQuestion : question)));
  }

  function handleDeletedQuestion(deletedQuestion) {
    setQuestions(questions.filter((question) => question.id !== deletedQuestion.id));
  }
  function AddNewQuestion(question) {
    setQuestions([...questions, question]);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddNewQuestion={AddNewQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeletedQuestion} onUpdateAnswer={handleUpdatedAnswer}/>}
    </main>
  );
}

export default App;
