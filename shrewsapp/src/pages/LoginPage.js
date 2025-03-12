import React, { useState, useEffect } from 'react'  
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { userLogin } from '../api/login.js'

import './LoginPage.css';
import '../style/font.css'

const LoginPage = () => {
    const [values, setValues] = useState ({
        username: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate ();

    axios.defaults.withCredentials = true;    // this is for the cookie

    const handleLogin = async (event) => {
        event.preventDefault ();
        setError ('');

        try {
            const res = await userLogin (values)

            if (res.Status === "Success") {
                setError ('');
                navigate ('/booking')
            } else {
                setError (res.data.Error)
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError ('Invalid credentials!');
                }
            } else {
                console.error ("Error logging in:", error)
            }
        }
    }

    const toggleShowPassword = () => {
        setShowPassword (!showPassword);
    };

    return (
        <div className="container">
        <form onSubmit={ handleLogin } className="form">
        <h1 className="heading">LOG IN</h1>

        <div className="user-pass-container">
          <label className="label">username</label>
          <input
            value={values.username}
            onChange= { e => setValues ({...values, username: e.target.value}) }    // we only update the name value
            className="input"
            placeholder="Enter your username"
            required
          />

          <label className="label">password</label>
          <div class="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={ e => setValues ({...values, password: e.target.value}) }    // we only update the password value
              className="password-input"
              placeholder="Enter your password"
              required
            />
            <span onClick={ toggleShowPassword } className='icon'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div>
          {error && <p className="error">{ error }</p>}
        </div>

        <button className="button">
          LOG IN
        </button>
      </form>
    </div>
    );
};

export default LoginPage