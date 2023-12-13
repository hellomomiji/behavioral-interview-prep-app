const IntroContent = ({username}) => {
  return (
    <>
      <h2>Welcome to 💡Behavioral Interview Prep Bank, {username}!</h2>
      <p className="head-message">
        This is a co-collaboration collection of behavioral interview questions.
        You can use this to practice your answers to these questions.
      </p>
      <p className="head-message">
        Question categories are based on the Amazon Leadership Principles.
      </p>
      <p className="head-message">
        You can add/update questions to this collection. You can also add/delete
        questions to your own collection and practice them later.
      </p>
    </>
  );
};

export default IntroContent;
