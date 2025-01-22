import React, { useState, useEffect } from 'react'  
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './LoginPage.css';

function Login () {
    const [values, setValues] = useState ({
      username: '',
      password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (event) => {
      event.preventDefault ();    
      
      // Use the API to call the server side to handle the login
      // Use .post because we are posting data and pass them to the /login at the backend
      axios.post ('http://localhost:5000/login', values)
      .then (res => console.log (res))
      .then (err => console.log (err))
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
    return (
        <div className="container">
        <form onSubmit={handleLogin} className="form">
        <h1 className="heading">LOG IN</h1>

        <div className="user-pass-container">
          <label className="label">username</label>
          <input
            value={values.username}
            onChange={e => setValues  ({...values, username: e.target.value})}    // we only update the name value
            className="input"
            placeholder="Enter your username"
            required
          />

          <label className="label">password</label>
          <div class="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={e => setValues  ({...values, password: e.target.value})}    // we only update the password value
              className="password-input"
              placeholder="Enter your password"
              required
            />
            <span onClick={toggleShowPassword} className='icon'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div>
          {error && <p className="error">{error}</p>}
        </div>

        <button className="button">
          LOG IN
        </button>
      </form>
    </div>
    );
};

export default Login