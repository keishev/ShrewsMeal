import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { register } from 'swiper/element/bundle'
import dayjs from 'dayjs'
import moment from 'moment'
import Swal from 'sweetalert2'

import './BookingPage.css'
import '../components/BookingCarousel.js'
import MealSelectionSlider from '../components/BookingCarousel.js'

import { checkAuthenticated, createBooking, modifyBooking, getAndSetBookedMeals, checkBookedDays } from '../api/booking.js'

register ();    

const BookingPage = () => {
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

    const [isBooked, setIsBooked] = useState ([false, false]);
    const [isModifying, setIsModifying] = useState([false, false]); // Tracks modification status


    useEffect(() => {
        const today = dayjs();

        setDates([
            { displayDate: today.format('DD MMMM YYYY'), dbDate: today.format('YYYY-MM-DD') },
            { displayDate: today.add(1, 'day').format('DD MMMM YYYY'), dbDate: today.add(1, 'day').format('YYYY-MM-DD') }
        ]);
    }, []);     // runs only once when the component mounts

    useEffect(() => {
        const fetchLogin = async () => {
            try {
                const res = await checkAuthenticated ();
                if (res.Status === "Success") {
                    setAuth(true);
                    setUsername(res.username);
                    console.log ("date after setting", username + "date: " + dates[0].displayDate);

                    await checkBooking (res.username);
                } else {
                    setAuth(false);
                    setMessage(res.Error);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading (false);
            }
        };

        fetchLogin ();
    }, [dates, username]); // runs when 'dates' and 'username' are set

    const handleModify = async (slideIndex) => {
        setIsBooked ((prev) => slideIndex === 0 ? [false, ...prev.slice (1)] : [...prev.slice (0, slideIndex), false]);
        setIsModifying ((prev) => slideIndex === 0 ? [true, ...prev.slice (1)] : [...prev.slice (0, slideIndex), true]);
    };

    const handleBooking = async (slideIndex) => {
        const selectedDate = dates[slideIndex]?.displayDate || 'Loading';
    
        // Check if it's a new booking or a modification
        const isUpdating = isModifying[slideIndex];

        const result = await Swal.fire({
            title: isUpdating ? 'Modify Your Booking?' : 'Confirm your booking?',
            text: isUpdating 
                ? `You are modifying your booking for ${selectedDate}. Are you sure?`
                : `Do you want to confirm your booking for ${selectedDate}?`,
            showCancelButton: true,
            confirmButtonText: isUpdating ? 'Modify' : 'Confirm',
            width: '75%',
            customClass: {
                actions: 'my-action',
                cancelButton: 'order-1 right-gap',
                confirm: 'order-2'
            }
        });
    
        if (result.isConfirmed) {
            const bookingData = {
                username: username,
                meals: selectedMeals[slideIndex],
                date: dates[slideIndex].dbDate
            };
    
            try {
                const res = isUpdating
                    ? await modifyBooking (bookingData)
                    : await createBooking (bookingData);
                if (res.Status === "Success") {
                    await Swal.fire(
                        isUpdating ? 'Booking modified!' : 'Booking confirmed!',
                        `Your booking for ${selectedDate} has been ${isUpdating ? 'updated' : 'saved'}`,
                        'success'
                    );

                    setIsBooked((prev) =>
                        slideIndex === 0
                            ? [true, ...prev.slice(1)]
                            : [...prev.slice(0, slideIndex), true]
                    );

                    setIsModifying(prev =>
                        slideIndex === 0 ? [false, prev[1]] : [prev[0], false]
                    );
                }
            } catch (err) {
                await Swal.fire('Booking failed', 'Please try again', 'error');
                console.error('Booking error:', err);
            }
        } else if (result.isDenied) {
            await Swal.fire(
                'Booking was cancelled',
                `No booking was made for ${selectedDate}.`,
                'info'
            );
        }
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
            console.log ('username in checkbooking', username);
            const bookedDays = await checkBookedDays (username);
            console.log ('username & bookedDays:' + username + " " + bookedDays.dates);
            await setBookedDays (username, bookedDays.dates);
        } catch (error) {
            console.log ('Error checking booking:', error);
        }
    };

    const setBookedDays = async (username, datesArr) => {
        if (!datesArr || datesArr.length === 0) {
            setIsBooked ([false, false]);
            return;
        }

        // If the dates are weird, try to add .utc after moment
        const formattedBookedDates = datesArr.map(date => moment(date).format("YYYY-MM-DD"));

        // Check if the two available booking dates are in the booked list
        const isFirstDateBooked = formattedBookedDates.includes(dates[0].dbDate);
        const isSecondDateBooked = formattedBookedDates.includes(dates[1].dbDate);
      
        setIsBooked([isFirstDateBooked, isSecondDateBooked]);

        console.log (dates[0].dbDate);
        await setBookedMeals (username, dates[0].dbDate);
        await setBookedMeals (username, dates[1].dbDate);
    }

    const setBookedMeals = async (username, date) => {
        try {
            if (!date) {
                console.error ("Date is undefined!");
                return;
            }

            const response = await getAndSetBookedMeals (username, date)

            if (response != null) {
                const index = (date === dates[0].dbDate ? 0 : 1);

                setSelectedMeals (prevMeals => {
                    const updatedMeals = [...prevMeals]; // Create a new copy of the array
                    updatedMeals[index] = {  // Replace the entire object at the given index
                        breakfast: response.breakfast,
                        lunch: response.lunch,
                        dinner: response.dinner
                    };
    
                    return updatedMeals;
                });    
            }
        } catch (error) {
            console.log ('Error setting selected meals:', error);
        }
    };

    return (
        <div className = "container">
        {
            loading ? (
                <p>Loading...</p>
            ) : auth && (isBooked !== null) ?
                <div> 
                    <h5 className="welcome-msg">Welcome, {username}</h5>
                    <h1 className="heading">MAKE YOUR <br /> BOOKING FOR</h1>

                    <MealSelectionSlider
                        dates={dates}
                        selectedMeals={selectedMeals}
                        isBooked={isBooked}
                        toggleMeal={toggleMeal}
                        handleModify={handleModify}
                        handleBooking={handleBooking}
                    />     
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>You are unauthorized. Please log in.</h3>
                    <Link to='/'>Login</Link>
                </div>
            }
        </div>
    )
};

export default BookingPage;