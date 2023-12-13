import { useEffect } from 'react';
import QuestionItem from './QuestionItem';
import { fetchCollection } from './services';


const UserCollection = ({
  username,
  setPage,
  setQuestionId,
  collection,
  setCollection,
  deleteFromCollection,
  setError,
}) => {

  useEffect(() => {
    fetchCollection()
      .then((collection) => {
        setCollection(collection);
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
      });
  }
  , []);

  return (
    <div className="user-collection">
      <h2>Your Interview Prep Question Collection</h2>
      <p>Here is the collection of your favorite questions.</p>

      {collection.length === 0 ? (
        <p>No questions found</p>
      ) : (
        <div className="questionlist">
          {collection.map((id) => (
            <QuestionItem
              key={id}
              questionId={id}
              isInCollection={true}
              username={username}
              setPage={setPage}
              setQuestionId={setQuestionId}
              deleteFromCollection={deleteFromCollection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCollection;
