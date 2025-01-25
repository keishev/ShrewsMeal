import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from 'swiper/element/bundle';
import axios from 'axios'
import dayjs from 'dayjs'

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

    const navigate = useNavigate ();

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

        fetchLogin();
    }, [])

    const handleBooking = async (event) => {
        event.preventDefault ();

        await axios.post ('http://localhost:3000/booking', {})  
    }

    // The logic where the selecting and unselecting of meals button work
    const toggleMeal = (slideIndex, meal) => {
        setSelectedMeals ((prev) => 
            prev.map ((slide, index) => 
                index === slideIndex        // If current index matches the slideIndex, then it is the slide you want to update
                    ? {...slide, [meal] : !slide[meal] }       // Here is where the values are modified
                : slide ));                 // Otherwise, leave that slide as it is
    };

    return (
        <div className = "container">
        {
            loading ? (
                <p>Loading...</p>
            ) : auth ?
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
                                            >
                                                {meal.toUpperCase ()}
                                            </button>
                                        ))}
                                        <button className='meals-button submit-button' onClick={() => console.log (`Selected meals:`, selectedMeals[slideIndex])}>SUBMIT</button>
                                    </div>
                                </swiper-slide>
                            ))}
                        </swiper-container>

                        {/* <swiper-container>
                            <swiper-slide>
                                <h6 className='date'>{curDate}</h6>
                                <div className='meal-selection-container'>
                                    <button className='meals-button' onClick={selectBreakfast}>BREAKFAST</button>
                                    <button className='meals-button' onClick={selectLunch}>LUNCH</button>
                                    <button className='meals-button' onClick={selectDinner}>DINNER</button>
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
                        </swiper-container> */}
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