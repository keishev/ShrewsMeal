import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel'

import './Summary.css';

import ProgressBarPerMeal from './ProgressBarPerMeal';
import { getBookingsByDate } from '../api/booking';

const Summary = ({ selectedDate }) => {
    const [bookings, setBookings] = useState ([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState ('');

    const settings = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
    };

    const mealsType = ['breakfast', 'lunch', 'dinner'];

    useEffect (() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByDate(selectedDate)
                setBookings(Array.isArray(response) ? response : []);
                setLoading (false);
            } catch (error) {
                setError ('Failed to fetch bookings.');
                setLoading (false);
            }
        };

        if (selectedDate) {
            fetchBookings ();
        };

    }, [selectedDate]);

    if (loading) {
        return <div> Loading... </div>;
    }

    return (
        <div className='summary-container'>
            <div className='title-div'>
                <h3 className='summary-title'>SUMMARY</h3>
            </div>
            {mealsType.map ((mealType) => (
                <div className='summary-slide'>
                    <h6 className='summary-header'>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h6>
                    <div className='summary-content'>
                        <ProgressBarPerMeal bookings={bookings} selectedMeal={mealType} totalTenants={10}/>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Summary;