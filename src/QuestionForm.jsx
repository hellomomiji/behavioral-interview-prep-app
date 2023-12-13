import { useState, useEffect } from 'react';
import './QuestionForm.css';
import {
  fetchAddQuestion,
  fetchAddToCollection,
  fetchQuestion,
  fetchUpdateQuestion,
} from './services';
import Status from './Status';
import Loading from './Loading';
import { CATEGORIES } from './constants';

const QuestionForm = ({ setPage, username, isEdit, questionId = '' }) => {
  const [initialData, setInitialData] = useState({
    id: '',
    title: '',
    category: '',
    author: username,
    date: '',
  });
  const [formData, setFormData] = useState(initialData);
  const [collected, setCollected] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function getQuestion() {
    setError('');
    setLoading(true);
    fetchQuestion(questionId)
      .then((question) => {
        setInitialData(question);
        setFormData(question);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.error || 'ERROR');
      });
  }

  useEffect(() => {
    if (isEdit) {
      getQuestion();
    }
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    fetchAddQuestion(formData)
      .then((question) => {
        if (collected) {
          fetchAddToCollection(question.id)
        }
      })
      .then(() => {
        setLoading(false);
        setFormData({
          id: '',
          title: '',
          category: '',
          author: username,
          date: '',
        });
        setError('');
        setPage('home');
        
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.error || 'ERROR');
      });
  }

  function onUpdate(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    fetchUpdateQuestion(questionId, formData)
      .then(() => {
        setLoading(false);
        setFormData({
          id: '',
          title: '',
          category: '',
          author: username,
          date: '',
        });
        setError('');
        setPage('home');
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.error || 'ERROR');
      });
  }

  function formReset(e) {
    e.preventDefault();
    setFormData(initialData);
  }

  return (
    <div className="share-question">
      {isEdit ? <h2>Update your Question</h2> : <h2>Share your Question</h2>}
      <form className="share-question-form">
        <div className="share-form-question">
          <label htmlFor="title">Question</label>

          <textarea
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </div>

        <div className="share-form-category">
          <label htmlFor="category">Category</label>
          <select
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {!isEdit && (
          <div className="share-form-add-to-collection">
            <label htmlFor="add-to-collection">Add to Collection</label>
            <input
              type="checkbox"
              id="add-to-collection"
              onChange={(e) => {
                if (e.target.checked) {
                  setCollected(true);
                } else {
                  setCollected(false);
                }
              }}
            />
          </div>
        )}

        {error && <Status error={error} />}

        <button
          className="submit-button"
          type="submit"
          onClick={isEdit ? onUpdate : onSubmit}
          disabled={loading}
        >
          {isEdit ? 'Update Question' : 'Share Question'}
        </button>
        <button className="cancel-button" type="reset" onClick={formReset}>
          Reset
        </button>

        {loading && <Loading>Submitting</Loading>}
      </form>
    </div>
  );
};

export default QuestionForm;
