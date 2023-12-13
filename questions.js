const { questions, formatDateTime } = require('./data');

const uuid = require('uuid').v4;

function addQuestion(data) {
  const id = uuid();
  questions[id] = {
    id, date: formatDateTime(new Date()),
    ...data,
  };
  return id;
}

function getQuestions() {
  return Object.entries(questions).map( ([id, q]) => ({ id, ...q }) );
}

function deleteQuestion(id) {
  delete questions[id];
}

function getQuestionById(id) {
  return questions[id];
}

function updateQuestion(id, data) {
  questions[id] = {
    ...questions[id], date: formatDateTime(new Date()),
    ...data,
  };
}

module.exports = {
  addQuestion,
  deleteQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
};

