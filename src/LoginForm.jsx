import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
      onLogin(username); 
  }

  return (
      <div className="login">
        <h2>Welcome to 💡Behavioral Interview Prep Bank! Please Login👋</h2>
        <form className="login-form" action="#/login" onSubmit={onSubmit}>
          <label>
            <span>Username:</span>
            <input className="login-username" value={username} onChange={onChange}/>
          </label>
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
  );

}

export default LoginForm;
