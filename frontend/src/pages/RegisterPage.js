import React, { useState, useEffect } from 'react'  
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './LoginPage.css';

function Register () {
    const [values, setValues] = useState ({
      username: '',
      password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleRegistration = (event) => {
      event.preventDefault ();    
      
      // Use the API to call the server side to handle the login
      // Use .post because we are posting data and pass them to the /login at the backend
      axios.post ('http://localhost:5000/register', values)
      .then (res => console.log (res))
      .then (err => console.log (err))
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
    return (
        <div className="container">
          <form onSubmit={handleRegistration} className="form">
            <h1 className="heading">REGISTER AN ACCOUNT</h1>

            

          </form>
        </div>
    );
};

export default Register