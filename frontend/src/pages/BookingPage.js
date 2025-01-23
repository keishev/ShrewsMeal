import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from 'swiper/element/bundle';
import axios from 'axios'
import dayjs from 'dayjs'

import './BookingPage.css'

register ();

function Booking () {
    const [auth, setAuth] = useState (false);
    const [message, setMessage] = useState ('');
    const [username, setUsername] = useState ('');
    const [curDate, setCurDate] = useState ('');
    const [curDbDate, setCurDbDate] = useState ('');
    const [nextDate, setNextDate] = useState ('');
    const [nextDbDate, setNextDbDate] = useState ('');

    const navigate = useNavigate ();

    // Check if the user is authorized or not by checking the cookie / token
    useEffect (() => {
        axios.get ('http://localhost:3000/login', {withCredentials: true})
        .then (res => {
            console.log (res.data.Status);
            if (res.data.Status === "Success") {
                setAuth (true);
                setUsername (res.data.username);
            } else {
                setAuth (false);
                setMessage (res.data.Error);
            }
        })
        .catch (err => console.log (err));

        const today = dayjs();
        setCurDate (today.format ('DD MMMM YYYY'));      // user friendly format
        setCurDbDate (today.format ('YYYY-MM-DD'));      // database format

        const nextDay = today.add(1, "day");
        setNextDate (nextDay.format ('DD MMMM YYYY'));
        setNextDbDate (nextDay.format ('YYYY-MM-DD'));

    }, [])

    const handleBooking = (event) => {
        event.preventDefault ();

    }

    return (
        <div className = "container">
            {
                auth ?
                <div> 
                    <h6>Hello, {username}</h6>
                    <form onSubmit={handleBooking} className="form">
                        <h1 className="heading">MAKE YOUR <br /> BOOKING FOR</h1>
                        
                        <swiper-container>
                            <swiper-slide>
                                <h6 className='date'>{curDate}</h6>
                                <div className='meal-selection-container'>
                                    <button className='meals-button'>BREAKFAST</button>
                                    <button className='meals-button'>LUNCH</button>
                                    <button className='meals-button'>DINNER</button>
                                    <button className='meals-button submit-button'>SUBMIT</button>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                                <h6 className='date'>{nextDate}</h6>
                                <div className='meal-selection-container'>
                                    <button className='meals-button'>BREAKFAST</button>
                                    <button className='meals-button'>LUNCH</button>
                                    <button className='meals-button'>DINNER</button>
                                    <button className='meals-button submit-button'>SUBMIT</button>
                                </div>
                            </swiper-slide>
                        </swiper-container>

                        <div className='howToBook-container'>
                            <button className='howToBook-button'>HOW TO BOOK?</button>
                        </div>
                    </form>

                    <nav className='navbar'>
                        <div>
                        </div>
                    </nav>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>You are unauthorized. Please log in.</h3>
                    <Link to='/login'>Login</Link>
                </div>
            }
        </div>
    )
};

export default Booking;