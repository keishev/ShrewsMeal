import React, { useState } from 'react';
import Swal from 'sweetalert2';

import './RegistrationPage.css';
import { registerNewUser } from '../api/register.js';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: '',
        building: '',
        unitNumber: '',
        dietary: []
    });

    const initialFormState = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: '',
        building: '',
        unitNumber: '',
        dietary: []
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData (prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckBoxChange = (e) => {
        const { value, checked } = e.target;
        setFormData (prevState => ({
            ...prevState,
            dietary: checked
                ? [...prevState.dietary, value]     // Add into array if checked
                : prevState.dietary.filter (item => item !== value)     // Remove if unchecked
        }))
    }
    const handleRegistration = async (e) => {
        e.preventDefault ();

        try {
            const res = await registerNewUser (formData);
            
            if (res.Status === "Success") {
                await Swal.fire({
                    title: 'Registration Successful!',
                    html: `Username: <b>${res.username}</b><br>Temporary password: <b>${res.defaultPassword}</b>`,
                    icon: 'success'
                });
                
                setFormData (initialFormState);
            } else {
                await Swal.fire('Registration failed', 'Please try again', 'error');
            }

        } catch (error) {
            console.error ('Error handling user registration:', error);
        }
    };

    return (
        <div className='regis-container'>
            <h1 className="regis-heading">REGISTER AN<br/>ACCOUNT</h1>

            <div className='form-container'>
                <form onSubmit={handleRegistration}>
                    <div className='form-content'>
                        <div className="form-row">
                            <div className="form-group">
                                <label className='form-label'>First Name</label>
                                <input
                                className='form-input'
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className="form-group">
                                <label className='form-label'>Last Name</label>
                                <input
                                className='form-input'
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className='form-label'>Phone Number</label>
                                <input
                                className='form-input'
                                type="tel"
                                pattern='[0-9]*'
                                inputMode='numeric'
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className="form-group">
                                <label className='form-label'>Role</label>
                                <select
                                    className='form-input dropdown-input'
                                    name='role'
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a role</option> 
                                    <option value="COOK">Cook</option>
                                    <option value="TENANT">Tenant</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className='form-label'>Building</label>
                                <select
                                    className='form-input dropdown-input'
                                    name='building'
                                    value={formData.building}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select option</option> 
                                    <option value="main">Main Building</option>
                                    <option value="other">Second Building</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className='form-label'>Unit Number</label>
                                <input
                                className='form-input'
                                type="text"
                                name="unitNumber"
                                value={formData.unitNumber}
                                onChange={handleChange}
                                required
                                />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group dietary-restrictions'>
                            <h4>Dietary Restrictions</h4>
                            <div className='dietary-checkbox'>
                                <label><input type="checkbox" name="dietary" value="1" className='checkbox-rounded' onChange={handleCheckBoxChange}/> No Beef</label>
                                <label><input type="checkbox" name="dietary" value="2" className='checkbox-rounded' onChange={handleCheckBoxChange}/> No Seafood</label>
                                <label><input type="checkbox" name="dietary" value="3" className='checkbox-rounded' onChange={handleCheckBoxChange}/> Halal</label>
                                <label><input type="checkbox" name="dietary" value="4" className='checkbox-rounded' onChange={handleCheckBoxChange}/> Vegetarian </label>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className='register-button-div'>
                        <button className='register-button' type='submit'>
                            REGISTER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default RegistrationPage;