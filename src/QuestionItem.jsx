import { useState, useEffect } from "react";
import CollectButton from "./CollectButton";
import { fetchQuestion } from "./services";
import Status from "./Status";

const QuestionItem = ({
  data,
  questionId,
  username,
  addToCollection,
  deleteFromCollection,
  isInCollection,
  isCollected,
  setPage,
  setQuestionId,
}) => {
  const [itemData, setItemData] = useState(data ? data : {});
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchQuestion(questionId)
      .then((question) => {
        setItemData(question);
      })
      .catch((err) => {
        setError(err?.error || 'ERROR');
      });
  }
  , []);

  return (
    <div className="questionitem">
    { error ? <Status message={error} />
      : (
        <>

      <div className="questionitem-body">
        <p className="questionitem-title">{itemData.title}</p>
        <p className="questionitem-category">{itemData.category}</p>
      </div>

      <div className="questionitem-info">
        <div className="buttons">
          {isInCollection ? (
            <>
              <button
                className="questionitem-delete"
                onClick={(e) => {
                  e.preventDefault();
                  deleteFromCollection(itemData.id);
                }}
              >
                <i className="gg-trash-empty delete-button"></i>
              </button>
            </>
          ): (
            <>
            <CollectButton 
              collected={isCollected} 
              addToCollection={addToCollection}
              deleteFromCollection={deleteFromCollection}
              questionId={itemData.id}
            />
            </>
          )
          }

          { itemData?.author === username && (
            <button 
              className="questionitem-edit"
              onClick={(e) => {
                e.preventDefault();
                setQuestionId(itemData.id);
                setPage('edit');
              }}
            >
              <i className="gg-pen edit-button"></i>
            </button>
          )}

        </div>

        <div className="questionitem-post-info">
          <p>{itemData.author}</p>
          <p>{itemData.date}</p>
        </div>

      </div>
        </>
      )
    }

  </div>
  );
}

export default QuestionItem;
