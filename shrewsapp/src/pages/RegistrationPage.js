import React, { useState } from 'react';

import './RegistrationPage.css';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: '',
        building: '',
        unitNumber: '',
        dietaryRestrictions: [],
        others: ''
      });

    const handleRegistration = async () => {

    };

    return (
        <div className='regis-container'>
            <h1 className="regis-heading">REGISTER AN<br/>ACCOUNT</h1>

            <div className='form-container'>
                <form onSubmit={handleRegistration}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className='form-label'>First Name</label>
                            <input
                            className='form-input'
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            // onChange={handleChange}
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
                            // onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className='form-label'>Phone Number</label>
                            <input
                            className='form-input'
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            // onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label className='form-label'>Role</label>
                            <select
                                className='form-input dropdown-input'
                                name='role'
                                value={formData.role}
                                // onChange={handleChange}
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
                                name='role'
                                value={formData.role}
                                // onChange={handleChange}
                                required
                            >
                                <option value="">Select option</option> 
                                <option value="COOK">Cook</option>
                                <option value="TENANT">Tenant</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className='form-label'>Unit Number</label>
                            <input
                            className='form-input'
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            // onChange={handleChange}
                            required
                            />
                        </div>
                    </div>

                    <div className='form-row'>
                        <div className='form-group dietary-restrictions'>
                        <h4>Dietary Restrictions</h4>
                        <div className='dietary-checkbox'>
                            <label><input type="checkbox" name="dietary" value="halal" classNmae='checkbox-rounded'/> Halal</label>
                            <label><input type="checkbox" name="dietary" value="no-beef" classNmae='checkbox-rounded'/> No Beef</label>
                            <label><input type="checkbox" name="dietary" value="no-seafood" classNmae='checkbox-rounded'/> No Seafood</label>
                            <label><input type="checkbox" name="dietary" value="vegetarian" classNmae='checkbox-rounded'/> Vegetarian </label>
                            
                        </div>
                        </div>
                    </div>
                    
                    {/* <div className="form-group full-width">
                        <label>Dietary Restrictions:</label>
                        <div className="checkbox-group">
                            <label><input type="checkbox" name="dietary" value="vegetarian" /> Vegetarian</label>
                            <label><input type="checkbox" name="dietary" value="vegan" /> Vegan</label>
                            <label><input type="checkbox" name="dietary" value="halal" /> Halal</label>
                            <label><input type="checkbox" name="dietary" value="kosher" /> Kosher</label>
                            <label>
                                <input type="checkbox" name="dietary" value="other" 
                                    onChange={(e) => setDietaryOther(e.target.checked ? '' : null)} /> Other:
                                {dietaryOther !== null && (
                                    <input 
                                        type="text" 
                                        name="otherDietary" 
                                        placeholder="Please specify" 
                                        onChange={(e) => setDietaryOther(e.target.value)} 
                                    />
                                )}
                            </label>
                        </div>
                    </div> */}
                </form>
            </div>
            <div className='register-button-div'>
                <button className='register-button' 
                    onClick={() => {handleRegistration()}}
                >
                    REGISTER
                </button>
            </div>
        </div>
    )
};

export default RegistrationPage;