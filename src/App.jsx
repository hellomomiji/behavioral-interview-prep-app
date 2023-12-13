import { useState, useEffect } from "react";
import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
} from './services';
import LoginForm from './LoginForm';
import Loading from './Loading';
import Status from './Status';
import Home from "./Home";


function App() {

  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING);
  
  
  function onLogin( username ) {
    setError('');
    setUsername(username);
    fetchLogin(username)
    .then( () => {
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function checkForSession() {
    fetchSession()
    .then( session => {
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    });

  }

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <div className="app">
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login-waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <Home onLogout={onLogout} username={username}/> }
        { error && <Status error={error}/> }

    </div>
  );
}
export default App;
