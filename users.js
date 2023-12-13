const users = {};

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function getUserCollection(username) {
  const questions = users[username];
  if (!questions) {
    return [];
  }
  return questions;
}

function isDuplicate(username, questionId) {
  if (!users[username]) {
    return false;
  }
  return users[username].some( qid => qid === questionId );
}

function addToUserCollection(username, questionId) {
  if (!users[username]) {
    users[username] = [];
  }
  users[username].push(questionId);
}

function deleteFromUserCollection(username, questionId) {
  if (!users[username]) {
    return;
  }
  users[username] = users[username].filter( qid => qid !== questionId );
}

module.exports = {
  isValid,
  getUserCollection,
  isDuplicate,
  addToUserCollection,
  deleteFromUserCollection,
};
