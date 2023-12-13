import { useEffect } from 'react';
import { fetchQuestions } from './services';
import QuestionItem from './QuestionItem';

const QuestionList = ({
  username,
  setPage,
  setQuestionId,
  questionList,
  collection,
  setQuestionList,
  addToCollection,
  deleteFromCollection,
  setError,
}) => {
  
  useEffect(() => {
    fetchQuestions()
      .then((questions) => {
        setQuestionList(questions);
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
      });
  }
  , []);
  
  return (
    <>
      <div className="questionlist">
        {questionList.length === 0 ? (
          <p>No questions found</p>
        ) : (
          questionList.map((question) => (
            <QuestionItem
              key={question.id}
              data={question}
              questionId={question.id}
              addToCollection={addToCollection}
              deleteFromCollection={deleteFromCollection}
              isInCollection={false}
              isCollected={collection.includes(question.id)}
              username={username}
              setPage={setPage}
              setQuestionId={setQuestionId}
            />
          ))
        )}
      </div>
    </>
  );
};

export default QuestionList;
