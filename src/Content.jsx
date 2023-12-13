import {
  fetchQuestions,
  fetchAddToCollection,
  fetchCollection,
  fetchDeleteFromCollection
} from './services';
import IntroContent from './IntroContent';
import QuestionList from './QuestionList';
import UserCollection from './UserCollection';
import QuestionForm from './QuestionForm';
import { useState, useEffect } from 'react';
import Status from './Status';
import Loading from './Loading';

const Content = ({ setPage, page, username }) => {
  const [questionId, setQuestionId] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [collection, setCollection] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function getQuestionList() {
    setLoading(true);
    fetchQuestions()
      .then((questions) => {
        setError('');
        setQuestionList(questions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
        setLoading(false);
      });
  }

  function addToCollection(questionId) {
    fetchAddToCollection(questionId)
      .then(() => {
        setError('');
        getQuestionList();
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
      });
  }

  function deleteFromCollection(questionId) {
    setLoading(true);
    fetchDeleteFromCollection(questionId)
      .then(() => {
        setError('');
        getUserCollection();
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
        setLoading(false);
      });
  }

  function getUserCollection() {
    setLoading(true);
    fetchCollection(username)
      .then((collection) => {
        setError('');
        setCollection(collection);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
        setLoading(false);
      });
  }

  useEffect(() => {
    getQuestionList();
    getUserCollection();
  }, []);


  return (
    <div className="content">
      {error && <Status error={error} />}
      {loading && (
        <Loading>Loading content...</Loading>
      )}
      {page === 'home' && (
        <>
          <IntroContent username={username} />
          <QuestionList
            username={username}
            setPage={setPage}
            questionList={questionList}
            collection={collection}
            setQuestionList={setQuestionList}
            setQuestionId={setQuestionId}
            addToCollection={addToCollection}
            deleteFromCollection={deleteFromCollection}
            setError={setError}
          />
        </>
      )}
      {page === 'collection' && (
        <UserCollection
          username={username}
          setPage={setPage}
          setQuestionId={setQuestionId}
          collection={collection}
          setCollection={setCollection}
          deleteFromCollection={deleteFromCollection}
          setError={setError}
        />
      )}
      {page === 'add' && (
        <QuestionForm username={username} setPage={setPage} isEdit={false} />
      )}
      {page === 'edit' && (
        <QuestionForm
          username={username}
          setPage={setPage}
          isEdit={true}
          questionId={questionId}
        />
      )}
    </div>
  );
};

export default Content;
