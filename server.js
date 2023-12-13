const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const users = require('./users');
const sessions = require('./sessions');
const questions = require('./questions');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('dist'));



app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  
  if(!users.isValid(username)) {
    res.status(400).json({ error: 'invalid-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie('sid', sid);
  res.json({ username });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }

  res.json({ success: true });
});

app.get('/api/v1/questions', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(questions.getQuestions());
});

app.post('/api/v1/questions', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { title, category } = req.body;
  if(!title || !category) {
    res.status(400).json({ error: 'required-question' });
    return;
  }
  const id = questions.addQuestion({ title, category, author: username });
  res.json({ id });
}
);

app.get('/api/v1/collection', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserCollection(username));
}
);

app.post('/api/v1/collection', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.body;
  if(!id) {
    res.status(400).json({ error: 'required-id' });
    return;
  }
  if(!id) {
    res.status(404).json({ error: 'question-not-found' });
    return;
  }
  if(users.isDuplicate(username, id)) {
    res.status(409).json({ error: 'question-duplicate' });
    return;
  }
  users.addToUserCollection(username, id);
  res.json({ success: true });
}
);

app.delete('/api/v1/collection/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  if(!id) {
    res.status(400).json({ error: 'required-id' });
    return;
  }
  const question = questions.getQuestionById(id);
  if(!question) {
    res.status(404).json({ error: 'question-not-found' });
    return;
  }
  users.deleteFromUserCollection(username, id);
  res.json({ success: true });
}
);

app.get('/api/v1/questions/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  if(!id) {
    res.status(400).json({ error: 'required-id' });
    return;
  }
  const question = questions.getQuestionById(id);
  if(!question) {
    res.status(404).json({ error: 'question-not-found' });
    return;
  }
  res.json(question);
}
);


app.patch('/api/v1/questions/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  if(!id) {
    res.status(400).json({ error: 'required-id' });
    return;
  }
  const question = questions.getQuestionById(id);
  if(!question) {
    res.status(404).json({ error: 'question-not-found' });
    return;
  }
  if(question.author !== username) {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const { title, category } = req.body;
  if(!title || !category) {
    res.status(400).json({ error: 'required-question' });
    return;
  }
  questions.updateQuestion(id, { title, category });
  res.json({ success: true });
}
);


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
