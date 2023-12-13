import { useState } from "react";


const CollectButton = ({
  collected,
  addToCollection,
  deleteFromCollection,
  questionId,
}) => {

  const [changeButton, setChangeButton] = useState(false);
  
  if (collected || changeButton) {
    return (
      <button
        className="questionitem-added"
        onClick={(e) => {
          e.preventDefault();
          deleteFromCollection(questionId);
          setChangeButton(false);
        }}
      >
        <i className="gg-check check-button"></i>
      </button>
    );
  } else {
    return (
      <button
        className="questionitem-addto"
        onClick={(e) => {
          e.preventDefault();
          addToCollection(questionId);
          setChangeButton(true);
        }}
      >
        <i className="gg-bookmark add-button"></i>
      </button>
    );
  }
};

export default CollectButton;
