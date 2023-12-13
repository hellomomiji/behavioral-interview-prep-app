export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  INVALID_USERNAME: 'invalid-username',
  REQUIRED_QUESTION: 'required-question',
  QUESTION_NOT_FOUND: 'question-not-found',
  DUPLICATE_QUESTION: 'question-duplicate',
  REQUIRED_ID: 'required-id',

};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',

};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [CLIENT.NO_SESSION]: 'You are not logged in.  Please login to continue',
  [SERVER.AUTH_MISSING]: 'You are not logged in.  Please login to continue',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.INVALID_USERNAME]: 'Please enter a valid (letters and/or numbers) username.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a username.',
  [SERVER.REQUIRED_QUESTION]: 'Please enter a question and category.',
  [SERVER.QUESTION_NOT_FOUND]: 'Question not found.  Please try again.',
  [SERVER.DUPLICATE_QUESTION]: 'You have already added this question to your collection',
  [SERVER.REQUIRED_ID]: 'Please enter a valid question id',
  default: 'Something went wrong.  Please try again',
};

export const CATEGORIES = [
  'General',
  'Customer Obsession',
  'Ownership',
  'Invent and Simplify',
  'Are Right, A Lot',
  'Learn and Be Curious',
  'Hire and Develop the Best',
  'Insist on the Highest Standards',
  'Think Big',
  'Bias for Action',
  'Frugality',
  'Earn Trust',
  'Dive Deep',
  'Have Backbone; Disagree and Commit',
  'Deliver Results',
];