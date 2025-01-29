import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { register } from 'swiper/element/bundle'
import axios from 'axios'
import dayjs from 'dayjs'
import moment from 'moment'
import Swal from 'sweetalert2'

import './BookingPage.css'

register ();    

function Booking () {
    const [auth, setAuth] = useState (null);
    const [message, setMessage] = useState ('');
    const [username, setUsername] = useState ('');
    const [loading, setLoading] = useState (true);

    const [selectedMeals, setSelectedMeals] = useState ([
        { breakfast: false, lunch: false, dinner: false },
        { breakfast: false, lunch: false, dinner: false}
    ]);

    const [dates, setDates] = useState ([
        { displayDate: '', dbDate: '' },
        { displayDate: '', dbDate: ''}
    ]);

    const [isBooked, setIsBooked] = useState ([
        false, false
    ]);

    useEffect(() => {
        const today = dayjs ();

        setDates (prevDates => {
            const formatDate = (date) => ({
                displayDate: date.format ('DD MMMM YYYY'),
                dbDate: date.format ('YYYY-MM-DD')
            })

            const updatedDates = prevDates.map ((_, index) => 
                formatDate (today.add (index, 'day'))
            );

            return updatedDates;
        });

        const fetchLogin = async () => {
            try {
                const res = await axios.get('http://localhost:3000/login', { withCredentials: true });
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setUsername(res.data.username);
                    console.log ("res.data.user", res.data.username);
                    console.log ('username00:', username);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading (false);
            }
        };

        const run = async () => {
            await fetchLogin ();
            await checkBooking (username);   
        }
        run ();
    }, [username]);

    const handleBooking = async (slideIndex) => {
        const selectedDate = dates [slideIndex]?.displayDate || 'Loading';

        Swal.fire ({
            title: 'Confirm your booking?',
            showCancelButton:true,
            confirmButtonText: 'Confirm',
            customClass: {
                actions: 'my-action',
                cancelButton: 'order-1 right-gap',
                confirm: 'order-2'
            }
        }).then ((result) => {
            if (result.isConfirmed) {
                const bookingData = {
                    username: username,
                    meals: selectedMeals[slideIndex],
                    date: dates[slideIndex].dbDate
                }
        
                axios.post ('http://localhost:3000/booking', bookingData, {
                    withCredentials: true
                })
                .then (res => {
                    if (res.data.Status === "Success") {
                        Swal.fire ('Booking confirmed!', `Your booking for ${selectedDate} has been saved.`, 'success');
                        setIsBooked ((prev) => slideIndex === 0 ? [true, ...prev.slice(1)] : [...prev.slice(0, slideIndex), true])
                        console.log ('Booking saved:', res.data);
                    }
                })
                .catch (err => { 
                    Swal.fire ('Booking failed', 'Please try again', 'error');
                    console.error ('Booking error:', err);
                });

            } else if (result.isDenied) {
                Swal.fire ('Booking was cancelled', `No booking was made for ${selectedDate}.`, 'info')
            }
        });
    };         

    // The logic where the selecting and unselecting of meals button work
    const toggleMeal = (slideIndex, meal) => {
        setSelectedMeals ((prev) => 
            prev.map ((slide, index) => 
                index === slideIndex        // If current index matches the slideIndex, then it is the slide you want to update
                    ? {...slide, [meal] : !slide[meal] }       // Here is where the values are modified
                : slide ));                 // Otherwise, leave that slide as it is
    };

    const checkBooking = async (username) => {
        try {
            const response = await axios.get (`http://localhost:3000/booking/check`, {
                params: {
                    username: username
                }
            });
            await setBookedDays (response.data);
            console.log (dates);
        } catch (error) {
            console.log ('Error checking booking:', error);
        }
    };

    const setBookedDays = async (datesArr) => {
        if (datesArr.length === 0) {
            setIsBooked ([false, false]);
            return;
        }

        const formattedDate = await moment (datesArr[0]).format("YYYY-MM-DD");
        
        if (datesArr.length > 1) {
            console.log('formatted2', formattedDate);
            console.log('datesdb2', dates[0].dbDate);
            setIsBooked ([true, true]);
        } else if (formattedDate === dates[0].dbDate) {
            console.log('formatted3', formattedDate);
            console.log('datesdb3', dates[0].dbDate);
            setIsBooked ([true, false]);
        } else if (formattedDate === dates[1].dbDate) {
            console.log('formatted4', formattedDate);
            console.log('datesdb4', dates[0].dbDate);
            setIsBooked ([false, true]);
        }
    }

    return (
        <div className = "container">
        {
            loading ? (
                <p>Loading...</p>
            ) : auth && (isBooked !== null) ?
                <div> 
                    <h5 className="welcome-msg">Welcome, {username}</h5>
                        <h1 className="heading">MAKE YOUR <br /> BOOKING FOR</h1>
                        
                        <swiper-container>
                            { [0, 1].map ((slideIndex) => (
                                <swiper-slide key={slideIndex}>
                                    <h6 className='date'>{dates[slideIndex].displayDate}</h6>
                                    <div className='meal-selection-container'>
                                        {['breakfast', 'lunch', 'dinner'].map ((meal) => (
                                            <button
                                                key={ meal }
                                                className={`meals-button ${selectedMeals[slideIndex][meal] ? 'selected' : ''}`}
                                                onClick={() => toggleMeal (slideIndex, meal)}
                                                disabled={isBooked[slideIndex]}
                                            >
                                                {meal.toUpperCase ()}
                                            </button>
                                        ))}
                                        <button className='meals-button submit-button' onClick={ () => handleBooking (slideIndex) }>
                                            {isBooked[slideIndex] ? 'MODIFY' : 'SUBMIT'}
                                        </button>
                                    </div>
                                </swiper-slide>
                            ))}
                        </swiper-container>

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